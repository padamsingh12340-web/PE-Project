export type Sport = 'cricket' | 'football' | 'esports';

export type MatchStatus = 'live' | 'upcoming' | 'completed';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  country: string;
  sport: Sport;
  color: string;
  rating: number;
  worldRanking: number;
  recentForm: ('W' | 'L' | 'D')[];
  stats: TeamStats;
}

export interface TeamStats {
  matches: number;
  wins: number;
  losses: number;
  draws: number;
  winPercent: number;
  currentStreak: number;
}

export interface PlayerRating {
  overall: number;
  batting?: number;
  bowling?: number;
  fielding: number;
  consistency: number;
  form: number;
  clutch: number;
}

export interface Player {
  id: string;
  name: string;
  role: string;
  country: string;
  teamId: string;
  teamName: string;
  sport: Sport;
  rating: PlayerRating;
  formScore: number;
  image?: string;
  batting?: CricketBattingStats;
  bowling?: CricketBowlingStats;
  football?: FootballPlayerStats;
  esports?: EsportsPlayerStats;
  recentMatches: RecentMatchPerformance[];
}

export interface CricketBattingStats {
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  fifties: number;
  hundreds: number;
  bestScore: string;
  fours: number;
  sixes: number;
}

export interface CricketBowlingStats {
  matches: number;
  overs: number;
  wickets: number;
  economy: number;
  best: string;
  maidens: number;
}

export interface FootballPlayerStats {
  goals: number;
  assists: number;
  appearances: number;
  minutes: number;
  xG: number;
  xA: number;
  passAccuracy: number;
  tackles: number;
  keyPasses: number;
  cleanSheets: number;
}

export interface EsportsPlayerStats {
  kills: number;
  deaths: number;
  assists: number;
  kdRatio: number;
  winRate: number;
  mvps: number;
  tournaments: number;
}

export interface RecentMatchPerformance {
  matchId: string;
  opponent: string;
  date: string;
  runs?: number;
  wickets?: number;
  goals?: number;
  assists?: number;
  kills?: number;
  rating: number;
}

export interface CricketInnings {
  battingTeam: string;
  score: string;
  overs: string;
  wickets: number;
  batsmen: BattingLine[];
  bowlers: BowlingLine[];
  fallOfWickets: FallOfWicket[];
}

export interface BattingLine {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  sr: number;
  out: boolean;
  dismissal?: string;
}

export interface BowlingLine {
  name: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  econ: number;
}

export interface FallOfWicket {
  score: string;
  over: string;
  batsman: string;
}

export interface FootballMatchStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  xG: [number, number];
}

export interface EsportsMatchStats {
  kills: [number, number];
  gold: [number, number];
  objectives: [number, number];
  towers: [number, number];
}

export interface MatchEvent {
  minute: string;
  type: string;
  team: 'a' | 'b';
  description: string;
  icon: string;
}

export interface Match {
  id: string;
  sport: Sport;
  status: MatchStatus;
  teamA: Team;
  teamB: Team;
  teamAId: string;
  teamBId: string;
  venue: string;
  date: string;
  time: string;
  league: string;
  // Cricket
  cricket?: {
    teamAScore: string;
    teamBScore: string;
    teamAOvers: string;
    teamBOvers: string;
    crr: number;
    rrr: number;
    target?: number;
    innings: CricketInnings[];
  };
  // Football
  football?: {
    teamAScore: number;
    teamBScore: number;
    minute: string;
    stats: FootballMatchStats;
  };
  // Esports
  esports?: {
    teamAScore: number;
    teamBScore: number;
    round: string;
    stats: EsportsMatchStats;
  };
  events: MatchEvent[];
  winProbability: [number, number];
  momentum: [number, number];
  dataVerdict: string;
}

export interface RankingEntry {
  rank: number;
  previousRank: number;
  player: Player;
  rating: number;
  movement: 'up' | 'down' | 'same';
}

export interface TeamRankingEntry {
  rank: number;
  previousRank: number;
  team: Team;
  rating: number;
  movement: 'up' | 'down' | 'same';
}

export interface LeagueStanding {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: ('W' | 'L' | 'D')[];
  zone?: 'champions' | 'qualification' | 'europa' | 'relegation';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  sport: Sport;
  date: string;
  excerpt: string;
  image: string;
}

export interface Tournament {
  id: string;
  name: string;
  sport: Sport;
  startDate: string;
  endDate: string;
  teams: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface SearchResults {
  players: Player[];
  teams: Team[];
  matches: Match[];
  tournaments: Tournament[];
}
