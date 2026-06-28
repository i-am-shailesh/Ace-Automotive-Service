'use client';

import { useInView } from '@/hooks/use-intersection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Settings, ClipboardList, Clock, ShieldCheck, BarChart3, Phone, Check } from 'lucide-react';

const fleetFeatures = [
  { icon: Settings, title: 'Scheduled Maintenance', desc: 'Auto-schedule routine maintenance for your entire fleet — oil changes, tire rotations, inspections and more.' },
  { icon: ClipboardList, title: 'Fleet Management Portal', desc: 'Track all vehicles, service history, upcoming maintenance, and costs in one online dashboard.' },
  { icon: Clock, title: 'Priority Scheduling', desc: 'Fleet accounts get priority booking slots and guaranteed same-week turnaround to minimize downtime.' },
  { icon: ShieldCheck, title: 'Dedicated Account Manager', desc: 'A single point of contact handles all your fleet service needs. No more navigating phone trees.' },
  { icon: BarChart3, title: 'Cost Reporting', desc: 'Monthly reports with per-vehicle costs, maintenance trends, and budget forecasting for your business.' },
  { icon: Truck, title: 'All Vehicle Types', desc: 'Cars, pickup trucks, vans, box trucks, and work vehicles. We handle everything in Hampton Roads.' },
];

const fleetBenefits = [
  '10% discount on all services',
  'Net-30 invoicing available',
  'Priority scheduling slots',
  'Monthly service reports',
  'Dedicated account manager',
  'Courtesy loaner vehicles',
  'Roadside assistance priority',
  'No minimum fleet size',
];

export default function FleetSection() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="fleet" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            Fleet Services
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Keep Your
            <span className="gradient-text"> Business Fleet Running</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            From single delivery vans to large commercial fleets, Ace Automotive keeps Hampton Roads businesses on the road.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className={`relative ${inView ? 'animate-slide-left stagger-3' : 'opacity-0'}`}>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fleet vehicle maintenance"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-primary text-white rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-extrabold">10%</div>
              <div className="text-sm text-white/80 font-medium">Fleet Discount</div>
            </div>
          </div>

          {/* Benefits */}
          <div className={`${inView ? 'animate-slide-right stagger-3' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-2">Fleet Account Benefits</h3>
            <p className="text-muted-foreground mb-6">Open a fleet account today and start saving. No setup fee, no minimum fleet size.</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {fleetBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2.5 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button size="lg" asChild>
                <a href="#appointment">Open Fleet Account</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:7574161901">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Fleet Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fleetFeatures.map((feature, i) => (
            <Card
              key={feature.title}
              className={`group border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 ${inView ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.08 * i + 0.5}s` }}
            >
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center mb-3 transition-colors">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
