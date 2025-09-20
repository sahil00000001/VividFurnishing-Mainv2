import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { shopProducts } from '@/data/products';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  Heart, 
  ShoppingCart, 
  Star, 
  Minus,
  Plus,
  Package,
  Truck,
  Shield,
  RotateCcw,
  Droplets
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

export default function ProductPage() {
  const [, params] = useRoute('/product/:id');
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use global cart context
  const { addToCart: addToGlobalCart } = useCart();
  const { toast } = useToast();
  
  // Find the product by ID
  const productId = params?.id ? parseInt(params.id) : null;
  const product = productId ? shopProducts.find(p => p.id === productId) : null;
  
  // Redirect to shop if product not found
  useEffect(() => {
    if (productId && !product) {
      setLocation('/shop');
      return;
    }
    setIsLoading(false);
  }, [productId, product, setLocation]);
  
  // Set document title for SEO
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - SM Furnishings`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Buy ${product.name} - Premium ${product.category} furniture in ${product.material}. Price: ₹${product.price.toLocaleString()}. In stock and ready to ship.`);
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
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return null; // Will redirect in useEffect
  }
  
  const handleAddToCart = () => {
    // Add the selected quantity to cart
    for (let i = 0; i < quantity; i++) {
      addToGlobalCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} has been added to your cart`,
    });
  };
  
  const handleGoBack = () => {
    setLocation('/shop');
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist`,
    });
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
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                data-testid={`product-main-image`}
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      currentImageIndex === index ? 'border-terracotta' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    data-testid={`product-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              {product.badge && (
                <Badge 
                  className={`mb-4 ${
                    product.badge === "20% OFF" ? 'bg-red-500' : 
                    product.badge === "OUT OF STOCK" ? 'bg-gray-500' : 
                    'bg-terracotta'
                  }`}
                  data-testid="product-badge"
                >
                  {product.badge}
                </Badge>
              )}
              
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="product-name">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground" data-testid="product-rating">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-terracotta" data-testid="product-price">
                  ₹{(product.price * quantity).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through" data-testid="product-original-price">
                    ₹{(product.originalPrice * quantity).toLocaleString()}
                  </span>
                )}
                {product.discount && (
                  <Badge variant="destructive" data-testid="product-discount">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
            </div>
            
            <Separator />
            
            {/* Product Specifications */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Category:</span>
                  <span className="ml-2 text-muted-foreground" data-testid="product-category">{product.category}</span>
                </div>
                <div>
                  <span className="font-medium">Material:</span>
                  <span className="ml-2 text-muted-foreground" data-testid="product-material">{product.material}</span>
                </div>
                <div>
                  <span className="font-medium">Color:</span>
                  <span className="ml-2 text-muted-foreground" data-testid="product-color">{product.color}</span>
                </div>
                <div>
                  <span className="font-medium">Availability:</span>
                  <span className={`ml-2 ${product.inStock ? 'text-green-600' : 'text-red-600'}`} data-testid="product-availability">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
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
                  disabled={!product.inStock}
                  data-testid="add-to-cart-button"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  onClick={toggleWishlist}
                  className={`px-6 ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
                  data-testid="wishlist-button"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
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
                  Experience the perfect blend of comfort and style with our {product.name}. 
                  Crafted from premium {product.material.toLowerCase()}, this {product.category.toLowerCase()} piece 
                  brings sophistication to any space. The {product.color.toLowerCase()} finish complements 
                  a wide range of interior designs, making it a versatile addition to your home.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Each piece is carefully constructed by skilled artisans who pay attention to every detail. 
                  The durable construction ensures longevity, while the timeless design ensures it will remain 
                  a cherished part of your home for years to come.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  With a {product.rating}-star rating from {product.reviews} satisfied customers, 
                  you can trust in the quality and craftsmanship of this exceptional piece.
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
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Machine wash on gentle cycle with similar colors</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Use cold or lukewarm water (up to 30°C)</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Prefer mild, liquid detergent</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Do not bleach or use harsh chemicals</span>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-terracotta">Drying & Ironing</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Line dry in shade or tumble dry on low heat</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Warm iron if needed</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-terracotta font-bold mt-1">•</span>
                      <span>Dry cleaning is not required</span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Important Note
                  </h4>
                  <p className="text-amber-700 text-sm">
                    Wash separately the first time to avoid color transfer. Following these care instructions will help maintain the quality and extend the life of your {product.name}.
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