import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useCart } from '@/lib/cartContext';
import { useWishlist } from '@/lib/wishlistContext';
import { useToast } from '@/hooks/use-toast';
import { fetchAllProducts, ApiProduct, formatPrice, getUniqueValues, getProductImageUrl } from '@/lib/api';
import { 
  Heart, 
  ShoppingCart, 
  Filter, 
  Grid3X3, 
  List, 
  Search,
  Package,
  Sparkles,
  Truck,
  Shield,
  Award,
  Eye,
  AlertCircle
} from 'lucide-react';

// Color mapping for visual display
const colorDisplay: { [key: string]: string } = {
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

export default function ShopPage() {
  // API State
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter State
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 5000]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI State
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "newest">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [animatingProducts, setAnimatingProducts] = useState<Set<string>>(new Set());
  
  // Use global cart and wishlist contexts
  const { addToCart: addToGlobalCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  
  // Dynamic filter options (calculated from API data)
  const [collections, setCollections] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [fabrics, setFabrics] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  
  const productRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Parse URL search parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);
  
  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
        
        // Extract unique values for filters
        setCollections(getUniqueValues<string>(fetchedProducts, 'Collection'));
        setCategories(getUniqueValues<string>(fetchedProducts, 'Category'));
        setSubCategories(getUniqueValues<string>(fetchedProducts, 'Sub_Category'));
        setColors(getUniqueValues<string>(fetchedProducts, 'Color'));
        setFabrics(getUniqueValues<string>(fetchedProducts, 'Fabric'));
        setSizes(getUniqueValues<string>(fetchedProducts, 'Size'));
        
        // Set price range based on actual data
        const prices = fetchedProducts.map(p => p.Selling_Price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
        
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = products.filter(product => {
      // Search filter
      const searchMatch = !searchQuery || 
        product.Product_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Collection filter
      const collectionMatch = selectedCollections.length === 0 || selectedCollections.includes(product.Collection);
      
      // Category filter
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.Category);
      
      // Sub-category filter
      const subCategoryMatch = selectedSubCategories.length === 0 || 
        selectedSubCategories.some(subCat => product.Sub_Category.includes(subCat));
      
      // Color filter
      const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.Color);
      
      // Fabric filter
      const fabricMatch = selectedFabrics.length === 0 || selectedFabrics.includes(product.Fabric);
      
      // Size filter
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(product.Size);
      
      // Price filter
      const priceMatch = product.Selling_Price >= priceRange[0] && product.Selling_Price <= priceRange[1];
      
      return searchMatch && collectionMatch && categoryMatch && subCategoryMatch && 
             colorMatch && fabricMatch && sizeMatch && priceMatch;
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.Selling_Price - b.Selling_Price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.Selling_Price - a.Selling_Price);
        break;
      case "newest":
        // Assume newer products have higher Thread_Count or just reverse order
        filtered.sort((a, b) => b.Thread_Count - a.Thread_Count);
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCollections, selectedCategories, selectedSubCategories, 
      selectedColors, selectedFabrics, selectedSizes, priceRange, sortBy]);


  // Add to Cart with Animation
  const addToCart = async (productId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const product = products.find(p => p._id === productId);
    if (!product) return;
    
    try {
      // Add to global cart context using the new API-based interface
      await addToGlobalCart(productId, 1);

      // Show success toast
      toast({
        title: "Added to cart",
        description: `${product.Product_Name} has been added to your cart`,
      });
      
      // Animation
      const productElement = productRefs.current[productId];
      
      if (productElement) {
        setAnimatingProducts(prev => new Set(Array.from(prev).concat([productId])));
        
        // Create flying animation element
        const flyingElement = document.createElement('div');
        flyingElement.style.position = 'fixed';
        flyingElement.style.zIndex = '9999';
        flyingElement.style.pointerEvents = 'none';
        flyingElement.style.width = '60px';
        flyingElement.style.height = '60px';
        flyingElement.style.borderRadius = '12px';
        flyingElement.style.backgroundColor = '#B8734C';
        flyingElement.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        flyingElement.style.boxShadow = '0 8px 25px rgba(184, 115, 76, 0.4)';
        flyingElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="m16 10l-4 4l-4-4"></path></svg></div>`;
        
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
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Toggle Wishlist using global context
  const handleToggleWishlist = async (productId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    await toggleWishlist(productId);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCollections([]);
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setPriceRange([Math.min(...products.map(p => p.Selling_Price)), Math.max(...products.map(p => p.Selling_Price))]);
    setSearchQuery('');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header className="relative bg-white border-b shadow-sm" variant="solid" />
        <div className="container mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Sidebar Skeleton */}
            <div className="w-80">
              <Card className="sticky top-4">
                <CardContent className="p-6 space-y-6">
                  <Skeleton className="h-6 w-24" />
                  <div className="space-y-3">
                    <Skeleton className="h-16 w-full" />
                    <div className="grid grid-cols-2 gap-3">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Main Content Skeleton */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-square w-full" />
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-6 w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header className="relative bg-white border-b shadow-sm" variant="solid" />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="p-8 text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Failed to Load Products</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Use shared header component */}
      <Header className="relative bg-white border-b shadow-sm" variant="solid" />

      {/* Hero Section */}
      <section 
        className="relative h-64 flex items-center justify-center bg-gradient-to-br from-terracotta via-terracotta-dark to-amber-700"
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-300" />
            <h1 className="font-serif text-3xl md:text-5xl font-bold" data-testid="hero-title">
              Premium Collections
            </h1>
            <Sparkles className="w-6 h-6 ml-2 text-yellow-300" />
          </div>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-6" data-testid="hero-subtitle">
            Discover luxury bedding and home furnishings crafted with the finest materials and exquisite attention to detail
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span>100% Cotton</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products, collections, or colors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-full border-2 focus:border-terracotta transition-colors"
            />
          </div>
        </div>
        
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80">
            <Card className="sticky top-4 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-terracotta" />
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-terracotta hover:text-terracotta-dark"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Collections */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-terracotta">Collections</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {collections.map((collection) => (
                      <Button
                        key={collection}
                        variant={selectedCollections.includes(collection) ? "default" : "outline"}
                        size="sm"
                        className={`h-12 text-xs ${selectedCollections.includes(collection) ? 'bg-terracotta text-white' : ''}`}
                        onClick={() => {
                          if (selectedCollections.includes(collection)) {
                            setSelectedCollections(prev => prev.filter(c => c !== collection));
                          } else {
                            setSelectedCollections([collection]);
                          }
                        }}
                      >
                        {collection}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-terracotta">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories(prev => [...prev, category]);
                            } else {
                              setSelectedCategories(prev => prev.filter(c => c !== category));
                            }
                          }}
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />
                
                {/* Sub Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-terracotta">Sub Categories</h4>
                  <div className="space-y-2">
                    {subCategories.map((subCategory) => (
                      <div key={subCategory} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subcategory-${subCategory}`}
                          checked={selectedSubCategories.includes(subCategory)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSubCategories(prev => [...prev, subCategory]);
                            } else {
                              setSelectedSubCategories(prev => prev.filter(sc => sc !== subCategory));
                            }
                          }}
                        />
                        <label 
                          htmlFor={`subcategory-${subCategory}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {subCategory}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Colors */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-terracotta">Colors</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {colors.map((color) => (
                      <div
                        key={color}
                        className={`
                          w-8 h-8 rounded-full border-2 cursor-pointer relative transition-all hover:scale-110
                          ${selectedColors.includes(color) ? 'border-terracotta scale-110 ring-2 ring-terracotta ring-opacity-30' : 'border-gray-300'}
                        `}
                        style={{ backgroundColor: colorDisplay[color] || '#6B7280' }}
                        onClick={() => {
                          if (selectedColors.includes(color)) {
                            setSelectedColors(prev => prev.filter(c => c !== color));
                          } else {
                            setSelectedColors(prev => [...prev, color]);
                          }
                        }}
                        title={color}
                      >
                        {selectedColors.includes(color) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-2 h-2 rounded-full ${color === 'White' || color === 'Off White' || color === 'Beige' ? 'bg-gray-600' : 'bg-white'}`} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Fabric */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-terracotta">Fabric</h4>
                  <div className="space-y-2">
                    {fabrics.map((fabric) => (
                      <div key={fabric} className="flex items-center space-x-2">
                        <Checkbox
                          id={`fabric-${fabric}`}
                          checked={selectedFabrics.includes(fabric)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFabrics(prev => [...prev, fabric]);
                            } else {
                              setSelectedFabrics(prev => prev.filter(f => f !== fabric));
                            }
                          }}
                        />
                        <label 
                          htmlFor={`fabric-${fabric}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {fabric}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Size */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-terracotta">Size</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSizes.includes(size) ? "default" : "outline"}
                        size="sm"
                        className={`${selectedSizes.includes(size) ? 'bg-terracotta text-white' : ''}`}
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

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-terracotta">Price Range</h4>
                  <div className="mb-3">
                    <div className="text-sm text-center mb-2">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      max={Math.max(...products.map(p => p.Selling_Price))}
                      min={Math.min(...products.map(p => p.Selling_Price))}
                      step={100}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-serif font-bold">
                  {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
                </h2>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? 'bg-terracotta text-white' : ''}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? 'bg-terracotta text-white' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={clearAllFilters} className="bg-terracotta text-white">
                  Clear All Filters
                </Button>
              </div>
            )}
            
            {/* Product Grid */}
            <div className={`
              grid gap-6 transition-all duration-300
              ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}
            `}>
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product._id}
                  ref={(el) => productRefs.current[product._id] = el}
                  className={`
                    group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg overflow-hidden
                    ${animatingProducts.has(product._id) ? 'animate-pulse' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                  onClick={() => setLocation(`/product/${product._id}`)}
                  data-testid={`product-card-${product._id}`}
                >
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
                    <div 
                      className="w-full h-full flex items-center justify-center text-4xl font-serif font-bold text-gray-400 bg-gradient-to-br"
                      style={{
                        background: `linear-gradient(135deg, ${colorDisplay[product.Color] || '#6B7280'}20, ${colorDisplay[product.Color] || '#6B7280'}40)`
                      }}
                    >
                      {product.Product_Name.charAt(0)}
                    </div>
                    
                    {/* Collection Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        className="bg-terracotta text-white px-2 py-1 text-xs font-medium"
                      >
                        {product.Collection}
                      </Badge>
                    </div>
                    
                    {/* Stock Status - Hidden */}
                    {/* <div className="absolute top-3 right-3">
                      <Badge 
                        variant={product.Qty_in_Stock > 0 ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {product.Qty_in_Stock > 0 ? `${product.Qty_in_Stock} in stock` : 'Out of stock'}
                      </Badge>
                    </div> */}

                    {/* Quick Actions - Slide in on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full bg-white/90 text-black hover:bg-white shadow-lg backdrop-blur-sm"
                          onClick={(e) => handleToggleWishlist(product._id, e)}
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              isInWishlist(product._id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-gray-600'
                            }`} 
                          />
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-terracotta text-white hover:bg-terracotta-dark shadow-lg"
                          onClick={(e) => addToCart(product._id, e)}
                          disabled={product.Qty_in_Stock === 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full bg-white/90 text-black hover:bg-white shadow-lg backdrop-blur-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setLocation(`/product/${product._id}`);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-serif text-xl font-bold group-hover:text-terracotta transition-colors duration-200 mb-2">
                        {product.Product_Name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-5">
                          {product.Category}
                        </Badge>
                        {product.Sub_Category.map((subCat) => (
                          <Badge key={subCat} variant="outline" className="text-xs px-1.5 py-0.5 h-5">
                            {subCat}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2 border"
                            style={{ backgroundColor: colorDisplay[product.Color] || '#6B7280' }}
                          />
                          {product.Color}
                        </div>
                        <div>{product.Fabric}</div>
                        <div>{product.Size}</div>
                        <div>{product.Thread_Count} TC</div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-terracotta">
                          {formatPrice(product.Selling_Price)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {product.Net_Qty} piece set
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Dimensions</div>
                        <div className="text-xs font-medium">{product.Dimensions}</div>
                      </div>
                    </div>
                  </CardContent>
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



      {/* Footer */}
      <Footer />
    </div>
  );
}