import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Upload, Mic, CheckCircle } from 'lucide-react';

type RegistrationStep = 'account' | 'business' | 'menu' | 'inventory';

interface MenuItem {
  name: string;
  price: string;
  ingredients: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('account');
  const [formData, setFormData] = useState({
    // Account Setup
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Business Details
    businessType: '',
    businessName: '',
    location: '',
    operatingHours: '',
    
    // Menu Items
    menuItems: [] as MenuItem[],
    
    // Initial Inventory
    initialStock: '',
  });

  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem>({
    name: '',
    price: '',
    ingredients: '',
  });

  const businessTypes = [
    'Street Food Vendor',
    'Small Restaurant',
    'Food Stall',
    'Boutique',
    'Handicraft',
    'Tourism',
    'Café',
  ];

  const steps: RegistrationStep[] = ['account', 'business', 'menu', 'inventory'];
  const stepIndex = steps.indexOf(currentStep);

  const handleNext = () => {
    // Validation
    if (currentStep === 'account') {
      if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all account details including password',
          variant: 'destructive',
        });
        return;
      }
      if (formData.password.length < 6) {
        toast({
          title: 'Weak Password',
          description: 'Password must be at least 6 characters long',
          variant: 'destructive',
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: 'Passwords Do Not Match',
          description: 'Please ensure password and confirm password match',
          variant: 'destructive',
        });
        return;
      }
    }

    if (currentStep === 'business' && (!formData.businessType || !formData.businessName)) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in business details',
        variant: 'destructive',
      });
      return;
    }

    const nextStepIndex = stepIndex + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(steps[nextStepIndex]);
    }
  };

  const handleBack = () => {
    const prevStepIndex = stepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[prevStepIndex]);
    }
  };

  const handleAddMenuItem = () => {
    if (!currentMenuItem.name || !currentMenuItem.price) {
      toast({
        title: 'Incomplete Item',
        description: 'Please fill in item name and price',
        variant: 'destructive',
      });
      return;
    }

    setFormData({
      ...formData,
      menuItems: [...formData.menuItems, currentMenuItem],
    });

    setCurrentMenuItem({ name: '', price: '', ingredients: '' });
    
    toast({
      title: 'Menu Item Added',
      description: `${currentMenuItem.name} has been added to your menu`,
    });
  };

  const handleSubmit = () => {
    toast({
      title: 'Registration Complete!',
      description: 'Welcome to RasoiMitra. Redirecting to dashboard...',
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleVoiceInput = () => {
    toast({
      title: 'Voice Recording',
      description: 'Speak your menu items now...',
    });
  };

  const handleCSVUpload = () => {
    toast({
      title: 'CSV Upload',
      description: 'Please select your menu CSV file',
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'account':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Create Your Account</h2>
              <p className="text-blue-200">Let's get you started on your business journey</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-blue-200">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="bg-gray-900 border-blue-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-blue-200">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="bg-gray-900 border-blue-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-blue-200">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="bg-gray-900 border-blue-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-blue-200">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter a secure password"
                  className="bg-gray-900 border-blue-700 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters.</p>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-blue-200">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  className="bg-gray-900 border-blue-700 text-white"
                />
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-400 mb-4">Or sign up with:</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-blue-700 text-white bg-gray-900 hover:bg-blue-900">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </Button>
                  <Button variant="outline" className="flex-1 border-blue-700 text-white bg-gray-900 hover:bg-blue-900">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Phone/OTP
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Business Details</h2>
              <p className="text-blue-200">Tell us about your business</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessType" className="text-blue-200">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <SelectTrigger className="bg-gray-900 border-blue-700 text-white">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-blue-700">
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-white">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="businessName" className="text-blue-200">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g., Mumbai Chaat Corner"
                  className="bg-gray-900 border-blue-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-blue-200">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter address or use GPS"
                    className="bg-gray-900 border-blue-700 text-white"
                  />
                  <Button variant="outline" className="border-blue-700 text-white">
                    📍 GPS
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="operatingHours" className="text-blue-200">Operating Hours</Label>
                <Input
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                  placeholder="e.g., 10 AM - 10 PM"
                  className="bg-gray-900 border-blue-700 text-white"
                />
              </div>
            </div>
          </div>
        );

      case 'menu':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Menu / Products</h2>
              <p className="text-blue-200">Add your menu items or products</p>
            </div>

            {/* Input Methods */}
            <div className="flex gap-2">
              <Button
                onClick={handleVoiceInput}
                variant="outline"
                className="flex-1 border-blue-700 text-white"
              >
                <Mic className="h-4 w-4 mr-2" />
                Voice Entry
              </Button>
              <Button
                onClick={handleCSVUpload}
                variant="outline"
                className="flex-1 border-blue-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload CSV
              </Button>
            </div>

            {/* Manual Entry Form */}
            <Card className="bg-gray-900 border-blue-700 p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="itemName" className="text-blue-200">Item Name *</Label>
                  <Input
                    id="itemName"
                    value={currentMenuItem.name}
                    onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, name: e.target.value })}
                    placeholder="e.g., Paneer Roll"
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="itemPrice" className="text-blue-200">Price (₹) *</Label>
                  <Input
                    id="itemPrice"
                    type="number"
                    value={currentMenuItem.price}
                    onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, price: e.target.value })}
                    placeholder="50"
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="ingredients" className="text-blue-200">Ingredients / Materials</Label>
                  <Textarea
                    id="ingredients"
                    value={currentMenuItem.ingredients}
                    onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, ingredients: e.target.value })}
                    placeholder="Paneer, onions, spices..."
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>

                <Button
                  onClick={handleAddMenuItem}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Add to Menu
                </Button>
              </div>
            </Card>

            {/* Menu Items List */}
            {formData.menuItems.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Your Menu ({formData.menuItems.length} items)</h3>
                <div className="space-y-2">
                  {formData.menuItems.map((item, index) => (
                    <Card key={index} className="bg-gray-900 border-blue-700 p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-white">{item.name}</h4>
                          <p className="text-sm text-green-400">₹{item.price}</p>
                          {item.ingredients && (
                            <p className="text-xs text-gray-400 mt-1">{item.ingredients}</p>
                          )}
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Initial Inventory</h2>
              <p className="text-blue-200">Set up your starting stock levels (optional)</p>
            </div>

            <Card className="bg-gray-900 border-blue-700 p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initialStock" className="text-blue-200">Stock Details</Label>
                  <Textarea
                    id="initialStock"
                    value={formData.initialStock}
                    onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
                    placeholder="Example:&#10;Paneer - 10 kg&#10;Tomatoes - 20 kg&#10;Onions - 15 kg"
                    rows={8}
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>

                <p className="text-sm text-gray-400">
                  💡 Tip: You can add this later from your dashboard. The system will auto-generate baseline forecasts based on your menu.
                </p>

                <Button
                  onClick={() => {
                    setFormData({ ...formData, initialStock: '' });
                    toast({
                      title: 'Inventory Cleared',
                      description: 'You can set this up later',
                    });
                  }}
                  variant="outline"
                  className="w-full border-blue-700 text-white"
                >
                  Skip for Now
                </Button>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-black border-b border-blue-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => stepIndex === 0 ? navigate('/') : handleBack()}
              className="text-white hover:bg-blue-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold">Registration</h1>
              <p className="text-xs text-blue-200">
                Step {stepIndex + 1} of {steps.length}
              </p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900 h-2">
        <div
          className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {stepIndex > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 border-blue-700 text-white"
            >
              Back
            </Button>
          )}
          
          {stepIndex < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Complete Registration <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {currentStep === 'menu' && (
          <Button
            onClick={handleNext}
            variant="ghost"
            className="w-full mt-4 text-blue-400"
          >
            Skip and Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default Registration;
