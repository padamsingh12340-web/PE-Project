import type { Match } from '@/types';
import { sportConfig } from '@/utils';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { LiveIndicator } from './Shared';

export function MatchRow({ match }: { match: Match }) {
  const config = sportConfig[match.sport];
  return (
    <Link
      to={`/match/${match.id}`}
      className="card card-hover p-3 flex items-center gap-3 group"
    >
      <div className="flex flex-col items-center gap-1 shrink-0 w-16">
        {match.status === 'live' ? (
          <LiveIndicator size="sm" />
        ) : (
          <span
            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              match.status === 'upcoming'
                ? 'bg-football-500/15 text-football-400 border border-football-500/20'
                : 'bg-ink-700/50 text-gray-400'
            }`}
          >
            {match.status}
          </span>
        )}
        <span className={`text-[10px] font-bold uppercase ${config.text}`}>{config.label}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ backgroundColor: match.teamA.color + '30', color: match.teamA.color }}
            >
              {match.teamA.shortName}
            </div>
            <span className="text-sm font-medium text-white truncate">{match.teamA.name}</span>
          </div>
          {match.cricket && <span className="text-sm font-bold text-white shrink-0">{match.cricket.teamAScore}</span>}
          {match.football && <span className="text-sm font-bold text-white shrink-0">{match.football.teamAScore}</span>}
          {match.esports && <span className="text-sm font-bold text-white shrink-0">{match.esports.teamAScore}</span>}
          {match.status === 'upcoming' && <span className="text-sm text-gray-600 shrink-0">—</span>}
        </div>
        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ backgroundColor: match.teamB.color + '30', color: match.teamB.color }}
            >
              {match.teamB.shortName}
            </div>
            <span className="text-sm font-medium text-white truncate">{match.teamB.name}</span>
          </div>
          {match.cricket && match.status !== 'upcoming' && <span className="text-sm font-bold text-white shrink-0">{match.cricket.teamBScore}</span>}
          {match.football && <span className="text-sm font-bold text-white shrink-0">{match.football.teamBScore}</span>}
          {match.esports && <span className="text-sm font-bold text-white shrink-0">{match.esports.teamBScore}</span>}
          {match.status === 'upcoming' && <span className="text-sm text-gray-600 shrink-0">—</span>}
        </div>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1 shrink-0 text-xs text-gray-500">
        <span className="flex items-center gap-1"><Calendar size={11} /> {match.date}</span>
        <span className="flex items-center gap-1"><Clock size={11} /> {match.time}</span>
        <span className="flex items-center gap-1 truncate max-w-[120px]"><MapPin size={11} /> {match.venue}</span>
      </div>
    </Link>
  );
}
