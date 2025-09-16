import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Globe, 
  Award, 
  Leaf, 
  Star, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Target,
  Eye,
  Zap,
  Shield,
  Recycle,
  TreePine,
  CheckCircle
} from "lucide-react";

const timelineData = [
  {
    year: "2010",
    title: "Founded",
    description: "Started with a vision to make luxury furniture accessible to everyone",
    side: "left"
  },
  {
    year: "2015",
    title: "First Showroom",
    description: "Opened our flagship store in the heart of the design district",
    side: "right"
  },
  {
    year: "2018",
    title: "Online Expansion", 
    description: "Launched our e-commerce platform, reaching customers nationwide",
    side: "left"
  },
  {
    year: "2020",
    title: "Sustainability Focus",
    description: "Committed to eco-friendly materials and sustainable practices",
    side: "right"
  },
  {
    year: "2024",
    title: "1M+ Happy Customers",
    description: "Celebrating over a million satisfied customers worldwide",
    side: "left"
  }
];

const teamMembers = [
  {
    id: 1,
    name: "Sarah Martinez",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    bio: "With 15+ years in furniture design, Sarah leads SM Furnishings with passion for accessible luxury and sustainable practices."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    bio: "Award-winning designer who brings contemporary elegance to every piece, ensuring our furniture meets the highest aesthetic standards."
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Sustainability Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    bio: "Environmental advocate leading our green initiatives, making sure every piece is responsibly sourced and environmentally conscious."
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Customer Experience Lead",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    bio: "Dedicated to ensuring every customer has an exceptional experience from browsing to delivery and beyond."
  }
];

const testimonials = [
  {
    id: 1,
    name: "Jennifer Adams",
    text: "SM Furnishings transformed my living room into a luxurious haven without breaking the bank. The quality is exceptional!",
    rating: 5
  },
  {
    id: 2,
    name: "Robert Kim",
    text: "Outstanding customer service and beautiful furniture. Every piece arrived perfectly and the quality exceeded my expectations.",
    rating: 5
  },
  {
    id: 3,
    name: "Maria Santos",
    text: "I love how sustainable their practices are. Beautiful furniture that's also environmentally responsible - perfect!",
    rating: 5
  }
];

const uspPoints = [
  "Handpicked by interior design experts",
  "Sustainable materials and ethical sourcing",
  "30-day satisfaction guarantee",
  "White-glove delivery service",
  "Lifetime customer support"
];

const awards = [
  { name: "Best Furniture Retailer 2024", icon: Award },
  { name: "Sustainability Excellence", icon: Leaf },
  { name: "Customer Choice Award", icon: Star }
];

export default function About() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [counters, setCounters] = useState({ customers: 0, products: 0, satisfaction: 0 });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate counters when section becomes visible
  useEffect(() => {
    if (visibleSections.has('testimonials')) {
      const animateCounter = (target: number, setter: (value: number) => void) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setter(target);
            clearInterval(timer);
          } else {
            setter(Math.floor(current));
          }
        }, 50);
      };

      animateCounter(1000000, (value) => setCounters(prev => ({ ...prev, customers: value })));
      animateCounter(5000, (value) => setCounters(prev => ({ ...prev, products: value })));
      animateCounter(98, (value) => setCounters(prev => ({ ...prev, satisfaction: value })));
    }
  }, [visibleSections]);

  const toggleCardFlip = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Intersection Observer effect for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wide animate-fade-in-up">
            OUR <span className="text-cream italic font-script">story</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 tracking-wider animate-fade-in-up animation-delay-300">
            Crafting beautiful homes, one piece at a time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Button 
              size="lg"
              className="bg-terracotta text-white px-8 py-4 text-lg tracking-wide hover:bg-terracotta-dark transition-all duration-300 hover:scale-105"
            >
              Join Our Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white bg-transparent text-white font-semibold px-8 py-4 text-lg tracking-wide hover:bg-white hover:text-terracotta transition-all duration-300"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section id="timeline" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-terracotta">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From a small dream to a furniture revolution - discover the milestones that shaped SM Furnishings
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-terracotta opacity-30"></div>
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 bg-terracotta transition-all duration-2000 ${
                visibleSections.has('timeline') ? 'h-full' : 'h-0'
              }`}
            ></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {timelineData.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center ${item.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${item.side === 'left' ? 'pr-8' : 'pl-8'}`}>
                    <div 
                      className={`transform transition-all duration-700 ${
                        visibleSections.has('timeline') 
                          ? 'translate-x-0 opacity-100' 
                          : item.side === 'left' ? '-translate-x-10 opacity-0' : 'translate-x-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-0">
                          <div className="text-terracotta font-bold text-2xl mb-2">{item.year}</div>
                          <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div 
                      className={`w-4 h-4 bg-terracotta rounded-full border-4 border-background transform transition-all duration-500 ${
                        visibleSections.has('timeline') ? 'scale-100' : 'scale-0'
                      }`}
                      style={{ transitionDelay: `${index * 200 + 100}ms` }}
                    ></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section id="values" className="py-20 bg-gradient-to-br from-cream to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-terracotta">Foundation</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div 
              className={`text-center transform transition-all duration-700 ${
                visibleSections.has('values') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="bg-terracotta text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To democratize luxury furniture by making high-quality, beautifully designed pieces accessible to every home, regardless of budget.
              </p>
            </div>

            <div 
              className={`text-center transform transition-all duration-700 ${
                visibleSections.has('values') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-terracotta text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's leading sustainable furniture brand, inspiring homes and protecting our planet for future generations.
              </p>
            </div>

            <div 
              className={`text-center transform transition-all duration-700 ${
                visibleSections.has('values') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="bg-terracotta text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quality, sustainability, accessibility, and exceptional customer experience guide every decision we make and every piece we create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section id="team" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet Our <span className="text-terracotta">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind SM Furnishings' success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className={`transform transition-all duration-700 ${
                  visibleSections.has('team') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div 
                  className="relative w-full h-80 cursor-pointer group"
                  onClick={() => toggleCardFlip(member.id)}
                >
                  <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    flippedCards.has(member.id) ? 'rotate-y-180' : ''
                  }`}>
                    {/* Front of card */}
                    <Card className="absolute inset-0 backface-hidden group-hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden rounded-t-lg">
                          <img 
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6 text-center">
                          <h3 className="font-serif text-xl font-bold mb-2">{member.name}</h3>
                          <p className="text-terracotta font-medium">{member.role}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Back of card */}
                    <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-terracotta text-white">
                      <CardContent className="p-6 flex flex-col justify-center h-full">
                        <h3 className="font-serif text-xl font-bold mb-4 text-center">{member.name}</h3>
                        <p className="text-center leading-relaxed">{member.bio}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section id="usp" className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div 
              className={`transform transition-all duration-700 ${
                visibleSections.has('usp') ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Our Difference"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
            
            <div 
              className={`space-y-8 transform transition-all duration-700 ${
                visibleSections.has('usp') ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                  What Makes Us <span className="text-terracotta">Different</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Experience the SM Furnishings advantage
                </p>
              </div>

              <div className="space-y-4">
                {uspPoints.map((point, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 transform transition-all duration-500 ${
                      visibleSections.has('usp') ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <CheckCircle className="w-6 h-6 text-terracotta flex-shrink-0" />
                    <span className="text-lg">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                {awards.map((award, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className={`px-4 py-2 bg-terracotta text-white hover:bg-terracotta-dark transition-all duration-300 transform ${
                      visibleSections.has('usp') ? 'scale-100' : 'scale-0'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 600}ms` }}
                  >
                    <award.icon className="w-4 h-4 mr-2" />
                    {award.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Love & Testimonials */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Customer <span className="text-terracotta">Love</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers say about their SM Furnishings experience
            </p>
          </div>

          {/* Stats Counter */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-terracotta mb-2">
                {counters.customers.toLocaleString()}+
              </div>
              <div className="text-xl text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-terracotta mb-2">
                {counters.products.toLocaleString()}+
              </div>
              <div className="text-xl text-muted-foreground">Products Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-terracotta mb-2">
                {counters.satisfaction}%
              </div>
              <div className="text-xl text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-lg bg-cream p-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`transition-all duration-700 ${
                    index === currentTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-full'
                  }`}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl text-foreground mb-6 italic">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="font-semibold text-terracotta text-lg">
                      {testimonial.name}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentTestimonial ? 'bg-terracotta' : 'bg-terracotta/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-20 bg-gradient-to-br from-green-50 to-cream relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute inset-0">
          <Leaf className="absolute top-20 left-10 w-8 h-8 text-green-300 opacity-50 animate-float" />
          <TreePine className="absolute top-40 right-20 w-6 h-6 text-green-400 opacity-40 animate-float-delayed" />
          <Globe className="absolute bottom-20 left-20 w-10 h-10 text-green-200 opacity-30 animate-float" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sustainability & <span className="text-green-600">Responsibility</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to the planet and future generations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div 
              className={`text-center transform transition-all duration-700 ${
                visibleSections.has('sustainability') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Eco Materials</h3>
              <p className="text-muted-foreground leading-relaxed">
                We source only sustainable, certified materials that minimize environmental impact while maintaining exceptional quality and durability.
              </p>
            </div>

            <div 
              className={`text-center transform transition-all duration-700 ${
                visibleSections.has('sustainability') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Recycle className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Recyclable Packaging</h3>
              <p className="text-muted-foreground leading-relaxed">
                100% recyclable and biodegradable packaging materials ensure your furniture arrives safely while protecting our environment.
              </p>
            </div>

            <div 
              className={`text-center transform transition-all duration-700 ${
                visibleSections.has('sustainability') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Community Work</h3>
              <p className="text-muted-foreground leading-relaxed">
                We partner with local communities and artisans, supporting fair trade practices and giving back through furniture donation programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Recognition */}
      <section id="recognition" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trust & <span className="text-terracotta">Recognition</span>
            </h2>
          </div>

          {/* Press Logos */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <div className="text-2xl font-bold text-muted-foreground">Featured in:</div>
              <div className="text-xl font-semibold text-muted-foreground hover:text-terracotta transition-colors duration-300 cursor-pointer">
                Design Weekly
              </div>
              <div className="text-xl font-semibold text-muted-foreground hover:text-terracotta transition-colors duration-300 cursor-pointer">
                Home & Living
              </div>
              <div className="text-xl font-semibold text-muted-foreground hover:text-terracotta transition-colors duration-300 cursor-pointer">
                Furniture Today
              </div>
              <div className="text-xl font-semibold text-muted-foreground hover:text-terracotta transition-colors duration-300 cursor-pointer">
                Interior Design
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <Card 
                key={index}
                className={`p-6 text-center hover:shadow-lg transition-all duration-300 transform ${
                  visibleSections.has('recognition') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <award.icon className="w-12 h-12 text-terracotta mx-auto mb-4" />
                  <h3 className="font-semibold text-lg">{award.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-terracotta text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Be Part of Our <span className="font-script italic">Journey</span>
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their homes with SM Furnishings
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Careers</h3>
                <p className="mb-6">Join our passionate team and help shape the future of furniture</p>
                <Button className="bg-white text-terracotta hover:bg-cream hover:text-terracotta-dark font-semibold">
                  View Openings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Globe className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Collaborations</h3>
                <p className="mb-6">Partner with us for exciting projects and mutual growth</p>
                <Button className="bg-white text-terracotta hover:bg-cream hover:text-terracotta-dark font-semibold">
                  Get in Touch
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                <p className="mb-6">Stay updated with our latest collections and exclusive offers</p>
                <Button className="bg-white text-terracotta hover:bg-cream hover:text-terracotta-dark font-semibold">
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fun & Interactive Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Behind the <span className="text-terracotta">Scenes</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1556909918-f9ae5ba9a9de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                    alt="Behind the scenes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg"
                      className="bg-white/90 text-terracotta hover:bg-white rounded-full w-16 h-16 p-0 hover:scale-110 transition-transform duration-300"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="font-serif text-3xl font-bold">Our Craftsmanship Process</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Get an exclusive look at how our expert artisans craft each piece with meticulous attention to detail, 
                  from selecting the finest materials to the final quality check.
                </p>
                <Button className="bg-terracotta text-white hover:bg-terracotta-dark">
                  Watch Full Documentary
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Did You Know Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  front: "Did You Know?", 
                  back: "Each piece goes through 47 quality checks before reaching your home",
                  icon: Shield
                },
                { 
                  front: "Fun Fact!", 
                  back: "We've planted over 10,000 trees to offset our carbon footprint",
                  icon: TreePine
                },
                { 
                  front: "Amazing!", 
                  back: "Our fastest delivery was completed in just 2 hours across the city",
                  icon: Zap
                }
              ].map((card, index) => (
                <div 
                  key={index}
                  className="relative h-48 cursor-pointer group"
                  onClick={() => toggleCardFlip(index + 100)}
                >
                  <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    flippedCards.has(index + 100) ? 'rotate-y-180' : ''
                  }`}>
                    {/* Front */}
                    <Card className="absolute inset-0 backface-hidden bg-terracotta text-white group-hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                        <card.icon className="w-12 h-12 mb-4" />
                        <h3 className="text-xl font-bold">{card.front}</h3>
                      </CardContent>
                    </Card>

                    {/* Back */}
                    <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-cream border-terracotta border-2">
                      <CardContent className="p-6 flex items-center justify-center h-full">
                        <p className="text-center text-lg font-medium">{card.back}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}