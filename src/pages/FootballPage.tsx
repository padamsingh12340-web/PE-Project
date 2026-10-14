import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dribbble, ChevronRight } from 'lucide-react';
import { RankingRow } from '@/components/RankingRow';
import { LiveMatchCard } from '@/components/LiveMatchCard';
import { PlayerCard } from '@/components/PlayerCard';
import { TeamCard } from '@/components/TeamCard';
import { LeagueTable } from '@/components/LeagueTable';
import { SectionTitle, DemoBadge } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/Shared';
import { footballApi, teamApi } from '@/services/sportsApi';
import { leagueStandings, playerRankings } from '@/data/mockData';
import type { Match, Player, Team } from '@/types';

export function FootballPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      footballApi.getFootballMatches(),
      footballApi.getFootballPlayers(),
      teamApi.getTeamsBySport('football'),
    ]).then(([m, p, t]) => {
      setMatches(m);
      setPlayers(p);
      setTeams(t);
      setLoading(false);
    });
  }, []);

  const liveMatches = matches.filter((m) => m.status === 'live');
  const footballRankings = playerRankings.filter((r) => r.player.sport === 'football');

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-football-500/20 bg-gradient-to-br from-ink-850 to-ink-950 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-football-500/15 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <Dribbble size={28} className="text-football-400" />
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">FOOTBALL</h1>
            <DemoBadge />
          </div>
        </div>
        <p className="text-sm text-gray-400">Live scores, league tables, xG stats & player analytics</p>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Live Matches" value={liveMatches.length} accent="#06b6d4" />
        <StatCard label="Total Matches" value={matches.length} accent="#06b6d4" />
        <StatCard label="Players" value={players.length} accent="#06b6d4" />
        <StatCard label="Teams" value={teams.length} accent="#06b6d4" />
      </div>

      {liveMatches.length > 0 && (
        <section>
          <SectionTitle title="LIVE NOW" subtitle="Live football matches" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((m) => (
              <LiveMatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle title="LEAGUE TABLE" subtitle="Premier League standings" />
        <LeagueTable standings={leagueStandings} />
      </section>

      <section>
        <SectionTitle title="TOP FOOTBALL PLAYERS" subtitle="Highest-rated footballers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="card p-4"><div className="skeleton h-32" /></div>)
          ) : (
            players.map((p) => <PlayerCard key={p.id} player={p} />)
          )}
        </div>
      </section>

      <section>
        <SectionTitle title="FOOTBALL TEAMS" subtitle="Top clubs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="TOP RANKINGS" action={<Link to="/rankings" className="flex items-center gap-1 text-xs font-medium text-football-400 hover:gap-2 transition-all">View All <ChevronRight size={14} /></Link>} />
        <div className="card p-3 space-y-1">
          {footballRankings.slice(0, 5).map((entry) => (
            <RankingRow key={entry.rank} entry={entry} type="player" />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
