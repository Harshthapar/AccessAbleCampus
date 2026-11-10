import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ToastNotification } from './components/ToastNotification';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CampusMapPage } from './pages/CampusMapPage';
import { RouteFinderPage } from './pages/RouteFinderPage';
import { FacilitiesDirectoryPage } from './pages/FacilitiesDirectoryPage';
import { ReportBarrierPage } from './pages/ReportBarrierPage';
import { AccessibilityReportsPage } from './pages/AccessibilityReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Landing page has its own full-width landing layout without persistent sidebar
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Toast notifications container */}
      <ToastNotification />

      {isLandingPage ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      ) : (
        <div className="flex flex-1">
          {/* Main App Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Right Main Content Panel */}
          <div className="flex-1 flex flex-col lg:pl-72 min-w-0 transition-all duration-300">
            <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

            <main className="flex-1 bg-slate-50 overflow-y-auto">
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/map" element={<CampusMapPage />} />
                <Route path="/routes" element={<RouteFinderPage />} />
                <Route path="/facilities" element={<FacilitiesDirectoryPage />} />
                <Route path="/report-barrier" element={<ReportBarrierPage />} />
                <Route path="/reports" element={<AccessibilityReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                {/* Fallback */}
                <Route path="*" element={<DashboardPage />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

