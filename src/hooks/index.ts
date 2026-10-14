import { useState, useEffect, useRef, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kkds-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('kkds-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}

export function useCountUp(target: number, duration: number = 1000) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return count;
}

const FAV_KEY = 'kkds-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<{
    players: string[];
    teams: string[];
    matches: string[];
  }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(FAV_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fall through to default
        }
      }
    }
    return { players: [], teams: [], matches: [] };
  });

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const togglePlayer = useCallback((id: string) => {
    setFavorites((prev) => ({
      ...prev,
      players: prev.players.includes(id)
        ? prev.players.filter((p) => p !== id)
        : [...prev.players, id],
    }));
  }, []);

  const toggleTeam = useCallback((id: string) => {
    setFavorites((prev) => ({
      ...prev,
      teams: prev.teams.includes(id)
        ? prev.teams.filter((t) => t !== id)
        : [...prev.teams, id],
    }));
  }, []);

  const toggleMatch = useCallback((id: string) => {
    setFavorites((prev) => ({
      ...prev,
      matches: prev.matches.includes(id)
        ? prev.matches.filter((m) => m !== id)
        : [...prev.matches, id],
    }));
  }, []);

  const isPlayerFavorite = useCallback(
    (id: string) => favorites.players.includes(id),
    [favorites.players]
  );
  const isTeamFavorite = useCallback(
    (id: string) => favorites.teams.includes(id),
    [favorites.teams]
  );
  const isMatchFavorite = useCallback(
    (id: string) => favorites.matches.includes(id),
    [favorites.matches]
  );

  return {
    favorites,
    togglePlayer,
    toggleTeam,
    toggleMatch,
    isPlayerFavorite,
    isTeamFavorite,
    isMatchFavorite,
  };
}
