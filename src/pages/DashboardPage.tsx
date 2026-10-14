import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Users, Shield, Swords, ChevronRight, Sparkles, Activity } from 'lucide-react';
import { SportSelector } from '@/components/SportSelector';
import { LiveMatchCard } from '@/components/LiveMatchCard';
import { PlayerCard } from '@/components/PlayerCard';
import { RankingRow } from '@/components/RankingRow';
import { StatCard } from '@/components/Shared';
import { SectionTitle, DemoBadge } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { useCountUp } from '@/hooks';
import { sportConfig } from '@/utils';
import type { Sport, Match, Player } from '@/types';
import { sportsApi, playerApi } from '@/services/sportsApi';
import { playerRankings, aiInsights } from '@/data/mockData';
import { PerformanceChart } from '@/charts';

export function DashboardPage() {
  const [selectedSport, setSelectedSport] = useState<Sport>('cricket');
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const liveCount = useCountUp(12);
  const playersCount = useCountUp(4821);
  const teamsCount = useCountUp(632);
  const matchesToday = useCountUp(48);

  useEffect(() => {
    Promise.all([sportsApi.getLiveMatches(), playerApi.getAllPlayers()]).then(([matches, p]) => {
      setLiveMatches(matches);
      setPlayers(p);
      setLoading(false);
    });
  }, []);

  const filteredPlayers = players.filter((p) => p.sport === selectedSport).slice(0, 4);
  const trendingPlayers = [...players].sort((a, b) => b.rating.form - a.rating.form).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-ink-700/50 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950 p-6 md:p-10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-cricket-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-esports-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-football-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cricket-400">Welcome to the game</span>
            <DemoBadge />
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight">
            KHEL KHATAM,<br />
            <span className="bg-gradient-to-r from-cricket-400 via-football-400 to-esports-400 bg-clip-text text-transparent">
              DATA SHURU
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-3 max-w-lg">
            Where the game ends, the data begins. Track matches. Compare players. Understand the numbers.
          </p>
          <div className="mt-5">
            <SportSelector selected={selectedSport} onSelect={setSelectedSport} />
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Live Matches" value={liveCount} accent="#ef4444" icon={<Radio size={16} />} />
        <StatCard label="Players Tracked" value={playersCount.toLocaleString()} accent="#22c55e" icon={<Users size={16} />} />
        <StatCard label="Teams" value={teamsCount} accent="#06b6d4" icon={<Shield size={16} />} />
        <StatCard label="Matches Today" value={matchesToday} accent="#a855f7" icon={<Swords size={16} />} />
      </section>

      {/* Live Now */}
      <section>
        <SectionTitle
          title="LIVE NOW"
          subtitle="Real-time match updates"
          action={
            <Link to="/live" className="flex items-center gap-1 text-xs font-medium text-cricket-400 hover:gap-2 transition-all">
              View All <ChevronRight size={14} />
            </Link>
          }
        />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-4 space-y-3">
                <div className="skeleton h-4 w-20" />
                <div className="skeleton h-8 w-full" />
                <div className="skeleton h-8 w-full" />
                <div className="skeleton h-12 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Players */}
      <section>
        <SectionTitle
          title="TRENDING PLAYERS"
          subtitle="Top performers right now"
          action={
            <Link to="/players" className="flex items-center gap-1 text-xs font-medium text-cricket-400 hover:gap-2 transition-all">
              View All <ChevronRight size={14} />
            </Link>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* Performance Analytics */}
      <section>
        <SectionTitle
          title="PERFORMANCE ANALYTICS"
          subtitle={`${sportConfig[selectedSport].label} player performance trends`}
        />
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cricket-400" />
              <span className="text-sm font-bold text-white">Recent Form — Top Players</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 p-1 bg-ink-800/60 rounded-lg text-[10px]">
              {['7D', '30D', '3M', '1Y', 'Career'].map((range, i) => (
                <button
                  key={range}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    i === 1 ? 'bg-ink-700 text-white' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <PerformanceChart
            data={filteredPlayers.map((p) => ({
              opponent: p.name.split(' ').slice(-1)[0],
              runs: p.formScore,
              rating: p.rating.overall,
            }))}
            dataKey="runs"
            color={sportConfig[selectedSport].color}
            type="bar"
            height={220}
          />
        </div>
      </section>

      {/* Top Rankings + AI Insight */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SectionTitle
            title="TOP RANKINGS"
            subtitle="Global player standings"
            action={
              <Link to="/rankings" className="flex items-center gap-1 text-xs font-medium text-cricket-400 hover:gap-2 transition-all">
                View All <ChevronRight size={14} />
              </Link>
            }
          />
          <div className="card p-3 space-y-1">
            {playerRankings.slice(0, 5).map((entry) => (
              <RankingRow key={entry.rank} entry={entry} type="player" />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle title="AI DATA INSIGHT" subtitle="Automated analysis" />
          <div className="space-y-3">
            {aiInsights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="card p-4 border-l-2 border-l-cricket-500/50">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-cricket-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {insight.player}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
