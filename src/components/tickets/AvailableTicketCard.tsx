import React from 'react';
import { Ticket } from '../../types';
import { assetUrl } from '../../utils/constants';
import TicketVisual from './TicketVisual';

interface Props {
  ticket: Ticket;
  onUse: () => void;
  onDetail: () => void;
}

export default function AvailableTicketCard({ ticket, onUse, onDetail }: Props) {
  return (
    <div style={styles.availCard}>
      <TicketVisual ticket={ticket} size="md" />
      <div style={{ flex: 1 }} />
      <button className="btn-use" onClick={onUse}>USE</button>
      <button className="round-icon-btn round-icon-btn--asset" onClick={onDetail} aria-label="Export PDF">
        <img src={assetUrl('images/Export-PDF-Icon.svg')} alt="" style={styles.btnIconExport} />
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  availCard: {
    background: 'var(--white)',
    borderRadius: 14,
    padding: '10px 12px',
    marginBottom: 10,
    boxShadow: '0 2px 6px rgba(0,0,0,.06)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  btnIconExport: {
    width: 46,
    height: 46,
    display: 'block',
    objectFit: 'cover' as const,
    objectPosition: 'right center',
  },
};
