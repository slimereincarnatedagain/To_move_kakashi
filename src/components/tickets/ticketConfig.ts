import { TicketType } from '../../types';
import { assetUrl } from '../../utils/constants';

export type TransportMode = 'metro' | 'tram' | 'bus';

export interface TicketConfig {
  label: string;
  subtitle: string;
  badge: string;
  duration: string;
  colorStart: string;
  colorEnd: string;
  modes: TransportMode[];
  /** When set, renders the physical ticket artwork instead of the CSS fallback */
  imageSrc?: string;
}

export const TICKET_CONFIGS: Record<TicketType, TicketConfig> = {
  city: {
    label: 'City',
    subtitle: 'biglietto',
    badge: 'bp',
    duration: '100 min',
    colorStart: '#f5b800',
    colorEnd: '#d48000',
    modes: ['metro', 'tram', 'bus'],
    imageSrc: assetUrl('images/Tickets/100-min.png'),
  },
  daily: {
    label: 'Daily',
    subtitle: 'biglietto',
    badge: 'bp',
    duration: '24h',
    colorStart: '#3b82f6',
    colorEnd: '#1d4ed8',
    modes: ['metro', 'tram', 'bus'],
  },
  weekly: {
    label: 'Weekly',
    subtitle: 'abbonamento',
    badge: 'ap',
    duration: '7 giorni',
    colorStart: '#10b981',
    colorEnd: '#059669',
    modes: ['metro', 'tram', 'bus'],
  },
};
