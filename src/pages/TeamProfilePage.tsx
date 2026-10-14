import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Trophy } from 'lucide-react';
import { RatingBadge, FormIndicator, StatCard } from '@/components/Shared';
import { ProgressBar } from '@/components/ProgressBar';
import { PerformanceChart, DonutChart } from '@/charts';
import { Footer } from '@/components/Footer';
import { ErrorState, DemoBadge } from '@/components/UI';
import { sportConfig } from '@/utils';
import { teamApi } from '@/services/sportsApi';
import { useFavorites } from '@/hooks';
import type { Team } from '@/types';

export function TeamProfilePage() {
  const { id } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isTeamFavorite, toggleTeam } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setError(false);
    teamApi.getTeamById(id!).then((t) => {
      if (t) setTeam(t);
      else setError(true);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-32" />
        <div className="skeleton h-40 w-full rounded-2xl" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="space-y-4">
        <Link to="/teams" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
          <ArrowLeft size={16} /> Back to Teams
        </Link>
        <ErrorState message="Unable to load team data." onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const config = sportConfig[team.sport];
  const isFav = isTeamFavorite(team.id);

  const formData = team.recentForm.map((result, i) => ({
    opponent: `M${i + 1}`,
    runs: result === 'W' ? 1 : result === 'L' ? 0 : 0.5,
  }));

  return (
    <div className="space-y-5">
      <Link to="/teams" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Teams
      </Link>

      <section className={`card ${config.glow} p-5 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: team.color }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
            style={{
              background: `linear-gradient(135deg, ${team.color}25, ${team.color}08)`,
              border: `1px solid ${team.color}40`,
              color: team.color,
            }}
          >
            {team.shortName}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-extrabold text-xl text-white">{team.name.toUpperCase()}</h1>
              <DemoBadge />
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <MapPin size={12} /> {team.country} · {config.label}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-gray-500">World Ranking:</span>
              <span className="text-sm font-bold text-white">#{team.worldRanking}</span>
              <span className="text-xs text-gray-500">Rating:</span>
              <span className={`text-sm font-bold ${config.text}`}>{team.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleTeam(team.id)}
              className="p-2.5 rounded-lg bg-ink-800/60 border border-ink-700/50 hover:bg-ink-700 transition-colors"
              aria-label="Toggle favorite"
            >
              <Heart size={20} className={isFav ? 'fill-cricket-400 text-cricket-400' : 'text-gray-500'} />
            </button>
            <RatingBadge rating={team.rating} size="lg" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Matches" value={team.stats.matches} accent={config.color} />
        <StatCard label="Wins" value={team.stats.wins} accent="#22c55e" />
        <StatCard label="Losses" value={team.stats.losses} accent="#ef4444" />
        <StatCard label="Win %" value={`${team.stats.winPercent}%`} accent={config.color} />
        <StatCard label="Draws" value={team.stats.draws} accent="#fbbf24" />
        <StatCard
          label="Current Streak"
          value={team.stats.currentStreak > 0 ? `${team.stats.currentStreak}W` : `${Math.abs(team.stats.currentStreak)}L`}
          accent={team.stats.currentStreak > 0 ? '#22c55e' : '#ef4444'}
        />
        <StatCard label="Ranking" value={`#${team.worldRanking}`} accent={config.color} />
        <StatCard label="Rating" value={team.rating} accent={config.color} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h4 className="text-sm font-bold text-white mb-3">Recent Form</h4>
          <div className="flex items-center justify-between mb-4">
            {team.recentForm.map((result, i) => (
              <span
                key={i}
                className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center ${
                  result === 'W' ? 'bg-cricket-500/20 text-cricket-400' : result === 'L' ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-gold/20 text-accent-gold'
                }`}
              >
                {result}
              </span>
            ))}
          </div>
          <FormIndicator score={team.stats.winPercent > 60 ? 85 : team.stats.winPercent > 50 ? 65 : 45} />
        </div>
        <div className="card p-5">
          <h4 className="text-sm font-bold text-white mb-3">Win/Loss Distribution</h4>
          <DonutChart
            data={[
              { name: 'Wins', value: team.stats.wins },
              { name: 'Losses', value: team.stats.losses },
              { name: 'Draws', value: team.stats.draws },
            ]}
            colors={['#22c55e', '#ef4444', '#fbbf24']}
          />
        </div>
      </div>

      <div className="card p-5">
        <h4 className="text-sm font-bold text-white mb-3">Performance Trend</h4>
        <PerformanceChart data={formData} dataKey="runs" color={config.color} type="area" height={220} />
      </div>

      <div className="card p-5">
        <h4 className="text-sm font-bold text-white mb-3">Team Rating Breakdown</h4>
        <div className="space-y-2.5">
          {[
            { label: 'Overall', value: team.rating },
            { label: 'Win Rate', value: team.stats.winPercent },
            { label: 'Consistency', value: Math.round(team.rating * 0.9) },
            { label: 'Form', value: Math.round(team.stats.winPercent * 0.95) },
          ].map((r) => (
            <div key={r.label}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">{r.label}</span>
                <span className="font-bold text-white">{r.value.toFixed(1)}</span>
              </div>
              <ProgressBar value={r.value} color={config.color} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
