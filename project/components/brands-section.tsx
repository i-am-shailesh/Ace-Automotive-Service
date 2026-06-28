'use client';

import { useInView } from '@/hooks/use-intersection';

const popularBrands = [
  { name: 'Maruti Suzuki', initials: 'MS', color: 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white' },
  { name: 'Hyundai', initials: 'HY', color: 'bg-slate-50 text-slate-700 hover:bg-slate-700 hover:text-white' },
  { name: 'Honda', initials: 'HN', color: 'bg-red-50 text-red-700 hover:bg-red-600 hover:text-white' },
  { name: 'Toyota', initials: 'TY', color: 'bg-red-50 text-red-800 hover:bg-red-700 hover:text-white' },
  { name: 'Tata Motors', initials: 'TM', color: 'bg-blue-50 text-blue-800 hover:bg-blue-700 hover:text-white' },
  { name: 'Mahindra', initials: 'MH', color: 'bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white' },
  { name: 'Kia', initials: 'KI', color: 'bg-slate-50 text-slate-800 hover:bg-slate-800 hover:text-white' },
  { name: 'Volkswagen', initials: 'VW', color: 'bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white' },
];

const luxuryBrands = [
  { name: 'Mercedes-Benz', initials: 'MB', color: 'bg-zinc-50 text-zinc-800 hover:bg-zinc-800 hover:text-white' },
  { name: 'BMW', initials: 'BM', color: 'bg-sky-50 text-sky-800 hover:bg-sky-700 hover:text-white' },
  { name: 'Audi', initials: 'AU', color: 'bg-zinc-50 text-zinc-700 hover:bg-zinc-700 hover:text-white' },
  { name: 'Jaguar', initials: 'JG', color: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-700 hover:text-white' },
  { name: 'Porsche', initials: 'PC', color: 'bg-amber-50 text-amber-800 hover:bg-amber-700 hover:text-white' },
  { name: 'Land Rover', initials: 'LR', color: 'bg-green-50 text-green-800 hover:bg-green-700 hover:text-white' },
  { name: 'Ferrari', initials: 'FR', color: 'bg-red-50 text-red-700 hover:bg-red-600 hover:text-white' },
];

interface BrandProps { name: string; initials: string; color: string; }

function BrandChip({ name, initials, color }: BrandProps) {
  return (
    <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl border border-border/50 hover:border-transparent hover:shadow-md transition-all duration-300 cursor-pointer bg-white`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${color}`}>
        {initials}
      </div>
      <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
        {name}
      </span>
    </div>
  );
}

export default function BrandsSection() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="brands" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            Supported Brands
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            We Service
            <span className="gradient-text"> All Major Brands</span>
          </h2>
          <p className={`text-muted-foreground max-w-xl mx-auto text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            From everyday commuters to luxury vehicles, our certified mechanics handle them all with equal expertise.
          </p>
        </div>

        {/* Popular Brands */}
        <div className="mb-10">
          <div className={`flex items-center gap-3 mb-5 ${inView ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
            <span className="text-sm font-bold text-foreground/50 uppercase tracking-wider">Popular Brands</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularBrands.map((brand, i) => (
              <div key={brand.name} className={inView ? 'animate-scale-in' : 'opacity-0'} style={{ animationDelay: `${0.05 * i + 0.4}s` }}>
                <BrandChip {...brand} />
              </div>
            ))}
          </div>
        </div>

        {/* Luxury Brands */}
        <div>
          <div className={`flex items-center gap-3 mb-5 ${inView ? 'animate-fade-up stagger-4' : 'opacity-0'}`}>
            <span className="text-sm font-bold text-foreground/50 uppercase tracking-wider">Luxury Brands</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {luxuryBrands.map((brand, i) => (
              <div key={brand.name} className={inView ? 'animate-scale-in' : 'opacity-0'} style={{ animationDelay: `${0.05 * i + 0.6}s` }}>
                <BrandChip {...brand} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
