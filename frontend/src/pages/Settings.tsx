import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, User, Bell, Shield, Globe, Store } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-blue-400">⚙️ Settings</h1>
              <p className="text-sm text-blue-200">Manage your account & preferences</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Settings */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-400" />
            <h3 className="text-xl font-bold">Profile Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Business Name</Label>
              <Input defaultValue="Sharma's Food Corner" className="bg-gray-800 border-gray-700" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Owner Name</Label>
                <Input defaultValue="Rajesh Sharma" className="bg-gray-800 border-gray-700" />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input defaultValue="+91 98765 43210" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input defaultValue="rajesh@example.com" className="bg-gray-800 border-gray-700" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </div>
        </Card>

        {/* Business Settings */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Store className="h-5 w-5 text-green-400" />
            <h3 className="text-xl font-bold">Business Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Business Type</Label>
              <Input defaultValue="Street Food Vendor" className="bg-gray-800 border-gray-700" />
            </div>
            <div>
              <Label>Location</Label>
              <Input defaultValue="Gateway of India, Mumbai" className="bg-gray-800 border-gray-700" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Opening Time</Label>
                <Input type="time" defaultValue="09:00" className="bg-gray-800 border-gray-700" />
              </div>
              <div>
                <Label>Closing Time</Label>
                <Input type="time" defaultValue="22:00" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">Update Business</Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-yellow-400" />
            <h3 className="text-xl font-bold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Stock Alerts</p>
                <p className="text-sm text-gray-400">Get notified when inventory is low</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Customer Reviews</p>
                <p className="text-sm text-gray-400">Notifications for new feedback</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sales Reports</p>
                <p className="text-sm text-gray-400">Daily sales summary</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Festival Reminders</p>
                <p className="text-sm text-gray-400">Upcoming events and trends</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Language & Region */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-cyan-400" />
            <h3 className="text-xl font-bold">Language & Region</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Preferred Language</p>
                <p className="text-sm text-gray-400">Current: {language === 'en' ? 'English' : 'हिंदी'}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="border-cyan-600 text-cyan-400"
              >
                Switch to {language === 'en' ? 'हिंदी' : 'English'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-red-400" />
            <h3 className="text-xl font-bold">Security</h3>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full border-red-600 text-red-400">
              Change Password
            </Button>
            <Button variant="outline" className="w-full border-orange-600 text-orange-400">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full border-gray-600 text-gray-400">
              Privacy Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
