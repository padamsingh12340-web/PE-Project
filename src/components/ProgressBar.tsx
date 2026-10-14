import type { Sport } from '@/types';
import { sportConfig } from '@/utils';

export function ProgressBar({
  value,
  max = 100,
  color,
  height = 'h-2',
  animated = true,
}: {
  value: number;
  max?: number;
  color?: string;
  height?: string;
  animated?: boolean;
}) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div className={`w-full ${height} bg-ink-700/60 rounded-full overflow-hidden`}>
      <div
        className={`h-full rounded-full ${animated ? 'transition-all duration-700 ease-out' : ''}`}
        style={{
          width: `${percent}%`,
          background: color
            ? `linear-gradient(90deg, ${color}, ${color}cc)`
            : 'linear-gradient(90deg, #22c55e, #a3e635)',
        }}
      />
    </div>
  );
}

export function WinProbabilityBar({
  teamA,
  teamB,
  probA,
  probB,
  sport,
}: {
  teamA: string;
  teamB: string;
  probA: number;
  probB: number;
  sport: Sport;
}) {
  const config = sportConfig[sport];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-white">{teamA}</span>
        <span className="text-gray-400 uppercase tracking-wider text-[10px] font-bold">
          Win Probability
        </span>
        <span className="text-white">{teamB}</span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden bg-ink-700/60">
        <div
          className="h-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
          style={{
            width: `${probA}%`,
            background: `linear-gradient(90deg, ${config.color}, ${config.color}aa)`,
          }}
        >
          <span className="text-[10px] font-bold text-white">{probA}%</span>
        </div>
        <div
          className="h-full transition-all duration-1000 ease-out flex items-center justify-start pl-2 bg-accent-red/60"
          style={{ width: `${probB}%` }}
        >
          <span className="text-[10px] font-bold text-white">{probB}%</span>
        </div>
      </div>
    </div>
  );
}

export function MomentumBar({
  teamA,
  teamB,
  momA,
  momB,
}: {
  teamA: string;
  teamB: string;
  momA: number;
  momB: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-white uppercase tracking-wider text-[10px] font-bold">
          Match Momentum
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-20 truncate">{teamA}</span>
          <div className="flex-1 h-2 bg-ink-700/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cricket-500 to-cricket-400 transition-all duration-1000 ease-out animate-pulse-slow"
              style={{ width: `${momA}%` }}
            />
          </div>
          <span className="text-xs font-bold text-cricket-400 w-8 text-right">{momA}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-20 truncate">{teamB}</span>
          <div className="flex-1 h-2 bg-ink-700/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-red to-accent-orange transition-all duration-1000 ease-out"
              style={{ width: `${momB}%` }}
            />
          </div>
          <span className="text-xs font-bold text-accent-red w-8 text-right">{momB}%</span>
        </div>
      </div>
    </div>
  );
}
