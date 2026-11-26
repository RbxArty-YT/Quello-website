# Quello UI Component Samples

This folder contains standalone examples extracted as reusable patterns for the Quello website.

## Preview

Open `ui-components.html` from the website root after copying the files into the same directory structure.

## Components

| Component | Files |
|---|---|
| Shared drawer foundation | `components/drawer-core.js`, `components/drawers.css` |
| Vertical / bottom-sheet drawer | `components/vertical-drawer.js`, `components/vertical-drawer.css` |
| Right-side drawer | `components/side-drawer.js`, `components/side-drawer.css` |
| Theme switcher | `components/theme-switcher.js`, `components/theme-switcher.css` |
| Language selection sheet | `components/language-switcher.js`, `components/language-switcher.css` |
| Back buttons | `components/back-buttons.css` |
| Admin Panel visual sample | `components/admin-panel.js`, `components/admin-panel.css` |

## Notes

- Uses Quello's existing `style.css`, `theme.css`, `brand-gradient.css` and `quello-ui-system.css` design tokens.
- Language choices match the website's current EN / RU / DE / FR / IT set.
- The theme switcher uses the existing `quello-theme` storage key.
- The language switcher uses the existing `quello-site-language-v2` storage key.
- The Admin Panel is a static visual sample. It does not authenticate users, grant roles, or call `/api/creator/*`.
- No existing production page, bot code, terms page or privacy page is modified by this sample package.
