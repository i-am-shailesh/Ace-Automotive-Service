'use client';

import { useInView } from '@/hooks/use-intersection';
import { Phone, Mail, MapPin, Clock, MessageSquare, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const locations = [
  { name: 'Virginia Beach (Main)', address: '1248 N. Great Neck Rd, Suite 101, Virginia Beach, VA 23454' },
  { name: 'Chesapeake', address: '620 Battlefield Blvd S, Chesapeake, VA 23322' },
  { name: 'Norfolk', address: '7401 Granby St, Norfolk, VA 23505' },
  { name: 'Hampton Roads', address: '4012 Shore Dr, Virginia Beach, VA 23455' },
];

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: '(757) 416-1901', href: 'tel:7574161901', sub: 'Mon–Fri 8am–6pm' },
  { icon: Mail, label: 'Email', value: 'info@aceautomotive.com', href: 'mailto:info@aceautomotive.com', sub: 'Reply within 2 hours' },
  { icon: Clock, label: 'Working Hours', value: 'Mon–Fri 8am–6pm', href: null, sub: 'Saturday 8am–5pm' },
  { icon: MessageSquare, label: 'WhatsApp', value: '(757) 416-1901', href: 'https://wa.me/17574161901', sub: 'Chat instantly' },
];

export default function ContactSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            Find Us
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Visit Our
            <span className="gradient-text"> Service Centers</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Serving Virginia Beach and Hampton Roads. Find your nearest Ace Automotive workshop.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 ${inView ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
          {contactInfo.map((item) => (
            <Card key={item.label} className="border-border/50 hover:border-primary/30 hover:shadow-md transition-all group">
              <CardContent className="p-5 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary transition-colors mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-semibold text-sm text-foreground hover:text-primary transition-colors block">{item.value}</a>
                ) : (
                  <p className="font-semibold text-sm text-foreground">{item.value}</p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map + Locations */}
        <div className={`grid lg:grid-cols-3 gap-6 items-start ${inView ? 'animate-scale-in stagger-4' : 'opacity-0'}`}>
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border/50 shadow-lg" style={{ height: '440px' }}>
            <iframe
              src="https://maps.google.com/maps?q=Virginia+Beach,+VA,+USA&t=&z=12&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ace Automotive Location - Virginia Beach, VA"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Our Locations
            </h3>
            {locations.map((loc, i) => (
              <div
                key={loc.name}
                className={`p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group ${inView ? 'animate-slide-right' : 'opacity-0'}`}
                style={{ animationDelay: `${0.1 * i + 0.5}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{loc.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{loc.address}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full mt-2" asChild>
              <a href="https://maps.google.com/maps?q=Virginia+Beach,+VA,+USA" target="_blank" rel="noopener noreferrer">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
