import React from 'react';
import { X, ShieldCheck, Lock, Eye, Database, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Data Privacy & Security Protocols
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-900 dark:text-emerald-300">
            <span className="font-bold block mb-1">Your Data Ownership Guarantee</span>
            The Pizza Shop Paragon City respects customer privacy. We do not sell or monetize personal phone numbers, delivery coordinates, or payment details.
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>1. 256-Bit SSL Transport Security</span>
            </h4>
            <p>
              Every transaction and ordering step is encrypted end-to-end using TLS 1.3 protocol. Credit card data passes directly via compliant banking gateways and is never stored on unencrypted local servers.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-500" />
              <span>2. Delivery Address & Phone Synchronization</span>
            </h4>
            <p>
              Your contact number is utilized solely for dispatching order confirmations via SMS, WhatsApp receipt sharing, and direct rider coordination while navigating Barki Road and Paragon City.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-500" />
              <span>3. Total Customer Control & Deletion</span>
            </h4>
            <p>
              You have the right to request full export of your order history, clear session tokens, or purge saved addresses at any time via the Member Command Center.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
