import type { Player, Team, Match, Sport } from '@/types';
import {
  players as mockPlayers,
  teams as mockTeams,
  matches as mockMatches,
  playerRankings,
  teamRankings,
  leagueStandings,
  newsArticles,
  tournaments,
} from '@/data/mockData';

/**
 * API Service Layer
 *
 * All data-fetching functions go through this layer. Currently returns mock data,
 * but each function is structured to be replaced with real API calls.
 *
 * DEMO DATA is used throughout. Replace the mock imports with live API calls
 * when real sports data APIs are integrated.
 */

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sportsApi = {
  async getDashboardStats(): Promise<{
    liveMatches: number;
    playersTracked: number;
    teams: number;
    matchesToday: number;
  }> {
    await delay(200);
    return {
      liveMatches: mockMatches.filter((m) => m.status === 'live').length,
      playersTracked: 4821,
      teams: 632,
      matchesToday: 48,
    };
  },

  async getLiveMatches(): Promise<Match[]> {
    await delay(150);
    return mockMatches.filter((m) => m.status === 'live');
  },

  async getUpcomingMatches(): Promise<Match[]> {
    await delay(150);
    return mockMatches.filter((m) => m.status === 'upcoming');
  },

  async getCompletedMatches(): Promise<Match[]> {
    await delay(150);
    return mockMatches.filter((m) => m.status === 'completed');
  },

  async getAllMatches(): Promise<Match[]> {
    await delay(200);
    return mockMatches;
  },

  async getMatchById(id: string): Promise<Match | undefined> {
    await delay(100);
    return mockMatches.find((m) => m.id === id);
  },

  async getMatchesBySport(sport: Sport): Promise<Match[]> {
    await delay(150);
    return mockMatches.filter((m) => m.sport === sport);
  },
};

export const cricketApi = {
  async getCricketMatches(): Promise<Match[]> {
    await delay(150);
    return mockMatches.filter((m) => m.sport === 'cricket');
  },
  async getCricketPlayers(): Promise<Player[]> {
    await delay(150);
    return mockPlayers.filter((p) => p.sport === 'cricket');
  },
};

export const footballApi = {
  async getFootballMatches(): Promise<Match[]> {
    await delay(150);
    return mockMatches.filter((m) => m.sport === 'football');
  },
  async getFootballPlayers(): Promise<Player[]> {
    await delay(150);
    return mockPlayers.filter((p) => p.sport === 'football');
  },
  async getLeagueTable() {
    await delay(150);
    return leagueStandings;
  },
};

export const esportsApi = {
  async getEsportsMatches(): Promise<Match[]> {
    await delay(150);
    return mockMatches.filter((m) => m.sport === 'esports');
  },
  async getEsportsPlayers(): Promise<Player[]> {
    await delay(150);
    return mockPlayers.filter((p) => p.sport === 'esports');
  },
};

export const playerApi = {
  async getAllPlayers(): Promise<Player[]> {
    await delay(200);
    return mockPlayers;
  },
  async getPlayerById(id: string): Promise<Player | undefined> {
    await delay(100);
    return mockPlayers.find((p) => p.id === id);
  },
  async getPlayersBySport(sport: Sport): Promise<Player[]> {
    await delay(150);
    return mockPlayers.filter((p) => p.sport === sport);
  },
  async getPlayerRankings() {
    await delay(200);
    return playerRankings;
  },
};

export const teamApi = {
  async getAllTeams(): Promise<Team[]> {
    await delay(200);
    return mockTeams;
  },
  async getTeamById(id: string): Promise<Team | undefined> {
    await delay(100);
    return mockTeams.find((t) => t.id === id);
  },
  async getTeamsBySport(sport: Sport): Promise<Team[]> {
    await delay(150);
    return mockTeams.filter((t) => t.sport === sport);
  },
  async getTeamRankings() {
    await delay(200);
    return teamRankings;
  },
};

export const newsApi = {
  async getNews() {
    await delay(200);
    return newsArticles;
  },
  async getNewsBySport(sport: Sport) {
    await delay(150);
    return newsArticles.filter((n) => n.sport === sport);
  },
};

export const tournamentApi = {
  async getTournaments() {
    await delay(200);
    return tournaments;
  },
};

export const searchApi = {
  async search(query: string) {
    await delay(100);
    const q = query.toLowerCase();
    return {
      players: mockPlayers.filter((p) => p.name.toLowerCase().includes(q)),
      teams: mockTeams.filter((t) => t.name.toLowerCase().includes(q)),
      matches: mockMatches.filter(
        (m) =>
          m.teamA.name.toLowerCase().includes(q) ||
          m.teamB.name.toLowerCase().includes(q)
      ),
      tournaments: tournaments.filter((t) => t.name.toLowerCase().includes(q)),
    };
  },
};
