import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Calendar, Brain, Activity } from 'lucide-react';

export type NavTab = 'train' | 'programs' | 'coach' | 'analytics';

interface BottomNavProps {
  currentTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  hasActiveSession?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  hasActiveSession
}) => {
  const tabs = [
    { id: 'train' as NavTab, label: 'Train', icon: Dumbbell, hasBadge: hasActiveSession },
    { id: 'programs' as NavTab, label: 'Programs', icon: Calendar },
    { id: 'coach' as NavTab, label: 'Coach', icon: Brain },
    { id: 'analytics' as NavTab, label: 'Analytics', icon: Activity }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-zinc-950/85 backdrop-blur-2xl border-t border-zinc-800/80 px-4 pt-2 bottom-nav-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map(tab => {
          const isSelected = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="relative py-1 px-3 flex flex-col items-center justify-center transition-all active:scale-95 text-center min-w-[64px]"
            >
              {/* Active Tab Spring Highlight Indicator */}
              {isSelected && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-cyan-500/10 rounded-2xl -z-10 border border-cyan-500/20"
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                />
              )}

              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-colors ${
                    isSelected ? 'text-cyan-400 stroke-[2.4]' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                />
                {tab.hasBadge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-zinc-950 animate-pulse" />
                )}
              </div>

              <span
                className={`text-[10px] font-bold mt-1 transition-colors ${
                  isSelected ? 'text-cyan-400' : 'text-zinc-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
