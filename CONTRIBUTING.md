# Contributing to Validate

Thank you for your interest in contributing to Validate! This guide will help you get started.

---

## 🏗️ Project Architecture

### Tech Stack
- **HTML5** — Semantic markup, accessibility-first
- **CSS3** — Custom properties (design tokens), Grid/Flexbox layouts, glassmorphism
- **Vanilla JavaScript** — ES6+, strict mode, DOM API (no jQuery)
- **GSAP 3.12** — Entrance animations, scroll triggers, page transitions
- **Three.js 0.160** — Heart particle system on landing pages (optional)

### Key Files
| File | Purpose |
|---|---|
| `styles.css` | Global design system — all tokens, components, layouts |
| `shared.js` | Core module — Security, Toast, Three.js engine, GSAP loader |
| `index.html` | Landing page (do NOT modify theme/layout without discussion) |
| `joinnow.html` | Auth page (do NOT modify without security review) |

### Design Tokens
All colors, spacing, and radii are defined as CSS custom properties in `:root`. **Never use hardcoded values** — always reference tokens:

```css
/* ✅ Correct */
background: var(--glass-bg);
border: 1px solid var(--glass-border);
border-radius: var(--radius-lg);

/* ❌ Wrong */
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 1.5rem;
```

---

## 🔒 Security Rules

These rules are **mandatory** for all contributions:

1. **Never use `innerHTML` for user-provided data** — use `textContent` or DOM API
2. **Always sanitize** display content with `Security.escapeHTML()`
3. **Rate limit** all form submissions and repeated actions
4. **No secrets in source** — no API keys, tokens, or passwords
5. **Validate all inputs** — email format, password strength, length limits
6. **Use `textContent`** to set text in dynamically created elements

```javascript
// ✅ Correct
const el = document.createElement('p');
el.textContent = userInput;

// ❌ NEVER do this
element.innerHTML = userInput;
```

---

## 🎨 Design Guidelines

### Visual Identity
- **Primary**: `#ff3399` (hot pink)
- **Secondary**: `#6600ff` (electric purple)
- **Accent**: `#f700ff` (magenta)
- **Background**: `#0a0014` (deep dark)
- **Aesthetic**: Dark glassmorphism with neon accents

### Component Patterns
- **Buttons**: Use `.cta-button` (primary) or `.learn-more-btn` (secondary)
- **Cards**: Use `var(--glass-bg)` background with `var(--glass-border)` border
- **Toggles**: Use the `.toggle-switch` pattern from settings
- **Navigation**: Landing pages use `.navigation`, app pages use `.app-nav`

### Accessibility Requirements
- All interactive elements must have `aria-label` attributes
- Use semantic HTML5 elements (`main`, `nav`, `aside`, `section`)
- Support keyboard navigation (`tabindex`, `keydown` handlers)
- Respect `prefers-reduced-motion` media query
- Maintain WCAG AA contrast ratios

---

## 📝 How to Contribute

### 1. Fork & Clone
```bash
git clone https://github.com/your-username/connectify.git
cd connectify
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes
- Follow the coding standards below
- Test in Chrome, Firefox, and Edge
- Test keyboard navigation
- Verify no console errors

### 4. Commit
Use conventional commit messages:
```
feat: add voice message recording UI
fix: resolve chat scroll position after send
style: update match card hover animation
docs: add API integration notes
refactor: extract toast component logic
```

### 5. Push & PR
```bash
git push origin feature/your-feature-name
```
Open a Pull Request with:
- Clear description of changes
- Screenshots for UI changes
- List of pages affected
- Security implications (if any)

---

## 📐 Coding Standards

### HTML
- Use semantic elements (`section`, `article`, `aside`, `nav`, `main`)
- Add `aria-label` to all buttons and interactive elements
- Use `role` attributes on layout containers
- Include `alt` text on all images

### CSS
- Use CSS custom properties from `:root` — never hardcode values
- Use `rem` units for spacing, `clamp()` for responsive typography
- Mobile breakpoints: `768px` and `1200px`
- Prefix page-specific styles in inline `<style>` blocks
- Keep `styles.css` for shared/global styles only

### JavaScript
- `'use strict'` at the top of all scripts
- Use `const`/`let`, never `var`
- Use DOM API for element creation, never `innerHTML` for user data
- Wrap GSAP calls in `if (typeof gsap !== 'undefined')` checks
- Access shared utilities via `window.Validate` object
- Use `DOMContentLoaded` event for page initialization

---

## 🐛 Reporting Bugs

When reporting bugs, include:
1. **Browser** and version
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if visual)
6. **Console errors** (if any)

---

## 💡 Feature Requests

We welcome feature ideas! Please include:
1. **Problem** you're trying to solve
2. **Proposed solution**
3. **Alternatives** you've considered
4. **Mockups** (if visual)

---

## ⚖️ Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on the code, not the person
- No harassment, discrimination, or personal attacks

Thank you for helping make Validate better! 💜
