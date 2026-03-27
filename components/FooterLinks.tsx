
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const euStars = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
  const r = 30;
  return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
});

const FooterLinks: React.FC = () => {
  return (
    <>
      <style>{`
        .nexus-footer {
          position: relative;
          width: 100%;
          padding: 40px 0 24px;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.9), transparent);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          z-index: 10;
          margin-top: 50px;
          font-family: 'Inter', sans-serif;
        }

        .nexus-social-links {
          display: flex;
          gap: 30px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nexus-social-item {
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .nexus-social-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .nexus-social-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, currentColor, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .nexus-social-item:hover .nexus-social-icon {
          transform: translateY(-5px) scale(1.1);
          border-color: currentColor;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5), 
                      0 0 15px currentColor;
        }

        .nexus-social-item:hover .nexus-social-icon::before {
          opacity: 0.2;
        }

        .nexus-social-name {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
        }

        .nexus-social-item:hover .nexus-social-name {
          color: white;
          letter-spacing: 3px;
        }

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
          max-width: 480px;
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

        .compliance-field {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.04);
        }

        .compliance-field-label {
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.55);
          font-weight: 600;
        }

        .compliance-field-value {
          font-size: 11px;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.05em;
        }

        .compliance-field-value.mono {
          font-family: monospace;
          font-weight: 700;
          color: #d4af37;
          letter-spacing: 0.12em;
        }
      `}</style>

      <footer className="nexus-footer">

        {/* ─── EU Compliance Card ─── */}
        <div className="compliance-card p-5 w-full max-w-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: '#d4af37', boxShadow: '0 0 6px #d4af37' }}
                />
                <span className="compliance-field-label" style={{ color: 'rgba(212,175,55,0.7)' }}>
                  EU Certified Entity
                </span>
              </div>
              <h3
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #f0d060, #a07820)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '18px',
                  fontWeight: 900,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                NEXUS 369
              </h3>
              <p style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: '2px' }}>
                AI Research Entity
              </p>
            </div>

            {/* EU Flag emblem */}
            <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'radial-gradient(circle, #003f9b 60%, #00297a 100%)',
                border: '1.5px solid rgba(212,175,55,0.35)',
                boxShadow: '0 0 14px rgba(0,63,155,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 100 100" width="32" height="32">
                  {euStars.map((s, i) => (
                    <polygon
                      key={i}
                      points="0,-5 1.18,-1.62 3.8,-1.62 1.9,0.62 2.35,3.24 0,1.62 -2.35,3.24 -1.9,0.62 -3.8,-1.62 -1.18,-1.62"
                      fill="#FFD700"
                      transform={`translate(${s.x},${s.y})`}
                    />
                  ))}
                </svg>
              </div>
              <div style={{
                position: 'absolute', inset: -4, borderRadius: '50%',
                border: '1px dashed rgba(212,175,55,0.25)',
                animation: 'eu-rotate 14s linear infinite',
              }} />
            </div>
          </div>

          {/* Verified badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 16px', borderRadius: 999,
              background: 'rgba(52,211,153,0.07)',
              border: '1px solid rgba(52,211,153,0.28)',
              animation: 'verified-glow 2.5s infinite',
            }}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#34d399', textTransform: 'uppercase' }}>
                Verified
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)', marginBottom: 12 }} />

          {/* Data fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="compliance-field">
              <span className="compliance-field-label">PIC Code</span>
              <span className="compliance-field-value mono">865230010</span>
            </div>
            <div className="compliance-field">
              <span className="compliance-field-label">Portal</span>
              <span className="compliance-field-value" style={{ fontSize: 10 }}>EU Funding & Tenders Portal</span>
            </div>
            <div className="compliance-field">
              <span className="compliance-field-label">Region</span>
              <span className="compliance-field-value">European Union</span>
            </div>
          </div>

          {/* Footer row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(212,175,55,0.08)' }}>
            <span style={{ fontSize: 8, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
              Nexus Neural Authority
            </span>
            <a
              href="https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 8, letterSpacing: '0.15em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Verify ↗
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, width: '100%', maxWidth: 480, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        {/* Social links */}
        <div className="nexus-social-links">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`nexus-social-item ${link.color}`}
            >
              <div className="nexus-social-icon" dangerouslySetInnerHTML={{ __html: link.icon }} />
              <span className="nexus-social-name">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="nexus-copyright" style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          © 2026 Nexus Consciousness • Architected by Mahdi Devil
        </div>
      </footer>
    </>
  );
};

export default FooterLinks;
