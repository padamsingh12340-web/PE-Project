import { useState, useEffect } from 'react';
import { LiveMatchCard } from '@/components/LiveMatchCard';
import { SportSelector } from '@/components/SportSelector';
import { SectionTitle, EmptyState } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { sportsApi } from '@/services/sportsApi';
import type { Sport, Match } from '@/types';
import { Radio } from 'lucide-react';

export function LivePage() {
  const [sport, setSport] = useState<Sport>('cricket');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    sportsApi.getLiveMatches().then((m) => {
      setMatches(m);
      setLoading(false);
    });
  }, []);

  const filtered = matches.filter((m) => m.sport === sport);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white flex items-center gap-2">
            <Radio size={24} className="text-accent-red animate-pulse" />
            LIVE MATCHES
          </h1>
          <p className="text-sm text-gray-500 mt-1">Real-time scores and updates</p>
        </div>
        <SportSelector selected={sport} onSelect={setSport} />
      </div>

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
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((match) => (
            <LiveMatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Radio size={40} />}
          title="No Live Matches"
          message={`No ${sport} matches are currently live. Check back soon!`}
        />
      )}
      <Footer />
    </div>
  );
}
