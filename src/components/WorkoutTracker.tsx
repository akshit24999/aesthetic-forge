import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Plus, 
  Check, 
  Flame, 
  Zap, 
  Clock, 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { 
  WorkoutExercise, 
  WorkoutSet, 
  SetType, 
  RoutineDay, 
  CompletedWorkout, 
  UserProfile 
} from '../types';
import { 
  getActiveSession, 
  saveActiveSession, 
  saveCompletedWorkout, 
  getPersonalRecords 
} from '../utils/storage';
import { soundFX } from '../utils/audio';
import { WarmupRampModal } from './WarmupRampModal';

interface WorkoutTrackerProps {
  profile: UserProfile;
  activeRoutine: RoutineDay | null;
  onOpenPrograms: () => void;
  onStartRestTimer: (seconds: number) => void;
}

export const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({
  profile,
  activeRoutine,
  onOpenPrograms,
  onStartRestTimer
}) => {
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);
  const [routineTitle, setRoutineTitle] = useState<string>('Custom Workout');
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isFinishedModalOpen, setIsFinishedModalOpen] = useState<boolean>(false);

  // Warmup Modal state
  const [warmupTargetIndex, setWarmupTargetIndex] = useState<number | null>(null);

  // Expanded card state
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  // Load existing active session from storage on mount
  useEffect(() => {
    const saved = getActiveSession();
    if (saved && saved.exercises.length > 0) {
      setSessionStarted(true);
      setRoutineTitle(saved.routineTitle);
      setExercises(saved.exercises);
      const pastSeconds = Math.floor((Date.now() - saved.startTime) / 1000);
      setElapsedSeconds(pastSeconds > 0 ? pastSeconds : 0);
    } else if (activeRoutine) {
      initializeFromRoutine(activeRoutine);
    }
  }, [activeRoutine]);

  // Elapsed timer clock
  useEffect(() => {
    if (!sessionStarted) return;
    const timer = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStarted]);

  // Sync session state to local storage
  useEffect(() => {
    if (sessionStarted && exercises.length > 0) {
      saveActiveSession({
        routineId: 'active-session',
        routineTitle,
        startTime: Date.now() - elapsedSeconds * 1000,
        exercises
      });
    }
  }, [exercises, sessionStarted, routineTitle, elapsedSeconds]);

  const initializeFromRoutine = (routine: RoutineDay) => {
    const prs = getPersonalRecords();
    const newExercises: WorkoutExercise[] = routine.exercises.map((ex, exIdx) => {
      const sets: WorkoutSet[] = Array.from({ length: ex.defaultSets }).map((_, sIdx) => ({
        id: `set-${exIdx}-${sIdx}-${Date.now()}`,
        setNumber: sIdx + 1,
        type: sIdx === 0 && ex.category === 'compound' ? 'normal' : 'normal',
        targetReps: ex.repRange,
        targetRpe: ex.rpe || '8-9',
        weight: prs[ex.name] ? prs[ex.name] : '',
        reps: '',
        rpe: '',
        completed: false
      }));

      return {
        id: `exercise-${exIdx}-${Date.now()}`,
        name: ex.name,
        primaryMuscle: ex.primaryMuscle,
        category: ex.category,
        notes: ex.notes,
        tips: ex.tips,
        sets
      };
    });

    setRoutineTitle(routine.title);
    setExercises(newExercises);
    setSessionStarted(true);
    setElapsedSeconds(0);
    if (newExercises.length > 0) {
      setExpandedExercise(newExercises[0].id);
    }
  };

  const handleToggleSetComplete = (exIdx: number, setIdx: number) => {
    const updated = [...exercises];
    const targetSet = updated[exIdx].sets[setIdx];
    const willBeCompleted = !targetSet.completed;
    targetSet.completed = willBeCompleted;

    if (willBeCompleted) {
      soundFX.playSetComplete();

      // Check for PR
      const currentWeight = Number(targetSet.weight) || 0;
      const prs = getPersonalRecords();
      const existingPR = prs[updated[exIdx].name] || 0;

      if (currentWeight > existingPR && targetSet.type !== 'warmup') {
        targetSet.isPR = true;
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }

      // Automatically launch Rest Timer (90s for compounds, 60s for isolation)
      const restDuration = updated[exIdx].category === 'compound' ? 120 : 75;
      onStartRestTimer(restDuration);
    }

    setExercises(updated);
  };

  const handleUpdateSetField = (
    exIdx: number, 
    setIdx: number, 
    field: 'weight' | 'reps' | 'rpe' | 'type', 
    value: unknown
  ) => {
    const updated = [...exercises];
    const target = updated[exIdx].sets[setIdx];
    if (field === 'weight') target.weight = value === '' ? '' : Number(value);
    else if (field === 'reps') target.reps = value === '' ? '' : Number(value);
    else if (field === 'rpe') target.rpe = value === '' ? '' : Number(value);
    else if (field === 'type') target.type = value as SetType;
    setExercises(updated);
  };

  const handleAddSet = (exIdx: number) => {
    const updated = [...exercises];
    const currentSets = updated[exIdx].sets;
    const lastSet = currentSets[currentSets.length - 1];

    currentSets.push({
      id: `set-${Date.now()}`,
      setNumber: currentSets.length + 1,
      type: 'normal',
      targetReps: lastSet ? lastSet.targetReps : '8-12',
      weight: lastSet ? lastSet.weight : '',
      reps: '',
      rpe: '',
      completed: false
    });
    setExercises(updated);
  };

  const handleAddDropset = (exIdx: number) => {
    const updated = [...exercises];
    const currentSets = updated[exIdx].sets;
    const lastSet = currentSets[currentSets.length - 1];
    const baseWeight = lastSet && typeof lastSet.weight === 'number' ? lastSet.weight : 50;
    const droppedWeight = Math.round((baseWeight * 0.65) / 2.5) * 2.5; // -35% drop

    currentSets.push({
      id: `dropset-${Date.now()}`,
      setNumber: currentSets.length + 1,
      type: 'drop',
      targetReps: 'To Failure',
      weight: droppedWeight,
      reps: '',
      rpe: 10,
      completed: false
    });
    setExercises(updated);
  };

  const handleApplyWarmupSets = (warmupSets: WorkoutSet[]) => {
    if (warmupTargetIndex === null) return;
    const updated = [...exercises];
    const currentSets = updated[warmupTargetIndex].sets;
    
    // Prepend warmup sets
    const existingWorkingSets = currentSets.filter(s => s.type !== 'warmup');
    const combined = [...warmupSets, ...existingWorkingSets].map((s, idx) => ({
      ...s,
      setNumber: idx + 1
    }));

    updated[warmupTargetIndex].sets = combined;
    setExercises(updated);
  };

  const calculateTotalVolume = () => {
    let volume = 0;
    exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed && typeof s.weight === 'number' && typeof s.reps === 'number') {
          volume += s.weight * s.reps;
        }
      });
    });
    return Math.round(volume);
  };

  const countCompletedSets = () => {
    let count = 0;
    exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed) count++;
      });
    });
    return count;
  };

  const handleFinishWorkout = () => {
    const totalVolume = calculateTotalVolume();
    const completedSets = countCompletedSets();

    const loggedExercises = exercises
      .filter(ex => ex.sets.some(s => s.completed))
      .map(ex => ({
        name: ex.name,
        sets: ex.sets
          .filter(s => s.completed)
          .map(s => ({
            weight: Number(s.weight) || 0,
            reps: Number(s.reps) || 0,
            type: s.type,
            rpe: Number(s.rpe) || undefined
          }))
      }));

    const workoutRecord: CompletedWorkout = {
      id: `workout-${Date.now()}`,
      routineTitle,
      date: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
      totalVolumeKg: totalVolume,
      completedSetsCount: completedSets,
      exercises: loggedExercises
    };

    saveCompletedWorkout(workoutRecord);
    saveActiveSession(null);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });

    setIsFinishedModalOpen(true);
  };

  const handleResetSession = () => {
    saveActiveSession(null);
    setSessionStarted(false);
    setExercises([]);
    setElapsedSeconds(0);
    setIsFinishedModalOpen(false);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  // If no active session, show Empty State launcher
  if (!sessionStarted || exercises.length === 0) {
    return (
      <div className="space-y-6 pb-24 text-center py-12 px-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/10">
          <Dumbbell size={36} />
        </div>

        <div className="space-y-2 max-w-sm mx-auto">
          <h2 className="text-2xl font-black text-white">Ready to Train?</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Select a routine from the 5-day Hypertrophy Split, or start an empty gym session with auto-warmups, rest timer, and dropsets.
          </p>
        </div>

        <div className="space-y-3 max-w-xs mx-auto pt-4">
          <button
            onClick={onOpenPrograms}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 font-bold text-sm text-black shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-98 transition"
          >
            <Sparkles size={16} />
            Browse 5-Day Split
          </button>

          <button
            onClick={() => {
              setRoutineTitle('Upper Body Quick Log');
              setExercises([
                {
                  id: 'ex-1',
                  name: 'Incline Dumbbell Press',
                  primaryMuscle: 'upper_chest',
                  category: 'compound',
                  notes: 'Set bench to 30 degrees. 3 warmups then 3 working sets.',
                  tips: 'Controlled 3-second descent.',
                  sets: [
                    { id: 's1', setNumber: 1, type: 'normal', targetReps: '8-10', weight: 30, reps: '', rpe: 8, completed: false },
                    { id: 's2', setNumber: 2, type: 'normal', targetReps: '8-10', weight: 30, reps: '', rpe: 9, completed: false },
                    { id: 's3', setNumber: 3, type: 'normal', targetReps: '8-10', weight: 30, reps: '', rpe: 10, completed: false }
                  ]
                }
              ]);
              setSessionStarted(true);
            }}
            className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-semibold text-xs text-zinc-300 transition active:scale-98"
          >
            Start Quick Session
          </button>
        </div>
      </div>
    );
  }

  const completedSetsCount = countCompletedSets();
  const totalSetsCount = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const totalVolume = calculateTotalVolume();

  return (
    <div className="space-y-4 pb-28">
      {/* Live Gym HUD Header */}
      <div className="sticky top-0 z-30 -mx-4 px-4 py-3 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Live Workout
              </span>
            </div>
            <h1 className="text-base font-extrabold text-white truncate max-w-[200px]">
              {routineTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Stopwatch */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 num-mono">
              <Clock size={13} className="text-cyan-400" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            {/* Finish Workout CTA */}
            <button
              onClick={handleFinishWorkout}
              className="py-1 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-xs text-black shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              Finish
            </button>
          </div>
        </div>

        {/* Mini Stats Bar */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-900 text-[11px] text-zinc-400">
          <span>
            Sets Completed: <strong className="text-white num-mono">{completedSetsCount}/{totalSetsCount}</strong>
          </span>
          <span>
            Total Volume: <strong className="text-cyan-400 num-mono">{totalVolume} {profile.unit}</strong>
          </span>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="space-y-4">
        {exercises.map((exercise, exIdx) => {
          const isExpanded = expandedExercise === exercise.id;
          const prs = getPersonalRecords();
          const exercisePR = prs[exercise.name];

          return (
            <div
              key={exercise.id}
              className="glass-card rounded-2xl border border-zinc-800/90 overflow-hidden shadow-lg"
            >
              {/* Exercise Header Card */}
              <div 
                onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
                className="p-4 bg-zinc-900/60 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-zinc-800 text-zinc-300 font-bold text-[11px] flex items-center justify-center">
                      {exIdx + 1}
                    </span>
                    <h3 className="font-bold text-sm text-white">{exercise.name}</h3>
                  </div>

                  <div className="flex items-center gap-2 mt-1 ml-7">
                    <span className="text-[10px] uppercase font-bold text-cyan-400">
                      {exercise.primaryMuscle.replace('_', ' ')}
                    </span>
                    {exercisePR && (
                      <span className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold">
                        <Trophy size={11} /> PR: {exercisePR} {profile.unit}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-xs font-semibold num-mono">
                    {exercise.sets.filter(s => s.completed).length}/{exercise.sets.length}
                  </span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Collapsible Exercise Sets Body */}
              {isExpanded && (
                <div className="p-3 sm:p-4 space-y-3">
                  {/* Technique tips accordion */}
                  {(exercise.notes || exercise.tips) && (
                    <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-[11px] text-zinc-400 space-y-1">
                      {exercise.notes && <div><strong>Strategy: </strong>{exercise.notes}</div>}
                      {exercise.tips && <div className="text-cyan-300/90"><strong>Coaching Cue: </strong>{exercise.tips}</div>}
                    </div>
                  )}

                  {/* Set Logging Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-zinc-500 font-semibold uppercase text-[10px] border-b border-zinc-800/60 pb-1">
                          <th className="pb-1.5 w-10 text-center">Set</th>
                          <th className="pb-1.5 px-2">Weight ({profile.unit})</th>
                          <th className="pb-1.5 px-2">Reps</th>
                          <th className="pb-1.5 px-1 w-14">RPE</th>
                          <th className="pb-1.5 w-10 text-center">Done</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/40">
                        {exercise.sets.map((set, setIdx) => {
                          const isDone = set.completed;
                          return (
                            <tr
                              key={set.id}
                              className={`transition-colors ${
                                isDone ? 'bg-emerald-950/20 text-zinc-300' : 'hover:bg-zinc-800/30'
                              }`}
                            >
                              {/* Set Number & Tag */}
                              <td className="py-2.5 text-center">
                                <span
                                  className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    set.type === 'warmup'
                                      ? 'bg-orange-500/20 text-orange-400'
                                      : set.type === 'drop'
                                      ? 'bg-purple-500/20 text-purple-300'
                                      : 'bg-zinc-800 text-zinc-300'
                                  }`}
                                >
                                  {set.type === 'warmup' ? 'W' : set.type === 'drop' ? 'D' : set.setNumber}
                                </span>
                              </td>

                              {/* Weight Input */}
                              <td className="py-2 px-1">
                                <input
                                  type="number"
                                  value={set.weight}
                                  onChange={e =>
                                    handleUpdateSetField(
                                      exIdx,
                                      setIdx,
                                      'weight',
                                      e.target.value === '' ? '' : Number(e.target.value)
                                    )
                                  }
                                  placeholder="0"
                                  className="w-16 sm:w-20 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg px-2 py-1.5 text-center font-bold text-white num-mono outline-none"
                                />
                              </td>

                              {/* Reps Input */}
                              <td className="py-2 px-1">
                                <input
                                  type="number"
                                  value={set.reps}
                                  onChange={e =>
                                    handleUpdateSetField(
                                      exIdx,
                                      setIdx,
                                      'reps',
                                      e.target.value === '' ? '' : Number(e.target.value)
                                    )
                                  }
                                  placeholder={set.targetReps.split(' ')[0]}
                                  className="w-14 sm:w-16 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg px-2 py-1.5 text-center font-bold text-white num-mono outline-none"
                                />
                              </td>

                              {/* RPE Input */}
                              <td className="py-2 px-1">
                                <select
                                  value={set.rpe}
                                  onChange={e =>
                                    handleUpdateSetField(
                                      exIdx,
                                      setIdx,
                                      'rpe',
                                      e.target.value === '' ? '' : Number(e.target.value)
                                    )
                                  }
                                  className="w-12 bg-zinc-950 border border-zinc-800 rounded-lg py-1.5 text-center font-medium text-xs text-zinc-300 outline-none"
                                >
                                  <option value="">--</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </select>
                              </td>

                              {/* Checkbox Complete */}
                              <td className="py-2 text-center">
                                <button
                                  onClick={() => handleToggleSetComplete(exIdx, setIdx)}
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform active:scale-90 ${
                                    isDone
                                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                                      : 'bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-white'
                                  }`}
                                >
                                  <Check size={16} strokeWidth={3} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Exercise Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/60">
                    <button
                      onClick={() => handleAddSet(exIdx)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 flex items-center gap-1 active:scale-95 transition"
                    >
                      <Plus size={13} /> Add Set
                    </button>

                    {exercise.category === 'compound' && (
                      <button
                        onClick={() => setWarmupTargetIndex(exIdx)}
                        className="px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-xs font-semibold text-orange-400 flex items-center gap-1 active:scale-95 transition"
                      >
                        <Flame size={13} /> Warm-Up Ramp
                      </button>
                    )}

                    <button
                      onClick={() => handleAddDropset(exIdx)}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-semibold text-purple-300 flex items-center gap-1 active:scale-95 transition"
                    >
                      <Zap size={13} /> Dropset (-35%)
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Warmup Ramp Modal */}
      {warmupTargetIndex !== null && (
        <WarmupRampModal
          isOpen={true}
          onClose={() => setWarmupTargetIndex(null)}
          exerciseName={exercises[warmupTargetIndex]?.name || ''}
          unit={profile.unit}
          onApplyWarmupSets={handleApplyWarmupSets}
        />
      )}

      {/* Workout Complete Summary Modal */}
      <AnimatePresence>
        {isFinishedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <Award size={36} />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Workout Complete!</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Progressive overload logged to your history.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2">
                <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Time</span>
                  <span className="num-mono font-bold text-white text-base">
                    {Math.round(elapsedSeconds / 60)}m
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Sets</span>
                  <span className="num-mono font-bold text-white text-base">
                    {countCompletedSets()}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Volume</span>
                  <span className="num-mono font-bold text-cyan-400 text-base">
                    {calculateTotalVolume()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleResetSession}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-bold text-sm text-black shadow-lg shadow-emerald-500/20 active:scale-98 transition"
              >
                Back to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
