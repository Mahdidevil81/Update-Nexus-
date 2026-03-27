
import React from 'react';

const euStars = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
  const r = 30;
  return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
});

const FooterLinks: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes gold-border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes eu-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes verified-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.35); }
          50% { box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
        }
        .compliance-card {
          position: relative;
          width: 100%;
          max-width: 360px;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(145deg, #0c0a06 0%, #0e0b07 100%);
        }
        .compliance-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, #d4af37, #6b4f0a, #d4af37, #f0d060, #7a5a10);
          background-size: 300% 300%;
          animation: gold-border-flow 5s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <footer style={{
        position: 'relative',
        width: '100%',
        paddingTop: 32,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        marginTop: 40,
      }}>

        {/* EU Compliance Card */}
        <div className="compliance-card p-5 w-full max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#d4af37', boxShadow: '0 0 6px #d4af37' }} />
                <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', fontWeight: 600 }}>EU Certified Entity</span>
              </div>
              <h3 style={{
                background: 'linear-gradient(135deg, #d4af37, #f0d060, #a07820)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                fontSize: 18, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: 1,
              }}>NEXUS 369</h3>
              <p style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: 2 }}>AI Research Entity</p>
            </div>

            <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'radial-gradient(circle, #003f9b 60%, #00297a 100%)',
                border: '1.5px solid rgba(212,175,55,0.35)',
                boxShadow: '0 0 14px rgba(0,63,155,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 100 100" width="28" height="28">
                  {euStars.map((s, i) => (
                    <polygon key={i} points="0,-5 1.18,-1.62 3.8,-1.62 1.9,0.62 2.35,3.24 0,1.62 -2.35,3.24 -1.9,0.62 -3.8,-1.62 -1.18,-1.62" fill="#FFD700" transform={`translate(${s.x},${s.y})`} />
                  ))}
                </svg>
              </div>
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1px dashed rgba(212,175,55,0.25)', animation: 'eu-rotate 14s linear infinite' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 999, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.28)', animation: 'verified-glow 2.5s infinite' }}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
              </svg>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: '#34d399', textTransform: 'uppercase' }}>Verified</span>
            </div>
          </div>

          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)', marginBottom: 10 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { label: 'PIC Code', value: '865230010', mono: true },
              { label: 'Portal', value: 'EU Funding & Tenders Portal', mono: false },
              { label: 'Region', value: 'European Union', mono: false },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.55)', fontWeight: 600 }}>{f.label}</span>
                <span style={{ fontSize: f.mono ? 11 : 10, color: f.mono ? '#d4af37' : 'rgba(255,255,255,0.7)', fontFamily: f.mono ? 'monospace' : undefined, fontWeight: f.mono ? 700 : 400, letterSpacing: f.mono ? '0.12em' : '0.04em' }}>{f.value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(212,175,55,0.08)' }}>
            <span style={{ fontSize: 8, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Nexus Neural Authority</span>
            <a href="https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register" target="_blank" rel="noopener noreferrer" style={{ fontSize: 8, letterSpacing: '0.15em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', textDecoration: 'none' }}>Verify ↗</a>
          </div>
        </div>

        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          © 2026 Nexus Consciousness • Architected by Mahdi Devil
        </p>
      </footer>
    </>
  );
};

export default FooterLinks;
