import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Ticket, TicketType } from '../types';
import { createTicket, validateTicket } from '../utils/ticketUtils';
import { generateId } from '../utils/ticketUtils';

// ─── State ───────────────────────────────────────────────
interface State {
  tickets: Ticket[];
  selectedTicketId: string | null;
}

const initialTickets: Ticket[] = [
  {
    id: generateId(),
    type: 'city',
    fareDescription: 'City su APP',
    ticketType: 'Valido 100 minuti, rete URBANA + SUBURBANA GTT',
    duration: 'Un viaggio in METRO',
    validationStart: null,
    lastValidation: null,
    validationEnd: null,
    remainingRides: 1,
    purchaseDate: '16-04-2026 18:35',
    expiration: '16-04-2027 18:35',
    validated: false,
    selfValidatedLine: null,
    validationEndTs: null,
  },
  {
    id: generateId(),
    type: 'city',
    fareDescription: 'City su APP',
    ticketType: 'Valido 100 minuti, rete URBANA + SUBURBANA GTT',
    duration: 'Un viaggio in METRO',
    validationStart: null,
    lastValidation: null,
    validationEnd: null,
    remainingRides: 1,
    purchaseDate: '16-04-2026 18:35',
    expiration: '16-04-2027 18:35',
    validated: false,
    selfValidatedLine: null,
    validationEndTs: null,
  },
];

const initialState: State = {
  tickets: initialTickets,
  selectedTicketId: null,
};

// ─── Actions ─────────────────────────────────────────────
type Action =
  | { type: 'SELECT_TICKET'; id: string }
  | { type: 'VALIDATE_TICKET'; id: string }
  | { type: 'SELF_VALIDATE_TICKET'; id: string; line: string }
  | { type: 'PURCHASE_TICKETS'; ticketType: TicketType; qty: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SELECT_TICKET':
      return { ...state, selectedTicketId: action.id };

    case 'VALIDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(t =>
          t.id === action.id ? validateTicket(t) : t
        ),
      };

    case 'SELF_VALIDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(t =>
          t.id === action.id
            ? { ...validateTicket(t), selfValidatedLine: action.line }
            : t
        ),
      };

    case 'PURCHASE_TICKETS': {
      const newTickets: Ticket[] = Array.from(
        { length: action.qty },
        () => createTicket(action.ticketType)
      );
      return { ...state, tickets: [...state.tickets, ...newTickets] };
    }

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────
interface ContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
  selectedTicket: Ticket | null;
  activeTicket: Ticket | null;
  unusedTickets: Ticket[];
}

const AppContext = createContext<ContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectedTicket =
    state.tickets.find(t => t.id === state.selectedTicketId) ?? null;

  const activeTicket =
    state.tickets.find(
      t => t.validated && t.validationEndTs != null && t.validationEndTs > Date.now()
    ) ?? null;

  const unusedTickets = state.tickets.filter(t => !t.validated);

  return (
    <AppContext.Provider value={{ state, dispatch, selectedTicket, activeTicket, unusedTickets }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): ContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
