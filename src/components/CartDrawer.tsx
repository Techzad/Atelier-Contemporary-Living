import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, color: string, delta: number) => void;
  onRemoveItem: (productId: string, color: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 1500;
  const deliveryCost = subtotal === 0 ? 0 : (isFreeDelivery ? 0 : 150);
  const totalAmount = subtotal + deliveryCost;

  // Progress to free delivery (complimentary over 1,500)
  const deliveryProgress = Math.min((subtotal / 1500) * 100, 100);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOrderId('ATL-' + Math.floor(100000 + Math.random() * 900000));
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      setIsCheckingOut(false);
      onClose();
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Cart Panel Slide-over */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-bg-warm z-50 flex flex-col justify-between shadow-2xl"
          >
            {/* Header */}
            <div className="bg-white p-6 border-b border-border-warm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent-gold" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-text-main">Your Shopping Bag ({cart.length})</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:text-accent-gold transition-colors text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle Scrollable Section */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
              
              {isOrdered ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-text-main uppercase tracking-wider">Purchase Successful!</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    Your order <strong>{orderId}</strong> has been secured. A beautiful invoice and delivery scheduling calendar slot has been sent to <strong>techseries358@gmail.com</strong>.
                  </p>
                  <p className="text-[10px] text-accent-gold italic font-medium pt-3 animate-pulse">
                    Returning you to the showroom showroom view...
                  </p>
                </div>
              ) : isCheckingOut ? (
                /* Checkout Form Panel */
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-accent-gold font-bold mb-1 block">White Glove Delivery details</span>
                    <h4 className="text-base font-semibold text-text-main font-sans">Shipping & Assembly Curation</h4>
                    <p className="text-[11px] text-text-secondary font-light">Enter delivery address details to establish carrier schedule slots.</p>
                  </div>

                  <div className="space-y-3.5 pt-4">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-text-main font-bold mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full text-xs p-3.5 border border-border-warm bg-white focus:outline-none focus:border-accent-gold text-text-main rounded-full px-5"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-text-main font-bold mb-1">Shipping Address</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="e.g. 12 Finchley Rd, Hampstead"
                        className="w-full text-xs p-3.5 border border-border-warm bg-white focus:outline-none focus:border-accent-gold text-text-main rounded-full px-5"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-text-main font-bold mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          placeholder="e.g. London"
                          className="w-full text-xs p-3.5 border border-border-warm bg-white focus:outline-none focus:border-accent-gold text-text-main rounded-full px-5"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-text-main font-bold mb-1">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={shippingZip}
                          onChange={(e) => setShippingZip(e.target.value)}
                          placeholder="e.g. NW3 6LS"
                          className="w-full text-xs p-3.5 border border-border-warm bg-white focus:outline-none focus:border-accent-gold text-text-main rounded-full px-5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown details in Form */}
                  <div className="bg-white border border-border-warm p-4 space-y-2 mt-6 text-xs rounded-2xl">
                    <div className="flex justify-between text-text-secondary">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-text-main">£{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>White Glove Shipping</span>
                      <span className="font-semibold text-text-main">
                        {deliveryCost === 0 ? 'Complimentary' : `£${deliveryCost}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-text-main pt-2 border-t border-border-warm/50">
                      <span>Total Invoice</span>
                      <span>£{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions inside form */}
                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="flex-1 bg-white border border-border-warm text-text-main hover:bg-stone-50 text-[11px] font-bold uppercase tracking-widest py-3.5 transition-colors text-center rounded-full"
                    >
                      Back To Bag
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-dark-main hover:bg-accent-gold text-white text-[11px] font-bold uppercase tracking-widest py-3.5 transition-colors text-center rounded-full"
                    >
                      Pay £{totalAmount.toLocaleString()}
                    </button>
                  </div>
                </form>
              ) : cart.length === 0 ? (
                /* Empty Cart View */
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 bg-white border border-border-warm rounded-full flex items-center justify-center mx-auto text-stone-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-text-secondary font-light">Your shopping bag is currently empty.</p>
                  <button
                    onClick={onClose}
                    className="text-xs font-bold uppercase tracking-widest text-accent-gold hover:underline"
                  >
                    Explore our Collections
                  </button>
                </div>
              ) : (
                /* Listed Cart Items */
                <div className="space-y-4.5">
                  {/* Free Delivery Tracker */}
                  <div className="bg-white border border-border-warm p-4 space-y-2 select-none rounded-2xl">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-text-main font-semibold">
                      <span>White Glove Logistics</span>
                      <span>
                        {isFreeDelivery
                          ? 'Complimentary Delivery Earned! ✓'
                          : `Spend £${(1500 - subtotal).toLocaleString()} more for free setup`}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-gold transition-all duration-500 rounded-full"
                        style={{ width: `${deliveryProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Item Rows */}
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor}-${idx}`}
                        className="bg-white border border-border-warm/60 p-3.5 flex gap-4 relative group rounded-2xl overflow-hidden"
                      >
                        {/* Remove item absolute button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                          className="absolute top-3.5 right-3.5 text-stone-300 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Image */}
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-18 h-18 object-cover shrink-0 bg-stone-50 border border-stone-100 rounded-xl"
                        />

                        {/* Text Specs */}
                        <div className="min-w-0 flex-1 space-y-1">
                          <h4 className="text-xs font-bold text-text-main truncate pr-6">
                            {item.product.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 text-[10px] text-text-secondary font-light">
                            <span>Color: <strong>{item.selectedColor}</strong></span>
                            {item.product.dimensions && (
                              <span>Size: {item.product.dimensions.split(' ')[0]}</span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-text-main pt-0.5">
                            £{item.product.price.toLocaleString()}
                          </p>

                          {/* Quantity adjusters */}
                          <div className="flex items-center gap-2 pt-2">
                            <span className="text-[10px] text-text-secondary font-light uppercase tracking-wider">Quantity:</span>
                            <div className="flex items-center border border-border-warm bg-bg-warm text-[10px] font-bold rounded-full overflow-hidden">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, -1)}
                                className="px-1.5 py-0.5 hover:text-accent-gold transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 py-0.5 text-center text-text-main w-6">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, 1)}
                                className="px-1.5 py-0.5 hover:text-accent-gold transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom totals & main CTAs */}
            {!isOrdered && cart.length > 0 && !isCheckingOut && (
              <div className="bg-white p-6 border-t border-border-warm space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span className="font-semibold text-text-main">£{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>White Glove Shipping</span>
                    <span className="font-semibold text-text-main">
                      {deliveryCost === 0 ? 'Complimentary' : `£${deliveryCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-text-main pt-3 border-t border-border-warm/50">
                    <span>Estimated Total</span>
                    <span>£{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-dark-main text-[#F7F5F0] hover:bg-accent-gold text-xs font-semibold uppercase tracking-widest py-4 flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-full"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Secure Checkout</span>
                </button>

                <p className="text-[10px] text-text-secondary text-center font-light leading-relaxed">
                  Complimentary 10-year structural warranty automatically bound on checkout.
                </p>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
