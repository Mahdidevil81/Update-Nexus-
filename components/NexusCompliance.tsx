import React, { useEffect, useRef, useState } from 'react';

interface NexusComplianceProps {
  isOpen: boolean;
  onClose: () => void;
}

const NexusCompliance: React.FC<NexusComplianceProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanLine, setScanLine] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isOpen) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
      ctx.lineWidth = 0.5;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    drawGrid();
  }, [isOpen, visible]);

  if (!isOpen) return null;

  const complianceData = {
    entityName: "NEXUS 369",
    status: "Verified",
    picCode: "865230010",
    portal: "EU Funding & Tenders Portal",
    region: "European Union",
    validUntil: "2027-12-31",
    entityType: "AI Research Entity",
  };

  const stars = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const r = 14;
    return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
  });

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Outer gold shimmer glow */}
        <div
          className="absolute -inset-px rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #d4af37, #8b6914, #d4af37, #f0d060, #8b6914)',
            backgroundSize: '300% 300%',
            animation: 'gold-shimmer 4s ease infinite',
            opacity: 0.9,
          }}
        />

        <style>{`
          @keyframes gold-shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes scan {
            0% { top: 0%; opacity: 0.6; }
            100% { top: 100%; opacity: 0; }
          }
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            92% { opacity: 1; }
            93% { opacity: 0.8; }
            94% { opacity: 1; }
            96% { opacity: 0.9; }
            97% { opacity: 1; }
          }
          @keyframes verified-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4); }
            50% { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
          }
          @keyframes rotate-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes data-reveal {
            from { opacity: 0; transform: translateX(-8px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>

        {/* Card body */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0c0a06 0%, #0f0d08 40%, #080608 100%)',
            border: '1px solid rgba(212,175,55,0.2)',
            animation: 'flicker 8s infinite',
          }}
        >
          {/* Canvas grid background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              top: `${scanLine}%`,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
              transition: 'top 0.03s linear',
            }}
          />

          {/* Top gradient bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, transparent, #d4af37, #f0d060, #d4af37, transparent)' }}
          />

          <div className="relative z-10 p-6">

            {/* Header row */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#d4af37', boxShadow: '0 0 8px #d4af37', animation: 'verified-pulse 2s infinite' }}
                  />
                  <span
                    className="text-[9px] tracking-[0.3em] uppercase font-semibold"
                    style={{ color: '#d4af37' }}
                  >
                    EU Certified Entity
                  </span>
                </div>
                <h2
                  className="text-2xl font-black tracking-widest uppercase"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #f0d060, #a07820)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: 'none',
                    letterSpacing: '0.25em',
                  }}
                >
                  {complianceData.entityName}
                </h2>
                <p className="text-[10px] tracking-widest text-gray-500 uppercase mt-0.5">{complianceData.entityType}</p>
              </div>

              {/* EU Flag emblem */}
              <div className="relative w-14 h-14 shrink-0">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, #003f9b 60%, #00297a 100%)',
                    border: '1.5px solid rgba(212,175,55,0.4)',
                    boxShadow: '0 0 20px rgba(0,63,155,0.5)',
                  }}
                >
                  <svg viewBox="0 0 100 100" width="40" height="40">
                    {stars.map((s, i) => (
                      <polygon
                        key={i}
                        points="0,-5 1.18,-1.62 3.8,-1.62 1.9,0.62 2.35,3.24 0,1.62 -2.35,3.24 -1.9,0.62 -3.8,-1.62 -1.18,-1.62"
                        fill="#FFD700"
                        transform={`translate(${s.x},${s.y})`}
                      />
                    ))}
                  </svg>
                </div>
                {/* Rotating ring */}
                <div
                  className="absolute inset-[-4px] rounded-full"
                  style={{
                    border: '1px dashed rgba(212,175,55,0.3)',
                    animation: 'rotate-slow 12s linear infinite',
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full mb-5"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), rgba(212,175,55,0.1), transparent)' }}
            />

            {/* Status badge */}
            <div className="flex items-center justify-center mb-5">
              <div
                className="flex items-center gap-2.5 px-5 py-2 rounded-full"
                style={{
                  background: 'rgba(52, 211, 153, 0.08)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  animation: 'verified-pulse 2.5s infinite',
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                </svg>
                <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                  {complianceData.status}
                </span>
              </div>
            </div>

            {/* Data fields */}
            <div className="space-y-3">
              {[
                { label: 'PIC Code', value: complianceData.picCode, mono: true, highlight: true },
                { label: 'Portal', value: complianceData.portal, mono: false, highlight: false },
                { label: 'Region', value: complianceData.region, mono: false, highlight: false },
                { label: 'Valid Until', value: complianceData.validUntil, mono: true, highlight: false },
              ].map((field, i) => (
                <div
                  key={field.label}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: field.highlight ? '1px solid rgba(212,175,55,0.2)' : '1px solid rgba(255,255,255,0.05)',
                    animation: `data-reveal 0.4s ease both`,
                    animationDelay: `${i * 80 + 200}ms`,
                  }}
                >
                  <span
                    className="text-[9px] uppercase tracking-widest"
                    style={{ color: 'rgba(212,175,55,0.6)' }}
                  >
                    {field.label}
                  </span>
                  <span
                    className={`text-[11px] ${field.mono ? 'font-mono font-bold' : 'font-medium'}`}
                    style={{
                      color: field.highlight ? '#d4af37' : 'rgba(255,255,255,0.75)',
                      letterSpacing: field.mono ? '0.12em' : '0.05em',
                    }}
                  >
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom divider */}
            <div
              className="h-px w-full mt-5 mb-4"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }}
            />

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: '#d4af37', boxShadow: '0 0 6px #d4af37', animation: 'verified-pulse 1.5s infinite' }}
                />
                <span className="text-[8px] tracking-widest text-gray-600 uppercase">
                  Nexus Neural Authority
                </span>
              </div>
              <a
                href="https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8px] tracking-widest uppercase transition-all hover:opacity-100"
                style={{ color: 'rgba(212,175,55,0.5)' }}
              >
                Verify ↗
              </a>
            </div>
          </div>

          {/* Bottom gradient bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all hover:scale-110 z-20"
          style={{
            background: '#0c0a06',
            border: '1px solid rgba(212,175,55,0.4)',
            color: 'rgba(212,175,55,0.7)',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NexusCompliance;
