import React, { useEffect, useRef } from 'react';
import { IconClose } from '../components/Icons';
import { useCountdown } from '../hooks/useCountdown';
import { useAppContext } from '../context/AppContext';

interface Props {
  ticketId: string;
  onClose: () => void;
  onValidated: () => void;
}

export default function QRScreen({ ticketId, onClose, onValidated }: Props) {
  const { dispatch } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const countdown = useCountdown({
    seconds: 20,
    autoStart: true,
    onComplete: () => {
      dispatch({ type: 'VALIDATE_TICKET', id: ticketId });
      onValidated();
    },
  });

  /* Draw a decorative QR-like pattern */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 200;
    const CELLS = 25;
    const CELL = SIZE / CELLS;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Generate seeded pseudo-random data pattern
    let seed = 9876543;
    const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const grid: boolean[][] = Array.from({ length: CELLS }, () =>
      Array.from({ length: CELLS }, () => rand() > 0.48)
    );

    ctx.fillStyle = '#000';
    for (let r = 0; r < CELLS; r++) {
      for (let c = 0; c < CELLS; c++) {
        if (grid[r][c]) {
          ctx.fillRect(c * CELL + 0.5, r * CELL + 0.5, CELL - 1, CELL - 1);
        }
      }
    }

    // Finder patterns (3 corners)
    drawFinder(ctx, 0, 0, CELL);
    drawFinder(ctx, CELLS - 7, 0, CELL);
    drawFinder(ctx, 0, CELLS - 7, CELL);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
      <div style={styles.header}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          <IconClose size={17} color="#374151" />
        </button>
      </div>

      {/* Main body */}
      <div style={styles.body}>
        <h2 style={styles.title}>City su APP</h2>

        {/* QR code */}
        <div style={styles.qrBox}>
          <canvas ref={canvasRef} width={200} height={200} style={{ display: 'block', borderRadius: 4 }} />
        </div>

        <p style={styles.validityLabel}>QR code validity</p>
        <p style={styles.countdown}>-{countdown.remaining} seconds</p>

        {/* Progress bar */}
        <div className="progress-wrap" style={{ width: '100%' }}>
          <div className="progress-fill" style={{ width: `${countdown.progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

function drawFinder(ctx: CanvasRenderingContext2D, col: number, row: number, cell: number) {
  ctx.fillStyle = '#000';
  ctx.fillRect(col * cell, row * cell, cell * 7, cell * 7);
  ctx.fillStyle = '#fff';
  ctx.fillRect((col + 1) * cell, (row + 1) * cell, cell * 5, cell * 5);
  ctx.fillStyle = '#000';
  ctx.fillRect((col + 2) * cell, (row + 2) * cell, cell * 3, cell * 3);
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    padding: '10px 12px 6px',
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
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: '20px 28px',
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--text-dark)',
    letterSpacing: .5,
  },
  qrBox: {
    background: '#fff',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,.12)',
  },
  validityLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text-dark)',
    letterSpacing: .5,
  },
  countdown: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 52,
    fontWeight: 800,
    color: 'var(--label-blue)',
    lineHeight: 1,
  },
};
