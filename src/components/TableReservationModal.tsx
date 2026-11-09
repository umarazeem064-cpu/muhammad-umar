import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, Users, Utensils, CheckCircle2, QrCode } from 'lucide-react';
import { Reservation } from '../types';
import { STORE_INFO } from '../data/products';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReservationConfirmed: (res: Reservation) => void;
  language: Language;
}

export const TableReservationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onReservationConfirmed,
  language
}) => {
  const t = TRANSLATIONS[language];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState<number>(4);
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('8:00 PM');
  const [seatingArea, setSeatingArea] = useState('Family Hall (Air Conditioned)');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const token = 'RES-' + Math.floor(1000 + Math.random() * 9000);
    const newRes: Reservation = {
      id: 'res-' + Date.now(),
      token,
      name,
      phone,
      partySize,
      date,
      timeSlot,
      seatingArea,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString()
    };

    setConfirmedReservation(newRes);
    onReservationConfirmed(newRes);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  const TIME_SLOTS = [
    '1:00 PM', '2:30 PM', '4:00 PM', '6:30 PM', '7:30 PM',
    '8:30 PM', '9:30 PM', '10:30 PM', '11:30 PM', '12:30 AM (Midnight Special)'
  ];

  const SEATING_AREAS = [
    'Family Hall (Air Conditioned)',
    'Main Dining Hall',
    'Outdoor Lawn Veranda',
    'Executive Private Booth'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
              <Utensils className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {confirmedReservation ? 'Reservation Confirmed' : t.reservationTitle}
              </h2>
              <span className="text-[11px] text-slate-400">
                The Pizza Shop · Latif Market, Paragon City Lahore
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!confirmedReservation ? (
            <form id="reservation-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {t.customerName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {t.phoneNumber} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-XXXXXXX"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 tabular-nums"
                  />
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {t.partySize}
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[2, 4, 6, 8, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPartySize(num)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        partySize === num
                          ? 'border-red-600 bg-red-600 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    <span>{t.date}</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-red-600" />
                    <span>{t.timeSlot}</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {t.seatingArea}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SEATING_AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setSeatingArea(area)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        seatingArea === area
                          ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Special Arrangements (e.g. Birthday decor, High chair, Family privacy)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Optional note for table manager..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </form>
          ) : (
            /* Confirmed Pass */
            <div className="py-4 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Table Confirmed for {confirmedReservation.partySize} Guests!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Booking Token:{' '}
                  <span className="font-extrabold text-red-600 dark:text-red-400 tabular-nums">
                    {confirmedReservation.token}
                  </span>
                </p>
              </div>

              {/* Pass details */}
              <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-500">
                  <span>Guest Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{confirmedReservation.name}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Date & Slot:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {confirmedReservation.date} at {confirmedReservation.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Hall / Area:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{confirmedReservation.seatingArea}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Location:</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                    Latif Market, Paragon City Lahore
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-[11px] text-amber-800 dark:text-amber-300">
                Please present this token at the front counter upon arrival. Table held for 15 minutes past slot.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          {!confirmedReservation ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="reservation-form"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                {t.bookTableNow}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors text-center"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
