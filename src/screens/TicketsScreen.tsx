import React from 'react';
import BottomNav from '../components/BottomNav';
import { IconMenu, IconRefresh } from '../components/Icons';
import { useAppContext } from '../context/AppContext';
import { ActiveTicketCard, AvailableTicketCard } from '../components/tickets';
import { exportTicketPdf } from '../utils/exportTicketPdf';

interface Props {
  onOpenDetail: (ticketId: string) => void;
  onOpenQR: (ticketId: string) => void;
  onBuyNew: () => void;
}

export default function TicketsScreen({ onOpenDetail, onOpenQR, onBuyNew }: Props) {
  const { unusedTickets, activeTicket, state } = useAppContext();

  const handleExportPdf = (ticketId: string) => {
    const ticket = state.tickets.find(t => t.id === ticketId);
    if (ticket) exportTicketPdf(ticket);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
      {/* Header */}
      <header className="app-header">
        <button className="icon-btn" aria-label="Menu">
          <IconMenu size={19} color="#fff" />
        </button>
        <span className="app-header__title">Tickets Purchased</span>
        <button className="icon-btn" aria-label="Refresh">
          <IconRefresh size={18} color="#fff" />
        </button>
      </header>

      {/* Body */}
      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto', padding: '16px 12px 8px' }}>

        {/* Active ticket section */}
        {activeTicket && (
          <ActiveTicketCard
            ticket={activeTicket}
            onShowQR={() => onOpenQR(activeTicket.id)}
            onShowDetail={() => handleExportPdf(activeTicket.id)}
          />
        )}

        {/* Available tickets section */}
        {unusedTickets.length > 0 && (
          <>
            <p style={styles.sectionLabel}>MY AVAILABLE TICKETS</p>
            {unusedTickets.map(ticket => (
              <AvailableTicketCard
                key={ticket.id}
                ticket={ticket}
                onUse={() => onOpenDetail(ticket.id)}
                onDetail={() => handleExportPdf(ticket.id)}
              />
            ))}
          </>
        )}

        {/* Empty state */}
        {unusedTickets.length === 0 && !activeTicket && (
          <div style={styles.emptyState}>
            <p>No tickets available.</p>
            <p>Purchase a new ticket below.</p>
          </div>
        )}
      </div>

      {/* BUY NEW TICKET */}
      <div style={{ padding: '10px 12px 10px' }}>
        <button className="btn-yellow btn-yellow--pill" onClick={onBuyNew}>
          BUY NEW TICKET
        </button>
      </div>

      <BottomNav active="tickets" onNavigate={() => {}} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sectionLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--blue-dark)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  emptyState: {
    textAlign: 'center',
    padding: '50px 20px',
    color: 'var(--text-light)',
    fontSize: 14,
    lineHeight: 1.6,
  },
};
