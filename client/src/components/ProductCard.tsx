import { Button } from "@/components/ui/button";
import { HomeProduct } from "@/data/products";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: HomeProduct;
  variant: "bestseller" | "luxury";
  testIdPrefix?: string;
  showAddToCart?: boolean;
}

export function ProductCard({ product, variant, testIdPrefix = "product", showAddToCart = true }: ProductCardProps) {
  const { addToCart, getCartItemQuantity, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const cartQuantity = getCartItemQuantity(product.id.toString());
  
  // Extract numeric price from string (e.g., "$899" -> 899)
  const extractPrice = (priceString: string): number => {
    return parseInt(priceString.replace(/[^0-9]/g, '')) || 0;
  };
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Please Login",
        description: "You need to login to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsAnimating(true);
      // For now, we'll use the product ID as string since the backend expects string IDs
      // In a real implementation, you'd need to map these to actual backend product IDs
      await addToCart(product.id.toString(), 1);
      
      // Show success animation
      setTimeout(() => setIsAnimating(false), 600);
    } catch (error) {
      setIsAnimating(false);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };
  if (variant === "luxury") {
    return (
      <div 
        className="relative overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[300px] max-w-[80%] md:w-[220px] mx-auto md:mx-0"
        style={{
          height: '280px',
          background: '#FFF9EA',
          borderRadius: '50px'
        }}
        data-testid={`${testIdPrefix}-card-${product.id}`}
      >
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '50px' }}>
          <img 
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
            data-testid={`${testIdPrefix}-image-${product.id}`}
          />
          {/* Gradient overlay matching the CSS specification */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(206.76deg, rgba(255, 249, 234, 0) 10.24%, rgba(255, 249, 234, 0.0512821) 57.67%, rgba(255, 249, 234, 0.6) 72.26%, #FFF9EA 89.28%)',
              borderRadius: '50px'
            }}
          ></div>
        </div>
        <div className="absolute bottom-1 left-6 right-6">
          <h4 
            className="text-black text-left capitalize mb-2"
            style={{
              fontFamily: 'Prata, serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '24px'
            }}
            data-testid={`${testIdPrefix}-name-${product.id}`}
          >
            {product.name}
          </h4>
          <p 
            className="text-black capitalize mb-2"
            style={{
              fontFamily: 'Prata, serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '18px'
            }}
            data-testid={`${testIdPrefix}-price-${product.id}`}
          >
            {product.price}
          </p>
          {showAddToCart && (
            <div className="flex items-center justify-between">
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isLoading}
                className="bg-terracotta hover:bg-terracotta-dark text-white text-xs px-3 py-1 h-7 transition-all duration-200"
                data-testid={`${testIdPrefix}-add-to-cart-${product.id}`}
              >
                {isAnimating ? (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : cartQuantity > 0 ? (
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" />
                    <span>In Cart ({cartQuantity})</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </div>
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-gray-600 hover:text-terracotta"
                data-testid={`${testIdPrefix}-wishlist-${product.id}`}
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default bestseller variant with new styling effects
  return (
    <div 
      className="relative overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[300px] max-w-[80%] md:w-[220px] mx-auto md:mx-0"
      style={{
        height: '280px',
        background: '#FFF9EA',
        borderRadius: '50px'
      }}
      data-testid={`${testIdPrefix}-card-${product.id}`}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '50px' }}>
        <img 
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover"
          data-testid={`${testIdPrefix}-image-${product.id}`}
        />
        {/* Gradient overlay matching the CSS specification */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(206.76deg, rgba(255, 249, 234, 0) 10.24%, rgba(255, 249, 234, 0.0512821) 57.67%, rgba(255, 249, 234, 0.6) 72.26%, #FFF9EA 89.28%)',
            borderRadius: '50px'
          }}
        ></div>
      </div>
      <div className="absolute bottom-1 left-6 right-6">
        <h4 
          className="text-black mb-1 text-left capitalize"
          style={{
            fontFamily: 'Prata, serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '24px'
          }}
          data-testid={`${testIdPrefix}-name-${product.id}`}
        >
          {product.name}
        </h4>
        <p 
          className="text-black capitalize mb-2"
          style={{
            fontFamily: 'Prata, serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '18px'
          }}
          data-testid={`${testIdPrefix}-price-${product.id}`}
        >
          {product.price}
        </p>
        {showAddToCart && (
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading}
              className="bg-terracotta hover:bg-terracotta-dark text-white text-xs px-3 py-1 h-7 transition-all duration-200"
              data-testid={`${testIdPrefix}-add-to-cart-${product.id}`}
            >
              {isAnimating ? (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : cartQuantity > 0 ? (
                <div className="flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  <span>In Cart ({cartQuantity})</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add to Cart</span>
                </div>
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-gray-600 hover:text-terracotta"
              data-testid={`${testIdPrefix}-wishlist-${product.id}`}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}