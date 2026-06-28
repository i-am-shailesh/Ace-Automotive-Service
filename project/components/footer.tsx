'use client';

import { Phone, Mail, MapPin, Shield, ArrowUp, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Coupons', href: '#coupons' },
  { label: 'Fleet Services', href: '#fleet' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Oil Change','Brake Repair','Tire Services','Wheel Alignment',
  'Engine Diagnostics','AC Service','Car Detailing','Fleet Service',
];

const locations = [
  'Virginia Beach (Main) — Great Neck Rd',
  'Chesapeake — Battlefield Blvd S',
  'Norfolk — Granby St',
  'Hampton Roads — Shore Dr',
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* CTA Band */}
      <div className="bg-blue-600 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Ready to service your vehicle?</h3>
              <p className="text-white/80 mt-1">Book online in 60 seconds — free pickup &amp; drop in Virginia Beach.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-white/90 font-semibold" asChild>
                <a href="#appointment">Book Online</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <a href="tel:7574161901">Call Now</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <span className="text-white font-extrabold text-lg">A</span>
              </div>
              <div>
                <p className="font-bold text-lg">Ace Automotive</p>
                <p className="text-[10px] text-white/40 tracking-wider uppercase">Virginia Beach, VA</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Hampton Roads&apos; trusted auto service partner. Veteran-owned and operated. ASE certified mechanics serving Virginia Beach since 2010.
            </p>
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400">Veteran-Owned Business</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-white/35 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-blue-400 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Locations */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-white/35 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-white/60 hover:text-blue-400 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-white/35 mb-3 mt-6">Locations</h4>
            <ul className="space-y-2">
              {locations.map((w) => (
                <li key={w} className="text-sm text-white/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-white/35 mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:7574161901" className="text-sm text-white/80 hover:text-blue-400 transition-colors font-medium">(757) 416-1901</a>
                  <p className="text-xs text-white/40">Mon–Fri 8am–6pm · Sat 8am–5pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@aceautomotive.com" className="text-sm text-white/80 hover:text-blue-400 transition-colors">info@aceautomotive.com</a>
                  <p className="text-xs text-white/40">Reply within 2 hours</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm text-white/80">1248 N. Great Neck Rd</span>
                  <p className="text-xs text-white/40">Virginia Beach, VA 23454</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/35">
          <p>&copy; {new Date().getFullYear()} Ace Automotive LLC. All rights reserved. Virginia Beach, VA · Veteran-Owned.</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/35 hover:text-white hover:bg-white/8 gap-1.5"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
}
