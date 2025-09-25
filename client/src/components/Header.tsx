import { Link, useLocation } from "wouter";
import { User, ShoppingBag, Menu, X, Minus, Plus, Heart, LogOut } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { useWishlist } from "@/lib/wishlistContext";
import { useAuth } from "@/lib/authContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  className?: string;
  variant?: "transparent" | "solid";
}

export function Header({ className = "absolute top-0 left-0 right-0 z-50 bg-transparent", variant = "transparent" }: HeaderProps) {
  const { cartCount, isCartOpen, setIsCartOpen, cart, cartItems, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();
  const { wishlistCount, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Cart removal confirmation state
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<{productId: string, productName: string} | null>(null);
  
  // Search functionality removed as requested

  const getTotalPrice = () => {
    if (!cart) return 0;
    return cart.totalAmount;
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setLocation('/checkout');
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setLocation('/shop');
  };
  
  const handleRemoveClick = (productId: string, productName: string) => {
    setItemToRemove({ productId, productName });
    setShowRemoveDialog(true);
  };
  
  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.productId);
      setShowRemoveDialog(false);
      setItemToRemove(null);
    }
  };
  
  const handleMoveToWishlist = async () => {
    if (itemToRemove) {
      await toggleWishlist(itemToRemove.productId);
      await removeFromCart(itemToRemove.productId);
      setShowRemoveDialog(false);
      setItemToRemove(null);
      toast({
        title: "Moved to wishlist",
        description: `${itemToRemove.productName} has been moved to your wishlist`,
      });
    }
  };
  
  // Search functionality removed as requested

  return (
    <>
      <header className={className}>
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="container mx-auto px-6 py-6">
            {/* Brand Name */}
            <div className="text-center mb-6">
              <Link href="/">
                <h1 className={`text-3xl md:text-4xl font-bold tracking-wider cursor-pointer transition-colors duration-200 ${
                  variant === "solid" 
                    ? "text-foreground hover:text-terracotta" 
                    : "text-white hover:text-cream"
                }`} style={{ fontFamily: 'var(--font-quiche)' }} data-testid="brand-logo">
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
                <nav className="flex">
                  <ul className={`flex space-x-12 font-medium ${
                    variant === "solid" ? "text-foreground" : "text-white"
                  }`} style={{ fontFamily: '"Prata", serif' }}>
                    <li><Link href="/" className={`transition-colors duration-200 ${
                      variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                    }`} data-testid="nav-home">Home</Link></li>
                    <li><Link href="/shop" className={`transition-colors duration-200 ${
                      variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                    }`} data-testid="nav-shop">Shop</Link></li>
                    <li><Link href="/about" className={`transition-colors duration-200 ${
                      variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                    }`} data-testid="nav-about">About</Link></li>
                  </ul>
                </nav>
                
                {/* Left side - Profile and Search buttons */}
                <div className={`absolute left-0 flex items-center space-x-6 ${
                  variant === "solid" ? "text-foreground" : "text-white"
                }`}>
                  {isAuthenticated ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button 
                          className={`transition-colors duration-200 ${
                            variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                          }`} 
                          data-testid="button-account"
                          aria-label="Account menu"
                        >
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
                      <button 
                        className={`transition-colors duration-200 ${
                          variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                        }`} 
                        data-testid="button-account"
                        aria-label="Login"
                      >
                        <User className="w-5 h-5" />
                      </button>
                    </Link>
                  )}
                  {/* Search button hidden as requested */}
                </div>
                
                {/* Right side - Cart and Wishlist buttons */}
                <div className={`absolute right-0 flex items-center space-x-6 ${
                  variant === "solid" ? "text-foreground" : "text-white"
                }`}>
                  <button 
                    className={`relative transition-colors duration-200 ${
                      variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                    }`}
                    data-testid="button-cart"
                    onClick={() => setIsCartOpen(true)}
                    aria-label={`Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="cart-count">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <button 
                    className={`relative transition-colors duration-200 ${
                      variant === "solid" ? "hover:text-terracotta" : "hover:text-cream"
                    }`} 
                    data-testid="button-wishlist"
                    onClick={() => setIsWishlistOpen(true)}
                    aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}
                  >
                    <Heart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="wishlist-count">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bottom horizontal line - 80% of page width */}
            <div className={`w-4/5 h-px mt-3 mx-auto ${
              variant === "solid" ? "bg-foreground/20" : "bg-white/30"
            }`}></div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="px-4 py-3">
            {/* Brand Name - Centered */}
            <div className="text-center mb-3">
              <Link href="/">
                <h1 className={`text-lg font-bold tracking-wider cursor-pointer transition-colors duration-200 ${
                  variant === "solid" 
                    ? "text-foreground hover:text-terracotta" 
                    : "text-white hover:text-cream"
                }`} style={{ fontFamily: 'var(--font-quiche)' }} data-testid="brand-logo-mobile">
                  SM FURNISHINGS
                </h1>
              </Link>
            </div>
            
            {/* Mobile Navigation Bar */}
            <div className="flex items-center justify-between">
              {/* Left side - Profile and Cart */}
              <div className={`flex items-center space-x-4 ${
                variant === "solid" ? "text-foreground" : "text-white"
              }`}>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className={`w-11 h-11 flex items-center justify-center rounded-md active:scale-95 transition-all duration-200 ${
                          variant === "solid" ? "hover:text-terracotta hover:bg-terracotta/10" : "hover:text-cream hover:bg-white/10"
                        }`} 
                        data-testid="button-account-mobile"
                        aria-label="Account menu"
                      >
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
                    <button 
                      className={`w-11 h-11 flex items-center justify-center rounded-md active:scale-95 transition-all duration-200 ${
                        variant === "solid" ? "hover:text-terracotta hover:bg-terracotta/10" : "hover:text-cream hover:bg-white/10"
                      }`} 
                      data-testid="button-account-mobile"
                      aria-label="Login"
                    >
                      <User className="w-5 h-5" />
                    </button>
                  </Link>
                )}
                
                <button 
                  className={`relative w-11 h-11 flex items-center justify-center rounded-md active:scale-95 transition-all duration-200 ${
                    variant === "solid" ? "hover:text-terracotta hover:bg-terracotta/10" : "hover:text-cream hover:bg-white/10"
                  }`}
                  data-testid="button-cart-mobile"
                  onClick={() => setIsCartOpen(true)}
                  aria-label={`Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="cart-count-mobile">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Right side - Wishlist and More Menu */}
              <div className={`flex items-center space-x-4 ${
                variant === "solid" ? "text-foreground" : "text-white"
              }`}>
                <button 
                  className={`relative w-11 h-11 flex items-center justify-center rounded-md active:scale-95 transition-all duration-200 ${
                    variant === "solid" ? "hover:text-terracotta hover:bg-terracotta/10" : "hover:text-cream hover:bg-white/10"
                  }`} 
                  data-testid="button-wishlist-mobile"
                  onClick={() => setIsWishlistOpen(true)}
                  aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="wishlist-count-mobile">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button 
                      className={`w-11 h-11 flex items-center justify-center rounded-md active:scale-95 transition-all duration-200 pointer-events-auto z-50 ${
                        variant === "solid" ? "hover:text-terracotta hover:bg-terracotta/10" : "hover:text-cream hover:bg-white/10"
                      }`} 
                      data-testid="button-mobile-menu"
                      aria-label="Open menu"
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <SheetHeader className="hidden">
                      <SheetTitle>Menu</SheetTitle>
                      <SheetDescription>
                        Navigate through SM Furnishings
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 mt-6">
                      {/* Search hidden as requested */}
                      
                      {/* Navigation Links */}
                      <div className="space-y-2">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                            <span className="font-medium text-lg" style={{ fontFamily: '"Prata", serif' }}>Home</span>
                          </div>
                        </Link>
                        <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                            <span className="font-medium text-lg" style={{ fontFamily: '"Prata", serif' }}>Shop</span>
                          </div>
                        </Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                            <span className="font-medium text-lg" style={{ fontFamily: '"Prata", serif' }}>About</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
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
                <p className="text-muted-foreground mb-6">Let's fill it with beautiful furnishings!</p>
                {/* Continue Shopping - Hidden on mobile */}
                {!isMobile && (
                  <Button 
                    onClick={handleContinueShopping}
                    className="bg-terracotta hover:bg-terracotta-dark text-white"
                  >
                    Continue Shopping
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className={`flex items-center border-b pb-4 ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
                    {/* Product Image */}
                    <div className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} rounded-lg overflow-hidden flex-shrink-0`}>
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium truncate ${isMobile ? 'text-sm' : ''}`}>{item.productName}</h3>
                      <p className={`font-bold text-terracotta ${isMobile ? 'text-sm' : 'text-lg'}`}>
                        ₹{(item.priceAtTime * item.quantity).toLocaleString()}
                      </p>
                      {!isMobile && (
                        <p className="text-xs text-muted-foreground">
                          Price when added: ₹{item.priceAtTime.toLocaleString()}
                        </p>
                      )}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className={`p-0 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}
                        disabled={isLoading}
                      >
                        <Minus className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />
                      </Button>
                      <span className={`text-center font-medium ${isMobile ? 'w-6 text-xs' : 'w-8'}`}>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className={`p-0 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}
                        disabled={isLoading}
                      >
                        <Plus className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveClick(item.productId, item.productName)}
                        className={`text-red-500 hover:text-red-700 ${isMobile ? 'ml-1 h-6 w-6 p-0' : 'ml-2'}`}
                        disabled={isLoading}
                      >
                        <X className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
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
                <div className={`flex pt-4 ${isMobile ? 'space-x-3' : 'space-x-4'}`}>
                  {/* Continue Shopping - Hidden on mobile */}
                  {!isMobile && (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleContinueShopping}
                      disabled={isLoading}
                    >
                      Continue Shopping
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => clearCart()}
                    disabled={isLoading || cartItems.length === 0}
                    className={`text-red-600 hover:text-red-700 ${isMobile ? 'flex-1' : ''}`}
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

      {/* Cart Item Remove Confirmation Dialog */}
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Item</AlertDialogTitle>
            <AlertDialogDescription>
              What would you like to do with "{itemToRemove?.productName}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex space-x-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleMoveToWishlist}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Move to Wishlist
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Search functionality removed as requested */}
    </>
  );
}