export type MuscleGroup = 
  | 'chest'
  | 'upper_chest'
  | 'side_delts'
  | 'rear_delts'
  | 'lats'
  | 'upper_back'
  | 'biceps'
  | 'triceps'
  | 'quads'
  | 'hamstrings'
  | 'calves'
  | 'abs';

export type SetType = 'warmup' | 'normal' | 'drop' | 'failure' | 'myorep';

export interface WorkoutSet {
  id: string;
  setNumber: number;
  type: SetType;
  targetReps: string;
  targetRpe?: string;
  weight: number | '';
  reps: number | '';
  rpe?: number | '';
  completed: boolean;
  isPR?: boolean;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  category: 'compound' | 'isolation' | 'hiit';
  notes?: string;
  tips?: string;
  sets: WorkoutSet[];
}

export interface RoutineDay {
  id: string;
  dayNumber: number;
  dayName: string;
  title: string;
  focus: string;
  tagline: string;
  durationMin: number;
  exercises: {
    name: string;
    primaryMuscle: MuscleGroup;
    category: 'compound' | 'isolation' | 'hiit';
    defaultSets: number;
    repRange: string;
    rpe?: string;
    notes?: string;
    tips?: string;
  }[];
}

export interface CompletedWorkout {
  id: string;
  routineTitle: string;
  date: string;
  durationMinutes: number;
  totalVolumeKg: number;
  completedSetsCount: number;
  exercises: {
    name: string;
    sets: { weight: number; reps: number; type: SetType; rpe?: number }[];
  }[];
}

export type BodyType = 'skinny' | 'overweight' | 'skinny_fat';

export interface UserProfile {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: 'male' | 'female';
  bodyType: BodyType;
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'athlete';
  targetCalories: number;
  targetProteinGrams: number;
  unit: 'kg' | 'lbs';
}
