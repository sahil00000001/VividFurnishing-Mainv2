import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { ApiProduct, fetchProductById } from './api';
import { useAuth } from './authContext';
import { useToast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: string;
  product: ApiProduct;
  addedAt: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  // Track current storage key and load state to prevent data corruption
  const currentKeyRef = useRef<string | null>(null);
  const hasLoadedRef = useRef(false);

  const wishlistCount = wishlistItems.length;

  // Get storage key based on user
  const getStorageKey = () => {
    const userKey = isAuthenticated && user ? user.id : 'guest';
    return `wishlist_${userKey}`;
  };

  // Load wishlist from localStorage on mount and user changes
  useEffect(() => {
    loadWishlist();
  }, [isAuthenticated, user]);

  // Save wishlist to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (hasLoadedRef.current && currentKeyRef.current) {
      const storageKey = getStorageKey();
      // Only save if the current key matches what we loaded from
      if (storageKey === currentKeyRef.current) {
        localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
        console.log('💝 Wishlist saved to localStorage:', wishlistItems);
      }
    }
  }, [wishlistItems]);

  const loadWishlist = () => {
    try {
      const storageKey = getStorageKey();
      currentKeyRef.current = storageKey;
      const storedWishlist = localStorage.getItem(storageKey);
      
      if (storedWishlist) {
        const parsedWishlist: WishlistItem[] = JSON.parse(storedWishlist);
        setWishlistItems(parsedWishlist);
        console.log('💝 Wishlist loaded from localStorage:', parsedWishlist);
      } else {
        setWishlistItems([]);
        console.log('💝 No existing wishlist found, initialized empty wishlist');
      }
      
      hasLoadedRef.current = true;
    } catch (error) {
      console.error('❌ Error loading wishlist from localStorage:', error);
      setWishlistItems([]);
      hasLoadedRef.current = true;
    }
  };

  const addToWishlist = async (productId: string) => {
    if (isInWishlist(productId)) {
      toast({
        title: "Already in wishlist",
        description: "This item is already in your wishlist",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Fetch product details
      const product = await fetchProductById(productId);
      
      const newWishlistItem: WishlistItem = {
        id: productId,
        product,
        addedAt: new Date().toISOString()
      };

      setWishlistItems(prev => [newWishlistItem, ...prev]);
      
      toast({
        title: "Added to wishlist",
        description: `${product.Product_Name} has been added to your wishlist`,
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = (productId: string) => {
    const item = wishlistItems.find(item => item.id === productId);
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    
    if (item) {
      toast({
        title: "Removed from wishlist",
        description: `${item.product.Product_Name} has been removed from your wishlist`,
      });
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    const storageKey = getStorageKey();
    localStorage.removeItem(storageKey);
    
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };

  const toggleWishlist = async (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  const value: WishlistContextType = {
    wishlistItems,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    toggleWishlist,
    isLoading
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}