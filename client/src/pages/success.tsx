import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';

export default function SuccessPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto redirect to home after 10 seconds
    const timer = setTimeout(() => {
      setLocation('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="solid" />
      
      <div className="container mx-auto px-6 py-12 mt-40">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center py-12">
            <CardContent className="space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              
              {/* Success Message */}
              <div className="space-y-4">
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Order Placed Successfully!
                </h1>
                
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">
                    Thanks for ordering with us!
                  </p>
                  <p className="text-muted-foreground">
                    We will address your order shortly and deliver it to your doorstep.
                  </p>
                  <p className="text-lg font-medium text-terracotta">
                    Happy Shopping! 🎉
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">Your order is being processed</span>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• You will receive a confirmation call within 24 hours</p>
                  <p>• Delivery will be done within 5-7 business days</p>
                  <p>• Pay cash on delivery when your order arrives</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setLocation('/shop')}
                  className="gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Continue Shopping
                </Button>
                
                <Button 
                  onClick={() => setLocation('/')}
                  className="bg-terracotta hover:bg-terracotta-dark text-white gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </div>

              {/* Auto redirect notice */}
              <p className="text-xs text-muted-foreground">
                You will be automatically redirected to home in 10 seconds
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}