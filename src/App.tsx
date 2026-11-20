import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import type { NavTab } from './components/BottomNav';
import { WorkoutTracker } from './components/WorkoutTracker';
import { ProgramsView } from './components/ProgramsView';
import { CoachGuide } from './components/CoachGuide';
import { AnalyticsView } from './components/AnalyticsView';
import { RestTimerPill } from './components/RestTimerPill';
import type { UserProfile, RoutineDay } from './types';
import { getStoredProfile, saveStoredProfile, getActiveSession } from './utils/storage';
import { Share2, PlusSquare, X } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('train');
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile());
  const [activeRoutine, setActiveRoutine] = useState<RoutineDay | null>(null);

  // Dynamic Island Rest Timer State
  const [restTimerSeconds, setRestTimerSeconds] = useState<number>(90);
  const [isRestTimerActive, setIsRestTimerActive] = useState<boolean>(false);

  // iOS Safari "Add to Home Screen" banner
  const [showIosPrompt, setShowIosPrompt] = useState<boolean>(false);

  useEffect(() => {
    // Detect if running on iOS Safari in browser mode (not standalone)
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: unknown }).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone;
    
    if (isIos && !isStandalone) {
      const dismissed = localStorage.getItem('aesthetic_dismiss_pwa_banner');
      if (!dismissed) {
        setShowIosPrompt(true);
      }
    }
  }, []);

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveStoredProfile(newProfile);
  };

  const handleToggleUnit = () => {
    const newUnit = profile.unit === 'kg' ? 'lbs' : 'kg';
    handleUpdateProfile({ ...profile, unit: newUnit });
  };

  const handleStartRoutine = (routine: RoutineDay) => {
    setActiveRoutine(routine);
    setCurrentTab('train');
  };

  const handleTriggerRestTimer = (seconds: number) => {
    setRestTimerSeconds(seconds);
    setIsRestTimerActive(true);
  };

  const dismissIosBanner = () => {
    setShowIosPrompt(false);
    localStorage.setItem('aesthetic_dismiss_pwa_banner', 'true');
  };

  const hasActiveSession = !!getActiveSession();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Floating Rest Timer Pill (Dynamic Island on iOS) */}
      <RestTimerPill
        initialSeconds={restTimerSeconds}
        isActive={isRestTimerActive}
        onClose={() => setIsRestTimerActive(false)}
      />

      {/* Top Header */}
      <Header
        profile={profile}
        onToggleUnit={handleToggleUnit}
        activeTab={currentTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-3">
        {/* iOS Safari "Add to Home Screen" Guide Banner */}
        {showIosPrompt && (
          <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-cyan-950/60 border border-cyan-500/30 text-xs shadow-xl relative">
            <button
              onClick={dismissIosBanner}
              className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-white"
            >
              <X size={15} />
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                <Share2 size={18} />
              </div>
              <div className="pr-4 space-y-1">
                <span className="font-bold text-white block">Install on your iPhone</span>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  Tap the <strong className="text-cyan-400">Share</strong> icon in Safari, then select <strong className="text-cyan-400 flex-inline items-center"><PlusSquare size={12} className="inline mr-1" />Add to Home Screen</strong> to run full-screen without Safari browser bars!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Views */}
        {currentTab === 'train' && (
          <WorkoutTracker
            profile={profile}
            activeRoutine={activeRoutine}
            onOpenPrograms={() => setCurrentTab('programs')}
            onStartRestTimer={handleTriggerRestTimer}
          />
        )}

        {currentTab === 'programs' && (
          <ProgramsView onStartRoutine={handleStartRoutine} />
        )}

        {currentTab === 'coach' && (
          <CoachGuide profile={profile} onUpdateProfile={handleUpdateProfile} />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsView profile={profile} />
        )}
      </main>

      {/* Bottom Floating iOS Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        hasActiveSession={hasActiveSession}
      />
    </div>
  );
};

export default App;
