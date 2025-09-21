import { Link } from "wouter";
import { Search, User, ShoppingBag, Menu, X, Minus, Plus, Heart, LogOut } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HeaderProps {
  className?: string;
  variant?: "transparent" | "solid";
}

export function Header({ className = "absolute top-0 left-0 right-0 z-50 bg-transparent", variant = "transparent" }: HeaderProps) {
  const { cartCount, isCartOpen, setIsCartOpen, cart, cartItems, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const getTotalPrice = () => {
    if (!cart) return 0;
    return cart.totalAmount;
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    // Redirect to checkout page using wouter's setLocation
    window.location.href = '/checkout';
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
                  <li><Link href="/shop" className={`transition-colors duration-200 ${
                    variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                  }`} data-testid="nav-shop">SHOP</Link></li>
                  <li><Link href="/about" className={`transition-colors duration-200 ${
                    variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                  }`} data-testid="nav-about">ABOUT US</Link></li>
                </ul>
              </nav>
              
              {/* Left side - User and Cart icons in normal position */}
              <div className={`absolute left-0 flex items-center space-x-6 ${
                variant === "solid" ? "text-foreground" : "text-white"
              }`}>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={`transition-colors duration-200 ${
                        variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                      }`} data-testid="button-account">
                        <User className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="w-full cursor-pointer">
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={logout} 
                        className="text-red-600 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <button className={`transition-colors duration-200 ${
                      variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                    }`} data-testid="button-account">
                      <User className="w-5 h-5" />
                    </button>
                  </Link>
                )}
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
          <DialogTitle className="sr-only">Shopping Cart</DialogTitle>
          <div className="space-y-6">
            {/* Cart Header */}
            <div className="border-b pb-4">
              <h2 className="text-2xl font-serif font-bold">Shopping Cart ({cartCount} items)</h2>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
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
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 border-b pb-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-lg font-bold text-terracotta">
                        ₹{(item.priceAtTime * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Price when added: ₹{item.priceAtTime.toLocaleString()}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                        disabled={isLoading}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                        disabled={isLoading}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.productId)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        disabled={isLoading}
                      >
                        <X className="w-4 h-4" />
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
                    disabled={isLoading}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    disabled={isLoading || cartItems.length === 0}
                    className="text-red-600 hover:text-red-700"
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white"
                    onClick={handleCheckout}
                    disabled={isLoading || cartItems.length === 0}
                  >
                    {isLoading ? 'Loading...' : 'Checkout'}
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