import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bell, Package, Star, TrendingUp, Gift, Users, Calendar } from 'lucide-react';

interface Notification {
  id: string;
  type: 'stock' | 'review' | 'sales' | 'offer' | 'community' | 'event';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const notifications: Notification[] = [
    { id: '1', type: 'stock', title: 'Low Stock Alert', message: 'Onions running low (2kg remaining)', time: '5 min ago', read: false },
    { id: '2', type: 'review', title: 'New Review', message: 'Rahul S. gave 5 stars for Paneer Roll', time: '1 hour ago', read: false },
    { id: '3', type: 'sales', title: 'Sales Milestone', message: 'You crossed ₹15,000 today! 🎉', time: '2 hours ago', read: true },
    { id: '4', type: 'offer', title: 'Offer Active', message: 'Lunch Rush Special is now live', time: '3 hours ago', read: true },
    { id: '5', type: 'community', title: 'Community Request', message: 'Vendor nearby needs tomatoes', time: '5 hours ago', read: false },
    { id: '6', type: 'event', title: 'Festival Alert', message: 'Diwali in 5 days - Prepare special menu', time: '1 day ago', read: true },
    { id: '7', type: 'stock', title: 'Expiry Warning', message: 'Paneer expires in 2 days', time: '1 day ago', read: true },
    { id: '8', type: 'sales', title: 'Peak Hours', message: 'High traffic expected 7PM-9PM today', time: '2 days ago', read: true },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'stock': return <Package className="h-5 w-5 text-blue-400" />;
      case 'review': return <Star className="h-5 w-5 text-yellow-400" />;
      case 'sales': return <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'offer': return <Gift className="h-5 w-5 text-pink-400" />;
      case 'community': return <Users className="h-5 w-5 text-orange-400" />;
      case 'event': return <Calendar className="h-5 w-5 text-purple-400" />;
      default: return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-900 to-black border-b border-orange-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-orange-400">🔔 Notifications</h1>
                <p className="text-sm text-orange-200">Stay updated with your business</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-red-600 text-white">
                {unreadCount} New
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-4 text-center">
            <Package className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Stock</p>
            <p className="text-2xl font-bold text-white">
              {notifications.filter(n => n.type === 'stock').length}
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-700 p-4 text-center">
            <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Reviews</p>
            <p className="text-2xl font-bold text-white">
              {notifications.filter(n => n.type === 'review').length}
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-pink-700 p-4 text-center">
            <Gift className="h-8 w-8 text-pink-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Offers</p>
            <p className="text-2xl font-bold text-white">
              {notifications.filter(n => n.type === 'offer').length}
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-700 p-4 text-center">
            <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Community</p>
            <p className="text-2xl font-bold text-white">
              {notifications.filter(n => n.type === 'community').length}
            </p>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">All Notifications</h2>
            <Button size="sm" variant="outline" className="border-orange-600 text-orange-400">
              Mark All as Read
            </Button>
          </div>

          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 cursor-pointer hover:scale-[1.02] transition-transform ${
                notification.read
                  ? 'bg-gradient-to-br from-gray-900 to-black border-gray-700'
                  : 'bg-gradient-to-br from-gray-800 to-black border-orange-700'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white">{notification.title}</h3>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                  <p className="text-gray-300 text-sm">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
