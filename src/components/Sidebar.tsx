import { Link, useLocation } from 'react-router-dom';
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

const navItems = [
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
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-ink-700/50 bg-ink-900/50 backdrop-blur-xl">
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-ink-700/60 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-ink-800/60'
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors ${
                  isActive ? 'text-cricket-400' : 'text-gray-500 group-hover:text-gray-300'
                }`}
              />
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cricket-400 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-ink-700/50">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-ink-800/60 transition-all"
        >
          <Settings size={18} className="text-gray-500" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
