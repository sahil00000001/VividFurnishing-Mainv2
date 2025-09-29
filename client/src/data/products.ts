// Import clean furniture images with no background using @assets alias
import premiumImg1 from "@assets/1.png";
import premiumImg2 from "@assets/2.png";
import premiumImg3 from "@assets/3.png";
import premiumImg4 from "@assets/4.png";
import premiumImg5 from "@assets/5.png";

// Interface for home page products (simpler structure)
export interface HomeProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  alt: string;
  category?: string;
  badge?: string;
}

// Interface for shop page products (comprehensive structure)
export interface ShopProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  material: string;
  color: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  badge?: string;
}

// Best Sellers dataset - maintains current home page styling
export const bestSellers: HomeProduct[] = [
  {
    id: 101,
    name: "LEHER",
    price: "₹2,199",
    image: "https://cdn.jsdelivr.net/gh/SMfurnishings/Images@main/%20%20105.png",
    alt: "LEHER - Premium furniture collection"
  },
  {
    id: 102,
    name: "NEELADRI",
    price: "₹2,199",
    image: "https://cdn.jsdelivr.net/gh/SMfurnishings/Images@main/%20%20109.png",
    alt: "NEELADRI - Premium furniture collection"
  },
  {
    id: 103,
    name: "MANJARI",
    price: "₹2,199",
    image: "https://cdn.jsdelivr.net/gh/SMfurnishings/Images@main/%20%2099.png",
    alt: "MANJARI - Premium furniture collection"
  }
];

// Luxury Choice dataset - distinct high-end products
export const luxuryProducts: HomeProduct[] = [
  {
    id: 201,
    name: "GULDAAN",
    price: "$2,099",
    image: "https://cdn.jsdelivr.net/gh/SMfurnishings/Images@main/6.png",
    alt: "GULDAAN - Luxury furniture collection",
    category: "Luxury"
  },
  {
    id: 202,
    name: "KESARIYAA",
    price: "$2,999",
    image: "https://cdn.jsdelivr.net/gh/SMfurnishings/Images@main/%2065.png",
    alt: "KESARIYAA - Luxury furniture collection",
    category: "Luxury"
  },
  {
    id: 203,
    name: "GHANERI",
    price: "$2,199",
    image: "https://cdn.jsdelivr.net/gh/SMfurnishings/Images@main/%20%20132.png",
    alt: "GHANERI - Luxury furniture collection",
    category: "Luxury"
  }
];

// Premium Collection dataset - using clean background-free images
export const premiumProducts: HomeProduct[] = [
  {
    id: 7,
    name: "Modern Accent Chair",
    category: "Seating",
    price: "$899",
    image: premiumImg1,
    alt: "Modern accent chair with clean design"
  },
  {
    id: 8,
    name: "Classic Sofa",
    category: "Seating",
    price: "$1459",
    image: premiumImg2,
    alt: "Classic sofa with elegant styling"
  },
  {
    id: 9,
    name: "Comfort Chair",
    category: "Seating",
    price: "$629",
    image: premiumImg3,
    alt: "Comfortable chair with modern design"
  },
  {
    id: 10,
    name: "Royal Throne Chair",
    category: "Luxury",
    price: "$2199",
    image: premiumImg4,
    alt: "Luxury throne chair with premium finish"
  },
  {
    id: 11,
    name: "Vintage Side Table",
    category: "Tables",
    price: "$899",
    image: premiumImg5,
    alt: "Vintage side table with ornate details"
  }
];

// Shop page products - comprehensive dataset combining all sources
export const shopProducts: ShopProduct[] = [
  // From Best Sellers collection
  {
    id: 1,
    name: "Tufted Leather Sofa",
    price: 28000,
    originalPrice: 35000,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    category: "Living Room",
    material: "Leather",
    color: "Brown",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    discount: 20,
    badge: "BEST SELLER"
  },
  {
    id: 2,
    name: "Papasan Chair",
    price: 22000,
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    category: "Living Room",
    material: "Rattan",
    color: "Brown",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    badge: "BEST SELLER"
  },
  {
    id: 3,
    name: "Modern Accent Chair",
    price: 16000,
    originalPrice: 18000,
    images: [
      "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    category: "Living Room",
    material: "Fabric",
    color: "Blue",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    discount: 11,
    badge: "BEST SELLER"
  },
  // From Premium Collection with local assets
  {
    id: 7,
    name: "Modern Gray Accent Chair",
    price: 32000,
    images: [premiumImg1],
    category: "Living Room",
    material: "Fabric",
    color: "Blue",
    rating: 4.8,
    reviews: 92,
    inStock: true,
    badge: "PREMIUM"
  },
  {
    id: 8,
    name: "Classic Brown Sofa",
    price: 52000,
    images: [premiumImg2],
    category: "Living Room",
    material: "Fabric",
    color: "Brown",
    rating: 4.9,
    reviews: 78,
    inStock: true,
    badge: "PREMIUM"
  },
  {
    id: 9,
    name: "Comfort Dining Chair",
    price: 18000,
    images: [premiumImg3],
    category: "Dining Room",
    material: "Wood",
    color: "Brown",
    rating: 4.7,
    reviews: 143,
    inStock: true,
    badge: "PREMIUM"
  },
  {
    id: 10,
    name: "Royal Throne Chair",
    price: 75000,
    originalPrice: 85000,
    images: [premiumImg4],
    category: "Living Room",
    material: "Velvet",
    color: "Red",
    rating: 5.0,
    reviews: 34,
    inStock: true,
    discount: 12,
    badge: "LUXURY"
  },
  {
    id: 11,
    name: "Vintage Side Table",
    price: 28000,
    images: [premiumImg5],
    category: "Living Room",
    material: "Wood",
    color: "Brown",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    badge: "PREMIUM"
  },
  // From Luxury Collection
  {
    id: 4,
    name: "Artisan Velvet Sofa",
    price: 95000,
    originalPrice: 110000,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    category: "Living Room",
    material: "Velvet",
    color: "Brown",
    rating: 4.9,
    reviews: 45,
    inStock: true,
    discount: 14,
    badge: "LUXURY"
  },
  {
    id: 6,
    name: "Designer Ottoman Set",
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    category: "Living Room",
    material: "Leather",
    color: "Black",
    rating: 4.8,
    reviews: 56,
    inStock: true,
    badge: "LUXURY"
  },
  // Additional shop-specific products
  {
    id: 12,
    name: "Elegant Dining Table",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    category: "Dining Room",
    material: "Wood",
    color: "Brown",
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    id: 13,
    name: "Comfortable Office Chair",
    price: 15000,
    originalPrice: 18000,
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    category: "Office",
    material: "Leather",
    color: "Black",
    rating: 4.9,
    reviews: 156,
    inStock: false,
    discount: 17,
    badge: "OUT OF STOCK"
  },
  {
    id: 14,
    name: "Luxury King Bed",
    price: 55000,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    category: "Bedroom",
    material: "Wood",
    color: "Brown",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    badge: "PREMIUM"
  }
];

// Premium Collection Tab Datasets for Interactive Tabs

// ALL COLLECTION - Mixed furniture items (4 products)
export const premiumAll: HomeProduct[] = [
  {
    id: 7,
    name: "Modern Accent Chair",
    category: "Seating",
    price: "$899",
    image: premiumImg1,
    alt: "Modern accent chair with clean design"
  },
  {
    id: 8,
    name: "Classic Sofa",
    category: "Seating",
    price: "$1,459",
    image: premiumImg2,
    alt: "Classic sofa with elegant styling"
  },
  {
    id: 11,
    name: "Vintage Side Table",
    category: "Tables",
    price: "$899",
    image: premiumImg5,
    alt: "Vintage side table with ornate details"
  },
  {
    id: 10,
    name: "Royal Throne Chair",
    category: "Luxury",
    price: "$2,199",
    image: premiumImg4,
    alt: "Luxury throne chair with premium finish"
  }
];

// BEST SELLER - Top-selling products with badges (4 products)
export const premiumBestSellers: HomeProduct[] = [
  {
    id: 1,
    name: "Tufted Leather Sofa",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Burnt orange tufted leather sofa",
    badge: "BESTSELLER"
  },
  {
    id: 8,
    name: "Classic Sofa",
    category: "Seating",
    price: "$1,459",
    image: premiumImg2,
    alt: "Classic sofa with elegant styling",
    badge: "20% OFF"
  },
  {
    id: 2,
    name: "Papasan Chair",
    price: "$899",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Cream papasan chair with rattan base",
    badge: "BESTSELLER"
  },
  {
    id: 10,
    name: "Royal Throne Chair",
    category: "Luxury",
    price: "$2,199",
    image: premiumImg4,
    alt: "Luxury throne chair with premium finish",
    badge: "15% OFF"
  }
];

// NEW ARRIVALS - Newest products with NEW badges (4 products)
export const premiumNewArrivals: HomeProduct[] = [
  {
    id: 9,
    name: "Comfort Chair",
    category: "Seating",
    price: "$629",
    image: premiumImg3,
    alt: "Comfortable chair with modern design",
    badge: "NEW"
  },
  {
    id: 11,
    name: "Vintage Side Table",
    category: "Tables",
    price: "$899",
    image: premiumImg5,
    alt: "Vintage side table with ornate details",
    badge: "NEW"
  },
  {
    id: 3,
    name: "Modern Accent Chair",
    price: "$649",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Powder blue modern accent chair with wooden legs",
    badge: "NEW"
  },
  {
    id: 7,
    name: "Designer Accent Chair",
    category: "Seating",
    price: "$899",
    image: premiumImg1,
    alt: "Modern accent chair with clean design",
    badge: "NEW"
  }
];

// Collection data for home page luxury section
export const collections = [
  {
    id: 1,
    title: "Contemporary Living Collection",
    description: "Discover our signature collection of contemporary furniture designed for modern living. Each piece is meticulously crafted to blend comfort with sophistication, creating spaces that inspire and delight. From plush sofas to elegant dining sets, our collection embodies the perfect balance of luxury and livability.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Contemporary living room with beige sofa",
    buttonText: "View Collection",
    imagePosition: "right" as const
  },
  {
    id: 2,
    title: "Bedroom Sanctuary Series",
    description: "Transform your bedroom into a personal retreat with our Sanctuary Series. Featuring handcrafted bed frames, luxurious textiles, and thoughtfully designed storage solutions, this collection creates a harmonious environment where rest and relaxation take center stage.",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Minimalist bedroom with neutral decor",
    buttonText: "Explore Bedrooms",
    imagePosition: "left" as const
  },
  {
    id: 3,
    title: "Artisan Dining Collection",
    description: "Elevate your dining experience with our Artisan Collection. Each table, chair, and accent piece is crafted by skilled artisans who understand that dining is about more than just meals—it's about creating memories. Our pieces bring family and friends together in spaces that celebrate both form and function.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Modern dining room with wooden table",
    buttonText: "Shop Dining",
    imagePosition: "right" as const
  }
];