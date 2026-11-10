import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Route, 
  Building2, 
  AlertTriangle, 
  FileText, 
  Settings, 
  Layers,
  Heart,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { savedFacilityIds, reports } = useApp();
  const pendingReportsCount = reports.filter(r => r.status !== 'Resolved').length;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: Layers },
    { to: '/map', label: 'Campus Map', icon: MapPin },
    { to: '/routes', label: 'Route Finder', icon: Route },
    { to: '/facilities', label: 'Facilities Directory', icon: Building2, badge: savedFacilityIds.length ? `${savedFacilityIds.length} saved` : null },
    { to: '/report-barrier', label: 'Report a Barrier', icon: AlertTriangle, highlight: true },
    { to: '/reports', label: 'Accessibility Reports', icon: FileText, badge: pendingReportsCount > 0 ? `${pendingReportsCount} active` : null },
    { to: '/settings', label: 'Accessibility Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Aside container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main Navigation Sidebar"
      >
        {/* Brand header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Compass className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 flex items-center gap-1">
                AccessAble
                <span className="text-xs px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold uppercase tracking-wider">Campus</span>
              </span>
              <p className="text-xs text-slate-500 font-medium">Navigate Without Barriers</p>
            </div>
          </Link>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Campus Navigation
          </div>

          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm shadow-indigo-50/50' 
                    : item.highlight
                      ? 'text-amber-700 hover:bg-amber-50/80 bg-amber-50/40'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${item.highlight ? 'text-amber-600' : ''}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    item.badge.includes('active') 
                      ? 'bg-rose-100 text-rose-700' 
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Demo Indicator Notice */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Interactive Demo</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Facilities, routes, and barrier reports are generated with sample campus data for prototype verification.
          </p>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">v1.0.0 Accessible Edition</span>
          <Link to="/settings" className="hover:text-indigo-600 font-medium flex items-center gap-1" onClick={onClose}>
            A11y Preferences <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </>
  );
};

