'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Locations', href: '#location-finder' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Coupons', href: '#coupons' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const section = document.getElementById('location-finder');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // Dispatch a custom event to pass the query to the section
      window.dispatchEvent(new CustomEvent('location-search', { detail: locationQuery }));
    }
    setLocationQuery('');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm border-b border-gray-200' : 'bg-black/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-lg tracking-tight">A</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className={`font-bold text-lg leading-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Ace Automotive
              </span>
              <span className={`text-[10px] font-semibold tracking-widest uppercase ${scrolled ? 'text-blue-600' : 'text-blue-300'}`}>
                Virginia Beach, VA
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-0.5 flex-shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  scrolled
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Location Search Bar — CarX style */}
          <form
            onSubmit={handleLocationSearch}
            className="hidden lg:flex items-stretch flex-1 max-w-sm rounded-lg overflow-hidden border-2 border-transparent focus-within:border-blue-500 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2 bg-white px-3 flex-1 min-w-0">
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Zip or City, State"
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none py-2.5 min-w-0"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              Find a Location
            </button>
          </form>

          {/* Phone + Book — right side */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:7574161901"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors whitespace-nowrap ${scrolled ? 'text-gray-900' : 'text-white'}`}
            >
              <Phone className="w-4 h-4" />
              (757) 416-1901
            </a>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm whitespace-nowrap" asChild>
              <a href="#appointment">Book Now</a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`xl:hidden p-2 rounded-lg transition-colors flex-shrink-0 ${scrolled ? 'text-gray-900' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 shadow-lg">
          {/* Mobile Location Search */}
          <div className="px-4 pt-4 pb-2">
            <form onSubmit={handleLocationSearch} className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-blue-500 transition-colors">
              <div className="flex items-center gap-2 bg-white px-3 flex-1">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Zip or City, State"
                  className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none py-2.5"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white text-xs font-bold px-3 whitespace-nowrap"
              >
                Find
              </button>
            </form>
          </div>

          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-200 mt-2">
              <a href="tel:7574161901" className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-900">
                <Phone className="w-4 h-4 text-blue-600" />
                (757) 416-1901
              </a>
              <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700" asChild>
                <a href="#appointment" onClick={() => setMobileOpen(false)}>Book Service</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
