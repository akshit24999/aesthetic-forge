import React from 'react';
import { Dumbbell } from 'lucide-react';
import type { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  onToggleUnit: () => void;
  activeTab?: string;
}

export const Header: React.FC<HeaderProps> = ({ profile, onToggleUnit }) => {
  return (
    <header className="sticky top-0 z-40 w-full pt-safe bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-900 px-4 py-2.5">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center text-cyan-400">
              <Dumbbell size={16} />
            </div>
          </div>
          <div>
            <span className="text-xs font-black tracking-wider text-white uppercase flex items-center gap-1">
              Aesthetic<span className="text-cyan-400">Forge</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-semibold block leading-tight">
              Science Hypertrophy OS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Unit Toggle Button (KG <-> LBS) */}
          <button
            onClick={onToggleUnit}
            className="px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-zinc-300 hover:text-white active:scale-95 transition"
            title="Switch Weight Unit"
          >
            {profile.unit.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
};
