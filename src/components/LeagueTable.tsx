import type { LeagueStanding } from '@/types';
import { getZoneStyle } from '@/utils';

export function LeagueTable({ standings }: { standings: LeagueStanding[] }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-500 font-bold border-b border-ink-700/50 bg-ink-800/40">
              <th className="text-left py-2.5 px-3">#</th>
              <th className="text-left py-2.5 px-3">Team</th>
              <th className="text-center py-2.5 px-2">P</th>
              <th className="text-center py-2.5 px-2">W</th>
              <th className="text-center py-2.5 px-2">D</th>
              <th className="text-center py-2.5 px-2">L</th>
              <th className="text-center py-2.5 px-2 hidden md:table-cell">GF</th>
              <th className="text-center py-2.5 px-2 hidden md:table-cell">GA</th>
              <th className="text-center py-2.5 px-2">GD</th>
              <th className="text-center py-2.5 px-2 font-bold text-white">Pts</th>
              <th className="text-center py-2.5 px-2 hidden lg:table-cell">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => {
              const zone = getZoneStyle(row.zone);
              return (
                <tr
                  key={row.position}
                  className="border-b border-ink-700/30 hover:bg-ink-800/40 transition-colors"
                >
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1 h-5 rounded-full ${zone.bg ? zone.bg.replace('/15', '') : 'bg-transparent'}`}
                        style={{
                          backgroundColor: row.zone === 'champions' ? '#22c55e' : row.zone === 'qualification' ? '#06b6d4' : row.zone === 'europa' ? '#fbbf24' : row.zone === 'relegation' ? '#ef4444' : 'transparent',
                        }}
                      />
                      <span className="font-bold text-white text-xs">{row.position}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-medium text-white text-xs">{row.team}</span>
                  </td>
                  <td className="text-center text-gray-400 py-2.5 px-2 text-xs">{row.played}</td>
                  <td className="text-center text-cricket-400 py-2.5 px-2 text-xs font-medium">{row.won}</td>
                  <td className="text-center text-gray-400 py-2.5 px-2 text-xs">{row.drawn}</td>
                  <td className="text-center text-accent-red py-2.5 px-2 text-xs font-medium">{row.lost}</td>
                  <td className="text-center text-gray-400 py-2.5 px-2 text-xs hidden md:table-cell">{row.gf}</td>
                  <td className="text-center text-gray-400 py-2.5 px-2 text-xs hidden md:table-cell">{row.ga}</td>
                  <td className="text-center py-2.5 px-2 text-xs">
                    <span className={row.gd > 0 ? 'text-cricket-400' : row.gd < 0 ? 'text-accent-red' : 'text-gray-400'}>
                      {row.gd > 0 ? '+' : ''}{row.gd}
                    </span>
                  </td>
                  <td className="text-center py-2.5 px-2">
                    <span className="font-display font-extrabold text-white">{row.points}</span>
                  </td>
                  <td className="text-center py-2.5 px-2 hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-0.5">
                      {row.form.map((result, i) => (
                        <span
                          key={i}
                          className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                            result === 'W'
                              ? 'bg-cricket-500/20 text-cricket-400'
                              : result === 'L'
                              ? 'bg-accent-red/20 text-accent-red'
                              : 'bg-accent-gold/20 text-accent-gold'
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-3 p-3 border-t border-ink-700/40 text-[10px]">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cricket-500" /> Champions League</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-football-500" /> Qualification</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-gold" /> Europa League</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-red" /> Relegation</span>
      </div>
    </div>
  );
}
