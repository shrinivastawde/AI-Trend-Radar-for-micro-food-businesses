# sheet_analyzer.py
import os
import pandas as pd
from pathlib import Path
from textblob import TextBlob
from google.oauth2 import service_account
from googleapiclient.discovery import build
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent  # /backend

# Get configuration from environment variables
SPREADSHEET_ID = os.getenv("GOOGLE_SHEET_ID")
RANGE_NAME = os.getenv("GOOGLE_SHEET_RANGE", "Food_Reviews!A:E")
CREDENTIALS_FILE_PATH = os.getenv("GOOGLE_CREDENTIALS_JSON", "data/customerfeedback-12345abcd.json")

# Build absolute path to credentials file
CREDENTIALS_FILE = BASE_DIR / CREDENTIALS_FILE_PATH

# Validate that required environment variables are set
if not SPREADSHEET_ID:
    raise ValueError("GOOGLE_SHEET_ID not found in environment variables")

if not CREDENTIALS_FILE.exists():
    raise FileNotFoundError(f"Credentials file not found at: {CREDENTIALS_FILE}")


def fetch_all_google_sheet_data():
    """
    Fetch data from Google Sheets, perform sentiment analysis, and return as list of dicts.
    
    Returns:
        list: List of dictionaries containing sheet data with sentiment analysis
    """
    try:
        # Load credentials
        creds = service_account.Credentials.from_service_account_file(
            str(CREDENTIALS_FILE),
            scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
        )
        
        # Build Google Sheets service
        service = build("sheets", "v4", credentials=creds)
        sheet = service.spreadsheets()
        
        # Fetch data from sheet
        result = sheet.values().get(
            spreadsheetId=SPREADSHEET_ID, 
            range=RANGE_NAME
        ).execute()
        
        values = result.get("values", [])
        
        print(f"[DEBUG] Raw values from Google Sheet (rows: {len(values)}):", values[:3])  # Show first 3 rows
        
        # Validate data
        if not values or len(values) < 2:
            print("No data found in Google Sheet.")
            return []
        
        # Create DataFrame
        df = pd.DataFrame(values[1:], columns=values[0])
        df = df.fillna("")
        
        # Identify text column for sentiment analysis
        text_col = "Comment / Review" if "Comment / Review" in df.columns else df.columns[-1]
        
        # Perform sentiment analysis
        def analyze_sentiment(text):
            """Analyze sentiment of text using TextBlob"""
            try:
                polarity = TextBlob(str(text)).sentiment.polarity
                if polarity > 0.1:
                    return "Positive"
                elif polarity < -0.1:
                    return "Negative"
                else:
                    return "Neutral"
            except Exception as e:
                print(f"Error analyzing sentiment for text: {text[:50]}... Error: {e}")
                return "Neutral"
        
        df["Sentiment"] = df[text_col].apply(analyze_sentiment)
        
        # Process Rating column
        if "Rating" in df.columns:
            df["Rating"] = pd.to_numeric(df["Rating"], errors="coerce").fillna(0).astype(int)
        
        # Fill missing values for key columns
        key_columns = ["Customer Name", "Category of Feedback", "City / Location"]
        for col in key_columns:
            if col not in df.columns:
                df[col] = "Unknown"
            else:
                df[col] = df[col].replace("", "Unknown")
        
        print(f"[DEBUG] Processed {len(df)} rows successfully")
        
        # Convert to list of dictionaries
        return df.to_dict(orient="records")
    
    except FileNotFoundError as e:
        print(f"Credentials file not found: {e}")
        return []
    except Exception as e:
        print(f"Error fetching sheet data: {type(e).__name__}: {e}")
        return []


# Optional: Test function
if __name__ == "__main__":
    print("Testing Google Sheets data fetch...")
    data = fetch_all_google_sheet_data()
    print(f"\nFetched {len(data)} records")
    if data:
        print("\nSample record:")
        print(data[0])
