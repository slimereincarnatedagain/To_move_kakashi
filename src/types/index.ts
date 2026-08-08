export type TicketType = 'city' | 'daily' | 'weekly';

export interface Ticket {
  id: string;
  type: TicketType;
  fareDescription: string;
  ticketType: string;
  duration: string;
  validationStart: string | null;
  lastValidation: string | null;
  validationEnd: string | null;
  remainingRides: number;
  purchaseDate: string;
  expiration: string;
  validated: boolean;
  selfValidatedLine: string | null;
  /** ISO string of when validation ends (for countdown) */
  validationEndTs: number | null;
}

export interface AppState {
  tickets: Ticket[];
  activeScreen: ScreenName;
  selectedTicketId: string | null;
}

export type ScreenName =
  | 'splash'
  | 'tickets'
  | 'ticketDetail'
  | 'qr'
  | 'buy';

export type ModalName =
  | 'selfValConfirm'
  | 'selfValLineSelect'
  | 'selfValDone'
  | null;

export interface BuyOption {
  type: TicketType;
  label: string;
  subtitle: string;
  price: number;
  colorStart: string;
  colorEnd: string;
}
