import React from 'react';
import { IconTickets, IconQR, IconBus } from './Icons';

interface Props {
  active: 'tickets' | 'read' | 'bus';
  onNavigate: (tab: 'tickets' | 'read' | 'bus') => void;
}

export default function BottomNav({ active, onNavigate }: Props) {
  const items: { key: 'tickets' | 'read' | 'bus'; label: string; Icon: typeof IconTickets }[] = [
    { key: 'tickets', label: 'Tickets',       Icon: IconTickets },
    { key: 'read',    label: 'Read tickets',   Icon: IconQR      },
    { key: 'bus',     label: 'Bus arrivals',   Icon: IconBus     },
  ];

  return (
    <nav className="bottom-nav">
      {items.map(({ key, label, Icon }) => (
        <div
          key={key}
          className={`nav-item${active === key ? ' nav-item--active' : ''}`}
          onClick={() => onNavigate(key)}
        >
          <Icon
            size={22}
            color={active === key ? 'var(--yellow)' : 'rgba(255,255,255,.45)'}
            className="nav-item__icon"
          />
          <span className="nav-item__label">{label}</span>
        </div>
      ))}
    </nav>
  );
}
