import React from 'react';

const FooterLinks: React.FC = () => {
  return (
    <footer style={{
      width: '100%',
      paddingTop: 16,
      paddingBottom: 8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        © 2026 Nexus Consciousness • Architected by Mahdi Devil
      </p>
    </footer>
  );
};

export default FooterLinks;
