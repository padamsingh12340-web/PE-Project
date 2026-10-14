import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { RankingRow } from '@/components/RankingRow';
import { Tabs, SectionTitle, DemoBadge } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { playerRankings, teamRankings, aiInsights } from '@/data/mockData';

export function RankingsPage() {
  const [activeTab, setActiveTab] = useState('players');
  const [sportFilter, setSportFilter] = useState<'all' | 'cricket' | 'football' | 'esports'>('all');

  const tabs = [
    { id: 'players', label: 'Players' },
    { id: 'teams', label: 'Teams' },
    { id: 'batters', label: 'Batters' },
    { id: 'bowlers', label: 'Bowlers' },
  ];

  const filteredPlayerRankings = sportFilter === 'all'
    ? playerRankings
    : playerRankings.filter((r) => r.player.sport === sportFilter);

  const filteredTeamRankings = sportFilter === 'all'
    ? teamRankings
    : teamRankings.filter((r) => r.team.sport === sportFilter);

  const batters = playerRankings.filter((r) => r.player.role.includes('Batter') || r.player.role === 'Batter');
  const bowlers = playerRankings.filter((r) => r.player.role.includes('Bowler') || r.player.role === 'Bowler');

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <BarChart3 size={24} className="text-cricket-400" />
        <h1 className="font-display font-extrabold text-2xl text-white">RANKINGS</h1>
        <DemoBadge />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        <div className="inline-flex items-center gap-1 p-1 bg-ink-850 border border-ink-700/60 rounded-xl text-xs">
          {(['all', 'cricket', 'football', 'esports'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSportFilter(s)}
              className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                sportFilter === s ? 'bg-ink-700/60 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-3 space-y-1">
        {activeTab === 'players' && filteredPlayerRankings.map((entry) => (
          <RankingRow key={entry.rank} entry={entry} type="player" />
        ))}
        {activeTab === 'teams' && filteredTeamRankings.map((entry) => (
          <RankingRow key={entry.rank} entry={entry} type="team" />
        ))}
        {activeTab === 'batters' && batters.map((entry) => (
          <RankingRow key={entry.rank} entry={entry} type="player" />
        ))}
        {activeTab === 'bowlers' && bowlers.map((entry) => (
          <RankingRow key={entry.rank} entry={entry} type="player" />
        ))}
      </div>

      <SectionTitle title="AI DATA INSIGHTS" subtitle="Automated performance analysis" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {aiInsights.map((insight) => (
          <div key={insight.id} className="card p-4 border-l-2 border-l-cricket-500/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">{insight.player}</p>
            <p className="text-xs text-gray-300 leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
