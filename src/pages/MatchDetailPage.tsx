import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock } from 'lucide-react';
import { Tabs, DataVerdict, ErrorState, DemoBadge } from '@/components/UI';
import { LiveIndicator, StatCard } from '@/components/Shared';
import { Scorecard } from '@/components/Scorecard';
import { MatchTimeline } from '@/components/MatchTimeline';
import { WinProbabilityBar, MomentumBar, ProgressBar } from '@/components/ProgressBar';
import { RunRateChart, WormChart, ManhattanChart, PerformanceChart } from '@/charts';
import { Footer } from '@/components/Footer';
import { sportConfig } from '@/utils';
import { sportsApi } from '@/services/sportsApi';
import { runRateData, wormChartData, manhattanChartData } from '@/data/mockData';
import type { Match } from '@/types';

export function MatchDetailPage() {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setLoading(true);
    setError(false);
    sportsApi.getMatchById(id!).then((m) => {
      if (m) {
        setMatch(m);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-32" />
        <div className="skeleton h-40 w-full rounded-2xl" />
        <div className="skeleton h-10 w-full" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="space-y-4">
        <Link to="/matches" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
          <ArrowLeft size={16} /> Back to Matches
        </Link>
        <ErrorState message="Unable to load match data. The match may not exist." onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const config = sportConfig[match.sport];
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'commentary', label: 'Commentary' },
    { id: 'stats', label: 'Stats' },
    { id: 'players', label: 'Players' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="space-y-5">
      <Link to="/matches" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Matches
      </Link>

      {/* Match Header */}
      <section className={`card ${config.glow} p-5 relative overflow-hidden`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {match.status === 'live' && <LiveIndicator />}
            {match.status === 'upcoming' && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-football-500/15 text-football-400 border border-football-500/20">Upcoming</span>}
            {match.status === 'completed' && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-ink-700 text-gray-400">Completed</span>}
            <span className={`text-[10px] font-bold uppercase tracking-wider ${config.text}`}>{config.label}</span>
            <DemoBadge />
          </div>
          <span className="text-xs text-gray-500">{match.league}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-lg font-bold mb-2"
              style={{ background: match.teamA.color + '20', border: `1px solid ${match.teamA.color}40`, color: match.teamA.color }}>
              {match.teamA.shortName}
            </div>
            <p className="text-sm font-bold text-white">{match.teamA.name}</p>
            {match.cricket && <p className="text-lg font-display font-extrabold text-white mt-1">{match.cricket.teamAScore}</p>}
            {match.football && <p className="text-lg font-display font-extrabold text-white mt-1">{match.football.teamAScore}</p>}
            {match.esports && <p className="text-lg font-display font-extrabold text-white mt-1">{match.esports.teamAScore}</p>}
          </div>

          <div className="text-center px-4">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">VS</p>
            {match.cricket && <p className="text-xs text-gray-500 mt-1">{match.cricket.teamAOvers} ov</p>}
            {match.football && <p className="text-sm font-bold text-accent-orange mt-1">{match.football.minute}</p>}
            {match.esports && <p className="text-sm font-bold text-esports-400 mt-1">{match.esports.round}</p>}
          </div>

          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-lg font-bold mb-2"
              style={{ background: match.teamB.color + '20', border: `1px solid ${match.teamB.color}40`, color: match.teamB.color }}>
              {match.teamB.shortName}
            </div>
            <p className="text-sm font-bold text-white">{match.teamB.name}</p>
            {match.cricket && <p className="text-lg font-display font-extrabold text-white mt-1">{match.cricket.teamBScore}</p>}
            {match.football && <p className="text-lg font-display font-extrabold text-white mt-1">{match.football.teamBScore}</p>}
            {match.esports && <p className="text-lg font-display font-extrabold text-white mt-1">{match.esports.teamBScore}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-ink-700/40 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MapPin size={12} /> {match.venue}</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {match.date}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {match.time}</span>
        </div>
      </section>

      {/* Quick Stats */}
      {match.cricket && match.status === 'live' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="CRR" value={match.cricket.crr.toFixed(2)} accent="#22c55e" />
          <StatCard label="RRR" value={match.cricket.rrr.toFixed(2)} accent="#f97316" />
          <StatCard label="Target" value={match.cricket.target ?? '—'} accent="#06b6d4" />
          <StatCard label="Wickets" value={match.cricket.innings[0]?.wickets ?? 0} accent="#ef4444" />
        </div>
      )}

      {match.football && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Possession" value={`${match.football.stats.possession[0]}% - ${match.football.stats.possession[1]}%`} accent="#06b6d4" />
          <StatCard label="Shots" value={`${match.football.stats.shots[0]} - ${match.football.stats.shots[1]}`} accent="#06b6d4" />
          <StatCard label="On Target" value={`${match.football.stats.shotsOnTarget[0]} - ${match.football.stats.shotsOnTarget[1]}`} accent="#06b6d4" />
          <StatCard label="xG" value={`${match.football.stats.xG[0]} - ${match.football.stats.xG[1]}`} accent="#06b6d4" />
        </div>
      )}

      {match.esports && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Kills" value={`${match.esports.stats.kills[0]} - ${match.esports.stats.kills[1]}`} accent="#a855f7" />
          <StatCard label="Gold" value={`${(match.esports.stats.gold[0]/1000).toFixed(1)}K - ${(match.esports.stats.gold[1]/1000).toFixed(1)}K`} accent="#a855f7" />
          <StatCard label="Objectives" value={`${match.esports.stats.objectives[0]} - ${match.esports.stats.objectives[1]}`} accent="#a855f7" />
          <StatCard label="Towers" value={`${match.esports.stats.towers[0]} - ${match.esports.stats.towers[1]}`} accent="#a855f7" />
        </div>
      )}

      {/* Win Probability & Momentum */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <WinProbabilityBar
            teamA={match.teamA.name}
            teamB={match.teamB.name}
            probA={match.winProbability[0]}
            probB={match.winProbability[1]}
            sport={match.sport}
          />
        </div>
        <div className="card p-4">
          <MomentumBar
            teamA={match.teamA.name}
            teamB={match.teamB.name}
            momA={match.momentum[0]}
            momB={match.momentum[1]}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {match.cricket && (
            <div className="card p-5">
              <h4 className="text-sm font-bold text-white mb-3">Match Situation</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p>{match.teamA.name}: <span className="font-bold text-white">{match.cricket.teamAScore}</span> ({match.cricket.teamAOvers} overs)</p>
                {match.cricket.target && <p>Target: <span className="font-bold text-cricket-400">{match.cricket.target} runs</span></p>}
                <p>Current Run Rate: <span className="font-bold text-white">{match.cricket.crr.toFixed(2)}</span></p>
                <p>Required Run Rate: <span className="font-bold text-accent-orange">{match.cricket.rrr.toFixed(2)}</span></p>
              </div>
            </div>
          )}
          {match.events.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Key Events</h4>
              <MatchTimeline events={match.events.slice(0, 4)} sport={match.sport} />
            </div>
          )}
          <DataVerdict text={match.dataVerdict} />
        </div>
      )}

      {activeTab === 'scorecard' && match.cricket && (
        <Scorecard
          batsmen={match.cricket.innings[0]?.batsmen ?? []}
          bowlers={match.cricket.innings[0]?.bowlers ?? []}
          fallOfWickets={match.cricket.innings[0]?.fallOfWickets ?? []}
        />
      )}
      {activeTab === 'scorecard' && !match.cricket && (
        <div className="card p-8 text-center">
          <p className="text-sm text-gray-500">Scorecard available for cricket matches only.</p>
        </div>
      )}

      {activeTab === 'commentary' && (
        <div className="card p-4 space-y-2">
          {match.events.length > 0 ? (
            match.events.map((event, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-ink-800/40">
                <span className="text-xs font-bold text-gray-500 shrink-0 w-12">{event.minute}</span>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${config.text}`}>{event.type}</span>
                  <p className="text-sm text-gray-300 mt-0.5">{event.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No commentary available yet.</p>
          )}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-4">
          {match.cricket && (
            <>
              <div className="card p-5">
                <h4 className="text-sm font-bold text-white mb-3">Run Rate Progression</h4>
                <RunRateChart data={runRateData} />
              </div>
              <div className="card p-5">
                <h4 className="text-sm font-bold text-white mb-3">Worm Chart</h4>
                <WormChart data={wormChartData} />
              </div>
              <div className="card p-5">
                <h4 className="text-sm font-bold text-white mb-3">Manhattan Chart (Runs per Phase)</h4>
                <ManhattanChart data={manhattanChartData} />
              </div>
            </>
          )}
          {match.football && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'Possession', a: match.football.stats.possession[0], b: match.football.stats.possession[1], unit: '%' },
                { label: 'Shots', a: match.football.stats.shots[0], b: match.football.stats.shots[1], unit: '' },
                { label: 'On Target', a: match.football.stats.shotsOnTarget[0], b: match.football.stats.shotsOnTarget[1], unit: '' },
                { label: 'Corners', a: match.football.stats.corners[0], b: match.football.stats.corners[1], unit: '' },
                { label: 'Fouls', a: match.football.stats.fouls[0], b: match.football.stats.fouls[1], unit: '' },
                { label: 'xG', a: match.football.stats.xG[0], b: match.football.stats.xG[1], unit: '' },
              ].map((stat, i) => (
                <div key={i} className="card p-4">
                  <p className="text-[10px] uppercase font-bold text-gray-500 text-center mb-2">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white w-12 text-right">{stat.a}{stat.unit}</span>
                    <div className="flex-1 flex gap-0.5">
                      <ProgressBar value={stat.a} max={stat.a + stat.b} color={match.teamA.color} height="h-3" />
                      <ProgressBar value={stat.b} max={stat.a + stat.b} color={match.teamB.color} height="h-3" />
                    </div>
                    <span className="text-lg font-bold text-white w-12">{stat.b}{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {match.esports && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Kills', a: match.esports.stats.kills[0], b: match.esports.stats.kills[1] },
                { label: 'Gold', a: match.esports.stats.gold[0], b: match.esports.stats.gold[1] },
                { label: 'Objectives', a: match.esports.stats.objectives[0], b: match.esports.stats.objectives[1] },
                { label: 'Towers', a: match.esports.stats.towers[0], b: match.esports.stats.towers[1] },
              ].map((stat, i) => (
                <div key={i} className="card p-4 text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-2">{stat.label}</p>
                  <p className="text-xl font-display font-extrabold text-white">{stat.a} - {stat.b}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'players' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[match.teamA, match.teamB].map((team) => (
            <div key={team.id} className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ background: team.color + '30', color: team.color }}>
                  {team.shortName}
                </div>
                <h4 className="text-sm font-bold text-white">{team.name}</h4>
              </div>
              <p className="text-xs text-gray-500">Rating: <span className="font-bold text-white">{team.rating}</span></p>
              <p className="text-xs text-gray-500">Rank: <span className="font-bold text-white">#{team.worldRanking}</span></p>
              <p className="text-xs text-gray-500">Win %: <span className="font-bold text-white">{team.stats.winPercent}%</span></p>
              <Link to={`/team/${team.id}`} className={`text-xs ${config.text} mt-2 inline-block hover:underline`}>
                View Team Profile →
              </Link>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'timeline' && (
        <MatchTimeline events={match.events} sport={match.sport} />
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-4">
          {match.cricket && (
            <>
              <div className="card p-5">
                <h4 className="text-sm font-bold text-white mb-3">Win Probability Over Overs</h4>
                <PerformanceChart
                  data={runRateData.map((d) => ({ opponent: `Ov ${d.over}`, runs: d.runs }))}
                  dataKey="runs"
                  color="#22c55e"
                  type="area"
                  height={200}
                />
              </div>
              <div className="card p-5">
                <h4 className="text-sm font-bold text-white mb-3">Bowling Economy Comparison</h4>
                <PerformanceChart
                  data={match.cricket.innings[0]?.bowlers.map((b) => ({ opponent: b.name.split(' ').slice(-1)[0], runs: b.econ })) ?? []}
                  dataKey="runs"
                  color="#f97316"
                  type="bar"
                  height={180}
                />
              </div>
            </>
          )}
          {match.football && (
            <div className="card p-5">
              <h4 className="text-sm font-bold text-white mb-3">xG Comparison</h4>
              <PerformanceChart
                data={[
                  { opponent: match.teamA.shortName, runs: match.football.stats.xG[0] },
                  { opponent: match.teamB.shortName, runs: match.football.stats.xG[1] },
                ]}
                dataKey="runs"
                color="#06b6d4"
                type="bar"
                height={180}
              />
            </div>
          )}
          {match.esports && (
            <div className="card p-5">
              <h4 className="text-sm font-bold text-white mb-3">Gold Advantage Over Time</h4>
              <PerformanceChart
                data={[
                  { opponent: 'R1', runs: 2500 },
                  { opponent: 'R2', runs: 2500 },
                  { opponent: 'R3', runs: 1800 },
                  { opponent: 'R4', runs: 1200 },
                ]}
                dataKey="runs"
                color="#a855f7"
                type="area"
                height={200}
              />
            </div>
          )}
          <DataVerdict text={match.dataVerdict} />
        </div>
      )}

      <Footer />
    </div>
  );
}
