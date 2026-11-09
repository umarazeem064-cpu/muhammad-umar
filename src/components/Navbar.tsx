import React from 'react';
import { Pizza, Phone, MessageSquare, Sun, Moon, Globe, ShoppingBag, LayoutDashboard, BookmarkCheck } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  activeView: 'menu' | 'family_deals' | 'reservation' | 'track' | 'reviews';
  setActiveView: (view: 'menu' | 'family_deals' | 'reservation' | 'track' | 'reviews') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenDashboard: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  hasActiveOrder: boolean;
}

export const Navbar: React.FC<Props> = ({
  activeView,
  setActiveView,
  cartCount,
  onOpenCart,
  onOpenDashboard,
  darkMode,
  onToggleDarkMode,
  language,
  onSelectLanguage,
  hasActiveOrder
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Utility Announcement & Contact Strip */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-700 text-white text-xs px-4 py-1.5 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Direct Phone Calling & Support Links */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hidden sm:inline-block text-amber-200 font-semibold">Direct Orders:</span>
            <a
              href={`tel:${STORE_INFO.phoneLandline}`}
              className="flex items-center gap-1 hover:text-amber-200 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3" />
              <span>{STORE_INFO.phoneLandline}</span>
            </a>
            <span className="text-white/40 hidden xs:inline">|</span>
            <a
              href={`tel:${STORE_INFO.phoneMobile1}`}
              className="flex items-center gap-1 hover:text-amber-200 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3" />
              <span>{STORE_INFO.phoneMobile1}</span>
            </a>
            <span className="text-white/40 hidden md:inline">|</span>
            <a
              href={`tel:${STORE_INFO.phoneMobile2}`}
              className="hidden md:flex items-center gap-1 hover:text-amber-200 transition-colors whitespace-nowrap"
            >
              <span>{STORE_INFO.phoneMobile2}</span>
            </a>
          </div>

          {/* WhatsApp, Language & Theme Controls */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=Hello%20The%20Pizza%20Shop%20Lahore!%20I%20would%20like%20to%20place%20an%20order.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded text-[11px] font-semibold transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>

            {/* Language Selector */}
            <div className="flex items-center gap-1 text-[11px] bg-black/20 rounded px-1.5 py-0.5">
              <Globe className="w-3 h-3 text-amber-300" />
              <button
                onClick={() => onSelectLanguage('en')}
                className={`px-1 rounded ${language === 'en' ? 'font-bold underline text-white' : 'text-white/80 hover:text-white'}`}
              >
                EN
              </button>
              <span>/</span>
              <button
                onClick={() => onSelectLanguage('ur')}
                className={`px-1 rounded ${language === 'ur' ? 'font-bold underline text-white' : 'text-white/80 hover:text-white'}`}
              >
                اردو
              </button>
              <span>/</span>
              <button
                onClick={() => onSelectLanguage('ar')}
                className={`px-1 rounded ${language === 'ar' ? 'font-bold underline text-white' : 'text-white/80 hover:text-white'}`}
              >
                عربي
              </button>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-1 rounded hover:bg-white/20 transition-colors text-white"
              title="Toggle Light / Dark mode"
              aria-label="Toggle Light / Dark mode"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Top Navigation Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveView('menu')}
          className="flex items-center gap-2.5 text-left text-slate-900 dark:text-white whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform">
            <Pizza className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight font-heading text-red-600 dark:text-red-500">
              The Pizza Shop
            </span>
          </div>
        </button>

        {/* Zone 2: Clean 4–5 single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveView('menu')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 ${
              activeView === 'menu' ? 'text-red-600 dark:text-red-400 font-bold border-b-2 border-red-600 pb-0.5' : ''
            }`}
          >
            {t.menu}
          </button>

          <button
            onClick={() => setActiveView('family_deals')}
            className={`relative flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 ${
              activeView === 'family_deals' ? 'text-red-600 dark:text-red-400 font-bold border-b-2 border-red-600 pb-0.5' : ''
            }`}
          >
            <span>{t.familyPackages}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-tight shadow-2xs animate-pulse">
              10 Mega
            </span>
          </button>

          <button
            onClick={() => setActiveView('reservation')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 ${
              activeView === 'reservation' ? 'text-red-600 dark:text-red-400 font-bold border-b-2 border-red-600 pb-0.5' : ''
            }`}
          >
            {t.tableReservation}
          </button>

          <button
            onClick={() => setActiveView('track')}
            className={`relative whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 ${
              activeView === 'track' ? 'text-red-600 dark:text-red-400 font-bold border-b-2 border-red-600 pb-0.5' : ''
            }`}
          >
            <span>{t.trackOrder}</span>
            {hasActiveOrder && (
              <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveView('reviews')}
            className={`whitespace-nowrap transition-colors hover:text-red-600 dark:hover:text-red-400 ${
              activeView === 'reviews' ? 'text-red-600 dark:text-red-400 font-bold border-b-2 border-red-600 pb-0.5' : ''
            }`}
          >
            {t.reviews}
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Dashboard trigger + Cart button) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
            title="Open Dashboard & Profile"
          >
            <LayoutDashboard className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="hidden sm:inline">{t.dashboard}</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            aria-label="View Shopping Basket"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.cart}</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-400 text-slate-900 rounded-full text-[11px] font-extrabold tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
