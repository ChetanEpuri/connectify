var { useState } = React;
var { motion } = window.Motion;

window.LoginPage = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    // Simulate network request for authentication
    setTimeout(() => {
      onLogin({
        name: "Commander Alex",
        email: email,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        role: "Earth Sector",
        id: 'user_123'
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-body selection:bg-white/20 selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <window.FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
          className="w-full h-full object-cover opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 50% 50%, transparent 0%, #000 100%)'}} />
      </div>

      {/* Top Nav */}
      <nav className="relative z-10 w-full px-8 py-6 flex justify-between items-center">
        <div 
          className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition"
          onClick={() => onNavigate('landing')}
        >
          <span className="font-heading italic text-xl text-white mt-1">←</span>
        </div>
        <div className="text-white/60 text-xs tracking-[0.2em] uppercase">Secure Uplink</div>
        <div className="w-10 h-10"></div>
      </nav>

      {/* Login Form Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="liquid-glass-strong rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Subtle glow behind form */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <h1 className="font-heading italic text-5xl text-white mb-2 tracking-tight">Initialize.</h1>
              <p className="text-white/70 font-body text-sm font-light mb-8 leading-relaxed">
                Connect your neural passkey to access the elite interstellar matchmaking network.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white/50 uppercase tracking-[0.15em] ml-1">Galactic ID / Email</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-body text-sm outline-none focus:bg-white/10 focus:border-white/30 transition-all disabled:opacity-50"
                    placeholder="commander@earth-sector.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white/50 uppercase tracking-[0.15em] ml-1">Neural Passkey</label>
                  <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-body text-sm outline-none focus:bg-white/10 focus:border-white/30 transition-all disabled:opacity-50"
                    placeholder="••••••••••••"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black rounded-2xl py-4 font-body font-medium text-sm mt-4 hover:bg-white/90 transition-colors disabled:bg-white/50 relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </motion.div>
                  ) : (
                    <span>Establish Connection</span>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs font-body">
                <span className="text-white/40">Don't have clearance?</span>
                <button className="text-white hover:text-sky-400 transition-colors underline underline-offset-4 decoration-white/20">
                  Request Access
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
