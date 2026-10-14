import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { TeamCard } from '@/components/TeamCard';
import { SportSelector } from '@/components/SportSelector';
import { EmptyState } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { teamApi } from '@/services/sportsApi';
import type { Sport, Team } from '@/types';

export function TeamsPage() {
  const [sport, setSport] = useState<Sport>('cricket');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    teamApi.getTeamsBySport(sport).then((t) => {
      setTeams(t);
      setLoading(false);
    });
  }, [sport]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white flex items-center gap-2">
            <Shield size={24} className="text-football-400" /> TEAMS
          </h1>
          <p className="text-sm text-gray-500 mt-1">Browse all teams by sport</p>
        </div>
        <SportSelector selected={sport} onSelect={setSport} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="card p-4"><div className="skeleton h-32" /></div>)}
        </div>
      ) : teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((t) => <TeamCard key={t.id} team={t} />)}
        </div>
      ) : (
        <EmptyState icon={<Shield size={40} />} title="No Teams Found" message={`No ${sport} teams available.`} />
      )}
      <Footer />
    </div>
  );
}
