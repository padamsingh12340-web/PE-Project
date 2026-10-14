import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swords, ChevronRight, ArrowLeft } from 'lucide-react';
import { RatingBadge } from '@/components/Shared';
import { ProgressBar } from '@/components/ProgressBar';
import { ComparisonBarChart } from '@/charts';
import { DataVerdict, DemoBadge } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { sportConfig } from '@/utils';
import { players } from '@/data/mockData';
import type { Player } from '@/types';

export function ComparePage() {
  const [playerAId, setPlayerAId] = useState(players[0].id);
  const [playerBId, setPlayerBId] = useState(players[1].id);

  const playerA = players.find((p) => p.id === playerAId)!;
  const playerB = players.find((p) => p.id === playerBId)!;
  const config = sportConfig[playerA.sport];

  const compareData = [
    { metric: 'Rating', playerA: playerA.rating.overall, playerB: playerB.rating.overall },
    { metric: 'Form', playerA: playerA.formScore, playerB: playerB.formScore },
    { metric: 'Consistency', playerA: playerA.rating.consistency, playerB: playerB.rating.consistency },
    { metric: 'Clutch', playerA: playerA.rating.clutch, playerB: playerB.rating.clutch },
  ];

  const verdict = generateVerdict(playerA, playerB);

  return (
    <div className="space-y-5">
      <Link to="/players" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Players
      </Link>

      <div className="flex items-center gap-2 mb-2">
        <Swords size={24} className="text-esports-400" />
        <h1 className="font-display font-extrabold text-2xl text-white">PLAYER COMPARISON</h1>
        <DemoBadge />
      </div>

      <div className="card p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5 block">Player A</label>
            <select
              value={playerAId}
              onChange={(e) => setPlayerAId(e.target.value)}
              className="w-full bg-ink-800 border border-ink-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cricket-500/50"
            >
              {players.map((p) => <option key={p.id} value={p.id}>{p.name} ({sportConfig[p.sport].label})</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5 block">Player B</label>
            <select
              value={playerBId}
              onChange={(e) => setPlayerBId(e.target.value)}
              className="w-full bg-ink-800 border border-ink-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-football-500/50"
            >
              {players.map((p) => <option key={p.id} value={p.id}>{p.name} ({sportConfig[p.sport].label})</option>)}
            </select>
          </div>
        </div>

        {/* VS Header */}
        <div className="grid grid-cols-3 items-center gap-2 py-4 border-t border-ink-700/40">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-lg font-bold mb-2"
              style={{ background: '#22c55e20', border: '1px solid #22c55e40', color: '#22c55e' }}>
              {playerA.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <Link to={`/player/${playerA.id}`} className="text-sm font-bold text-white hover:text-cricket-400">{playerA.name}</Link>
            <p className="text-xs text-gray-500">{playerA.role} · {playerA.teamName}</p>
            <div className="mt-2"><RatingBadge rating={playerA.rating.overall} size="sm" /></div>
          </div>
          <div className="text-center">
            <p className="font-display font-extrabold text-xl text-gray-600">VS</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-lg font-bold mb-2"
              style={{ background: '#06b6d420', border: '1px solid #06b6d440', color: '#06b6d4' }}>
              {playerB.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <Link to={`/player/${playerB.id}`} className="text-sm font-bold text-white hover:text-football-400">{playerB.name}</Link>
            <p className="text-xs text-gray-500">{playerB.role} · {playerB.teamName}</p>
            <div className="mt-2"><RatingBadge rating={playerB.rating.overall} size="sm" /></div>
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="card p-5">
        <h4 className="text-sm font-bold text-white mb-4">Head-to-Head Stats</h4>
        <div className="space-y-3">
          {compareData.map((stat) => (
            <div key={stat.metric}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-cricket-400">{stat.playerA.toFixed(1)}</span>
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[10px]">{stat.metric}</span>
                <span className="font-bold text-football-400">{stat.playerB.toFixed(1)}</span>
              </div>
              <div className="flex gap-1">
                <div className="flex-1 flex justify-end">
                  <div className="h-2 bg-ink-700/60 rounded-l-full overflow-hidden" style={{ width: '50%' }}>
                    <div className="h-full bg-cricket-500 rounded-l-full transition-all duration-700" style={{ width: `${(stat.playerA / (stat.playerA + stat.playerB)) * 100}%` }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-ink-700/60 rounded-r-full overflow-hidden">
                    <div className="h-full bg-football-500 rounded-r-full transition-all duration-700 ml-auto" style={{ width: `${(stat.playerB / (stat.playerA + stat.playerB)) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Comparison */}
      <div className="card p-5">
        <h4 className="text-sm font-bold text-white mb-4">Comparison Chart</h4>
        <ComparisonBarChart
          data={compareData}
          playerA={playerA.name}
          playerB={playerB.name}
          height={250}
        />
      </div>

      {/* Data Verdict */}
      <DataVerdict text={verdict} />

      <Footer />
    </div>
  );
}

function generateVerdict(a: Player, b: Player): string {
  if (a.rating.overall > b.rating.overall) {
    return `${a.name} has the higher overall rating (${a.rating.overall} vs ${b.rating.overall}). ${a.formScore > b.formScore ? `${a.name} also has better recent form.` : `However, ${b.name} has better recent form (${b.formScore} vs ${a.formScore}).`} ${a.rating.consistency > b.rating.consistency ? `${a.name} is more consistent.` : `${b.name} shows greater consistency.`}`;
  } else if (b.rating.overall > a.rating.overall) {
    return `${b.name} has the higher overall rating (${b.rating.overall} vs ${a.rating.overall}). ${b.formScore > a.formScore ? `${b.name} also has better recent form.` : `However, ${a.name} has better recent form (${a.formScore} vs ${b.formScore}).`} ${b.rating.clutch > a.rating.clutch ? `${b.name} has the edge in clutch situations.` : `${a.name} performs better under pressure.`}`;
  }
  return `${a.name} and ${b.name} are evenly matched with identical overall ratings. The difference comes down to recent form and clutch performance.`;
}
