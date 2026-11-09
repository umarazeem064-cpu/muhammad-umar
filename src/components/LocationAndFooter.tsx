import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, ShieldCheck, Heart, Pizza } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { Language, TRANSLATIONS } from '../data/translations';
import { PrivacyModal } from './PrivacyModal';

interface Props {
  language: Language;
  onOpenReservation: () => void;
}

export const LocationAndFooter: React.FC<Props> = ({ language, onOpenReservation }) => {
  const t = TRANSLATIONS[language];
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      {/* Location & Map Highlight Section */}
      <section id="location-section" className="py-14 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Store Information Card (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block mb-1">
                  Visit Our Dine-In Restaurant
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                  The Pizza Shop Lahore
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Located in Latif Market right opposite the main gate of Imperial Garden Homes in Paragon City, Barki Road. Enjoy fresh stone-oven baked pizzas, flame-grilled burgers, and cozy family seating.
                </p>
              </div>

              {/* Contact & Address List */}
              <div className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Physical Address:</span>
                    <span>{STORE_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Direct Phone Lines:</span>
                    <div className="flex flex-wrap gap-2 mt-0.5">
                      <a href={`tel:${STORE_INFO.phoneLandline}`} className="hover:text-red-600 font-semibold underline">
                        {STORE_INFO.phoneLandline}
                      </a>
                      <span>·</span>
                      <a href={`tel:${STORE_INFO.phoneMobile1}`} className="hover:text-red-600 font-semibold underline">
                        {STORE_INFO.phoneMobile1}
                      </a>
                      <span>·</span>
                      <a href={`tel:${STORE_INFO.phoneMobile2}`} className="hover:text-red-600 font-semibold underline">
                        {STORE_INFO.phoneMobile2}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Operating Hours:</span>
                    <span>12:00 PM – 02:00 AM Daily</span>
                    <span className="text-amber-600 dark:text-amber-400 block text-[11px] font-semibold mt-0.5">
                      Midnight Special Deals: 12:30 AM – 1:30 AM
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <button
                  onClick={onOpenReservation}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  {t.tableReservation}
                </button>
              </div>
            </div>

            {/* Visual Interactive Map Card (7 Columns) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 relative aspect-video sm:aspect-[16/9]">
              <iframe
                title="The Pizza Shop Location Paragon City"
                src="https://maps.google.com/maps?q=Latif+Market+Paragon+City+Barki+Road+Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
              />

              {/* Floating Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                    <Pizza className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      The Pizza Shop
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Latif Market, Paragon City
                    </span>
                  </div>
                </div>

                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Bio */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
                  <Pizza className="w-4 h-4 text-amber-300" />
                </div>
                <span className="text-xl font-extrabold tracking-tight font-heading text-white">
                  The Pizza Shop
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Changing fast food for good. Serving authentic stone-oven pizzas, crunchy zinger burgers, and succulent peri peri chicken to Paragon City and Barki Road Lahore.
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Halal Certified · 100% Fresh Daily Dough</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a href="#menu-catalog" className="hover:text-white transition-colors">
                    Full Food Menu (100+ items)
                  </a>
                </li>
                <li>
                  <button onClick={onOpenReservation} className="hover:text-white transition-colors text-left">
                    Table Reservations
                  </button>
                </li>
                <li>
                  <a href="#reviews-section" className="hover:text-white transition-colors">
                    Customer Reviews & Ratings
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Direct WhatsApp Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Phone Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Order Phone Lines
              </h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p>Landline: <a href={`tel:${STORE_INFO.phoneLandline}`} className="text-white hover:underline">{STORE_INFO.phoneLandline}</a></p>
                <p>Mobile 1: <a href={`tel:${STORE_INFO.phoneMobile1}`} className="text-white hover:underline">{STORE_INFO.phoneMobile1}</a></p>
                <p>Mobile 2: <a href={`tel:${STORE_INFO.phoneMobile2}`} className="text-white hover:underline">{STORE_INFO.phoneMobile2}</a></p>
                <p>Email: <a href={`mailto:${STORE_INFO.email}`} className="text-white hover:underline">{STORE_INFO.email}</a></p>
              </div>
            </div>
          </div>

          {/* Bottom Bar & Privacy Policy Links */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} The Pizza Shop. All rights reserved. Paragon City, Barki Road, Lahore.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-slate-300 transition-colors underline"
              >
                Privacy Policy & Security
              </button>
              <span>·</span>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                Google Maps Location
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
};
