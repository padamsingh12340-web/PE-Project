import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PlayerCard } from '@/components/PlayerCard';
import { TeamCard } from '@/components/TeamCard';
import { MatchRow } from '@/components/MatchRow';
import { SectionTitle, EmptyState } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { useFavorites } from '@/hooks';
import { players, matches, teams } from '@/data/mockData';

export function FavoritesPage() {
  const { favorites } = useFavorites();

  const favPlayers = players.filter((p) => favorites.players.includes(p.id));
  const favTeamObjects = teams.filter((t) => favorites.teams.includes(t.id));
  const favMatches = matches.filter((m) => favorites.matches.includes(m.id));

  const hasAny = favPlayers.length > 0 || favTeamObjects.length > 0 || favMatches.length > 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Heart size={24} className="text-cricket-400" />
        <h1 className="font-display font-extrabold text-2xl text-white">MY FAVORITES</h1>
      </div>

      {!hasAny && (
        <EmptyState
          icon={<Heart size={40} />}
          title="No Favorites Yet"
          message="Tap the heart icon on players, teams, or matches to add them to your favorites."
          action={
            <Link to="/players" className="px-4 py-2 rounded-lg bg-cricket-500/20 text-cricket-400 text-sm font-medium hover:bg-cricket-500/30 transition-colors">
              Browse Players
            </Link>
          }
        />
      )}

      {favPlayers.length > 0 && (
        <section>
          <SectionTitle title="Favorite Players" subtitle={`${favPlayers.length} players`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favPlayers.map((p) => <PlayerCard key={p.id} player={p} />)}
          </div>
        </section>
      )}

      {favTeamObjects.length > 0 && (
        <section>
          <SectionTitle title="Favorite Teams" subtitle={`${favTeamObjects.length} teams`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favTeamObjects.map((t) => <TeamCard key={t.id} team={t} />)}
          </div>
        </section>
      )}

      {favMatches.length > 0 && (
        <section>
          <SectionTitle title="Favorite Matches" subtitle={`${favMatches.length} matches`} />
          <div className="space-y-3">
            {favMatches.map((m) => <MatchRow key={m.id} match={m} />)}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
