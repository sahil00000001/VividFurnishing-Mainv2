import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, fetchCart, addToCart as apiAddToCart, updateCartQuantity, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart, ApiProduct, fetchProductById } from './api';
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

  // Load cart when user authenticates or on mount (including guest users)
  useEffect(() => {
    loadCart();
  }, [isAuthenticated, user]);

  // Load cart from localStorage
  const loadCart = async () => {
    const userKey = isAuthenticated && user ? user.id : 'guest';
    
    try {
      console.log('🛍️ Loading cart from localStorage for user:', userKey);
      
      setIsLoading(true);
      setError(null);
      
      const cartKey = `cart_${userKey}`;
      const storedCart = localStorage.getItem(cartKey);
      
      if (storedCart) {
        const cartData: Cart = JSON.parse(storedCart);
        console.log('✅ Cart loaded from localStorage:', cartData);
        setCart(cartData);
      } else {
        // Initialize empty cart for user
        const emptyCart: Cart = {
          _id: `cart_${userKey}_${Date.now()}`,
          userId: userKey,
          items: [],
          totalAmount: 0,
          totalItems: 0,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setCart(emptyCart);
        localStorage.setItem(cartKey, JSON.stringify(emptyCart));
        console.log('✅ Empty cart created for user');
      }
    } catch (err) {
      console.error('❌ Error loading cart from localStorage:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load cart';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    console.log('🛒 AddToCart called:', { productId, quantity, isAuthenticated, user });
    
    // Allow both authenticated users and guest users (temporary localStorage solution)
    const userKey = isAuthenticated && user ? user.id : 'guest';
    console.log('🔑 Using cart key for:', userKey);

    try {
      console.log('🚀 Starting add to cart with localStorage...');
      setIsLoading(true);
      setError(null);
      
      // Fetch product details for the cart item
      const product: ApiProduct = await fetchProductById(productId);
      console.log('📦 Product fetched:', product);
      
      const cartKey = `cart_${userKey}`;
      const currentCart = cart || {
        _id: `cart_${userKey}_${Date.now()}`,
        userId: userKey,
        items: [],
        totalAmount: 0,
        totalItems: 0,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Check if item already exists in cart
      const existingItemIndex = currentCart.items.findIndex(item => item.productId === productId);
      
      let updatedCart: Cart;
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const existingItem = currentCart.items[existingItemIndex];
        const updatedItems = [...currentCart.items];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity
        };
        
        // Use existing item's priceAtTime to maintain consistency
        updatedCart = {
          ...currentCart,
          items: updatedItems,
          totalItems: currentCart.totalItems + quantity,
          totalAmount: currentCart.totalAmount + (existingItem.priceAtTime * quantity),
          updatedAt: new Date().toISOString()
        };
      } else {
        // Add new item to cart
        const newCartItem: CartItem = {
          productId: productId,
          productName: product.Product_Name,
          productImage: `/api/placeholder/${product.Product_Name}`, // Placeholder since no image URL in API
          quantity: quantity,
          priceAtTime: product.Selling_Price,
          addedAt: new Date().toISOString()
        };
        
        updatedCart = {
          ...currentCart,
          items: [...currentCart.items, newCartItem],
          totalItems: currentCart.totalItems + quantity,
          totalAmount: currentCart.totalAmount + (product.Selling_Price * quantity),
          updatedAt: new Date().toISOString()
        };
      }
      
      // Save to localStorage and update state
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      setCart(updatedCart);
      
      console.log('✅ Cart updated successfully:', updatedCart);
      
      toast({
        title: "Added to Cart",
        description: "Item successfully added to your cart.",
      });
    } catch (err) {
      console.error('❌ Add to cart failed:', err);
      
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
    const userKey = isAuthenticated && user ? user.id : 'guest';

    if (!cart) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const cartKey = `cart_${userKey}`;
      const removedItem = cart.items.find(item => item.productId === productId);
      
      if (!removedItem) {
        console.log('Item not found in cart');
        return;
      }
      
      const updatedItems = cart.items.filter(item => item.productId !== productId);
      const removedQuantity = removedItem.quantity;
      const removedAmount = removedItem.priceAtTime * removedItem.quantity;
      
      const updatedCart: Cart = {
        ...cart,
        items: updatedItems,
        totalItems: cart.totalItems - removedQuantity,
        totalAmount: cart.totalAmount - removedAmount,
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage and update state
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      setCart(updatedCart);
      
      toast({
        title: "Item Removed",
        description: "Item removed from your cart.",
      });
    } catch (err) {
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
    const userKey = isAuthenticated && user ? user.id : 'guest';

    if (!cart) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const cartKey = `cart_${userKey}`;
      const oldItem = cart.items.find(item => item.productId === productId);
      
      if (!oldItem) {
        console.log('Item not found in cart');
        return;
      }
      
      // If quantity is 0, remove the item
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      
      const updatedItems = cart.items.map(item =>
        item.productId === productId 
          ? { ...item, quantity }
          : item
      );
      
      const quantityDiff = quantity - oldItem.quantity;
      const amountDiff = oldItem.priceAtTime * quantityDiff;
      
      const updatedCart: Cart = {
        ...cart,
        items: updatedItems,
        totalItems: cart.totalItems + quantityDiff,
        totalAmount: cart.totalAmount + amountDiff,
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage and update state
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      setCart(updatedCart);
      
    } catch (err) {
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
    const userKey = isAuthenticated && user ? user.id : 'guest';

    if (!cart) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const cartKey = `cart_${userKey}`;
      
      const clearedCart: Cart = {
        ...cart,
        items: [],
        totalItems: 0,
        totalAmount: 0,
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage and update state
      localStorage.setItem(cartKey, JSON.stringify(clearedCart));
      setCart(clearedCart);
      
      toast({
        title: "Cart Cleared",
        description: "All items removed from your cart.",
        variant: "destructive",
      });
    } catch (err) {
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