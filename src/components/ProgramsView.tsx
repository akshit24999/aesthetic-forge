import React, { useState } from 'react';
import { 
  Clock, 
  Dumbbell, 
  Flame, 
  Play, 
  Sparkles
} from 'lucide-react';
import { FIVE_DAY_HYPERTROPHY_SPLIT } from '../data/programs';
import type { RoutineDay } from '../types';

interface ProgramsViewProps {
  onStartRoutine: (routine: RoutineDay) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({ onStartRoutine }) => {
  const [selectedDay, setSelectedDay] = useState<RoutineDay>(FIVE_DAY_HYPERTROPHY_SPLIT[0]);

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950/40 border border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            5-Day Science System
          </span>
          <Sparkles size={16} className="text-indigo-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Hypertrophy & Fat Loss Split
        </h1>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Master split synthesized from the Essentials & Bodybuilding Transformation Systems. Alternating heavy mechanical tension with metabolic stress.
        </p>
      </div>

      {/* Horizontal Day Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        {FIVE_DAY_HYPERTROPHY_SPLIT.map(day => {
          const isSelected = selectedDay.id === day.id;
          return (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day)}
              className={`shrink-0 px-4 py-3 rounded-2xl border transition-all text-left ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/25'
                  : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 block">
                {day.dayName.slice(0, 3)}
              </span>
              <span className="text-xs font-bold block whitespace-nowrap mt-0.5">
                Day {day.dayNumber}: {day.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Overview Card */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {selectedDay.dayName} Focus
            </span>
            <h2 className="text-lg font-black text-white mt-0.5">{selectedDay.title}</h2>
            <p className="text-xs text-zinc-400 mt-1">{selectedDay.tagline}</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 shrink-0">
            <Clock size={13} className="text-indigo-400" />
            <span>{selectedDay.durationMin}m</span>
          </div>
        </div>

        {/* Start Workout Primary CTA */}
        <button
          onClick={() => onStartRoutine(selectedDay)}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 font-bold text-sm text-white shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 active:scale-98 transition"
        >
          <Play size={16} fill="currentColor" />
          Start {selectedDay.title.split('(')[0]} Session
        </button>
      </div>

      {/* Warm-Up Protocol Quick Reference */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-400">
          <Flame size={15} />
          <span>Warm-Up Protocol Before Lifting</span>
        </div>
        <p className="text-zinc-400 leading-relaxed text-[11px]">
          1. <strong>General (5-7 min):</strong> Light rower/treadmill & dynamic arm/leg swings.<br/>
          2. <strong>Exercise-Specific Ramp:</strong> For first compound lift, do 45% x 8, 65% x 5, 85% x 3 (auto-calculated in tracker).
        </p>
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
          <Dumbbell size={14} className="text-indigo-400" />
          Prescribed Exercises ({selectedDay.exercises.length})
        </h3>

        {selectedDay.exercises.map((ex, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-4 border border-zinc-800/90 space-y-2.5 hover:border-zinc-700 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-sm text-white">{ex.name}</h4>
                </div>
                <div className="flex items-center gap-2 mt-1 ml-7">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800/80 text-zinc-300 uppercase tracking-wider">
                    {ex.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-300">
                    {ex.defaultSets} sets × {ex.repRange}
                  </span>
                </div>
              </div>

              {ex.rpe && (
                <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300 shrink-0">
                  RPE: {ex.rpe}
                </span>
              )}
            </div>

            {/* Notes & Pro Tips */}
            <div className="ml-7 pt-1 border-t border-zinc-800/60 text-[11px] space-y-1">
              {ex.notes && (
                <p className="text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-300">Strategy: </strong>{ex.notes}
                </p>
              )}
              {ex.tips && (
                <p className="text-indigo-300/80 leading-relaxed">
                  <strong className="text-indigo-400">Coaching Cue: </strong>{ex.tips}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
