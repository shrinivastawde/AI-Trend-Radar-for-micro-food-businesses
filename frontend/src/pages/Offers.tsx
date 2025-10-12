import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Gift, Plus, TrendingUp, Clock, MapPin, Share2 } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  discount: string;
  description: string;
  type: 'time' | 'location' | 'combo';
  status: 'active' | 'pending';
  validUntil: string;
}

const Offers = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [offers, setOffers] = useState<Offer[]>([
    { id: '1', title: 'Lunch Rush Special', discount: '20% OFF', description: 'On all items 12PM-2PM', type: 'time', status: 'active', validUntil: 'Today' },
    { id: '2', title: 'Tourist Area Discount', discount: '₹50 OFF', description: 'Near Gateway of India', type: 'location', status: 'active', validUntil: 'This Week' },
    { id: '3', title: 'Combo Deal', discount: 'Buy 2 Get 1', description: 'On Paneer Roll + Samosa', type: 'combo', status: 'pending', validUntil: 'Festival Season' },
    { id: '4', title: 'Weekend Special', discount: '30% OFF', description: 'Saturday & Sunday only', type: 'time', status: 'pending', validUntil: 'This Weekend' },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({ title: '', discount: '', description: '' });

  const handleCreateOffer = () => {
    const offer: Offer = {
      id: Date.now().toString(),
      title: newOffer.title,
      discount: newOffer.discount,
      description: newOffer.description,
      type: 'combo',
      status: 'pending',
      validUntil: '7 days',
    };
    setOffers([...offers, offer]);
    setNewOffer({ title: '', discount: '', description: '' });
    setIsCreateModalOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'time': return <Clock className="h-4 w-4" />;
      case 'location': return <MapPin className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const shareToWhatsApp = (offer: Offer) => {
    const message = `🎉 ${offer.title}\n${offer.discount}\n${offer.description}\n\nValid until: ${offer.validUntil}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-900 to-black border-b border-pink-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-pink-400">🎁 Dynamic Offers & Promotions</h1>
                <p className="text-sm text-pink-200">Boost sales with smart promotions</p>
              </div>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Offer
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white border-pink-700">
                <DialogHeader>
                  <DialogTitle>Create New Offer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Offer Title</Label>
                    <Input
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="e.g., Weekend Special"
                    />
                  </div>
                  <div>
                    <Label>Discount</Label>
                    <Input
                      value={newOffer.discount}
                      onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="e.g., 30% OFF"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={newOffer.description}
                      onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="e.g., On all items"
                    />
                  </div>
                  <Button onClick={handleCreateOffer} className="w-full bg-pink-600 hover:bg-pink-700">
                    Create Offer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-pink-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Offers</p>
                <p className="text-3xl font-bold text-white">
                  {offers.filter(o => o.status === 'active').length}
                </p>
              </div>
              <Gift className="h-10 w-10 text-pink-400" />
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-pink-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {offers.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-10 w-10 text-yellow-400" />
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-pink-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Sales Boost</p>
                <p className="text-3xl font-bold text-green-400">+25%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-400" />
            </div>
          </Card>
        </div>

        {/* Smart Recommendations */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-black border-purple-700 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <h3 className="text-xl font-bold">Intelligent Opportunities</h3>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li>🎯 Lunch hour foot traffic is high - Launch time-based offer</li>
            <li>📍 Tourist area nearby - Create location-based discount</li>
            <li>🎉 Diwali in 5 days - Festival combo offers recommended</li>
            <li>💡 Slow-moving items - Consider bundled deals</li>
          </ul>
        </Card>

        {/* Offers List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-4">Your Offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="bg-gradient-to-br from-gray-900 to-black border-pink-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(offer.type)}
                    <h3 className="text-xl font-bold text-white">{offer.title}</h3>
                  </div>
                  <Badge className={offer.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}>
                    {offer.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-3xl font-bold text-pink-400 mb-2">{offer.discount}</p>
                  <p className="text-gray-300">{offer.description}</p>
                  <p className="text-sm text-gray-400 mt-2">⏰ Valid until: {offer.validUntil}</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-pink-600 text-pink-400"
                    onClick={() => shareToWhatsApp(offer)}
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                  {offer.status === 'pending' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Activate
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
