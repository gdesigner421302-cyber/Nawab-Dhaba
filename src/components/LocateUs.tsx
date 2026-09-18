import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Car, ExternalLink, Copy, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocateUs: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenMaps = () => {
    const query = encodeURIComponent("Nawab Dhaba, Mumbai-Nashik Expressway, Bhiwandi");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section id="locate-us-section" className="py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium tracking-widest uppercase mb-2">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Highway Pitstop Destination</span>
        </div>
        <h2 className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-amber-100 tracking-wide">
          Locate Us
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
        <p className="text-amber-200/70 text-sm mt-2 max-w-xl mx-auto font-marcellus">
          Situated right on the Mumbai - Nashik Expressway (NH-160), conveniently accessible for road trippers and family weekend travelers.
        </p>
      </div>

      {/* Main Location Content Box */}
      <div className="bg-[#0b162d] rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Map Area (7 cols on desktop) */}
          <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[320px] bg-[#e7e1d5] overflow-hidden border-b lg:border-b-0 lg:border-r border-amber-500/20">
            {/* Interactive SVG Highway Map */}
            <div 
              onClick={handleOpenMaps} 
              className="w-full h-full relative cursor-pointer group"
              title="Click to navigate with Google Maps"
            >
              <svg className="w-full h-full" viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                {/* Base canvas */}
                <rect width="500" height="320" fill="#ede7da"/>
                
                {/* Forest / Green zones */}
                <path d="M0 0 H180 L140 100 L40 130 L0 180 Z" fill="#dbe3cd"/>
                <path d="M290 0 H500 V120 L380 90 L310 40 Z" fill="#d5dfc6"/>
                <path d="M350 180 L500 130 V320 H280 Z" fill="#d7e0c8"/>
                <path d="M0 240 L160 190 L120 320 H0 Z" fill="#e0e6d5"/>

                {/* Secondary highway grid */}
                <path d="M60 0 C90 90 120 180 140 320" stroke="#ffffff" strokeWidth="5"/>
                <path d="M380 0 C350 100 370 200 400 320" stroke="#ffffff" strokeWidth="5"/>
                <path d="M0 220 Q240 190 500 240" stroke="#ffffff" strokeWidth="6"/>

                {/* Major NH 160 Corridor */}
                <path d="M-10 60 Q210 130 510 210" stroke="#f6ad55" strokeWidth="16" strokeLinecap="round"/>
                <path d="M-10 60 Q210 130 510 210" stroke="#c05621" strokeWidth="3" strokeDasharray="8 8"/>

                {/* Road Labels */}
                <text x="30" y="80" fill="#652b19" fontSize="12" fontWeight="bold" fontFamily="Cinzel, serif">
                  NH 160 (Mumbai - Nashik Expressway)
                </text>
                <text x="20" y="45" fill="#4a5568" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  ← Thane / Mumbai (32 km)
                </text>
                <text x="340" y="240" fill="#4a5568" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  Nashik / Kasara Ghat (120 km) →
                </text>
                <text x="260" y="280" fill="#4a5568" fontSize="10" fontFamily="sans-serif">
                  Padgha Toll Plaza (2 km Ahead)
                </text>

                {/* Nawab Dhaba Marker */}
                <g transform="translate(250, 140)">
                  <circle cx="0" cy="0" r="22" fill="#e53e3e" opacity="0.25" className="animate-ping"/>
                  <circle cx="0" cy="0" r="12" fill="#c53030"/>
                  <path d="M0 -22 C-11 -22 -18 -14 -18 -5 C-18 8 0 25 0 25 C0 25 18 8 18 -5 C18 -14 11 -22 0 -22 Z" fill="#b91c1c"/>
                  <circle cx="0" cy="-7" r="5" fill="#ffffff"/>
                </g>

                {/* Floating Map Label Badge */}
                <g transform="translate(250, 105)">
                  <rect x="-80" y="-18" width="160" height="24" rx="12" fill="#081226" stroke="#f59e0b" strokeWidth="1.5"/>
                  <text x="0" y="-2" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    ★ NAWAB DHABA BHIWANDI
                  </text>
                </g>
              </svg>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-sm font-semibold">
                <Navigation className="w-5 h-5 text-amber-300" />
                <span>Open in Google Maps / GPS</span>
              </div>
            </div>
          </div>

          {/* Location Details & Highway Guide (5 cols on desktop) */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between text-amber-100">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-amber-200">
                    Bhiwandi Highway Branch
                  </h3>
                  <p className="text-xs text-amber-300/80 mt-0.5">
                    Landmark: 2 km before Padgha Toll Plaza, Mumbai Bound Corridor
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="shrink-0 p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Copy full address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-xs text-amber-100/85 leading-relaxed mb-4 font-sans">
                {RESTAURANT_INFO.address}
              </p>

              {/* Distance Matrix */}
              <div className="mb-5">
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>Highway Distance & Driving Times</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {RESTAURANT_INFO.distanceGuide.map((d) => (
                    <div key={d.city} className="bg-[#070e1d] p-2 rounded-lg border border-amber-500/15 flex justify-between items-center">
                      <span className="text-amber-200/80">{d.city}</span>
                      <span className="font-bold text-amber-400">{d.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highway Amenities */}
              <div className="space-y-1.5 text-xs text-amber-200/80 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>200+ Secure parking spots with EV fast chargers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Air-conditioned family haveli dining & open garden</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Open till 3:30 AM every night</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-amber-500/20">
              <button
                onClick={handleOpenMaps}
                className="gold-btn flex-1 py-2.5 px-4 rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Navigation className="w-3.5 h-3.5 text-slate-900" />
                <span>Get Driving Directions</span>
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="bg-[#12254d] hover:bg-[#163063] border border-amber-400/40 text-amber-100 py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Concierge</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
