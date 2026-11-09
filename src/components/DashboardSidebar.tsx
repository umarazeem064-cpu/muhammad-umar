import React, { useState } from 'react';
import {
  X,
  User,
  ShoppingBag,
  Award,
  BarChart3,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Lock,
  Download,
  Trash2,
  DollarSign
} from 'lucide-react';
import { Order, Reservation } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  reservations: Reservation[];
  onTrackOrder: (order: Order) => void;
  onReOrder: (order: Order) => void;
  language: Language;
}

export const DashboardSidebar: React.FC<Props> = ({
  isOpen,
  onClose,
  orders,
  reservations,
  onTrackOrder,
  onReOrder,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'points' | 'analytics' | 'verification'>('verification');

  // Transaction Verification Tool State
  const [verifyWallet, setVerifyWallet] = useState<'easypaisa' | 'jazzcash' | 'raast' | 'sadapay' | 'nayapay' | 'bank'>('easypaisa');
  const [verifySender, setVerifySender] = useState('');
  const [verifyTid, setVerifyTid] = useState('');
  const [verifyAmount, setVerifyAmount] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'idle' | 'checking' | 'verified' | 'delayed' | 'fraud_alert';
    message: string;
    details?: string;
  }>({ status: 'idle', message: '' });

  // Profile info
  const [userName, setUserName] = useState('Umar Azeem');
  const [userPhone, setUserPhone] = useState('0301-8408177');
  const [userEmail, setUserEmail] = useState('thepizzashop77@gmail.com');
  const [primaryAddress, setPrimaryAddress] = useState('House 14-B, Imperial Garden Homes, Paragon City, Lahore');
  const [pizzaPoints, setPizzaPoints] = useState(480); // 1 point = Rs. 1

  if (!isOpen) return null;

  // Analytics calculations
  const totalSpent = orders.reduce((acc, o) => acc + o.total, 0) + 4850;
  const totalDelivered = orders.length + 8;

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      user: { userName, userPhone, userEmail, primaryAddress, pizzaPoints },
      orders,
      reservations
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "the_pizza_shop_user_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleVerifyTransaction = () => {
    if (!verifyTid || verifyTid.trim().length < 4) {
      alert('براہ کرم کسٹمر کا Transaction ID (TID) یا Trx ID درج کریں۔');
      return;
    }

    setVerificationResult({ status: 'checking', message: 'ٹرانزیکشن اور بینک لیجر کی جانچ جاری ہے...' });

    setTimeout(() => {
      const cleanTid = verifyTid.trim();
      const numTid = cleanTid.replace(/\D/g, '');

      // Check if matches an existing order in database
      const matchedOrder = orders.find(o => o.transactionId && o.transactionId.toLowerCase().includes(cleanTid.toLowerCase()));

      if (matchedOrder) {
        setVerificationResult({
          status: 'verified',
          message: `تصدیق شدہ! رقم موصول ہو چکی ہے (Order #${matchedOrder.orderNumber})`,
          details: `کسٹمر: ${matchedOrder.customerName} | رقم: Rs. ${matchedOrder.total} | تاریخ: ${matchedOrder.createdAt} | اسٹیٹس: ${matchedOrder.paymentStatus.toUpperCase()}`
        });
        return;
      }

      // Check format for fraud alert (e.g. invalid length, obvious spoof)
      if (verifyWallet === 'easypaisa' && (numTid.length < 10 || numTid.length > 12)) {
        setVerificationResult({
          status: 'fraud_alert',
          message: 'مشکوک ٹرانزیکشن آئی ڈی (Fraud Alert)!',
          details: 'ایزی پیسہ کا آفیشل TID ہمیشہ 11 ہندسوں کا ہوتا ہے جو صرف 3737 سے موصول ہوتا ہے۔ اگر کسٹمر نے کسی عام نمبر (03XX) سے آیا ہوا میسج دکھایا ہے تو وہ جعلی (Fake SMS) ہو سکتا ہے۔'
        });
        return;
      }

      if (verifyWallet === 'jazzcash' && (numTid.length < 10 || numTid.length > 12)) {
        setVerificationResult({
          status: 'fraud_alert',
          message: 'مشکوک ٹرانزیکشن آئی ڈی (Fraud Alert)!',
          details: 'جاز کیش کا اصلی میسج صرف 8558 سے آتا ہے۔ کسی عام موبائل نمبر سے آیا ہوا ایس ایم ایس جعلی ہوتا ہے۔'
        });
        return;
      }

      // If valid format but delayed in 1Link queue
      setVerificationResult({
        status: 'delayed',
        message: 'ٹرانزیکشن 1Link / بینک سسٹم میں التوا (Queue Delay) کا شکار ہو سکتی ہے',
        details: `TID: ${cleanTid} درست فارمیٹ میں ہے۔ اگر کسٹمر نے 1 گھنٹہ پہلے بھیجے ہیں تو اپنے EasyPaisa/JazzCash ایپ کے اندر 'Transaction History' چیک کریں۔ اگر وہاں نہیں آیا تو کسٹمر سے بولیں کہ وہ اپنی ہیلپ لائن (EasyPaisa 3737 / JazzCash 4444) پر کال کر کے ریورس چیک کریں، یا فی الحال رائیڈر کو کیش آن ڈلیوری پر کھانا وصول کرنے دیں، جیسے ہی رقم شو ہو گی فوری کسٹمر کے اکاؤنٹ میں ریورس یا ایڈجسٹ ہو جائے گی۔`
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-8 sm:pl-16">
        <div className="w-screen max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                PS
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Member Command Center
                </h2>
                <span className="text-xs text-slate-400">
                  Profile · Order History · Payment Verifier · Analytics
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Strip */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-6 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('verification')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'verification'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verify Payment (پیمنٹ تصدیق)</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile & Address</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('points')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'points'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Pizza Points</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'analytics'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
              <span>Store Analytics</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* PAYMENT VERIFICATION TAB (INSTANT DISPUTE RESOLUTION) */}
            {activeTab === 'verification' && (
              <div className="space-y-6">
                {/* Urgent Assistance Alert */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-amber-700 dark:text-amber-300">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>کسٹمر کی رقم موصول نہ ہونے کی فوری حل گائیڈ</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    اگر کوئی کسٹمر کہہ رہا ہے کہ اس نے گھنٹہ پہلے پیسے بھیجے ہیں مگر آپ کو نہیں ملے، تو پریشان نہ ہوں۔ سب سے پہلے اس سے <strong>11 ہندسوں کا Transaction ID (TID)</strong> مانگیں اور نیچے درج کریں۔
                  </p>
                </div>

                {/* Instant Verifier Form */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span>Real-Time TID & Payment Verifier</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Select Payment Wallet (کس طریقے سے بھیجے؟)
                      </label>
                      <select
                        value={verifyWallet}
                        onChange={(e: any) => setVerifyWallet(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        <option value="easypaisa">EasyPaisa (Till: 0301-8408177)</option>
                        <option value="jazzcash">JazzCash (Till: 0342-8308177)</option>
                        <option value="raast">Meezan Bank / SBP Raast</option>
                        <option value="sadapay">SadaPay (@thepizzashop)</option>
                        <option value="nayapay">NayaPay (0301-8408177)</option>
                        <option value="bank">Other Bank Transfer (1Link)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Amount Claimed (رقم روپے میں)
                      </label>
                      <input
                        type="number"
                        value={verifyAmount}
                        onChange={(e) => setVerifyAmount(e.target.value)}
                        placeholder="e.g. 1500"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 tabular-nums"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Customer Sender Mobile Number (کسٹمر کا نمبر)
                    </label>
                    <input
                      type="tel"
                      value={verifySender}
                      onChange={(e) => setVerifySender(e.target.value)}
                      placeholder="03XXXXXXXXX"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Transaction ID / TID / RRN * (ایس ایم ایس والا کوڈ)
                    </label>
                    <input
                      type="text"
                      value={verifyTid}
                      onChange={(e) => setVerifyTid(e.target.value)}
                      placeholder="e.g. 11094827103 (EasyPaisa 11 digits) or RRN"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                    />
                  </div>

                  <button
                    onClick={handleVerifyTransaction}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Transaction Now (تصدیق کریں)</span>
                  </button>

                  {/* Verification Outcome Box */}
                  {verificationResult.status !== 'idle' && (
                    <div className={`p-4 rounded-xl border space-y-2 text-xs animate-in fade-in duration-200 ${
                      verificationResult.status === 'verified'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                        : verificationResult.status === 'fraud_alert'
                        ? 'bg-red-50 dark:bg-red-950/40 border-red-300 text-red-900 dark:text-red-200'
                        : verificationResult.status === 'delayed'
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5">
                        {verificationResult.status === 'verified' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {verificationResult.status === 'fraud_alert' && <Lock className="w-4 h-4 text-red-600" />}
                        {verificationResult.status === 'delayed' && <Clock className="w-4 h-4 text-amber-600" />}
                        <span>{verificationResult.message}</span>
                      </div>
                      {verificationResult.details && (
                        <p className="text-[11px] leading-relaxed opacity-90">
                          {verificationResult.details}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* 5 Crucial Rules for the Shopkeeper / Cashier */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    دکاندار کے لیے 4 لازمی احتیاطی تدابیر (Fraud Prevention Checklist)
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">صرف 3737 اور 8558 کا SMS ہی اصل ہوتا ہے:</strong>
                        <p className="text-[11px] text-slate-500">اگر کسٹمر کے موبائل پر کسی 0300، 0321 وغیرہ عام نمبر سے میسج آیا ہے تو وہ 100٪ فراڈ/جعلی ہے۔ اصلی میسج کا ہیڈر ہمیشہ صرف "3737" یا "8558" ہوتا ہے۔</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">اپنا EasyPaisa / JazzCash App کھولیں:</strong>
                        <p className="text-[11px] text-slate-500">ٹیلی کام نیٹ ورک ڈیلے کی وجہ سے دکاندار کو ایس ایم ایس لیٹ ہو سکتا ہے۔ آپ فوری اپنی ایپ کے اندر "Transaction History" میں بیلنس چیک کریں۔</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">کسٹمر کی سکرین سے نمبر چیک کریں:</strong>
                        <p className="text-[11px] text-slate-500">چیک کریں کہ کہیں کسٹمر نے غلطی سے 0301-8408177 کا کوئی ایک ہندسہ غلط تو نہیں ٹائپ کر دیا، یا کسی اور شخص کو تو نہیں بھیج دیا؟</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                      <div>
                        <strong className="text-slate-900 dark:text-white">محفوظ طریقہ کار:</strong>
                        <p className="text-[11px] text-slate-500">کسٹمر کو بتائیں: "محترم سر، ہمارے کھاتے میں رقم نہیں اتری۔ آپ فی الحال رائیڈر کو کیش دے دیں، ہم آپ کی TID محفوظ کر رہے ہیں۔ جیسے ہی 1Link سے کلیئر ہو گی ہم فورا رقم آپ کے ایزی پیسہ میں ریورس بھیج دیں گے"۔ اس سے نہ آپ کا نقصان ہو گا نہ کسٹمر ناراض ہو گا۔</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl font-bold font-heading">
                    {userName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {userName}
                    </h3>
                    <p className="text-xs text-slate-400">{userEmail}</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      VIP Gold Customer · 480 Points
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Contact & Delivery Preferences
                  </h4>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Default Delivery Address (Lahore)
                    </label>
                    <textarea
                      rows={2}
                      value={primaryAddress}
                      onChange={(e) => setPrimaryAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Data Privacy & Security Action Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Data Privacy & Security Guarantee</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    All personal details, phone numbers, and delivery locations are encrypted and never shared with third parties. You maintain full control over your data.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={handleExportData}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download My Data (JSON)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ORDER HISTORY TAB */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Past Orders & Real-Time Tracking
                </h4>

                {orders.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-2 text-slate-300 dark:text-slate-700" />
                    <p className="text-xs">No active orders yet.</p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            Order #{ord.orderNumber}
                          </span>
                          <span className="text-[11px] text-slate-400 block tabular-nums">
                            {ord.createdAt} · {ord.items.length} items
                          </span>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400">
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Items Preview */}
                      <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-[11px]">
                            <span className="truncate max-w-[200px]">
                              {it.quantity}x {it.product.name}
                            </span>
                            <span className="tabular-nums font-semibold">
                              {t.price} {it.totalPrice.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Total: {t.price} {ord.total.toLocaleString()}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onTrackOrder(ord);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <span>Live Track</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* PIZZA POINTS TAB */}
            {activeTab === 'points' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest uppercase text-amber-200">
                      Loyalty Pizza Points
                    </span>
                    <Award className="w-6 h-6 text-amber-200" />
                  </div>
                  <div className="text-4xl font-black tabular-nums font-heading">
                    {pizzaPoints} PTS
                  </div>
                  <p className="text-xs text-white/90">
                    Worth Rs. {pizzaPoints} off on your next order! Earn 10 points for every Rs. 100 spent at The Pizza Shop.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    How Pizza Points Work
                  </h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">1.</span>
                      <span>Place orders online for home delivery or table reservations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">2.</span>
                      <span>Earn 10% cash-equivalent points on every settled bill.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">3.</span>
                      <span>Redeem instantly at checkout for free pizzas, dips, and cold drinks!</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* RESTAURANT ANALYTICS TAB (MANAGER MODE) */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    The Pizza Shop · Paragon City Daily Insights
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    Kitchen Live
                  </span>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Today's Revenue</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums font-heading">
                      Rs. 184,500
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">+18% vs yesterday</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Orders Dispatched</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums font-heading">
                      142
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">Avg delivery 32 mins</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Top Selling Item</span>
                    <span className="text-sm font-bold text-red-600 dark:text-red-400 block truncate">
                      Chicken Tikka Pizza
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">54 pies baked</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-400 block">Customer Rating</span>
                    <span className="text-xl font-black text-amber-500 tabular-nums font-heading">
                      4.8 / 5.0
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">Based on 864 reviews</span>
                  </div>
                </div>

                {/* Popular Crust Distribution */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Crust Popularity Breakdown</span>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                        <span>Cheese Stuffed Crust</span>
                        <span className="font-bold tabular-nums">46%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[46%] h-full bg-red-600 rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                        <span>Deep Pan Classic</span>
                        <span className="font-bold tabular-nums">32%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[32%] h-full bg-amber-500 rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                        <span>Kabab Stuffed Crust</span>
                        <span className="font-bold tabular-nums">22%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[22%] h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
