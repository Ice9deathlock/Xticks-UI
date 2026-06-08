# Hyperticks UI

Static, multi-page rebuild of the Hyperticks trading platform UI. Plain HTML, CSS,
and vanilla JS — no build step. Open any page directly in a browser, or serve the
folder with any static server.

## Architecture

- **`styles.css`** — single design system for the logged-in app: tokens, the app
  shell (sidebar + topbar), and shared components (cards, tables, segmented tabs,
  fields), followed by per-page sections.
- **`app.js`** — injects the shared sidebar and topbar into every app page (so the
  chrome lives in one place) and wires shared behaviours: segmented toggles,
  `data-go` navigation, `data-copy` buttons, expandable history tables, and a
  shared `showStatus` helper. Each page sets `<body data-page="...">` to flag the
  active nav item; pages can define `window.pageInit` for page-specific logic.

## Pages

### App (uses `styles.css` + `app.js`)
| File | Screen |
|------|--------|
| `index.html` | Dashboard — account cards, activity chart, trading stats, history |
| `marketplace.html` | Challenge detail — Evaluation vs Funded comparison |
| `checkout.html` | Checkout — challenge config, order summary, billing form |
| `complete-order.html` | Order review + payment options |
| `wallet.html` | My Wallet — profits / CFFP, tabbed wallet history |
| `affiliate.html` | Affiliate — earnings, promo code, affiliate history |
| `profile.html` | Profile Settings — KYC, personal info, password update |

### Public
| File | Screen |
|------|--------|
| `landing.html` | Marketing landing page (standalone, uses `landing.css`) |

## Flow

`landing.html` → Get Started → `marketplace.html` → Start Challenge →
`checkout.html` → Checkout → `complete-order.html`. The app sidebar links the
logged-in screens together.
