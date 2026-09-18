import React, { useEffect, useState } from 'react';
import { X, Calendar, ShoppingBag, Clock, MapPin, Loader2, CheckCircle, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  fetchUserReservations, 
  fetchUserOrders, 
  ReservationData, 
  OrderData 
} from '../lib/firestoreService';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTable: () => void;
  onViewMenu: () => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  onBookTable,
  onViewMenu,
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'reservations' | 'orders'>('reservations');
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !user) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [resList, ordList] = await Promise.all([
          fetchUserReservations(user.uid),
          fetchUserOrders(user.uid),
        ]);
        setReservations(resList);
        setOrders(ordList);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0b162f] text-amber-50 rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7c341e] to-[#592312] p-5 border-b border-amber-500/30 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-amber-100">
              My Bookings & Orders
            </h3>
            <p className="text-[11px] text-amber-300/80">
              {user?.displayName || 'Royal Diner'} ({user?.email || 'Guest Traveler'})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-amber-200/80 hover:text-white hover:bg-black/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-amber-500/20 bg-[#081226] text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'reservations'
                ? 'border-b-2 border-amber-400 text-amber-200 bg-amber-500/10'
                : 'text-amber-300/60 hover:text-amber-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Table Reservations ({reservations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'orders'
                ? 'border-b-2 border-amber-400 text-amber-200 bg-amber-500/10'
                : 'text-amber-300/60 hover:text-amber-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Kitchen Orders ({orders.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-amber-300 gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs">Fetching your records from Firestore...</span>
            </div>
          ) : activeTab === 'reservations' ? (
            /* Reservations Tab */
            reservations.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <Calendar className="w-10 h-10 text-amber-400/40 mx-auto" />
                <p className="text-xs text-amber-200/70 font-marcellus">
                  You do not have any active table reservations at Nawab Dhaba yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onBookTable();
                  }}
                  className="gold-btn py-2 px-5 rounded-full text-slate-950 font-bold text-xs cursor-pointer inline-block"
                >
                  Book a Table Now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#070f22] p-4 rounded-xl border border-amber-500/25 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-amber-500/15 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">
                          #{res.id?.slice(-6).toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                          {res.status.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-amber-300/80">{res.date}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-amber-100">
                      <div>
                        <span className="text-amber-400/70 block text-[10px]">Time Slot:</span>
                        <span className="font-medium">{res.timeSlot}</span>
                      </div>
                      <div>
                        <span className="text-amber-400/70 block text-[10px]">Guests:</span>
                        <span className="font-medium">{res.partySize} People</span>
                      </div>
                      <div>
                        <span className="text-amber-400/70 block text-[10px]">Seating Area:</span>
                        <span className="font-medium">{res.seatingPreference}</span>
                      </div>
                      <div>
                        <span className="text-amber-400/70 block text-[10px]">Contact Phone:</span>
                        <span className="font-medium">{res.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Orders Tab */
            orders.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <ShoppingBag className="w-10 h-10 text-amber-400/40 mx-auto" />
                <p className="text-xs text-amber-200/70 font-marcellus">
                  No orders placed under your account yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onViewMenu();
                  }}
                  className="gold-btn py-2 px-5 rounded-full text-slate-950 font-bold text-xs cursor-pointer inline-block"
                >
                  Explore Royal Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-[#070f22] p-4 rounded-xl border border-amber-500/25 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-amber-500/15 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">
                          #{ord.id?.slice(-6).toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-semibold border border-amber-500/30 flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5 text-amber-400" />
                          <span>{ord.status.toUpperCase()}</span>
                        </span>
                      </div>
                      <span className="font-bold text-amber-300">₹{ord.totalAmount}</span>
                    </div>

                    <div className="text-amber-200/90 text-xs">
                      <span className="text-amber-400/70 block text-[10px] mb-1">Delicacies:</span>
                      <ul className="space-y-1">
                        {ord.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-amber-100">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-amber-500/10 flex justify-between text-[11px] text-amber-300/70">
                      <span>Dining: {ord.diningType}</span>
                      <span>Payment: {ord.paymentMethod}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
};
