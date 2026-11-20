import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Utensils, 
  Dumbbell, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { BODY_TYPE_STRATEGIES, AESTHETIC_PRIORITIES, TROUBLESHOOTING_GUIDE } from '../data/nutritionGuide';
import type { BodyType, UserProfile } from '../types';

interface CoachGuideProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
}

export const CoachGuide: React.FC<CoachGuideProps> = ({ profile, onUpdateProfile }) => {
  const [selectedBodyType, setSelectedBodyType] = useState<BodyType>(profile.bodyType);
  const [weightInput, setWeightInput] = useState<number>(profile.weightKg);
  const [expandedTrouble, setExpandedTrouble] = useState<number | null>(null);

  const currentStrategy = BODY_TYPE_STRATEGIES[selectedBodyType];

  // Dynamic TDEE & Macro Calculations
  const baseTDEE = Math.round(weightInput * 33); // Practical standard maintenance estimate
  const targetCalories = baseTDEE + currentStrategy.calorieModifier;
  const targetProteinGrams = Math.round(
    selectedBodyType === 'overweight' 
      ? weightInput * 1.8 
      : selectedBodyType === 'skinny' 
        ? weightInput * 1.8 
        : weightInput * 1.9
  );

  const handleApplyToProfile = () => {
    onUpdateProfile({
      ...profile,
      bodyType: selectedBodyType,
      weightKg: weightInput,
      targetCalories,
      targetProteinGrams
    });
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-zinc-900 via-zinc-900 to-cyan-950/40 border border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Aesthetic Blueprint Engine
          </span>
          <Sparkles size={16} className="text-cyan-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Pocket Trainer & Knowledge Vault
        </h1>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Synthesized from the Aesthetic Physique Blueprint & Science Hypertrophy guides. Calibrated for maximum muscular development and body recomposition.
        </p>
      </div>

      {/* Body Type Selector Pill Group */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Target size={14} className="text-cyan-400" />
            1. Select Your Starting Body Type
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(['skinny', 'skinny_fat', 'overweight'] as BodyType[]).map(type => {
            const isSelected = selectedBodyType === type;
            const labels: Record<BodyType, { title: string; subtitle: string }> = {
              skinny: { title: 'Skinny', subtitle: 'Build Mass' },
              skinny_fat: { title: 'Skinny-Fat', subtitle: 'Recomp' },
              overweight: { title: 'Overweight', subtitle: 'Lean Out' }
            };

            return (
              <button
                key={type}
                onClick={() => setSelectedBodyType(type)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-zinc-900/80 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span className="text-xs font-bold block">{labels[type].title}</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">{labels[type].subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Macro Calculator & Targets Card */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale size={18} className="text-cyan-400" />
            <span className="text-sm font-bold text-white">Your Calibrated Daily Targets</span>
          </div>
          <button
            onClick={handleApplyToProfile}
            className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-2.5 py-1 rounded-lg border border-cyan-500/20 active:scale-95 transition"
          >
            Save to Profile
          </button>
        </div>

        {/* Weight Input Row */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
          <span className="text-xs text-zinc-400 font-medium">Current Bodyweight:</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={weightInput}
              onChange={e => setWeightInput(Number(e.target.value))}
              className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-right text-sm font-bold text-white num-mono outline-none"
            />
            <span className="text-xs font-semibold text-zinc-400">{profile.unit}</span>
          </div>
        </div>

        {/* Output Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">Daily Calories</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="num-mono text-2xl font-black text-white">{targetCalories}</span>
              <span className="text-xs text-zinc-400">kcal/day</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-medium mt-1 block">
              {currentStrategy.calorieStrategy}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">Protein Target</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="num-mono text-2xl font-black text-cyan-400">{targetProteinGrams}</span>
              <span className="text-xs text-zinc-400">g/day</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium mt-1 block">
              ~{(targetProteinGrams / 4).toFixed(0)}g per meal (4 meals)
            </span>
          </div>
        </div>

        {/* Protein Food Sources Quick Reference */}
        <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/60 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-zinc-300">
            <Utensils size={14} className="text-amber-400" />
            Top Protein Sources (Aesthetic Blueprint)
          </div>
          <div className="text-[11px] text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200">Veg:</strong> Paneer, Tofu, Soya Chunks (50g protein/100g), Dal, Greek Yogurt/Curd, Whey Protein.<br/>
            <strong className="text-zinc-200">Non-Veg:</strong> Whole Eggs, Egg Whites, Chicken Breast, Fish, Whey Protein.
          </div>
        </div>
      </div>

      {/* Body Type Strategy Details */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-cyan-400" />
            <h2 className="text-sm font-bold text-white">{currentStrategy.name}</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 italic">{currentStrategy.tagline}</p>

        <div className="space-y-2 pt-2 border-t border-zinc-800/80 text-xs">
          <div>
            <strong className="text-cyan-400">Primary Goal: </strong>
            <span className="text-zinc-300">{currentStrategy.priority}</span>
          </div>
          <div>
            <strong className="text-amber-400">Daily Steps: </strong>
            <span className="text-zinc-300">{currentStrategy.activityRecommendation}</span>
          </div>
          <div>
            <strong className="text-emerald-400">Training Split: </strong>
            <span className="text-zinc-300">{currentStrategy.trainingFocus}</span>
          </div>
        </div>

        <div className="pt-2">
          <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-1">
            Common Traps to Avoid:
          </span>
          <ul className="space-y-1">
            {currentStrategy.avoidPitfalls.map((pitfall, idx) => (
              <li key={idx} className="text-[11px] text-zinc-400 flex items-start gap-1.5">
                <span className="text-red-400 font-bold">•</span>
                {pitfall}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Aesthetic Physique Muscle Priorities */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2">
          <Dumbbell size={18} className="text-cyan-400" />
          <h2 className="text-sm font-bold text-white">Aesthetic V-Taper Priority Muscles</h2>
        </div>
        <p className="text-xs text-zinc-400">
          Building a balanced aesthetic physique requires focusing on proportions rather than just moving random weights.
        </p>

        <div className="space-y-3">
          {AESTHETIC_PRIORITIES.map((priority, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  {priority.name}
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-normal">{priority.importance}</p>
              
              <div className="text-[11px] text-zinc-400">
                <span className="text-zinc-500 font-semibold">Key Lifts: </span>
                {priority.exercises.join(' • ')}
              </div>

              <div className="p-2 rounded-lg bg-zinc-900 text-[10px] text-amber-300/90 leading-relaxed border border-amber-500/10">
                <strong>Form Cue: </strong>{priority.coachingCues}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting Plateau Accordion */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={18} className="text-amber-400" />
          <h2 className="text-sm font-bold text-white">Plateau & Deload Sentinel</h2>
        </div>
        <p className="text-xs text-zinc-400">
          When progress stalls for 2-3 weeks, use these verified audit checkpoints before drastically modifying your routine.
        </p>

        <div className="space-y-2">
          {TROUBLESHOOTING_GUIDE.map((item, idx) => {
            const isExpanded = expandedTrouble === idx;
            return (
              <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
                <button
                  onClick={() => setExpandedTrouble(isExpanded ? null : idx)}
                  className="w-full p-3 text-left flex items-center justify-between text-xs font-bold text-zinc-200"
                >
                  <span>{item.symptom}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-zinc-800/60 space-y-1.5">
                    {item.checkpoints.map((cp, cIdx) => (
                      <div key={cIdx} className="text-[11px] text-zinc-300 flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
