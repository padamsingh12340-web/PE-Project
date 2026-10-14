import { useTheme } from '@/hooks';
import { Moon, Sun, Bell, Globe, Database } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { DemoBadge } from '@/components/UI';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-2">
        <h1 className="font-display font-extrabold text-2xl text-white">SETTINGS</h1>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-bold text-white mb-4">Appearance</h3>
        <div className="space-y-3">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-ink-800/60 hover:bg-ink-700/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon size={18} className="text-cricket-400" /> : <Sun size={18} className="text-accent-gold" />}
              <div className="text-left">
                <p className="text-sm font-medium text-white">Theme</p>
                <p className="text-xs text-gray-500">Currently {theme === 'dark' ? 'Dark' : 'Light'} mode</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">Toggle</span>
          </button>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-bold text-white mb-4">Preferences</h3>
        <div className="space-y-3">
          {[
            { icon: Bell, label: 'Notifications', desc: 'Live match alerts', toggle: true },
            { icon: Globe, label: 'Default Sport', desc: 'Cricket', toggle: false },
            { icon: Database, label: 'Data Source', desc: 'Demo Data', toggle: false, badge: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-ink-800/60">
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    {item.label}
                    {item.badge && <DemoBadge />}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
              {item.toggle && (
                <div className="w-10 h-6 rounded-full bg-cricket-500/30 relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-cricket-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-bold text-white mb-2">About</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          KHEL KHATAM, DATA SHURU is an esports-style command center for real-world sports analytics.
          All data shown is demo data for demonstration purposes. The architecture is designed for
          real sports API integration.
        </p>
        <p className="text-[10px] text-gray-600 mt-3">© 2026 Khel Khatam, Data Shuru</p>
      </div>

      <Footer />
    </div>
  );
}
