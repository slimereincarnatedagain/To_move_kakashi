import React, { useState, useCallback } from 'react';
import Modal from '../components/Modal';
import { IconClose, IconChevronDown } from '../components/Icons';
import { useAppContext } from '../context/AppContext';
import { useCountdown } from '../hooks/useCountdown';
import { GTT_LINES } from '../utils/constants';

interface Props {
  ticketId: string;
  onClose: () => void;
  onOpenQR: () => void;
}

type ModalState = 'none' | 'confirm' | 'lineSelect' | 'linePicker' | 'done';

export default function TicketDetailScreen({ ticketId, onClose, onOpenQR }: Props) {
  const { state, dispatch } = useAppContext();
  const ticket = state.tickets.find(t => t.id === ticketId);

  const [modalState, setModalState] = useState<ModalState>('none');
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);

  const svCountdown = useCountdown({
    seconds: 20,
    onComplete: () => {
      setShowProgress(false);
      dispatch({ type: 'SELF_VALIDATE_TICKET', id: ticketId, line: selectedLine! });
      setModalState('done');
    },
  });

  const handleSelfValidate = useCallback(() => {
    setSelectedLine(null);
    setModalState('confirm');
  }, []);

  const handleConfirmYes = useCallback(() => {
    setModalState('lineSelect');
  }, []);

  const handleValidateLine = useCallback(() => {
    if (!selectedLine) return;
    setModalState('none');
    setShowProgress(true);
    svCountdown.reset();
    svCountdown.start();
  }, [selectedLine, svCountdown]);

  const handleDoneOK = useCallback(() => {
    setModalState('none');
  }, []);

  if (!ticket) return null;

  const isValidated = ticket.validated;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)', position: 'relative' }}>

      {/* Header */}
      <div style={styles.detailHeader}>
        <button
          style={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <IconClose size={17} color="#374151" />
        </button>
        <span style={styles.headerTitle}>SELECTED TICKET</span>
        <div style={{ width: 48 }} />
      </div>

      {/* Ticket name */}
      <h1 style={styles.ticketName}>CITY</h1>

      {/* Detail rows */}
      <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
        <DetailRow label="FARE DESCRIPTION"  value={ticket.fareDescription} />
        <DetailRow label="TYPE"              value={ticket.ticketType} />
        <DetailRow label="DURATION"          value={ticket.duration} />
        <DetailRow label="VALIDATION START"  value={ticket.validationStart  ?? 'Ticket not yet validated'} />
        <DetailRow label="LAST VALIDATION"   value={ticket.lastValidation   ?? 'Ticket not yet validated'} />
        <DetailRow label="VALIDATION END"    value={ticket.validationEnd    ?? 'Ticket not yet validated'} />
        {ticket.selfValidatedLine && (
          <DetailRow label="LINE" value={ticket.selfValidatedLine} />
        )}
        <DetailRow label="REMAINING RIDES"  value={String(ticket.remainingRides)} />
        <DetailRow label="PURCHASE DATE"    value={ticket.purchaseDate} />
        <DetailRow label="EXPIRATION"       value={ticket.expiration} />
      </div>

      {/* Action buttons */}
      <div style={styles.actionBtns}>
        <button
          className="btn-yellow"
          style={{ borderRadius: 14 }}
          onClick={isValidated ? undefined : onOpenQR}
          disabled={isValidated}
        >
          {isValidated ? 'VALIDATED ✓' : 'VALIDATE'}
        </button>
        <button
          className="btn-gray"
          style={{ borderRadius: 14 }}
          onClick={isValidated ? undefined : handleSelfValidate}
          disabled={isValidated}
        >
          SELF-VALIDATION
        </button>
      </div>

      {/* Self-validation progress overlay */}
      {showProgress && (
        <SelfValProgress
          remaining={svCountdown.remaining}
          progress={svCountdown.progress}
        />
      )}

      {/* Modal: Confirm self-validation */}
      {modalState === 'confirm' && (
        <Modal
          title="Self-validation"
          onBackdropClick={() => setModalState('none')}
          footer={
            <>
              <button className="btn-yellow" style={{ borderRadius: 14 }} onClick={handleConfirmYes}>YES</button>
              <button className="btn-gray" style={{ borderRadius: 14 }} onClick={() => setModalState('none')}>CANCEL</button>
            </>
          }
        >
          <p>Validate your ticket yourself as soon as you board.</p>
          <p>Do you want to proceed with validation?</p>
        </Modal>
      )}

      {/* Modal: Line selector */}
      {modalState === 'lineSelect' && (
        <Modal
          title="Self-validation"
          onBackdropClick={() => setModalState('none')}
          footer={
            <>
              <button
                className="btn-yellow"
                style={{ borderRadius: 14 }}
                onClick={handleValidateLine}
                disabled={!selectedLine}
              >
                VALIDATE
              </button>
              <button className="btn-gray" style={{ borderRadius: 14 }} onClick={() => setModalState('none')}>CANCEL</button>
            </>
          }
        >
          <p style={{ marginBottom: 12 }}>
            Select the urban line where you want to validate the ticket
          </p>
          <button
            style={styles.lineDropdown}
            onClick={() => setModalState('linePicker')}
          >
            <span style={styles.lineDropdownText}>{selectedLine ?? 'LINE'}</span>
            <IconChevronDown size={16} color="#6b7280" />
          </button>
        </Modal>
      )}

      {/* Sheet: Line picker */}
      {modalState === 'linePicker' && (
        <div className="sheet-overlay" onClick={() => setModalState('lineSelect')}>
          <div className="sheet-list" onClick={e => e.stopPropagation()}>
            {GTT_LINES.map(line => (
              <div
                key={line}
                className={`sheet-item${selectedLine === line ? ' sheet-item--selected' : ''}`}
                onClick={() => {
                  setSelectedLine(line);
                  setModalState('lineSelect');
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Done */}
      {modalState === 'done' && (
        <Modal
          title="Self-validation"
          footer={
            <button className="btn-yellow" style={{ borderRadius: 14 }} onClick={handleDoneOK}>OK</button>
          }
        >
          <p style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-dark)', padding: '8px 0' }}>
            Self-validation completed
          </p>
        </Modal>
      )}
    </div>
  );
}

/* ── Self-validation progress overlay ─────────────────── */
function SelfValProgress({ remaining, progress }: { remaining: number; progress: number }) {
  return (
    <div style={styles.progressOverlay}>
      <p style={styles.progressText}>
        Self-validation verification in progress …<br />
        <strong>Do not turn off the screen during<br />self-validation to avoid canceling it</strong>
      </p>
      <p style={styles.progressCountdown}>-{remaining} seconds</p>
      <div className="progress-wrap" style={{ width: '100%' }}>
        <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

/* ── Detail row ─────────────────────────────────────────── */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-row">
      <span className="detail-row__label">{label}</span>
      <span className="detail-row__value">{value}</span>
    </div>
  );
}

/* ── Styles ─────────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  detailHeader: {
    padding: '10px 12px 6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    background: 'var(--bg-page)',
    flexShrink: 0,
  },
  closeBtn: {
    width: 48,
    height: 48,
    background: 'rgba(0,0,0,.08)',
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--label-blue)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
  ticketName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 36,
    fontWeight: 800,
    color: 'var(--text-dark)',
    padding: '4px 16px 8px',
    flexShrink: 0,
  },
  actionBtns: {
    padding: '10px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flexShrink: 0,
  },
  lineDropdown: {
    width: '100%',
    border: '1.5px solid #d1d5db',
    borderRadius: 12,
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
    cursor: 'pointer',
    marginBottom: 4,
  },
  lineDropdownText: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--label-blue)',
    letterSpacing: 1,
  },
  progressOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(255,255,255,.9)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: '32px 28px',
  },
  progressText: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 17,
    fontWeight: 700,
    color: 'var(--text-dark)',
    textAlign: 'center',
    lineHeight: 1.45,
  },
  progressCountdown: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 56,
    fontWeight: 800,
    color: 'var(--label-blue)',
    lineHeight: 1,
  },
};
