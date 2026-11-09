import React, { useState } from 'react';
import { Product } from '../data/products';
import { ShoppingCart, Users, Sparkles, Check, ArrowRight, ShieldCheck, Flame, Gift } from 'lucide-react';

interface FamilyPackagesViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickCheckout: (product: Product) => void;
  onNavigateHome: () => void;
}

export const FamilyPackagesView: React.FC<FamilyPackagesViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onQuickCheckout,
  onNavigateHome,
}) => {
  const [filterServings, setFilterServings] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Filter deals (all 10 FD packages)
  const familyDeals = products.filter(p => p.category === 'deals');

  const filteredDeals = familyDeals.filter(deal => {
    if (filterServings === 'small') {
      return deal.description.includes('2-3') || deal.description.includes('3-4');
    }
    if (filterServings === 'medium') {
      return deal.description.includes('4-5') || deal.description.includes('5-6') || deal.description.includes('6-7');
    }
    if (filterServings === 'large') {
      return deal.description.includes('7-9') || deal.description.includes('8-10') || deal.description.includes('10-15');
    }
    return true;
  });

  const handleAdd = (deal: Product) => {
    onAddToCart(deal);
    setAddedIds(prev => ({ ...prev, [deal.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [deal.id]: false }));
    }, 1600);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          پورے 10 قسم کے سپیشل فیملی پیکجز
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Exclusive 10 Family Mega Packages
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Crafted specially for family get-togethers, birthday celebrations, and weekend feasts in Lahore.
          Complete with freshly baked stone-oven pizzas, crispy chicken, gourmet burgers, golden fries, and chilled 1.5L beverages.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> 100% Oven Fresh & Hot
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
            <Flame className="w-4 h-4" /> Save up to Rs. 850
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
            <Gift className="w-4 h-4" /> Free Delivery in Paragon City
          </span>
        </div>
      </div>

      {/* Serving Size Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setFilterServings('all')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filterServings === 'all'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All 10 Packages (تمام 10 پیکیجز)
        </button>
        <button
          onClick={() => setFilterServings('small')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filterServings === 'small'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          Cozy Families (2 - 4 Persons)
        </button>
        <button
          onClick={() => setFilterServings('medium')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filterServings === 'medium'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          Standard Families (4 - 7 Persons)
        </button>
        <button
          onClick={() => setFilterServings('large')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filterServings === 'large'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          Grand Feasts & Parties (8 - 15 Persons)
        </button>
      </div>

      {/* Grid of the 10 Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredDeals.map((deal, index) => {
          // Calculate realistic savings tag
          const savingsAmount = Math.round(deal.price * 0.22);
          const originalPrice = deal.price + savingsAmount;
          const isAdded = !!addedIds[deal.id];

          // Parse inclusions from description
          const inclusions: string[] = deal.description.split('+').map((item: string) => item.trim());

          return (
            <div
              key={deal.id}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-black rounded-lg tracking-wide shadow-sm">
                      FD #{index + 1}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      Save Rs. {savingsAmount}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                    <span>Serves 4-8</span>
                  </div>
                </div>

                {/* Main Product Info & Image on Pure White Background */}
                <div className="flex flex-col sm:flex-row gap-5 items-center mb-6">
                  <div
                    onClick={() => onSelectProduct(deal)}
                    className="w-full sm:w-44 h-44 rounded-2xl bg-white border border-slate-100 dark:border-slate-700 flex items-center justify-center p-2 cursor-pointer overflow-hidden group-hover:scale-105 transition-transform shrink-0 shadow-inner"
                  >
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 w-full text-left">
                    <h3
                      onClick={() => onSelectProduct(deal)}
                      className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white cursor-pointer hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      {deal.name}
                    </h3>
                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-2">
                      مستند فیملی ڈیل · تازہ تیار شدہ
                    </p>

                    {/* Breakdown of Inclusions */}
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {inclusions.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pricing & Order Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      Rs. {deal.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold line-through text-slate-400">
                      Rs. {originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    Tax Included · Guaranteed Fresh
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdd(deal)}
                    className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onQuickCheckout(deal)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20 active:scale-95 transition-all"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guarantee & Customization Footer Card */}
      <div className="mt-12 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-black">
            Need a Customized Mega Catering Package for 20+ People?
          </h2>
          <p className="mt-2 text-red-100 text-sm sm:text-base">
            Call our master chef directly at <strong className="text-white">0301 8408177</strong> or <strong className="text-white">042 37167082</strong>. We prepare custom party menus, customized crusts, kabab stuffed borders, and midnight delivery batches.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="tel:03018408177"
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-red-600 font-black rounded-xl text-sm shadow-lg hover:bg-red-50 transition-all text-center"
          >
            Call Master Chef (0301 8408177)
          </a>
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3.5 bg-red-700/60 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all border border-white/20 text-center"
          >
            Explore Full Menu
          </button>
        </div>
      </div>
    </div>
  );
};
