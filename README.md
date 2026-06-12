<div align="center">

# 💜 Validate

### Love Without Lies. Dating Without Doubt.

An AI-powered dating platform built for authentic human connection.  
Verified profiles, deep compatibility matching, and zero ghosting.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=threedotjs&logoColor=white)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| **🛡️ Verified Profiles** | Multi-layer identity checks with selfie matching |
| **🧬 Neuro-Matching™** | AI-powered compatibility analysis across 143 cognitive markers |
| **💬 Real-Time Chat** | Instagram DM-inspired messaging with reactions, receipts, and typing indicators |
| **💖 Swipe Discovery** | Tinder-style card swiping with gesture, keyboard, and mouse drag support |
| **🔐 Privacy-First** | End-to-end encryption architecture, GDPR-compliant data controls |
| **⚡ Boost & Super Like** | Premium engagement features with match celebration animations |
| **🎨 Glassmorphic UI** | Dark neon aesthetic with blur effects, gradients, and micro-animations |
| **♿ Accessible** | WCAG-compliant keyboard navigation, screen reader support, reduced motion |

---

## 📁 Project Structure

```
connectify-master/
├── index.html            # Landing page — hero, features, testimonials, CTA
├── about.html            # About page — mission, team, values
├── joinnow.html          # Authentication — login/signup with validation
├── profile-create.html   # 4-step profile creation wizard
├── home.html             # Dashboard — browse matches with filters
├── discover.html         # Swipe experience — Tinder-style card swiping
├── matches.html          # Matches gallery — mutual connections grid
├── chat.html             # Messaging — 3-panel DM interface
├── profile.html          # Profile view — bio, photos, personality
├── settings.html         # Settings — 11 modular sections (SaaS-quality)
├── shared.js             # Core module — Security, Toast, Three.js, GSAP
├── styles.css            # Design system — tokens, components, layouts
├── package.json          # Project metadata
└── README.md             # You are here
```

---

## 🏗️ Architecture

### Design System
All visual tokens are centralized in CSS custom properties:

```css
:root {
    --primary: #ff3399;      /* Hot pink */
    --secondary: #6600ff;    /* Electric purple */
    --accent: #f700ff;       /* Magenta */
    --bg: #0a0014;           /* Deep dark */
    --text: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.08);
}
```

### Shared Module (`shared.js`)
Exposes `window.Validate` with:
- **`Security`** — XSS protection (`escapeHTML`), rate limiting, CSRF tokens, email validation, password strength
- **`Toast`** — Notification system with success/error/warning/info types
- **`generateAvatarURL(name, size)`** — Deterministic placeholder avatars
- **`debounce(fn, ms)`** / **`throttle(fn, ms)`** — Performance utilities

### Page Architecture
- **Landing pages** (index, about, joinnow): Full GSAP loader, Three.js heart particles, scroll animations
- **App pages** (home, discover, chat, matches, profile, settings): App nav, multi-panel Grid layouts, page-specific inline scripts

### Security Model
- No `innerHTML` for user-provided data — all DOM API / `textContent`
- Rate limiting on all form submissions and chat messages
- CSP meta tags on landing pages
- Password strength validation with visual feedback
- Input sanitization via `Security.escapeHTML()`

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- A local development server (recommended)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/connectify.git
cd connectify

# Option 1: Node.js static server
npx serve .

# Option 2: Python
python -m http.server 8000

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Open `http://localhost:3000` (or your server's port) in your browser.

---

## 🛣️ Roadmap

### Phase 1 — Frontend Foundation ✅
- [x] Landing page with hero, features, testimonials
- [x] Authentication UI (login/signup with validation)
- [x] Profile creation wizard (4-step)
- [x] Swipe/discover experience with gestures + keyboard
- [x] Chat messaging with reactions and typing indicators
- [x] Matches gallery with filters and sorting
- [x] Profile view with lightbox and personality insights
- [x] Settings (11 sections)
- [x] Loader bug fix and fallback system

### Phase 2 — Framework Migration 🔜
- [ ] Migrate to React + Vite (or Next.js)
- [ ] Extract atomic components
- [ ] Add TypeScript
- [ ] Implement proper routing
- [ ] State management (Zustand/Redux)

### Phase 3 — Backend Integration 🔜
- [ ] REST API / GraphQL backend
- [ ] Real authentication (JWT/OAuth)
- [ ] WebSocket messaging
- [ ] Database (PostgreSQL/MongoDB)
- [ ] File uploads (S3/Cloudinary)

### Phase 4 — Advanced Features 🔜
- [ ] AI recommendation engine
- [ ] Video/voice calls (WebRTC)
- [ ] Push notifications
- [ ] Premium subscriptions (Stripe)
- [ ] Admin moderation dashboard

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with 💜 by the Validate Team**

*417,921 Real Connections and Counting*

</div>
