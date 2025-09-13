import { useState } from "react";
import { Search, User, ShoppingBag, Menu, ChevronLeft, ChevronRight, Armchair, Table, Sofa, Square, Lightbulb, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { id: 1, name: "Rocking Chair", icon: Armchair },
  { id: 2, name: "Side Table", icon: Table },
  { id: 3, name: "Accent Chair", icon: Sofa },
  { id: 4, name: "Ottoman", icon: Square },
  { id: 5, name: "Table Lamp", icon: Lightbulb },
  { id: 6, name: "Decorative Vase", icon: Flower },
];

const bestSellers = [
  {
    id: 1,
    name: "Tufted Leather Sofa",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Burnt orange tufted leather sofa"
  },
  {
    id: 2,
    name: "Papasan Chair",
    price: "$899",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Cream papasan chair with rattan base"
  },
  {
    id: 3,
    name: "Modern Accent Chair",
    price: "$649",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Powder blue modern accent chair with wooden legs"
  }
];

const premiumProducts = [
  {
    id: 1,
    name: "Pink Blush Accent Chair",
    category: "Seating",
    price: "₹5000",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=400",
    alt: "Pink blush tufted accent chair with wooden legs",
    column: "left",
    height: "h-96"
  },
  {
    id: 2,
    name: "Tripod Floor Lamp",
    category: "Lighting",
    price: "₹3500",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=450",
    alt: "Modern tripod floor lamp with textured shade",
    column: "right",
    height: "h-80"
  },
  {
    id: 3,
    name: "Navy Victorian Armchair",
    category: "Seating",
    price: "₹7500",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=420",
    alt: "Navy blue tufted Victorian-style armchair",
    column: "left",
    height: "h-80"
  },
  {
    id: 4,
    name: "Contemporary Lounge Chair",
    category: "Seating",
    price: "₹4200",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=380",
    alt: "Cream contemporary lounge chair with ottoman functionality",
    column: "right",
    height: "h-96"
  },
  {
    id: 5,
    name: "Rattan Hanging Chair",
    category: "Seating",
    price: "₹6800",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=460",
    alt: "Woven rattan hanging egg chair with stand",
    column: "left",
    height: "h-72"
  }
];

const collections = [
  {
    id: 1,
    title: "Contemporary Living Collection",
    description: "Discover our signature collection of contemporary furniture designed for modern living. Each piece is meticulously crafted to blend comfort with sophistication, creating spaces that inspire and delight. From plush sofas to elegant dining sets, our collection embodies the perfect balance of luxury and livability.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Contemporary living room with beige sofa",
    buttonText: "View Collection",
    imagePosition: "right"
  },
  {
    id: 2,
    title: "Bedroom Sanctuary Series",
    description: "Transform your bedroom into a personal retreat with our Sanctuary Series. Featuring handcrafted bed frames, luxurious textiles, and thoughtfully designed storage solutions, this collection creates a harmonious environment where rest and relaxation take center stage.",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Minimalist bedroom with neutral decor",
    buttonText: "Explore Bedrooms",
    imagePosition: "left"
  },
  {
    id: 3,
    title: "Artisan Dining Collection",
    description: "Elevate your dining experience with our Artisan Collection. Each table, chair, and accent piece is crafted by skilled artisans who understand that dining is about more than just meals—it's about creating memories. Our pieces bring family and friends together in spaces that celebrate both form and function.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Modern dining room with wooden table",
    buttonText: "Shop Dining",
    imagePosition: "right"
  }
];

export default function Home() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [email, setEmail] = useState("");

  const nextCategory = () => {
    setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
  };

  const prevCategory = () => {
    setCurrentCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleSubscribe = () => {
    if (email) {
      console.log("Newsletter subscription:", email);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-6 py-6">
          {/* Brand Name */}
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wider" data-testid="brand-logo">
              SM FURNISHINGS
            </h1>
          </div>
          
          {/* Navigation Container */}
          <div className="flex items-center justify-between">
            {/* Main Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-12 text-white font-medium">
                <li><a href="#" className="hover:text-cream transition-colors duration-200" data-testid="nav-home">HOME</a></li>
                <li><a href="#" className="hover:text-cream transition-colors duration-200" data-testid="nav-category">CATEGORY</a></li>
                <li><a href="#" className="hover:text-cream transition-colors duration-200" data-testid="nav-shop">SHOP</a></li>
                <li><a href="#" className="hover:text-cream transition-colors duration-200" data-testid="nav-about">ABOUT US</a></li>
              </ul>
            </nav>
            
            {/* Right Icons */}
            <div className="flex items-center space-x-6 text-white">
              <button className="hover:text-cream transition-colors duration-200" data-testid="button-search">
                <Search className="w-5 h-5" />
              </button>
              <button className="hover:text-cream transition-colors duration-200" data-testid="button-account">
                <User className="w-5 h-5" />
              </button>
              <button className="hover:text-cream transition-colors duration-200 relative" data-testid="button-cart">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="cart-count">3</span>
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" data-testid="button-mobile-menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-wide" data-testid="hero-headline">
            AFFORDABLE <span className="text-cream">·</span> LUXURY
          </h2>
          <p className="text-xl md:text-2xl font-light mb-8 tracking-wider" data-testid="hero-subheading">
            For Every Home
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white bg-transparent text-terracotta font-semibold px-8 py-4 text-lg tracking-wide hover:bg-white hover:text-terracotta-dark transition-all duration-300"
            data-testid="button-explore-collection"
          >
            Explore Collection
          </Button>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          {/* Section Title with Decorative Lines */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-foreground opacity-30"></div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mx-8 text-foreground tracking-wider" data-testid="category-title">
                SHOP BY CATEGORY
              </h3>
              <div className="flex-1 h-px bg-foreground opacity-30"></div>
            </div>
          </div>
          
          {/* Category Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div 
                    key={category.id}
                    className="text-center group cursor-pointer" 
                    data-testid={`category-${category.id}`}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cream-dark transition-colors duration-200">
                      <IconComponent className="text-terracotta text-2xl md:text-3xl w-8 h-8 md:w-12 md:h-12" />
                    </div>
                    <p className="text-foreground font-medium" data-testid={`category-name-${category.id}`}>
                      {category.name}
                    </p>
                  </div>
                );
              })}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevCategory}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta-dark transition-colors duration-200"
              data-testid="button-prev-category"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextCategory}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta-dark transition-colors duration-200"
              data-testid="button-next-category"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="border border-cream-dark rounded-2xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Left Content Area - 30% */}
                <div className="lg:w-[30%] space-y-6">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground" data-testid="bestsellers-title">
                    BEST SELLERS
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="bestsellers-description">
                    Pizza Ipsum Dolor Meat Lovers Buffalo, Pepperoni Olives Steak Roll Pork Hawaiian, Philly Meatball Green Parmesan Philly.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-2 border-terracotta bg-transparent text-terracotta font-semibold px-5 py-2.5 rounded-md hover:bg-terracotta hover:text-white transition-all duration-200"
                    data-testid="button-explore-more"
                  >
                    Explore More
                  </Button>
                </div>
                
                {/* Right Product Showcase - 70% */}
                <div className="lg:w-[70%]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bestSellers.map((product) => (
                      <div 
                        key={product.id}
                        className="bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer"
                        data-testid={`product-card-${product.id}`}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={product.image}
                            alt={product.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            data-testid={`product-image-${product.id}`}
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-serif text-lg font-semibold text-foreground mb-2" data-testid={`product-name-${product.id}`}>
                            {product.name}
                          </h4>
                          <p className="text-terracotta font-semibold text-lg" data-testid={`product-price-${product.id}`}>
                            {product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Choice Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="border border-cream-dark rounded-2xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Left Product Showcase - 70% */}
                <div className="lg:w-[70%] order-2 lg:order-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bestSellers.map((product) => (
                      <div 
                        key={product.id}
                        className="bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer"
                        data-testid={`luxury-product-card-${product.id}`}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={product.image}
                            alt={product.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            data-testid={`luxury-product-image-${product.id}`}
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-serif text-lg font-semibold text-foreground mb-2" data-testid={`luxury-product-name-${product.id}`}>
                            {product.name}
                          </h4>
                          <p className="text-terracotta font-semibold text-lg" data-testid={`luxury-product-price-${product.id}`}>
                            {product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right Content Area - 30% */}
                <div className="lg:w-[30%] space-y-6 order-1 lg:order-2">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground" data-testid="luxury-choice-title">
                    LUXURY CHOICE
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="luxury-choice-description">
                    Pizza Ipsum Dolor Meat Lovers Buffalo, Pepperoni Olives Steak Roll Pork Hawaiian, Philly Meatball Green Parmesan Philly.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-2 border-terracotta bg-transparent text-terracotta font-semibold px-5 py-2.5 rounded-md hover:bg-terracotta hover:text-white transition-all duration-200"
                    data-testid="button-luxury-explore-more"
                  >
                    Explore More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-terracotta text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="mission-title">
            Our <span className="font-script italic">one</span> Mission
          </h3>
          <p className="text-xl md:text-2xl font-light mb-8 leading-relaxed" data-testid="mission-tagline">
            Redefining how people experience luxury living.
          </p>
          <p className="text-lg leading-relaxed opacity-90 max-w-3xl mx-auto" data-testid="mission-description">
            At SM Furnishings, we believe that luxury should be accessible to everyone. Our carefully curated collection combines timeless design with contemporary comfort, bringing affordable elegance to every home. We source the finest materials and work with skilled artisans to create furniture that doesn't just fill a space—it transforms it into a sanctuary of style and sophistication.
          </p>
        </div>
      </section>

      {/* Luxury Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground" data-testid="luxury-title">
              <span className="text-terracotta">·</span> LUXURY <span className="text-terracotta">·</span>
            </h3>
          </div>
          
          {/* Content Rows */}
          <div className="max-w-7xl mx-auto space-y-20">
            {collections.map((collection) => (
              <div 
                key={collection.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  collection.imagePosition === "left" ? "" : "lg:grid-cols-2"
                }`}
              >
                {collection.imagePosition === "left" ? (
                  <>
                    <div>
                      <img 
                        src={collection.image}
                        alt={collection.alt}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                        data-testid={`collection-image-${collection.id}`}
                      />
                    </div>
                    <div className="space-y-6">
                      <h4 className="font-serif text-3xl font-bold text-foreground" data-testid={`collection-title-${collection.id}`}>
                        {collection.title}
                      </h4>
                      <p className="text-lg text-muted-foreground leading-relaxed" data-testid={`collection-description-${collection.id}`}>
                        {collection.description}
                      </p>
                      <Button 
                        className="bg-terracotta text-white px-8 py-3 font-semibold hover:bg-terracotta-dark transition-colors duration-200"
                        data-testid={`button-view-collection-${collection.id}`}
                      >
                        {collection.buttonText}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-6">
                      <h4 className="font-serif text-3xl font-bold text-foreground" data-testid={`collection-title-${collection.id}`}>
                        {collection.title}
                      </h4>
                      <p className="text-lg text-muted-foreground leading-relaxed" data-testid={`collection-description-${collection.id}`}>
                        {collection.description}
                      </p>
                      <Button 
                        className="bg-terracotta text-white px-8 py-3 font-semibold hover:bg-terracotta-dark transition-colors duration-200"
                        data-testid={`button-view-collection-${collection.id}`}
                      >
                        {collection.buttonText}
                      </Button>
                    </div>
                    <div className="order-first lg:order-last">
                      <img 
                        src={collection.image}
                        alt={collection.alt}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                        data-testid={`collection-image-${collection.id}`}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Collection Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          {/* Section Header with Decorative Lines */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-foreground opacity-30"></div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mx-8 text-foreground tracking-wider" data-testid="premium-collection-title">
                Premium Collection
              </h3>
              <div className="flex-1 h-px bg-foreground opacity-30"></div>
            </div>
          </div>
          
          {/* Masonry Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {premiumProducts.filter(product => product.column === 'left').map((product) => (
                  <div 
                    key={product.id}
                    className={`relative bg-cream rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer ${product.height}`}
                    data-testid={`premium-card-${product.id}`}
                  >
                    {/* Product Image */}
                    <div className="relative h-3/5 overflow-hidden">
                      <img 
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-full object-cover"
                        data-testid={`premium-image-${product.id}`}
                      />
                      
                      {/* Price Banner - Overlapping */}
                      <div className="absolute bottom-0 right-0 bg-terracotta px-4 py-2 transform translate-y-1/2 z-10">
                        <span className="text-white font-bold text-lg" data-testid={`premium-price-${product.id}`}>
                          {product.price}
                        </span>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4 pt-8 h-2/5 flex flex-col justify-center">
                      <h4 className="font-serif text-xl font-semibold text-gray-800 mb-2" data-testid={`premium-name-${product.id}`}>
                        {product.name}
                      </h4>
                      <p className="text-gray-600 text-sm" data-testid={`premium-category-${product.id}`}>
                        {product.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right Column - Offset */}
              <div className="space-y-6 md:mt-20">
                {premiumProducts.filter(product => product.column === 'right').map((product) => (
                  <div 
                    key={product.id}
                    className={`relative bg-cream rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer ${product.height}`}
                    data-testid={`premium-card-${product.id}`}
                  >
                    {/* Product Image */}
                    <div className="relative h-3/5 overflow-hidden">
                      <img 
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-full object-cover"
                        data-testid={`premium-image-${product.id}`}
                      />
                      
                      {/* Price Banner - Overlapping */}
                      <div className="absolute bottom-0 right-0 bg-terracotta px-4 py-2 transform translate-y-1/2 z-10">
                        <span className="text-white font-bold text-lg" data-testid={`premium-price-${product.id}`}>
                          {product.price}
                        </span>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4 pt-8 h-2/5 flex flex-col justify-center">
                      <h4 className="font-serif text-xl font-semibold text-gray-800 mb-2" data-testid={`premium-name-${product.id}`}>
                        {product.name}
                      </h4>
                      <p className="text-gray-600 text-sm" data-testid={`premium-category-${product.id}`}>
                        {product.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Call-to-Action Button */}
            <div className="text-center mt-16">
              <Button 
                variant="outline"
                className="border-2 border-terracotta bg-transparent text-terracotta font-semibold px-8 py-3 rounded-md hover:bg-terracotta hover:text-white transition-all duration-200"
                data-testid="button-explore-shop"
              >
                Explore Shop
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-6 text-center">
          <h3 className="font-serif text-3xl font-bold text-foreground mb-4" data-testid="newsletter-title">
            Stay Connected
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="newsletter-description">
            Be the first to know about new collections, exclusive offers, and design inspiration.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-border rounded-none focus:outline-none focus:border-terracotta"
              data-testid="input-newsletter-email"
            />
            <Button 
              onClick={handleSubscribe}
              className="bg-terracotta text-white px-8 py-3 font-semibold hover:bg-terracotta-dark transition-colors duration-200"
              data-testid="button-subscribe-newsletter"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-serif text-2xl font-bold mb-6" data-testid="footer-brand">SM FURNISHINGS</h4>
              <p className="text-gray-300 leading-relaxed" data-testid="footer-description">
                Creating affordable luxury for every home. Discover furniture that transforms spaces into sanctuaries of style and comfort.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4" data-testid="footer-quick-links-title">Quick Links</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-home">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-shop">Shop</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-about">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-contact">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4" data-testid="footer-categories-title">Categories</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-category-living">Living Room</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-category-bedroom">Bedroom</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-category-dining">Dining Room</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-category-accessories">Accessories</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4" data-testid="footer-social-title">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-social-facebook">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-social-instagram">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.321-1.297C4.198 14.81 3.708 13.659 3.708 12.362c0-1.297.49-2.448 1.297-3.321.873-.873 2.024-1.297 3.321-1.297 1.297 0 2.448.49 3.321 1.297.873.873 1.297 2.024 1.297 3.321 0 1.297-.49 2.448-1.297 3.321-.873.873-2.024 1.297-3.321 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-social-pinterest">
                  <span className="sr-only">Pinterest</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-social-twitter">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p data-testid="footer-copyright">&copy; 2024 SM Furnishings. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
