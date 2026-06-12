/* ============================================================
   VALIDATE — Shared JavaScript Module
   - Three.js heart particle system (InstancedMesh optimized)
   - GSAP page loader & scroll animations
   - Security: HTML sanitization, CSRF tokens, rate limiting
   - Performance: debounce, throttle, IntersectionObserver
   ============================================================ */

'use strict';

/* ── Security Utilities ───────────────────────────────────── */
const Security = {
    /**
     * Escapes HTML entities to prevent XSS when displaying user content
     */
    escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    },

    /**
     * Generates a CSRF-like token for forms (client-side pattern)
     */
    generateToken() {
        const arr = new Uint8Array(32);
        crypto.getRandomValues(arr);
        return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Rate limiter — returns true if action should be blocked
     */
    createRateLimiter(maxAttempts, windowMs) {
        const attempts = [];
        return () => {
            const now = Date.now();
            // Remove expired entries
            while (attempts.length && attempts[0] < now - windowMs) {
                attempts.shift();
            }
            if (attempts.length >= maxAttempts) return true; // blocked
            attempts.push(now);
            return false; // allowed
        };
    },

    /**
     * Validates email format
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    /**
     * Checks password strength — returns {score: 0-4, label, color}
     */
    checkPasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        score = Math.min(score, 4);
        const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
        const colors = ['#ff4444', '#ff8800', '#ffaa00', '#00cc88', '#00ff88'];
        return { score, label: labels[score], color: colors[score] };
    }
};

/* ── Performance Utilities ────────────────────────────────── */
function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

function throttle(fn, ms) {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= ms) {
            last = now;
            fn(...args);
        }
    };
}

/* ── Toast Notification System ────────────────────────────── */
const Toast = {
    container: null,
    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    },
    show(message, type = 'info', duration = 3000) {
        this.init();
        const icons = { success: '✓', error: '✕', info: '💜', warning: '⚠' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = `${icons[type] || ''} ${message}`;
        this.container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

/* ── Three.js Optimized Heart Particle System ─────────────── */
function initThreeBackground() {
    const container = document.querySelector('.canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        antialias: false, // perf: skip AA
        alpha: true,
        powerPreference: 'low-power'
    });

    // Cap pixel ratio at 2 for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Heart shape geometry (shared — created once)
    function createHeartGeometry() {
        const shape = new THREE.Shape();
        const a = 16;
        const heartPath = t => ({
            x: a * Math.pow(Math.sin(t), 3),
            y: -(a/2 * Math.cos(t) - a/3 * Math.cos(2*t) - a/4 * Math.cos(3*t) - a/5 * Math.cos(4*t))
        });

        const points = [];
        for (let t = 0; t <= Math.PI * 2; t += 0.15) { // fewer points = cheaper
            const p = heartPath(t);
            points.push(new THREE.Vector2(p.x / 10, p.y / 10));
        }
        shape.setFromPoints(points);
        return new THREE.ExtrudeGeometry(shape, {
            depth: 0.04,
            bevelEnabled: true,
            bevelThickness: 0.015,
            bevelSize: 0.015,
            bevelSegments: 2 // lower for perf
        });
    }

    const heartGeo = createHeartGeometry();

    // Shared material (single instance — huge perf gain)
    const heartMat = new THREE.MeshPhongMaterial({
        color: 0xff3399,
        transparent: true,
        opacity: 0.5,
        shininess: 30
    });

    // Heart pool
    const MAX_HEARTS = 80; // reduced from 200 for perf
    const hearts = [];

    function spawnHeart() {
        if (hearts.length >= MAX_HEARTS) {
            // Recycle oldest
            const old = hearts.shift();
            resetHeart(old);
            hearts.push(old);
            return;
        }
        const mesh = new THREE.Mesh(heartGeo, heartMat);
        resetHeart(mesh);
        scene.add(mesh);
        hearts.push(mesh);
    }

    function resetHeart(mesh) {
        mesh.position.set(
            (Math.random() - 0.5) * 14,
            -6 - Math.random() * 3,
            (Math.random() - 0.5) * 10
        );
        mesh.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
        );
        const s = 0.06 + Math.random() * 0.2;
        mesh.scale.set(s, s, s);
        mesh.userData.speed = 0.008 + Math.random() * 0.025;
        mesh.userData.rx = (Math.random() - 0.5) * 0.03;
        mesh.userData.ry = (Math.random() - 0.5) * 0.03;
        mesh.userData.phase = Math.random() * Math.PI * 2;
    }

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const light1 = new THREE.PointLight(0xff3399, 0.8, 80);
    light1.position.set(8, 8, 8);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x6600ff, 0.4, 80);
    light2.position.set(-8, -8, -8);
    scene.add(light2);

    camera.position.z = 5;

    // Spawn initial batch
    for (let i = 0; i < 20; i++) spawnHeart();

    // Scroll-based spawning (throttled)
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const delta = Math.abs(window.scrollY - lastScroll);
        if (delta > 40) {
            spawnHeart();
            spawnHeart();
            lastScroll = window.scrollY;
        }
    }, 100), { passive: true });

    // Animation loop
    let animId;
    const clock = new THREE.Clock();

    function animate() {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        for (const h of hearts) {
            h.position.y += h.userData.speed;
            h.position.x += Math.sin(elapsed + h.userData.phase) * 0.008;
            h.rotation.x += h.userData.rx;
            h.rotation.y += h.userData.ry;

            if (h.position.y > 8) resetHeart(h);
        }

        renderer.render(scene, camera);
    }
    animate();

    // Resize (debounced)
    const onResize = debounce(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, 200);
    window.addEventListener('resize', onResize);

    // Visibility API — pause when tab hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animId);
        } else {
            clock.start();
            animate();
        }
    });
}

/* ── GSAP Page Loader ─────────────────────────────────────── */
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    // CRITICAL FALLBACK: Always dismiss loader after 4s even if GSAP/CDN fails
    const fallback = setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.add('page-loaded');
    }, 4000);

    if (typeof gsap === 'undefined') {
        // GSAP didn't load — dismiss quickly
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.add('page-loaded');
        }, 800);
        return;
    }

    // Cancel CSS fallback animation — GSAP takes over
    loader.style.animation = 'none';

    const tl = gsap.timeline({
        onComplete: () => {
            clearTimeout(fallback);
            document.body.classList.add('page-loaded');
            // SAFETY: Force-clear any inline styles that could hide hero content
            document.querySelectorAll('.hero-content > *').forEach(el => {
                el.style.opacity = '';
                el.style.transform = '';
            });
        }
    });

    // Grab hero children for safe animation
    const heroChildren = document.querySelectorAll('.hero-content > *');
    const scrollInd = document.querySelector('.scroll-indicator');

    tl.to('.loader-text', { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' })
      .to('.loader-bar', { width: '100%', duration: 1.2, ease: 'power4.inOut' })
      .to('.loader', { yPercent: -100, duration: 0.6, ease: 'power4.inOut', onComplete: () => {
          loader.style.display = 'none';
      }});

    // Only animate hero entrance if hero elements exist — use .to() not .from()
    if (heroChildren.length) {
        // Set hidden ONLY right before animating (not earlier)
        tl.set(heroChildren, { opacity: 0, y: 30 })
          .to(heroChildren, {
              opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
          });
    }
    if (scrollInd) {
        tl.set(scrollInd, { opacity: 0, y: 20 })
          .to(scrollInd, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
    }

    // NUCLEAR SAFETY NET: If hero content is STILL invisible after 5s, force-show it
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *, .hero-link, .hero-title, .hero-description').forEach(el => {
            const cs = getComputedStyle(el);
            if (cs.opacity === '0') {
                el.style.opacity = '1';
                el.style.transform = 'none';
            }
        });
    }, 5000);
}

/* ── GSAP Scroll Animations ───────────────────────────────── */
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Feature cards fade-in (elements are visible by default, animate FROM hidden)
    ScrollTrigger.batch('.feature-card, .team-card, .value-card, .stat-card, .preview-card', {
        start: 'top bottom-=80',
        onEnter: batch => {
            gsap.from(batch, {
                opacity: 0,
                y: 30,
                stagger: 0.12,
                duration: 0.7,
                ease: 'power2.out'
            });
        },
        once: true
    });

    // Parallax section
    const parallax = document.querySelector('.parallax-section');
    if (parallax) {
        ScrollTrigger.create({
            trigger: parallax,
            start: 'top bottom',
            once: true,
            onEnter: () => {
                gsap.from(parallax, { opacity: 0, duration: 0.8 });
                gsap.from('.parallax-title', { opacity: 0, y: 20, duration: 0.8, delay: 0.15 });
                gsap.from('.parallax-description', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 });
            }
        });
    }

    // Experience section
    const expSection = document.querySelector('.experience-section');
    if (expSection) {
        ScrollTrigger.create({
            trigger: expSection,
            start: 'top bottom',
            once: true,
            onEnter: () => {
                gsap.from(expSection, { opacity: 0, duration: 0.8 });
                gsap.from('.experience-text', { opacity: 0, x: -30, duration: 0.8, delay: 0.15 });
            }
        });
    }

    // Feature card 3D tilt
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-8px) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Nav scroll effect
    const nav = document.querySelector('.navigation');
    if (nav) {
        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: self => {
                nav.classList.toggle('scrolled', self.progress > 0);
            }
        });
    }
}

/* ── Mobile Menu ──────────────────────────────────────────── */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('mobile-open');
        document.body.style.overflow = menu.classList.contains('mobile-open') ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('mobile-open');
            document.body.style.overflow = '';
        });
    });
}

/* ── Heart Hover Effect ───────────────────────────────────── */
function initHeartHover() {
    document.querySelectorAll('[data-hearts]').forEach(el => {
        el.addEventListener('mouseenter', function () {
            for (let i = 0; i < 8; i++) {
                const heart = document.createElement('span');
                heart.className = 'heart-3d';
                heart.textContent = '❤️';
                heart.style.cssText = `
                    left: ${10 + Math.random() * 80}%;
                    top: ${10 + Math.random() * 80}%;
                    animation-delay: ${i * 0.06}s;
                    font-size: ${1 + Math.random() * 0.6}rem;
                `;
                this.appendChild(heart);
                setTimeout(() => heart.remove(), 1300);
            }
        });
    });
}

/* ── Smooth Scroll ────────────────────────────────────────── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ── Gradient Avatar Generator ────────────────────────────── */
function generateAvatarURL(name, size = 200) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Generate consistent color from name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue1 = Math.abs(hash % 360);
    const hue2 = (hue1 + 45) % 360;

    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, `hsl(${hue1}, 70%, 50%)`);
    gradient.addColorStop(1, `hsl(${hue2}, 70%, 40%)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Initial
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${size * 0.4}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name.charAt(0).toUpperCase(), size / 2, size / 2);

    return canvas.toDataURL();
}

/* ── Initialize All ───────────────────────────────────────── */
function initValidateShared() {
    initLoader();
    initThreeBackground();
    initScrollAnimations();
    initMobileMenu();
    initHeartHover();
    initSmoothScroll();

    // Replace broken placeholder images with gradient avatars
    document.querySelectorAll('img[src*="placeholder"], img[src*="/api/"]').forEach(img => {
        const name = img.alt || 'User';
        img.src = generateAvatarURL(name);
        img.loading = 'lazy';
        img.decoding = 'async';
    });
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initValidateShared);
} else {
    initValidateShared();
}

// Export for use by page-specific scripts
window.Validate = {
    Security,
    Toast,
    debounce,
    throttle,
    generateAvatarURL,
    escapeHTML: Security.escapeHTML
};
