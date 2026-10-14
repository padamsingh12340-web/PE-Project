import { Link } from 'react-router-dom';
import type { Player } from '@/types';
import { sportConfig } from '@/utils';
import { RatingBadge, FormIndicator } from './Shared';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks';

export function PlayerCard({ player }: { player: Player }) {
  const config = sportConfig[player.sport];
  const { isPlayerFavorite, togglePlayer } = useFavorites();
  const isFav = isPlayerFavorite(player.id);

  const initials = player.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      to={`/player/${player.id}`}
      className={`card card-hover ${config.glow} p-4 block group relative`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          togglePlayer(player.id);
        }}
        className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-ink-700/60 transition-colors z-10"
        aria-label="Toggle favorite"
      >
        <Heart
          size={16}
          className={isFav ? 'fill-cricket-400 text-cricket-400' : 'text-gray-600'}
        />
      </button>

      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
          style={{
            background: `linear-gradient(135deg, ${config.color}25, ${config.color}08)`,
            border: `1px solid ${config.color}30`,
            color: config.color,
          }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0 pr-6">
          <h3 className="text-sm font-bold text-white truncate group-hover:text-cricket-400 transition-colors">
            {player.name}
          </h3>
          <p className="text-xs text-gray-500">{player.role}</p>
          <p className="text-xs text-gray-500 truncate">{player.teamName} · {player.country}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mb-3">
        <RatingBadge rating={player.rating.overall} size="sm" />
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Form</p>
          <FormIndicator score={player.formScore} size="sm" />
        </div>
      </div>

      {player.sport === 'cricket' && player.batting && (
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">Runs</p>
            <p className="text-sm font-bold text-white">{player.batting.runs.toLocaleString()}</p>
          </div>
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">Avg</p>
            <p className="text-sm font-bold text-white">{player.batting.average}</p>
          </div>
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">SR</p>
            <p className="text-sm font-bold text-white">{player.batting.strikeRate}</p>
          </div>
        </div>
      )}

      {player.sport === 'football' && player.football && (
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">Goals</p>
            <p className="text-sm font-bold text-white">{player.football.goals}</p>
          </div>
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">Assists</p>
            <p className="text-sm font-bold text-white">{player.football.assists}</p>
          </div>
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">xG</p>
            <p className="text-sm font-bold text-white">{player.football.xG}</p>
          </div>
        </div>
      )}

      {player.sport === 'esports' && player.esports && (
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">K/D</p>
            <p className="text-sm font-bold text-white">{player.esports.kdRatio}</p>
          </div>
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">Win%</p>
            <p className="text-sm font-bold text-white">{player.esports.winRate}%</p>
          </div>
          <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
            <p className="text-[9px] uppercase text-gray-500 font-bold">MVP</p>
            <p className="text-sm font-bold text-white">{player.esports.mvps}</p>
          </div>
        </div>
      )}
    </Link>
  );
}
