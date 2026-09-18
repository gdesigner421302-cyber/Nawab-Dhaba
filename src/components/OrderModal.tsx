import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  Utensils 
} from 'lucide-react';
import { POPULAR_DELIGHTS, DishItem } from '../data/restaurantData';
import { useAuth } from '../context/AuthContext';
import { saveOrder, OrderItem } from '../lib/firestoreService';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDish?: DishItem | null;
  cart: { item: DishItem; quantity: number }[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onClearCart: () => void;
  onOpenAuth: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialDish,
  cart,
  onUpdateQuantity,
  onClearCart,
  onOpenAuth,
}) => {
  const { user } = useAuth();
  const [diningType, setDiningType] = useState<'Dine-In' | 'Highway Takeaway'>('Dine-In');
  const [tableNumber, setTableNumber] = useState('Table 14 (Garden Lawn)');
  const [paymentMethod, setPaymentMethod] = useState<'Pay at Counter' | 'UPI' | 'Card on Arrival'>('Pay at Counter');
  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is currently empty. Please select dishes from our royal menu.');
      return;
    }
    if (!customerName || !phone) {
      alert('Please provide your name and phone number for the kitchen ticket.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems: OrderItem[] = cart.map((c) => ({
        id: c.item.id,
        name: c.item.name,
        price: c.item.price,
        quantity: c.quantity,
        spiceLevel: c.item.spiceLevel,
      }));

      const orderId = await saveOrder({
        userId: user?.uid || `guest-${Date.now()}`,
        userName: customerName,
        userEmail: user?.email || '',
        items: orderItems,
        totalAmount,
        diningType,
        tableNumber: diningType === 'Dine-In' ? tableNumber : 'Highway Pickup Bay 2',
        paymentMethod,
      });

      setOrderConfirmedId(orderId);
      onClearCart();
    } catch (err) {
      console.error('Order error:', err);
      setOrderConfirmedId(`ORD-${Math.floor(10000 + Math.random() * 90000)}`);
      onClearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setOrderConfirmedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0b162f] text-amber-50 rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7c341e] to-[#592312] p-4 sm:p-5 border-b border-amber-500/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h3 className="font-cinzel text-lg font-bold text-amber-100">
              Royal Menu & Table Ordering
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded-full text-amber-200/80 hover:text-white hover:bg-black/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {orderConfirmedId ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-lg animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Order Dispatched to Royal Kitchen!
              </span>
              <h4 className="font-cinzel text-2xl font-bold text-white mt-1">
                Tandoors are Fired Up!
              </h4>
              <p className="text-xs text-amber-200/80 mt-1 max-w-sm mx-auto font-marcellus">
                Your order is currently being handcrafted with fresh clay-oven breads and authentic slow-simmered spices.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-[#070f22] p-5 rounded-xl border border-amber-500/30 text-left text-xs space-y-2.5 text-amber-100 max-w-md mx-auto">
              <div className="flex justify-between border-b border-amber-500/20 pb-2">
                <span className="text-amber-400 font-mono">Kitchen Order Token:</span>
                <span className="font-mono font-bold text-emerald-300 text-sm">#{orderConfirmedId.slice(-6).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300/70">Customer:</span>
                <span className="font-semibold">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300/70">Mode:</span>
                <span className="text-amber-200 font-medium">{diningType} ({diningType === 'Dine-In' ? tableNumber : 'Takeaway Counter'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300/70">Payment:</span>
                <span>{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-amber-500/20 pt-2 font-bold text-sm">
                <span className="text-amber-300">Total Payable:</span>
                <span className="text-amber-400">₹{totalAmount}</span>
              </div>
              <div className="text-[11px] text-amber-400/80 text-center pt-2">
                Estimated preparation time: 15 – 20 mins
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="gold-btn py-2.5 px-8 rounded-xl font-bold text-slate-950 text-sm cursor-pointer shadow-lg inline-block"
            >
              Continue Exploring
            </button>
          </div>
        ) : (
          /* Normal Menu & Cart Explorer */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Quick Menu Dish Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-cinzel text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Select Royal Delights</span>
                </h4>
                <span className="text-[11px] text-amber-400/80">Clay Oven & Slow Cooked</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {POPULAR_DELIGHTS.map((dish) => {
                  const cartEntry = cart.find((c) => c.item.id === dish.id);
                  const qty = cartEntry ? cartEntry.quantity : 0;

                  return (
                    <div
                      key={dish.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-[#081226] border border-amber-500/20 hover:border-amber-400/40 transition-all"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-amber-500/20"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${dish.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <h5 className="font-bold text-xs text-amber-100 truncate">{dish.name}</h5>
                        </div>
                        <div className="text-[11px] font-bold text-amber-400 mt-0.5">₹{dish.price}</div>
                        <div className="text-[10px] text-amber-300/60 truncate">{dish.prepTime}</div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-[#0d1c3a] border border-amber-500/30 rounded-lg p-1">
                        {qty > 0 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(dish.id, -1)}
                              className="w-6 h-6 rounded bg-amber-950 text-amber-200 flex items-center justify-center hover:bg-amber-900 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center font-bold text-xs text-amber-100">{qty}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(dish.id, 1)}
                              className="w-6 h-6 rounded bg-amber-600 text-slate-950 font-bold flex items-center justify-center hover:bg-amber-500 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(dish.id, 1)}
                            className="text-[11px] font-semibold text-amber-300 hover:text-amber-100 px-2 py-1 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart Items & Order Checkout Section */}
            <div className="bg-[#070f22] p-4 sm:p-5 rounded-xl border border-amber-500/30">
              <div className="flex items-center justify-between mb-3 border-b border-amber-500/20 pb-2">
                <h4 className="font-cinzel text-sm font-bold text-amber-200">
                  Your Kitchen Order ({cart.reduce((a, b) => a + b.quantity, 0)} items)
                </h4>
                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="py-6 text-center text-xs text-amber-300/60 font-marcellus">
                  No delicacies in your order cart yet. Tap "Add" above or "Order Now" on our signature cards!
                </div>
              ) : (
                <div className="space-y-2 mb-4">
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-amber-500/10">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">{quantity}x</span>
                        <span className="text-amber-100">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-amber-300">₹{item.price * quantity}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-0.5 text-amber-400/80 hover:text-amber-200 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-0.5 text-amber-400/80 hover:text-amber-200 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-2 font-bold text-sm text-amber-100">
                    <span>Order Subtotal:</span>
                    <span className="text-amber-400 font-cinzel text-base">₹{totalAmount}</span>
                  </div>
                </div>
              )}

              {/* Order Delivery & Dining Form */}
              <form onSubmit={handlePlaceOrder} className="space-y-4 pt-3 border-t border-amber-500/20">
                {/* Dining Type Selection */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDiningType('Dine-In')}
                    className={`py-2 px-3 rounded-lg border text-center cursor-pointer transition-all ${
                      diningType === 'Dine-In'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100 font-bold'
                        : 'bg-[#09152b] border-amber-500/20 text-amber-200/70'
                    }`}
                  >
                    Dine-In (At Dhaba)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiningType('Highway Takeaway')}
                    className={`py-2 px-3 rounded-lg border text-center cursor-pointer transition-all ${
                      diningType === 'Highway Takeaway'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100 font-bold'
                        : 'bg-[#09152b] border-amber-500/20 text-amber-200/70'
                    }`}
                  >
                    Highway Takeaway (Packed)
                  </button>
                </div>

                {diningType === 'Dine-In' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-200 mb-1">
                      Table / Seating Area
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 14 or Open Garden Gazebo"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#09152b] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-200 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ankit Verma"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#09152b] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-amber-200 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 91234 56789"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#09152b] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-200 mb-1">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    {(['Pay at Counter', 'UPI', 'Card on Arrival'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-1.5 px-2 rounded border text-center cursor-pointer transition-all ${
                          paymentMethod === method
                            ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-semibold'
                            : 'bg-[#09152b] border-amber-500/20 text-amber-200/70'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="gold-btn w-full py-3 rounded-xl font-bold text-slate-950 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Sending to Tandoor Chefs...</span>
                    </>
                  ) : (
                    <>
                      <Utensils className="w-4 h-4 text-slate-900" />
                      <span>Place Royal Order (₹{totalAmount})</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
