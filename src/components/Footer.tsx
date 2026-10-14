import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-ink-700/50 bg-ink-900/50 mt-12">
      <div className="px-4 lg:px-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-2">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
              <div>
                <h3 className="font-display font-extrabold text-sm text-white">KHEL KHATAM, DATA SHURU</h3>
                <p className="text-[11px] text-cricket-400">Where the game ends, the data begins.</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 max-w-xs mt-2">
              An esports-style command center for real-world sports. Track matches, compare players, and understand the numbers.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Links</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><Link to="/" className="hover:text-cricket-400">About</Link></li>
              <li><Link to="/" className="hover:text-cricket-400">Contact</Link></li>
              <li><Link to="/" className="hover:text-cricket-400">Privacy</Link></li>
              <li><Link to="/" className="hover:text-cricket-400">Terms</Link></li>
              <li><Link to="/" className="hover:text-cricket-400">API</Link></li>
              <li><Link to="/" className="hover:text-cricket-400">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Follow</h4>
            <div className="flex items-center gap-2">
              {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-ink-800/60 border border-ink-700/50 flex items-center justify-center text-gray-400 hover:text-cricket-400 hover:border-cricket-500/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-ink-700/40 text-center">
          <p className="text-[11px] text-gray-600">© 2026 Khel Khatam, Data Shuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
