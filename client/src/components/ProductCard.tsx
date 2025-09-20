import { Button } from "@/components/ui/button";
import { HomeProduct } from "@/data/products";

interface ProductCardProps {
  product: HomeProduct;
  variant: "bestseller" | "luxury";
  testIdPrefix?: string;
}

export function ProductCard({ product, variant, testIdPrefix = "product" }: ProductCardProps) {
  if (variant === "luxury") {
    return (
      <div 
        className="relative overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)] group cursor-pointer transform hover:scale-105 transition-all duration-300"
        style={{
          width: '220px',
          height: '280px',
          background: '#FFF9EA',
          borderRadius: '50px'
        }}
        data-testid={`${testIdPrefix}-card-${product.id}`}
      >
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '50px' }}>
          <img 
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            data-testid={`${testIdPrefix}-image-${product.id}`}
          />
          {/* Gradient overlay matching the CSS specification */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(206.76deg, rgba(255, 249, 234, 0) 10.24%, rgba(255, 249, 234, 0.0512821) 57.67%, rgba(255, 249, 234, 0.6) 72.26%, #FFF9EA 89.28%)',
              borderRadius: '50px'
            }}
          ></div>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <h4 
            className="text-black text-left capitalize"
            style={{
              fontFamily: 'Prata, serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '24px'
            }}
            data-testid={`${testIdPrefix}-name-${product.id}`}
          >
            {product.name}
          </h4>
        </div>
      </div>
    );
  }

  // Default bestseller variant with new styling effects
  return (
    <div 
      className="relative overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)] group cursor-pointer transform hover:scale-105 transition-all duration-300"
      style={{
        width: '220px',
        height: '280px',
        background: '#FFF9EA',
        borderRadius: '50px'
      }}
      data-testid={`${testIdPrefix}-card-${product.id}`}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '50px' }}>
        <img 
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          data-testid={`${testIdPrefix}-image-${product.id}`}
        />
        {/* Gradient overlay matching the CSS specification */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(206.76deg, rgba(255, 249, 234, 0) 10.24%, rgba(255, 249, 234, 0.0512821) 57.67%, rgba(255, 249, 234, 0.6) 72.26%, #FFF9EA 89.28%)',
            borderRadius: '50px'
          }}
        ></div>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <h4 
          className="text-black mb-1 text-left capitalize"
          style={{
            fontFamily: 'Prata, serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '24px'
          }}
          data-testid={`${testIdPrefix}-name-${product.id}`}
        >
          {product.name}
        </h4>
        <p 
          className="text-black capitalize"
          style={{
            fontFamily: 'Prata, serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '18px'
          }}
          data-testid={`${testIdPrefix}-price-${product.id}`}
        >
          {product.price}
        </p>
      </div>
    </div>
  );
}