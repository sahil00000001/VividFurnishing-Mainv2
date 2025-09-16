import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { shopProducts } from '@/data/products';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { 
  ArrowRight,
  Sofa,
  Bed,
  UtensilsCrossed,
  MonitorSpeaker,
  Lamp,
  Armchair,
  Home,
  Package,
  Truck,
  Shield,
  RefreshCw,
  Phone,
  Award,
  Star,
  TrendingUp,
  Heart,
  Users
} from 'lucide-react';

// Define all furniture categories with their details
const furnitureCategories = [
  {
    id: 'living-room',
    name: 'Living Room',
    description: 'Comfortable sofas, elegant coffee tables, and stylish entertainment units',
    icon: Sofa,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: shopProducts.filter(p => p.category === 'Living Room').length,
    startingPrice: 15000,
    featured: true,
    gradient: 'from-orange-500 to-red-600',
    tags: ['Sofas', 'Coffee Tables', 'TV Units', 'Recliners']
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Luxury beds, wardrobes, and nightstands for your perfect sanctuary',
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: shopProducts.filter(p => p.category === 'Bedroom').length,
    startingPrice: 12000,
    featured: true,
    gradient: 'from-blue-500 to-purple-600',
    tags: ['Beds', 'Wardrobes', 'Nightstands', 'Dressers']
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    description: 'Elegant dining tables and chairs for memorable family gatherings',
    icon: UtensilsCrossed,
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: shopProducts.filter(p => p.category === 'Dining Room').length,
    startingPrice: 18000,
    featured: true,
    gradient: 'from-green-500 to-teal-600',
    tags: ['Dining Tables', 'Chairs', 'Buffets', 'Bar Stools']
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Productive and comfortable workspace furniture for home and office',
    icon: MonitorSpeaker,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: shopProducts.filter(p => p.category === 'Office').length,
    startingPrice: 8000,
    featured: false,
    gradient: 'from-gray-500 to-gray-700',
    tags: ['Desks', 'Chairs', 'Storage', 'Bookcases']
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    description: 'Weather-resistant furniture for gardens, patios, and balconies',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: 15,
    startingPrice: 5000,
    featured: false,
    gradient: 'from-green-400 to-blue-500',
    tags: ['Garden Sets', 'Loungers', 'Umbrellas', 'Swings']
  },
  {
    id: 'storage',
    name: 'Storage',
    description: 'Stylish storage solutions to keep your home organized and clutter-free',
    icon: Package,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: 12,
    startingPrice: 3000,
    featured: false,
    gradient: 'from-purple-500 to-pink-600',
    tags: ['Wardrobes', 'Shelves', 'Cabinets', 'Chests']
  },
  {
    id: 'lighting',
    name: 'Lighting',
    description: 'Beautiful lamps and lighting fixtures to illuminate your space',
    icon: Lamp,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: 8,
    startingPrice: 2000,
    featured: false,
    gradient: 'from-yellow-400 to-orange-500',
    tags: ['Table Lamps', 'Floor Lamps', 'Chandeliers', 'Wall Lights']
  },
  {
    id: 'kids',
    name: 'Kids Furniture',
    description: 'Safe, colorful, and fun furniture designed specially for children',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: 6,
    startingPrice: 4000,
    featured: false,
    gradient: 'from-pink-400 to-red-500',
    tags: ['Kids Beds', 'Study Tables', 'Toy Storage', 'Chairs']
  }
];

export default function CategoryPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Separate featured and regular categories
  const featuredCategories = furnitureCategories.filter(cat => cat.featured);
  const regularCategories = furnitureCategories.filter(cat => !cat.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header className="relative bg-white border-b shadow-sm" variant="solid" />

      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Furniture Categories
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 leading-relaxed">
            Explore our complete collection of premium furniture
          </p>
          <p className="text-lg text-cream-light">
            From living rooms to bedrooms, find everything you need to create your dream home
          </p>
        </div>
      </section>

      {/* Service Features Banner */}
      <div className="bg-gradient-to-r from-terracotta to-terracotta-dark py-4">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            <div className="flex items-center justify-center space-x-2">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">1 Year Warranty</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="w-5 h-5" />
              <span className="text-sm font-medium">Easy Returns</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Featured Categories Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-terracotta mr-2" />
              <h2 className="text-4xl font-serif font-bold">Featured Categories</h2>
              <Star className="w-6 h-6 text-terracotta ml-2" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular furniture categories with the best selection and latest designs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <Link key={category.id} href={`/shop?category=${encodeURIComponent(category.name)}`}>
                <Card 
                  className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 overflow-hidden h-full"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className={`absolute top-4 left-4 p-3 rounded-full bg-gradient-to-r ${category.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-terracotta text-white font-bold">
                      FEATURED
                    </Badge>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-serif font-bold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.productCount} Products</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">Starting from</span>
                        <p className="text-xl font-bold text-terracotta">
                          ₹{category.startingPrice.toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        className="bg-terracotta hover:bg-terracotta-dark text-white group-hover:bg-terracotta-dark transition-colors"
                      >
                        Explore
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* All Categories Section */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-terracotta mr-2" />
              <h2 className="text-4xl font-serif font-bold">All Categories</h2>
              <Home className="w-6 h-6 text-terracotta ml-2" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete range of furniture categories for every room and need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularCategories.map((category) => (
              <Link key={category.id} href={`/shop?category=${encodeURIComponent(category.name)}`}>
                <Card 
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 h-full"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute top-3 left-3 p-2 rounded-lg bg-gradient-to-r ${category.gradient} shadow-md`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="text-lg font-serif font-bold">{category.name}</h3>
                      <p className="text-xs opacity-90">{category.productCount} Products</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-muted-foreground">From</span>
                        <p className="text-lg font-bold text-terracotta">
                          ₹{category.startingPrice.toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="group-hover:bg-terracotta group-hover:text-white group-hover:border-terracotta transition-colors"
                      >
                        View
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Overview Stats */}
        <div className="mt-16 bg-cream rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="text-3xl font-bold text-terracotta">8+</h3>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Package className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="text-3xl font-bold text-terracotta">500+</h3>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="text-3xl font-bold text-terracotta">10K+</h3>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="text-3xl font-bold text-terracotta">5★</h3>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-terracotta to-terracotta-dark rounded-lg p-12 text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Visit our complete shop to browse all products across categories
            </p>
            <Link href="/shop">
              <Button 
                size="lg"
                className="bg-white text-terracotta hover:bg-cream-dark font-semibold px-8 py-3"
              >
                Browse All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}