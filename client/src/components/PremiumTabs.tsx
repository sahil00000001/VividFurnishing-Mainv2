import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { HomeProduct, premiumAll, premiumBestSellers, premiumNewArrivals } from "@/data/products";

type TabType = 'all' | 'best' | 'new';

interface TabData {
  id: TabType;
  label: string;
  products: HomeProduct[];
}

const tabs: TabData[] = [
  { id: 'all', label: 'ALL COLLECTION', products: premiumAll },
  { id: 'best', label: 'BEST SELLER', products: premiumBestSellers },
  { id: 'new', label: 'NEW ARRIVALS', products: premiumNewArrivals }
];

export function PremiumTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProducts, setCurrentProducts] = useState<HomeProduct[]>(premiumAll);

  const handleTabChange = (tabId: TabType) => {
    if (tabId === activeTab) return;
    
    setIsLoading(true);
    
    // Fade out animation delay
    setTimeout(() => {
      const newProducts = tabs.find(tab => tab.id === tabId)?.products || [];
      setCurrentProducts(newProducts);
      setActiveTab(tabId);
      
      // Brief loading state, then fade in
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }, 300);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header with Decorative Lines */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-foreground opacity-30"></div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mx-8 text-foreground tracking-wider">
              PREMIUM COLLECTIONS
            </h3>
            <div className="flex-1 h-px bg-foreground opacity-30"></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="relative flex space-x-12" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                className={`relative pb-2 font-medium tracking-wide transition-colors duration-300 ${
                  activeTab === tab.id 
                    ? 'text-terracotta' 
                    : 'text-foreground hover:text-terracotta/70'
                }`}
                onClick={() => handleTabChange(tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label}
                
                {/* Animated Underline */}
                {activeTab === tab.id && (
                  <div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta transform origin-center animate-underline"
                    style={{
                      animation: 'slideInFromCenter 0.3s ease-out'
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-5xl mx-auto">
          <div 
            role="tabpanel" 
            id={`tabpanel-${activeTab}`}
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-500 ${
              isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
            data-testid="premium-grid"
          >
            {isLoading ? (
              // Skeleton Loading Cards
              Array.from({ length: 4 }).map((_, index) => (
                <div 
                  key={`skeleton-${index}`}
                  className="animate-pulse"
                  data-testid={`skeleton-card-${index}`}
                >
                  {/* Image skeleton box */}
                  <div className="bg-cream rounded-2xl p-4 aspect-square mb-3">
                    <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                  </div>
                  {/* Text skeleton outside */}
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
                  </div>
                </div>
              ))
            ) : (
              // Product Cards
              currentProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  data-testid={`card-product-${product.id}`}
                >
                  {/* Image Background Box */}
                  <div className="bg-cream rounded-2xl p-4 aspect-square flex items-center justify-center relative overflow-hidden mb-3">
                    {/* Product Badge */}
                    {product.badge && (
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold tracking-wide text-white z-10 ${
                        product.badge === 'BESTSELLER' 
                          ? 'bg-terracotta animate-pulse' 
                          : product.badge === 'NEW'
                          ? 'bg-green-600'
                          : 'bg-orange-500'
                      }`}>
                        {product.badge}
                      </div>
                    )}
                    
                    {/* Product Image */}
                    <img 
                      src={product.image}
                      alt={product.alt}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Product Info - Outside the box */}
                  <div className="text-center space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {product.category || 'SEATING'}
                    </p>
                    <h4 className="font-serif font-bold text-sm text-foreground">
                      {product.name}
                    </h4>
                    <p className="font-bold text-terracotta">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Explore Shop Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="px-16 py-3 font-medium tracking-wide border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            data-testid="explore-shop-button"
          >
            Explore Shop
          </Button>
        </div>
      </div>
    </section>
  );
}