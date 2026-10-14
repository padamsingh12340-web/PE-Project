import { Link } from 'react-router-dom';
import type { Team } from '@/types';
import { sportConfig } from '@/utils';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks';

export function TeamCard({ team }: { team: Team }) {
  const config = sportConfig[team.sport];
  const { isTeamFavorite, toggleTeam } = useFavorites();
  const isFav = isTeamFavorite(team.id);

  return (
    <Link
      to={`/team/${team.id}`}
      className={`card card-hover ${config.glow} p-4 block group relative`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleTeam(team.id);
        }}
        className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-ink-700/60 transition-colors z-10"
        aria-label="Toggle favorite"
      >
        <Heart size={16} className={isFav ? 'fill-cricket-400 text-cricket-400' : 'text-gray-600'} />
      </button>

      <div className="flex items-center gap-3 mb-3 pr-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
          style={{
            background: `linear-gradient(135deg, ${team.color}25, ${team.color}08)`,
            border: `1px solid ${team.color}30`,
            color: team.color,
          }}
        >
          {team.shortName}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white truncate group-hover:text-cricket-400 transition-colors">
            {team.name}
          </h3>
          <p className="text-xs text-gray-500">{team.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <p className="text-[9px] uppercase text-gray-500 font-bold">Rating</p>
          <p className={`text-lg font-display font-extrabold ${config.text}`}>{team.rating}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] uppercase text-gray-500 font-bold">Rank</p>
          <p className="text-lg font-display font-extrabold text-white">#{team.worldRanking}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] uppercase text-gray-500 font-bold">Win%</p>
          <p className="text-lg font-display font-extrabold text-white">{team.stats.winPercent}%</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-ink-700/40">
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Recent Form</span>
        <div className="flex items-center gap-1">
          {team.recentForm.map((result, i) => (
            <span
              key={i}
              className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                result === 'W'
                  ? 'bg-cricket-500/20 text-cricket-400'
                  : result === 'L'
                  ? 'bg-accent-red/20 text-accent-red'
                  : 'bg-accent-gold/20 text-accent-gold'
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
