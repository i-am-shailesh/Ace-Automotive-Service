'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from '@/hooks/use-intersection';
import { MapPin, Phone, Clock, Navigation, Search, LocateFixed, ExternalLink, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: { label: string; time: string }[];
  mapQuery: string;
  mapEmbed: string;
  services: string[];
  tags?: string[];
}

const locations: Location[] = [
  {
    id: 'main',
    name: 'Virginia Beach — Main',
    address: '1248 N. Great Neck Rd, Suite 101',
    city: 'Virginia Beach',
    state: 'VA',
    zip: '23454',
    phone: '(757) 416-1901',
    hours: [
      { label: 'Mon – Fri', time: '8:00 AM – 6:00 PM' },
      { label: 'Saturday', time: '8:00 AM – 5:00 PM' },
      { label: 'Sunday', time: 'Closed' },
    ],
    mapQuery: 'Virginia+Beach+VA+23454',
    mapEmbed: 'https://maps.google.com/maps?q=1248+N+Great+Neck+Rd,+Virginia+Beach,+VA+23454&t=&z=15&ie=UTF8&iwloc=&output=embed',
    services: ['Oil Change', 'Brakes', 'AC Service', 'Detailing', 'Tires'],
    tags: ['Main Location', 'Open Today'],
  },
  {
    id: 'chesapeake',
    name: 'Chesapeake',
    address: '620 Battlefield Blvd S',
    city: 'Chesapeake',
    state: 'VA',
    zip: '23322',
    phone: '(757) 416-2200',
    hours: [
      { label: 'Mon – Fri', time: '8:00 AM – 6:00 PM' },
      { label: 'Saturday', time: '8:00 AM – 5:00 PM' },
      { label: 'Sunday', time: 'Closed' },
    ],
    mapQuery: 'Chesapeake+VA+23322',
    mapEmbed: 'https://maps.google.com/maps?q=620+Battlefield+Blvd+S,+Chesapeake,+VA+23322&t=&z=15&ie=UTF8&iwloc=&output=embed',
    services: ['Oil Change', 'Brakes', 'Tires', 'Fleet Service'],
    tags: ['Open Today'],
  },
  {
    id: 'norfolk',
    name: 'Norfolk',
    address: '7401 Granby St',
    city: 'Norfolk',
    state: 'VA',
    zip: '23505',
    phone: '(757) 416-3300',
    hours: [
      { label: 'Mon – Fri', time: '8:00 AM – 6:00 PM' },
      { label: 'Saturday', time: '9:00 AM – 4:00 PM' },
      { label: 'Sunday', time: 'Closed' },
    ],
    mapQuery: 'Norfolk+VA+23505',
    mapEmbed: 'https://maps.google.com/maps?q=7401+Granby+St,+Norfolk,+VA+23505&t=&z=15&ie=UTF8&iwloc=&output=embed',
    services: ['Oil Change', 'Engine Diagnostics', 'Suspension', 'Brakes'],
  },
  {
    id: 'shore',
    name: 'Hampton Roads — Shore Dr',
    address: '4012 Shore Dr',
    city: 'Virginia Beach',
    state: 'VA',
    zip: '23455',
    phone: '(757) 416-4400',
    hours: [
      { label: 'Mon – Fri', time: '8:00 AM – 6:00 PM' },
      { label: 'Saturday', time: '8:00 AM – 5:00 PM' },
      { label: 'Sunday', time: 'Closed' },
    ],
    mapQuery: 'Virginia+Beach+VA+23455',
    mapEmbed: 'https://maps.google.com/maps?q=4012+Shore+Dr,+Virginia+Beach,+VA+23455&t=&z=15&ie=UTF8&iwloc=&output=embed',
    services: ['Oil Change', 'Brakes', 'AC Service', 'Detailing'],
  },
];

function matchesSearch(loc: Location, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  return (
    loc.city.toLowerCase().includes(q) ||
    loc.state.toLowerCase().includes(q) ||
    loc.zip.includes(q) ||
    loc.address.toLowerCase().includes(q) ||
    loc.name.toLowerCase().includes(q) ||
    ['virginia beach', 'chesapeake', 'norfolk', 'hampton'].some((c) => c.includes(q) && (loc.city.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q)))
  );
}

export default function LocationFinder() {
  const { ref, inView } = useInView(0.05);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string>('main');
  const [locating, setLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>('');

  const filtered = locations.filter((l) => matchesSearch(l, query));
  const activeLocation = locations.find((l) => l.id === activeId) ?? locations[0];

  // Listen for navbar search events
  useEffect(() => {
    const handler = (e: Event) => {
      const q = (e as CustomEvent<string>).detail;
      if (q) {
        setQuery(q);
        const match = locations.find((l) => matchesSearch(l, q));
        if (match) setActiveId(match.id);
      }
    };
    window.addEventListener('location-search', handler);
    return () => window.removeEventListener('location-search', handler);
  }, []);

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation not supported by your browser.');
      return;
    }
    setLocating(true);
    setLocationStatus('Detecting your location...');
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocating(false);
        setLocationStatus('Showing nearest location.');
        setActiveId('main');
        setQuery('Virginia Beach');
      },
      () => {
        setLocating(false);
        setLocationStatus('Unable to detect location. Please enter your ZIP or city.');
      },
      { timeout: 8000 }
    );
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const match = locations.find((l) => matchesSearch(l, query));
    if (match) setActiveId(match.id);
  };

  return (
    <section id="location-finder" ref={ref} className="py-20 md:py-28 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            Locations
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-white ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Find an Ace Automotive
            <span className="text-blue-400"> Near You</span>
          </h2>
          <p className={`text-white/60 max-w-xl mx-auto text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Serving Virginia Beach, Chesapeake, Norfolk, and all of Hampton Roads.
          </p>
        </div>

        {/* Search Bar */}
        <div className={`max-w-2xl mx-auto mb-10 ${inView ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
          <form onSubmit={handleSearch} className="flex rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <div className="flex items-center gap-3 bg-white px-4 flex-1 min-w-0">
              <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter ZIP code or City, State"
                className="flex-1 text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none py-4 min-w-0"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Find a Location
            </button>
          </form>

          <div className="flex items-center justify-between mt-3 px-1">
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={locating}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
            >
              <LocateFixed className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
              {locating ? 'Detecting...' : 'Use My Current Location'}
            </button>
            {locationStatus && (
              <span className="text-xs text-white/50">{locationStatus}</span>
            )}
          </div>
        </div>

        {/* Main Layout: Results left, Map right */}
        <div className={`grid lg:grid-cols-5 gap-6 ${inView ? 'animate-scale-in stagger-4' : 'opacity-0'}`}>
          {/* Location Cards */}
          <div className="lg:col-span-2 space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-white/40">
                <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No locations found for &ldquo;{query}&rdquo;</p>
                <p className="text-sm mt-1">Try a different city or ZIP code in Hampton Roads, VA.</p>
                <button onClick={() => setQuery('')} className="mt-3 text-blue-400 text-sm hover:underline">Clear search</button>
              </div>
            ) : (
              filtered.map((loc) => {
                const isActive = loc.id === activeId;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveId(loc.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20' : 'bg-blue-500/20'}`}>
                          <MapPin className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                        </div>
                        <span className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-white/90'}`}>{loc.name}</span>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />}
                    </div>

                    <p className={`text-xs mb-1 ml-10 ${isActive ? 'text-white/80' : 'text-white/55'}`}>
                      {loc.address}, {loc.city}, {loc.state} {loc.zip}
                    </p>
                    <p className={`text-xs font-medium ml-10 mb-2 ${isActive ? 'text-white/90' : 'text-blue-400'}`}>{loc.phone}</p>

                    <div className="flex flex-wrap gap-1.5 ml-10">
                      {loc.tags?.map((tag) => (
                        <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-300'}`}>
                          {tag}
                        </span>
                      ))}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white/10 text-white/70' : 'bg-white/5 text-white/40'}`}>
                        Mon–Fri 8am–6pm
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Map + Detail */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl flex-1" style={{ minHeight: '340px' }}>
              <iframe
                key={activeLocation.id}
                src={activeLocation.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ace Automotive - ${activeLocation.name}`}
              />
            </div>

            {/* Active Location Detail Card */}
            <div className="bg-white/8 border border-white/10 rounded-2xl p-5 grid sm:grid-cols-2 gap-5">
              <div>
                <h3 className="font-bold text-base text-white mb-1">{activeLocation.name}</h3>
                <p className="text-white/60 text-sm mb-3">{activeLocation.address}, {activeLocation.city}, {activeLocation.state} {activeLocation.zip}</p>

                <div className="space-y-1.5 mb-4">
                  {activeLocation.hours.map((h) => (
                    <div key={h.label} className="flex items-center justify-between text-xs">
                      <span className="text-white/50 w-20">{h.label}</span>
                      <span className={`font-medium ${h.time === 'Closed' ? 'text-red-400' : 'text-white/80'}`}>{h.time}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${activeLocation.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {activeLocation.phone}
                  </a>
                  <a
                    href={`https://maps.google.com/maps?q=${activeLocation.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Directions
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Services Offered</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeLocation.services.map((s) => (
                    <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-medium border border-blue-500/20">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
                    <a href="#appointment">
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule at This Location
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

