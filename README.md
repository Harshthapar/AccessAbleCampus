# AccessAble Campus — Navigate Without Barriers

A modern, responsive, accessibility-focused web application for discovering accessible campus facilities and planning barrier-free routes for students, faculty, and visitors.

---

## 🚀 Key Features

1. **Landing Page**
   - Hero section highlighting accessibility mission
   - One-click navigation to explore campus & compute routes
   - Interactive preview of step-free routes and campus facilities
   - 3-step walkthrough and core accessibility commitments

2. **Accessibility Dashboard**
   - Quick metrics: Total facilities, ramps & elevators, accessible washrooms, and active barrier reports
   - Quick navigation shortcuts: Map, Route Finder, Report Barrier, Facilities Directory
   - Recommended frequent campus destinations (Libraries, Academic Halls, Clinics)
   - Real-time recent barrier reports feed and accessibility navigation tips

3. **Interactive Campus Map**
   - Built with **Leaflet**, **React-Leaflet**, and **OpenStreetMap**
   - Distinct custom color-coded category markers for Ramps (⬈), Elevators (⇅), Universal Washrooms (🚻), ADA Entrances (🚪), Reserved Mobility Parking (P), Medical Centers (✚), and Cafeterias (☕)
   - Interactive popups with category, operating status, accessibility scores, and quick action buttons
   - Live category filter, campus building selector, free-text search, map legend, and view reset

4. **Accessible Route Finder**
   - Client-side graph routing engine implementing shortest barrier-free path calculations
   - Custom accessibility preferences: Avoid stairs, prefer ramps, prefer elevators, prefer automatic doors
   - Displays estimated distance (in meters) and wheelchair travel times (in minutes)
   - Interactive route polyline overlaid directly on the Leaflet map with start (A) and destination (B) markers
   - Potential hazard & barrier alerts (e.g. cobblestone segments, nearby staircases)

5. **Facilities Directory**
   - Searchable index of 16+ campus facilities with detailed accessibility ratings (0-100)
   - Filter by category, building, minimum accessibility score, or saved favorites
   - Save facilities to favorites with offline `localStorage` persistence
   - Detailed modal view breaking down ramp incline grades, elevator features, emergency alarms, and sensory accommodations

6. **Barrier Reporting & Management**
   - Form for reporting obstacles: Broken elevators, blocked ramps, damaged sidewalks, and missing signage
   - Image upload preview and client-side validation
   - Status tracking (`Submitted`, `Under Review`, `Resolved`)
   - Interactive management dashboard with edit, delete, search, and status update controls
   - Fully persisted in browser `localStorage`

7. **Accessibility Settings & UI Customization**
   - Adjustable font sizes: Compact, Default, Large, Extra Large
   - High Contrast Mode for enhanced visual clarity and prominent focus outlines
   - Reduced Motion mode for vestibular comfort
   - Persistent route preferences
   - One-click demo data reset & saved favorites management

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **React Router DOM (v6)**
- **Leaflet & React-Leaflet**
- **OpenStreetMap**
- **Lucide React**
- **localStorage**

---

## 🏃 Getting Started Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

---

> **Note:** Demo coordinates, route graphs, accessibility ratings, and barrier reports are generated sample data designed for prototype demonstration.

