# bugIN – Premium Video Conferencing & Live Map Collaboration Platform

**bugIN** is a next-generation web application combining the video conferencing capabilities of **Zoom** with the real-time geographical exploration of **Google Maps** into one cohesive collaboration platform.

---

## 🚀 Key Highlights & Architectural Features

### 1. Brand Identity & Design System
- **Signature Dark Palette**:
  - Background: `#080B12` (Obsidian Void)
  - Secondary Background: `#101722`
  - Card Surfaces: `#151F2D`
  - Elevated Layers: `#1C2939`
  - Signature Accent: `#A3E635` (Electric Lime)
  - Secondary Accent: `#84CC16`
  - Danger / Error: `#EF4444`
  - Success / Live: `#22C55E`
- **Typography**: Plus Jakarta Sans & Inter font hierarchy.
- **Glassmorphic HUD**: Elevated cards, subtle blur backdrops, soft shadows, and clean Lucide iconography.

---

### 2. Implemented Pages & Features

| Page | Route | Description & Highlights |
| :--- | :--- | :--- |
| **Dashboard** | `/` | Welcoming hero banner with live status, Quick Actions, Upcoming Meetings, Live Map Radar Preview, Recent Activity, and Recharts Telemetry analytics. |
| **Video Conference** | `/meeting/:id` | **Most Important screen**: Zoom-inspired interface with live timer, AES-256 E2EE security badge, active speaker wave indicator, camera-off placeholders, screen-sharing simulation mode, flying reaction emojis (`👏, ❤️, 🚀, 🔥, 🎉, ✋`) with confetti, real-time AI captions stream, audio/video device selector modal, and collapsible right collaboration panel (Participants, Chat, Radar Locations, Details). |
| **Live Map** | `/map` | **Second Most Important screen**: Full-screen CartoDB Dark Matter Leaflet map, custom SVG & photo markers, pulsing radar waves, category filters (All, Active Meetings, Team, Saved Places), autocomplete location search, live location sharing duration controller, and "Get Directions" glowing route generator. |
| **Meetings** | `/meetings` | Tabs for Upcoming, Scheduled, Previous, and **Personal Meeting Room (PMI)**; meeting cards with copy invite, edit, delete, and full scheduling modal with timezone and location link. |
| **Join Meeting** | `/join` | Clean joining flow with live camera/mic test preview box, passcode verification modal, waiting room animated radar state, and quick join chips. |
| **Contacts** | `/contacts` | Modern directory with online/offline indicators, distance from user, favorites, department filters, and instant action buttons (Video Call, Audio Call, Chat, Radar). |
| **Messages** | `/messages` | Slack/Zoom Chat style layout with workplace channels (`#product-strategy-launch`, etc.), rich direct messages, code snippets, live location card attachments with "View on Live Map" button, and audio note simulation. |
| **Meeting History** | `/history` | Past session logs, durations, participants, and View Details modal with AI summary excerpt and "Start Again" button. |
| **Cloud Recordings** | `/recordings` | Video replays grid with thumbnails, resolutions, file sizes, and an interactive **Video Player Modal** with seekbar, speed selector (1.0x, 1.25x, 1.5x), and AI chapters. |
| **Settings** | `/settings` | Profile editor, audio input/output test with live visualizer and 440Hz test tone, virtual backgrounds, AI noise cancellation, radar privacy modes, notification triggers, and dark theme tokens. |

---

### 3. Global Interactive Tools
- **Command Palette (`Cmd+K` / `Ctrl+K`)**: Instant search and navigation across all pages, team contacts, upcoming meetings, and quick actions.
- **Live Location Sharing Drawer**: Configurable sharing duration (15m, 1h, 8h, Indefinitely) with persistent state.
- **Toast Notification Engine**: Interactive status alerts for clipboard copying, route generation, mute toggles, and downloads.
- **Upgrade Modal**: Spatial Pro and Enterprise Grid tier selection.
- **Responsive Mobile Navigation**: Mobile bottom navigation bar and responsive drawers.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Maps**: Leaflet + CartoDB Dark Matter tiles
- **Icons**: Lucide React
- **Visuals & Charts**: Recharts + Canvas Confetti
- **State & Storage**: React Context + LocalStorage persistence

---

## 🏃 Running the Application

From the `client` directory:

```bash
# 1. Install dependencies (if not already installed)
pnpm install

# 2. Run the Vite development server
pnpm run dev

# 3. Build for production
pnpm run build
```

Then open `http://localhost:5173/` in your browser.
