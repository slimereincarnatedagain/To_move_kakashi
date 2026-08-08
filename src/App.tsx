import React, { useState, useCallback } from 'react';
import SplashScreen from './screens/SplashScreen';
import TicketsScreen from './screens/TicketsScreen';
import TicketDetailScreen from './screens/TicketDetailScreen';
import QRScreen from './screens/QRScreen';
import BuyScreen from './screens/BuyScreen';
import { AppProvider, useAppContext } from './context/AppContext';
import './styles/global.css';

type Screen =
  | { name: 'splash' }
  | { name: 'tickets' }
  | { name: 'ticketDetail'; ticketId: string }
  | { name: 'qr'; ticketId: string }
  | { name: 'buy' };

function Navigator() {
  const [screen, setScreen] = useState<Screen>({ name: 'splash' });
  const { dispatch } = useAppContext();

  const goTo = useCallback((s: Screen) => setScreen(s), []);

  const handleSelectTicket = useCallback((ticketId: string) => {
    dispatch({ type: 'SELECT_TICKET', id: ticketId });
    goTo({ name: 'ticketDetail', ticketId });
  }, [dispatch, goTo]);

  const handleOpenQR = useCallback((ticketId: string) => {
    dispatch({ type: 'SELECT_TICKET', id: ticketId });
    goTo({ name: 'qr', ticketId });
  }, [dispatch, goTo]);

  switch (screen.name) {
    case 'splash':
      return (
        <SplashScreen onDone={() => goTo({ name: 'tickets' })} />
      );

    case 'tickets':
      return (
        <TicketsScreen
          onOpenDetail={handleSelectTicket}
          onOpenQR={handleOpenQR}
          onBuyNew={() => goTo({ name: 'buy' })}
        />
      );

    case 'ticketDetail':
      return (
        <TicketDetailScreen
          ticketId={screen.ticketId}
          onClose={() => goTo({ name: 'tickets' })}
          onOpenQR={() => goTo({ name: 'qr', ticketId: screen.ticketId })}
        />
      );

    case 'qr':
      return (
        <QRScreen
          ticketId={screen.ticketId}
          onClose={() => goTo({ name: 'ticketDetail', ticketId: screen.ticketId })}
          onValidated={() => goTo({ name: 'ticketDetail', ticketId: screen.ticketId })}
        />
      );

    case 'buy':
      return (
        <BuyScreen onBack={() => goTo({ name: 'tickets' })} />
      );
  }
}

export default function App() {
  return (
    <AppProvider>
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#6b7280',
      }}>
        <div className="app-root">
          <Navigator />
        </div>
      </div>
    </AppProvider>
  );
}
