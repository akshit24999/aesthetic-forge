export interface BodyTypeGuidance {
  id: string;
  name: string;
  tagline: string;
  priority: string;
  calorieStrategy: string;
  calorieModifier: number; // relative to maintenance
  proteinTarget: string;
  activityRecommendation: string;
  trainingFocus: string;
  avoidPitfalls: string[];
}

export const BODY_TYPE_STRATEGIES: Record<string, BodyTypeGuidance> = {
  skinny: {
    id: 'skinny',
    name: 'Skinny / Underweight Beginner',
    tagline: 'Focus on building foundational muscle mass and strength.',
    priority: 'Overall muscle hypertrophy and bone/connective tissue density.',
    calorieStrategy: 'Maintenance + 200 to 300 kcal/day surplus.',
    calorieModifier: 250,
    proteinTarget: '1.6g to 2.0g per kg of bodyweight daily.',
    activityRecommendation: 'Keep daily steps around 6,000–8,000 to preserve energy for muscle building.',
    trainingFocus: 'Progressive overload on compound movements (Squat, Bench, Row, Pull-ups). 3-5 days resistance training.',
    avoidPitfalls: [
      'Chasing visible six-pack abs when underweight—you need tissue first.',
      'Dirty bulking (eating excess junk food) which adds visceral fat instead of lean muscle.',
      'Hopping programs every 2 weeks instead of sticking to progressive overload.'
    ]
  },
  overweight: {
    id: 'overweight',
    name: 'Overweight Beginner',
    tagline: 'Shed body fat sustainably while preserving and building lean muscle.',
    priority: 'Substantial fat loss with lean muscle preservation.',
    calorieStrategy: 'Maintenance − 300 to 500 kcal/day deficit.',
    calorieModifier: -400,
    proteinTarget: '1.8g to 2.2g per kg of goal bodyweight to prevent muscle loss.',
    activityRecommendation: 'Gradually scale daily steps up to 10,000–14,000 steps for high non-exercise energy expenditure (NEAT).',
    trainingFocus: 'Heavy resistance training 4-5x weekly with short HIIT finishers. Resistance training prevents muscle loss during caloric restriction.',
    avoidPitfalls: [
      'Doing only endless cardio while neglecting weight lifting.',
      'Severe crash diets (< 1,200 kcal) which crash metabolic rate and hormones.',
      'Cutting out all carbs, leading to zero energy for heavy gym lifting.'
    ]
  },
  skinny_fat: {
    id: 'skinny_fat',
    name: 'Skinny-Fat Beginner (Recomposition)',
    tagline: 'Simultaneously build dense muscle while shrinking your waistline.',
    priority: 'Body Recomposition—swapping fat mass for dense lean muscle.',
    calorieStrategy: 'Eat at true maintenance calories, or a very slight deficit of −150 to −250 kcal/day.',
    calorieModifier: -150,
    proteinTarget: '1.8g to 2.0g per kg of bodyweight daily.',
    activityRecommendation: 'Consistent 8,000–10,000 steps daily combined with 7-9 hours of deep sleep.',
    trainingFocus: 'Intense strength training with sets taken 1-2 reps before true muscular failure (RPE 8-9).',
    avoidPitfalls: [
      'Panicking and doing aggressive cuts, leaving you look depleted and flat.',
      'Bulking too aggressively, causing immediate abdominal fat gain.',
      'Inconsistent protein intake and lack of sleep (cortisol spikes ruin recomposition).'
    ]
  }
};

export const AESTHETIC_PRIORITIES = [
  {
    name: 'Side Delts (Lateral Shoulders)',
    importance: 'Creates the signature wide upper frame and optical illusion of a narrower waist.',
    exercises: ['Dumbbell Lateral Raises', 'Cable Lateral Raises', 'Machine Lateral Raises'],
    coachingCues: 'Use strict controlled form. Never swing heavy dumbbells. Lead with elbows and control the 3-second lowering eccentric.'
  },
  {
    name: 'Lats (V-Taper Back Width)',
    importance: 'Contributes directly to back width and the classic V-shape taper.',
    exercises: ['Pull-Ups / Assisted Pull-Ups', 'Lat Pulldowns (2-grip)', 'Single-Arm Cable Pulldowns'],
    coachingCues: 'Pull through your elbows rather than biceps. Depress your shoulder blades first, then pull down towards ribs.'
  },
  {
    name: 'Upper Chest (Clavicular Head)',
    importance: 'Fills the collarbone shelf, giving the chest a dense, 3D armor plate appearance.',
    exercises: ['Incline Dumbbell Press (30° angle)', 'Incline Smith Press', 'Low-to-High Cable Flyes'],
    coachingCues: 'Avoid high 45°+ bench angles which over-recruit front delts. Keep bench at 30° and lower weights with deep stretch.'
  },
  {
    name: 'Arms (Biceps & Triceps)',
    importance: 'Triceps account for 60% of upper arm size; biceps create the aesthetic peak.',
    exercises: ['EZ-Bar Skull Crushers', 'Overhead Cable Extensions', 'Incline Dumbbell Curls', 'Bayesian Curls'],
    coachingCues: 'Lock upper elbows in place. Prevent shoulders from rocking forward to maintain continuous muscular tension.'
  },
  {
    name: 'Abs & Core Density',
    importance: 'Visible abs depend on body fat percentage, but hypertrophied abdominal blocks show at higher body fat.',
    exercises: ['Weighted Cable / Rope Crunches', 'Hanging Leg / Knee Raises', 'Reverse Crunches'],
    coachingCues: 'Flex and round the spine to actively contract the rectus abdominis; do not merely swing from the hips.'
  }
];

export const TROUBLESHOOTING_GUIDE = [
  {
    symptom: 'Scale Weight Stalled (Not Gaining on a Bulk)',
    checkpoints: [
      'Have you tracked for at least 2 to 3 weeks consistently? Water fluctuations can mask gain.',
      'Add 100 to 150 kcal daily (e.g., 2 tbsp peanut butter or an extra scoop of oats).',
      'Verify you are weighing yourself under identical conditions: first thing in morning after bathroom.'
    ]
  },
  {
    symptom: 'Weight Not Dropping (Stalled Fat Loss)',
    checkpoints: [
      'Hidden calories: audit cooking oils, sauces, salad dressings, and liquid calories.',
      'Step count drop: has daily fatigue caused your NEAT (steps) to drop unconsciously?',
      'If stalled for 3+ weeks at 100% adherence, reduce daily calories by 150 kcal or add 2,000 steps.'
    ]
  },
  {
    symptom: 'Strength Plateau (Lifts Stopped Increasing)',
    checkpoints: [
      'Deload need: Have you trained hard for 4 to 6 continuous weeks? Take a deload week with 50% volume.',
      'Sleep & Hydration: Minimum 7-8 hours sleep and 3 liters of water per day.',
      'Proximity to failure: Stop 1-2 reps before failure on big compounds so your nervous system recovers.'
    ]
  }
];
