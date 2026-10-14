import type { ReactNode } from 'react';

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 bg-ink-850 border border-ink-700/60 rounded-xl overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            active === tab.id
              ? 'bg-ink-700/60 text-white shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-ink-800/60'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="font-display font-extrabold text-xl text-white">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="skeleton w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-3/4" />
          <div className="skeleton h-2 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="skeleton h-12 rounded-md" />
        <div className="skeleton h-12 rounded-md" />
        <div className="skeleton h-12 rounded-md" />
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  message,
  action,
}: {
  icon?: ReactNode;
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="card p-8 text-center">
      {icon && <div className="flex justify-center mb-3 text-gray-600">{icon}</div>}
      <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="card p-8 text-center border-accent-red/20">
      <div className="text-3xl mb-2">⚠</div>
      <h3 className="text-sm font-bold text-white mb-1">Something went wrong</h3>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-cricket-500/20 text-cricket-400 text-sm font-medium hover:bg-cricket-500/30 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function DataVerdict({ text }: { text: string }) {
  return (
    <div className="card gradient-border p-5 bg-gradient-to-br from-ink-850 to-ink-900">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cricket-500 to-esports-500 flex items-center justify-center text-xs font-bold text-white">
          D
        </div>
        <h3 className="font-display font-extrabold text-sm text-white tracking-wide">
          DATA VERDICT
        </h3>
        <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold ml-auto">
          Statistical Insight
        </span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-[9px] font-bold uppercase tracking-wider text-accent-gold">
      Demo Data
    </span>
  );
}
