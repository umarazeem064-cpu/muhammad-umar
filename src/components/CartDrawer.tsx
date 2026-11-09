import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Bike } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/products';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedCheckout: () => void;
  language: Language;
  discount: number;
  promoCode: string;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  language,
  discount,
  promoCode,
  onApplyPromo
}) => {
  const t = TRANSLATIONS[language];
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = subtotal >= STORE_INFO.freeDeliveryThreshold || subtotal === 0 ? 0 : STORE_INFO.deliveryFee;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);
  const isBelowMin = subtotal > 0 && subtotal < STORE_INFO.minOrder;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyPromo(couponInput.trim());
    if (success) {
      setCouponMsg({ text: 'Promo applied successfully!', isError: false });
      setCouponInput('');
    } else {
      setCouponMsg({ text: 'Invalid coupon. Try "WELCOME10" or "PARAGON50"', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.cart}
                </h2>
                <span className="text-xs text-slate-400 tabular-nums">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery threshold bar */}
          <div className="px-6 py-2.5 bg-amber-500/10 dark:bg-amber-950/30 border-b border-amber-500/20 text-xs">
            {subtotal >= STORE_INFO.freeDeliveryThreshold ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                <Bike className="w-4 h-4" />
                <span>You unlocked FREE home delivery!</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-amber-800 dark:text-amber-300">
                <span>Add {t.price} {(STORE_INFO.freeDeliveryThreshold - subtotal).toLocaleString()} for Free Delivery</span>
                <span className="font-bold tabular-nums">
                  {Math.round((subtotal / STORE_INFO.freeDeliveryThreshold) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-700 stroke-[1.5] mb-3" />
                <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                  {t.yourCartEmpty}
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Browse our fresh pizzas, sizzling grilled burgers, and bachelor combos to add items.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  {t.exploreMenu}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex gap-3.5"
                >
                  {/* Product JPG Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-100 dark:border-slate-700 shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Options */}
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap gap-1">
                        {item.selectedSize && <span>{item.selectedSize.name}</span>}
                        {item.selectedCrust && <span>· {item.selectedCrust}</span>}
                      </div>

                      {item.specialInstructions && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 italic truncate mt-0.5">
                          "{item.specialInstructions}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold tabular-nums text-slate-800 dark:text-slate-200 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                        {t.price} {item.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 space-y-4">
              {/* Promo code input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon code (e.g. WELCOME10)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </form>

              {couponMsg && (
                <p className={`text-[11px] ${couponMsg.isError ? 'text-red-500' : 'text-emerald-500'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Subtotal Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>{t.subtotal}</span>
                  <span className="tabular-nums font-medium text-slate-800 dark:text-slate-200">
                    {t.price} {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>{t.deliveryFee}</span>
                  <span className="tabular-nums font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.free}</span>
                    ) : (
                      `${t.price} ${deliveryFee}`
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>{t.discount} ({promoCode})</span>
                    <span className="tabular-nums">-{t.price} {discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline text-sm font-extrabold text-slate-900 dark:text-white">
                  <span>{t.total}</span>
                  <span className="text-lg text-red-600 dark:text-red-400 tabular-nums font-heading">
                    {t.price} {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Min Order Warning */}
              {isBelowMin && (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-800 dark:text-amber-300 leading-snug">
                  Minimum delivery order amount is {t.price} {STORE_INFO.minOrder}. Please add {t.price}{' '}
                  {STORE_INFO.minOrder - subtotal} more to checkout.
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={onProceedCheckout}
                disabled={isBelowMin}
                className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-sm font-bold shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>{t.checkout}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-bit SSL encrypted & secure checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
