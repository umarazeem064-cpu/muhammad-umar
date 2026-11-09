import React from 'react';
import { ShoppingBag, Zap, Star, Flame, Clock } from 'lucide-react';
import { Product } from '../data/products';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onCustomize: (product: Product) => void;
  language: Language;
}

export const ProductCard: React.FC<Props> = ({
  product,
  onAddToCart,
  onBuyNow,
  onCustomize,
  language
}) => {
  const t = TRANSLATIONS[language];
  const isCustomizable = product.category === 'pizza' || (product.sizes && product.sizes.length > 0);

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none">
      {/* Product Image Slot with White Studio Background & JPG format */}
      <div
        onClick={() => onCustomize(product)}
        className="relative w-full aspect-square rounded-xl bg-white flex items-center justify-center p-3 overflow-hidden cursor-pointer border border-slate-100 dark:border-slate-800/80 group-hover:border-amber-400/50 transition-colors"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Styled graceful fallback if image ever fails
            (e.target as HTMLImageElement).src = '/images/products/pizza_signature_oven.jpg';
          }}
        />

        {/* Quiet text kicker badges - restrained anti-slop */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
          {product.isPopular && (
            <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-red-600 text-white rounded-md shadow-sm">
              Hot Deal
            </span>
          )}
          {product.isSpicy && (
            <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 bg-amber-600 text-white rounded-md shadow-sm flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5" /> Spicy
            </span>
          )}
        </div>

        {/* Prep Time */}
        {product.prepTime && (
          <span className="absolute bottom-2.5 right-2.5 text-[10px] font-medium text-slate-500 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-slate-200/60 shadow-xs flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-slate-400" />
            {product.prepTime}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col pt-3">
        {/* Unboxed Metadata Header */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span className="uppercase tracking-wider font-semibold text-[11px] text-amber-600 dark:text-amber-400">
            {product.category.replace('_', ' ')}
          </span>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-xs tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onCustomize(product)}
          className="text-base font-bold text-slate-900 dark:text-white leading-tight hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors"
        >
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Features / inclusions preview */}
        {product.features && product.features.length > 0 && (
          <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 flex flex-wrap gap-x-2 gap-y-0.5">
            {product.features.map((feat, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="text-amber-500 font-bold">✓</span> {feat}
              </span>
            ))}
          </div>
        )}

        {/* Price & Action Module */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              {product.sizes && product.sizes.length > 0 ? 'Starting at' : t.price}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t.price}
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums tracking-tight font-heading">
                {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Dual Action Buttons: Add to Cart & Buy Now */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => (isCustomizable ? onCustomize(product) : onAddToCart(product))}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all hover:scale-105 active:scale-95"
              title={t.addToCart}
              aria-label={t.addToCart}
            >
              <ShoppingBag className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            </button>

            <button
              onClick={() => onBuyNow(product)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl shadow-md shadow-red-600/20 transition-all whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white" />
              <span>{t.buyNow}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
