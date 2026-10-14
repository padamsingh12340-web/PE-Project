import { getFormLabel, getFormColor } from '@/utils';

export function FormIndicator({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const filled = Math.round(score / 20);
  const total = 5;
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };
  const dotSize = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`${dotSize} rounded-full transition-colors ${
              i < filled
                ? score >= 75
                  ? 'bg-cricket-400'
                  : score >= 60
                  ? 'bg-football-400'
                  : score >= 40
                  ? 'bg-accent-gold'
                  : 'bg-accent-red'
                : 'bg-ink-600'
            }`}
          />
        ))}
      </div>
      {size !== 'sm' && (
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-bold ${getFormColor(score)}`}>{score}/100</span>
          <span className={`text-[10px] uppercase tracking-wider font-bold ${getFormColor(score)}`}>
            {getFormLabel(score)}
          </span>
        </div>
      )}
    </div>
  );
}

export function RatingBadge({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-lg',
    lg: 'w-20 h-20 text-2xl',
  };
  const color =
    rating >= 90 ? '#a855f7' : rating >= 85 ? '#22c55e' : rating >= 80 ? '#06b6d4' : '#fbbf24';
  return (
    <div
      className={`${sizes[size]} rounded-xl flex flex-col items-center justify-center font-display font-extrabold shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${color}25, ${color}10)`,
        border: `1px solid ${color}40`,
        color: color,
      }}
    >
      <span className="leading-none">{rating.toFixed(1)}</span>
      {size !== 'sm' && <span className="text-[8px] font-medium text-gray-500 mt-0.5">RATING</span>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sublabel,
  accent = '#22c55e',
  icon,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  accent?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="card card-hover p-4 group">
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</span>
        {icon && <span style={{ color: accent }}>{icon}</span>}
      </div>
      <p
        className="font-display font-extrabold text-2xl text-white leading-tight"
        style={{ textShadow: `0 0 20px ${accent}30` }}
      >
        {value}
      </p>
      {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
    </div>
  );
}

export function LiveIndicator({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  const textSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-red/15 border border-accent-red/30">
      <span className={`${dotSize} rounded-full bg-accent-red animate-pulse`} />
      <span className={`${textSize} font-bold uppercase tracking-wider text-accent-red`}>Live</span>
    </div>
  );
}
