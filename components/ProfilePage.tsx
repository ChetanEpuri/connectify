const { useState } = React;
const { motion } = window.Motion;

window.ProfilePage = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState(true);
  const [incognito, setIncognito] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
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

      <div className="flex-1 w-full max-w-lg px-4 py-6 flex flex-col gap-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-3xl p-6 flex flex-col items-center relative overflow-hidden"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mb-4 z-10">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" alt="My Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-heading italic text-4xl text-white z-10">Commander Alex</h2>
          <p className="text-white/60 font-body text-sm mt-1 z-10">Earth Sector • Online</p>
          
          <button className="mt-6 liquid-glass-strong px-6 py-2 rounded-full text-white font-body text-sm z-10 hover:bg-white/10 transition">
            Edit Dossier
          </button>
        </motion.div>

        {/* Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
            
            <div className="flex items-center justify-between p-4">
              <span className="text-white font-body text-sm">Stealth Mode (Incognito)</span>
              <button 
                className={`w-12 h-6 rounded-full p-1 transition-colors ${incognito ? 'bg-white' : 'bg-white/20'}`}
                onClick={() => setIncognito(!incognito)}
              >
                <div className={`w-4 h-4 rounded-full bg-black transition-transform ${incognito ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="liquid-glass rounded-2xl flex flex-col overflow-hidden mt-4 cursor-pointer hover:bg-white/5 transition">
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
