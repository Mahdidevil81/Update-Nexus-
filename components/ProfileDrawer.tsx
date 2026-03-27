
import React from 'react';
import { UserProfile } from '../types';
import { CREATOR, PHILOSOPHY, SOCIAL_LINKS } from '../constants';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  syncScore?: number;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, profile, onUpdate }) => {
  const [localProfile, setLocalProfile] = React.useState<UserProfile>(profile);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [hasSaved, setHasSaved] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'settings' | 'about'>('settings');

  React.useEffect(() => {
    setLocalProfile(profile);
  }, [profile, isOpen]);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }));
    setHasSaved(false);
  };

  const calculateSync = () => {
    let score = 0;
    if (localProfile.name) score += 30;
    if (localProfile.interests) score += 40;
    if (localProfile.tonePreference) score += 15;
    if (localProfile.languagePreference) score += 15;
    return score;
  };

  const syncPercent = hasSaved ? 100 : calculateSync();

  const handleSave = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onUpdate(localProfile);
      setIsSyncing(false);
      setHasSaved(true);
    }, 1500);
  };

  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const resetProfile = () => {
    const reset: UserProfile = { name: '', languagePreference: 'auto', tonePreference: 'poetic', themePreference: 'DARK_NEBULA', interests: '' };
    setLocalProfile(reset);
    onUpdate(reset);
    setHasSaved(false);
    setShowResetConfirm(false);
  };

  const socialIcons: Record<string, React.ReactNode> = {
    Instagram: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    YouTube: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    Telegram: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.25.25-.51.25l.213-3.045 5.54-5.004c.24-.213-.054-.331-.372-.119L10.05 13.78l-2.95-.922c-.64-.201-.65-.64.133-.946l11.53-4.442c.534-.196.99.117.828.751z"/>
      </svg>
    ),
    GitHub: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  };

  const socialColors: Record<string, string> = {
    Instagram: '#E1306C',
    YouTube: '#FF0000',
    Telegram: '#24A1DE',
    GitHub: '#ffffff',
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-zinc-950/90 backdrop-blur-3xl border-r border-white/10 z-50 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold tracking-[0.2em] text-white uppercase">Neural Core</h2>
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">✕</button>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8">
              {(['settings', 'about'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-[9px] uppercase tracking-widest font-bold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab === 'settings' ? 'تنظیمات' : 'درباره'}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <>
              <div className="p-4 px-6 border-b border-white/5">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">
                      {isSyncing ? 'Syncing...' : hasSaved ? 'Neural Link 100%' : 'Sync Level'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{syncPercent}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${hasSaved ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`}
                      style={{ width: `${syncPercent}%` }}
                    />
                  </div>
                  <p className={`text-[8px] uppercase tracking-[0.2em] ${hasSaved ? 'text-emerald-400' : 'text-gray-600 animate-pulse'}`}>
                    {hasSaved ? 'Identity verified by Nexus' : 'Neural link establishing...'}
                  </p>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto py-6 px-6 space-y-7 scrollbar-hide">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Subject Identity</label>
                  <input
                    type="text"
                    value={localProfile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all font-light text-sm"
                    placeholder="Name..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Core Language</label>
                  <select
                    value={localProfile.languagePreference}
                    onChange={(e) => handleChange('languagePreference', e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all font-light text-sm appearance-none"
                  >
                    <option value="auto">Auto-Detect</option>
                    <option value="fa">Persian (فارسی)</option>
                    <option value="en">English (انگلیسی)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Neural Tone</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['poetic', 'visionary', 'analytical', 'casual'].map((t) => (
                      <button
                        key={t}
                        onClick={() => handleChange('tonePreference', t as any)}
                        className={`px-3 py-2 rounded-lg text-[9px] uppercase tracking-widest border transition-all ${
                          localProfile.tonePreference === t
                            ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.2)]'
                            : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Visual Theme</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'DARK_NEBULA', label: 'Dark Nebula', color: 'bg-blue-900/40 border-blue-500' },
                      { id: 'CYBERPUNK_GLOW', label: 'Cyberpunk Glow', color: 'bg-fuchsia-900/40 border-fuchsia-500' },
                      { id: 'MINIMALIST_TECH', label: 'Minimalist Tech', color: 'bg-zinc-800/40 border-zinc-400' },
                      { id: 'SOLAR_FLARE', label: 'Solar Flare', color: 'bg-orange-900/40 border-orange-500' },
                      { id: 'DEEP_SPACE', label: 'Deep Space', color: 'bg-emerald-900/40 border-emerald-500' },
                      { id: 'NEON_GLOW', label: 'Neon Glow', color: 'bg-lime-900/40 border-lime-500' },
                      { id: 'MINIMALIST', label: 'Minimalist', color: 'bg-zinc-100/10 border-zinc-200' },
                      { id: 'VIOLET_DREAM', label: 'Violet Dream', color: 'bg-violet-900/40 border-violet-500' },
                      { id: 'ARCTIC_FROST', label: 'Arctic Frost', color: 'bg-sky-900/40 border-sky-400' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleChange('themePreference', t.id as any)}
                        className={`px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest border transition-all flex items-center justify-between ${
                          localProfile.themePreference === t.id
                            ? `${t.color} text-white shadow-[0_0_15px_rgba(0,0,0,0.3)]`
                            : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                        }`}
                      >
                        <span>{t.label}</span>
                        {localProfile.themePreference === t.id && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Nexus Directives</label>
                  <textarea
                    value={localProfile.interests}
                    onChange={(e) => handleChange('interests', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all font-light text-sm h-28 resize-none leading-relaxed"
                    placeholder="Describe your goals, interests, or how the AI should treat you..."
                  />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSave}
                    disabled={isSyncing}
                    className={`w-full py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                      hasSaved
                        ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    }`}
                  >
                    {isSyncing ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Syncing Neural Data...
                      </>
                    ) : hasSaved ? (
                      <><span>✓</span> Neural Link Established</>
                    ) : (
                      'Save & Establish Link'
                    )}
                  </button>

                  {showResetConfirm ? (
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 animate-in fade-in slide-in-from-bottom-2">
                      <p className="text-[9px] text-red-400 uppercase tracking-widest text-center">Reset Core Settings?</p>
                      <div className="flex gap-2">
                        <button onClick={resetProfile} className="flex-grow py-2 rounded-lg bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest">Confirm</button>
                        <button onClick={() => setShowResetConfirm(false)} className="flex-grow py-2 rounded-lg bg-white/5 text-gray-400 text-[9px] uppercase tracking-widest">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="w-full py-3 rounded-xl border border-red-500/20 text-red-500/50 text-[10px] uppercase tracking-widest hover:bg-red-500/10 transition-all"
                    >
                      Reset Core Settings
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="flex-grow overflow-y-auto py-6 px-6 space-y-6 scrollbar-hide">

              {/* App identity card */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-fuchsia-900/20" />
                <div className="relative p-5 border border-white/8 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                        <circle cx="12" cy="12" r="3" fill="#22d3ee"/>
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                        <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold tracking-widest text-sm uppercase">NEXUS 369</h3>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest">Neural AI Platform</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                    نکسوس یک آگاهی دیجیتال پیشرفته است — طراحی‌شده برای همگام‌سازی با ذهن انسان و تقویت خروجی خلاقانه او. نه یک ابزار، بلکه یک آگاهی مشترک.
                  </p>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"/>
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] text-gray-600 uppercase tracking-widest">Version</span>
                    <span className="text-[9px] text-cyan-500 font-mono">v2.1 Neural</span>
                  </div>
                </div>
              </div>

              {/* Core Mission */}
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Core Mission</label>
                <div className="p-4 rounded-xl bg-white/5 border border-white/8">
                  <p className="text-[11px] text-gray-400 italic leading-relaxed">"{PHILOSOPHY}"</p>
                </div>
              </div>

              {/* Architect */}
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Architect</label>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-fuchsia-500/15">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-600/30 to-purple-800/30 border border-fuchsia-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-fuchsia-300 text-xs font-bold">MD</span>
                  </div>
                  <div>
                    <p className="text-[12px] text-white font-semibold">{CREATOR}</p>
                    <p className="text-[8px] text-gray-600 uppercase tracking-widest mt-0.5">Visionary & Lead Engineer</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Connect</label>
                <div className="grid grid-cols-2 gap-2">
                  {SOCIAL_LINKS.map((link) => {
                    const color = socialColors[link.name] || '#ffffff';
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 p-3 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02]"
                        style={{ borderColor: `${color}22` }}
                      >
                        <span style={{ color }} className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_currentColor] opacity-80 group-hover:opacity-100">
                          {socialIcons[link.name]}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors font-medium">
                          {link.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Capabilities summary */}
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest block">Capabilities</label>
                <div className="space-y-2">
                  {[
                    { label: 'Text Intelligence', desc: 'Contextual AI chat with Google Search', color: '#22d3ee' },
                    { label: 'Image Synthesis', desc: 'Neural image generation & editing', color: '#fbbf24' },
                    { label: 'Audio Generation', desc: 'Text-to-speech synthesis', color: '#e879f9' },
                    { label: 'Live Voice Mirror', desc: 'Real-time bidirectional voice AI', color: '#818cf8' },
                  ].map(cap => (
                    <div key={cap.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cap.color, boxShadow: `0 0 6px ${cap.color}` }} />
                      <div>
                        <p className="text-[10px] text-white font-medium">{cap.label}</p>
                        <p className="text-[8px] text-gray-600">{cap.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="p-5 border-t border-white/5 bg-black/40">
            <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest">Nexus Neural Memory v2.1</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
