import { Link } from 'react-router-dom';
import type { RankingEntry, TeamRankingEntry } from '@/types';
import { getMovementIcon, getMovementColor, sportConfig } from '@/utils';
import { RatingBadge, FormIndicator } from './Shared';

export function RankingRow({
  entry,
  type = 'player',
}: {
  entry: RankingEntry | TeamRankingEntry;
  type?: 'player' | 'team';
}) {
  const isPlayer = type === 'player';
  const player = isPlayer ? (entry as RankingEntry).player : null;
  const team = !isPlayer ? (entry as TeamRankingEntry).team : null;
  const entity = isPlayer ? player! : team!;
  const config = sportConfig[entity.sport];
  const linkTo = isPlayer ? `/player/${player!.id}` : `/team/${team!.id}`;

  return (
    <Link
      to={linkTo}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink-800/60 transition-colors group"
    >
      <div className="w-8 text-center shrink-0">
        <span className="text-lg font-display font-extrabold text-white">#{entry.rank}</span>
      </div>
      <div className="w-6 text-center shrink-0">
        <span className={`text-xs font-bold ${getMovementColor(entry.movement)}`}>
          {getMovementIcon(entry.movement)}
        </span>
      </div>
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
        style={{
          background: `linear-gradient(135deg, ${entity.sport === 'cricket' ? '#22c55e' : entity.sport === 'football' ? '#06b6d4' : '#a855f7'}25, ${config.color}08)`,
          border: `1px solid ${config.color}30`,
          color: config.color,
        }}
      >
        {entity.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate group-hover:text-cricket-400 transition-colors">
          {entity.name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {isPlayer ? `${player!.role} · ${player!.teamName}` : `${team!.country} · ${team!.sport}`}
        </p>
      </div>
      <div className="hidden sm:block shrink-0">
        <FormIndicator score={isPlayer ? player!.formScore : 80} size="sm" />
      </div>
      <RatingBadge rating={entry.rating} size="sm" />
    </Link>
  );
}
