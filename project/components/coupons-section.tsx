'use client';

import { useInView } from '@/hooks/use-intersection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Percent, Calendar, Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';

const coupons = [
  {
    code: 'ACE15',
    title: '15% Off Any Service',
    description: 'Get 15% off your first service at any Ace Automotive location.',
    discount: '15% OFF',
    expiry: '2025-09-30',
    terms: 'New customers only. Cannot be combined with other offers.',
    color: 'from-blue-600 to-cyan-500',
    tag: 'New Customer',
  },
  {
    code: 'OILCHANGE39',
    title: '$39 Oil Change Special',
    description: 'Conventional oil change with filter replacement. Up to 5 quarts.',
    discount: '$39',
    expiry: '2025-08-31',
    terms: 'Conventional oil only. Some vehicles may cost more.',
    color: 'from-emerald-600 to-teal-500',
    tag: 'Popular',
  },
  {
    code: 'BRAKES20',
    title: '$20 Off Brake Service',
    description: 'Save $20 on any brake pad replacement (front or rear axle).',
    discount: '$20 OFF',
    expiry: '2025-08-31',
    terms: 'Per axle. Cannot be combined with other discounts.',
    color: 'from-orange-500 to-amber-500',
    tag: 'Limited Time',
  },
  {
    code: 'DETAIL99',
    title: 'Full Detail for $99',
    description: 'Complete interior and exterior detail. Normally $150+.',
    discount: '$99 DEAL',
    expiry: '2025-07-31',
    terms: 'Standard vehicles. SUVs & trucks add $20.',
    color: 'from-violet-600 to-blue-500',
    tag: 'Best Value',
  },
  {
    code: 'ALIGN59',
    title: '$59 Wheel Alignment',
    description: 'Four-wheel alignment check and adjustment for all vehicles.',
    discount: '$59',
    expiry: '2025-09-30',
    terms: 'Standard cars. Some vehicles may vary.',
    color: 'from-rose-500 to-pink-500',
    tag: 'Seasonal',
  },
  {
    code: 'FLEET10',
    title: '10% Off Fleet Services',
    description: 'Business owners save 10% on all fleet vehicle maintenance.',
    discount: '10% OFF',
    expiry: '2025-12-31',
    terms: '3+ vehicles required. Contact us for fleet accounts.',
    color: 'from-slate-600 to-zinc-500',
    tag: 'Fleet',
  },
];

function CouponCard({ coupon, index, inView }: { coupon: typeof coupons[0]; index: number; inView: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const expiryDate = new Date(coupon.expiry);
  const formattedExpiry = expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Card
      className={`group overflow-hidden border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${inView ? 'animate-scale-in' : 'opacity-0'}`}
      style={{ animationDelay: `${0.1 * index + 0.2}s` }}
    >
      {/* Top gradient band */}
      <div className={`h-2 bg-gradient-to-r ${coupon.color}`} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${coupon.color} text-white`}>
            {coupon.tag}
          </span>
          <span className={`text-2xl font-extrabold bg-gradient-to-r ${coupon.color} bg-clip-text text-transparent`}>
            {coupon.discount}
          </span>
        </div>

        <h3 className="font-bold text-base mb-1">{coupon.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{coupon.description}</p>

        {/* Coupon Code */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5">
            <Tag className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-mono font-bold text-primary text-sm tracking-wider">{coupon.code}</span>
          </div>
          <Button variant="outline" size="sm" className="flex-shrink-0 gap-1.5" onClick={copyCode}>
            {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>Expires {formattedExpiry}</span>
          </div>
          <Button size="sm" asChild>
            <a href="#appointment">Use Now</a>
          </Button>
        </div>

        <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed border-t border-border pt-2">*{coupon.terms}</p>
      </CardContent>
    </Card>
  );
}

export default function CouponsSection() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="coupons" ref={ref} className="py-20 md:py-28 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            Coupons &amp; Deals
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Exclusive Offers
            <span className="gradient-text"> &amp; Discounts</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Print or copy your coupon code and mention it when booking. New offers added monthly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coupons.map((coupon, i) => (
            <CouponCard key={coupon.code} coupon={coupon} index={i} inView={inView} />
          ))}
        </div>

        <div className={`mt-12 p-6 rounded-2xl bg-primary text-white text-center ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <Percent className="w-8 h-8 mx-auto mb-3 text-white/80" />
          <h3 className="text-xl font-bold mb-2">Get Exclusive Deals via Text</h3>
          <p className="text-white/70 mb-4 text-sm">Sign up and receive monthly coupons, seasonal offers, and service reminders directly to your phone.</p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
            <a href="tel:7574161901">Call (757) 416-1901 to Sign Up</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
