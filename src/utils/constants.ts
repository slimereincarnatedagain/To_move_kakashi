import { BuyOption } from '../types';

/** Resolve a public/ asset path against Vite's base (needed for GitHub Pages). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}

export const GTT_LINES = [
  'Line 1C', 'Line 1N', 'Line 1SE', 'Line 1ST', 'Line 1VE', 'Line 1W',
  'Line 2', 'Line 2C', 'Line 2SE',
  'Line 3', 'Line 4', 'Line 4N', 'Line 4S',
  'Line 5', 'Line 6', 'Line 7', 'Line 8', 'Line 9',
  'Line 10', 'Line 11', 'Line 12', 'Line 13', 'Line 14', 'Line 15',
  'Line 16', 'Line 18', 'Line 20', 'Line 22',
  'Metro 1',
];

export const BUY_OPTIONS: BuyOption[] = [
  {
    type: 'city',
    label: 'City',
    subtitle: '100 min · Urban + Suburban GTT · 1 ride in METRO',
    price: 1.70,
    colorStart: '#f5b800',
    colorEnd: '#d48000',
  },
  {
    type: 'daily',
    label: 'Daily Pass',
    subtitle: 'Unlimited rides · Urban only · Valid until midnight',
    price: 4.00,
    colorStart: '#3b82f6',
    colorEnd: '#1a2e6e',
  },
  {
    type: 'weekly',
    label: 'Weekly Pass',
    subtitle: '7 days unlimited · Urban + Suburban + METRO',
    price: 15.00,
    colorStart: '#22c55e',
    colorEnd: '#166534',
  },
];

export const TICKET_DURATION_MS = 100 * 60 * 1000; // 100 minutes

export const COLORS = {
  blueDark:   '#1a2e6e',
  blueMid:    '#1e3a8a',
  blueBtn:    '#243a7a',
  labelBlue:  '#2a4db5',
  yellow:     '#f5c800',
  yellowDark: '#d4a900',
  red:        '#cc1f1f',
  bgPage:     '#eceef3',
  white:      '#ffffff',
  grayRow:    '#f0f1f5',
  textDark:   '#111827',
  textMid:    '#374151',
  textLight:  '#6b7280',
};
