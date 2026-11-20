import type { RoutineDay } from '../types';

export const FIVE_DAY_HYPERTROPHY_SPLIT: RoutineDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    dayName: 'Monday',
    title: 'Upper (Strength + Volume)',
    focus: 'Chest, Back & Arm Power',
    tagline: 'Heavy compound loads with progressive overload & antagonistic arm finishers.',
    durationMin: 65,
    exercises: [
      {
        name: 'Flat Barbell / DB Bench Press',
        primaryMuscle: 'chest',
        category: 'compound',
        defaultSets: 4,
        repRange: '4-6 heavy (1 back-off 8-10)',
        rpe: 'Early 7-8, Last 9-10',
        notes: '3 ramp-up warm-up sets. Keep shoulder blades retracted & drive with legs.',
        tips: 'Controlled eccentric, explode on press.'
      },
      {
        name: 'Weighted Pull-Up or Bodyweight Pull-Up',
        primaryMuscle: 'lats',
        category: 'compound',
        defaultSets: 3,
        repRange: '6-8',
        rpe: 'Last set to failure',
        notes: 'Full dead-hang stretch at bottom, drive elbows down to ribs.',
        tips: 'Avoid swinging; use assistance machine if needed.'
      },
      {
        name: 'Seated DB Shoulder Press',
        primaryMuscle: 'side_delts',
        category: 'compound',
        defaultSets: 3,
        repRange: '8-12',
        rpe: '8-9',
        notes: 'Bench set at 75-80 degrees, not pure vertical, to protect rotator cuff.',
        tips: 'Press slightly forward in scapular plane.'
      },
      {
        name: '2-Grip Lat Pulldown',
        primaryMuscle: 'lats',
        category: 'isolation',
        defaultSets: 2,
        repRange: '10-12',
        rpe: '8-9',
        notes: 'Set 1: Wide overhand grip. Set 2: Close neutral grip.',
        tips: 'Pause 1 second at chest contraction.'
      },
      {
        name: 'Superset: EZ Bar Skull Crusher',
        primaryMuscle: 'triceps',
        category: 'isolation',
        defaultSets: 3,
        repRange: '12-15',
        rpe: '9 (Final dropset)',
        notes: 'Pair immediately with EZ Bar Curl. Deep elbow flexion behind head.',
        tips: 'Keep upper arms fixed in place.'
      },
      {
        name: 'Superset: EZ Bar Biceps Curl',
        primaryMuscle: 'biceps',
        category: 'isolation',
        defaultSets: 3,
        repRange: '12-15',
        rpe: '9-10 (Final dropset)',
        notes: 'Perform directly after Skull Crushers with zero rest.',
        tips: 'Squeeze peak for 1 second.'
      }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    dayName: 'Tuesday',
    title: 'Lower (Strength + Hypertrophy)',
    focus: 'Quads, Posterior Chain & Calves',
    tagline: 'Heavy leg drives and hamstring hinges with high mechanical tension.',
    durationMin: 60,
    exercises: [
      {
        name: 'Back Squat or Hack Squat',
        primaryMuscle: 'quads',
        category: 'compound',
        defaultSets: 4,
        repRange: '4-6 heavy',
        rpe: 'Last set near failure',
        notes: 'Warm-up with 3 ramp-up sets (45%, 65%, 85%). Hit parallel or below.',
        tips: 'Brace core firmly with Valsalva maneuver.'
      },
      {
        name: 'Romanian Deadlift (Barbell or DB)',
        primaryMuscle: 'hamstrings',
        category: 'compound',
        defaultSets: 3,
        repRange: '8-10',
        rpe: '8-9',
        notes: 'Hinge hips backwards, slight soft knee bend, stop when hamstrings stretch.',
        tips: 'Keep bar/dumbbells glued close to shins.'
      },
      {
        name: 'Hack Squat or Single-Leg Press',
        primaryMuscle: 'quads',
        category: 'isolation',
        defaultSets: 2,
        repRange: '10-12',
        rpe: '9-10',
        notes: 'Deep knee flexion back-off set for maximum quad hypertrophy.',
        tips: '3 second slow eccentric lowering.'
      },
      {
        name: 'Seated or Lying Leg Curl',
        primaryMuscle: 'hamstrings',
        category: 'isolation',
        defaultSets: 2,
        repRange: '10-12 + Dropset',
        rpe: '10 on 2nd set',
        notes: 'After reaching failure on set 2, immediately drop weight 35% and rep to second failure.',
        tips: 'Toes pointed up for peak hamstring recruitment.'
      },
      {
        name: 'Standing Calf Raise',
        primaryMuscle: 'calves',
        category: 'isolation',
        defaultSets: 3,
        repRange: '12-15',
        rpe: '9-10',
        notes: '2 second pause at deep bottom stretch, explode up on big toes.',
        tips: 'Do not bounce reps.'
      },
      {
        name: 'Hanging Leg Raise',
        primaryMuscle: 'abs',
        category: 'isolation',
        defaultSets: 3,
        repRange: '12-15',
        rpe: '9-10',
        notes: 'Curl pelvis up towards ribs; avoid swinging momentum.',
        tips: 'Bend knees if hip flexors fatigue first.'
      }
    ]
  },
  {
    id: 'day-3',
    dayNumber: 3,
    dayName: 'Wednesday',
    title: 'Full Body (Hypertrophy + Fat Loss)',
    focus: 'Metabolic Conditioning & Full Body Output',
    tagline: 'High-density Giant Sets for metabolic rate elevation followed by HIIT intervals.',
    durationMin: 55,
    exercises: [
      {
        name: 'Giant Set: DB Incline Press',
        primaryMuscle: 'upper_chest',
        category: 'compound',
        defaultSets: 3,
        repRange: '10-12 reps',
        rpe: '8-9',
        notes: 'Station 1 of 5. Move straight to Bent Over Row with minimal rest.',
        tips: 'Set bench to 30 degrees.'
      },
      {
        name: 'Giant Set: DB Bent Over Row',
        primaryMuscle: 'upper_back',
        category: 'compound',
        defaultSets: 3,
        repRange: '10-12 reps',
        rpe: '8-9',
        notes: 'Station 2 of 5. Pull elbows towards hips.',
        tips: 'Neutral spine throughout.'
      },
      {
        name: 'Giant Set: DB Walking Lunge',
        primaryMuscle: 'quads',
        category: 'compound',
        defaultSets: 3,
        repRange: '12 each leg',
        rpe: '8-9',
        notes: 'Station 3 of 5. Long strides for glute & quad stretch.',
        tips: 'Keep chest proud.'
      },
      {
        name: 'Giant Set: Push-Ups to Failure',
        primaryMuscle: 'chest',
        category: 'compound',
        defaultSets: 3,
        repRange: 'To failure',
        rpe: '10',
        notes: 'Station 4 of 5. Full range of motion chest to floor.',
        tips: 'Tuck elbows 45 degrees.'
      },
      {
        name: 'Giant Set: Core Plank',
        primaryMuscle: 'abs',
        category: 'isolation',
        defaultSets: 3,
        repRange: '60 seconds',
        rpe: '9-10',
        notes: 'Station 5 of 5. Rest 2 minutes after plank before repeating circuit.',
        tips: 'Squeeze glutes and draw navel in.'
      },
      {
        name: 'HIIT Sprints Finisher',
        primaryMuscle: 'quads',
        category: 'hiit',
        defaultSets: 8,
        repRange: '30s sprint / 60s rest',
        rpe: 'Max effort',
        notes: 'Treadmill, Rower, Airdyne Bike, or Track sprints. 10-15 min total.',
        tips: 'Drive hard during 30s sprint intervals.'
      }
    ]
  },
  {
    id: 'day-4',
    dayNumber: 4,
    dayName: 'Thursday',
    title: 'Upper (Hypertrophy + Isolation)',
    focus: 'Side Delts, V-Taper & Peak Upper Chest',
    tagline: 'Sculpt the aesthetic V-taper with targeted eccentric control and deep stretch.',
    durationMin: 60,
    exercises: [
      {
        name: 'Machine or DB Chest Flye',
        primaryMuscle: 'chest',
        category: 'isolation',
        defaultSets: 3,
        repRange: '12-15',
        rpe: '9',
        notes: 'Emphasize deep stretch in bottom position with 2s pause.',
        tips: 'Do not let shoulders roll forward.'
      },
      {
        name: 'Arnold Press',
        primaryMuscle: 'side_delts',
        category: 'compound',
        defaultSets: 3,
        repRange: '10-12',
        rpe: '8-9',
        notes: 'Rotate palms outward as you press up over crown of head.',
        tips: 'Smooth, fluid rotation.'
      },
      {
        name: 'Chest-Supported Row',
        primaryMuscle: 'upper_back',
        category: 'compound',
        defaultSets: 3,
        repRange: '10-12 + Dropset',
        rpe: '10 on final set',
        notes: 'Supported chest eliminates lower back fatigue. Drop 40% on set 3.',
        tips: 'Retract scapula hard at peak.'
      },
      {
        name: 'Cable or DB Lateral Raise',
        primaryMuscle: 'side_delts',
        category: 'isolation',
        defaultSets: 4,
        repRange: '15 reps',
        rpe: '9-10',
        notes: 'Key V-Taper exercise! Slow 3-second eccentric lowering on every rep.',
        tips: 'Pour the water angle; lead with elbows, not wrists.'
      },
      {
        name: 'Bayesian or Incline DB Curl',
        primaryMuscle: 'biceps',
        category: 'isolation',
        defaultSets: 3,
        repRange: '12-15',
        rpe: '9-10',
        notes: 'Long head stretch bicep builder. Arms hang behind torso line.',
        tips: 'Fully supinate wrist on the way up.'
      },
      {
        name: 'Rope Face Pull with External Rotation',
        primaryMuscle: 'rear_delts',
        category: 'isolation',
        defaultSets: 3,
        repRange: '12-15',
        rpe: '8-9',
        notes: 'Crucial for shoulder health and 3D deltoid appearance. Pull to eye level.',
        tips: 'Spread rope apart at the top.'
      }
    ]
  },
  {
    id: 'day-5',
    dayNumber: 5,
    dayName: 'Friday',
    title: 'Lower (Metabolic/Glute + Fat Loss)',
    focus: 'Leg Density, Glute Sweep & Caloric Burn',
    tagline: 'High volume leg training with double-failure calf protocols and HIIT burn.',
    durationMin: 55,
    exercises: [
      {
        name: 'DB Bulgarian Split Squat',
        primaryMuscle: 'quads',
        category: 'compound',
        defaultSets: 3,
        repRange: '10-12 each leg',
        rpe: '9',
        notes: 'Slight forward torso lean targets glutes; upright torso targets quads.',
        tips: 'Drop back knee towards floor with control.'
      },
      {
        name: 'Leg Press (High Volume Reps)',
        primaryMuscle: 'quads',
        category: 'compound',
        defaultSets: 3,
        repRange: '15-20',
        rpe: '9-10',
        notes: 'Continuous tension, do not lock knees at the top.',
        tips: 'Feet mid-plate, shoulder-width apart.'
      },
      {
        name: 'Glute Ham Raise or Nordic Ham Curl',
        primaryMuscle: 'hamstrings',
        category: 'isolation',
        defaultSets: 3,
        repRange: '8-12',
        rpe: '9',
        notes: 'High eccentric hamstring stimulus. Use bands or push-off for assistance.',
        tips: 'Control the fall on the way down.'
      },
      {
        name: 'Calf Raise Double Dropset',
        primaryMuscle: 'calves',
        category: 'isolation',
        defaultSets: 2,
        repRange: '20 + 10 reps',
        rpe: '10 (Double Failure)',
        notes: 'Hit failure at 20 reps, drop weight 50%, immediately rep to second failure (10 reps).',
        tips: 'Complete burn out protocol.'
      },
      {
        name: 'HIIT Bike or Treadmill Intervals',
        primaryMuscle: 'quads',
        category: 'hiit',
        defaultSets: 6,
        repRange: '30s on / 60s off',
        rpe: 'Max effort',
        notes: '10 min total metabolic finisher to seal the training week.',
        tips: 'Push heart rate into high zone.'
      }
    ]
  }
];

export const WARMUP_RAMP_PRESETS = [
  { percent: 0.45, reps: 8, label: 'Warmup 1 (45%)' },
  { percent: 0.65, reps: 5, label: 'Warmup 2 (65%)' },
  { percent: 0.85, reps: 3, label: 'Warmup 3 (85%)' }
];
