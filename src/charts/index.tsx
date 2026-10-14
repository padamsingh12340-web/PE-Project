import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const tooltipStyle = {
  backgroundColor: '#0f1422',
  border: '1px solid #222c44',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#e5e7eb',
};

export function PerformanceChart({
  data,
  dataKey = 'runs',
  color = '#22c55e',
  height = 200,
  type = 'bar',
}: {
  data: { opponent: string; [key: string]: any }[];
  dataKey?: string;
  color?: string;
  height?: number;
  type?: 'line' | 'bar' | 'area';
}) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" />
          <XAxis dataKey="opponent" tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
          <Tooltip contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 3 }}
            activeDot={{ r: 5 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" />
          <XAxis dataKey="opponent" tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#grad-${dataKey})`}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" />
        <XAxis dataKey="opponent" tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1a223640' }} />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} animationDuration={800} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RadarChartComponent({
  data,
  height = 250,
  color = '#22c55e',
}: {
  data: { metric: string; value: number }[];
  height?: number;
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid stroke="#2d3a57" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 10 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 8 }} />
        <Radar
          name="Rating"
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.3}
          strokeWidth={2}
          animationDuration={800}
        />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  height = 200,
  colors = ['#22c55e', '#06b6d4', '#a855f7', '#fbbf24', '#ef4444'],
}: {
  data: { name: string; value: number }[];
  height?: number;
  colors?: string[];
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
          animationDuration={800}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend
          wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RunRateChart({
  data,
  height = 220,
}: {
  data: { over: string; runs: number; rrr: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="runGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="rrrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" />
        <XAxis dataKey="over" tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} iconType="circle" />
        <Area
          type="monotone"
          dataKey="runs"
          name="Cumulative Runs"
          stroke="#22c55e"
          strokeWidth={2}
          fill="url(#runGrad)"
          animationDuration={800}
        />
        <Area
          type="monotone"
          dataKey="rrr"
          name="Required RR"
          stroke="#f97316"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="url(#rrrGrad)"
          animationDuration={800}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function WormChart({
  data,
  height = 220,
}: {
  data: { over: number; teamA: number; teamB: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" />
        <XAxis dataKey="over" tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} iconType="circle" />
        <Line type="monotone" dataKey="teamA" name="India" stroke="#22c55e" strokeWidth={2} dot={false} animationDuration={800} />
        <Line type="monotone" dataKey="teamB" name="Australia" stroke="#fbbf24" strokeWidth={2} dot={false} animationDuration={800} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ManhattanChart({
  data,
  height = 200,
}: {
  data: { over: string; runs: number; label: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" />
        <XAxis dataKey="over" tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1a223640' }} />
        <Bar dataKey="runs" radius={[4, 4, 0, 0]} animationDuration={800}>
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? '#06b6d4' : index === 1 ? '#22c55e' : '#a855f7'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ComparisonBarChart({
  data,
  height = 250,
  playerA,
  playerB,
}: {
  data: { metric: string; playerA: number; playerB: number }[];
  height?: number;
  playerA: string;
  playerB: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" horizontal={false} />
        <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 10 }} stroke="#2d3a57" />
        <YAxis type="category" dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 10 }} stroke="#2d3a57" width={80} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1a223640' }} />
        <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} iconType="circle" />
        <Bar dataKey="playerA" name={playerA} fill="#22c55e" radius={[0, 4, 4, 0]} animationDuration={800} />
        <Bar dataKey="playerB" name={playerB} fill="#06b6d4" radius={[0, 4, 4, 0]} animationDuration={800} />
      </BarChart>
    </ResponsiveContainer>
  );
}
