import type { UserProfile, CompletedWorkout, WorkoutExercise } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'aesthetic_forge_profile',
  WORKOUTS: 'aesthetic_forge_history',
  ACTIVE_SESSION: 'aesthetic_forge_active_session',
  PRS: 'aesthetic_forge_prs'
};

export const defaultProfile: UserProfile = {
  weightKg: 70,
  heightCm: 175,
  age: 24,
  gender: 'male',
  bodyType: 'skinny_fat',
  activityLevel: 'moderate',
  targetCalories: 2350,
  targetProteinGrams: 125,
  unit: 'kg'
};

export const getStoredProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return raw ? JSON.parse(raw) : defaultProfile;
  } catch {
    return defaultProfile;
  }
};

export const saveStoredProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
};

export const getCompletedWorkouts = (): CompletedWorkout[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCompletedWorkout = (workout: CompletedWorkout): void => {
  try {
    const existing = getCompletedWorkouts();
    const updated = [workout, ...existing];
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(updated));

    // Update PRs
    const prs = getPersonalRecords();
    workout.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.weight > (prs[ex.name] || 0)) {
          prs[ex.name] = s.weight;
        }
      });
    });
    localStorage.setItem(STORAGE_KEYS.PRS, JSON.stringify(prs));
  } catch (e) {
    console.error('Failed to save workout', e);
  }
};

export const getPersonalRecords = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export interface ActiveSessionState {
  routineId: string;
  routineTitle: string;
  startTime: number;
  exercises: WorkoutExercise[];
}

export const getActiveSession = (): ActiveSessionState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveActiveSession = (session: ActiveSessionState | null): void => {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
  } catch (e) {
    console.error('Failed to save active session', e);
  }
};
