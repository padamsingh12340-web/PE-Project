import { useState, useEffect } from 'react';
import { BarChart3, Sparkles, TrendingUp, Activity, Zap, Target } from 'lucide-react';
import { SectionTitle, DemoBadge } from '@/components/UI';
import { StatCard } from '@/components/Shared';
import { PerformanceChart, RadarChartComponent, DonutChart } from '@/charts';
import { Footer } from '@/components/Footer';
import { sportConfig } from '@/utils';
import { aiInsights, players, runRateData, wormChartData } from '@/data/mockData';

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30D');

  const topPlayers = [...players].sort((a, b) => b.rating.overall - a.rating.overall).slice(0, 5);

  const radarData = [
    { metric: 'Form', value: 85 },
    { metric: 'Consistency', value: 78 },
    { metric: 'Pressure', value: 82 },
    { metric: 'Recent', value: 88 },
    { metric: 'Home', value: 90 },
    { metric: 'Away', value: 75 },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BarChart3 size={24} className="text-esports-400" />
          <h1 className="font-display font-extrabold text-2xl text-white">ANALYTICS</h1>
          <DemoBadge />
        </div>
        <div className="inline-flex items-center gap-1 p-1 bg-ink-850 border border-ink-700/60 rounded-xl text-[10px]">
          {['7D', '30D', '3M', '1Y', 'Career'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                timeRange === range ? 'bg-ink-700/60 text-white' : 'text-gray-500 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* AI Data Insights */}
      <section>
        <SectionTitle title="AI DATA INSIGHT" subtitle="Automated statistical analysis" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight) => (
            <div key={insight.id} className="card p-4 border-l-2 border-l-cricket-500/50">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-cricket-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{insight.player}</span>
                <span className={`text-[9px] uppercase font-bold ml-auto px-1.5 py-0.5 rounded ${sportConfig[insight.sport].bg} ${sportConfig[insight.sport].text}`}>
                  {insight.sport}
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Player Performance */}
      <section>
        <SectionTitle title="PLAYER PERFORMANCE" subtitle="Top 5 players by rating" />
        <div className="card p-5">
          <PerformanceChart
            data={topPlayers.map((p) => ({ opponent: p.name.split(' ').slice(-1)[0], runs: p.rating.overall }))}
            dataKey="runs"
            color="#22c55e"
            type="bar"
            height={220}
          />
        </div>
      </section>

      {/* Form Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-cricket-400" />
            <h4 className="text-sm font-bold text-white">Form Analysis</h4>
          </div>
          <RadarChartComponent data={radarData} color="#22c55e" height={250} />
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-football-400" />
            <h4 className="text-sm font-bold text-white">Run Rate Progression</h4>
          </div>
          <PerformanceChart
            data={runRateData.map((d) => ({ opponent: `Ov${d.over}`, runs: d.runs }))}
            dataKey="runs"
            color="#06b6d4"
            type="area"
            height={250}
          />
        </div>
      </section>

      {/* Win Probability & Trend */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-esports-400" />
            <h4 className="text-sm font-bold text-white">Win Probability Distribution</h4>
          </div>
          <DonutChart
            data={[
              { name: 'India', value: 40 },
              { name: 'Australia', value: 28 },
              { name: 'England', value: 18 },
              { name: 'Others', value: 14 },
            ]}
            colors={['#22c55e', '#fbbf24', '#3b82f6', '#a855f7']}
            height={250}
          />
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-accent-orange" />
            <h4 className="text-sm font-bold text-white">Trend Analysis — Worm Chart</h4>
          </div>
          <PerformanceChart
            data={wormChartData.map((d) => ({ opponent: `Ov${d.over}`, runs: d.teamA }))}
            dataKey="runs"
            color="#f97316"
            type="line"
            height={250}
          />
        </div>
      </section>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Form Score" value="85/100" accent="#22c55e" />
        <StatCard label="Consistency" value="78/100" accent="#06b6d4" />
        <StatCard label="Pressure Perf" value="82/100" accent="#a855f7" />
        <StatCard label="Recent Perf" value="88/100" accent="#fbbf24" />
      </div>

      <Footer />
    </div>
  );
}
