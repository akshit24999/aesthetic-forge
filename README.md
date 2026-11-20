# 🏋️ AestheticForge — Science Hypertrophy OS & Gym Tracker

A luxury, iOS-first Progressive Web App (PWA) designed for personal gym tracking and science-based physique development.

Built with **React 19, TypeScript, Tailwind CSS v4, Framer Motion, and Web Audio API**, optimized specifically for **iPhone Mobile Safari ("Add to Home Screen")**.

---

## 📱 Features

1. **iOS "Add to Home Screen" Native Feel**:
   - Runs full-screen with no browser address bar or bottom tabs (`apple-mobile-web-app-capable`).
   - Dynamic Island style floating rest timer with alert chime.
   - 100% offline support via Service Worker & local caching (works in underground gym basements).
   - iOS safe-area inset support (`env(safe-area-inset-top)` / `bottom`).

2. **Pocket Coach & Knowledge Base (Aditya Dhawan's Aesthetic Blueprint)**:
   - **Body-Type Starting Point Engine**: Calibrated protocols for *Skinny*, *Overweight*, and *Skinny-Fat (Recomposition)*.
   - **Interactive TDEE & Macro Calculator**: Auto-calculates daily calories ($\pm 200\text{–}300\text{ kcal}$) and protein targets ($1.6\text{–}2.0\text{ g/kg}$).
   - **Aesthetic V-Taper Priority Muscles**: Form cues and exercise choices for Side Delts, Lats, Upper Chest ($30^\circ$ incline), Arms, and Abs.
   - **Plateau & Deload Sentinel**: Troubleshooting checklists for stalled scale weight, stalled strength, or central nervous system fatigue.

3. **5-Day Science Hypertrophy & Fat Loss Program**:
   - **Day 1**: Upper (Strength + Volume) — Flat Bench, Weighted Pull-Ups, Shoulder Press, Superset Arms.
   - **Day 2**: Lower (Strength + Hypertrophy) — Heavy Squats, RDLs, Leg Curl Dropset, Calves, Hanging Leg Raises.
   - **Day 3**: Full Body (Hypertrophy + Fat Loss) — High-density Giant Sets + 15 min HIIT Sprints.
   - **Day 4**: Upper (Hypertrophy + Isolation) — Deep stretch Flyes, Arnold Press, Chest-supported Row, 3s eccentric Lateral Raises, Bayesian Curls.
   - **Day 5**: Lower (Metabolic/Glute + Fat Loss) — DB Bulgarian Split Squat, High-rep Leg Press, Nordic Curls, Calf Double Dropset (20+10).
   - **Sat / Sun**: Active Recovery & mobility.

4. **Frictionless Gym Set Tracker**:
   - Previous session weights & reps for instant progressive overload reference.
   - **Auto Warm-up Ramp Calculator**: Generates $45\% \times 8$, $65\% \times 5$, $85\% \times 3$ sets with 1 tap.
   - **One-tap Dropset Calculator**: Automatically computes a $-35\%$ dropped weight to failure.
   - **Rest Timer**: Sound chimes and haptic vibrations when countdown ends.
   - **PR Celebrations**: Confetti bursts when breaking all-time personal records.

5. **Analytics & Muscle Recovery**:
   - Weekly muscle volume heatmap tracking 7-day set counts.
   - All-time PR hall of fame.
   - Complete workout session history.

---

## 🚀 How to Deploy to Git & Use on iPhone

### Step 1: Create a GitHub Repository
1. Open [GitHub](https://github.com) and click **New Repository**.
2. Name it `aesthetic-forge` (choose Public or Private). Do **not** initialize with a README (one is already prepared).

### Step 2: Push Your Code
Open your terminal in this directory and run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/aesthetic-forge.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy for Free (Choose Option A or Option B)

#### Option A: GitHub Pages (Automatic with included GitHub Action)
1. In your GitHub repo, go to **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment** $\rightarrow$ **Source**, choose **GitHub Actions**.
3. Every time you push, the included `.github/workflows/deploy.yml` will automatically build and publish your app to `https://YOUR_USERNAME.github.io/aesthetic-forge/`.

#### Option B: Vercel (Instant 1-Click)
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New Project** and select `aesthetic-forge`.
3. Click **Deploy**. Vercel will give you a live URL like `https://aesthetic-forge.vercel.app`.

---

## 📲 Add to Your iPhone Home Screen

1. On your iPhone, open **Safari** and visit your deployed URL (e.g., `https://YOUR_USERNAME.github.io/aesthetic-forge/` or `https://aesthetic-forge.vercel.app`).
2. Tap the **Share** button at the bottom of Safari (the square with an arrow pointing up).
3. Scroll down and tap **Add to Home Screen**.
4. Confirm the name (e.g. `AestheticForge`) and tap **Add**.
5. Launch the app from your iPhone home screen! It will open full screen without any Safari navigation bars, exactly like a native iOS app.
