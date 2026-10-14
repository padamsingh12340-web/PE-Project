import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ChevronRight } from 'lucide-react';
import { RankingRow } from '@/components/RankingRow';
import { LiveMatchCard } from '@/components/LiveMatchCard';
import { PlayerCard } from '@/components/PlayerCard';
import { TeamCard } from '@/components/TeamCard';
import { SectionTitle, DemoBadge } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/Shared';
import { esportsApi, teamApi } from '@/services/sportsApi';
import { playerRankings, tournaments } from '@/data/mockData';
import type { Match, Player, Team } from '@/types';

export function EsportsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      esportsApi.getEsportsMatches(),
      esportsApi.getEsportsPlayers(),
      teamApi.getTeamsBySport('esports'),
    ]).then(([m, p, t]) => {
      setMatches(m);
      setPlayers(p);
      setTeams(t);
      setLoading(false);
    });
  }, []);

  const liveMatches = matches.filter((m) => m.status === 'live');
  const esportsRankings = playerRankings.filter((r) => r.player.sport === 'esports');
  const esportsTournaments = tournaments.filter((t) => t.sport === 'esports');

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-esports-500/20 bg-gradient-to-br from-ink-850 to-ink-950 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-esports-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-esports-magenta/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <Gamepad2 size={28} className="text-esports-400" />
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">ESPORTS</h1>
            <DemoBadge />
          </div>
        </div>
        <p className="text-sm text-gray-400">K/D ratios, win rates, tournaments & gaming analytics</p>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Live Matches" value={liveMatches.length} accent="#a855f7" />
        <StatCard label="Total Matches" value={matches.length} accent="#a855f7" />
        <StatCard label="Players" value={players.length} accent="#a855f7" />
        <StatCard label="Teams" value={teams.length} accent="#a855f7" />
      </div>

      {liveMatches.length > 0 && (
        <section>
          <SectionTitle title="LIVE NOW" subtitle="Live esports matches" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((m) => (
              <LiveMatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle title="TOURNAMENTS" subtitle="Ongoing & upcoming events" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {esportsTournaments.map((t) => (
            <div key={t.id} className="card card-hover p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white">{t.name}</h3>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  t.status === 'ongoing' ? 'bg-esports-500/15 text-esports-400' : 'bg-football-500/15 text-football-400'
                }`}>
                  {t.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-[9px] uppercase text-gray-500 font-bold">Teams</p><p className="text-sm font-bold text-white">{t.teams}</p></div>
                <div><p className="text-[9px] uppercase text-gray-500 font-bold">Start</p><p className="text-sm font-bold text-white">{t.startDate}</p></div>
                <div><p className="text-[9px] uppercase text-gray-500 font-bold">End</p><p className="text-sm font-bold text-white">{t.endDate}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="TOP ESPORTS PLAYERS" subtitle="Highest-rated gamers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="card p-4"><div className="skeleton h-32" /></div>)
          ) : (
            players.map((p) => <PlayerCard key={p.id} player={p} />)
          )}
        </div>
      </section>

      <section>
        <SectionTitle title="ESPORTS TEAMS" subtitle="Pro gaming teams" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="TOP RANKINGS" action={<Link to="/rankings" className="flex items-center gap-1 text-xs font-medium text-esports-400 hover:gap-2 transition-all">View All <ChevronRight size={14} /></Link>} />
        <div className="card p-3 space-y-1">
          {esportsRankings.slice(0, 5).map((entry) => (
            <RankingRow key={entry.rank} entry={entry} type="player" />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
