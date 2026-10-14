import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Heart, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme, useFavorites } from '@/hooks';
import { searchApi } from '@/services/sportsApi';
import type { Player, Team, Match, Tournament } from '@/types';

export function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    players: Player[];
    teams: Team[];
    matches: Match[];
    tournaments: Tournament[];
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const totalFavs =
    favorites.players.length + favorites.teams.length + favorites.matches.length;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length >= 2) {
        searchApi.search(query.trim()).then(setResults);
        setShowResults(true);
      } else {
        setResults(null);
        setShowResults(false);
      }
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = useCallback(
    (path: string) => {
      navigate(path);
      setShowResults(false);
      setQuery('');
      setShowMobileSearch(false);
    },
    [navigate]
  );

  const totalResults = results
    ? results.players.length + results.teams.length + results.matches.length + results.tournaments.length
    : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/50 bg-ink-950/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-ink-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        )}

        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/logo.svg" alt="KKDS Logo" className="w-9 h-9" />
          <div className="hidden sm:block">
            <h1 className="font-display font-extrabold text-sm leading-tight text-white tracking-tight">
              KHEL KHATAM
            </h1>
            <p className="text-[10px] text-cricket-400 font-semibold leading-tight tracking-wider">
              DATA SHURU
            </p>
          </div>
        </Link>

        <div ref={searchRef} className="flex-1 max-w-xl mx-auto relative hidden md:block">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results && setShowResults(true)}
              placeholder="Search players, teams, matches..."
              className="w-full bg-ink-800/60 border border-ink-700/50 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cricket-500/50 focus:bg-ink-800 transition-all"
              aria-label="Global search"
            />
          </div>
          {showResults && results && totalResults > 0 && (
            <div className="absolute top-full mt-2 w-full bg-ink-850 border border-ink-700 rounded-lg shadow-2xl overflow-hidden max-h-96 overflow-y-auto animate-slide-up">
              {results.players.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Players
                  </p>
                  {results.players.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleResultClick(`/player/${p.id}`)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-ink-700/60 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ink-600 to-ink-800 flex items-center justify-center text-xs font-bold text-white">
                        {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.role} · {p.teamName}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {results.teams.length > 0 && (
                <div className="p-2 border-t border-ink-700/50">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Teams
                  </p>
                  {results.teams.slice(0, 4).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleResultClick(`/team/${t.id}`)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-ink-700/60 transition-colors text-left"
                    >
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: t.color + '40', color: t.color }}
                      >
                        {t.shortName}
                      </div>
                      <p className="text-sm text-white font-medium">{t.name}</p>
                    </button>
                  ))}
                </div>
              )}
              {results.matches.length > 0 && (
                <div className="p-2 border-t border-ink-700/50">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Matches
                  </p>
                  {results.matches.slice(0, 4).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleResultClick(`/match/${m.id}`)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-ink-700/60 transition-colors text-left"
                    >
                      <p className="text-sm text-white font-medium">
                        {m.teamA.shortName} vs {m.teamB.shortName}
                      </p>
                      <span className="text-xs text-gray-500 ml-auto">{m.league}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {showResults && results && totalResults === 0 && (
            <div className="absolute top-full mt-2 w-full bg-ink-850 border border-ink-700 rounded-lg shadow-2xl p-6 text-center animate-slide-up">
              <p className="text-sm text-gray-400">No results found for "{query}"</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 ml-auto md:ml-0">
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-ink-800 transition-colors"
            aria-label="Search"
          >
            {showMobileSearch ? <X size={20} /> : <Search size={20} />}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-ink-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-ink-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-red animate-pulse" />
          </button>
          <Link
            to="/favorites"
            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-ink-800 transition-colors"
            aria-label="Favorites"
          >
            <Heart size={20} />
            {totalFavs > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-cricket-500 text-[10px] font-bold text-white flex items-center justify-center">
                {totalFavs}
              </span>
            )}
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cricket-500 to-esports-500 flex items-center justify-center text-xs font-bold text-white shrink-0 cursor-pointer">
            U
          </div>
        </div>
      </div>

      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3 animate-slide-up" ref={searchRef}>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search players, teams, matches..."
              className="w-full bg-ink-800/60 border border-ink-700/50 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cricket-500/50"
              autoFocus
            />
          </div>
          {showResults && results && totalResults > 0 && (
            <div className="mt-2 bg-ink-850 border border-ink-700 rounded-lg shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
              {results.players.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleResultClick(`/player/${p.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-ink-700/60 text-left"
                >
                  <p className="text-sm text-white font-medium">{p.name}</p>
                  <span className="text-xs text-gray-500">{p.teamName}</span>
                </button>
              ))}
              {results.teams.slice(0, 3).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleResultClick(`/team/${t.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-ink-700/60 text-left"
                >
                  <p className="text-sm text-white font-medium">{t.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
