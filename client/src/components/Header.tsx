import { Link, useLocation } from "wouter";
import { Search, User, ShoppingBag, Menu, X, Minus, Plus, Heart } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  className?: string;
  variant?: "transparent" | "solid";
}

export function Header({ className = "absolute top-0 left-0 right-0 z-50 bg-transparent", variant = "transparent" }: HeaderProps) {
  const { cartCount, isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }
    setIsCartOpen(false);
    setLocation('/checkout');
  };

  return (
    <>
      <header className={className}>
        <div className="container mx-auto px-6 py-6">
          {/* Brand Name */}
          <div className="text-center mb-6">
            <Link href="/">
              <h1 className={`font-serif text-3xl md:text-4xl font-bold tracking-wider cursor-pointer transition-colors duration-200 ${
                variant === "solid" 
                  ? "text-foreground hover:text-terracotta" 
                  : "text-white hover:text-cream"
              }`} data-testid="brand-logo">
                SM FURNISHINGS
              </h1>
            </Link>
          </div>
          
          {/* Top horizontal line - 80% of page width */}
          <div className={`w-4/5 h-px mb-3 mx-auto ${
            variant === "solid" ? "bg-foreground/20" : "bg-white/30"
          }`}></div>
          
          {/* Navigation Container */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Navigation section - between lines */}
            <div className="relative flex items-center justify-center py-2">
              {/* Main Navigation - Center */}
              <nav className="hidden md:flex">
                <ul className={`flex space-x-12 font-medium ${
                  variant === "solid" ? "text-foreground" : "text-white"
                }`}>
                  <li><Link href="/" className={`transition-colors duration-200 ${
                    variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                  }`} data-testid="nav-home">HOME</Link></li>
                  <li><Link href="/category/living-room" className={`transition-colors duration-200 ${
                    variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                  }`} data-testid="nav-category">CATEGORY</Link></li>
                  <li><Link href="/shop" className={`transition-colors duration-200 ${
                    variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                  }`} data-testid="nav-shop">SHOP</Link></li>
                  <li><Link href="/blog" className={`transition-colors duration-200 ${
                    variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                  }`} data-testid="nav-blog">BLOG</Link></li>
                  <li><Link href="/about" className={`transition-colors duration-200 ${
                    variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                  }`} data-testid="nav-about">ABOUT US</Link></li>
                </ul>
              </nav>
              
              {/* Left side - User and Cart icons in normal position */}
              <div className={`absolute left-0 flex items-center space-x-6 ${
                variant === "solid" ? "text-foreground" : "text-white"
              }`}>
                <button className={`transition-colors duration-200 ${
                  variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                }`} data-testid="button-account">
                  <User className="w-5 h-5" />
                </button>
                <button 
                  className={`relative transition-colors duration-200 ${
                    variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                  }`}
                  data-testid="button-cart"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="cart-count">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Right side - Only Search and Heart icons moved far right */}
              <div className={`absolute right-0 flex items-center space-x-6 ${
                variant === "solid" ? "text-foreground" : "text-white"
              }`}>
                <button className={`transition-colors duration-200 ${
                  variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                }`} data-testid="button-search">
                  <Search className="w-5 h-5" />
                </button>
                <button className={`transition-colors duration-200 ${
                  variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                }`} data-testid="button-heart">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              {/* Mobile Menu Button */}
              <button className={`md:hidden ${
                variant === "solid" ? "text-foreground" : "text-white"
              }`} data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </button>
            </div>
            
          </div>
          
          {/* Bottom horizontal line - 80% of page width */}
          <div className={`w-4/5 h-px mt-3 mx-auto ${
            variant === "solid" ? "bg-foreground/20" : "bg-white/30"
          }`}></div>
        </div>
      </header>

      {/* Cart Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Cart Header */}
            <div className="border-b pb-4">
              <h2 className="text-2xl font-serif font-bold">Shopping Cart ({cartCount} items)</h2>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Let's fill it with beautiful furniture!</p>
                <Button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-terracotta hover:bg-terracotta-dark text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-lg font-bold text-terracotta">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Cart Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-terracotta">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}