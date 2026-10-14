import { Link, useLocation } from 'react-router-dom';
import { Home, Radio, BarChart3, Trophy, User } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/live', label: 'Live', icon: Radio },
  { to: '/matches', label: 'Matches', icon: Trophy },
  { to: '/rankings', label: 'Stats', icon: BarChart3 },
  { to: '/favorites', label: 'Profile', icon: User },
];

export function BottomNav() {
  const location = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink-950/90 backdrop-blur-xl border-t border-ink-700/50">
      <div className="flex items-center justify-around h-14 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive ? 'text-cricket-400' : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
