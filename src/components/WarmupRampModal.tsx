import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Check } from 'lucide-react';
import type { WorkoutSet } from '../types';

interface WarmupRampModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  unit: string;
  onApplyWarmupSets: (newSets: WorkoutSet[]) => void;
}

export const WarmupRampModal: React.FC<WarmupRampModalProps> = ({
  isOpen,
  onClose,
  exerciseName,
  unit,
  onApplyWarmupSets
}) => {
  const [workingWeight, setWorkingWeight] = useState<number | ''>(80);

  if (!isOpen) return null;

  const target = typeof workingWeight === 'number' && workingWeight > 0 ? workingWeight : 0;

  // Exact Ramp Prescriptions from the System Guide:
  // Set 1: ~45% x 8 reps
  // Set 2: ~65% x 4-6 reps (average 5)
  // Set 3: ~85% x 3-4 reps (average 3)
  const roundToGymPlate = (val: number) => {
    // Round to nearest 2.5 kg or 5 lbs
    const step = unit === 'kg' ? 2.5 : 5;
    return Math.max(step, Math.round(val / step) * step);
  };

  const rampSets = [
    {
      percentage: '45%',
      reps: 8,
      calcWeight: roundToGymPlate(target * 0.45),
      desc: 'Blood flow & neurological groove'
    },
    {
      percentage: '65%',
      reps: 5,
      calcWeight: roundToGymPlate(target * 0.65),
      desc: 'Motor unit potentiation'
    },
    {
      percentage: '85%',
      reps: 3,
      calcWeight: roundToGymPlate(target * 0.85),
      desc: 'Heavy load acclimation without fatigue'
    }
  ];

  const handleApply = () => {
    if (target <= 0) return;
    const generated: WorkoutSet[] = rampSets.map((ramp, idx) => ({
      id: `warmup-${Date.now()}-${idx}`,
      setNumber: idx + 1,
      type: 'warmup',
      targetReps: `${ramp.reps}`,
      weight: ramp.calcWeight,
      reps: ramp.reps,
      rpe: '',
      completed: false
    }));

    onApplyWarmupSets(generated);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl pb-safe"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                <Flame size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Warm-Up Ramp Protocol</h3>
                <p className="text-xs text-zinc-400 truncate max-w-[220px]">{exerciseName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-5">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
              Target Working Weight ({unit})
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={workingWeight}
                onChange={e => setWorkingWeight(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 80"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xl font-bold text-white num-mono outline-none"
              />
              <span className="text-sm font-bold text-zinc-400">{unit}</span>
            </div>
          </div>

          {/* Ramp Calculation Cards */}
          <div className="space-y-2.5 mb-6">
            {rampSets.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-300">
                      Set {idx + 1} ({item.percentage})
                    </span>
                    <span className="text-sm font-semibold text-zinc-200">
                      {item.reps} reps
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</p>
                </div>
                <div className="text-right">
                  <span className="num-mono text-lg font-bold text-orange-400">
                    {target > 0 ? item.calcWeight : '--'}
                  </span>
                  <span className="text-xs text-zinc-400 ml-1">{unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-semibold text-sm text-zinc-300 transition active:scale-98"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={target <= 0}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-bold text-sm text-black shadow-lg shadow-orange-500/20 transition active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Check size={16} />
              Insert Ramp Sets
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
