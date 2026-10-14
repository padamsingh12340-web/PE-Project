import { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import { NewsCard } from '@/components/NewsCard';
import { Tabs, DemoBadge } from '@/components/UI';
import { Footer } from '@/components/Footer';
import { newsApi } from '@/services/sportsApi';
import type { NewsArticle, Sport } from '@/types';

export function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Sport>('all');

  useEffect(() => {
    newsApi.getNews().then((n) => {
      setArticles(n);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.sport === filter);
  const categories = ['all', 'cricket', 'football', 'esports'];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Newspaper size={24} className="text-football-400" />
        <h1 className="font-display font-extrabold text-2xl text-white">SPORTS NEWS</h1>
        <DemoBadge />
      </div>

      <Tabs
        tabs={categories.map((c) => ({ id: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
        active={filter}
        onChange={(v) => setFilter(v as any)}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="card overflow-hidden"><div className="skeleton h-40" /><div className="p-3"><div className="skeleton h-4 w-3/4" /><div className="skeleton h-3 w-1/2 mt-2" /></div></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a) => <NewsCard key={a.id} article={a} />)}
        </div>
      )}
      <Footer />
    </div>
  );
}
