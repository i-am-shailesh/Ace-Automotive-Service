'use client';

import { useInView } from '@/hooks/use-intersection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, DollarSign } from 'lucide-react';

const pricingItems = [
  {
    category: 'Car Inspection',
    services: [{ name: 'Multi-Point Inspection', price: 49 }, { name: 'Engine Diagnostics', price: 79 }],
    highlight: true,
  },
  {
    category: 'Oil Change',
    services: [{ name: 'Conventional Oil Change', price: 39 }, { name: 'Full Synthetic Oil Change', price: 79 }],
    highlight: false,
  },
  {
    category: 'AC Service',
    services: [{ name: 'AC Inspection & Recharge', price: 129 }, { name: 'AC Diagnostics', price: 89 }],
    highlight: false,
  },
  {
    category: 'Brake Service',
    services: [{ name: 'Brake Pad Replacement', price: 149 }, { name: 'Brake Rotor Replacement', price: 249 }],
    highlight: true,
  },
  {
    category: 'Detailing',
    services: [{ name: 'Ceramic Coating', price: 499 }, { name: 'Full Detail Package', price: 299 }],
    highlight: false,
  },
  {
    category: 'Tire Services',
    services: [{ name: 'Tire Rotation', price: 29 }, { name: 'Wheel Alignment', price: 89 }],
    highlight: false,
  },
];

export default function PricingSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="pricing" ref={ref} className="py-20 md:py-28 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            Transparent Pricing
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Honest Prices,
            <span className="gradient-text"> No Surprises</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Save 15–30% compared to dealerships. All prices include labor and quality parts.
          </p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-semibold mt-4 ${inView ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
            Save up to 15–30% vs. dealerships
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingItems.map((category, i) => (
            <Card
              key={category.category}
              className={`group border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden ${category.highlight ? 'border-primary/20' : ''} ${inView ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.08 * i + 0.3}s` }}
            >
              {category.highlight && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg">Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-3">
                <h3 className="font-bold text-xl">{category.category}</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-0.5 font-semibold text-primary">
                      <DollarSign className="w-3.5 h-3.5" />{service.price}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-colors" asChild>
                  <a href="#appointment">Book Now</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
