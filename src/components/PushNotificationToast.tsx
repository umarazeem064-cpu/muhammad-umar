import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCircle2, Flame, Bike, X } from 'lucide-react';
import { PushNotification } from '../types';

interface Props {
  notifications: PushNotification[];
  onDismiss: (id: string) => void;
  permissionGranted: boolean;
  onRequestPermission: () => void;
}

export const PushNotificationToast: React.FC<Props> = ({
  notifications,
  onDismiss,
  permissionGranted,
  onRequestPermission
}) => {
  // Show the latest 2 unread notifications
  const activeToasts = notifications.filter((n) => !n.read).slice(0, 2);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {/* Banner if notifications not enabled yet */}
      {!permissionGranted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto bg-amber-500/10 dark:bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-xl p-3 shadow-lg flex items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Enable real-time pizza oven & rider updates</span>
          </div>
          <button
            onClick={onRequestPermission}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap text-[11px]"
          >
            Allow
          </button>
        </motion.div>
      )}

      {/* Active toast alerts */}
      <AnimatePresence>
        {activeToasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xl flex items-start gap-3 text-slate-800 dark:text-slate-100"
          >
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
              {toast.type === 'order' ? (
                <Bike className="w-4 h-4" />
              ) : toast.type === 'deal' ? (
                <Flame className="w-4 h-4 text-red-500" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {toast.title}
                </h4>
                <span className="text-[10px] text-slate-400 tabular-nums">
                  {toast.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
