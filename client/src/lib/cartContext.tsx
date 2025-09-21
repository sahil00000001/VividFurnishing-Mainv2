import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, fetchCart, addToCart as apiAddToCart, updateCartQuantity, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from './api';
import { useAuth } from './authContext';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cart: Cart | null;
  cartItems: CartItem[];
  cartCount: number;
  isLoading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getCartItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  // Derived state
  const cartItems = cart?.items || [];
  const cartCount = cart?.totalItems || 0;

  // Fetch cart when user authenticates or on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      // Clear cart when user logs out
      setCart(null);
      setError(null);
    }
  }, [isAuthenticated, user]);

  // Load cart from API
  const loadCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      console.log('🛍️ Loading cart for authenticated user...');
      console.log('User data:', user);
      console.log('Auth token exists:', !!localStorage.getItem('authToken'));
      
      setIsLoading(true);
      setError(null);
      const cartData = await fetchCart();
      console.log('✅ Cart loaded successfully:', cartData);
      setCart(cartData);
    } catch (err) {
      console.error('❌ Error loading cart:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load cart';
      setError(errorMessage);
      console.error('Error loading cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    console.log('🛒 AddToCart called:', { productId, quantity, isAuthenticated, user });
    
    if (!isAuthenticated) {
      console.log('❌ User not authenticated');
      toast({
        title: "Please Login",
        description: "You need to login to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    // Capture current state for potential rollback
    const previousCart = cart ? JSON.parse(JSON.stringify(cart)) : null;

    try {
      console.log('🚀 Starting add to cart API call...');
      setIsLoading(true);
      setError(null);
      
      // Optimistic update
      if (cart) {
        const existingItem = cart.items.find(item => item.productId === productId);
        if (existingItem) {
          const updatedItems = cart.items.map(item =>
            item.productId === productId 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          setCart({
            ...cart,
            items: updatedItems,
            totalItems: cart.totalItems + quantity,
            totalAmount: cart.totalAmount + (existingItem.priceAtTime * quantity)
          });
        } else {
          // For new items, we'll skip optimistic update since we don't have all the data
          // The server response will provide the complete item information
        }
      }
      
      const updatedCart = await apiAddToCart(productId, quantity);
      console.log('✅ Cart updated successfully:', updatedCart);
      setCart(updatedCart);
      
      toast({
        title: "Added to Cart",
        description: "Item successfully added to your cart.",
      });
    } catch (err) {
      console.error('❌ Add to cart failed:', err);
      // Rollback optimistic update using the captured previous state
      if (previousCart) {
        setCart(previousCart);
      }
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to add item to cart';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Please Login",
        description: "You need to login to manage your cart.",
        variant: "destructive",
      });
      return;
    }

    // Capture current state for potential rollback
    const previousCart = cart ? JSON.parse(JSON.stringify(cart)) : null;

    try {
      setIsLoading(true);
      setError(null);
      
      // Optimistic update
      if (cart) {
        const updatedItems = cart.items.filter(item => item.productId !== productId);
        const removedItem = cart.items.find(item => item.productId === productId);
        const removedQuantity = removedItem?.quantity || 0;
        const removedAmount = removedItem ? removedItem.priceAtTime * removedItem.quantity : 0;
        
        setCart({
          ...cart,
          items: updatedItems,
          totalItems: cart.totalItems - removedQuantity,
          totalAmount: cart.totalAmount - removedAmount
        });
      }
      
      const updatedCart = await apiRemoveFromCart(productId);
      setCart(updatedCart);
      
      toast({
        title: "Item Removed",
        description: "Item removed from your cart.",
      });
    } catch (err) {
      // Rollback optimistic update using the captured previous state
      if (previousCart) {
        setCart(previousCart);
      }
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove item from cart';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Please Login",
        description: "You need to login to manage your cart.",
        variant: "destructive",
      });
      return;
    }

    // Capture current state for potential rollback
    const previousCart = cart ? JSON.parse(JSON.stringify(cart)) : null;

    try {
      setIsLoading(true);
      setError(null);
      
      // Optimistic update
      if (cart) {
        const updatedItems = cart.items.map(item =>
          item.productId === productId 
            ? { ...item, quantity }
            : item
        );
        const oldItem = cart.items.find(item => item.productId === productId);
        const quantityDiff = quantity - (oldItem?.quantity || 0);
        const amountDiff = oldItem ? oldItem.priceAtTime * quantityDiff : 0;
        
        setCart({
          ...cart,
          items: updatedItems,
          totalItems: cart.totalItems + quantityDiff,
          totalAmount: cart.totalAmount + amountDiff
        });
      }
      
      const updatedCart = await updateCartQuantity(productId, quantity);
      setCart(updatedCart);
    } catch (err) {
      // Rollback optimistic update using the captured previous state
      if (previousCart) {
        setCart(previousCart);
      }
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to update cart';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please Login",
        description: "You need to login to manage your cart.",
        variant: "destructive",
      });
      return;
    }

    // Capture current state for potential rollback
    const previousCart = cart ? JSON.parse(JSON.stringify(cart)) : null;

    try {
      setIsLoading(true);
      setError(null);
      
      // Optimistic update
      if (cart) {
        setCart({
          ...cart,
          items: [],
          totalItems: 0,
          totalAmount: 0
        });
      }
      
      const updatedCart = await apiClearCart();
      setCart(updatedCart);
      
      toast({
        title: "Cart Cleared",
        description: "All items removed from your cart.",
        variant: "destructive",
      });
    } catch (err) {
      // Rollback optimistic update using the captured previous state
      if (previousCart) {
        setCart(previousCart);
      }
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear cart';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = async () => {
    await loadCart();
  };

  const getCartItemQuantity = (productId: string): number => {
    const item = cartItems.find(item => item.productId === productId);
    return item?.quantity || 0;
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartItems,
      cartCount,
      isLoading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart,
      isCartOpen,
      setIsCartOpen,
      getCartItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}