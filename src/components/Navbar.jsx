import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  MapPin, 
  Route, 
  SlidersHorizontal,
  Bell,
  Heart,
  FileWarning
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = ({ onOpenSidebar }) => {
  const location = useLocation();
  const { savedFacilityIds, reports } = useApp();
  const activeIssues = reports.filter(r => r.status !== 'Resolved').length;

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Home';
      case '/dashboard': return 'Accessibility Dashboard';
      case '/map': return 'Interactive Campus Map';
      case '/routes': return 'Accessible Route Finder';
      case '/facilities': return 'Facilities Directory';
      case '/report-barrier': return 'Report a Barrier';
      case '/reports': return 'Barrier Reports Management';
      case '/settings': return 'Accessibility & Preferences';
      default: return 'AccessAble Campus';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Left: Mobile hamburger & title */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Open mobile navigation sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {getPageTitle()}
            </h1>
            <p className="hidden md:block text-xs text-slate-500">
              Campus Accessibility & Mobility Assistance Platform
            </p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/routes"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Open Route Finder"
          >
            <Route className="w-4 h-4 text-indigo-600" />
            <span>Find Route</span>
          </Link>

          <Link
            to="/facilities"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Saved Facilities"
          >
            <Heart className={`w-4 h-4 ${savedFacilityIds.length ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
            <span className="hidden xs:inline">Saved</span>
            {savedFacilityIds.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-slate-200 rounded-full text-[10px] font-bold">
                {savedFacilityIds.length}
              </span>
            )}
          </Link>

          <Link
            to="/reports"
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={`View active reports (${activeIssues})`}
            title="Active Barrier Reports"
          >
            <Bell className="w-4 h-4" />
            {activeIssues > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white ring-2 ring-white">
                {activeIssues}
              </span>
            )}
          </Link>

          <Link
            to="/settings"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Accessibility Settings"
            title="Accessibility Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};

