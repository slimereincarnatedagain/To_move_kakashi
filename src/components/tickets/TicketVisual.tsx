import React from 'react';
import { Ticket } from '../../types';
import { TICKET_CONFIGS } from './ticketConfig';

interface Props {
  ticket: Ticket;
  size?: 'sm' | 'md';
}

export default function TicketVisual({ ticket, size = 'md' }: Props) {
  const config = TICKET_CONFIGS[ticket.type];
  const w = size === 'sm' ? 72 : 90;
  const h = size === 'sm' ? 48 : 60;

  const containerStyle: React.CSSProperties = {
    width: w,
    height: h,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
    boxShadow: '0 2px 6px rgba(0,0,0,.18)',
  };

  if (config.imageSrc) {
    return (
      <div style={containerStyle}>
        <img
          src={config.imageSrc}
          alt={`${config.label} ticket`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    );
  }

  const s = size === 'sm' ? 0.8 : 1;

  return (
    <div
      style={{
        ...containerStyle,
        background: `linear-gradient(130deg, ${config.colorStart} 0%, ${config.colorEnd} 100%)`,
      }}
    >
      {/* urbano + suburbano */}
      <span
        style={{
          position: 'absolute',
          top: 4,
          left: 5,
          color: 'rgba(255,255,255,.8)',
          fontSize: Math.round(5 * s),
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: '.2px',
          whiteSpace: 'pre',
        }}
      >
        {'urbano+\nsuburbano'}
      </span>

      {/* GTT badge */}
      <span
        style={{
          position: 'absolute',
          top: 4,
          right: 5,
          background: 'rgba(26,46,110,.9)',
          color: '#fff',
          fontSize: Math.round(7 * s),
          fontWeight: 800,
          padding: '1px 4px',
          borderRadius: 3,
          letterSpacing: '.5px',
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        GTT
      </span>

      {/* Transit mode icons */}
      <div
        style={{
          position: 'absolute',
          left: 5,
          bottom: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <MetroIcon scale={s} />
        <TramIcon scale={s} />
        <BusIcon scale={s} />
      </div>

      {/* biglietto + type label */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          lineHeight: 1,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: Math.round(6.5 * s),
            color: 'rgba(255,255,255,.85)',
            fontWeight: 600,
            letterSpacing: '.5px',
          }}
        >
          {config.subtitle}
        </div>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: size === 'sm' ? 18 : 22,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: 1,
            textShadow: '0 1px 3px rgba(0,0,0,.25)',
            lineHeight: 1,
          }}
        >
          {config.label}
        </div>
      </div>

      {/* bp badge */}
      <div
        style={{
          position: 'absolute',
          right: 6,
          bottom: 5,
          width: Math.round(16 * s),
          height: Math.round(16 * s),
          background: 'rgba(26,46,110,.85)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: Math.round(6 * s),
          color: '#fff',
          fontWeight: 700,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: '.3px',
        }}
      >
        {config.badge}
      </div>
    </div>
  );
}

/* ── Inline transit icons ────────────────────────────── */

function MetroIcon({ scale }: { scale: number }) {
  const sz = Math.round(10 * scale);
  return (
    <div
      style={{
        width: sz,
        height: sz,
        background: 'rgba(26,46,110,.85)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(6.5 * scale),
        color: '#fff',
        fontWeight: 800,
        fontFamily: "'Barlow Condensed', sans-serif",
        lineHeight: 1,
      }}
    >
      M
    </div>
  );
}

function TramIcon({ scale }: { scale: number }) {
  const sz = Math.round(10 * scale);
  return (
    <svg width={sz} height={Math.round(9 * scale)} viewBox="0 0 10 9" fill="none">
      <rect x="1" y="0.5" width="8" height="5.5" rx="1.2" stroke="rgba(255,255,255,.8)" strokeWidth="1" />
      <line x1="1" y1="3" x2="9" y2="3" stroke="rgba(255,255,255,.6)" strokeWidth=".7" />
      <line x1="4" y1="0.5" x2="4" y2="0" stroke="rgba(255,255,255,.7)" strokeWidth="1" />
      <line x1="6" y1="0.5" x2="6" y2="0" stroke="rgba(255,255,255,.7)" strokeWidth="1" />
      <circle cx="3" cy="8" r="1" fill="rgba(255,255,255,.8)" />
      <circle cx="7" cy="8" r="1" fill="rgba(255,255,255,.8)" />
    </svg>
  );
}

function BusIcon({ scale }: { scale: number }) {
  const sz = Math.round(10 * scale);
  return (
    <svg width={sz} height={Math.round(9 * scale)} viewBox="0 0 10 9" fill="none">
      <rect x="0.5" y="0.5" width="9" height="6" rx="1.2" stroke="rgba(255,255,255,.8)" strokeWidth="1" />
      <line x1="0.5" y1="3" x2="9.5" y2="3" stroke="rgba(255,255,255,.6)" strokeWidth=".7" />
      <circle cx="2.5" cy="8" r="1" fill="rgba(255,255,255,.8)" />
      <circle cx="7.5" cy="8" r="1" fill="rgba(255,255,255,.8)" />
    </svg>
  );
}
