import { Star } from "lucide-react";

interface TestimonialData {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
}

const testimonialsData: TestimonialData[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "Absolutely stunning furniture! The quality exceeded my expectations and the customer service was exceptional. My living room has been completely transformed."
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "I've been searching for affordable luxury furniture for months. SM Furnishings delivered exactly what I was looking for - beautiful pieces at great prices."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4,
    text: "The craftsmanship is remarkable and the delivery was prompt. Every piece feels premium and matches perfectly with my home's aesthetic."
  },
  {
    id: 4,
    name: "David Park",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "Outstanding experience from start to finish. The furniture arrived in perfect condition and looks even better than the photos online."
  },
  {
    id: 5,
    name: "Lisa Thompson",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "I ordered multiple pieces for my new apartment and couldn't be happier. The quality-to-price ratio is unmatched in the market."
  },
  {
    id: 6,
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4,
    text: "Fantastic customer service and beautiful furniture. The team helped me choose pieces that perfectly complement my home's design theme."
  }
];

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <div 
      className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[280px] flex flex-col"
      style={{ 
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}
      data-testid={`testimonial-card-${testimonial.id}`}
    >
      {/* Profile Image */}
      <div className="relative mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
          style={{ 
            borderColor: '#DBA352',
            borderWidth: '3px'
          }}
          data-testid={`testimonial-image-${testimonial.id}`}
        />
      </div>

      {/* Name and Rating */}
      <div className="mb-4">
        <h4 
          className="font-semibold mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px',
            color: '#582308'
          }}
          data-testid={`testimonial-name-${testimonial.id}`}
        >
          {testimonial.name}
        </h4>
        
        {/* Star Rating */}
        <div 
          className="flex items-center gap-1 mb-3" 
          role="img"
          aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
          data-testid={`testimonial-rating-${testimonial.id}`}
        >
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < testimonial.rating
                  ? 'text-[#DBA352] fill-[#DBA352]'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span 
            className="ml-2 text-sm font-medium"
            style={{ color: '#582308' }}
          >
            {testimonial.rating}.0
          </span>
        </div>

        {/* Divider */}
        <div 
          className="w-full h-px mb-4"
          style={{ backgroundColor: 'rgba(219, 163, 82, 0.3)' }}
        />
      </div>

      {/* Testimonial Text */}
      <p 
        className="leading-relaxed flex-1"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#4A4A4A'
        }}
        data-testid={`testimonial-text-${testimonial.id}`}
      >
        {testimonial.text}
      </p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Animated Marquee Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Row 1 */}
        <div 
          className="absolute whitespace-nowrap"
          style={{
            top: '80px',
            left: 0,
            width: 'max-content',
            animation: 'scrollTestimonials1 20s linear infinite'
          }}
        >
          {/* First set */}
          <span 
            className="inline-block mr-32"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: 'rgb(88, 35, 8)',
              opacity: 0.07
            }}
          >
            · Testimonials ·
          </span>
          <span 
            className="inline-block mr-32"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: 'rgb(88, 35, 8)',
              opacity: 0.31
            }}
          >
            · Testimonials ·
          </span>
          <span 
            className="inline-block mr-32"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: 'rgb(88, 35, 8)',
              opacity: 0.07
            }}
          >
            · Testimonials ·
          </span>
          <span 
            className="inline-block mr-32"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: 'rgb(88, 35, 8)',
              opacity: 0.07
            }}
          >
            · Testimonials ·
          </span>
          {/* Duplicate set for seamless loop */}
          <span 
            className="inline-block mr-32"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: 'rgb(88, 35, 8)',
              opacity: 0.07
            }}
          >
            · Testimonials ·
          </span>
          <span 
            className="inline-block mr-32"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: 'rgb(88, 35, 8)',
              opacity: 0.31
            }}
          >
            · Testimonials ·
          </span>
          <span 
            className="inline-block mr-32"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: 'rgb(88, 35, 8)',
              opacity: 0.07
            }}
          >
            · Testimonials ·
          </span>
          <span 
            className="inline-block mr-32"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: 'rgb(88, 35, 8)',
              opacity: 0.07
            }}
          >
            · Testimonials ·
          </span>
        </div>

        {/* Row 2 */}
        <div 
          className="absolute whitespace-nowrap"
          style={{
            top: '180px',
            left: 0,
            width: 'max-content',
            animation: 'scrollTestimonials2 25s linear infinite',
            animationDelay: '-5s'
          }}
        >
          {/* First set */}
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.31 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          {/* Duplicate set */}
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.31 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
        </div>

        {/* Row 3 */}
        <div 
          className="absolute whitespace-nowrap"
          style={{
            top: '280px',
            left: 0,
            width: 'max-content',
            animation: 'scrollTestimonials3 30s linear infinite',
            animationDelay: '-10s'
          }}
        >
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.11 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.11 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
        </div>

        {/* Row 4 */}
        <div 
          className="absolute whitespace-nowrap"
          style={{
            top: '380px',
            left: 0,
            width: 'max-content',
            animation: 'scrollTestimonials4 22s linear infinite',
            animationDelay: '-3s'
          }}
        >
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.13 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.13 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.13 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.13 }}>· Testimonials ·</span>
        </div>

        {/* Row 5 */}
        <div 
          className="absolute whitespace-nowrap"
          style={{
            top: '480px',
            left: 0,
            width: 'max-content',
            animation: 'scrollTestimonials5 28s linear infinite',
            animationDelay: '-15s'
          }}
        >
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
          <span className="inline-block mr-32" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(60px, 8vw, 100px)', color: 'rgb(88, 35, 8)', opacity: 0.07 }}>· Testimonials ·</span>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="mb-4"
            style={{
              fontFamily: "'Prata', serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: '#582308',
              fontWeight: 'normal'
            }}
            data-testid="testimonials-title"
          >
            What Our Customers Say
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: '#666666',
              fontSize: '18px',
              fontWeight: '400'
            }}
            data-testid="testimonials-subtitle"
          >
            Discover why thousands of customers trust SM Furnishings for their home transformation
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="flex justify-center">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}