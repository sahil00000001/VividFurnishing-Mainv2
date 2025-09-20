import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { shopProducts } from '@/data/products';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
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
  Search,
  User,
  ShoppingBag,
  Menu,
  Package,
  Sofa,
  Bed,
  UtensilsCrossed,
  MonitorSpeaker
} from 'lucide-react';

interface Product {
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

// Use shared products data from our central module
const allShopProducts = shopProducts;

const categories = [
  { name: "Living Room", count: 45 },
  { name: "Bedroom", count: 38 },
  { name: "Dining Room", count: 32 },
  { name: "Office", count: 28 }
];

const materials = [
  { name: "Wood", count: 45 },
  { name: "Metal", count: 28 },
  { name: "Fabric", count: 52 },
  { name: "Leather", count: 18 },
  { name: "Glass", count: 12 },
  { name: "Marble", count: 8 }
];

const colors = [
  { name: "Brown", color: "#8B4513" },
  { name: "Blue", color: "#4169E1" },
  { name: "Black", color: "#000000" },
  { name: "Green", color: "#228B22" },
  { name: "Red", color: "#DC143C" },
  { name: "White", color: "#FFFFFF" },
  { name: "Yellow", color: "#FFD700" },
  { name: "Purple", color: "#8A2BE2" },
  { name: "Orange", color: "#FF8C00" }
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(allShopProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allShopProducts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 100000]);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating" | "newest">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});
  const [animatingProducts, setAnimatingProducts] = useState<Set<number>>(new Set());
  
  // Use global cart context
  const { addToCart: addToGlobalCart, cart: globalCart, cartCount, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  

  const cartRef = useRef<HTMLButtonElement>(null);
  const productRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

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

  // Removed local cart count management - now handled by global cart context

  // Filter products based on selections
  useEffect(() => {
    let filtered = products.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
      const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return categoryMatch && materialMatch && colorMatch && priceMatch;
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
  }, [products, selectedCategories, selectedMaterials, selectedColors, priceRange, sortBy]);

  // Add to Cart with Animation
  const addToCart = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Add to global cart context first (always works)
    addToGlobalCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
    
    // Animation (optional, only if product element exists)
    const productElement = productRefs.current[productId];
    
    if (productElement) {
      setAnimatingProducts(prev => new Set(Array.from(prev).concat([productId])));
      
      // Create a smaller flying element (thumbnail instead of full card)
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
      
      // Add cart icon to flying element
      flyingElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="m16 10l-4 4l-4-4"></path></svg></div>`;
      
      const productRect = productElement.getBoundingClientRect();
      
      flyingElement.style.left = (productRect.left + productRect.width / 2 - 30) + 'px';
      flyingElement.style.top = (productRect.top + productRect.height / 2 - 30) + 'px';
      
      document.body.appendChild(flyingElement);
      
      // Simple upward animation
      setTimeout(() => {
        flyingElement.style.top = (productRect.top - 100) + 'px';
        flyingElement.style.opacity = '0';
        flyingElement.style.transform = 'scale(0.5)';
      }, 100);
      
      // Clean up after animation
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
    
    // Cart update is handled by global context through addToGlobalCart
  };

  // Toggle Wishlist with Pulse Effect
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


  return (
    <div className="min-h-screen bg-background">
      {/* Use shared header component */}
      <Header className="relative bg-white border-b shadow-sm" variant="solid" />

      {/* Hero Section */}
      <section 
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=800)'
        }}
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
            Our Collections
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed" data-testid="hero-subtitle">
            Discover furniture that transforms spaces into sanctuaries of style and comfort
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Category Sidebar */}
          <div className="w-80">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-6">Categories</h3>

                {/* Categories */}
                <div className="space-y-4">
                  {/* All Products - Full Width */}
                  <Button
                    variant={selectedCategories.length === 0 ? "default" : "outline"}
                    className="w-full justify-start text-left h-16 p-3"
                    onClick={() => setSelectedCategories([])}
                    data-testid="category-all"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80" 
                        alt="All Products"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">All Products</div>
                      <div className="text-xs text-muted-foreground">View everything</div>
                    </div>
                  </Button>

                  {/* Main Categories - 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => {
                      let categoryImage = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120";
                      let description = "Browse collection";
                      
                      if (category.name === "Living Room") {
                        categoryImage = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120";
                        description = "Sofas & chairs";
                      } else if (category.name === "Bedroom") {
                        categoryImage = "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120";
                        description = "Beds & storage";
                      } else if (category.name === "Dining Room") {
                        categoryImage = "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120";
                        description = "Tables & chairs";
                      } else if (category.name === "Office") {
                        categoryImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120";
                        description = "Desks & chairs";
                      }
                      
                      return (
                        <Button
                          key={category.name}
                          variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                          className="h-24 p-2 flex flex-col items-center justify-center text-center"
                          onClick={() => {
                            if (selectedCategories.includes(category.name)) {
                              setSelectedCategories(prev => prev.filter(c => c !== category.name));
                            } else {
                              setSelectedCategories([category.name]);
                            }
                          }}
                          data-testid={`category-${category.name}`}
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden mb-2">
                            <img 
                              src={categoryImage}
                              alt={category.name}
                              className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-xs">{category.name}</div>
                            <div className="text-xs text-muted-foreground">({category.count})</div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <Separator className="my-6" />

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
                    data-testid="price-range-slider"
                  />
                  <div className="flex items-center space-x-2 text-sm">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="h-8"
                      data-testid="price-min-input"
                    />
                    <span>—</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      className="h-8"
                      data-testid="price-max-input"
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
                        data-testid={`color-${color.name}`}
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
                    {materials.map((material) => (
                      <div key={material.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material.name}`}
                          checked={selectedMaterials.includes(material.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMaterials(prev => [...prev, material.name]);
                            } else {
                              setSelectedMaterials(prev => prev.filter(m => m !== material.name));
                            }
                          }}
                          data-testid={`checkbox-material-${material.name}`}
                        />
                        <label 
                          htmlFor={`material-${material.name}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {material.name} ({material.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedMaterials([]);
                    setSelectedColors([]);
                    setPriceRange([1000, 100000]);
                  }}
                  data-testid="clear-filters"
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
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                  <SelectTrigger className="w-48" data-testid="sort-select">
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
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  data-testid="view-grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  data-testid="view-list"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`
              grid gap-6 transition-all duration-300
              ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}
            `}>
              {filteredProducts.map((product, index) => (
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
                  onClick={() => setLocation(`/product/${product.id}`)}
                  onMouseEnter={() => {
                    setHoveredProduct(product.id);
                    setCurrentImageIndex(prev => ({ ...prev, [product.id]: 0 }));
                  }}
                  onMouseLeave={() => {
                    setHoveredProduct(null);
                    setCurrentImageIndex(prev => ({ ...prev, [product.id]: 0 }));
                  }}
                  data-testid={`product-card-${product.id}`}
                >
                  <div className="relative overflow-hidden">
                    {/* Product Image with Carousel */}
                    <div className="aspect-square overflow-hidden relative group">
                      <img
                        src={product.images[currentImageIndex[product.id] || 0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        data-testid={`product-image-${product.id}`}
                      />
                      
                      {/* Image Gallery Indicators */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {product.images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                (currentImageIndex[product.id] || 0) === imgIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Quick Actions - Slide in on hover */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`
                            w-10 h-10 rounded-full p-0 backdrop-blur-sm bg-white/80 hover:bg-white transition-all duration-300
                            ${wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-600'}
                          `}
                          onClick={(e) => toggleWishlist(product.id, e)}
                          data-testid={`wishlist-${product.id}`}
                        >
                          <Heart 
                            className={`w-4 h-4 transition-all duration-300 ${
                              wishlist.includes(product.id) ? 'fill-current animate-heartPulse' : ''
                            }`} 
                          />
                        </Button>
                        
                      </div>

                      {/* Badge */}
                      {product.badge && (
                        <Badge 
                          className={`
                            absolute top-4 left-4 
                            ${product.badge === "20% OFF" ? 'bg-red-500' : 
                              product.badge === "OUT OF STOCK" ? 'bg-gray-500' : 
                              'bg-terracotta'}
                          `}
                          data-testid={`badge-${product.id}`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-terracotta transition-colors duration-200" data-testid={`product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground" data-testid={`rating-${product.id}`}>
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-bold text-terracotta animate-priceCountUp" data-testid={`price-${product.id}`}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through" data-testid={`original-price-${product.id}`}>
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        className="w-full bg-terracotta hover:bg-terracotta-dark transition-all duration-300 transform hover:-translate-y-1"
                        onClick={(e) => addToCart(product.id, e)}
                        disabled={!product.inStock || animatingProducts.has(product.id)}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        {animatingProducts.has(product.id) ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Adding...</span>
                          </div>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Product Count - Bottom */}
            <div className="text-center mt-8 pt-6 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Cart Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Cart Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-serif font-bold">Shopping Cart ({cartCount} items)</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsCartOpen(false)}
                data-testid="close-cart"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Cart Items */}
            {cartCount === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Let's fill it with beautiful furniture!</p>
                <Button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {globalCart.map((item) => {
                  const product = products.find(p => p.id === item.id);
                  if (!product) return null;
                  
                  return (
                    <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-lg font-bold text-primary">
                          ₹{(product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Remove Button */}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
                
                {/* Cart Total */}
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">
                      ₹{globalCart.reduce((total, item) => {
                        return total + (item.price * item.quantity);
                      }, 0).toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => {
                        // Checkout functionality would go here
                        alert("Proceeding to checkout...");
                      }}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
}