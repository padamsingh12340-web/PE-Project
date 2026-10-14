import { useState, useEffect } from 'react';
import { Swords } from 'lucide-react';
import { MatchRow } from '@/components/MatchRow';
import { Tabs, EmptyState, DemoBadge } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { sportsApi } from '@/services/sportsApi';
import type { Match, Sport } from '@/types';

export function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [sportFilter, setSportFilter] = useState<'all' | Sport>('all');

  useEffect(() => {
    sportsApi.getAllMatches().then((m) => {
      setMatches(m);
      setLoading(false);
    });
  }, []);

  const filtered = matches.filter((m) => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (sportFilter !== 'all' && m.sport !== sportFilter) return false;
    return true;
  });

  const statusTabs = [
    { id: 'all', label: 'All' },
    { id: 'live', label: 'Live' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Swords size={24} className="text-cricket-400" />
        <h1 className="font-display font-extrabold text-2xl text-white">MATCHES</h1>
        <DemoBadge />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Tabs tabs={statusTabs} active={statusFilter} onChange={(v) => setStatusFilter(v as any)} />
        <div className="inline-flex items-center gap-1 p-1 bg-ink-850 border border-ink-700/60 rounded-xl text-xs">
          {(['all', 'cricket', 'football', 'esports'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSportFilter(s)}
              className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                sportFilter === s ? 'bg-ink-700/60 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="card p-3"><div className="skeleton h-16" /></div>)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((m) => <MatchRow key={m.id} match={m} />)}
        </div>
      ) : (
        <EmptyState icon={<Swords size={40} />} title="No Matches Found" message="No matches match your current filters. Try adjusting them." />
      )}
      <Footer />
    </div>
  );
}
