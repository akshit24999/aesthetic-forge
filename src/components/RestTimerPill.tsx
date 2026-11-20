import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Plus, X, Play, Pause, Bell } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface RestTimerPillProps {
  initialSeconds?: number;
  isActive: boolean;
  onClose: () => void;
}

export const RestTimerPill: React.FC<RestTimerPillProps> = ({
  initialSeconds = 90,
  isActive,
  onClose
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);

  useEffect(() => {
    if (isActive) {
      setSecondsLeft(initialSeconds);
      setIsPaused(false);
      setIsAlerting(false);
    }
  }, [initialSeconds, isActive]);

  useEffect(() => {
    if (!isActive || isPaused || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsAlerting(true);
          soundFX.playTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, secondsLeft]);

  if (!isActive) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSecs = secondsLeft % 60;
  const formattedTime = `${minutes}:${remainingSecs.toString().padStart(2, '0')}`;

  const addTime = (secs: number) => {
    setSecondsLeft(prev => Math.max(0, prev + secs));
    setIsAlerting(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -60, opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="fixed top-3 inset-x-0 mx-auto z-50 flex justify-center px-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl border transition-colors ${
            isAlerting
              ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200 animate-pulse shadow-emerald-900/40'
              : 'bg-zinc-900/90 border-cyan-500/30 text-zinc-100 shadow-black/60'
          }`}
          style={{ minWidth: '280px' }}
        >
          {/* Dynamic Island Style Pill */}
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full ${isAlerting ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
              {isAlerting ? <Bell size={16} className="animate-bounce" /> : <Timer size={16} />}
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-semibold block leading-tight">
                {isAlerting ? 'Time Up!' : 'Rest Timer'}
              </span>
              <span className="num-mono text-lg font-bold tracking-tight text-white">
                {formattedTime}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            {/* Quick +30s */}
            <button
              onClick={() => addTime(30)}
              className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 flex items-center gap-0.5 active:scale-95 transition"
            >
              <Plus size={12} />
              30s
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPaused(p => !p)}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 active:scale-95 transition"
              aria-label="Pause timer"
            >
              {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} />}
            </button>

            {/* Dismiss */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 active:scale-95 transition"
              aria-label="Dismiss timer"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
