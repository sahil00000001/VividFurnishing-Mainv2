import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Armchair, Table, Sofa, Square, Lightbulb, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { PremiumTabs } from "@/components/PremiumTabs";
import { ServiceFeaturesBar } from "@/components/ServiceFeaturesBar";
import { bestSellers, luxuryProducts } from "@/data/products";
import { Footer } from "@/components/Footer";

const categories = [
  { id: 1, name: "Rocking Chair", icon: Armchair },
  { id: 2, name: "Side Table", icon: Table },
  { id: 3, name: "Accent Chair", icon: Sofa },
  { id: 4, name: "Ottoman", icon: Square },
  { id: 5, name: "Table Lamp", icon: Lightbulb },
  { id: 6, name: "Decorative Vase", icon: Flower },
];


export default function Home() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [email, setEmail] = useState("");
  
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
    setCurrentCategoryIndex((prev) => 
      prev + categoriesPerView >= categories.length ? 0 : prev + 1
    );
  };

  const prevCategory = () => {
    setCurrentCategoryIndex((prev) => 
      prev === 0 ? Math.max(0, categories.length - categoriesPerView) : prev - 1
    );
  };
  
  // Get visible categories based on current index
  const getVisibleCategories = () => {
    const visible = [];
    for (let i = 0; i < categoriesPerView; i++) {
      const index = (currentCategoryIndex + i) % categories.length;
      visible.push(categories[index]);
    }
    return visible;
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
          
          {/* Category Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
              {getVisibleCategories().map((category) => {
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
            
            {/* Navigation Arrows - Both positioned on right side top */}
            <div className="absolute right-0 -top-16 flex gap-4">
              <button 
                onClick={prevCategory}
                className="w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta-dark transition-colors duration-200"
                data-testid="button-prev-category"
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextCategory}
                className="w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta-dark transition-colors duration-200"
                data-testid="button-next-category"
                aria-label="Next categories"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
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
      <section className="py-12 bg-background">
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
      <section className="py-8 bg-gradient-to-br from-background to-cream">
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
      <section className="py-12 lg:py-16 bg-background">
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
      <ServiceFeaturesBar />

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
      <Footer />
    </div>
  );
}
