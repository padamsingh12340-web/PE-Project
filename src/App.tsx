import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { DashboardPage } from '@/pages/DashboardPage';
import { LivePage } from '@/pages/LivePage';
import { CricketPage } from '@/pages/CricketPage';
import { FootballPage } from '@/pages/FootballPage';
import { EsportsPage } from '@/pages/EsportsPage';
import { PlayersPage } from '@/pages/PlayersPage';
import { TeamsPage } from '@/pages/TeamsPage';
import { MatchDetailPage } from '@/pages/MatchDetailPage';
import { PlayerProfilePage } from '@/pages/PlayerProfilePage';
import { TeamProfilePage } from '@/pages/TeamProfilePage';
import { ComparePage } from '@/pages/ComparePage';
import { RankingsPage } from '@/pages/RankingsPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { MatchesPage } from '@/pages/MatchesPage';
import { NewsPage } from '@/pages/NewsPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/cricket" element={<CricketPage />} />
          <Route path="/football" element={<FootballPage />} />
          <Route path="/esports" element={<EsportsPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/match/:id" element={<MatchDetailPage />} />
          <Route path="/player/:id" element={<PlayerProfilePage />} />
          <Route path="/team/:id" element={<TeamProfilePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
