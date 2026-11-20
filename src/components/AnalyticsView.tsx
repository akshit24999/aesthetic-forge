import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Activity
} from 'lucide-react';
import type { UserProfile, MuscleGroup } from '../types';
import { getCompletedWorkouts, getPersonalRecords } from '../utils/storage';

interface AnalyticsViewProps {
  profile: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ profile }) => {
  const workouts = getCompletedWorkouts();
  const prs = getPersonalRecords();
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null);

  // Compute lifetime stats
  const totalWorkouts = workouts.length;
  const totalVolumeKg = workouts.reduce((acc, w) => acc + (w.totalVolumeKg || 0), 0);
  const avgDuration = totalWorkouts > 0 
    ? Math.round(workouts.reduce((acc, w) => acc + (w.durationMinutes || 0), 0) / totalWorkouts) 
    : 0;

  // Muscle Fatigue Heatmap distribution (Last 7 Days)
  const muscleIntensityMap: Record<string, number> = {
    'chest': 0,
    'upper_chest': 0,
    'side_delts': 0,
    'lats': 0,
    'upper_back': 0,
    'biceps': 0,
    'triceps': 0,
    'quads': 0,
    'hamstrings': 0,
    'calves': 0,
    'abs': 0
  };

  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  workouts.forEach(w => {
    const workoutTime = new Date(w.date).getTime();
    if (workoutTime >= oneWeekAgo) {
      w.exercises.forEach(ex => {
        const nameLower = ex.name.toLowerCase();
        let target: MuscleGroup = 'chest';
        if (nameLower.includes('incline') || nameLower.includes('upper chest')) target = 'upper_chest';
        else if (nameLower.includes('lateral') || nameLower.includes('shoulder')) target = 'side_delts';
        else if (nameLower.includes('pull') || nameLower.includes('lat')) target = 'lats';
        else if (nameLower.includes('row')) target = 'upper_back';
        else if (nameLower.includes('curl') || nameLower.includes('bicep')) target = 'biceps';
        else if (nameLower.includes('tricep') || nameLower.includes('crusher') || nameLower.includes('pushdown')) target = 'triceps';
        else if (nameLower.includes('squat') || nameLower.includes('press') || nameLower.includes('lunge')) target = 'quads';
        else if (nameLower.includes('deadlift') || nameLower.includes('rdl') || nameLower.includes('ham')) target = 'hamstrings';
        else if (nameLower.includes('calf')) target = 'calves';
        else if (nameLower.includes('abs') || nameLower.includes('plank') || nameLower.includes('raise')) target = 'abs';

        muscleIntensityMap[target] = (muscleIntensityMap[target] || 0) + ex.sets.length;
      });
    }
  });

  const muscleLabels: { id: string; name: string; targetWeeklySets: number }[] = [
    { id: 'upper_chest', name: 'Upper Chest', targetWeeklySets: 8 },
    { id: 'chest', name: 'Mid/Lower Chest', targetWeeklySets: 10 },
    { id: 'side_delts', name: 'Side Delts', targetWeeklySets: 12 },
    { id: 'lats', name: 'Lats (V-Taper)', targetWeeklySets: 10 },
    { id: 'upper_back', name: 'Upper Back / Traps', targetWeeklySets: 10 },
    { id: 'biceps', name: 'Biceps', targetWeeklySets: 8 },
    { id: 'triceps', name: 'Triceps', targetWeeklySets: 8 },
    { id: 'quads', name: 'Quadriceps', targetWeeklySets: 12 },
    { id: 'hamstrings', name: 'Hamstrings', targetWeeklySets: 10 },
    { id: 'calves', name: 'Calves', targetWeeklySets: 8 },
    { id: 'abs', name: 'Abs / Core', targetWeeklySets: 8 }
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Progress & Performance
          </span>
          <Activity size={16} className="text-emerald-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Muscle Heatmap & Analytics
        </h1>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Monitor your weekly set volume, personal records, and cumulative tonnage over time.
        </p>
      </div>

      {/* Lifetime Stats Matrix */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-2xl p-4 border border-zinc-800 text-center">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Workouts</span>
          <span className="num-mono text-2xl font-black text-white mt-1 block">{totalWorkouts}</span>
          <span className="text-[10px] text-zinc-500 mt-0.5 block">Logged</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-zinc-800 text-center">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Total Tonnage</span>
          <span className="num-mono text-2xl font-black text-emerald-400 mt-1 block">
            {totalVolumeKg > 1000 ? `${(totalVolumeKg / 1000).toFixed(1)}k` : totalVolumeKg}
          </span>
          <span className="text-[10px] text-zinc-500 mt-0.5 block">{profile.unit}</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-zinc-800 text-center">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Avg Duration</span>
          <span className="num-mono text-2xl font-black text-white mt-1 block">{avgDuration}m</span>
          <span className="text-[10px] text-zinc-500 mt-0.5 block">Per Session</span>
        </div>
      </div>

      {/* Interactive Muscle Heatmap & Weekly Volume */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-orange-400" />
            <h2 className="text-sm font-bold text-white">7-Day Muscle Volume Target</h2>
          </div>
          <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
            Rolling 7 Days
          </span>
        </div>

        <p className="text-xs text-zinc-400">
          Science recommends hitting each muscle with 8-12 hard working sets per week for optimal hypertrophy without overtraining.
        </p>

        <div className="space-y-3 pt-2">
          {muscleLabels.map(m => {
            const currentSets = muscleIntensityMap[m.id] || 0;
            const percentage = Math.min(100, Math.round((currentSets / m.targetWeeklySets) * 100));

            return (
              <div key={m.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-300">{m.name}</span>
                  <div className="flex items-center gap-1 num-mono font-bold">
                    <span className={currentSets >= m.targetWeeklySets ? 'text-emerald-400' : 'text-zinc-400'}>
                      {currentSets}
                    </span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-zinc-500">{m.targetWeeklySets} sets</span>
                  </div>
                </div>

                {/* Progress bar with dynamic color */}
                <div className="w-full h-2 rounded-full bg-zinc-950 border border-zinc-800/80 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentage >= 100
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/40'
                        : percentage >= 50
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                        : 'bg-zinc-700'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Records Hall of Fame */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-3">
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-amber-400" />
          <h2 className="text-sm font-bold text-white">Personal Record Trophies</h2>
        </div>

        {Object.keys(prs).length === 0 ? (
          <p className="text-xs text-zinc-500 italic py-2">
            No PRs recorded yet. Complete your first heavy working sets in the Live Tracker to unlock PR tracking!
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {Object.entries(prs).map(([name, weight]) => (
              <div
                key={name}
                className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between"
              >
                <span className="text-[11px] font-semibold text-zinc-400 truncate block">{name}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="num-mono text-lg font-black text-amber-400">{weight}</span>
                  <span className="text-[10px] font-bold text-zinc-500">{profile.unit} PR</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workout History Log */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-3">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-cyan-400" />
          <h2 className="text-sm font-bold text-white">Logged Workout History</h2>
        </div>

        {workouts.length === 0 ? (
          <p className="text-xs text-zinc-500 italic py-2">
            Your workout history is empty. Finish a session in the Train tab to see detailed history logs here.
          </p>
        ) : (
          <div className="space-y-3 pt-1">
            {workouts.map(w => {
              const isExpanded = expandedWorkoutId === w.id;
              const dateStr = new Date(w.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                weekday: 'short'
              });

              return (
                <div
                  key={w.id}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedWorkoutId(isExpanded ? null : w.id)}
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-zinc-900/50 transition"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{w.routineTitle}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                        <span>{dateStr}</span>
                        <span>•</span>
                        <span>{w.durationMinutes} min</span>
                        <span>•</span>
                        <span className="text-cyan-400 font-semibold">{w.totalVolumeKg} {profile.unit}</span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                  </div>

                  {isExpanded && (
                    <div className="p-3 border-t border-zinc-800/60 bg-zinc-900/30 space-y-2 text-xs">
                      {w.exercises.map((ex, eIdx) => (
                        <div key={eIdx} className="space-y-1">
                          <span className="font-semibold text-zinc-300 text-[11px] block">{ex.name}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {ex.sets.map((s, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 num-mono font-medium"
                              >
                                {s.weight}{profile.unit} × {s.reps} {s.rpe ? `@RPE${s.rpe}` : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
