const { useEffect, useRef } = React;
const { motion, useInView } = window.Motion;

window.FadingVideo = ({ src, className, style }: { src: string, className?: string, style?: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const FADE_MS = 500;
  const FADE_OUT_LEAD = 0.55;

  const fadeTo = (targetOpacity: number, duration: number) => {
    if (!videoRef.current) return;
    const el = videoRef.current;
    
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    const startOpacity = parseFloat(el.style.opacity || '0');
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      el.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleLoadedData = () => {
      el.style.opacity = '0';
      el.play();
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (fadingOutRef.current || !el.duration) return;
      const timeLeft = el.duration - el.currentTime;
      if (timeLeft <= FADE_OUT_LEAD && timeLeft > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.currentTime = 0;
        el.play();
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    el.addEventListener('loadeddata', handleLoadedData);
    el.addEventListener('timeupdate', handleTimeUpdate);
    el.addEventListener('ended', handleEnded);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      el.removeEventListener('loadeddata', handleLoadedData);
      el.removeEventListener('timeupdate', handleTimeUpdate);
      el.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
};

window.BlurText = ({ text, className }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? {
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0]
          } : {}}
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: (i * 100) / 1000
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};
