import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWishlist } from '@/lib/wishlistContext';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/hooks/use-toast';
import { formatPrice, getProductImageUrl } from '@/lib/api';
import { 
  X, 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Package,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLocation } from 'wouter';

export function WishlistSidebar() {
  const {
    wishlistItems,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    clearWishlist
  } = useWishlist();
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

  const handleAddToCart = async (productId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const item = wishlistItems.find(item => item.id === productId);
    if (!item) return;

    try {
      setAnimatingItems(prev => {
        const newSet = new Set(prev);
        newSet.add(productId);
        return newSet;
      });
      
      await addToCart(productId, 1);
      
      toast({
        title: "Added to cart",
        description: `${item.product.Product_Name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setAnimatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 600);
    }
  };

  const handleRemoveFromWishlist = (productId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    removeFromWishlist(productId);
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
    setIsWishlistOpen(false);
  };

  const handleClearAll = () => {
    clearWishlist();
  };

  return (
    <>
      {/* Backdrop */}
      {isWishlistOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsWishlistOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out transform
        ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-terracotta to-terracotta-dark text-white">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 fill-current" />
            <h2 className="text-xl font-semibold">My Wishlist</h2>
            {wishlistCount > 0 && (
              <Badge className="bg-white text-terracotta font-bold">
                {wishlistCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsWishlistOpen(false)}
            className="text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {wishlistItems.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-terracotta/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-terracotta/40" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Save items you love for later by clicking the heart icon</p>
              <Button
                onClick={() => {
                  setLocation('/shop');
                  setIsWishlistOpen(false);
                }}
                className="bg-terracotta hover:bg-terracotta-dark text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </div>
          ) : (
            /* Wishlist Items */
            <>
              {/* Clear All Button */}
              <div className="p-4 border-b">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="w-full text-gray-600 hover:text-red-600 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All ({wishlistCount})
                </Button>
              </div>

              {/* Scrollable Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {wishlistItems.map((item) => (
                  <Card 
                    key={item.id} 
                    className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200 hover:border-terracotta/30"
                    onClick={() => handleProductClick(item.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex space-x-3">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          <img 
                            src={getProductImageUrl(item.product, 0)}
                            alt={item.product.Product_Name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          {/* Fallback placeholder */}
                          <div 
                            className="hidden w-full h-full flex items-center justify-center text-2xl font-serif font-bold text-gray-400 group-hover:scale-105 transition-transform duration-200"
                            style={{
                              background: `linear-gradient(135deg, ${item.product.Color ? '#B8734C' : '#6B7280'}20, ${item.product.Color ? '#B8734C' : '#6B7280'}40)`
                            }}
                          >
                            {item.product.Product_Name.charAt(0)}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm leading-5 group-hover:text-terracotta transition-colors duration-200 truncate">
                            {item.product.Product_Name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.product.Category} • {item.product.Color}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-lg font-bold text-terracotta">
                              {formatPrice(item.product.Selling_Price)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {item.product.Collection}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 mt-3">
                        <Button
                          size="sm"
                          className={`flex-1 text-xs ${animatingItems.has(item.id) ? 'bg-green-500' : 'bg-terracotta'} hover:bg-terracotta-dark text-white transition-all duration-200`}
                          onClick={(e) => handleAddToCart(item.id, e)}
                          disabled={animatingItems.has(item.id)}
                        >
                          {animatingItems.has(item.id) ? (
                            <>
                              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-500 hover:text-red-600 hover:border-red-300 transition-colors"
                          onClick={(e) => handleRemoveFromWishlist(item.id, e)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              {/* Footer Actions */}
              <div className="p-4 space-y-3">
                <Button
                  className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold"
                  onClick={() => {
                    setLocation('/shop');
                    setIsWishlistOpen(false);
                  }}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  {wishlistCount} item{wishlistCount !== 1 ? 's' : ''} saved for later
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}