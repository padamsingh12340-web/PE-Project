import { Link } from 'react-router-dom';
import type { Match } from '@/types';
import { sportConfig } from '@/utils';
import { LiveIndicator } from './Shared';
import { ChevronRight } from 'lucide-react';

export function LiveMatchCard({ match }: { match: Match }) {
  const config = sportConfig[match.sport];

  return (
    <Link
      to={`/match/${match.id}`}
      className={`card card-hover ${config.glow} p-4 block group relative overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <LiveIndicator size="sm" />
          <span className="text-[10px] text-gray-500 font-medium">{match.league}</span>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${config.text}`}>
          {config.label}
        </span>
      </div>

      {match.sport === 'cricket' && match.cricket && (
        <CricketCardContent match={match} />
      )}
      {match.sport === 'football' && match.football && (
        <FootballCardContent match={match} />
      )}
      {match.sport === 'esports' && match.esports && (
        <EsportsCardContent match={match} />
      )}

      <div className="mt-3 flex items-center justify-between pt-3 border-t border-ink-700/40">
        <span className="text-xs text-gray-500">{match.venue}</span>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${config.text} group-hover:gap-1.5 transition-all`}>
          View Match <ChevronRight size={14} />
        </span>
      </div>
    </Link>
  );
}

function CricketCardContent({ match }: { match: Match }) {
  const cricket = match.cricket!;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: match.teamA.color + '30', color: match.teamA.color }}
          >
            {match.teamA.shortName}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{match.teamA.name}</p>
            <p className="text-xs text-gray-400">{cricket.teamAScore} · {cricket.teamAOvers} ov</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-display font-extrabold text-white">{cricket.teamAScore}</p>
          <p className="text-[10px] text-gray-500">{cricket.teamAOvers} overs</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: match.teamB.color + '30', color: match.teamB.color }}
          >
            {match.teamB.shortName}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{match.teamB.name}</p>
            <p className="text-xs text-gray-400">Target: {cricket.target}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
          <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">CRR</p>
          <p className="text-sm font-bold text-cricket-400">{cricket.crr.toFixed(2)}</p>
        </div>
        <div className="bg-ink-800/60 rounded-md px-2 py-1.5">
          <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">RRR</p>
          <p className="text-sm font-bold text-accent-orange">{cricket.rrr.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

function FootballCardContent({ match }: { match: Match }) {
  const fb = match.football!;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: match.teamA.color + '30', color: match.teamA.color }}
          >
            {match.teamA.shortName}
          </div>
          <p className="text-sm font-bold text-white truncate">{match.teamA.name}</p>
        </div>
        <div className="flex items-center gap-2 px-3">
          <span className="text-2xl font-display font-extrabold text-white">{fb.teamAScore}</span>
          <span className="text-gray-600">—</span>
          <span className="text-2xl font-display font-extrabold text-white">{fb.teamBScore}</span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <p className="text-sm font-bold text-white truncate">{match.teamB.name}</p>
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: match.teamB.color + '30', color: match.teamB.color }}
          >
            {match.teamB.shortName}
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-bold text-accent-orange">{fb.minute}</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-ink-800/60 rounded-md px-2 py-1">
          <p className="text-[9px] uppercase text-gray-500 font-bold">Possession</p>
          <p className="text-xs font-bold text-white">{fb.stats.possession[0]}% - {fb.stats.possession[1]}%</p>
        </div>
        <div className="bg-ink-800/60 rounded-md px-2 py-1">
          <p className="text-[9px] uppercase text-gray-500 font-bold">Shots</p>
          <p className="text-xs font-bold text-white">{fb.stats.shots[0]} - {fb.stats.shots[1]}</p>
        </div>
        <div className="bg-ink-800/60 rounded-md px-2 py-1">
          <p className="text-[9px] uppercase text-gray-500 font-bold">On Tgt</p>
          <p className="text-xs font-bold text-white">{fb.stats.shotsOnTarget[0]} - {fb.stats.shotsOnTarget[1]}</p>
        </div>
      </div>
    </div>
  );
}

function EsportsCardContent({ match }: { match: Match }) {
  const es = match.esports!;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: match.teamA.color + '30', color: match.teamA.color }}
          >
            {match.teamA.shortName}
          </div>
          <p className="text-sm font-bold text-white truncate">{match.teamA.name}</p>
        </div>
        <div className="flex items-center gap-2 px-3">
          <span className="text-2xl font-display font-extrabold text-white">{es.teamAScore}</span>
          <span className="text-gray-600">—</span>
          <span className="text-2xl font-display font-extrabold text-white">{es.teamBScore}</span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <p className="text-sm font-bold text-white truncate">{match.teamB.name}</p>
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: match.teamB.color + '30', color: match.teamB.color }}
          >
            {match.teamB.shortName}
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-bold text-esports-400">{es.round}</p>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="bg-ink-800/60 rounded-md px-2 py-1">
          <p className="text-[9px] uppercase text-gray-500 font-bold">Kills</p>
          <p className="text-xs font-bold text-white">{es.stats.kills[0]} - {es.stats.kills[1]}</p>
        </div>
        <div className="bg-ink-800/60 rounded-md px-2 py-1">
          <p className="text-[9px] uppercase text-gray-500 font-bold">Gold</p>
          <p className="text-xs font-bold text-white">{(es.stats.gold[0] / 1000).toFixed(1)}K - {(es.stats.gold[1] / 1000).toFixed(1)}K</p>
        </div>
      </div>
    </div>
  );
}
