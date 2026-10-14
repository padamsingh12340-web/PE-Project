import { useState } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import {
  LayoutDashboard,
  Radio,
  Trophy,
  Dribbble,
  Gamepad2,
  Users,
  Shield,
  BarChart3,
  Swords,
  Newspaper,
  Heart,
  Settings,
} from 'lucide-react';

const mobileNavItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/live', label: 'Live', icon: Radio },
  { to: '/cricket', label: 'Cricket', icon: Trophy },
  { to: '/football', label: 'Football', icon: Dribbble },
  { to: '/esports', label: 'Esports', icon: Gamepad2 },
  { to: '/players', label: 'Players', icon: Users },
  { to: '/teams', label: 'Teams', icon: Shield },
  { to: '/rankings', label: 'Rankings', icon: BarChart3 },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/matches', label: 'Matches', icon: Swords },
  { to: '/news', label: 'News', icon: Newspaper },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ink-950">
      <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-16 lg:pb-0">
          <div className="px-4 lg:px-6 py-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <BottomNav />

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] animate-fade-in">
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-ink-900 border-r border-ink-700/50 overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-ink-700/50">
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
                <span className="font-display font-extrabold text-sm text-white">KHEL KHATAM</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-ink-800"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="p-3 space-y-0.5">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-ink-700/60 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-ink-800/60'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-cricket-400' : 'text-gray-500'} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
