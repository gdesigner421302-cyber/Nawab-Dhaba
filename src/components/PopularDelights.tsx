import React from 'react';
import { ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { POPULAR_DELIGHTS, DishItem } from '../data/restaurantData';

interface PopularDelightsProps {
  onOrderDish: (dish: DishItem) => void;
}

export const PopularDelights: React.FC<PopularDelightsProps> = ({ onOrderDish }) => {
  return (
    <section id="delights-section" className="py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium tracking-widest uppercase mb-2">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Signature Offerings</span>
        </div>
        <h2 className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-amber-100 tracking-wide">
          Popular Royal Delights
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-3" />
        <p className="text-amber-200/70 text-sm mt-2 max-w-xl mx-auto font-marcellus">
          Heirloom recipes perfected over generations, prepared fresh with hand-churned dairy & royal aromatic spices.
        </p>
      </div>

      {/* Grid of 4 Signature Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {POPULAR_DELIGHTS.map((dish) => (
          <div
            key={dish.id}
            className="group bg-[#fffcf7] text-slate-800 rounded-xl overflow-hidden shadow-lg border border-amber-200/60 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            id={`food-card-${dish.id}`}
          >
            {/* Dish Photo */}
            <div className="relative h-44 sm:h-48 overflow-hidden bg-amber-100/50">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-500"
              />
              
              {/* Veg / Non-Veg Indicator */}
              <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs p-1 rounded border border-gray-200 shadow-sm flex items-center justify-center">
                <span 
                  className={`w-2.5 h-2.5 rounded-full ${dish.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`}
                  title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                />
              </div>

              {/* Badge */}
              {dish.badge && (
                <div className="absolute top-2.5 right-2.5 bg-amber-900/90 text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-400/30 shadow-sm">
                  {dish.badge}
                </div>
              )}

              {/* Price Tag Overlay */}
              <div className="absolute bottom-2.5 right-2.5 bg-slate-950/85 backdrop-blur-xs text-amber-300 px-2.5 py-0.5 rounded-md font-bold text-sm shadow-md border border-amber-500/30">
                ₹{dish.price}
                {dish.originalPrice && (
                  <span className="text-[11px] text-gray-400 line-through ml-1.5 font-normal">
                    ₹{dish.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Dish Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-1 mb-1">
                  <h3 className="font-cinzel text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {dish.name}
                  </h3>
                </div>
                <div className="text-[11px] text-amber-700 font-medium mb-1.5 font-serif">
                  {dish.hindiName}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">
                  {dish.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="pt-2 border-t border-amber-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[11px] text-amber-800/80">
                  <Flame className="w-3 h-3 text-amber-600" />
                  <span>{dish.spiceLevel}</span>
                </div>

                <button
                  onClick={() => onOrderDish(dish)}
                  className="bg-gradient-to-r from-[#87341e] to-[#712814] hover:from-[#a03f25] hover:to-[#87341e] text-amber-100 font-medium text-xs px-3.5 py-1.5 rounded-lg shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all cursor-pointer transform active:scale-95"
                  id={`btn-order-${dish.id}`}
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
