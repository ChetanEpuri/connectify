const { useState } = React;
const { motion, useMotionValue, useTransform, AnimatePresence } = window.Motion;
const { HeartIcon, UserIcon } = window.Icons;

const PROFILES = [
  {
    id: 1,
    name: "Elena",
    age: 28,
    role: "Astro-Botanist",
    distance: "0.2 Lightyears Away",
    matchScore: 94,
    bio: "Looking for a co-pilot to explore the outer rim. I bring the space-snacks.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    tags: ["Mars Base 4", "Zero-G Yoga", "Sci-Fi"]
  },
  {
    id: 2,
    name: "Marcus",
    age: 32,
    role: "Quantum Engineer",
    distance: "Orbital Station Alpha",
    matchScore: 88,
    bio: "If we match, it's basically quantum entanglement.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    tags: ["Engineering", "Stargazing", "Tech"]
  },
  {
    id: 3,
    name: "Sarah",
    age: 26,
    role: "Orbital Navigator",
    distance: "12,000 km Away",
    matchScore: 97,
    bio: "I know all the best views in the galaxy. Let's go for a spin.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    tags: ["Navigation", "Thrill Seeker"]
  }
];

const SwipeCard = ({ profile, onSwipe, index }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      onSwipe("right");
    } else if (info.offset.x < -100) {
      onSwipe("left");
    }
  };

  const isTop = index === 0;

  return (
    <motion.div
      className="absolute top-0 w-full max-w-sm"
      style={{ x, rotate, opacity, zIndex: 10 - index }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, y: 30 }}
      animate={{ scale: isTop ? 1 : 0.95 - index * 0.05, y: isTop ? 0 : index * 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="liquid-glass rounded-3xl overflow-hidden h-[600px] flex flex-col relative pointer-events-auto shadow-2xl">
        <img src={profile.image} alt={profile.name} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
        
        <div className="relative z-20 mt-auto p-6 flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-heading italic text-5xl text-white tracking-tight leading-none">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-white/80 font-body text-sm mt-1">{profile.role}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="liquid-glass inline-block rounded-full px-3 py-1 text-xs font-medium text-white/90">
              {profile.distance}
            </div>
            <div className="liquid-glass inline-block rounded-full px-3 py-1 text-xs font-medium text-emerald-400">
              {profile.matchScore}% Neural Match
            </div>
          </div>

          <p className="text-white font-body font-light text-sm mt-2">{profile.bio}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {profile.tags.map(tag => (
              <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

window.DiscoverPage = ({ onNavigate }) => {
  const [profiles, setProfiles] = useState(PROFILES);

  const handleSwipe = (direction) => {
    setProfiles((prev) => prev.slice(1));
    // In a real app, send swipe to backend here
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center overflow-hidden">
      {/* Top Bar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between z-50">
        <div 
          className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition"
          onClick={() => onNavigate('landing')}
        >
          <span className="font-heading italic text-xl text-white mt-1">v</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="liquid-glass px-4 py-1.5 rounded-full">
            <span className="font-heading italic text-white text-xl">Discover</span>
          </div>
          <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </div>
        </div>
        <div 
          className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition"
          onClick={() => onNavigate('profile')}
        >
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      </nav>

      {/* Swipe Stack */}
      <div className="flex-1 w-full flex items-center justify-center relative mt-8 mb-24 px-4">
        {profiles.length > 0 ? (
          <div className="relative w-full max-w-sm h-[600px] flex justify-center">
            <AnimatePresence>
              {profiles.map((profile, index) => (
                <SwipeCard key={profile.id} profile={profile} index={index} onSwipe={handleSwipe} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="liquid-glass p-8 rounded-3xl text-center">
            <div className="w-16 h-16 liquid-glass rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-heading italic text-3xl text-white">!</span>
            </div>
            <h2 className="font-heading italic text-3xl text-white mb-2">No more voyagers</h2>
            <p className="text-white/60 font-body text-sm">Expand your search radius to find more matches.</p>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => profiles.length > 0 && handleSwipe('left')}
          className="w-14 h-14 liquid-glass rounded-full flex items-center justify-center text-white/50 hover:text-white transition shadow-lg"
        >
          <span className="font-heading text-2xl font-bold">✕</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('chat')}
          className="liquid-glass-strong px-6 py-3 rounded-full flex items-center gap-2 transition shadow-xl"
        >
          <span className="font-heading italic text-white text-xl pt-1">Messages</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => profiles.length > 0 && handleSwipe('up')}
          className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center text-sky-400 hover:text-sky-300 transition shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-sky-400/10 pointer-events-none" />
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => profiles.length > 0 && handleSwipe('right')}
          className="w-14 h-14 liquid-glass rounded-full flex items-center justify-center text-rose-500 hover:text-rose-400 transition shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-rose-500/10 pointer-events-none" />
          <HeartIcon className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};
