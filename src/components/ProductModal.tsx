import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Zap, Star, Flame, Check, Plus, Minus } from 'lucide-react';
import { Product, ProductSize } from '../data/products';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCartWithOptions: (
    product: Product,
    selectedSize?: ProductSize,
    selectedCrust?: string,
    quantity?: number,
    instructions?: string
  ) => void;
  onBuyNowWithOptions: (
    product: Product,
    selectedSize?: ProductSize,
    selectedCrust?: string,
    quantity?: number,
    instructions?: string
  ) => void;
  language: Language;
}

export const ProductModal: React.FC<Props> = ({
  product,
  isOpen,
  onClose,
  onAddToCartWithOptions,
  onBuyNowWithOptions,
  language
}) => {
  const t = TRANSLATIONS[language];

  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(undefined);
  const [selectedCrust, setSelectedCrust] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [instructions, setInstructions] = useState<string>('');

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        // default to first or medium size
        const defaultSize = product.sizes.length > 1 ? product.sizes[1] : product.sizes[0];
        setSelectedSize(defaultSize);
      } else {
        setSelectedSize(undefined);
      }

      if (product.crustOptions && product.crustOptions.length > 0) {
        setSelectedCrust(product.crustOptions[0]);
      } else {
        setSelectedCrust('');
      }

      setQuantity(1);
      setInstructions('');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  // Calculate current price
  let currentUnitPrice = selectedSize ? selectedSize.price : product.price;
  if (selectedCrust.includes('+Rs. 150')) currentUnitPrice += 150;
  if (selectedCrust.includes('+Rs. 200')) currentUnitPrice += 200;

  const currentTotalPrice = currentUnitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Image & Header */}
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <div className="w-40 h-40 rounded-2xl bg-white p-2 border border-slate-100 dark:border-slate-800 shrink-0 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/products/pizza_signature_oven.jpg';
                }}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="uppercase font-semibold tracking-wider text-amber-600 dark:text-amber-400">
                  {product.category.replace('_', ' ')}
                </span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {product.name}
              </h2>

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                {t.selectSize}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize?.name === sz.name;
                  return (
                    <button
                      key={sz.name}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30 text-red-700 dark:text-red-400 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{sz.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                        {t.price} {sz.price.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust Selector */}
          {product.crustOptions && product.crustOptions.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                {t.selectCrust}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.crustOptions.map((crust) => {
                  const isSelected = selectedCrust === crust;
                  return (
                    <button
                      key={crust}
                      type="button"
                      onClick={() => setSelectedCrust(crust)}
                      className={`p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/30 text-slate-900 dark:text-white font-semibold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{crust}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Quantity</span>
              <span className="text-[11px] text-slate-400">Freshly prepared on order</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              {t.specialInstructions}
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. extra spicy, well-done crust, sauce on the side..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Modal Footer with Pricing & Dual Buy Buttons */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Amount</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-500">{t.price}</span>
              <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums font-heading">
                {currentTotalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onAddToCartWithOptions(product, selectedSize, selectedCrust, quantity, instructions);
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.addToCart}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onBuyNowWithOptions(product, selectedSize, selectedCrust, quantity, instructions);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>{t.buyNow}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
