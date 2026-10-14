import type { MatchEvent } from '@/types';
import { sportConfig } from '@/utils';

export function MatchTimeline({ events, sport }: { events: MatchEvent[]; sport: 'cricket' | 'football' | 'esports' }) {
  const config = sportConfig[sport];
  if (!events.length) {
    return (
      <div className="card p-8 text-center">
        <p className="text-sm text-gray-500">No events yet for this match.</p>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <h4 className="text-sm font-bold text-white mb-4 px-2">Match Timeline</h4>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink-700/60 -translate-x-1/2" />
        <div className="space-y-4">
          {events.map((event, i) => {
            const isTeamA = event.team === 'a';
            return (
              <div
                key={i}
                className={`flex items-start gap-4 animate-slide-up`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`flex-1 ${isTeamA ? '' : 'order-3'}`}>
                  {isTeamA && (
                    <EventCard event={event} config={config} align="right" />
                  )}
                </div>
                <div className="relative z-10 shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2"
                    style={{
                      borderColor: config.color + '40',
                      background: config.color + '15',
                      color: config.color,
                    }}
                  >
                    {event.minute}
                  </div>
                </div>
                <div className={`flex-1 ${isTeamA ? 'order-3' : ''}`}>
                  {!isTeamA && (
                    <EventCard event={event} config={config} align="left" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventCard({
  event,
  config,
  align,
}: {
  event: MatchEvent;
  config: { color: string };
  align: 'left' | 'right';
}) {
  const getTypeColor = (type: string) => {
    if (type.includes('GOAL') || type.includes('SIX') || type.includes('ROUND WIN'))
      return '#22c55e';
    if (type.includes('WICKET') || type.includes('CARD')) return '#ef4444';
    if (type.includes('FOUR')) return '#06b6d4';
    if (type.includes('OBJECTIVE') || type.includes('TEAM FIGHT')) return '#a855f7';
    return config.color;
  };
  const color = getTypeColor(event.type);

  return (
    <div
      className={`inline-block max-w-xs rounded-lg px-3 py-2 ${
        align === 'right' ? 'text-right ml-auto' : 'text-left'
      }`}
      style={{ background: color + '10', border: `1px solid ${color}30` }}
    >
      <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color }}
        >
          {event.type}
        </span>
      </div>
      <p className="text-xs text-gray-300 mt-0.5">{event.description}</p>
    </div>
  );
}
