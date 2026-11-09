import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pizza, Flame, Sparkles } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const ProfessionalLoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [stage, setStage] = useState('Firing up the stone ovens...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStage('Kneading fresh daily dough & Italian herbs...');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(80);
      setStage('Stocking premium mozzarella & peri-peri sauces...');
    }, 850);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStage('Welcome to The Pizza Shop Lahore!');
    }, 1250);

    const timerDone = setTimeout(() => {
      onComplete();
    }, 1550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerDone);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-slate-950/80 to-slate-950 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 to-red-600 p-0.5 shadow-2xl shadow-red-500/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Pizza className="w-12 h-12 text-amber-500" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-2 right-2 text-red-500"
                >
                  <Flame className="w-5 h-5 fill-red-500" />
                </motion.div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1 -right-1 text-amber-400"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Brand Name */}
          <h1 className="text-3xl font-extrabold tracking-tight font-heading text-white">
            THE PIZZA SHOP
          </h1>
          <p className="mt-1 text-xs tracking-widest uppercase text-amber-400/90 font-medium">
            Paragon City · Barki Road Lahore
          </p>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-slate-800 rounded-full mt-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Dynamic loading text */}
          <p className="mt-3 text-xs text-slate-400 tabular-nums">
            {stage}
          </p>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-500">
            <span>Dine-In</span>
            <span>·</span>
            <span>Takeaway</span>
            <span>·</span>
            <span>Live GPS Delivery</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
