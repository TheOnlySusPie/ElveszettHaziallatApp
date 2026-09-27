# React + Vite PWA Template

A modern, production-ready Progressive Web Application (PWA) template built with React, TypeScript, and Vite.

## ✨ Features

- ⚡ **Vite + React 19 + TypeScript**: Rapid bundling and development experience.
- 📦 **`vite-plugin-pwa` (Workbox)**: Automatic service worker generation and caching strategies.
- 📱 **Web App Manifest**: Complete with icons (192x192, 512x512, maskable), theme colors, and standalone display.
- 🔄 **Update & Offline Prompt**: Interactive UI notifying users when new content is ready and when the app is cached offline.
- 📶 **Network Status & Install Prompt**: Real-time online/offline indicator and browser installation triggers.
- 🛡️ **Zero-dependency Icon Generator**: Built-in script to generate required PWA icons without heavy dependencies.

## 🚀 Getting Started

### Development
```bash
npm run dev
```
Start the local development server (service worker enabled in dev mode).

### Production Build
```bash
npm run build
```
Typechecks with `tsc` and bundles static assets, generating `dist/sw.js` and `dist/manifest.webmanifest`.

### Preview Production Build
```bash
npm run preview
```
Serves the `dist/` directory locally so you can inspect service worker caching and PWA installation in Chrome/Edge/Firefox/Safari.

### Re-generating Icons
```bash
npm run icons:generate
```

## 📂 Project Structure

```
├── public/
│   ├── apple-touch-icon.png    # iOS touch icon
│   ├── favicon.svg             # Vector favicon
│   ├── pwa-192x192.png         # Standard PWA icon
│   └── pwa-512x512.png         # High-resolution & maskable PWA icon
├── scripts/
│   └── generate-icons.cjs      # PNG icon generator
├── src/
│   ├── components/
│   │   ├── ReloadPrompt.tsx    # Update & offline banner
│   │   └── ReloadPrompt.css
│   ├── hooks/
│   │   ├── useNetworkStatus.ts # Online/Offline reactive status
│   │   └── usePWAInstall.ts    # Install prompt event handler
│   ├── App.tsx                 # Demo dashboard
│   ├── App.css                 # Dashboard styling
│   ├── main.tsx                # App entry point
│   └── vite-env.d.ts           # PWA client type definitions
├── tsconfig.app.json
├── vite.config.ts              # Vite & VitePWA configuration
└── package.json
```

## 🧪 Testing Offline Support
1. Run `npm run build && npm run preview`.
2. Open the URL in Google Chrome or Microsoft Edge.
3. Open Developer Tools (`F12`), navigate to the **Application** tab:
   - Check **Manifest** to inspect metadata, icons, and display mode.
   - Check **Service Workers** to inspect registration and active state.
4. Go to the **Network** tab and toggle throttling to **Offline**, then refresh the page. The app will continue to load and function offline!
