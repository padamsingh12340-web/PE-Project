import type { Sport } from '@/types';

export const sportConfig: Record<
  Sport,
  { color: string; accent: string; bg: string; text: string; border: string; glow: string; label: string }
> = {
  cricket: {
    color: '#22c55e',
    accent: 'cricket',
    bg: 'bg-cricket-500/10',
    text: 'text-cricket-400',
    border: 'border-cricket-500/30',
    glow: 'glow-cricket',
    label: 'Cricket',
  },
  football: {
    color: '#06b6d4',
    accent: 'football',
    bg: 'bg-football-500/10',
    text: 'text-football-400',
    border: 'border-football-500/30',
    glow: 'glow-football',
    label: 'Football',
  },
  esports: {
    color: '#a855f7',
    accent: 'esports',
    bg: 'bg-esports-500/10',
    text: 'text-esports-400',
    border: 'border-esports-500/30',
    glow: 'glow-esports',
    label: 'Esports',
  },
};

export function getFormLabel(score: number): string {
  if (score >= 90) return 'Elite';
  if (score >= 75) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Average';
  return 'Poor';
}

export function getFormColor(score: number): string {
  if (score >= 90) return 'text-esports-400';
  if (score >= 75) return 'text-cricket-400';
  if (score >= 60) return 'text-football-400';
  if (score >= 40) return 'text-accent-gold';
  return 'text-accent-red';
}

export function getRatingColor(rating: number): string {
  if (rating >= 90) return 'text-esports-400';
  if (rating >= 85) return 'text-cricket-400';
  if (rating >= 80) return 'text-football-400';
  if (rating >= 70) return 'text-accent-gold';
  return 'text-accent-orange';
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function getMovementIcon(movement: 'up' | 'down' | 'same'): string {
  if (movement === 'up') return '↑';
  if (movement === 'down') return '↓';
  return '—';
}

export function getMovementColor(movement: 'up' | 'down' | 'same'): string {
  if (movement === 'up') return 'text-cricket-400';
  if (movement === 'down') return 'text-accent-red';
  return 'text-gray-500';
}

export function getZoneStyle(zone?: string): { bg: string; text: string; label: string } {
  switch (zone) {
    case 'champions':
      return { bg: 'bg-cricket-500/15', text: 'text-cricket-400', label: 'UCL' };
    case 'qualification':
      return { bg: 'bg-football-500/15', text: 'text-football-400', label: 'UCL Q' };
    case 'europa':
      return { bg: 'bg-accent-gold/15', text: 'text-accent-gold', label: 'UEL' };
    case 'relegation':
      return { bg: 'bg-accent-red/15', text: 'text-accent-red', label: 'REL' };
    default:
      return { bg: '', text: '', label: '' };
  }
}
