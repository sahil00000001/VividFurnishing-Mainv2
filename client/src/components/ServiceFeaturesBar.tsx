import React from 'react';
import { Globe, Wallet, Headphones } from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: Globe,
    title: "Free Delivery",
    description: "On orders above ₹3,000"
  },
  {
    id: 2,
    icon: Wallet,
    title: "Affordable prices",
    description: "Affordable luxury pricing"
  },
  {
    id: 3,
    icon: Headphones,
    title: "Easy Returns",
    description: "7-day return policy"
  }
];

export function ServiceFeaturesBar() {
  return (
    <section 
      className="w-full h-[140px] sm:h-[120px]"
      style={{ 
        backgroundColor: '#D4A39C'
      }}
      aria-label="Service Features"
      role="region"
    >
      <div className="container mx-auto px-6 h-full">
        <div className="grid grid-cols-3 md:divide-x divide-white/20 h-full">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.id}
                className="w-full h-full flex flex-col items-center justify-center text-center text-white px-4"
                data-testid={`feature-${feature.id}`}
              >
                {/* Icon */}
                <div className="mb-2">
                  <IconComponent 
                    className="w-8 h-8 text-white" 
                  />
                </div>
                
                {/* Feature Title */}
                <h4 className="font-semibold text-sm sm:text-base mb-1" data-testid={`feature-title-${feature.id}`}>
                  {feature.title}
                </h4>
                
                {/* Feature Description */}
                <p 
                  className="text-xs sm:text-xs opacity-90 leading-relaxed"
                  data-testid={`feature-description-${feature.id}`}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}