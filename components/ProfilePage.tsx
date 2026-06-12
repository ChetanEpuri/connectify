var { useState } = React;
var { motion } = window.Motion;

window.ProfilePage = ({ onNavigate, currentUser, onLogout }) => {
  const [notifications, setNotifications] = useState(true);
  const [incognito, setIncognito] = useState(false);

  // Fallback to avoid crashes if accessed without login state somehow
  const user = currentUser || {
    name: "Unknown Voyager",
    email: "unknown@sector.com",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    role: "Unverified Sector"
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center selection:bg-white/20 selection:text-white">
      {/* Top Bar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between z-50">
        <div 
          className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition"
          onClick={() => onNavigate('discover')}
        >
          <span className="font-heading italic text-xl text-white mt-1">←</span>
        </div>
        <div className="liquid-glass px-4 py-1.5 rounded-full">
          <span className="font-heading italic text-white text-xl">Command Center</span>
        </div>
        <div className="w-10 h-10"></div>
      </nav>

      <div className="flex-1 w-full max-w-lg px-4 py-6 flex flex-col gap-8 pb-24">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-3xl p-6 flex flex-col items-center relative overflow-hidden"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mb-4 z-10 relative shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-sky-500/20 pointer-events-none mix-blend-overlay"></div>
          </div>
          <div className="flex items-center gap-2 z-10">
            <h2 className="font-heading italic text-4xl text-white">{user.name}</h2>
            {/* Biometric Verified Badge */}
            <div className="text-sky-400 group relative cursor-help">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-sky-500 text-white text-[10px] text-center py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Biometric Verified
              </div>
            </div>
          </div>
          <p className="text-white/60 font-body text-sm mt-1 z-10">{user.role} • Online</p>
          <p className="text-white/40 font-body text-xs mt-1 z-10">{user.email}</p>
          
          <button className="mt-6 liquid-glass-strong px-6 py-2 rounded-full text-white font-body text-sm z-10 hover:bg-white/10 transition">
            Edit Dossier
          </button>
        </motion.div>

        {/* Analytics Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="liquid-glass rounded-2xl p-4 flex flex-col">
            <span className="text-white/50 font-body text-xs uppercase tracking-widest">Signal Reaches</span>
            <span className="font-heading italic text-3xl text-white mt-1">12,408</span>
            <div className="mt-4 flex items-end gap-1 h-8 opacity-50">
              <div className="w-full bg-white/20 rounded-t h-[40%]"></div>
              <div className="w-full bg-white/40 rounded-t h-[70%]"></div>
              <div className="w-full bg-white/80 rounded-t h-[90%]"></div>
              <div className="w-full bg-rose-400 rounded-t h-[100%]"></div>
            </div>
          </div>
          <div className="liquid-glass rounded-2xl p-4 flex flex-col">
            <span className="text-white/50 font-body text-xs uppercase tracking-widest">Neural Match Rate</span>
            <span className="font-heading italic text-3xl text-rose-400 mt-1">84%</span>
            <div className="mt-4 h-8 flex items-center">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-rose-400 w-[84%] rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h3 className="font-body text-white/50 text-xs uppercase tracking-widest px-2">System Preferences</h3>
          
          <div className="liquid-glass rounded-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <span className="text-white font-body text-sm">Incoming Transmissions (Notifications)</span>
              <button 
                className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-white' : 'bg-white/20'}`}
                onClick={() => setNotifications(!notifications)}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <span className="text-white font-body text-sm">Stealth Mode (Incognito)</span>
              <button 
                className={`w-12 h-6 rounded-full p-1 transition-colors ${incognito ? 'bg-white' : 'bg-white/20'}`}
                onClick={() => setIncognito(!incognito)}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${incognito ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <span className="text-white font-body text-sm">Haptic Feedback</span>
              <button className="w-12 h-6 rounded-full p-1 transition-colors bg-white">
                <div className="w-4 h-4 rounded-full bg-black transition-transform translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex flex-col">
                <span className="text-white font-body text-sm">Neural Sync Level</span>
                <span className="text-white/40 text-[10px] font-body mt-0.5">Adjust AI co-pilot strength</span>
              </div>
              <span className="text-sky-400 font-body text-xs border border-sky-400/30 px-2 py-1 rounded bg-sky-400/10">Maximum</span>
            </div>
          </div>

          <div 
            onClick={onLogout}
            className="liquid-glass rounded-2xl flex flex-col overflow-hidden mt-4 cursor-pointer hover:bg-white/5 transition"
          >
            <div className="flex items-center justify-between p-4 text-rose-500 font-body text-sm">
              <span>Abort Mission (Logout)</span>
              <span>→</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
