'use client';

import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/use-intersection';
import { Car, Users, MessageSquare, MapPin } from 'lucide-react';

const stats = [
  { icon: Car, value: 50000, label: 'Cars Serviced', suffix: '50K+' },
  { icon: Users, value: 12000, label: 'Happy Customers', suffix: '12K+' },
  { icon: MessageSquare, value: 5000, label: 'Five-Star Reviews', suffix: '5K+' },
  { icon: MapPin, value: 4, label: 'Locations in Hampton Roads', suffix: '4' },
];

function AnimatedNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  if (!inView) return <span>0</span>;
  if (count >= target) return <>{suffix}</>;
  if (target >= 1000) return <>{(count / 1000).toFixed(0)}K+</>;
  return <>{count}+</>;
}

export default function StatsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section ref={ref} className="relative py-16 md:py-20 bg-primary">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center ${inView ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-white/70 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
