import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PopularDelights } from './components/PopularDelights';
import { WhyNawabDhaba } from './components/WhyNawabDhaba';
import { RightPanelSpotlight } from './components/RightPanelSpotlight';
import { LocateUs } from './components/LocateUs';
import { Footer } from './components/Footer';
import { BookTableModal } from './components/BookTableModal';
import { OrderModal } from './components/OrderModal';
import { AuthModal } from './components/AuthModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { POPULAR_DELIGHTS, DishItem } from './data/restaurantData';

export function NawabDhabaApp() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);

  // Cart state
  const [cart, setCart] = useState<{ item: DishItem; quantity: number }[]>([
    { item: POPULAR_DELIGHTS[0], quantity: 1 }, // Default sample Murgh Musallam
    { item: POPULAR_DELIGHTS[3], quantity: 1 }  // Default sample Naan Basket
  ]);

  const handleOrderDish = (dish: DishItem) => {
    setSelectedDish(dish);
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === dish.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === dish.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
    setIsOrderModalOpen(true);
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === dishId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as { item: DishItem; quantity: number }[];
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotalItems = cart.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <div className="min-h-screen bg-mughal-pattern text-amber-50 relative selection:bg-amber-500 selection:text-slate-900 pb-12">
      {/* Decorative Golden Ambient Vignettes */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Desktop Landing Frame Container */}
      <div className="max-w-[1520px] mx-auto px-2 sm:px-4 md:px-6 pt-2 md:pt-4">
        
        {/* Outer Frame with Gold Trim */}
        <div className="bg-[#091428] rounded-2xl md:rounded-3xl border border-amber-500/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Top Navigation Bar */}
          <Navbar
            onBookTable={() => setIsBookModalOpen(true)}
            onViewMenu={() => setIsOrderModalOpen(true)}
            onOpenOrders={() => setIsDashboardOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            cartCount={cartTotalItems}
          />

          {/* Integrated Dual-Panel Body Layout */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
              
              {/* Left Panel (Main Showcase) */}
              <div className="flex-1 w-full space-y-6">
                
                {/* 1. Hero Section */}
                <HeroSection
                  onViewMenu={() => setIsOrderModalOpen(true)}
                  onBookTable={() => setIsBookModalOpen(true)}
                />

                {/* 2. Popular Royal Delights Section */}
                <PopularDelights
                  onOrderDish={handleOrderDish}
                />

                {/* 3. "Why Nawab Dhaba?" Section */}
                <WhyNawabDhaba />

                {/* 4. "Locate Us" Highway Map Section */}
                <LocateUs />

              </div>

              {/* Right Panel Integration (Live Tandoor Spotlight, Checklist, Mini-Map Card) */}
              <RightPanelSpotlight
                onBookTable={() => setIsBookModalOpen(true)}
                onViewMenu={() => setIsOrderModalOpen(true)}
              />

            </div>
          </div>

          {/* Footer & Location Compliance Bar */}
          <Footer
            onBookTable={() => setIsBookModalOpen(true)}
            onViewMenu={() => setIsOrderModalOpen(true)}
          />

        </div>

      </div>

      {/* Modals & Slide-outs */}
      <BookTableModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedDish(null);
        }}
        initialDish={selectedDish}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <UserDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onBookTable={() => setIsBookModalOpen(true)}
        onViewMenu={() => setIsOrderModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NawabDhabaApp />
    </AuthProvider>
  );
}
