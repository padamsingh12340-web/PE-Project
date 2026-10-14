import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import { PlayerCard } from '@/components/PlayerCard';
import { SportSelector } from '@/components/SportSelector';
import { SectionTitle, EmptyState } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { playerApi } from '@/services/sportsApi';
import type { Sport, Player } from '@/types';

export function PlayersPage() {
  const [sport, setSport] = useState<Sport>('cricket');
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    playerApi.getPlayersBySport(sport).then((p) => {
      setPlayers(p);
      setLoading(false);
    });
  }, [sport]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white flex items-center gap-2">
            <Users size={24} className="text-cricket-400" /> PLAYERS
          </h1>
          <p className="text-sm text-gray-500 mt-1">Browse all players by sport</p>
        </div>
        <SportSelector selected={sport} onSelect={setSport} />
      </div>

      <Link to="/compare" className="card card-hover p-4 flex items-center justify-between group">
        <div>
          <h3 className="text-sm font-bold text-white">Compare Players</h3>
          <p className="text-xs text-gray-500">Side-by-side statistical comparison with Data Verdict</p>
        </div>
        <ChevronRight size={20} className="text-cricket-400 group-hover:translate-x-1 transition-transform" />
      </Link>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="card p-4"><div className="skeleton h-32" /></div>)}
        </div>
      ) : players.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {players.map((p) => <PlayerCard key={p.id} player={p} />)}
        </div>
      ) : (
        <EmptyState icon={<Users size={40} />} title="No Players Found" message={`No ${sport} players available.`} />
      )}
      <Footer />
    </div>
  );
}
