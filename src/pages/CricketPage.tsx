import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ChevronRight } from 'lucide-react';
import { RankingRow } from '@/components/RankingRow';
import { LiveMatchCard } from '@/components/LiveMatchCard';
import { PlayerCard } from '@/components/PlayerCard';
import { TeamCard } from '@/components/TeamCard';
import { SectionTitle, EmptyState, DemoBadge } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/Shared';
import { cricketApi, teamApi, sportsApi } from '@/services/sportsApi';
import { playerRankings } from '@/data/mockData';
import type { Match, Player, Team } from '@/types';

export function CricketPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      cricketApi.getCricketMatches(),
      cricketApi.getCricketPlayers(),
      teamApi.getTeamsBySport('cricket'),
    ]).then(([m, p, t]) => {
      setMatches(m);
      setPlayers(p);
      setTeams(t);
      setLoading(false);
    });
  }, []);

  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');
  const cricketRankings = playerRankings.filter((r) => r.player.sport === 'cricket');

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-cricket-500/20 bg-gradient-to-br from-ink-850 to-ink-950 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cricket-500/15 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <Trophy size={28} className="text-cricket-400" />
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">CRICKET</h1>
            <DemoBadge />
          </div>
        </div>
        <p className="text-sm text-gray-400">Live scores, scorecards, player stats & analytics</p>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Live Matches" value={liveMatches.length} accent="#22c55e" />
        <StatCard label="Upcoming" value={upcomingMatches.length} accent="#fbbf24" />
        <StatCard label="Players" value={players.length} accent="#22c55e" />
        <StatCard label="Teams" value={teams.length} accent="#22c55e" />
      </div>

      {liveMatches.length > 0 && (
        <section>
          <SectionTitle title="LIVE NOW" subtitle="Live cricket matches" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((m) => (
              <LiveMatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle title="TOP CRICKET PLAYERS" subtitle="Highest-rated cricketers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [1, 2, 3, 4].map((i) => <div key={i} className="card p-4"><div className="skeleton h-32" /></div>)
          ) : (
            players.map((p) => <PlayerCard key={p.id} player={p} />)
          )}
        </div>
      </section>

      <section>
        <SectionTitle title="CRICKET TEAMS" subtitle="International & franchise teams" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          title="TOP RANKINGS"
          action={<Link to="/rankings" className="flex items-center gap-1 text-xs font-medium text-cricket-400 hover:gap-2 transition-all">View All <ChevronRight size={14} /></Link>}
        />
        <div className="card p-3 space-y-1">
          {cricketRankings.slice(0, 5).map((entry) => (
            <RankingRow key={entry.rank} entry={entry} type="player" />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

