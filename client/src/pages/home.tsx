import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Armchair, Table, Sofa, Square, Lightbulb, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { PremiumTabs } from "@/components/PremiumTabs";
import { ServiceFeaturesBar } from "@/components/ServiceFeaturesBar";
import { bestSellers, luxuryProducts } from "@/data/products";
import { Footer } from "@/components/Footer";
import newsletterBgImage from "@assets/Group 48_1758371284588.png";
import heroBgImage from "@assets/delicious-breakfast-bed-concept_1758535580577.jpg";
import bulkOrderImage from "@assets/minimal-linen-cushion-covers-sofa_1758535928415.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitBulkOrder, submitNewsletter } from "@/lib/api";

const categories = [
  { id: 1, name: "Rocking Chair", icon: Armchair },
  { id: 2, name: "Side Table", icon: Table },
  { id: 3, name: "Accent Chair", icon: Sofa },
  { id: 4, name: "Ottoman", icon: Square },
  { id: 5, name: "Table Lamp", icon: Lightbulb },
  { id: 6, name: "Decorative Vase", icon: Flower },
];

// Bulk Order Form Schema
const bulkOrderSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters").max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[\+]?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  orderDescription: z.string().min(10, "Please provide at least 10 characters describing your order").max(500, "Description must be less than 500 characters")
});


export default function Home() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Bulk Order Form with react-hook-form and zod
  const bulkOrderForm = useForm<z.infer<typeof bulkOrderSchema>>({
    resolver: zodResolver(bulkOrderSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      orderDescription: ""
    }
  });
  
  // Loading states
  const [isBulkOrderSubmitting, setIsBulkOrderSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  
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

  const handleSubscribe = async () => {
    if (email && !isNewsletterSubmitting) {
      setIsNewsletterSubmitting(true);
      try {
        const result = await submitNewsletter({ email });
        if (result.success) {
          toast({
            title: "Success!",
            description: result.message,
          });
          setEmail("");
        } else {
          toast({
            title: "Subscription failed",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Subscription failed",
          description: "Please try again later or contact support if the problem persists.",
          variant: "destructive",
        });
      } finally {
        setIsNewsletterSubmitting(false);
      }
    }
  };

  const handleBulkOrderSubmit = async (values: z.infer<typeof bulkOrderSchema>) => {
    setIsBulkOrderSubmitting(true);
    try {
      await submitBulkOrder(values);
      toast({
        title: "Thank you for your inquiry!",
        description: "We'll get back to you within 24 hours regarding your bulk order.",
      });
      bulkOrderForm.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later or contact support if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setIsBulkOrderSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBgImage})`
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #582308 -3.91%, rgba(175, 76, 15, 0.7) 11.73%, rgba(169, 142, 128, 0.708654) 41.34%, rgba(255, 255, 255, 0) 100%)'
            }}
          ></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-wide" style={{ fontFamily: '"Prata", serif' }} data-testid="hero-headline">
            AFFORDABLE LUXURY
          </h2>
          <p className="text-xl md:text-2xl font-light mb-8 tracking-wider" data-testid="hero-subheading">
            Where Comfort Meets Elegance
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setLocation('/shop')}
            style={{
              background: 'rgba(255, 255, 255, 0.47)',
              border: '9px solid #FFFFFF'
            }}
            className="text-terracotta font-semibold px-8 py-4 text-lg tracking-wide hover:bg-white hover:text-terracotta-dark transition-all duration-300"
            data-testid="button-explore-collection"
          >
            Explore Collection
          </Button>
        </div>
      </section>


      {/* Designing Luxury Hero Section */}
      <section 
        className="py-16 lg:py-20 text-center"
        style={{
          backgroundColor: '#582308'
        }}
      >
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
              fontStyle: 'italic',
              marginTop: '-1rem'
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
              We bring you timeless designs rooted in heritage yet styled for modern living. Every collection is crafted with care, ensuring your home reflects luxury — without the heavy price tag. We weave stories of love, comfort, and elegance into every piece, making your space truly yours.
            </p>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="pt-20 pb-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div 
              style={{
                border: '2px solid #582308',
                borderRadius: '20px',
                width: '1485px',
                maxWidth: '100%'
              }}
              className="px-8 md:px-12 py-4 md:py-6"
            >
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Left Content Area - 30% */}
                <div className="lg:w-[30%] space-y-6">
                  <h3 
                    className="text-3xl md:text-4xl font-bold text-foreground" 
                    style={{ fontFamily: '"Playfair Display", serif' }}
                    data-testid="bestsellers-title"
                  >
                    BEST SELLERS
                  </h3>
                  <p 
                    className="text-muted-foreground leading-relaxed" 
                    style={{ fontFamily: '"Playfair Display", serif' }}
                    data-testid="bestsellers-description"
                  >
                    Discover the pieces our customers can't get enough of. These bestselling designs combine comfort, elegance, and everyday luxury.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/shop')}
                    style={{
                      width: '198px',
                      height: '72px',
                      background: 'rgba(255, 255, 255, 0.47)',
                      border: '9px solid #FFD0B3',
                      borderRadius: '14px',
                      boxSizing: 'border-box'
                    }}
                    className="text-terracotta font-semibold"
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
                        showAddToCart={false}
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div 
              style={{
                border: '2px solid #582308',
                borderRadius: '20px',
                width: '1485px',
                maxWidth: '100%'
              }}
              className="px-8 md:px-12 py-4 md:py-6 bg-white shadow-xl"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Left Product Showcase - 70% */}
                <div className="lg:w-[70%] order-2 lg:order-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {luxuryProducts.map((product) => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        variant="luxury"
                        testIdPrefix="luxury-product"
                        showAddToCart={false}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Right Content Area - 30% */}
                <div className="lg:w-[30%] space-y-4 order-1 lg:order-2">
                  <h3 
                    className="text-3xl md:text-4xl font-bold text-foreground tracking-wider" 
                    style={{ fontFamily: '"Playfair Display", serif' }}
                    data-testid="luxury-choice-title"
                  >
                    LUXURY CHOICE
                  </h3>
                  <p 
                    className="text-muted-foreground leading-relaxed" 
                    style={{ fontFamily: '"Playfair Display", serif' }}
                    data-testid="luxury-choice-description"
                  >
                    Handpicked selections that embody luxury and sophistication, thoughtfully crafted to bring warmth and style to your home.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/shop')}
                    style={{
                      width: '198px',
                      height: '72px',
                      background: 'rgba(255, 255, 255, 0.47)',
                      border: '9px solid #FFD0B3',
                      borderRadius: '14px',
                      boxSizing: 'border-box'
                    }}
                    className="text-terracotta font-semibold"
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



      {/* Premium Collection Section with Interactive Tabs - Temporarily Hidden */}
      {/* <PremiumTabs /> */}

      {/* Service Features Bar */}
      <ServiceFeaturesBar />


      {/* Newsletter Section */}
      <section 
        className="relative w-full overflow-hidden"
        style={{ 
          minHeight: 'clamp(28rem, 55vh, 42rem)',
          height: 'clamp(28rem, 55vh, 42rem)'
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${newsletterBgImage})`
            }}
          />
          {/* Custom background overlay for LET'S STAY IN TOUCH */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'rgba(219, 163, 82, 0.64)'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          {/* Main Heading */}
          <h1 
            className="text-white text-center mb-8 font-normal capitalize"
            style={{
              fontFamily: "'Prata', serif",
              fontSize: 'clamp(0.75rem, 5.5vw, 10rem)',
              lineHeight: 'clamp(2rem, 7vw, 8.25rem)',
              letterSpacing: '1px'
            }}
          >
            LET'S STAY IN TOUCH
          </h1>

          {/* Subheading */}
          <h2 
            className="text-white text-center mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}
          >
            Subscribe
          </h2>

          {/* Description */}
          <p 
            className="text-white text-center mb-4 capitalize"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
              fontWeight: '700',
              letterSpacing: '0.25px',
              maxWidth: '480px'
            }}
          >
            To our newsletter to receive the latest product drops and coupons
          </p>

          {/* Email Input Section */}
          <div className="flex flex-col items-center space-y-6">
            {/* Email Input and Submit Button Row */}
            <div className="flex flex-col items-end space-y-4 w-full max-w-5xl">
              {/* Email Input and Subscribe Button Row - positioned to right */}
              <div className="flex items-center space-x-6 mr-8" style={{ width: '80vw', maxWidth: '1000px' }}>
                {/* Email Input */}
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your Email ......."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-white placeholder-white/80 border-none outline-none text-center pb-2"
                    style={{
                      fontFamily: "'Anonymous Pro', monospace",
                      fontSize: '16px',
                      fontWeight: '700',
                      width: 'clamp(300px, 50vw, 500px)',
                      borderBottom: '2px solid white',
                      paddingBottom: '4px'
                    }}
                    data-testid="input-newsletter-email"
                  />
                </div>

                {/* Subscribe Button */}
                <button 
                  onClick={handleSubscribe}
                  disabled={isNewsletterSubmitting || !email.trim()}
                  className="text-white hover:text-white/80 transition-colors duration-300 group flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "'Anonymous Pro', monospace",
                    fontSize: '20px',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}
                  data-testid="button-subscribe-newsletter"
                >
                  <span>{isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order in Bulk Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-6 mt-2 ml-8">
            <h2 
              className="mb-4"
              style={{
                fontFamily: "'Prata', serif",
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                color: '#2C1810',
                fontWeight: 'normal'
              }}
            >
              Order In Bulk?
            </h2>
            <p 
              className="text-lg"
              style={{
                color: '#666666',
                fontSize: '18px',
                fontWeight: '400'
              }}
            >
              Fill the form below to get in touch for bulk orders
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-center justify-center">
            {/* Left Side - Contact Form */}
            <div className="order-2 lg:order-1">
              <div 
                className="p-6 rounded-3xl shadow-lg"
                style={{
                  backgroundColor: '#F5E6D3',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <Form {...bulkOrderForm}>
                  <form onSubmit={bulkOrderForm.handleSubmit(handleBulkOrderSubmit)} className="space-y-6">
                    {/* Full Name Field */}
                    <FormField
                      control={bulkOrderForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel 
                            className="block uppercase tracking-wider text-xs font-semibold"
                            style={{ color: '#2C1810', letterSpacing: '1px' }}
                          >
                            FULL NAME
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              className="w-full h-10 px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                              style={{ 
                                fontSize: '16px',
                                color: '#2C1810'
                              }}
                              data-testid="input-bulk-fullname"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={bulkOrderForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel 
                            className="block uppercase tracking-wider text-xs font-semibold"
                            style={{ color: '#2C1810', letterSpacing: '1px' }}
                          >
                            EMAIL
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="yourname@example.com"
                              {...field}
                              className="w-full h-10 px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                              style={{ 
                                fontSize: '16px',
                                color: '#2C1810'
                              }}
                              data-testid="input-bulk-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Number Field */}
                    <FormField
                      control={bulkOrderForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel 
                            className="block uppercase tracking-wider text-xs font-semibold"
                            style={{ color: '#2C1810', letterSpacing: '1px' }}
                          >
                            PHONE NUMBER
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+91 98765 43210"
                              {...field}
                              className="w-full h-10 px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                              style={{ 
                                fontSize: '16px',
                                color: '#2C1810'
                              }}
                              data-testid="input-bulk-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Order Description Field */}
                    <FormField
                      control={bulkOrderForm.control}
                      name="orderDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel 
                            className="block uppercase tracking-wider text-xs font-semibold"
                            style={{ color: '#2C1810', letterSpacing: '1px' }}
                          >
                            ORDER DESCRIPTION
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Explain your order and requirements here..."
                              {...field}
                              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:border-orange-600 focus:outline-none transition-colors duration-300 resize-y min-h-[100px] focus-visible:ring-0 focus-visible:ring-offset-0"
                              style={{ 
                                fontSize: '16px',
                                color: '#2C1810'
                              }}
                              data-testid="textarea-bulk-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isBulkOrderSubmitting}
                      className="w-full h-10 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #AF4C0F 0%, #D85A1F 100%)',
                        letterSpacing: '0.5px'
                      }}
                      data-testid="button-bulk-submit"
                    >
                      {isBulkOrderSubmitting ? 'Sending...' : 'Get In Touch'}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Right Side - Curved Rectangle Figure */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative lg:w-[450px] lg:h-[580px]" data-testid="bulk-figure">
                {/* Main Image Container - Only top-left curved */}
                <div 
                  className="absolute left-0 top-0 w-[420px] h-[540px] overflow-hidden shadow-[4px_15px_27.1px_7px_rgba(0,0,0,0.25)]"
                  style={{
                    borderRadius: '210px 0 0 0'
                  }}
                  data-testid="bulk-figure-image"
                >
                  {/* Furniture Image */}
                  <img
                    src={bulkOrderImage}
                    alt="Minimal linen cushion covers on sofa"
                    className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Border Frame */}
                <div 
                  className="pointer-events-none absolute left-[33px] top-[38px] w-[412px] h-[540px] border-[8px] border-[#AF4C0F]"
                  style={{
                    borderRadius: '210px 0 0 0'
                  }}
                  data-testid="bulk-figure-border"
                />

                {/* Bottom Straight Bar */}
                <div 
                  className="absolute left-[117px] top-[505px] w-[320px] h-[75px] bg-[#582308] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                  data-testid="bulk-figure-bar"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
