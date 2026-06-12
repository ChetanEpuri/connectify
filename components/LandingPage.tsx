const { motion } = window.Motion;
const { ArrowUpRight, Play, ClockIcon, GlobeIcon, MaterialIconImage, MaterialIconMovie, MaterialIconLightbulb } = window.Icons;
const { FadingVideo, BlurText } = window;

const Navbar = ({ onNavigate }) => (
  <nav className="fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between pointer-events-auto">
    <div 
      className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors"
      onClick={() => onNavigate('landing')}
    >
      <span className="font-heading italic text-2xl text-white mt-1">v</span>
    </div>
    
    <div className="hidden desktop:flex liquid-glass px-1.5 py-1.5 items-center gap-1 rounded-full pointer-events-auto">
      {['Voyages', 'Discover', 'Chat', 'Profile'].map(link => (
        <button 
          key={link} 
          onClick={() => onNavigate(link.toLowerCase())}
          className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:bg-white/10 rounded-full transition-colors"
        >
          {link}
        </button>
      ))}
      <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium font-body flex items-center gap-1 ml-2 hover:bg-white/90 transition-colors whitespace-nowrap">
        Claim a Spot <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>

    <div className="w-12 h-12"></div> {/* Spacer for balance */}
  </nav>
);

const HeroSection = ({ onNavigate }) => (
  <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col pointer-events-none">
    <FadingVideo
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
      className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
      style={{ width: "120%", height: "120%" }}
    />
    
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 px-4">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="liquid-glass rounded-full flex items-center gap-3 p-1 pl-1 pr-4 mb-6 pointer-events-auto cursor-pointer"
      >
        <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold">New</span>
        <span className="text-sm text-white/90 font-body">Maiden Crewed Voyage to Mars Arrives 2026</span>
      </motion.div>

      <BlurText
        text="Venture Past Our Sky Across the Universe"
        className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl text-center tracking-[-4px]"
      />

      <motion.p
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="mt-4 text-sm md:text-base text-white text-center max-w-2xl font-body font-light leading-tight"
      >
        Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach—secure and extraordinary.
      </motion.p>

      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
        className="flex items-center gap-6 mt-6 pointer-events-auto"
      >
        <button 
          onClick={() => onNavigate('discover')}
          className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-colors"
        >
          Start Your Voyage <ArrowUpRight />
        </button>
        <button 
          onClick={() => onNavigate('discover')}
          className="flex items-center gap-2 text-sm text-white/90 font-medium font-body hover:text-white transition-colors group"
        >
          View Liftoff <Play className="text-white/70 group-hover:text-white transition-colors" />
        </button>
      </motion.div>

      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
        className="flex items-stretch gap-4 mt-8 pointer-events-auto"
      >
        <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer">
          <ClockIcon className="text-white mb-6" />
          <div>
            <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">34.5 Min</div>
            <div className="text-xs text-white font-body font-light mt-2">Average Videos Watch Time</div>
          </div>
        </div>
        <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer">
          <GlobeIcon className="text-white mb-6" />
          <div>
            <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">2.8B+</div>
            <div className="text-xs text-white font-body font-light mt-2">Users Across the Globe</div>
          </div>
        </div>
      </motion.div>
    </div>

    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center gap-4 pb-8 pointer-events-auto"
    >
      <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
        Collaborating with top aerospace pioneers globally
      </div>
      <div className="flex items-center justify-center flex-wrap gap-12 md:gap-16 font-heading italic text-white text-2xl md:text-3xl tracking-tight opacity-90">
        <span>Aeon</span>
        <span>Vela</span>
        <span>Apex</span>
        <span>Orbit</span>
        <span>Zeno</span>
      </div>
    </motion.div>
  </section>
);

const CapabilitiesSection = () => (
  <section className="relative w-full min-h-screen bg-black flex flex-col">
    <FadingVideo
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
    
    <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col flex-1 min-h-screen">
      <div className="mb-auto">
        <div className="text-sm font-body text-white/80 mb-6 uppercase tracking-widest">// Capabilities</div>
        <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
          Production<br />evolved
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {/* Card 1 */}
        <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 liquid-glass rounded-[0.75rem] flex items-center justify-center shrink-0">
              <MaterialIconImage className="text-white" />
            </div>
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
              {['Natural Context', 'Photo Realism', 'Infinite Settings', 'Eco-Vibe'].map(tag => (
                <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="mt-6">
            <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">AI Scenery</h3>
            <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
              AI analyzes your product to create indistinguishable natural environments — from Icelandic cliffs to misty forests.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 liquid-glass rounded-[0.75rem] flex items-center justify-center shrink-0">
              <MaterialIconMovie className="text-white" />
            </div>
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
              {['Scale Fast', 'Visual Consistency', 'Time Saver', 'Ready to Post'].map(tag => (
                <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="mt-6">
            <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">Batch Production</h3>
            <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
              Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 liquid-glass rounded-[0.75rem] flex items-center justify-center shrink-0">
              <MaterialIconLightbulb className="text-white" />
            </div>
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
              {['Ray Tracing', 'Physical Shadows', 'Studio Quality', 'Sunlight Sync'].map(tag => (
                <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="mt-6">
            <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">Smart Lighting</h3>
            <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
              Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

window.LandingPage = ({ onNavigate }) => {
  return (
    <div className="font-body selection:bg-white/20 selection:text-white">
      <Navbar onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />
      <CapabilitiesSection />
    </div>
  );
};
