import { apiUrl } from './config';

// API Product Interface matching your backend response
export interface ApiProduct {
  _id: string;
  Collection: string;
  Product_Name: string;
  Category: string;
  Sub_Category: string[];
  Size: string;
  Dimensions: string;
  Net_Qty: number;
  Thread_Count: number;
  Fabric: string;
  Color: string;
  Selling_Price: number;
  Qty_in_Stock: number;
  Description: string;
  Wash_Care_Instructions: string[];
}

export interface ApiResponse {
  success: boolean;
  count: number;
  data: ApiProduct[];
}

// Fetch all products
export async function fetchAllProducts(): Promise<ApiProduct[]> {
  try {
    const response = await fetch(apiUrl('/api/latestproducts'));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    if (!data.success) {
      throw new Error('API response indicates failure');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Fetch single product by ID
export async function fetchProductById(id: string): Promise<ApiProduct> {
  try {
    const response = await fetch(apiUrl(`/api/latestproducts/${id}`));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('API response indicates failure');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
}

// Helper function to get unique values for filters
export function getUniqueValues<T>(products: ApiProduct[], key: keyof ApiProduct): T[] {
  const values = products.map(product => product[key]).flat();
  return Array.from(new Set(values)) as T[];
}

// Helper function to format price
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

// Color mapping for visual display
export const colorDisplay: { [key: string]: string } = {
  'Red': '#DC2626',
  'Blue': '#2563EB',
  'Green': '#16A34A',
  'Purple': '#9333EA',
  'Orange': '#EA580C',
  'Pink': '#EC4899',
  'Brown': '#A16207',
  'Grey': '#6B7280',
  'Gray': '#6B7280',
  'White': '#F9FAFB',
  'Off White': '#F3F4F6',
  'Beige': '#D6D3D1',
  'Black': '#111827'
};

// Form submission interfaces
export interface BulkOrderData {
  name: string;
  email: string;
  phoneNumber: string;
  orderDescription: string;
}

export interface NewsletterData {
  email: string;
}

// Submit bulk order form
export async function submitBulkOrder(data: BulkOrderData): Promise<void> {
  try {
    const response = await fetch('https://sm-furnishing-backend.onrender.com/api/form-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Failed to submit bulk order form');
    }
  } catch (error) {
    console.error('Error submitting bulk order:', error);
    throw error;
  }
}

// Submit newsletter subscription
export async function submitNewsletter(data: NewsletterData): Promise<void> {
  try {
    const response = await fetch('https://sm-furnishing-backend.onrender.com/api/newsletter-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Failed to subscribe to newsletter');
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

// Helper function to create placeholder image URL
export function getProductImageUrl(product: ApiProduct): string {
  // Create a gradient based on color name
  const colorMap: { [key: string]: string } = {
    'Red': 'from-red-400 to-red-600',
    'Blue': 'from-blue-400 to-blue-600',
    'Green': 'from-green-400 to-green-600',
    'Purple': 'from-purple-400 to-purple-600',
    'Orange': 'from-orange-400 to-orange-600',
    'Pink': 'from-pink-400 to-pink-600',
    'Brown': 'from-amber-600 to-amber-800',
    'Grey': 'from-gray-400 to-gray-600',
    'Gray': 'from-gray-400 to-gray-600',
    'White': 'from-gray-100 to-gray-300',
    'Off White': 'from-gray-50 to-gray-200',
    'Beige': 'from-amber-100 to-amber-300',
    'Black': 'from-gray-800 to-black'
  };
  
  const gradient = colorMap[product.Color] || 'from-terracotta to-terracotta-dark';
  
  // For now, return a placeholder URL with product info
  // In the future, this would be replaced with actual product image URLs
  return `https://via.placeholder.com/400x400/f0f0f0/666666?text=${encodeURIComponent(product.Product_Name)}`;
}

// Cart API interfaces
export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  priceAtTime: number;
  addedAt: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  status: 'active' | 'abandoned' | 'converted';
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse {
  success: boolean;
  cart: Cart;
}

// Cart API error response
export interface CartError {
  success: false;
  message: string;
  code?: string;
}

// Helper function to get JWT token
function getAuthToken(): string | null {
  const token = localStorage.getItem('authToken');
  console.log('🔑 Getting auth token:', token ? 'Token exists' : 'No token found');
  return token;
}

// Helper function to create authenticated headers
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log('📋 Auth headers prepared with token');
  } else {
    console.log('⚠️ No auth token available for headers');
  }
  
  return headers;
}

// Handle authentication errors
function handleAuthError(): never {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
  window.location.href = '/login';
  throw new Error('Authentication required. Please login.');
}

// Cart API Functions
export async function fetchCart(): Promise<Cart> {
  try {
    const response = await fetch(apiUrl('/api/cart'), {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      handleAuthError();
    }

    const data: CartResponse | CartError = await response.json();

    if (!response.ok) {
      throw new Error((data as CartError).message || 'Failed to fetch cart');
    }

    return (data as CartResponse).cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

export async function addToCart(productId: string, quantity: number): Promise<Cart> {
  try {
    const response = await fetch(apiUrl('/api/cart/add'), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });

    if (response.status === 401) {
      handleAuthError();
    }

    const data: CartResponse | CartError = await response.json();

    if (!response.ok) {
      throw new Error((data as CartError).message || 'Failed to add item to cart');
    }

    return (data as CartResponse).cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function updateCartQuantity(productId: string, quantity: number): Promise<Cart> {
  try {
    const response = await fetch(apiUrl('/api/cart/update'), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });

    if (response.status === 401) {
      handleAuthError();
    }

    const data: CartResponse | CartError = await response.json();

    if (!response.ok) {
      throw new Error((data as CartError).message || 'Failed to update cart');
    }

    return (data as CartResponse).cart;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
}

export async function removeFromCart(productId: string): Promise<Cart> {
  try {
    const response = await fetch(apiUrl(`/api/cart/item/${productId}`), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      handleAuthError();
    }

    const data: CartResponse | CartError = await response.json();

    if (!response.ok) {
      throw new Error((data as CartError).message || 'Failed to remove item from cart');
    }

    return (data as CartResponse).cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

export async function clearCart(): Promise<Cart> {
  try {
    const response = await fetch(apiUrl('/api/cart/clear'), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      handleAuthError();
    }

    const data: CartResponse | CartError = await response.json();

    if (!response.ok) {
      throw new Error((data as CartError).message || 'Failed to clear cart');
    }

    return (data as CartResponse).cart;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}