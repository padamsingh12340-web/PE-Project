import type { NewsArticle } from '@/types';
import { sportConfig } from '@/utils';

export function NewsCard({ article }: { article: NewsArticle }) {
  const config = sportConfig[article.sport];
  return (
    <article className="card card-hover overflow-hidden group">
      <div className="relative h-40 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
        <span
          className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text} border ${config.border}`}
        >
          {article.category}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-cricket-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{article.excerpt}</p>
        <p className="text-[10px] text-gray-600 mt-2">{article.date}</p>
      </div>
    </article>
  );
}
