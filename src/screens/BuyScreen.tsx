import React, { useState } from 'react';
import { IconBack, IconCheck } from '../components/Icons';
import { useAppContext } from '../context/AppContext';
import { BUY_OPTIONS } from '../utils/constants';
import { TicketType, BuyOption } from '../types';

interface Props {
  onBack: () => void;
}

export default function BuyScreen({ onBack }: Props) {
  const { dispatch } = useAppContext();
  const [selectedType, setSelectedType] = useState<TicketType>('city');
  const [qty, setQty] = useState(1);
  const [purchased, setPurchased] = useState(false);

  const selected = BUY_OPTIONS.find(o => o.type === selectedType)!;
  const total = (selected.price * qty).toFixed(2);

  function handleConfirm() {
    dispatch({ type: 'PURCHASE_TICKETS', ticketType: selectedType, qty });
    setPurchased(true);
  }

  if (purchased) {
    return <SuccessScreen qty={qty} name={selected.label} onDone={onBack} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
      {/* Header */}
      <header className="app-header">
        <button className="icon-btn" onClick={onBack} aria-label="Back">
          <IconBack size={19} color="#fff" />
        </button>
        <span className="app-header__title">Buy New Ticket</span>
        <div style={{ width: 44 }} />
      </header>

      {/* Body */}
      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
        <p style={styles.hint}>Select the ticket you want to purchase</p>

        {BUY_OPTIONS.map(option => (
          <BuyOptionCard
            key={option.type}
            option={option}
            selected={selectedType === option.type}
            onSelect={() => setSelectedType(option.type)}
          />
        ))}
      </div>

      {/* Quantity + confirm */}
      <div style={{ padding: '10px 12px 14px' }}>
        <div style={styles.qtyRow}>
          <button style={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
          <span style={styles.qtyDisplay}>{qty}</span>
          <button style={styles.qtyBtn} onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
        </div>
        <button className="btn-yellow btn-yellow--pill" onClick={handleConfirm}>
          CONFIRM PURCHASE · €{total}
        </button>
      </div>
    </div>
  );
}

/* ── Buy Option Card ─────────────────────────────────── */
function BuyOptionCard({ option, selected, onSelect }: {
  option: BuyOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      style={{
        ...styles.optionCard,
        border: selected ? '2px solid var(--label-blue)' : '2px solid transparent',
      }}
      onClick={onSelect}
    >
      {/* Colored thumb */}
      <div style={{
        ...styles.optionThumb,
        background: `linear-gradient(135deg, ${option.colorStart}, ${option.colorEnd})`,
      }}>
        <span style={styles.optionThumbLabel}>{option.label.toUpperCase().split(' ')[0]}</span>
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <p style={styles.optionName}>{option.label}</p>
        <p style={styles.optionDesc}>{option.subtitle}</p>
      </div>

      {/* Price */}
      <p style={styles.optionPrice}>€{option.price.toFixed(2)}</p>
    </div>
  );
}

/* ── Purchase Success ─────────────────────────────────── */
function SuccessScreen({ qty, name, onDone }: { qty: number; name: string; onDone: () => void }) {
  return (
    <div style={styles.successContainer}>
      <div style={styles.successIcon}>
        <IconCheck size={40} color="#fff" />
      </div>
      <h2 style={styles.successTitle}>Purchase Complete!</h2>
      <p style={styles.successSub}>
        {qty} × {name} ticket{qty > 1 ? 's' : ''} added<br />to My Available Tickets.
      </p>
      <button className="btn-yellow btn-yellow--pill" style={{ width: 'auto', padding: '14px 48px' }} onClick={onDone}>
        VIEW TICKETS
      </button>
    </div>
  );
}

/* ── Styles ─────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  hint: {
    fontSize: 13,
    color: 'var(--text-light)',
    marginBottom: 12,
  },
  optionCard: {
    background: '#fff',
    borderRadius: 14,
    padding: '14px 12px',
    marginBottom: 10,
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    cursor: 'pointer',
    transition: 'border-color .15s',
  },
  optionThumb: {
    width: 72,
    height: 48,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optionThumbLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 14,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: .5,
  },
  optionName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 17,
    fontWeight: 800,
    color: 'var(--text-dark)',
    letterSpacing: .5,
  },
  optionDesc: {
    fontSize: 11,
    color: 'var(--text-light)',
    marginTop: 2,
    lineHeight: 1.35,
  },
  optionPrice: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: 'var(--label-blue)',
    flexShrink: 0,
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 12,
    background: '#fff',
    borderRadius: 14,
    padding: '12px',
    boxShadow: 'var(--shadow-card)',
  },
  qtyBtn: {
    width: 42,
    height: 42,
    background: 'var(--blue-dark)',
    color: '#fff',
    borderRadius: '50%',
    fontSize: 24,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    lineHeight: 1,
  },
  qtyDisplay: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 30,
    fontWeight: 800,
    color: 'var(--text-dark)',
    width: 40,
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 32,
    background: '#fff',
    height: '100%',
  },
  successIcon: {
    width: 84,
    height: 84,
    background: '#22c55e',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'scaleIn .3s ease',
  },
  successTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 30,
    fontWeight: 800,
    color: 'var(--text-dark)',
    textAlign: 'center',
  },
  successSub: {
    fontSize: 15,
    color: 'var(--text-light)',
    textAlign: 'center',
    lineHeight: 1.5,
  },
};
