import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Tabs, DataVerdict, ErrorState, DemoBadge } from '@/components/UI';
import { RatingBadge, FormIndicator, StatCard } from '@/components/Shared';
import { ProgressBar } from '@/components/ProgressBar';
import { PerformanceChart, RadarChartComponent, DonutChart } from '@/charts';
import { Footer } from '@/components/Footer';
import { sportConfig } from '@/utils';
import { playerApi } from '@/services/sportsApi';
import { useFavorites } from '@/hooks';
import { Heart } from 'lucide-react';
import type { Player } from '@/types';

export function PlayerProfilePage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { isPlayerFavorite, togglePlayer } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setError(false);
    playerApi.getPlayerById(id!).then((p) => {
      if (p) setPlayer(p);
      else setError(true);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-32" />
        <div className="skeleton h-40 w-full rounded-2xl" />
        <div className="skeleton h-10 w-full" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="space-y-4">
        <Link to="/players" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
          <ArrowLeft size={16} /> Back to Players
        </Link>
        <ErrorState message="Unable to load player data. The player may not exist." onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const config = sportConfig[player.sport];
  const isFav = isPlayerFavorite(player.id);
  const initials = player.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const ratingData = [
    { metric: 'Batting', value: player.rating.batting ?? 0 },
    { metric: 'Bowling', value: player.rating.bowling ?? 0 },
    { metric: 'Fielding', value: player.rating.fielding },
    { metric: 'Consistency', value: player.rating.consistency },
    { metric: 'Form', value: player.rating.form },
    { metric: 'Clutch', value: player.rating.clutch },
  ];

  const recentData = player.recentMatches.map((m) => ({
    opponent: m.opponent.slice(0, 3),
    runs: m.runs ?? m.goals ?? m.kills ?? 0,
    rating: m.rating,
  }));

  const tabs = [
    { id: 'overview', label: 'Overview' },
    ...(player.batting ? [{ id: 'batting', label: 'Batting' }] : []),
    ...(player.bowling ? [{ id: 'bowling', label: 'Bowling' }] : []),
    ...(player.football ? [{ id: 'football', label: 'Football' }] : []),
    ...(player.esports ? [{ id: 'esports', label: 'Esports' }] : []),
    { id: 'recent', label: 'Recent Matches' },
    { id: 'comparison', label: 'Comparison' },
  ];

  return (
    <div className="space-y-5">
      <Link to="/players" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Players
      </Link>

      {/* Player Header */}
      <section className={`card ${config.glow} p-5 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: config.color }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
            style={{
              background: `linear-gradient(135deg, ${config.color}25, ${config.color}08)`,
              border: `1px solid ${config.color}40`,
              color: config.color,
            }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-extrabold text-xl text-white">{player.name.toUpperCase()}</h1>
              <DemoBadge />
            </div>
            <p className="text-sm text-gray-400">{player.role} · {player.country}</p>
            <Link to={`/team/${player.teamId}`} className={`text-xs ${config.text} hover:underline`}>{player.teamName}</Link>
            <div className="mt-2">
              <FormIndicator score={player.formScore} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => togglePlayer(player.id)}
              className="p-2.5 rounded-lg bg-ink-800/60 border border-ink-700/50 hover:bg-ink-700 transition-colors"
              aria-label="Toggle favorite"
            >
              <Heart size={20} className={isFav ? 'fill-cricket-400 text-cricket-400' : 'text-gray-500'} />
            </button>
            <RatingBadge rating={player.rating.overall} size="lg" />
          </div>
        </div>
      </section>

      {/* Player Rating Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h4 className="text-sm font-bold text-white mb-3">Player Rating Breakdown</h4>
          <div className="space-y-2.5">
            {ratingData.filter((r) => r.value > 0).map((r) => (
              <div key={r.metric}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400">{r.metric}</span>
                  <span className="font-bold text-white">{r.value}</span>
                </div>
                <ProgressBar
                  value={r.value}
                  color={r.value >= 90 ? '#a855f7' : r.value >= 80 ? '#22c55e' : r.value >= 70 ? '#06b6d4' : '#fbbf24'}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h4 className="text-sm font-bold text-white mb-3">Rating Radar</h4>
          <RadarChartComponent data={ratingData.filter((r) => r.value > 0)} color={config.color} height={250} />
        </div>
      </section>

      {/* Tabs */}
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {player.batting && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="Matches" value={player.batting.matches} accent={config.color} />
              <StatCard label="Runs" value={player.batting.runs.toLocaleString()} accent={config.color} />
              <StatCard label="Average" value={player.batting.average} accent={config.color} />
              <StatCard label="Strike Rate" value={player.batting.strikeRate} accent={config.color} />
              <StatCard label="50s" value={player.batting.fifties} accent={config.color} />
              <StatCard label="100s" value={player.batting.hundreds} accent={config.color} />
              <StatCard label="Best" value={player.batting.bestScore} accent={config.color} />
              <StatCard label="6s" value={player.batting.sixes} accent={config.color} />
            </div>
          )}
          {player.football && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="Goals" value={player.football.goals} accent={config.color} />
              <StatCard label="Assists" value={player.football.assists} accent={config.color} />
              <StatCard label="Appearances" value={player.football.appearances} accent={config.color} />
              <StatCard label="Minutes" value={player.football.minutes.toLocaleString()} accent={config.color} />
              <StatCard label="xG" value={player.football.xG} accent={config.color} />
              <StatCard label="xA" value={player.football.xA} accent={config.color} />
              <StatCard label="Pass Acc" value={`${player.football.passAccuracy}%`} accent={config.color} />
              <StatCard label="Key Passes" value={player.football.keyPasses} accent={config.color} />
            </div>
          )}
          {player.esports && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="K/D Ratio" value={player.esports.kdRatio} accent={config.color} />
              <StatCard label="Win Rate" value={`${player.esports.winRate}%`} accent={config.color} />
              <StatCard label="MVPs" value={player.esports.mvps} accent={config.color} />
              <StatCard label="Tournaments" value={player.esports.tournaments} accent={config.color} />
              <StatCard label="Total Kills" value={player.esports.kills.toLocaleString()} accent={config.color} />
              <StatCard label="Deaths" value={player.esports.deaths.toLocaleString()} accent={config.color} />
              <StatCard label="Assists" value={player.esports.assists.toLocaleString()} accent={config.color} />
            </div>
          )}
          <div className="card p-5">
            <h4 className="text-sm font-bold text-white mb-3">Last 10 Matches — Performance</h4>
            <PerformanceChart data={recentData} dataKey="runs" color={config.color} type="bar" height={200} />
          </div>
        </div>
      )}

      {activeTab === 'batting' && player.batting && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Matches" value={player.batting.matches} accent={config.color} />
            <StatCard label="Runs" value={player.batting.runs.toLocaleString()} accent={config.color} />
            <StatCard label="Average" value={player.batting.average} accent={config.color} />
            <StatCard label="Strike Rate" value={player.batting.strikeRate} accent={config.color} />
            <StatCard label="50s" value={player.batting.fifties} accent={config.color} />
            <StatCard label="100s" value={player.batting.hundreds} accent={config.color} />
            <StatCard label="4s" value={player.batting.fours} accent={config.color} />
            <StatCard label="6s" value={player.batting.sixes} accent={config.color} />
          </div>
          <div className="card p-5">
            <h4 className="text-sm font-bold text-white mb-3">Batting Strike Rate — Last 10 Matches</h4>
            <PerformanceChart data={recentData} dataKey="runs" color={config.color} type="line" height={220} />
          </div>
          <div className="card p-5">
            <h4 className="text-sm font-bold text-white mb-3">Run Distribution</h4>
            <DonutChart
              data={[
                { name: '4s', value: player.batting.fours * 4 },
                { name: '6s', value: player.batting.sixes * 6 },
                { name: 'Other', value: Math.max(0, player.batting.runs - player.batting.fours * 4 - player.batting.sixes * 6) },
              ]}
              colors={['#06b6d4', '#a855f7', '#22c55e']}
            />
          </div>
        </div>
      )}

      {activeTab === 'bowling' && player.bowling && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Matches" value={player.bowling.matches} accent={config.color} />
            <StatCard label="Overs" value={player.bowling.overs} accent={config.color} />
            <StatCard label="Wickets" value={player.bowling.wickets} accent={config.color} />
            <StatCard label="Economy" value={player.bowling.economy} accent={config.color} />
            <StatCard label="Maidens" value={player.bowling.maidens} accent={config.color} />
            <StatCard label="Best" value={player.bowling.best} accent={config.color} />
          </div>
        </div>
      )}

      {activeTab === 'football' && player.football && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Goals" value={player.football.goals} accent={config.color} />
            <StatCard label="Assists" value={player.football.assists} accent={config.color} />
            <StatCard label="xG" value={player.football.xG} accent={config.color} />
            <StatCard label="xA" value={player.football.xA} accent={config.color} />
            <StatCard label="Pass Acc" value={`${player.football.passAccuracy}%`} accent={config.color} />
            <StatCard label="Tackles" value={player.football.tackles} accent={config.color} />
            <StatCard label="Key Passes" value={player.football.keyPasses} accent={config.color} />
            <StatCard label="Clean Sheets" value={player.football.cleanSheets} accent={config.color} />
          </div>
          <div className="card p-5">
            <h4 className="text-sm font-bold text-white mb-3">Goals per Match — Recent Form</h4>
            <PerformanceChart data={recentData} dataKey="runs" color={config.color} type="bar" height={220} />
          </div>
        </div>
      )}

      {activeTab === 'esports' && player.esports && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="K/D" value={player.esports.kdRatio} accent={config.color} />
            <StatCard label="Win Rate" value={`${player.esports.winRate}%`} accent={config.color} />
            <StatCard label="MVPs" value={player.esports.mvps} accent={config.color} />
            <StatCard label="Tournaments" value={player.esports.tournaments} accent={config.color} />
          </div>
          <div className="card p-5">
            <h4 className="text-sm font-bold text-white mb-3">Kills per Match — Recent Form</h4>
            <PerformanceChart data={recentData} dataKey="runs" color={config.color} type="area" height={220} />
          </div>
        </div>
      )}

      {activeTab === 'recent' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-500 font-bold border-b border-ink-700/50 bg-ink-800/40">
                  <th className="text-left py-2.5 px-4">Date</th>
                  <th className="text-left py-2.5 px-4">Opponent</th>
                  <th className="text-center py-2.5 px-2">Performance</th>
                  <th className="text-center py-2.5 px-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {player.recentMatches.map((m, i) => (
                  <tr key={i} className="border-b border-ink-700/30 hover:bg-ink-800/40">
                    <td className="py-2.5 px-4 text-gray-400 text-xs">{m.date}</td>
                    <td className="py-2.5 px-4 text-white font-medium text-xs">{m.opponent}</td>
                    <td className="py-2.5 px-2 text-center text-white font-bold">
                      {m.runs ?? m.goals ?? m.kills ?? '—'}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`font-bold ${m.rating >= 8 ? 'text-cricket-400' : m.rating >= 6 ? 'text-accent-gold' : 'text-accent-red'}`}>
                        {m.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="space-y-4">
          <div className="card p-5 text-center">
            <h4 className="text-sm font-bold text-white mb-2">Compare with Another Player</h4>
            <Link to="/compare" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${config.bg} ${config.text} ${config.border} border text-sm font-medium hover:opacity-80 transition-opacity`}>
              Go to Comparison Tool →
            </Link>
          </div>
          <DataVerdict text={`${player.name} maintains an overall rating of ${player.rating.overall} with a form score of ${player.formScore}/100. ${player.rating.clutch >= 90 ? 'Their clutch performance rating is exceptional.' : 'They show consistent performance across recent matches.'}`} />
        </div>
      )}

      <Footer />
    </div>
  );
}
