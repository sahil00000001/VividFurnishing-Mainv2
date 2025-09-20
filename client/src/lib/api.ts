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