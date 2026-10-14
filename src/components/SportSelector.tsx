import type { Sport } from '@/types';
import { sportConfig } from '@/utils';
import { Trophy, Dribbble, Gamepad2 } from 'lucide-react';

const sportIcons: Record<Sport, typeof Trophy> = {
  cricket: Trophy,
  football: Dribbble,
  esports: Gamepad2,
};

export function SportSelector({
  selected,
  onSelect,
}: {
  selected: Sport;
  onSelect: (sport: Sport) => void;
}) {
  const sports: Sport[] = ['cricket', 'football', 'esports'];
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-ink-850 border border-ink-700/60 rounded-xl">
      {sports.map((sport) => {
        const config = sportConfig[sport];
        const Icon = sportIcons[sport];
        const isActive = selected === sport;
        return (
          <button
            key={sport}
            onClick={() => onSelect(sport)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive
                ? `${config.bg} ${config.text} ${config.border} border`
                : 'text-gray-400 hover:text-white hover:bg-ink-800/60 border border-transparent'
            }`}
          >
            <Icon size={16} />
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
