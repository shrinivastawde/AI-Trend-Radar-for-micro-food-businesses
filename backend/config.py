import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the absolute path of the backend directory
BASE_DIR = Path(__file__).resolve().parent

# Google API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
SERVICE_ACCOUNT_FILE = BASE_DIR / "data" / "calender.json"

# Visual Crossing Weather API
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

# CSV Dataset
DATA_PATH = BASE_DIR / "data" / "new.csv"

# Calendar ID
CALENDAR_ID = os.getenv("CALENDAR_ID", "en.indian#holiday@group.v.calendar.google.com")

# LangChain Gemini Model
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "models/gemini-2.5-flash")
