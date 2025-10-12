import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, MapPin, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import communityImage from '@/assets/community-hub.jpg';

interface CommunityPost {
  id: string;
  type: 'request' | 'offer' | 'festival-help';
  userName: string;
  item: string;
  quantity: string;
  urgency: 'normal' | 'urgent';
  distance: number;
  isVerified: boolean;
  phone: string;
  timestamp: Date;
  description: string;
  isFestivalHelp?: boolean;
  totalOrders?: number;
  profitShare?: string;
}

const CommunityHub = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'requests' | 'offers' | 'festival-help'>('requests');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postType, setPostType] = useState<'request' | 'offer'>('request');
  
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    description: '',
    urgency: 'normal' as 'normal' | 'urgent',
    totalOrders: '',
    profitShare: '50',
  });

  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      type: 'request',
      userName: 'Rajesh Kumar',
      item: 'Paneer',
      quantity: '20 kg',
      urgency: 'urgent',
      distance: 1.2,
      isVerified: true,
      phone: '+91 98765 43210',
      timestamp: new Date(Date.now() - 3600000),
      description: 'Need for Navratri orders. Urgent requirement!',
    },
    {
      id: '2',
      type: 'offer',
      userName: 'Priya Sharma',
      item: 'Tomatoes',
      quantity: '15 kg',
      urgency: 'normal',
      distance: 0.8,
      isVerified: true,
      phone: '+91 98765 43211',
      timestamp: new Date(Date.now() - 7200000),
      description: 'Fresh tomatoes, slightly overstock. Good price available.',
    },
    {
      id: '3',
      type: 'request',
      userName: 'Amit Patel',
      item: 'Cooking Oil',
      quantity: '10 liters',
      urgency: 'normal',
      distance: 2.5,
      isVerified: false,
      phone: '+91 98765 43212',
      timestamp: new Date(Date.now() - 10800000),
      description: 'Need refined oil for festival cooking',
    },
    {
      id: '4',
      type: 'offer',
      userName: 'Meena Devi',
      item: 'Fresh Coriander',
      quantity: '5 kg',
      urgency: 'urgent',
      distance: 1.5,
      isVerified: true,
      phone: '+91 98765 43213',
      timestamp: new Date(Date.now() - 14400000),
      description: 'Excess stock, must sell today. Best price!',
    },
    {
      id: '5',
      type: 'festival-help',
      userName: 'Ramesh Vendors',
      item: 'Diwali Special Orders',
      quantity: '50 orders',
      urgency: 'urgent',
      distance: 0.5,
      isVerified: true,
      phone: '+91 98765 43215',
      timestamp: new Date(Date.now() - 1800000),
      description: 'High demand during Diwali! Need nearby restaurants to help fulfill orders. Good profit opportunity!',
      isFestivalHelp: true,
      totalOrders: 50,
      profitShare: '40% of revenue',
    },
  ]);

  const handleSubmitPost = () => {
    if (!formData.item || !formData.quantity) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      type: postType,
      userName: 'You',
      item: formData.item,
      quantity: formData.quantity,
      urgency: formData.urgency,
      distance: 0,
      isVerified: true,
      phone: '+91 98765 43214',
      timestamp: new Date(),
      description: formData.description,
    };

    setPosts([newPost, ...posts]);
    setIsPostModalOpen(false);
    setFormData({ item: '', quantity: '', description: '', urgency: 'normal', totalOrders: '', profitShare: '50' });

    toast({
      title: postType === 'request' ? 'Request posted!' : 'Offer posted!',
      description: 'Your post is now visible to the community',
    });
  };

  const handleContact = (post: CommunityPost) => {
    toast({
      title: 'Contact Information',
      description: `Call ${post.userName} at ${post.phone}`,
    });
  };

  const handleAcceptHelp = (post: CommunityPost) => {
    toast({
      title: 'Help Request Accepted!',
      description: `You've accepted to help with ${post.totalOrders} orders. Profit share: ${post.profitShare}`,
    });
  };

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'requests') return post.type === 'request';
    if (activeTab === 'offers') return post.type === 'offer';
    if (activeTab === 'festival-help') return post.type === 'festival-help';
    return false;
  });

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-black border-b border-blue-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-blue-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{t('community.title')}</h1>
              <p className="text-sm text-blue-200">{t('community.subtitle')}</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={communityImage}
          alt="Community Hub"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h2 className="text-3xl font-bold mb-2 animate-fade-in-up">Build Your Vendor Network</h2>
            <p className="text-blue-200 animate-fade-in-up">Exchange ingredients, share resources, grow together</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 ${
              activeTab === 'requests'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            {t('community.requests')} ({posts.filter((p) => p.type === 'request').length})
          </Button>
          <Button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 ${
              activeTab === 'offers'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {t('community.offers')} ({posts.filter((p) => p.type === 'offer').length})
          </Button>
          <Button
            onClick={() => setActiveTab('festival-help')}
            className={`flex-1 ${
              activeTab === 'festival-help'
                ? 'bg-orange-600 hover:bg-orange-700'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            🎉
            <span className="ml-2">Festival Help ({posts.filter((p) => p.type === 'festival-help').length})</span>
          </Button>
        </div>

        {/* Post Buttons */}
        <div className="flex gap-2 mb-6">
          <Dialog open={isPostModalOpen && postType === 'request'} onOpenChange={(open) => {
            setIsPostModalOpen(open);
            setPostType('request');
          }}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                <Plus className="h-5 w-5 mr-2" />
                {t('community.postRequest')}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white border-blue-700">
              <DialogHeader>
                <DialogTitle>Post Ingredient Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-blue-200">Item Name *</label>
                  <Input
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                    placeholder="e.g., Paneer, Tomatoes"
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-200">Quantity *</label>
                  <Input
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g., 20 kg"
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-200">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Additional details..."
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.urgency === 'urgent'}
                    onChange={(e) =>
                      setFormData({ ...formData, urgency: e.target.checked ? 'urgent' : 'normal' })
                    }
                    className="rounded"
                  />
                  <label className="text-sm">Mark as Urgent</label>
                </div>
                <Button onClick={handleSubmitPost} className="w-full bg-blue-600 hover:bg-blue-700">
                  Post Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isPostModalOpen && postType === 'offer'} onOpenChange={(open) => {
            setIsPostModalOpen(open);
            setPostType('offer');
          }}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <Plus className="h-5 w-5 mr-2" />
                {t('community.postOffer')}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white border-blue-700">
              <DialogHeader>
                <DialogTitle>Post Ingredient Offer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-blue-200">Item Name *</label>
                  <Input
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                    placeholder="e.g., Paneer, Tomatoes"
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-200">Quantity *</label>
                  <Input
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g., 20 kg"
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-200">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Additional details..."
                    className="bg-gray-800 border-blue-700 text-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.urgency === 'urgent'}
                    onChange={(e) =>
                      setFormData({ ...formData, urgency: e.target.checked ? 'urgent' : 'normal' })
                    }
                    className="rounded"
                  />
                  <label className="text-sm">Urgent Sale</label>
                </div>
                <Button onClick={handleSubmitPost} className="w-full bg-blue-600 hover:bg-blue-700">
                  Post Offer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className={`bg-gradient-to-br from-gray-900 to-black border-blue-700 p-4 animate-fade-in-up card-hover ${
                post.urgency === 'urgent' ? 'border-orange-500 animate-pulse-glow' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{post.item}</h3>
                  <p className="text-sm text-blue-200">Quantity: {post.quantity}</p>
                </div>
                <div className="flex gap-2">
                  {post.urgency === 'urgent' && (
                    <Badge className="bg-orange-600 text-white">
                      {t('community.urgent')}
                    </Badge>
                  )}
                  {post.isVerified && (
                    <Badge className="bg-green-600 text-white">
                      {t('community.verified')}
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-3">{post.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {post.distance} {t('community.distance')}
                  </span>
                  <span>{post.timestamp.toLocaleDateString()}</span>
                </div>
                <span className="font-medium text-white">{post.userName}</span>
              </div>

              {post.isFestivalHelp && (
                <div className="mb-3 p-3 bg-orange-900/30 border border-orange-600 rounded">
                  <p className="text-sm text-orange-200 mb-1">
                    <strong>Total Orders:</strong> {post.totalOrders}
                  </p>
                  <p className="text-sm text-orange-200">
                    <strong>Profit Share:</strong> {post.profitShare}
                  </p>
                </div>
              )}

              {post.isFestivalHelp ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAcceptHelp(post)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    Accept & Help
                  </Button>
                  <Button
                    onClick={() => handleContact(post)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleContact(post)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {t('community.contact')}
                </Button>
              )}
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-700 p-8 text-center">
            <p className="text-gray-400">
              No {activeTab} found. Be the first to post!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommunityHub;
