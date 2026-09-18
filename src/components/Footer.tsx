import React from 'react';
import { Crown, Phone, Mail, MapPin, Instagram, Facebook, Youtube, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onBookTable: () => void;
  onViewMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookTable, onViewMenu }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070e1d] text-amber-100/80 border-t border-amber-500/25 pt-12 pb-8 px-4 md:px-8 mt-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Royalty */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center border border-amber-300/50 shadow-md">
                <Crown className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold text-amber-200 block">
                  Nawab Dhaba
                </span>
                <span className="text-[10px] tracking-widest text-amber-400 font-serif uppercase">
                  हवेली ढाबा · Bhiwandi
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-200/70 leading-relaxed font-marcellus">
              Serving the finest royal Mughlai traditions, sizzling tandoori delicacies, and rich curries to highway travelers and connoisseurs on the Mumbai-Nashik corridor since 2012.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#0d1c3a] border border-amber-500/30 hover:border-amber-400 flex items-center justify-center text-amber-300 hover:text-amber-100 hover:bg-amber-600/20 transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#0d1c3a] border border-amber-500/30 hover:border-amber-400 flex items-center justify-center text-amber-300 hover:text-amber-100 hover:bg-amber-600/20 transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#0d1c3a] border border-amber-500/30 hover:border-amber-400 flex items-center justify-center text-amber-300 hover:text-amber-100 hover:bg-amber-600/20 transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-200 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => scrollTo('hero-section')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={onViewMenu} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Our Royal Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={onBookTable} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Book a Table / Gazebo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('delights-section')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Popular Royal Delights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('why-nawab-section')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Why Nawab Dhaba
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('locate-us-section')} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Highway Directions & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Timings & Highway Concierge */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-200 tracking-wider uppercase">
              Timings & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-amber-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-amber-300">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>concierge@nawabdhaba.in</span>
              </div>
              <div className="pt-2 border-t border-amber-500/15 text-[11px] text-amber-300">
                <span className="font-semibold block">Hours: 12:00 PM – 3:30 AM Daily</span>
                <span className="text-amber-400/70">Late night dining & takeaway available</span>
              </div>
            </div>
          </div>

          {/* Col 4: FSSAI Compliance & Food Safety */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-sm font-bold text-amber-200 tracking-wider uppercase">
              Food Safety & Hygiene
            </h4>
            
            {/* FSSAI Badge Container as depicted in reference */}
            <div className="bg-[#0b162d] p-3.5 rounded-xl border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="px-2 py-1 bg-amber-400/20 border border-amber-400/50 rounded font-black text-amber-300 tracking-tighter text-xs">
                  fssai
                </div>
                <div>
                  <div className="text-[11px] font-bold text-amber-100">
                    Govt of India Certified
                  </div>
                  <div className="text-[10px] text-amber-400/80 font-mono">
                    Lic. No: {RESTAURANT_INFO.fssaiNumber}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-amber-200/70 leading-normal">
                100% Halal certified meats, pure clarified ghee, and daily quality-tested dairy.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Clean Kitchens & Filtered RO Water</span>
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer Bar */}
        <div className="pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-400/60">
          <div>
            © Nawab Dhaba Bhiwandi 2026. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Dining</span>
            <span>·</span>
            <span className="text-amber-300/80">Mumbai-Nashik Expressway Corridor</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
