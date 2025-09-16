import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/products";

export default function Blog() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6" data-testid="blog-hero-title">
            Our Blog
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed" data-testid="blog-hero-subtitle">
            Insights into luxury furniture and timeless design
          </p>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}