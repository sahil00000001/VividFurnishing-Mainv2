import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { shopProducts, ShopProduct } from '@/data/products';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  Eye, 
  ShoppingCart, 
  Star, 
  Filter, 
  Grid3X3, 
  List, 
  ChevronDown,
  ChevronUp,
  X,
  Minus,
  Plus,
  ZoomIn,
  Search,
  User,
  ShoppingBag,
  Menu,
  Package,
  Truck,
  Shield,
  RefreshCw,
  Phone,
  MapPin,
  Clock,
  Award,
  Sofa,
  Bed,
  UtensilsCrossed,
  MonitorSpeaker,
  Info
} from 'lucide-react';

// Category configuration
const categoryConfig = {
  'living-room': {
    title: 'Living Room',
    subtitle: 'Transform your living space with our curated collection',
    description: 'Discover premium sofas, chairs, and tables that blend comfort with contemporary design',
    heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600',
    icon: Sofa,
    filters: {
      sizes: ['2-Seater', '3-Seater', 'L-Shaped', 'Single', 'Loveseat'],
      materials: ['Leather', 'Fabric', 'Velvet', 'Rattan', 'Wood'],
      features: ['Reclining', 'Storage', 'Convertible', 'Modular', 'Swivel']
    },
    crossPromo: {
      title: 'Complete Your Living Room',
      offer: 'Buy Sofa + Coffee Table, Save 15%',
      badge: 'COMBO DEAL'
    },
    buyingGuide: {
      title: 'Living Room Furniture Buying Guide',
      content: 'Choose furniture that reflects your lifestyle. For families, opt for durable fabrics like microfiber or leather. Consider the room size - L-shaped sofas work well in larger spaces, while loveseats are perfect for apartments.'
    }
  },
  'bedroom': {
    title: 'Bedroom',
    subtitle: 'Create your personal sanctuary',
    description: 'From luxury beds to elegant wardrobes, design a bedroom that promotes rest and relaxation',
    heroImage: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600',
    icon: Bed,
    filters: {
      sizes: ['Single', 'Double', 'Queen', 'King', 'Super King'],
      materials: ['Wood', 'Upholstered', 'Metal', 'Leather', 'Fabric'],
      features: ['Storage', 'Headboard', 'Platform', 'Adjustable', 'Ottoman']
    },
    crossPromo: {
      title: 'Bedroom Set Special',
      offer: 'Bed + Nightstand + Dresser, Save 20%',
      badge: 'BEDROOM SET'
    },
    buyingGuide: {
      title: 'Bedroom Furniture Essentials',
      content: 'Start with the bed as your focal point. Ensure adequate clearance around the bed for movement. Storage beds are great for smaller rooms, while platform beds offer a modern, minimalist look.'
    }
  },
  'dining-room': {
    title: 'Dining Room',
    subtitle: 'Where memories are made around the table',
    description: 'Elegant dining sets and accessories for memorable meals and gatherings',
    heroImage: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600',
    icon: UtensilsCrossed,
    filters: {
      sizes: ['2-Seater', '4-Seater', '6-Seater', '8-Seater', 'Extendable'],
      materials: ['Wood', 'Glass', 'Marble', 'Metal', 'Stone'],
      features: ['Extendable', 'Folding', 'Counter Height', 'Bar Height', 'Round']
    },
    crossPromo: {
      title: 'Dining Room Package',
      offer: 'Table + 4 Chairs + Buffet, Save 25%',
      badge: 'DINING SET'
    },
    buyingGuide: {
      title: 'Dining Room Setup Guide',
      content: 'Allow 24 inches of space per person at the table. Round tables promote conversation, while rectangular tables work well in longer rooms. Consider extendable options for flexibility.'
    }
  },
  'office': {
    title: 'Office',
    subtitle: 'Productive workspaces, beautifully designed',
    description: 'Professional furniture solutions for home offices and workspaces',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600',
    icon: MonitorSpeaker,
    filters: {
      sizes: ['Compact', 'Standard', 'Large', 'L-Shaped', 'Corner'],
      materials: ['Wood', 'Metal', 'Glass', 'Laminate', 'Leather'],
      features: ['Ergonomic', 'Adjustable', 'Storage', 'Cable Management', 'Standing']
    },
    crossPromo: {
      title: 'Office Setup Bundle',
      offer: 'Desk + Chair + Storage, Save 18%',
      badge: 'OFFICE BUNDLE'
    },
    buyingGuide: {
      title: 'Home Office Essentials',
      content: 'Invest in an ergonomic chair for comfort during long work sessions. Ensure your desk height allows for proper posture. Good lighting and storage solutions boost productivity.'
    }
  }
};

const materials = [
  { name: "Wood", count: 45 },
  { name: "Metal", count: 28 },
  { name: "Fabric", count: 52 },
  { name: "Leather", count: 18 },
  { name: "Glass", count: 12 },
  { name: "Marble", count: 8 },
  { name: "Velvet", count: 15 },
  { name: "Rattan", count: 12 }
];

const colors = [
  { name: "Brown", color: "#8B4513" },
  { name: "Blue", color: "#4169E1" },
  { name: "Black", color: "#000000" },
  { name: "Green", color: "#228B22" },
  { name: "Red", color: "#DC143C" },
  { name: "White", color: "#FFFFFF" },
  { name: "Gray", color: "#808080" },
  { name: "Beige", color: "#F5F5DC" },
  { name: "Orange", color: "#FF8C00" }
];

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category || 'living-room';
  const config = categoryConfig[categorySlug as keyof typeof categoryConfig] || categoryConfig['living-room'];
  
  // Get products for this category
  const categoryProducts = shopProducts.filter(product => 
    product.category.toLowerCase().replace(' ', '-') === categorySlug
  );

  const [products, setProducts] = useState<ShopProduct[]>(categoryProducts);
  const [filteredProducts, setFilteredProducts] = useState<ShopProduct[]>(categoryProducts);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 100000]);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating" | "newest">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [animatingProducts, setAnimatingProducts] = useState<Set<number>>(new Set());
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [pincode, setPincode] = useState('');
  
  // Use global cart context
  const { addToCart: addToGlobalCart, cart: globalCart, cartCount } = useCart();
  const { toast } = useToast();
  
  const cartRef = useRef<HTMLButtonElement>(null);
  const productRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  // Update products when category changes
  useEffect(() => {
    const newCategoryProducts = shopProducts.filter(product => 
      product.category.toLowerCase().replace(' ', '-') === categorySlug
    );
    setProducts(newCategoryProducts);
    setFilteredProducts(newCategoryProducts);
    setCurrentPage(1);
  }, [categorySlug]);

  // Update total price when quantity or selected product changes
  useEffect(() => {
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * quantity);
    }
  }, [quantity, selectedProduct]);

  // Auto-play image carousel on hover
  useEffect(() => {
    let interval: number;
    if (hoveredProduct !== null) {
      const product = products.find(p => p.id === hoveredProduct);
      if (product && product.images.length > 1) {
        interval = window.setInterval(() => {
          setCurrentImageIndex(prev => ({
            ...prev,
            [hoveredProduct]: ((prev[hoveredProduct] || 0) + 1) % product.images.length
          }));
        }, 1000);
      }
    }
    return () => window.clearInterval(interval);
  }, [hoveredProduct, products]);

  // Filter products based on selections
  useEffect(() => {
    let filtered = products.filter(product => {
      const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
      const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return materialMatch && colorMatch && priceMatch;
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedMaterials, selectedColors, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Add to Cart with Animation
  const addToCart = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    addToGlobalCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
    
    // Animation
    const productElement = productRefs.current[productId];
    
    if (productElement) {
      setAnimatingProducts(prev => new Set(Array.from(prev).concat([productId])));
      
      const flyingElement = document.createElement('div');
      flyingElement.style.position = 'fixed';
      flyingElement.style.zIndex = '9999';
      flyingElement.style.pointerEvents = 'none';
      flyingElement.style.width = '60px';
      flyingElement.style.height = '60px';
      flyingElement.style.borderRadius = '8px';
      flyingElement.style.backgroundColor = '#B8734C';
      flyingElement.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
      flyingElement.style.boxShadow = '0 4px 12px rgba(184, 115, 76, 0.3)';
      
      flyingElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="m16 10l-4 4l-4-4"></path></svg></div>`;
      
      const productRect = productElement.getBoundingClientRect();
      
      flyingElement.style.left = (productRect.left + productRect.width / 2 - 30) + 'px';
      flyingElement.style.top = (productRect.top + productRect.height / 2 - 30) + 'px';
      
      document.body.appendChild(flyingElement);
      
      setTimeout(() => {
        flyingElement.style.top = (productRect.top - 100) + 'px';
        flyingElement.style.opacity = '0';
        flyingElement.style.transform = 'scale(0.5)';
      }, 100);
      
      setTimeout(() => {
        if (document.body.contains(flyingElement)) {
          document.body.removeChild(flyingElement);
        }
        setAnimatingProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 1000);
    }
  };

  // Toggle Wishlist
  const toggleWishlist = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Quick View Modal
  const openQuickView = (product: ShopProduct, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Check Pincode
  const checkPincode = (productId: number) => {
    if (!pincode) {
      toast({
        title: "Enter Pincode",
        description: "Please enter your pincode to check delivery",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Delivery Available",
      description: `Delivery to ${pincode} in 3-5 business days. COD available.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header className="relative bg-white border-b shadow-sm" variant="solid" />

      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${config.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <config.icon className="w-16 h-16 mr-4" />
            <h1 className="font-serif text-5xl md:text-7xl font-bold">
              {config.title}
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-light mb-4 leading-relaxed">
            {config.subtitle}
          </p>
          <p className="text-lg text-cream-light">
            {config.description}
          </p>
        </div>
      </section>

      {/* Cross-Promo Banner */}
      <div className="bg-gradient-to-r from-terracotta to-terracotta-dark py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center text-white">
            <Award className="w-6 h-6 mr-3" />
            <Badge variant="secondary" className="mr-3 bg-white text-terracotta">
              {config.crossPromo.badge}
            </Badge>
            <span className="font-semibold text-lg">{config.crossPromo.title}</span>
            <span className="mx-3">•</span>
            <span className="text-cream">{config.crossPromo.offer}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`transition-all duration-300 ${showFilters ? 'w-80' : 'w-0 overflow-hidden'}`}>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="md:hidden"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Filters for Category */}
                {config.filters.sizes && (
                  <>
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Size</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {config.filters.sizes.map((size) => (
                          <Button
                            key={size}
                            variant={selectedSizes.includes(size) ? "default" : "outline"}
                            size="sm"
                            className="text-xs"
                            onClick={() => {
                              if (selectedSizes.includes(size)) {
                                setSelectedSizes(prev => prev.filter(s => s !== size));
                              } else {
                                setSelectedSizes(prev => [...prev, size]);
                              }
                            }}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Separator className="my-6" />
                  </>
                )}

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={100000}
                    min={1000}
                    step={1000}
                    className="mb-3"
                  />
                  <div className="flex items-center space-x-2 text-sm">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="h-8"
                    />
                    <span>—</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      className="h-8"
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Colors */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Colors</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {colors.map((color) => (
                      <div
                        key={color.name}
                        className={`
                          w-8 h-8 rounded-full border-2 cursor-pointer relative transition-transform hover:scale-110
                          ${selectedColors.includes(color.name) ? 'border-terracotta scale-110' : 'border-gray-300'}
                        `}
                        style={{ backgroundColor: color.color }}
                        onClick={() => {
                          if (selectedColors.includes(color.name)) {
                            setSelectedColors(prev => prev.filter(c => c !== color.name));
                          } else {
                            setSelectedColors(prev => [...prev, color.name]);
                          }
                        }}
                      >
                        {selectedColors.includes(color.name) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Materials */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Materials</h4>
                  <div className="space-y-2">
                    {config.filters.materials.map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMaterials(prev => [...prev, material]);
                            } else {
                              setSelectedMaterials(prev => prev.filter(m => m !== material));
                            }
                          }}
                        />
                        <label 
                          htmlFor={`material-${material}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {config.filters.features && (
                  <>
                    <Separator className="my-6" />
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Features</h4>
                      <div className="space-y-2">
                        {config.filters.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={`feature-${feature}`}
                              checked={selectedFeatures.includes(feature)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedFeatures(prev => [...prev, feature]);
                                } else {
                                  setSelectedFeatures(prev => prev.filter(f => f !== feature));
                                }
                              }}
                            />
                            <label 
                              htmlFor={`feature-${feature}`}
                              className="text-sm cursor-pointer flex-1"
                            >
                              {feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedMaterials([]);
                    setSelectedColors([]);
                    setSelectedSizes([]);
                    setSelectedFeatures([]);
                    setPriceRange([1000, 100000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className={`md:hidden ${showFilters ? 'hidden' : ''}`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
                
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Service Features Bar */}
            <div className="bg-cream rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Truck className="w-5 h-5 text-terracotta" />
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5 text-terracotta" />
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-5 h-5 text-terracotta" />
                  <span className="text-sm font-medium">Easy Returns</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5 text-terracotta" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`
              grid gap-6 transition-all duration-300
              ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}
            `}>
              {paginatedProducts.map((product, index) => (
                <Card 
                  key={product.id}
                  ref={(el) => productRefs.current[product.id] = el}
                  className={`
                    group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2
                    ${animatingProducts.has(product.id) ? 'animate-pulse' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => {
                    setHoveredProduct(product.id);
                    setCurrentImageIndex(prev => ({ ...prev, [product.id]: 0 }));
                  }}
                  onMouseLeave={() => {
                    setHoveredProduct(null);
                    setCurrentImageIndex(prev => ({ ...prev, [product.id]: 0 }));
                  }}
                >
                  <div className="relative overflow-hidden">
                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden relative group">
                      <img
                        src={product.images[currentImageIndex[product.id] || 0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {product.badge && (
                          <Badge 
                            variant={product.badge === "BEST SELLER" ? "default" : "secondary"}
                            className={`
                              text-xs font-bold tracking-wide shadow-md
                              ${product.badge === "BEST SELLER" ? "bg-terracotta text-white" : ""}
                              ${product.badge === "LUXURY" ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white" : ""}
                              ${product.badge === "PREMIUM" ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-white" : ""}
                            `}
                          >
                            {product.badge}
                          </Badge>
                        )}
                        {product.discount && (
                          <Badge className="bg-red-500 text-white text-xs font-bold">
                            -{product.discount}%
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge className="bg-gray-500 text-white text-xs font-bold">
                            OUT OF STOCK
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white shadow-md"
                          onClick={(e) => toggleWishlist(product.id, e)}
                        >
                          <Heart 
                            className={`w-4 h-4 transition-colors ${
                              wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                            }`} 
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white shadow-md"
                          onClick={(e) => openQuickView(product, e)}
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Button>
                      </div>

                      {/* Image Indicators */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {product.images.map((_, imageIndex) => (
                            <div
                              key={imageIndex}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                (currentImageIndex[product.id] || 0) === imageIndex 
                                  ? 'bg-terracotta' 
                                  : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xl font-bold text-terracotta">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Material & Color */}
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                        <span>{product.material}</span>
                        <span>•</span>
                        <span>{product.color}</span>
                      </div>

                      {/* Pincode Checker */}
                      <div className="flex items-center space-x-2 mb-3">
                        <Input
                          placeholder="Enter pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="h-8 text-xs flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs"
                          onClick={() => checkPincode(product.id)}
                        >
                          Check
                        </Button>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
                          onClick={(e) => addToCart(product.id, e)}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={(e) => openQuickView(product, e)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Quick View
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-10"
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Buying Guide Section */}
        <div className="mt-16 bg-cream rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Info className="w-6 h-6 text-terracotta mr-3" />
              <h2 className="text-3xl font-serif font-bold">{config.buyingGuide.title}</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              {config.buyingGuide.content}
            </p>
            
            {/* FAQ Items */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">What materials are best for {config.title.toLowerCase()}?</h3>
                <p className="text-sm text-muted-foreground">Choose based on your lifestyle and preferences. Leather offers durability and elegance, while fabric provides comfort and variety.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I measure my space?</h3>
                <p className="text-sm text-muted-foreground">Measure the room dimensions and allow for adequate clearance around furniture for comfortable movement and functionality.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-cream">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedProduct.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded bg-cream">
                        <img
                          src={image}
                          alt={`${selectedProduct.name} ${index + 2}`}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-2">{selectedProduct.name}</h2>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl font-bold text-terracotta">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{(selectedProduct.originalPrice * quantity).toLocaleString()}
                      </span>
                    )}
                    {selectedProduct.discount && (
                      <Badge className="bg-red-500 text-white">
                        -{selectedProduct.discount}% OFF
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Material:</span>
                    <span>{selectedProduct.material}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Color:</span>
                    <span>{selectedProduct.color}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{selectedProduct.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Availability:</span>
                    <span className={selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}>
                      {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
                    onClick={(e) => {
                      addToCart(selectedProduct.id, e);
                      setIsQuickViewOpen(false);
                    }}
                    disabled={!selectedProduct.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => toggleWishlist(selectedProduct.id, e)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${
                      wishlist.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''
                    }`} />
                    {wishlist.includes(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>

                {/* Delivery Info */}
                <div className="bg-cream rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-terracotta" />
                    <span className="text-sm">Free delivery on orders above ₹25,000</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-terracotta" />
                    <span className="text-sm">Delivery in 3-5 business days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-terracotta" />
                    <span className="text-sm">Easy 30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
}