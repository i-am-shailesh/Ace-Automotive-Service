'use client';

import { useInView } from '@/hooks/use-intersection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Star, Clock, MapPin, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { ref, inView } = useInView(0);

  const scrollDown = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIU2mfRvDszY06zB_lVrJay2B4d9tkQePAmNIcxmUrig&s=10"
          alt="Premium car service workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/5 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-44 w-full">
        <div className="max-w-2xl">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            <Shield className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium text-white">Veteran-Owned &amp; Operated — Virginia Beach, VA</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Your Car Deserves
            <br />
            <span className="gradient-text">Expert Care</span>
          </h1>

          <p className={`text-lg sm:text-xl text-white/70 max-w-xl mb-8 leading-relaxed ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Hampton Roads&apos; trusted auto repair shop. Certified mechanics, transparent pricing, and free pickup &amp; drop anywhere in Virginia Beach.
          </p>

          <div className={`flex flex-wrap gap-4 mb-14 ${inView ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
            <Button size="lg" className="px-8 text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" asChild>
              <a href="#appointment">
                Book Service Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-base border-white/30 text-white bg-white/5 hover:bg-white/15 hover:text-white hover:border-white/50" asChild>
              <a href="#services">Explore Services</a>
            </Button>
          </div>

          <div className={`flex flex-wrap items-center gap-4 ${inView ? 'animate-fade-up stagger-4' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <Clock className="w-4 h-4 text-blue-300" />
              <span className="text-white/90 text-sm font-medium">Same Day Service</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <MapPin className="w-4 h-4 text-blue-300" />
              <span className="text-white/90 text-sm font-medium">4 Locations in Hampton Roads</span>
            </div>
          </div>
        </div>

        <div className={`hidden xl:block absolute right-16 bottom-24 ${inView ? 'animate-slide-right stagger-5' : 'opacity-0'}`}>
          <div className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="ASE certified mechanic working on vehicle"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/20">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">ASE Certified Mechanics</p>
                  <p className="text-white/70 text-[10px]">Virginia Beach, VA 23454</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors animate-float"
      >
        <span className="text-[10px] font-medium tracking-wider uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
}
