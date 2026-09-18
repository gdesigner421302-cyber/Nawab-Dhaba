import React from 'react';
import { Utensils, Sparkles, Star, Clock } from 'lucide-react';
import { heroImg, RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onViewMenu: () => void;
  onBookTable: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewMenu }) => {
  return (
    <section 
      id="hero-section" 
      className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-amber-500/30 shadow-2xl min-h-[460px] md:min-h-[520px] flex items-center justify-center text-center p-6 md:p-12"
    >
      {/* Background Image with warm atmospheric overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Nawab Dhaba Open Air Night Ambience" 
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-85"
        />
        {/* Rich cinematic vignette and warm amber-navy gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091428] via-[#091428]/60 to-[#091428]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#091428]/40 to-[#091428]/85" />
      </div>

      {/* Decorative Hanging Lantern Elements (as pictured in reference) */}
      <div className="absolute top-0 left-6 md:left-12 flex flex-col items-center pointer-events-none z-10 opacity-80">
        <div className="w-0.5 h-14 bg-amber-400/40" />
        <div className="w-6 h-9 rounded-md bg-amber-500/20 border border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.6)] flex items-center justify-center">
          <div className="w-2.5 h-4 rounded-full bg-amber-300 blur-[1px] animate-pulse" />
        </div>
      </div>

      <div className="absolute top-0 right-6 md:right-12 flex flex-col items-center pointer-events-none z-10 opacity-80">
        <div className="w-0.5 h-20 bg-amber-400/40" />
        <div className="w-7 h-10 rounded-md bg-amber-500/20 border border-amber-400/60 shadow-[0_0_18px_rgba(251,191,36,0.6)] flex items-center justify-center">
          <div className="w-3 h-4 rounded-full bg-amber-300 blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Subtle royal crest tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-400/40 text-amber-200 text-xs tracking-widest uppercase font-medium mb-4 backdrop-blur-md shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Mughlai Royalty on the Highway</span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span>Bhiwandi NH-160</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-cinzel text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight md:leading-snug mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          <span className="text-amber-100">Nawab Dhaba, Bhiwandi:</span>{' '}
          <span className="gold-gradient-text block sm:inline">Experience the Royal Flavors of India.</span>
        </h1>

        {/* Sub-text */}
        <p className="font-marcellus text-base sm:text-lg md:text-xl text-amber-100/90 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          {RESTAURANT_INFO.subtext}
        </p>

        {/* Primary Call To Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onViewMenu}
            className="gold-btn text-slate-950 font-bold px-8 py-3.5 rounded-full text-sm md:text-base tracking-wider uppercase flex items-center gap-2.5 cursor-pointer shadow-xl transform hover:scale-105 transition-all"
            id="hero-order-cta-btn"
          >
            <Utensils className="w-4 h-4 text-slate-900" />
            <span>VIEW MENU & ORDER NOW</span>
          </button>
        </div>

        {/* Highlight trust badges bar */}
        <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-amber-200/80">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-bold text-amber-100">4.8 Rating</span>
            <span className="text-amber-400/60">(12,450+ Reviews)</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-amber-400/40" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Open Till 3:30 AM</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-amber-400/40" />
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Tandoor Blazing</span>
          </div>
        </div>

      </div>
    </section>
  );
};
