import React, { useEffect, useRef, useState } from 'react';

interface NexusComplianceProps {
  isOpen: boolean;
  onClose: () => void;
}

const euStars = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
  const r = 30;
  return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
});

const NexusCompliance: React.FC<NexusComplianceProps> = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => setVisible(true), 10);
    else setVisible(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => setScanLine(p => (p + 1) % 100), 30);
    return () => clearInterval(id);
  }, [isOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isOpen) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.strokeStyle = 'rgba(212,175,55,0.07)';
    ctx.lineWidth = 0.5;
    const s = 20;
    for (let x = 0; x < canvas.width; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
    for (let y = 0; y < canvas.height; y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
  }, [isOpen, visible]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-start p-4 pb-20"
      style={{ backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <style>{`
        @keyframes gold-shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes compliance-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes eu-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes v-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0.4)} 50%{box-shadow:0 0 0 7px rgba(52,211,153,0)} }
        @keyframes data-in { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
        @keyframes flicker { 0%,100%{opacity:1} 93%{opacity:.85} 94%{opacity:1} }
      `}</style>

      <div
        style={{ animation: 'compliance-up 0.45s cubic-bezier(0.34,1.56,0.64,1) both' }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xs"
      >
        {/* Gold glow border */}
        <div className="absolute -inset-px rounded-2xl" style={{ background: 'linear-gradient(135deg,#d4af37,#8b6914,#d4af37,#f0d060,#8b6914)', backgroundSize: '300% 300%', animation: 'gold-shimmer 4s ease infinite', opacity: 0.85, borderRadius: 16 }} />

        {/* Card */}
        <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg,#0c0a06,#0f0d08)', border: '1px solid rgba(212,175,55,0.15)', animation: 'flicker 8s infinite' }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Scan line */}
          <div className="absolute left-0 right-0 h-px pointer-events-none" style={{ top: `${scanLine}%`, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.35),transparent)' }} />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,#d4af37,#f0d060,#d4af37,transparent)' }} />

          <div className="relative z-10 p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4af37', boxShadow: '0 0 6px #d4af37', animation: 'v-pulse 2s infinite', display: 'inline-block' }} />
                  <span style={{ fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.65)', fontWeight: 600 }}>EU Certified Entity</span>
                </div>
                <h2 style={{ background: 'linear-gradient(135deg,#d4af37,#f0d060,#a07820)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: 20, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: 1 }}>NEXUS 369</h2>
                <p style={{ fontSize: 8, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginTop: 2 }}>AI Research Entity</p>
              </div>

              {/* EU emblem */}
              <div style={{ position: 'relative', width: 46, height: 46, flexShrink: 0 }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'radial-gradient(circle,#003f9b 60%,#00297a 100%)', border: '1.5px solid rgba(212,175,55,0.35)', boxShadow: '0 0 14px rgba(0,63,155,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 100 100" width="28" height="28">
                    {euStars.map((s, i) => <polygon key={i} points="0,-5 1.18,-1.62 3.8,-1.62 1.9,0.62 2.35,3.24 0,1.62 -2.35,3.24 -1.9,0.62 -3.8,-1.62 -1.18,-1.62" fill="#FFD700" transform={`translate(${s.x},${s.y})`} />)}
                  </svg>
                </div>
                <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1px dashed rgba(212,175,55,0.25)', animation: 'eu-spin 14s linear infinite' }} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.35),transparent)', marginBottom: 12 }} />

            {/* Verified badge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 14px', borderRadius: 999, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.28)', animation: 'v-pulse 2.5s infinite' }}>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: '#34d399', textTransform: 'uppercase' }}>Verified</span>
              </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: 'PIC Code', value: '865230010', mono: true },
                { label: 'Portal', value: 'EU Funding & Tenders', mono: false },
                { label: 'Region', value: 'European Union', mono: false },
                { label: 'Valid Until', value: '2027-12-31', mono: true },
              ].map((f, i) => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.04)', animation: `data-in 0.35s ease ${i * 70 + 150}ms both` }}>
                  <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.55)', fontWeight: 600 }}>{f.label}</span>
                  <span style={{ fontSize: f.mono ? 11 : 10, color: f.mono ? '#d4af37' : 'rgba(255,255,255,0.72)', fontFamily: f.mono ? 'monospace' : undefined, fontWeight: f.mono ? 700 : 400, letterSpacing: f.mono ? '0.12em' : '0.04em' }}>{f.value}</span>
                </div>
              ))}
            </div>

            {/* Footer row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(212,175,55,0.07)' }}>
              <span style={{ fontSize: 7, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>Nexus Neural Authority</span>
              <a href="https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register" target="_blank" rel="noopener noreferrer" style={{ fontSize: 7, letterSpacing: '0.15em', color: 'rgba(212,175,55,0.4)', textTransform: 'uppercase', textDecoration: 'none' }}>Verify ↗</a>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.35),transparent)' }} />
        </div>

        {/* Close button */}
        <button onClick={onClose} className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs z-20 transition-all hover:scale-110" style={{ background: '#0c0a06', border: '1px solid rgba(212,175,55,0.4)', color: 'rgba(212,175,55,0.7)' }}>✕</button>
      </div>
    </div>
  );
};

export default NexusCompliance;
