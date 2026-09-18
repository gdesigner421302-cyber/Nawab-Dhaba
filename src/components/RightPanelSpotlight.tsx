import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  ExternalLink 
} from 'lucide-react';
import { tandoorImg, RESTAURANT_INFO, WHY_NAWAB_DHABA } from '../data/restaurantData';

interface RightPanelSpotlightProps {
  onBookTable: () => void;
  onViewMenu: () => void;
}

export const RightPanelSpotlight: React.FC<RightPanelSpotlightProps> = ({
  onBookTable,
  onViewMenu,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent("Nawab Dhaba, Mumbai-Nashik Highway, Bhiwandi");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <aside 
      id="right-spotlight-panel" 
      className="w-full lg:w-[380px] xl:w-[410px] flex-shrink-0 flex flex-col gap-5"
    >
      {/* 1. Live Tandoor & Kitchen Prep Spotlight */}
      <div className="bg-gradient-to-b from-[#112347] via-[#0d1d3b] to-[#0a162e] rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl">
        
        {/* Tandoor Photo Container */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={tandoorImg}
            alt="Live Tandoor & Royal Kitchen Prep at Nawab Dhaba"
            className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
          />
          {/* Gradients and live badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a162e] via-transparent to-black/40" />

          <div className="absolute top-3 left-3 bg-red-900/90 text-amber-200 border border-red-500/40 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>LIVE TANDOOR BLOW</span>
          </div>

          <div className="absolute top-3 right-3 bg-amber-950/80 backdrop-blur-xs text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-md font-medium">
            Clay Charcoal Ovens
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <div>
              <div className="font-cinzel font-bold text-amber-200 text-sm drop-shadow-md">
                Royal Kitchen Prep
              </div>
              <div className="text-[11px] text-amber-300/80">
                Freshly Baked Naan & Spiced Kebabs
              </div>
            </div>
            <button
              onClick={onViewMenu}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full shadow-md transition-colors cursor-pointer"
            >
              Order Tandoori
            </button>
          </div>
        </div>

        {/* Kitchen description and highlights */}
        <div className="p-4 text-xs text-amber-100/90 space-y-2.5">
          <p className="text-[12px] leading-relaxed text-amber-200/80 font-marcellus">
            Our master ustaads fire ancestral clay tandoors with wood charcoal, infusing authentic smoky depth into every naan, roti, and succulent seekh kebab.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-500/20">
            <div className="bg-[#081226]/80 p-2 rounded-lg border border-amber-500/15">
              <span className="text-[10px] text-amber-400 block font-medium">Operating Hours</span>
              <span className="font-bold text-white text-xs">12 PM - 3:30 AM</span>
            </div>
            <div className="bg-[#081226]/80 p-2 rounded-lg border border-amber-500/15">
              <span className="text-[10px] text-amber-400 block font-medium">Hygiene Rating</span>
              <span className="font-bold text-white text-xs">5-Star FSSAI Pure</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "Why Nawab Dhaba?" Right Spotlight Highlights */}
      <div className="bg-gradient-to-b from-[#112347] to-[#0a162e] rounded-2xl border border-amber-500/25 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-cinzel text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Why Nawab Dhaba?</span>
          </h3>
          <span className="text-[10px] text-amber-400/80 font-medium">Highway Favorite</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {WHY_NAWAB_DHABA.map((item) => (
            <div 
              key={item.id} 
              className="flex items-start gap-2.5 p-2 rounded-lg bg-[#081226]/60 border border-amber-500/10 hover:border-amber-400/30 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-100">{item.title}</div>
                <div className="text-[11px] text-amber-300/70">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. "Locate Us" Interactive Highway Map Card */}
      <div className="bg-gradient-to-b from-[#7c341e] via-[#6d2c18] to-[#592312] rounded-2xl border border-amber-400/40 p-4 shadow-2xl text-amber-50 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-300/50 flex items-center justify-center text-amber-300">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-amber-100">
                Locate Us
              </h3>
              <p className="text-[10px] text-amber-300/80 font-serif">
                Mumbai-Nashik Highway (NH-160)
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyAddress}
            className="text-[11px] bg-black/20 hover:bg-black/40 border border-amber-400/30 px-2 py-1 rounded text-amber-200 flex items-center gap-1 transition-colors cursor-pointer"
            title="Copy address"
          >
            <Copy className="w-3 h-3" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Stylized Interactive Highway Map Canvas */}
        <div 
          onClick={handleOpenGoogleMaps}
          className="relative h-44 rounded-xl overflow-hidden border border-amber-400/30 my-3 cursor-pointer group bg-[#e5dfd3] shadow-inner"
        >
          {/* Map Vector Graphic Background simulating road network */}
          <svg className="w-full h-full" viewBox="0 0 360 170" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="170" fill="#eae4d3"/>
            
            {/* Green terrain patches */}
            <path d="M0 0 H140 L110 50 L30 70 L0 100 Z" fill="#d9dfcb"/>
            <path d="M220 100 L360 70 V170 H200 Z" fill="#d7dfc7"/>
            <path d="M280 0 H360 V60 L280 20 Z" fill="#dfe5d0"/>

            {/* Secondary roads */}
            <path d="M40 0 C60 40 70 80 80 170" stroke="#ffffff" strokeWidth="4"/>
            <path d="M260 0 C240 50 250 110 270 170" stroke="#ffffff" strokeWidth="4"/>
            <path d="M0 130 Q160 110 360 140" stroke="#ffffff" strokeWidth="5"/>

            {/* Mumbai - Nashik Expressway NH 160 Main Artery */}
            <path d="M0 30 Q140 70 360 115" stroke="#f6ad55" strokeWidth="10" strokeLinecap="round"/>
            <path d="M0 30 Q140 70 360 115" stroke="#dd6b20" strokeWidth="2" strokeDasharray="6 6"/>

            {/* Road Label */}
            <text x="35" y="42" fill="#7b341e" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
              NH 160 (Mumbai - Nashik Expressway)
            </text>
            <text x="10" y="16" fill="#4a5568" fontSize="8" fontFamily="sans-serif">
              ← To Thane / Mumbai
            </text>
            <text x="260" y="132" fill="#4a5568" fontSize="8" fontFamily="sans-serif">
              To Nashik / Igatpuri →
            </text>
            <text x="210" y="162" fill="#4a5568" fontSize="8" fontFamily="sans-serif">
              Bhiwandi Bypass
            </text>

            {/* Animated Pin at Nawab Dhaba */}
            <g transform="translate(195, 80)">
              {/* Pulse circle */}
              <circle cx="0" cy="0" r="14" fill="#e53e3e" opacity="0.3" className="animate-ping"/>
              <circle cx="0" cy="0" r="8" fill="#c53030"/>
              {/* Pin Icon */}
              <path d="M0 -14 C-7 -14 -11 -9 -11 -3 C-11 5 0 16 0 16 C0 16 11 5 11 -3 C11 -9 7 -14 0 -14 Z" fill="#e53e3e"/>
              <circle cx="0" cy="-4" r="3.5" fill="#ffffff"/>
            </g>
          </svg>

          {/* Overlay Tag */}
          <div className="absolute top-2 left-2 bg-slate-900/90 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/40 flex items-center gap-1 shadow">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Nawab Dhaba Bhiwandi</span>
          </div>

          {/* Hover hint */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
            <Navigation className="w-4 h-4 text-amber-300" />
            <span>Click to Open in Google Maps</span>
          </div>
        </div>

        {/* Address & Driving Landmarks */}
        <div className="text-xs space-y-2">
          <p className="text-amber-100/95 leading-relaxed font-sans">
            {RESTAURANT_INFO.address}
          </p>

          <div className="text-[11px] text-amber-300/90 flex items-center gap-1.5 font-medium">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Landmark: {RESTAURANT_INFO.landmark}</span>
          </div>

          {/* Quick Action Buttons inside Card */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="bg-amber-950/80 hover:bg-amber-900 border border-amber-400/40 text-amber-100 text-[11px] font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Call Helpline</span>
            </a>

            <button
              onClick={onBookTable}
              className="gold-btn text-slate-950 text-[11px] font-bold py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <span>Reserve Table</span>
            </button>
          </div>
        </div>

      </div>

    </aside>
  );
};
