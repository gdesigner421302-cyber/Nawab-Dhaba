import React, { useState } from 'react';
import { Crown, Phone, Calendar, User as UserIcon, LogOut, ShoppingBag, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onBookTable: () => void;
  onViewMenu: () => void;
  onOpenOrders: () => void;
  onOpenAuth: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookTable,
  onViewMenu,
  onOpenOrders,
  onOpenAuth,
  cartCount,
}) => {
  const { user, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#7c341e] via-[#6d2c18] to-[#592312] text-amber-50 px-4 md:px-8 py-3.5 border-b border-amber-500/30 shadow-lg relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div 
          onClick={() => scrollToSection('hero-section')}
          className="flex items-center gap-3 cursor-pointer group"
          id="navbar-brand-logo"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 flex items-center justify-center shadow-md border border-amber-300/40 transform group-hover:scale-105 transition-transform">
            <Crown className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel text-xl md:text-2xl font-bold tracking-wider text-amber-200 group-hover:text-amber-100 transition-colors">
                Nawab Dhaba
              </span>
            </div>
            <div className="text-[10px] tracking-widest text-amber-300/80 font-serif uppercase -mt-0.5">
              हवेली ढाबा · Bhiwandi
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm tracking-wide font-medium text-amber-100/90">
          <button 
            onClick={() => scrollToSection('hero-section')}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            id="nav-link-home"
          >
            Home
          </button>
          <button 
            onClick={onViewMenu}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            id="nav-link-menu"
          >
            Our Menu
          </button>
          <button 
            onClick={() => scrollToSection('delights-section')}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            id="nav-link-delights"
          >
            Royal Delights
          </button>
          <button 
            onClick={() => scrollToSection('why-nawab-section')}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            id="nav-link-about"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('locate-us-section')}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
            id="nav-link-location"
          >
            Location
          </button>
        </nav>

        {/* Right: Contact & Action Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Call Now */}
          <a 
            href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
            className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-amber-200/95 hover:text-amber-100 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/30 px-3 py-1.5 rounded-full transition-all"
            id="navbar-call-btn"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-medium whitespace-nowrap">
              <span className="text-[11px] text-amber-300/80 block -mb-1">Call Now</span>
              {RESTAURANT_INFO.phone}
            </span>
          </a>

          {/* Cart / Menu order trigger button */}
          <button
            onClick={onViewMenu}
            className="relative p-2 rounded-full bg-amber-900/50 hover:bg-amber-800/60 border border-amber-500/30 text-amber-200 hover:text-amber-100 transition-colors cursor-pointer"
            title="View Order Cart"
            id="navbar-cart-btn"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Book a Table CTA button */}
          <button
            onClick={onBookTable}
            className="gold-btn text-slate-950 font-semibold px-4 md:px-5 py-2 rounded-full text-xs md:text-sm tracking-wide flex items-center gap-1.5 cursor-pointer shadow-md transform hover:scale-105 transition-all"
            id="navbar-book-table-btn"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Table</span>
          </button>

          {/* User Auth Profile */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-full bg-amber-950/60 border border-amber-400/40 hover:border-amber-400 transition-colors cursor-pointer"
                id="navbar-user-profile-btn"
              >
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="w-7 h-7 rounded-full object-cover border border-amber-300"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-amber-100 flex items-center justify-center font-bold text-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs bg-amber-900/40 hover:bg-amber-900/70 border border-amber-500/30 text-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
                id="navbar-login-btn"
              >
                <UserIcon className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Dropdown Menu */}
            {showUserDropdown && user && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0f1d38] border border-amber-500/30 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-amber-500/20">
                  <div className="font-semibold text-amber-200 truncate">
                    {user.displayName || 'Royal Diner'}
                  </div>
                  <div className="text-[11px] text-amber-400/70 truncate">
                    {user.email || 'Guest Traveler'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    onOpenOrders();
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-amber-500/10 text-amber-100 flex items-center gap-2 cursor-pointer"
                  id="user-dropdown-reservations"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  My Bookings & Orders
                </button>

                <button
                  onClick={async () => {
                    setShowUserDropdown(false);
                    await logout();
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-red-500/10 text-red-300 flex items-center gap-2 cursor-pointer border-t border-amber-500/10 mt-1"
                  id="user-dropdown-logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
