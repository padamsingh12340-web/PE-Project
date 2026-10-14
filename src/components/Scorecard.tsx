import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { BattingLine, BowlingLine } from '@/types';

export function Scorecard({
  batsmen,
  bowlers,
  fallOfWickets,
}: {
  batsmen: BattingLine[];
  bowlers: BowlingLine[];
  fallOfWickets: { score: string; over: string; batsman: string }[];
}) {
  return (
    <div className="space-y-4">
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-ink-700/50 bg-ink-800/40">
          <h4 className="text-sm font-bold text-white">Batting</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-500 font-bold border-b border-ink-700/40">
                <th className="text-left py-2 px-4">Batter</th>
                <th className="text-center py-2 px-2">R</th>
                <th className="text-center py-2 px-2">B</th>
                <th className="text-center py-2 px-2">4s</th>
                <th className="text-center py-2 px-2">6s</th>
                <th className="text-center py-2 px-2">SR</th>
              </tr>
            </thead>
            <tbody>
              {batsmen.map((batsman, i) => (
                <BattingRow key={i} batsman={batsman} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {fallOfWickets.length > 0 && (
        <div className="card p-4">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">Fall of Wickets</p>
          <div className="flex flex-wrap gap-2">
            {fallOfWickets.map((fow, i) => (
              <span key={i} className="text-xs text-gray-400 bg-ink-800/60 rounded-md px-2 py-1">
                {i + 1}-{fow.score} ({fow.batsman}, {fow.over} ov)
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-ink-700/50 bg-ink-800/40">
          <h4 className="text-sm font-bold text-white">Bowling</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-500 font-bold border-b border-ink-700/40">
                <th className="text-left py-2 px-4">Bowler</th>
                <th className="text-center py-2 px-2">O</th>
                <th className="text-center py-2 px-2">M</th>
                <th className="text-center py-2 px-2">R</th>
                <th className="text-center py-2 px-2">W</th>
                <th className="text-center py-2 px-2">Econ</th>
              </tr>
            </thead>
            <tbody>
              {bowlers.map((bowler, i) => (
                <BowlingRow key={i} bowler={bowler} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BattingRow({ batsman }: { batsman: BattingLine }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr
        className="border-b border-ink-700/30 hover:bg-ink-800/40 cursor-pointer transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="py-2.5 px-4">
          <div className="flex items-center gap-2">
            <ChevronDown
              size={14}
              className={`text-gray-600 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
            <div>
              <p className={`font-medium ${batsman.out ? 'text-gray-400' : 'text-white'}`}>
                {batsman.name}
                {!batsman.out && <span className="text-cricket-400 ml-1">*</span>}
              </p>
              {batsman.dismissal && (
                <p className="text-[10px] text-gray-500 mt-0.5">{batsman.dismissal}</p>
              )}
              {!batsman.out && <p className="text-[10px] text-cricket-400 mt-0.5">not out</p>}
            </div>
          </div>
        </td>
        <td className="text-center font-bold text-white py-2.5 px-2">{batsman.runs}</td>
        <td className="text-center text-gray-400 py-2.5 px-2">{batsman.balls}</td>
        <td className="text-center text-gray-400 py-2.5 px-2">{batsman.fours}</td>
        <td className="text-center text-gray-400 py-2.5 px-2">{batsman.sixes}</td>
        <td className="text-center text-gray-400 py-2.5 px-2">{batsman.sr.toFixed(2)}</td>
      </tr>
      {expanded && (
        <tr className="bg-ink-900/40">
          <td colSpan={6} className="py-3 px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-gray-500">Runs: </span>
                <span className="font-bold text-white">{batsman.runs}</span>
              </div>
              <div>
                <span className="text-gray-500">Balls: </span>
                <span className="font-bold text-white">{batsman.balls}</span>
              </div>
              <div>
                <span className="text-gray-500">Boundary %: </span>
                <span className="font-bold text-white">
                  {batsman.balls > 0
                    ? (((batsman.fours * 4 + batsman.sixes * 6) / (batsman.runs || 1)) * 100).toFixed(0)
                    : 0}
                  %
                </span>
              </div>
              <div>
                <span className="text-gray-500">Dot Ball %: </span>
                <span className="font-bold text-white">
                  {batsman.balls > 0
                    ? Math.max(0, ((batsman.balls - batsman.fours - batsman.sixes) / batsman.balls) * 100).toFixed(0)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function BowlingRow({ bowler }: { bowler: BowlingLine }) {
  return (
    <tr className="border-b border-ink-700/30 hover:bg-ink-800/40 transition-colors">
      <td className="py-2.5 px-4 font-medium text-white">{bowler.name}</td>
      <td className="text-center text-gray-400 py-2.5 px-2">{bowler.overs}</td>
      <td className="text-center text-gray-400 py-2.5 px-2">{bowler.maidens}</td>
      <td className="text-center text-gray-400 py-2.5 px-2">{bowler.runs}</td>
      <td className="text-center font-bold text-white py-2.5 px-2">{bowler.wickets}</td>
      <td className="text-center text-gray-400 py-2.5 px-2">{bowler.econ.toFixed(2)}</td>
    </tr>
  );
}
