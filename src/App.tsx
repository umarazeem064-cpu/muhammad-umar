import React, { useState, useEffect, useMemo } from 'react';
import {
  Pizza,
  Search,
  SlidersHorizontal,
  Flame,
  Bike,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Zap,
  MapPin,
  CheckCircle2,
  Tag,
  ShoppingBag
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, STORE_INFO, Product, ProductSize } from './data/products';
import { Language, TRANSLATIONS } from './data/translations';
import { CartItem, Order, Reservation, PushNotification } from './types';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveOrderTracking } from './components/LiveOrderTracking';
import { TableReservationModal } from './components/TableReservationModal';
import { DashboardSidebar } from './components/DashboardSidebar';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndFooter } from './components/LocationAndFooter';
import { PushNotificationToast } from './components/PushNotificationToast';
import { ProfessionalLoadingScreen } from './components/ProfessionalLoadingScreen';
import { FamilyPackagesView } from './components/FamilyPackagesView';

export default function App() {
  // Splash Loading
  const [isLoading, setIsLoading] = useState(true);

  // Theme & Language
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('the_pizza_shop_theme') === 'dark';
  });
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('the_pizza_shop_lang') as Language) || 'en';
  });

  const t = TRANSLATIONS[language];

  // Active View Tab: 'menu' | 'family_deals' | 'reservation' | 'track' | 'reviews'
  const [activeView, setActiveView] = useState<'menu' | 'family_deals' | 'reservation' | 'track' | 'reviews'>('menu');

  // Categories & Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');

  // Cart & Orders State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('the_pizza_shop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('the_pizza_shop_orders');
      if (saved) return JSON.parse(saved);
      // Sample recent order for instant tracking demo
      return [
        {
          id: 'ord-sample-1',
          orderNumber: 'PS-482109',
          items: [
            {
              cartId: 'c1',
              product: PRODUCTS[0], // Chicken Tikka Pizza
              selectedSize: { name: 'Medium 10"', price: 970 },
              selectedCrust: 'Deep Pan',
              quantity: 1,
              unitPrice: 970,
              totalPrice: 970
            },
            {
              cartId: 'c2',
              product: PRODUCTS[16], // Jumbo Zinger Burger
              quantity: 1,
              unitPrice: 420,
              totalPrice: 420
            }
          ],
          customerName: 'Umar Azeem',
          phone: '0301-8408177',
          address: 'House 14-B, Imperial Garden Homes, Paragon City, Lahore',
          area: 'Paragon City',
          paymentMethod: 'cod',
          paymentStatus: 'pending',
          subtotal: 1390,
          deliveryFee: 0,
          discount: 0,
          total: 1390,
          createdAt: 'Just now',
          status: 'on_the_way',
          estimatedDeliveryTime: '24 mins',
          riderName: 'Muhammad Usman',
          riderPhone: '0301-8408177',
          riderVehicle: 'Honda CD70 (Red) - LEA-4921',
          trackingStep: 4
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(orders.length > 0 ? orders[0] : null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);

  // Push Notifications State
  const [notificationPermission, setNotificationPermission] = useState(true);
  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: 'notif-1',
      title: 'Welcome to The Pizza Shop Lahore',
      message: 'Use code "WELCOME10" at checkout for 10% off your first delivery!',
      timestamp: '1m ago',
      type: 'deal',
      read: false
    }
  ]);

  // Sync Theme with HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('the_pizza_shop_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('the_pizza_shop_theme', 'light');
    }
  }, [darkMode]);

  // Sync Cart
  useEffect(() => {
    localStorage.setItem('the_pizza_shop_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync Orders
  useEffect(() => {
    localStorage.setItem('the_pizza_shop_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('the_pizza_shop_lang', language);
  }, [language]);

  // Push Notification Dispatcher
  const triggerNotification = (title: string, message: string, type: 'order' | 'deal' | 'system' = 'order') => {
    const newNotif: PushNotification = {
      id: 'notif-' + Date.now(),
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    const cartId = `${product.id}-${Date.now()}`;
    const newItem: CartItem = {
      cartId,
      product,
      quantity: 1,
      unitPrice: product.price,
      totalPrice: product.price
    };
    setCart((prev) => [...prev, newItem]);
    triggerNotification('Added to Basket 🍕', `${product.name} added to your order`, 'system');
  };

  const handleAddToCartWithOptions = (
    product: Product,
    selectedSize?: ProductSize,
    selectedCrust?: string,
    quantity: number = 1,
    instructions?: string
  ) => {
    let unitPrice = selectedSize ? selectedSize.price : product.price;
    if (selectedCrust?.includes('+Rs. 150')) unitPrice += 150;
    if (selectedCrust?.includes('+Rs. 200')) unitPrice += 200;

    const cartId = `${product.id}-${selectedSize?.name || 'def'}-${selectedCrust || 'def'}-${Date.now()}`;
    const newItem: CartItem = {
      cartId,
      product,
      selectedSize,
      selectedCrust,
      quantity,
      specialInstructions: instructions,
      unitPrice,
      totalPrice: unitPrice * quantity
    };

    setCart((prev) => [...prev, newItem]);
    triggerNotification('Added to Basket 🍕', `${quantity}x ${product.name} configured & added`, 'system');
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNowWithOptions = (
    product: Product,
    selectedSize?: ProductSize,
    selectedCrust?: string,
    quantity: number = 1,
    instructions?: string
  ) => {
    handleAddToCartWithOptions(product, selectedSize, selectedCrust, quantity, instructions);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
          : item
      )
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleApplyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      const subtotal = cart.reduce((acc, i) => acc + i.totalPrice, 0);
      setDiscount(Math.round(subtotal * 0.1));
      setPromoCode('WELCOME10');
      triggerNotification('Promo Code Applied 🎉', '10% discount applied to your order', 'deal');
      return true;
    }
    if (clean === 'PARAGON50') {
      setDiscount(50);
      setPromoCode('PARAGON50');
      triggerNotification('Promo Code Applied 🎉', 'Rs. 50 local discount applied', 'deal');
      return true;
    }
    return false;
  };

  const handleOrderPlaced = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setActiveOrder(order);
    setCart([]);
    setDiscount(0);
    setPromoCode('');
    setIsCartOpen(false);

    triggerNotification(
      'Order Confirmed! 🚀',
      `Order #${order.orderNumber} sent to kitchen. Rider assigned for delivery to ${order.area}.`,
      'order'
    );

    // Switch view to live order tracking so user can see it right away!
    setActiveView('track');
  };

  const handleUpdateOrderStatus = (status: any, step: number) => {
    if (activeOrder) {
      const updated = { ...activeOrder, status, trackingStep: step };
      setActiveOrder(updated);
      setOrders((prev) => prev.map((o) => (o.id === activeOrder.id ? updated : o)));

      if (step === 3) {
        triggerNotification('Rider Dispatched 🛵', 'Muhammad Usman has left Paragon City with your food!', 'order');
      } else if (step === 5) {
        triggerNotification('Delivered Hot & Fresh! 🎉', 'Your order has been handed over. Enjoy your meal!', 'order');
      }
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Loading Splash */}
      {isLoading && <ProfessionalLoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        language={language}
        onSelectLanguage={setLanguage}
        hasActiveOrder={activeOrder !== null && activeOrder.status !== 'delivered'}
      />

      {/* Push Notification Toast Stream */}
      <PushNotificationToast
        notifications={notifications}
        onDismiss={(id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))}
        permissionGranted={notificationPermission}
        onRequestPermission={() => {
          setNotificationPermission(true);
          triggerNotification('Push Notifications Active 🔔', 'You will receive real-time updates for all orders & deals!', 'system');
        }}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* VIEW: LIVE ORDER TRACKING */}
        {activeView === 'track' && (
          <LiveOrderTracking
            activeOrder={activeOrder}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            language={language}
            onCloseFullScreen={() => setActiveView('menu')}
          />
        )}

        {/* VIEW: 10 FAMILY MEGA PACKAGES DEDICATED PAGE */}
        {activeView === 'family_deals' && (
          <FamilyPackagesView
            products={PRODUCTS}
            onSelectProduct={(p) => setCustomizingProduct(p)}
            onAddToCart={handleAddToCart}
            onQuickCheckout={(p) => {
              handleAddToCart(p);
              setIsCheckoutOpen(true);
            }}
            onNavigateHome={() => setActiveView('menu')}
          />
        )}

        {/* VIEW: TABLE RESERVATION PAGE */}
        {activeView === 'reservation' && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Latif Market, Paragon City Lahore
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
                Book a Dine-In Table
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Reserve your family hall or executive booth ahead of time. Hot stone-oven pizzas served fresh to your table.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-red-600/25 transition-all hover:scale-105 active:scale-95"
                >
                  Start Table Reservation
                </button>
              </div>
            </div>

            {/* Existing reservations list */}
            {reservations.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Your Confirmed Bookings ({reservations.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reservations.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 dark:text-white">{res.name}</span>
                        <span className="text-red-600 dark:text-red-400 font-extrabold tabular-nums">
                          {res.token}
                        </span>
                      </div>
                      <div className="text-slate-500">
                        {res.partySize} Guests · {res.date} at {res.timeSlot}
                      </div>
                      <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                        Area: {res.seatingArea}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: REVIEWS */}
        {activeView === 'reviews' && <ReviewsSection language={language} />}

        {/* VIEW: MENU & STOREFRONT (DEFAULT) */}
        {activeView === 'menu' && (
          <>
            {/* HERO SHOWCASE SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-red-50/50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800/80 py-12 lg:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Left Column: Headlines & Call to Actions */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    {/* Quiet Editorial Kicker */}
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3.5 py-1 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span>{STORE_INFO.address}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-heading leading-[1.1] text-balance">
                      Changing Fast Food For Good in Paragon City.
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Hand-tossed dough never frozen, melted mozzarella cheese, sizzling grilled burgers, and authentic charcoal roasted chicken. Fast 35-45 mins delivery to your doorstep.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                      <a
                        href="#menu-catalog"
                        className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-red-600/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                      >
                        <Pizza className="w-4 h-4 text-amber-300" />
                        <span>Order Online Now</span>
                      </a>

                      <button
                        onClick={() => setIsReservationOpen(true)}
                        className="px-5 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition-all flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <span>Book Dine-In Table</span>
                      </button>

                      <a
                        href={`tel:${STORE_INFO.phoneLandline}`}
                        className="px-4 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-1.5"
                      >
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>{STORE_INFO.phoneLandline}</span>
                      </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>100+ Menu Items</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bike className="w-4 h-4 text-red-500" />
                        <span>Free Delivery over Rs. 1,200</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>Midnight Deals (12:30 - 1:30 AM)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hero Visual Asset (Authentic JPG food image on pure white studio setting) */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
                      <img
                        src="/images/products/pizza_signature_oven.jpg"
                        alt="The Pizza Shop Lahore Special Pizza"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain filter drop-shadow-xl"
                      />

                      {/* Floating Special Kicker */}
                      <div className="absolute -bottom-4 -left-4 sm:left-4 bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-white">
                          <Flame className="w-5 h-5 text-amber-300" />
                        </div>
                        <div className="text-left text-xs">
                          <span className="font-extrabold text-white block">
                            Super Duper Launch Prices
                          </span>
                          <span className="text-[11px] text-amber-400">
                            Pizzas from Rs. 520 · Burgers from Rs. 320
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MENU CATALOG SECTION */}
            <section id="menu-catalog" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
              {/* Search & Sort Controls Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 self-end md:self-auto text-xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500 dark:text-slate-400">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-red-500 shadow-xs"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Top Rated (4.9+)</option>
                  </select>
                </div>
              </div>

              {/* Category Segmented Filter Tabs (Interactive Functional Buttons) */}
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/60 dark:bg-slate-900 rounded-2xl overflow-x-auto scrollbar-none border border-slate-200/80 dark:border-slate-800">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-150 ${
                        isActive
                          ? 'bg-red-600 text-white shadow-sm font-bold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Product Grid (All 100+ items with crop JPGs and descriptions) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                  <span>
                    Showing <strong className="text-slate-900 dark:text-white tabular-nums">{filteredProducts.length}</strong> items in menu
                  </span>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                    >
                      Show All Categories
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <Pizza className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      No matching delicious items found
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Try searching with a different keyword like "Tikka", "Zinger", "Wings", or "Deal".
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="mt-2 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl"
                    >
                      Reset Menu Filter
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        onCustomize={(p) => setCustomizingProduct(p)}
                        language={language}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* REVIEWS & RATINGS AT END OF PAGE */}
            <ReviewsSection language={language} />

            {/* LOCATION & FOOTER */}
            <LocationAndFooter
              language={language}
              onOpenReservation={() => setIsReservationOpen(true)}
            />
          </>
        )}
      </main>

      {/* MODALS & DRAWERS */}
      {/* 1. Product Customization Modal */}
      <ProductModal
        product={customizingProduct}
        isOpen={customizingProduct !== null}
        onClose={() => setCustomizingProduct(null)}
        onAddToCartWithOptions={handleAddToCartWithOptions}
        onBuyNowWithOptions={handleBuyNowWithOptions}
        language={language}
      />

      {/* 2. Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        language={language}
        discount={discount}
        promoCode={promoCode}
        onApplyPromo={handleApplyPromo}
      />

      {/* 3. Multi-Method Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discount={discount}
        onOrderPlaced={handleOrderPlaced}
        language={language}
      />

      {/* 4. Table Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onReservationConfirmed={(res) => {
          setReservations((prev) => [res, ...prev]);
          triggerNotification(
            'Table Reservation Confirmed 🍽️',
            `Pass ${res.token} reserved for ${res.partySize} guests at The Pizza Shop Paragon City.`,
            'system'
          );
        }}
        language={language}
      />

      {/* 5. Member Dashboard & Analytics Sidebar */}
      <DashboardSidebar
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        orders={orders}
        reservations={reservations}
        onTrackOrder={(ord) => {
          setActiveOrder(ord);
          setActiveView('track');
        }}
        onReOrder={(ord) => {
          setCart((prev) => [...prev, ...ord.items]);
          setIsCartOpen(true);
        }}
        language={language}
      />

      {/* Mobile Bottom Quick Action Bar (Thumb-friendly & < 15% height cap) */}
      <div className="md:hidden sticky bottom-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-around gap-2 shadow-lg">
        <button
          onClick={() => setActiveView('menu')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeView === 'menu' ? 'text-red-600 dark:text-red-400' : 'text-slate-500'
          }`}
        >
          <Pizza className="w-5 h-5" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => setActiveView('family_deals')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeView === 'family_deals' ? 'text-red-600 dark:text-red-400' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>10 Deals</span>
        </button>

        <button
          onClick={() => setIsReservationOpen(true)}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeView === 'reservation' ? 'text-red-600 dark:text-red-400' : 'text-slate-500'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Table</span>
        </button>

        <button
          onClick={() => setActiveView('track')}
          className={`relative flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeView === 'track' ? 'text-red-600 dark:text-red-400' : 'text-slate-500'
          }`}
        >
          <Bike className="w-5 h-5" />
          <span>Track</span>
          {activeOrder && activeOrder.status !== 'delivered' && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
        </button>
      </div>
    </div>
  );
}
