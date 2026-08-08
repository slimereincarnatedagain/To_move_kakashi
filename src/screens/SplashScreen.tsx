import React, { useEffect } from 'react';
import { assetUrl } from '../utils/constants';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={styles.container}>
      {/* Logo fills all available space, centred */}
      <div style={styles.logoWrap}>
        <img
          src={assetUrl('images/Gtt-Splash-logo.svg')}
          alt="GTT TOMove"
          style={styles.logoImg}
        />
      </div>

      {/* Bottom section: stripes then Welcome — stays pinned to bottom */}
      <div style={styles.bottomSection}>
        <img
          src={assetUrl('images/Gtt-Splash-logo-footer-style.svg')}
          alt=""
          style={styles.footerImg}
        />
        <p style={styles.welcome}>Welcome</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: '100%',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  logoWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 40px 20px',
  },
  logoImg: {
    width: '75%',
    maxWidth: 280,
    height: 'auto',
  },
  bottomSection: {
    width: '100%',
    flexShrink: 0,
  },
  footerImg: {
    display: 'block',
    width: '70%',
    height: 'auto',
    marginLeft: 'auto',
    transform: 'translateX(8px)'
  },
  welcome: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 32,
    fontWeight: 700,
    color: '#1a4db5',
    letterSpacing: 1,
    textAlign: 'center',
    padding: '20px 0 28px',
    margin: 0,
  },
};
