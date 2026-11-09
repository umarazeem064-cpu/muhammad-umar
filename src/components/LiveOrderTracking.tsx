import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Bike,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ChefHat,
  Flame,
  FastForward,
  RotateCcw,
  Maximize2,
  Minimize2,
  Thermometer,
  Compass,
  Printer,
  ShieldCheck,
  Radio,
  X
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { STORE_INFO } from '../data/products';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  activeOrder: Order | null;
  onUpdateOrderStatus: (status: OrderStatus, step: number) => void;
  language: Language;
  onCloseFullScreen?: () => void;
}

export const LiveOrderTracking: React.FC<Props> = ({
  activeOrder,
  onUpdateOrderStatus,
  language,
  onCloseFullScreen
}) => {
  const t = TRANSLATIONS[language];

  const [currentStep, setCurrentStep] = useState<number>(activeOrder ? activeOrder.trackingStep : 2);
  const [riderProgress, setRiderProgress] = useState<number>(45); // 0% to 100% along route
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [etaMinutes, setEtaMinutes] = useState<number>(24);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(true); // Default to full screen per user request!

  useEffect(() => {
    if (activeOrder) {
      setCurrentStep(activeOrder.trackingStep);
    }
  }, [activeOrder]);

  // Live simulation of rider movement
  useEffect(() => {
    if (!isSimulating || currentStep !== 4) return;

    const interval = setInterval(() => {
      setRiderProgress((prev) => {
        if (prev >= 98) {
          setCurrentStep(5);
          onUpdateOrderStatus('delivered', 5);
          setEtaMinutes(0);
          return 100;
        }
        const next = prev + 2;
        setEtaMinutes(Math.max(1, Math.round(24 * (1 - next / 100))));
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulating, currentStep, onUpdateOrderStatus]);

  // Steps definition
  const STEPS = [
    { title: t.orderReceived, desc: 'Verified by system & kitchen printout', icon: CheckCircle2 },
    { title: t.kitchenPreparing, desc: 'Hand-tossed dough & toppings layered', icon: ChefHat },
    { title: t.doughBaking, desc: 'Baking inside 350°C Italian stone oven', icon: Flame },
    { title: t.riderAssigned, desc: 'Packed in insulated thermal bag', icon: Bike },
    { title: t.onTheWay, desc: 'Navigating Barki Road to your doorstep', icon: MapPin },
    { title: t.delivered, desc: 'Handed over hot & fresh!', icon: CheckCircle2 }
  ];

  const handleFastForward = () => {
    const nextStep = (currentStep + 1) % 6;
    setCurrentStep(nextStep);
    if (nextStep === 4) setRiderProgress(30);
    if (nextStep === 5) setRiderProgress(100);
    const statuses: OrderStatus[] = [
      'placed',
      'kitchen_prep',
      'oven_baking',
      'rider_dispatched',
      'on_the_way',
      'delivered'
    ];
    onUpdateOrderStatus(statuses[nextStep], nextStep);
  };

  const handleResetSimulation = () => {
    setCurrentStep(0);
    setRiderProgress(5);
    setEtaMinutes(35);
    onUpdateOrderStatus('placed', 0);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const wrapperClass = isFullScreen
    ? 'fixed inset-0 w-screen h-screen z-50 bg-slate-950 text-white flex flex-col overflow-hidden animate-in fade-in duration-200'
    : 'max-w-6xl mx-auto px-4 py-8 space-y-8';

  return (
    <div className={wrapperClass}>
      {/* Full-Screen Top Header Bar */}
      <div className={`${isFullScreen ? 'h-16 px-6 bg-slate-900 border-b border-slate-800' : 'bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-xl'} flex items-center justify-between shrink-0`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm shadow-md">
            PS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                {activeOrder ? `Live GPS Radar: Order #${activeOrder.orderNumber}` : 'Full-Screen Delivery Radar'}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {activeOrder ? activeOrder.address : 'Paragon City & Barki Road Live Corridor, Lahore'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* ETA Capsule */}
          <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-bold tabular-nums">
              {currentStep === 5 ? 'DELIVERED' : `ETA: ${etaMinutes} mins`}
            </span>
          </div>

          <button
            onClick={handlePrintSlip}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            title="Print order slip"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFullScreen ? 'Exit Full Screen' : 'Full Screen Radar'}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {isFullScreen && onCloseFullScreen && (
            <button
              onClick={onCloseFullScreen}
              className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors"
              title="Close live radar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Body Grid */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${isFullScreen ? 'grid grid-cols-1 lg:grid-cols-12 gap-6' : 'grid grid-cols-1 lg:grid-cols-12 gap-8'}`}>
        {/* Left Column: Live Radar Map Canvas & Rider Telemetry HUD (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Telemetry HUD Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Rider Speed</span>
                <span className="text-sm font-black text-white tabular-nums">
                  {currentStep === 4 ? '36 km/h' : currentStep === 5 ? '0 km/h' : 'Stationary'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Thermal Box</span>
                <span className="text-sm font-black text-emerald-400 tabular-nums">68°C Steaming</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Live Coordinates</span>
                <span className="text-xs font-mono font-bold text-slate-300">31.52° N, 74.35° E</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Sanitized Pack</span>
                <span className="text-xs font-bold text-emerald-400">100% Sealed</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Map Canvas */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl bg-slate-950 overflow-hidden border-2 border-slate-800 shadow-2xl flex items-center justify-center">
            <svg
              className="w-full h-full text-slate-700"
              viewBox="0 0 700 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="radarGrid" width="35" height="35" patternUnits="userSpaceOnUse">
                  <path d="M 35 0 L 0 0 0 35" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
                <linearGradient id="liveRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              <rect width="700" height="450" fill="url(#radarGrid)" />

              {/* Highway Corridors */}
              <path d="M 40 90 L 660 90" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              <path d="M 120 30 L 120 420" stroke="#1e293b" strokeWidth="4" />
              <path d="M 540 20 L 540 430" stroke="#1e293b" strokeWidth="4" />
              <path d="M 40 360 L 660 360" stroke="#1e293b" strokeWidth="6" />

              {/* The Curving Barki Road Track */}
              <path
                d="M 100 120 C 220 120, 260 230, 380 230 C 490 230, 520 320, 580 320"
                stroke="#0f172a"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M 100 120 C 220 120, 260 230, 380 230 C 490 230, 520 320, 580 320"
                stroke="url(#liveRouteGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />

              {/* Landmarks */}
              <text x="70" y="70" fill="#94a3b8" fontSize="12" fontWeight="700">
                The Pizza Shop Store · Latif Market
              </text>
              <text x="280" y="205" fill="#64748b" fontSize="11" fontWeight="500">
                Main Barki Road Corridor
              </text>
              <text x="440" y="375" fill="#94a3b8" fontSize="12" fontWeight="700">
                Imperial Garden Homes / Paragon City
              </text>
              <text x="560" y="115" fill="#475569" fontSize="10">
                DHA Phase 8 Interchange
              </text>

              {/* Origin Marker */}
              <circle cx="100" cy="120" r="18" fill="#ef4444" fillOpacity="0.25" />
              <circle cx="100" cy="120" r="10" fill="#ef4444" />
              <circle cx="100" cy="120" r="4" fill="#ffffff" />

              {/* Destination Marker */}
              <circle cx="580" cy="320" r="18" fill="#10b981" fillOpacity="0.25" />
              <circle cx="580" cy="320" r="10" fill="#10b981" />
              <circle cx="580" cy="320" r="4" fill="#ffffff" />
            </svg>

            {/* Simulated Animated Bike on Route */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: `${14 + (riderProgress / 100) * 69}%`,
                top: `${26 + (riderProgress / 100) * 45}%`
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/50 border-2 border-white">
                  <Bike className="w-6 h-6" />
                </div>
                <div className="absolute top-13 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-500/60 shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Rider Usman · {currentStep === 5 ? 'Arrived' : 'In Transit'}</span>
                </div>
              </div>
            </motion.div>

            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="font-semibold">Kitchen: Latif Market, Paragon City</span>
            </div>

            <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold">Dropoff: Your Lahore Address</span>
            </div>
          </div>

          {/* Rider Profile Card & Simulation Toolbar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg border border-amber-500/30">
                MU
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Muhammad Usman</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-semibold border border-emerald-800">
                    Verified Express Rider
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Honda CD70 (Red) · LEA-4921 · Certified Safe Rider
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleFastForward}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Advance simulation step"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Simulate Step ({currentStep + 1}/6)</span>
              </button>

              <button
                onClick={handleResetSimulation}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <a
                href={`tel:${STORE_INFO.phoneMobile1}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call (0301-8408177)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Step Milestones & Full Order Receipt (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-5">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Live Kitchen & Rider Progress
              </h3>
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            </div>

            {/* Milestones list */}
            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {STEPS.map((st, idx) => {
                const isPast = idx < currentStep;
                const isCurrent = idx === currentStep;
                const StepIcon = st.icon;

                return (
                  <div key={idx} className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isPast
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-red-600 text-white ring-4 ring-red-950 animate-pulse'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <StepIcon className="w-3 h-3" />
                    </div>

                    <div>
                      <h4
                        className={`text-xs font-bold leading-tight ${
                          isCurrent ? 'text-red-400' : isPast ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {st.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Order Summary Card */}
          {activeOrder && (
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Order Breakdown (#{activeOrder.orderNumber})
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {activeOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-slate-300">
                    <span>{it.quantity}x {it.product.name}</span>
                    <span className="font-bold tabular-nums">Rs. {it.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
                <span>Grand Total:</span>
                <span className="text-red-400 tabular-nums">Rs. {activeOrder.total.toLocaleString()}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Payment: <strong className="uppercase text-slate-200">{activeOrder.paymentMethod}</strong> ({activeOrder.paymentStatus})
              </div>
            </div>
          )}

          {/* Direct Support Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="font-bold text-white block">24/7 Delivery Hotline:</span>
            <p>Tel: {STORE_INFO.phoneLandline} | Mobile: {STORE_INFO.phoneMobile1}</p>
            <p className="text-[10px] text-slate-500">Paragon City & Barki Road Delivery Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};
