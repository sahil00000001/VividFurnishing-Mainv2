import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Armchair, Table, Sofa, Square, Lightbulb, Flower, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { PremiumTabs } from "@/components/PremiumTabs";
import { ServiceFeaturesBar } from "@/components/ServiceFeaturesBar";
import { bestSellers, luxuryProducts } from "@/data/products";
import { Footer } from "@/components/Footer";
import bg1 from '@assets/stock_images/modern_luxury_furnit_28c5223d.jpg';
import bg2 from '@assets/stock_images/modern_luxury_furnit_7b0844ce.jpg';
import bg3 from '@assets/stock_images/modern_luxury_furnit_9ce74e99.jpg';
import testimonial1 from '@assets/stock_images/professional_headsho_2c9b4b4e.jpg';
import testimonial2 from '@assets/stock_images/professional_headsho_cb073ce7.jpg';
import testimonial3 from '@assets/stock_images/professional_headsho_15da0e42.jpg';

const categories = [
  { id: 1, name: "Rocking Chair", icon: Armchair },
  { id: 2, name: "Side Table", icon: Table },
  { id: 3, name: "Accent Chair", icon: Sofa },
  { id: 4, name: "Ottoman", icon: Square },
  { id: 5, name: "Table Lamp", icon: Lightbulb },
  { id: 6, name: "Decorative Vase", icon: Flower },
  { id: 7, name: "Coffee Table", icon: Coffee },
];


export default function Home() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Number of categories to show at once
  const categoriesPerView = 6;
  
  const nextCategory = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentCategoryIndex((prev) => {
      const newIndex = prev + 1 >= categories.length ? 0 : prev + 1;
      setTimeout(() => setIsAnimating(false), 500); // Animation duration
      return newIndex;
    });
  };

  const prevCategory = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentCategoryIndex((prev) => {
      const newIndex = prev === 0 ? categories.length - 1 : prev - 1;
      setTimeout(() => setIsAnimating(false), 500); // Animation duration
      return newIndex;
    });
  };
  
  // Get all categories for smooth carousel display
  const getAllCategoriesForCarousel = () => {
    // Create a longer array for smooth infinite scroll
    const extendedCategories = [...categories, ...categories, ...categories];
    return extendedCategories;
  };

  // Countdown timer effect
  useEffect(() => {
    const targetDate = new Date('2025-09-22T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = () => {
    if (email) {
      console.log("Newsletter subscription:", email);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

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
          
          {/* Category Carousel */}
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Arrows - Positioned above the carousel */}
            <div className="flex justify-end mb-8 gap-4">
              <button 
                onClick={prevCategory}
                disabled={isAnimating}
                className={`w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta-dark transition-colors duration-200 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                data-testid="button-prev-category"
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextCategory}
                disabled={isAnimating}
                className={`w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta-dark transition-colors duration-200 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                data-testid="button-next-category"
                aria-label="Next categories"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(currentCategoryIndex % categories.length) * (100 / categoriesPerView)}%)`,
                  width: `${(getAllCategoriesForCarousel().length * 100) / categoriesPerView}%`
                }}
              >
                {getAllCategoriesForCarousel().map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div 
                      key={`${category.id}-${Math.floor(index / categories.length)}`}
                      className="text-center group cursor-pointer flex-shrink-0"
                      style={{ width: `${100 / getAllCategoriesForCarousel().length}%` }}
                      data-testid={`category-${category.id}-${index}`}
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cream-dark transition-colors duration-200">
                        <IconComponent className="text-terracotta text-2xl md:text-3xl w-8 h-8 md:w-12 md:h-12" />
                      </div>
                      <p className="text-foreground font-medium" data-testid={`category-name-${category.id}-${index}`}>
                        {category.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designing Luxury Hero Section */}
      <section className="py-16 lg:py-20 bg-[#582308] text-center">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Primary Headline - "Designing Luxury" */}
          <h1 
            className="text-white font-bold capitalize mb-1"
            style={{ 
              fontFamily: '"DM Serif Display", serif',
              fontSize: 'clamp(2.5rem, 6vw, 7rem)',
              lineHeight: '1.0'
            }}
          >
            Designing Luxury
          </h1>
          
          {/* Secondary Headline - "affordably" */}
          <h2 
            className="text-[#D58A5B] mb-8"
            style={{
              fontFamily: '"Dancing Script", cursive',
              fontSize: 'clamp(2.5rem, 6vw, 7rem)',
              lineHeight: '1.1',
              fontStyle: 'italic'
            }}
          >
            affordably
          </h2>
          
          {/* Supporting Text */}
          <div className="max-w-3xl mx-auto">
            <p 
              className="text-white font-bold leading-relaxed text-base md:text-lg lg:text-xl"
              style={{
                fontFamily: '"Playfair Display", serif'
              }}
            >
              Experience the perfect balance of sophistication and accessibility in our curated collection.
              <br />
              Where luxury meets affordability, creating timeless elegance for every home.
            </p>
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
                      <ProductCard 
                        key={product.id}
                        product={product}
                        variant="bestseller"
                        testIdPrefix="product"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Choice Section */}
      <section className="py-16 bg-gradient-to-br from-background to-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="border-2 border-terracotta rounded-2xl p-6 md:p-8 bg-gradient-to-r from-cream to-background shadow-xl">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Left Product Showcase - 70% */}
                <div className="lg:w-[70%] order-2 lg:order-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {luxuryProducts.map((product) => (
                      <div key={product.id} className="relative group cursor-pointer">
                        <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
                          <div className="aspect-square mb-3 overflow-hidden rounded-md">
                            <img 
                              src={product.image}
                              alt={product.alt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="text-xs bg-terracotta text-white px-2 py-1 rounded-full inline-block mb-2">
                            LUXURY
                          </div>
                          <h4 className="font-serif font-semibold text-sm mb-1">{product.name}</h4>
                          <p className="text-terracotta font-bold text-lg">{product.price}</p>
                          <Button size="sm" className="w-full mt-2 bg-terracotta hover:bg-terracotta-dark text-xs">
                            VIEW LUXURY PIECE
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right Content Area - 30% */}
                <div className="lg:w-[30%] space-y-4 order-1 lg:order-2">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-wider" data-testid="luxury-choice-title">
                    LUXURY CHOICE
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="luxury-choice-description">
                    Discover our exclusive luxury collection featuring handpicked pieces that embody sophistication and elegance. Each item represents the pinnacle of craftsmanship and design excellence.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                    data-testid="button-luxury-explore-more"
                  >
                    EXPLORE LUXURY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Flash Sale Section */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
              {/* Left Section - Flash Sale Container */}
              <div 
                className="w-full lg:w-[751px] min-h-[400px] lg:h-[474px] bg-[#FFEBCE] rounded-[30px] flex flex-col items-center justify-center p-6 lg:p-8 shadow-lg"
              >
                {/* Flash Sale Title */}
                <div className="text-center mb-4">
                  <span 
                    className="text-[#582308] font-bold"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                      fontFamily: 'serif',
                      lineHeight: '1.1'
                    }}
                  >
                    Flash
                  </span>{" "}
                  <span 
                    className="text-black font-bold"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                      fontFamily: 'serif',
                      lineHeight: '1.1'
                    }}
                  >
                    Sale
                  </span>
                </div>
                
                {/* Subtitle */}
                <p 
                  className="text-black text-center mb-6 px-4"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                    fontFamily: 'serif',
                    fontWeight: '600'
                  }}
                >
                  🎉 Get 25% off! Limited Time Offer! ⏰
                </p>
                
                {/* Countdown Timer */}
                <div className="flex items-center justify-center gap-2 lg:gap-4 mb-6">
                  <div className="text-center">
                    <div 
                      className="text-black font-bold bg-white rounded-lg px-2 py-1 shadow-sm"
                      style={{ 
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        minWidth: 'clamp(3rem, 6vw, 5rem)',
                        fontFamily: 'monospace'
                      }}
                    >
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-black text-xs lg:text-sm font-medium mt-1">Days</div>
                  </div>
                  <div className="text-black font-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>:</div>
                  <div className="text-center">
                    <div 
                      className="text-black font-bold bg-white rounded-lg px-2 py-1 shadow-sm"
                      style={{ 
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        minWidth: 'clamp(3rem, 6vw, 5rem)',
                        fontFamily: 'monospace'
                      }}
                    >
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-black text-xs lg:text-sm font-medium mt-1">Hours</div>
                  </div>
                  <div className="text-black font-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>:</div>
                  <div className="text-center">
                    <div 
                      className="text-black font-bold bg-white rounded-lg px-2 py-1 shadow-sm"
                      style={{ 
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        minWidth: 'clamp(3rem, 6vw, 5rem)',
                        fontFamily: 'monospace'
                      }}
                    >
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-black text-xs lg:text-sm font-medium mt-1">Minutes</div>
                  </div>
                  <div className="text-black font-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>:</div>
                  <div className="text-center">
                    <div 
                      className="text-black font-bold bg-white rounded-lg px-2 py-1 shadow-sm"
                      style={{ 
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        minWidth: 'clamp(3rem, 6vw, 5rem)',
                        fontFamily: 'monospace'
                      }}
                    >
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-black text-xs lg:text-sm font-medium mt-1">Seconds</div>
                  </div>
                </div>
                
                {/* CTA Button */}
                <Button 
                  className="bg-[#AF4C0F] hover:bg-[#8B3A0C] text-white font-bold px-6 lg:px-8 py-2 lg:py-3 rounded-full border-4 border-[#AF4C0F] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                >
                  🛍️ Explore Deal
                </Button>
              </div>
              
              {/* Right Section - Product Images */}
              <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 lg:gap-4 w-full lg:w-auto justify-center">
                {/* Product Image 1 */}
                <div className="relative w-full max-w-[140px] lg:w-[168px] h-[400px] lg:h-[474px] rounded-[20px] lg:rounded-[30px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
                    alt="Modern chair"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-[5px] lg:inset-[7px] border-3 lg:border-4 border-[#FFEBCE] rounded-[20px] lg:rounded-[30px] pointer-events-none"></div>
                </div>
                
                {/* Product Image 2 */}
                <div className="relative w-full max-w-[140px] lg:w-[168px] h-[400px] lg:h-[474px] rounded-[20px] lg:rounded-[30px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
                    alt="Accent chair"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-[5px] lg:inset-[7px] border-3 lg:border-4 border-[#FFEBCE] rounded-[20px] lg:rounded-[30px] pointer-events-none"></div>
                </div>
                
                {/* Product Image 3 */}
                <div className="relative w-full max-w-[140px] lg:w-[168px] h-[400px] lg:h-[474px] rounded-[20px] lg:rounded-[30px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
                    alt="Papasan chair"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-[5px] lg:inset-[7px] border-3 lg:border-4 border-[#FFEBCE] rounded-[20px] lg:rounded-[30px] pointer-events-none"></div>
                </div>
                
                {/* Product Image 4 */}
                <div className="relative w-full max-w-[140px] lg:w-[168px] h-[400px] lg:h-[474px] rounded-[20px] lg:rounded-[30px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
                    alt="Modern sofa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-[5px] lg:inset-[7px] border-3 lg:border-4 border-[#FFEBCE] rounded-[20px] lg:rounded-[30px] pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Collection Section with Interactive Tabs */}
      <PremiumTabs />

      {/* Service Features Bar */}
      <div>
        <ServiceFeaturesBar />
      </div>

      {/* Testimonials Section */}
      <section className="relative overflow-hidden bg-white">
        {/* Animated Background */}
        <div className="absolute inset-0 z-[1]">
          {/* Row 1 */}
          <div className="absolute top-16 w-full testimonial-marquee-row-1">
            <div className="flex whitespace-nowrap">
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.31 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.31 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="absolute top-32 w-full testimonial-marquee-row-2">
            <div className="flex whitespace-nowrap">
              <span className="testimonial-text" style={{ opacity: 0.31 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.31 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="absolute top-48 w-full testimonial-marquee-row-3">
            <div className="flex whitespace-nowrap">
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.11 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.11 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
            </div>
          </div>
          
          {/* Row 4 */}
          <div className="absolute top-64 w-full testimonial-marquee-row-4">
            <div className="flex whitespace-nowrap">
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.13 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.13 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.13 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.13 }}>· Testimonials ·</span>
            </div>
          </div>
          
          {/* Row 5 */}
          <div className="absolute top-80 w-full testimonial-marquee-row-5">
            <div className="flex whitespace-nowrap">
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
              <span className="testimonial-text" style={{ opacity: 0.07 }}>· Testimonials ·</span>
            </div>
          </div>
        </div>

        {/* Foreground Testimonial Cards */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Testimonial Card 1 */}
            <div className="testimonial-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-4">
                <img 
                  src={testimonial1} 
                  alt="Sarah Johnson" 
                  className="testimonial-avatar w-16 h-16 rounded-full object-cover border-3 border-white shadow-md mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-semibold text-[#582308] mb-1">Sarah Johnson</h4>
                  <div className="flex items-center mb-2">
                    <div className="flex text-[#DBA352]">
                      <span>★★★★★</span>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">5.0</span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-700 leading-relaxed text-sm">
                "Absolutely love my new dining set from SM Furnishings! The quality is exceptional and the design perfectly complements my home. The delivery was prompt and the customer service was outstanding."
              </p>
            </div>

            {/* Testimonial Card 2 */}
            <div className="testimonial-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-4">
                <img 
                  src={testimonial2} 
                  alt="Michael Chen" 
                  className="testimonial-avatar w-16 h-16 rounded-full object-cover border-3 border-white shadow-md mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-semibold text-[#582308] mb-1">Michael Chen</h4>
                  <div className="flex items-center mb-2">
                    <div className="flex text-[#DBA352]">
                      <span>★★★★☆</span>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">4.5</span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-700 leading-relaxed text-sm">
                "Great furniture at reasonable prices. I purchased a living room set and couldn't be happier. The pieces are well-made and stylish. Highly recommend SM Furnishings for quality home furniture."
              </p>
            </div>

            {/* Testimonial Card 3 */}
            <div className="testimonial-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-4">
                <img 
                  src={testimonial3} 
                  alt="Emily Rodriguez" 
                  className="testimonial-avatar w-16 h-16 rounded-full object-cover border-3 border-white shadow-md mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-semibold text-[#582308] mb-1">Emily Rodriguez</h4>
                  <div className="flex items-center mb-2">
                    <div className="flex text-[#DBA352]">
                      <span>★★★★★</span>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">5.0</span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200 mb-4" />
              <p className="text-gray-700 leading-relaxed text-sm">
                "SM Furnishings transformed my bedroom with their beautiful furniture collection. The attention to detail and craftsmanship is remarkable. Their 24/7 support made the entire experience seamless."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
        className="relative w-full py-12 md:py-16 min-h-[320px] md:min-h-[380px] lg:min-h-[420px] overflow-hidden"
        style={{
          backgroundImage: `url(${bg1}), url(${bg2}), url(${bg3})`,
          backgroundSize: 'cover, cover, cover',
          backgroundPosition: 'center center, left center, right center',
          backgroundBlendMode: 'multiply, normal, overlay'
        }}
      >
        {/* Terracotta Overlay */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(219, 163, 82, 0.64)' }}
        ></div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full">
          <div className="container mx-auto max-w-5xl px-6 flex flex-col justify-center items-center text-center gap-4">
            {/* Main Heading */}
            <h1 
              className="text-white mb-2"
              style={{
                fontFamily: 'Prata, serif',
                fontSize: 'clamp(28px, 5vw, 54px)',
                lineHeight: '1.1',
                letterSpacing: '-0.5px'
              }}
              data-testid="newsletter-title"
            >
              LET'S STAY IN TOUCH
            </h1>
            
            {/* Subheading */}
            <h2 
              className="text-white mb-2"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '24px',
                fontWeight: '500'
              }}
            >
              Subscribe
            </h2>
            
            {/* Description Text */}
            <p 
              className="text-white mb-4"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '20px',
                fontWeight: '600',
                maxWidth: '600px',
                lineHeight: '1.5'
              }}
              data-testid="newsletter-description"
            >
              To our newsletter to receive the latest product drops and coupons
            </p>
            
            {/* Email Input Section */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }}
              className="w-full max-w-xl flex flex-row items-center gap-3 justify-center" 
              data-testid="form-newsletter"
            >
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                aria-label="Email" 
                className="bg-white/90 text-foreground placeholder-muted-foreground h-12 px-4 rounded-md flex-1" 
                data-testid="input-newsletter-email" 
              />
              <Button 
                type="submit" 
                onClick={handleSubscribe} 
                className="bg-terracotta hover:bg-terracotta-dark text-white h-14 px-8 text-lg rounded-md shrink-0" 
                data-testid="button-subscribe-newsletter"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
