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
        className="bg-gradient-to-br from-cream to-cream-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-terracotta transition-all duration-300 group cursor-pointer transform hover:scale-105"
        data-testid={`${testIdPrefix}-card-${product.id}`}
      >
        <div className="aspect-[3/4] overflow-hidden relative">
          <img 
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            data-testid={`${testIdPrefix}-image-${product.id}`}
          />
          {/* Luxury Badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-terracotta to-terracotta-dark text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md">
            LUXURY
          </div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6">
          <h4 className="font-serif text-xl font-bold text-foreground mb-3 tracking-wide" data-testid={`${testIdPrefix}-name-${product.id}`}>
            {product.name}
          </h4>
          <p className="text-terracotta font-bold text-xl mb-4" data-testid={`${testIdPrefix}-price-${product.id}`}>
            {product.price}
          </p>
          <Button 
            className="w-full bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-semibold py-3 rounded-lg hover:from-terracotta-dark hover:to-terracotta transition-all duration-300 shadow-md hover:shadow-lg"
            data-testid={`${testIdPrefix}-button-${product.id}`}
          >
            VIEW LUXURY PIECE
          </Button>
        </div>
      </div>
    );
  }

  // Default bestseller variant
  return (
    <div 
      className="bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer"
      data-testid={`${testIdPrefix}-card-${product.id}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          data-testid={`${testIdPrefix}-image-${product.id}`}
        />
      </div>
      <div className="p-4">
        <h4 className="font-serif text-lg font-semibold text-foreground mb-2" data-testid={`${testIdPrefix}-name-${product.id}`}>
          {product.name}
        </h4>
        <p className="text-terracotta font-semibold text-lg" data-testid={`${testIdPrefix}-price-${product.id}`}>
          {product.price}
        </p>
      </div>
    </div>
  );
}