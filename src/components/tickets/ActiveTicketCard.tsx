import React from 'react';
import { Ticket } from '../../types';
import { assetUrl } from '../../utils/constants';
import TicketVisual from './TicketVisual';

interface Props {
  ticket: Ticket;
  onShowQR: () => void;
  onShowDetail: () => void;
}

export default function ActiveTicketCard({ ticket, onShowQR, onShowDetail }: Props) {
  const expireTime = ticket.validationEndTs ? new Date(ticket.validationEndTs) : null;
  const hh = expireTime ? expireTime.getHours().toString().padStart(2, '0') : '--';
  const mm = expireTime ? expireTime.getMinutes().toString().padStart(2, '0') : '--';

  return (
    <div style={styles.activeCard}>
      <div style={styles.activeRow}>
        <TicketVisual ticket={ticket} size="md" />
        <div style={{ flex: 1 }}>
          <p style={styles.expireTime}>will expire at {hh}:{mm}</p>
          <p style={styles.expireSub}>beep at the validator or turnstile</p>
        </div>
        <div style={styles.actionBtns}>
          <button className="round-icon-btn round-icon-btn--asset" onClick={onShowQR} aria-label="Show ticket">
            <img src={assetUrl('images/Ticket-Active-Icon.svg')} alt="" style={styles.btnIcon} />
          </button>
          <button className="round-icon-btn round-icon-btn--asset" onClick={onShowDetail} aria-label="Export PDF">
            <img src={assetUrl('images/Export-PDF-Icon.svg')} alt="" style={styles.btnIconExport} />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  activeCard: {
    background: 'var(--white)',
    borderRadius: 14,
    padding: '10px 12px 12px',
    marginBottom: 16,
    boxShadow: 'var(--shadow-card)',
    borderLeft: '4px solid var(--yellow)',
  },
  activeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  expireTime: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: 'var(--blue-dark)',
  },
  expireSub: {
    fontSize: 11,
    color: 'var(--text-light)',
    marginTop: 2,
  },
  actionBtns: {
    display: 'flex',
    gap: 8,
  },
  btnIcon: {
    width: 46,
    height: 46,
    display: 'block',
  },
  btnIconExport: {
    width: 46,
    height: 46,
    display: 'block',
    objectFit: 'cover' as const,
    objectPosition: 'right center',
  },
};
