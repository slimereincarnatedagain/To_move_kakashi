import { Ticket, TicketType } from '../types';

/** Format a Date to "DD-MM-YYYY HH:mm" */
export function formatDate(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Parse "DD-MM-YYYY HH:mm" back to a Date */
export function parseDate(str: string): Date {
  const [datePart, timePart] = str.split(' ');
  const [d, m, y] = datePart.split('-').map(Number);
  const [hh, mm] = timePart.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm);
}

/** Generate a unique ticket ID */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Create a fresh unvalidated ticket */
export function createTicket(type: TicketType): Ticket {
  const now = new Date();
  const expiry = new Date(now.getTime() + 365 * 24 * 3600 * 1000);
  const labelMap: Record<TicketType, string> = {
    city: 'City su APP',
    daily: 'Daily Pass su APP',
    weekly: 'Weekly Pass su APP',
  };
  const typeMap: Record<TicketType, string> = {
    city: 'Valido 100 minuti, rete URBANA + SUBURBANA GTT',
    daily: 'Valido 1 giorno, rete URBANA GTT',
    weekly: 'Valido 7 giorni, rete URBANA + SUBURBANA GTT',
  };
  const durationMap: Record<TicketType, string> = {
    city: 'Un viaggio in METRO',
    daily: 'Illimitati in METRO',
    weekly: 'Illimitati in METRO',
  };

  return {
    id: generateId(),
    type,
    fareDescription: labelMap[type],
    ticketType: typeMap[type],
    duration: durationMap[type],
    validationStart: null,
    lastValidation: null,
    validationEnd: null,
    remainingRides: 1,
    purchaseDate: formatDate(now),
    expiration: formatDate(expiry),
    validated: false,
    selfValidatedLine: null,
    validationEndTs: null,
  };
}

/** Apply validation to a ticket, return updated copy */
export function validateTicket(ticket: Ticket, durationMs = 100 * 60 * 1000): Ticket {
  const now = new Date();
  const end = new Date(now.getTime() + durationMs);
  return {
    ...ticket,
    validationStart: formatDate(now),
    lastValidation: formatDate(now),
    validationEnd: formatDate(end),
    remainingRides: 0,
    validated: true,
    validationEndTs: end.getTime(),
  };
}

/** Returns true if a validated ticket is still active */
export function isTicketActive(ticket: Ticket): boolean {
  if (!ticket.validated || !ticket.validationEndTs) return false;
  return ticket.validationEndTs > Date.now();
}

/** Format seconds as "HH:mm" */
export function secondsToHHMM(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}
