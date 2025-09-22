import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useCart } from '@/lib/cartContext';
import { useWishlist } from '@/lib/wishlistContext';
import { useToast } from '@/hooks/use-toast';
import { fetchProductById, ApiProduct, formatPrice, getProductImageUrl, colorDisplay } from '@/lib/api';
import { 
  ArrowLeft,
  Heart, 
  ShoppingCart, 
  Minus,
  Plus,
  Package,
  Truck,
  Shield,
  RotateCcw,
  Droplets,
  AlertCircle
} from 'lucide-react';


export default function ProductPage() {
  const [, params] = useRoute('/product/:id');
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState(false);
  
  // Use global cart and wishlist contexts
  const { addToCart: addToGlobalCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  const productId = params?.id;
  
  // Fetch product data from API
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setLocation('/shop');
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);
        setSelectedImageIndex(0); // Reset selected image when new product loads
        setImageLoadError(false); // Reset image error state
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [productId, setLocation]);
  
  // Set document title for SEO
  useEffect(() => {
    if (product) {
      document.title = `${product.Product_Name} - SM Furnishings`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Buy ${product.Product_Name} - Premium ${product.Category} ${product.Fabric}. Price: ${formatPrice(product.Selling_Price)}. In stock and ready to ship.`);
      }
    }
    
    return () => {
      document.title = 'SM Furnishings';
    };
  }, [product]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header className="relative bg-white border-b shadow-sm" variant="solid" />
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header className="relative bg-white border-b shadow-sm" variant="solid" />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="p-8 text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Product Not Found</h3>
              <p className="text-muted-foreground mb-4">
                {error || 'The product you are looking for does not exist.'}
              </p>
              <Button onClick={() => setLocation('/shop')} className="bg-terracotta text-white">
                Back to Shop
              </Button>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = async () => {
    try {
      // Add the selected quantity to cart using the correct API
      await addToGlobalCart(product._id, quantity);
      
      toast({
        title: "Added to cart",
        description: `${quantity}x ${product.Product_Name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleGoBack = () => {
    setLocation('/shop');
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleToggleWishlist = async () => {
    if (!product) return;
    await toggleWishlist(product._id);
  };
  
  const handleImageSelect = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setImageLoadError(false); // Reset error state when selecting new image
  };
  
  const handleKeySelect = (event: React.KeyboardEvent, imageIndex: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleImageSelect(imageIndex);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header className="relative bg-white border-b shadow-sm" variant="solid" />
      
      {/* Go Back Button */}
      <div className="container mx-auto px-6 py-4">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
          data-testid="go-back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Button>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
              {!imageLoadError ? (
                <img 
                  key={selectedImageIndex} // Force re-render on image change
                  src={getProductImageUrl(product, selectedImageIndex)}
                  alt={`${product.Product_Name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="eager"
                  decoding="async"
                  onError={() => setImageLoadError(true)}
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center text-6xl font-serif font-bold text-gray-400"
                  style={{
                    background: `linear-gradient(135deg, ${colorDisplay[product.Color] || '#6B7280'}20, ${colorDisplay[product.Color] || '#6B7280'}40)`
                  }}
                >
                  {product.Product_Name.charAt(0)}
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.Pictures && product.Pictures.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.Pictures.map((_, imageIndex) => (
                  <div
                    key={imageIndex}
                    role="button"
                    tabIndex={0}
                    className={`aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 ${
                      selectedImageIndex === imageIndex
                        ? 'ring-2 ring-terracotta ring-offset-2'
                        : 'hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'
                    }`}
                    onClick={() => handleImageSelect(imageIndex)}
                    onKeyDown={(e) => handleKeySelect(e, imageIndex)}
                    aria-selected={selectedImageIndex === imageIndex}
                    aria-label={`View image ${imageIndex + 1} of ${product.Pictures.length}`}
                    data-testid={`product-thumbnail-${imageIndex}`}
                  >
                    <img 
                      src={getProductImageUrl(product, imageIndex)}
                      alt={`${product.Product_Name} - Thumbnail ${imageIndex + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Hide thumbnail if image fails to load
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.display = 'none';
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Collection Badge */}
            <div className="text-center">
              <Badge className="bg-terracotta text-white px-4 py-2">
                {product.Collection} Collection
              </Badge>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              {/* Stock Status Badge - Hidden */}
              {/* <div className="mb-4">
                <Badge 
                  variant={product.Qty_in_Stock > 0 ? "default" : "destructive"}
                  className="text-sm"
                >
                  {product.Qty_in_Stock > 0 ? `${product.Qty_in_Stock} in stock` : 'Out of stock'}
                </Badge>
              </div> */}
              
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="product-name">
                {product.Product_Name}
              </h1>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-1 mb-4">
                <Badge variant="outline" className="text-xs px-2 py-1">
                  {product.Category}
                </Badge>
                {product.Sub_Category.map((subCat) => (
                  <Badge key={subCat} variant="outline" className="text-xs px-2 py-1">
                    {subCat}
                  </Badge>
                ))}
              </div>
              
              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-terracotta" data-testid="product-price">
                  {formatPrice(product.Selling_Price * quantity)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.Net_Qty} piece set
                </span>
              </div>
            </div>
            
            <Separator />
            
            {/* Product Specifications */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Collection:</span>
                  <span className="ml-2 text-muted-foreground">{product.Collection}</span>
                </div>
                <div>
                  <span className="font-medium">Fabric:</span>
                  <span className="ml-2 text-muted-foreground" data-testid="product-material">{product.Fabric}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Color:</span>
                  <div className="flex items-center ml-2">
                    <div 
                      className="w-4 h-4 rounded-full mr-2 border"
                      style={{ backgroundColor: colorDisplay[product.Color] || '#6B7280' }}
                    />
                    <span className="text-muted-foreground" data-testid="product-color">{product.Color}</span>
                  </div>
                </div>
                <div>
                  <span className="font-medium">Size:</span>
                  <span className="ml-2 text-muted-foreground">{product.Size}</span>
                </div>
                <div>
                  <span className="font-medium">Dimensions:</span>
                  <span className="ml-2 text-muted-foreground">{product.Dimensions}</span>
                </div>
                <div>
                  <span className="font-medium">Thread Count:</span>
                  <span className="ml-2 text-muted-foreground">{product.Thread_Count} TC</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Quantity and Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    data-testid="quantity-decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg" data-testid="quantity-display">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    data-testid="quantity-increase"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-3 text-lg"
                  onClick={handleAddToCart}
                  disabled={product.Qty_in_Stock === 0}
                  data-testid="add-to-cart-button"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.Qty_in_Stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleWishlist}
                  className={`px-6 ${isInWishlist(product._id) ? 'text-red-500 border-red-500' : ''}`}
                  data-testid="wishlist-button"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
            
            <Separator />
            
            {/* Features */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Why Choose This Product</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Premium Quality</div>
                    <div className="text-xs text-muted-foreground">Crafted with finest materials</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Free Delivery</div>
                    <div className="text-xs text-muted-foreground">On orders above ₹25,000</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">2 Year Warranty</div>
                    <div className="text-xs text-muted-foreground">Comprehensive coverage</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RotateCcw className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Easy Returns</div>
                    <div className="text-xs text-muted-foreground">30-day return policy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Product Information */}
        <div className="mt-16 space-y-8">
          {/* Product Description */}
          <Card>
            <CardContent className="p-8">
              <h2 className="font-serif text-2xl font-bold mb-6">Product Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.Description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Experience the perfect blend of comfort and style with our {product.Product_Name}. 
                  Crafted from premium {product.Fabric.toLowerCase()}, this {product.Category.toLowerCase()} piece 
                  brings sophistication to any space. The {product.Color.toLowerCase()} finish complements 
                  a wide range of interior designs, making it a versatile addition to your home.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Each piece is carefully constructed with {product.Thread_Count} thread count fabric, ensuring 
                  premium quality and comfort. The {product.Size} size with {product.Dimensions} dimensions makes it 
                  perfect for your home. This {product.Net_Qty}-piece set includes everything you need for 
                  a complete bedding solution.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Care Instructions */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-6 h-6 text-terracotta" />
                <h2 className="font-serif text-2xl font-bold" data-testid="care-instructions-title">Care Instructions</h2>
              </div>
              
              {/* Washing Instructions */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-terracotta">Washing Guidelines</h3>
                  <div className="space-y-2 text-muted-foreground">
                    {product.Wash_Care_Instructions.map((instruction, index) => (
                      <p key={index} className="flex items-start gap-2">
                        <span className="text-terracotta font-bold mt-1">•</span>
                        <span>{instruction}</span>
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Important Note
                  </h4>
                  <p className="text-amber-700 text-sm">
                    Following these care instructions will help maintain the quality and extend the life of your {product.Product_Name}.
                  </p>
                </div>
                
                {/* Additional Care Tips */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-terracotta">Storage Tips</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Store in a cool, dry place when not in use</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Avoid exposure to direct sunlight for extended periods</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Use breathable storage bags to prevent moisture buildup</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}