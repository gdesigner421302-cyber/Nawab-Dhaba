import React from 'react';
import { Flame, Trees, UtensilsCrossed, Users, Car } from 'lucide-react';
import { WHY_NAWAB_DHABA } from '../data/restaurantData';

const iconMap = {
  Flame: Flame,
  Trees: Trees,
  UtensilsCrossed: UtensilsCrossed,
  Users: Users,
  Car: Car
};

export const WhyNawabDhaba: React.FC = () => {
  return (
    <section id="why-nawab-section" className="py-6 my-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border-y border-amber-500/20 rounded-2xl p-6 backdrop-blur-xs">
      <div className="text-center mb-6">
        <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-100 tracking-wider">
          Why Nawab Dhaba?
        </h2>
        <div className="w-16 h-0.5 bg-amber-400/60 mx-auto mt-2" />
      </div>

      {/* 5 Key Highlights Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {WHY_NAWAB_DHABA.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Flame;
          return (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-3.5 rounded-xl bg-[#0d1c3a]/70 border border-amber-500/20 hover:border-amber-400/50 hover:bg-[#0f2247] transition-all duration-200 group"
              id={`why-item-${item.id}`}
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-2.5 group-hover:scale-110 group-hover:text-amber-200 transition-transform shadow-inner">
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-sm font-bold text-amber-100 mb-1 group-hover:text-amber-300 transition-colors whitespace-nowrap">
                {item.title}
              </h3>
              <p className="text-[11px] text-amber-200/70 leading-snug">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
