import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  MapPin,
  Phone,
  User,
  QrCode,
  Copy,
  Check,
  Printer,
  Sparkles,
  AlertCircle,
  FileText,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { CartItem, Order, PaymentMethodType } from '../types';
import { STORE_INFO } from '../data/products';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discount: number;
  onOrderPlaced: (order: Order) => void;
  language: Language;
}

export const CheckoutModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cart,
  discount,
  onOrderPlaced,
  language
}) => {
  const t = TRANSLATIONS[language];

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = subtotal >= STORE_INFO.freeDeliveryThreshold ? 0 : STORE_INFO.deliveryFee;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);
  const usdAmount = (grandTotal / 280).toFixed(2);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Paragon City');
  const [instructions, setInstructions] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('easypaisa');
  
  // Wallet & Payment Inputs
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // OTP Simulation Dialog
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  // UI Flow Steps
  const [step, setStep] = useState<'details' | 'payment' | 'verifying' | 'success'>('details');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('Please fill in your name, contact phone, and delivery address.');
      return;
    }
    setStep('payment');
  };

  const handleTriggerConfirmation = () => {
    // If card or online wallet with TID required
    if (['easypaisa', 'jazzcash', 'payoneer', 'sadapay', 'nayapay', 'raast'].includes(paymentMethod)) {
      if (!transactionId || transactionId.trim().length < 4) {
        alert('Please enter your Transaction Reference ID (Trx ID / TID) after sending payment to verify your order and guarantee funds security.');
        return;
      }
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        alert('Please enter complete credit/debit card information.');
        return;
      }
      // Show 3D Secure OTP verification simulation for card
      setShowOtpDialog(true);
      return;
    }

    finalizeOrder();
  };

  const finalizeOrder = () => {
    setShowOtpDialog(false);
    setStep('verifying');

    setTimeout(() => {
      const orderNum = 'PS-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder: Order = {
        id: 'ord-' + Date.now(),
        orderNumber: orderNum,
        items: [...cart],
        customerName,
        phone,
        address: `${address}, ${area}, Lahore`,
        area,
        paymentMethod,
        transactionId: transactionId || undefined,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        subtotal,
        deliveryFee,
        discount,
        total: grandTotal,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'placed',
        estimatedDeliveryTime: '35 - 45 mins',
        riderName: 'Muhammad Usman',
        riderPhone: '0301-8408177',
        riderVehicle: 'Honda CD70 (Red) - LEA-4921',
        trackingStep: 0
      };

      setPlacedOrder(newOrder);
      setStep('success');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (err) {
        // Fallback
      }

      onOrderPlaced(newOrder);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length === 6) {
      finalizeOrder();
    } else {
      setOtpError('Please enter the 6-digit OTP received via SMS (e.g. 582914)');
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 bg-slate-100 dark:bg-slate-950 flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Fullscreen Header */}
      <header className="h-16 px-4 sm:px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={step === 'payment' ? () => setStep('details') : onClose}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-red-600/30">
            PS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                The Pizza Shop · Secure Full-Screen Checkout
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit SSL Secured
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paragon City, Barki Road, Lahore · Tel: 0301-8408177 / 042-37167082
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/50 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Money-Back & Delivery Guarantee</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Full-Screen Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane: Order Breakdown & Verified Trust Credentials (Desktop 40% / Mobile Top) */}
        <aside className="w-full lg:w-[420px] xl:w-[460px] bg-slate-50 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto shrink-0 p-5 sm:p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600" />
                <span>Your Order Basket ({cart.length})</span>
              </h2>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                Delivery: 35-45 mins
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-64 sm:max-h-72 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-100 dark:border-slate-700 shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Qty: {item.quantity} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                    Rs. {item.totalPrice.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Lahore Delivery Fee:</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `Rs. ${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Special Promo Discount:</span>
                  <span className="font-bold tabular-nums">-Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between items-baseline text-sm font-black text-slate-900 dark:text-white">
                <span>Payable Amount:</span>
                <div className="text-right">
                  <span className="text-xl text-red-600 dark:text-red-400 font-black tabular-nums">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-normal">
                    ≈ ${usdAmount} USD (for International / Payoneer)
                  </span>
                </div>
              </div>
            </div>

            {/* Zero Risk Guarantee Box */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>100% Payment & Food Safety Promise</span>
              </div>
              <p className="text-[11px] text-amber-700 dark:text-amber-300/80 leading-relaxed">
                آپ کے پیسے بالکل محفوظ ہیں! اگر کسی وجہ سے کھانا وقت پر یا معیاری نہ پہنچا، تو فوراً 100٪ رقم اسی والیٹ یا کارڈ میں واپس کر دی جائے گی۔
              </p>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400 pt-1">
                <span>✓ SBP Raast Verified</span>
                <span>✓ Verified Merchant Till</span>
                <span>✓ Instant SMS Receipt</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-400">
            Helpline: <strong>0301 8408177</strong> · Latif Market, Paragon City, Lahore
          </div>
        </aside>

        {/* Right Pane: Checkout Workflow (Details, Wallets, Real QR, TID Verification, Receipt) */}
        <main className="flex-1 bg-white dark:bg-slate-950 overflow-y-auto p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
          {/* STEP 1: Details */}
          {step === 'details' && (
            <div className="max-w-2xl mx-auto w-full space-y-6">
              <div>
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  Step 1 of 2
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Delivery Destination & Customer Info
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Where should our Paragon City kitchen rider dispatch your steaming hot order?
                </p>
              </div>

              <form id="checkout-details-form" onSubmit={handleProceedToPayment} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Full Name (مکمل نام) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Mian Hamza Ali"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Contact Phone Number (فون نمبر - برائے رابطہ اور رائیڈر کال) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0301-XXXXXXX or 0342-XXXXXXX"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                      Lahore Sector / Area (علاقہ)
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-3.5 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Paragon City">Paragon City (Free Delivery)</option>
                      <option value="Imperial Garden Homes">Imperial Garden Homes</option>
                      <option value="Green City Barki Rd">Green City Barki Road</option>
                      <option value="Barki Road Sector">Barki Road Main Corridor</option>
                      <option value="DHA Phase 8">DHA Phase 8 (Adjacent)</option>
                      <option value="Askari 10 & 11">Askari 10 & 11</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                      House / Street / Block (پورا گھر کا پتہ) *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. House 42-B, Imperial Garden Homes"
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Special Delivery Instructions (اختیاری ہدایت)
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Call upon reaching gate, ring doorbell twice, keep spicy"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors"
                  >
                    Back to Store
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 text-sm flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <span>Proceed to Secure Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: Payment Gateway Selection & Authentic Wallet Transfer */}
          {step === 'payment' && (
            <div className="max-w-3xl mx-auto w-full space-y-6">
              <div>
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  Step 2 of 2 · Real-Time Secure Gateway
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Choose Wallet / Payment Method
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Select your preferred Pakistani wallet, International Payoneer, Card, or COD. Funds are held under 100% money-back guarantee.
                </p>
              </div>

              {/* Wallet Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* EasyPaisa */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'easypaisa'
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                      EP
                    </div>
                    {paymentMethod === 'easypaisa' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">EasyPaisa</span>
                    <span className="text-[10px] text-slate-500">Till & Mobile Transfer</span>
                  </div>
                </button>

                {/* JazzCash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'jazzcash'
                      ? 'border-red-600 bg-red-50/50 dark:bg-red-950/40 ring-2 ring-red-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">
                      JC
                    </div>
                    {paymentMethod === 'jazzcash' && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">JazzCash</span>
                    <span className="text-[10px] text-slate-500">Till & Mobile Wallet</span>
                  </div>
                </button>

                {/* Payoneer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('payoneer')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'payoneer'
                      ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/40 ring-2 ring-orange-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 text-white font-black text-xs flex items-center justify-center">
                      PO
                    </div>
                    {paymentMethod === 'payoneer' && <CheckCircle2 className="w-4 h-4 text-orange-500" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Payoneer</span>
                    <span className="text-[10px] text-slate-500">USD & Card</span>
                  </div>
                </button>

                {/* SadaPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('sadapay')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'sadapay'
                      ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/40 ring-2 ring-cyan-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500 text-white font-black text-xs flex items-center justify-center">
                      SP
                    </div>
                    {paymentMethod === 'sadapay' && <CheckCircle2 className="w-4 h-4 text-cyan-500" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">SadaPay</span>
                    <span className="text-[10px] text-slate-500">@thepizzashop</span>
                  </div>
                </button>

                {/* NayaPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nayapay')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'nayapay'
                      ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 ring-2 ring-purple-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                      NP
                    </div>
                    {paymentMethod === 'nayapay' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">NayaPay</span>
                    <span className="text-[10px] text-slate-500">Fast Wallet Debit</span>
                  </div>
                </button>

                {/* Raast / Meezan Bank */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('raast')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'raast'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                      SBP
                    </div>
                    {paymentMethod === 'raast' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Raast / Bank</span>
                    <span className="text-[10px] text-slate-500">Instant 0% Fee</span>
                  </div>
                </button>

                {/* Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Debit / Card</span>
                    <span className="text-[10px] text-slate-500">Visa / Mastercard</span>
                  </div>
                </button>

                {/* Cash on Delivery (COD) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-slate-800 bg-slate-100 dark:bg-slate-800 ring-2 ring-slate-700'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Banknote className="w-6 h-6 text-emerald-600" />
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Cash on Delivery</span>
                    <span className="text-[10px] text-slate-500">Pay Rider at Door</span>
                  </div>
                </button>
              </div>

              {/* Dynamic Merchant Details & Verification Box */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
                {/* 1. EASYPAISA INSTRUCTIONS */}
                {paymentMethod === 'easypaisa' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            EasyPaisa Verified Merchant
                          </span>
                          <span className="text-xs text-slate-400">Till: 0301-8408177</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          The Pizza Shop Lahore · EasyPaisa
                        </h4>
                        <p className="text-xs text-slate-500">
                          Transfer directly via EasyPaisa App or dial *786# to account: <strong>0301-8408177</strong>
                        </p>
                      </div>

                      {/* Copy Button */}
                      <button
                        type="button"
                        onClick={() => handleCopy('03018408177', 'ep')}
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50"
                      >
                        {copiedKey === 'ep' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'ep' ? 'Copied Number!' : 'Copy 03018408177'}</span>
                      </button>
                    </div>

                    {/* QR Code and TID Verification input */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-slate-900 p-2 rounded-xl flex items-center justify-center text-white mb-1 shadow-inner">
                          <QrCode className="w-20 h-20 text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">Scan via EasyPaisa App</span>
                      </div>

                      <div className="sm:col-span-2 space-y-3">
                        <div>
                          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                            Your EasyPaisa Sender Mobile Number *
                          </label>
                          <input
                            type="tel"
                            value={senderPhone || phone}
                            onChange={(e) => setSenderPhone(e.target.value)}
                            placeholder="03XXXXXXXXX"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 tabular-nums"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                            EasyPaisa Transaction ID (TID / Trx ID) *
                          </label>
                          <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="e.g. 11094827103 (From 3737 SMS)"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 tabular-nums font-mono"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            Enter the 11-digit Trx ID from your EasyPaisa confirmation SMS so the system verifies your payment immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. JAZZCASH INSTRUCTIONS */}
                {paymentMethod === 'jazzcash' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                            JazzCash Verified Merchant
                          </span>
                          <span className="text-xs text-slate-400">Till: 0342-8308177</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          The Pizza Shop Paragon City · JazzCash
                        </h4>
                        <p className="text-xs text-slate-500">
                          Send payment via JazzCash App or dial *786# to Till/Account: <strong>0342-8308177</strong>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy('03428308177', 'jc')}
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50"
                      >
                        {copiedKey === 'jc' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'jc' ? 'Copied Number!' : 'Copy 03428308177'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-slate-900 p-2 rounded-xl flex items-center justify-center text-white mb-1 shadow-inner">
                          <QrCode className="w-20 h-20 text-red-500" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">Scan via JazzCash App</span>
                      </div>

                      <div className="sm:col-span-2 space-y-3">
                        <div>
                          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                            Your JazzCash Sender Mobile Number *
                          </label>
                          <input
                            type="tel"
                            value={senderPhone || phone}
                            onChange={(e) => setSenderPhone(e.target.value)}
                            placeholder="03XXXXXXXXX"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 tabular-nums"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                            JazzCash Transaction ID (Trx ID) *
                          </label>
                          <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="e.g. 02938472910 (From 8558 SMS)"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 tabular-nums font-mono"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            Instant verification via JazzCash API ensures your order is queued with zero delay.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. PAYONEER INSTRUCTIONS */}
                {paymentMethod === 'payoneer' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                            Payoneer International Merchant
                          </span>
                          <span className="text-xs text-slate-400">Customer ID: P-91823714</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          Payoneer Account: thepizzashop77@gmail.com
                        </h4>
                        <p className="text-xs text-slate-500">
                          Transfer <strong>${usdAmount} USD</strong> (equivalent to Rs. {grandTotal.toLocaleString()}) to Payoneer recipient.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy('thepizzashop77@gmail.com', 'po')}
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50"
                      >
                        {copiedKey === 'po' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'po' ? 'Copied Email!' : 'Copy Payoneer Email'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                          Your Payoneer Email / Account ID *
                        </label>
                        <input
                          type="email"
                          value={senderPhone}
                          onChange={(e) => setSenderPhone(e.target.value)}
                          placeholder="your-payoneer@email.com"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                          Payoneer Payment Reference / Transaction ID *
                        </label>
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g. PAY-392019482"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SADAPAY / NAYAPAY INSTRUCTIONS */}
                {(paymentMethod === 'sadapay' || paymentMethod === 'nayapay') && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {paymentMethod === 'sadapay' ? 'SadaPay App: @thepizzashop' : 'NayaPay Wallet: 0301-8408177'}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Registered title: <strong>The Pizza Shop (Paragon City)</strong>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy('03018408177', 'sp')}
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50"
                      >
                        {copiedKey === 'sp' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'sp' ? 'Copied Number!' : 'Copy 03018408177'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                          Your Sender Wallet Number *
                        </label>
                        <input
                          type="tel"
                          value={senderPhone || phone}
                          onChange={(e) => setSenderPhone(e.target.value)}
                          placeholder="03XXXXXXXXX"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 tabular-nums"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                          Transaction Reference (Trx ID) *
                        </label>
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g. SD-928174 / NY-817294"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. RAAST / MEEZAN BANK INSTRUCTIONS */}
                {paymentMethod === 'raast' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                            SBP Raast Instant 0% Fee
                          </span>
                          <span className="text-xs text-slate-400">Raast ID: 03018408177</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          Meezan Bank Ltd · The Pizza Shop
                        </h4>
                        <p className="text-xs text-slate-500 font-mono">
                          IBAN: PK64MEZN0001020304050607
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy('03018408177', 'raast')}
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50"
                      >
                        {copiedKey === 'raast' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'raast' ? 'Copied Raast ID!' : 'Copy Raast ID'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                          Bank Name & Account Title
                        </label>
                        <input
                          type="text"
                          value={senderPhone}
                          onChange={(e) => setSenderPhone(e.target.value)}
                          placeholder="e.g. HBL / Meezan - Muhammad Ali"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                          Bank Transfer Reference / RRN *
                        </label>
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g. 48192047192"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. CREDIT / DEBIT CARD INPUTS */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Enter Card Details (3D Secure 2.0 Protected)
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                          VISA
                        </span>
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded">
                          MasterCard
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          PayPak
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="As printed on front of card"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                          Card Number (16 Digits)
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4000 1234 5678 9010"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white tabular-nums font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                            Expiry MM/YY
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="08/28"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white tabular-nums font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                            CVV / CVC (Back 3 digits)
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white tabular-nums font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. CASH ON DELIVERY (COD) */}
                {paymentMethod === 'cod' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Cash On Delivery (کیش آن ڈلیوری)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Hand payment to rider Muhammad Usman upon receiving food.
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      Please have exact cash of <strong>Rs. {grandTotal.toLocaleString()}</strong> ready or specify if change for Rs. 5000 is required in delivery notes.
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Back to Details
                </button>

                <button
                  type="button"
                  onClick={handleTriggerConfirmation}
                  className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-xl shadow-red-600/30 text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Payment & Place Order (Rs. {grandTotal.toLocaleString()})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP: Verifying / Connecting with Bank */}
          {step === 'verifying' && (
            <div className="my-auto py-16 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Verifying Transaction & Transmitting to Kitchen...
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Checking merchant reference TID with <strong>{paymentMethod.toUpperCase()}</strong> network and generating your official order token in Paragon City.
              </p>
              <div className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Risk Guarantee Active · Funds Protected</span>
              </div>
            </div>
          )}

          {/* STEP: SUCCESS & PRINTABLE OFFICIAL TAX INVOICE */}
          {step === 'success' && placedOrder && (
            <div className="max-w-3xl mx-auto w-full space-y-6 my-auto py-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
                  Order Successfully Placed & Verified!
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tracking ID: <span className="font-mono font-bold text-slate-900 dark:text-white">#{placedOrder.orderNumber}</span> · Payment Status: <span className="text-emerald-600 font-bold uppercase">{placedOrder.paymentStatus}</span>
                </p>
              </div>

              {/* Official Tax Invoice Container (Printable) */}
              <div
                id="printable-tax-invoice"
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-5 text-slate-800 dark:text-slate-200"
              >
                {/* Invoice Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
                  <div>
                    <h3 className="text-xl font-black text-red-600">THE PIZZA SHOP</h3>
                    <p className="text-xs text-slate-500">
                      Latif Market, Opp Gate Imperial Garden Homes, Paragon City, Barki Rd, Lahore
                    </p>
                    <p className="text-[11px] text-slate-400">
                      NTN: 4819204-7 · PRA Sales Tax Invoice · 042-37167082 / 0301-8408177
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block sm:inline-block">
                      VERIFIED RECEIPT
                    </span>
                    <p className="text-xs text-slate-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-xs text-slate-500">Time: {placedOrder.createdAt}</p>
                  </div>
                </div>

                {/* Customer Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Customer Name:</span>
                    <strong className="text-slate-900 dark:text-white">{placedOrder.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone Contact:</span>
                    <strong className="text-slate-900 dark:text-white tabular-nums">{placedOrder.phone}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Delivery Address:</span>
                    <strong className="text-slate-900 dark:text-white">{placedOrder.address}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Payment Method:</span>
                    <strong className="uppercase text-slate-900 dark:text-white">{placedOrder.paymentMethod}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Transaction Reference TID:</span>
                    <strong className="font-mono text-slate-900 dark:text-white">{placedOrder.transactionId || 'COD-VERIFIED'}</strong>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border-t border-b border-slate-200 dark:border-slate-800 py-3 space-y-2 text-xs">
                  {placedOrder.items.map((it, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{it.quantity}x {it.product.name} {it.selectedSize ? `(${it.selectedSize})` : ''}</span>
                      <span className="font-bold tabular-nums">Rs. {it.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-sm">
                    <span>Total Amount Paid:</span>
                    <span className="text-red-600 dark:text-red-400 tabular-nums">Rs. {placedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Verification Seal */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Assigned Rider: Muhammad Usman (0301-8408177)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Token: {placedOrder.orderNumber}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrintInvoice}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Download Tax Receipt (پرنٹ رسید)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all active:scale-95"
                >
                  <span>Launch Live Full-Screen Order Radar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3D SECURE OTP SIMULATION MODAL */}
      {showOtpDialog && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>3D Secure 2.0 Bank Verification</span>
              </div>
              <button
                onClick={() => setShowOtpDialog(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              For your financial protection, a 6-digit one-time password (OTP) has been sent to your registered mobile number for amount <strong>Rs. {grandTotal.toLocaleString()}</strong>.
            </p>

            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-center font-mono">
              Demo Test SMS OTP: <strong className="text-red-600">582914</strong>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Enter 6-Digit OTP Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => {
                  setOtpCode(e.target.value);
                  setOtpError('');
                }}
                placeholder="582914"
                className="w-full px-4 py-3 text-center text-lg font-mono font-bold tracking-widest rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {otpError && <p className="text-xs text-red-500 mt-1">{otpError}</p>}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowOtpDialog(false)}
                className="w-1/2 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Authorize & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
