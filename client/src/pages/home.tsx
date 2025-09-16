import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Armchair, Table, Sofa, Square, Lightbulb, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { PremiumTabs } from "@/components/PremiumTabs";
import { ServiceFeaturesBar } from "@/components/ServiceFeaturesBar";
import { bestSellers, luxuryProducts, collections } from "@/data/products";
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
            
            {/* Navigation Arrows - Both positioned on right side top */}
            <div className="absolute right-0 -top-16 flex gap-4">
              <button 
                onClick={prevCategory}
                className="w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta-dark transition-colors duration-200"
                data-testid="button-prev-category"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextCategory}
                className="w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta-dark transition-colors duration-200"
                data-testid="button-next-category"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
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
      <section className="py-12 bg-gradient-to-br from-background to-cream">
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
