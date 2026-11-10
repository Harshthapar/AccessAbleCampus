import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Route, 
  AlertTriangle, 
  CheckCircle, 
  ArrowUpRight, 
  Compass, 
  Sparkles,
  Info,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Sliders,
  Layers,
  Heart
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ACCESSIBILITY_TIPS, DEMO_BUILDINGS } from '../data/campusData';
import { FacilityCard } from '../components/FacilityCard';
import { FacilityModal } from '../components/FacilityModal';

export const DashboardPage = () => {
  const { facilities, reports, savedFacilityIds } = useApp();
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState(null);

  // Metrics
  const totalFacilities = facilities.length;
  const rampsCount = facilities.filter(f => f.category === 'Ramp').length;
  const elevatorsCount = facilities.filter(f => f.category === 'Elevator').length;
  const washroomsCount = facilities.filter(f => f.category === 'Accessible Washroom').length;
  const activeReportsCount = reports.filter(r => r.status !== 'Resolved').length;

  // Recommended Facilities
  const recommendedFacilities = facilities.slice(0, 4);
  const recentReports = reports.slice(0, 3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-teal-50 border border-indigo-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-100" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Campus Accessibility Status & Operations
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Real-time directory of barrier-free entrances, operational elevators, and community-reported obstacles.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
            Demo Campus Layout
          </span>
        </div>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accessible Facilities</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{totalFacilities}</div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Across 8 campus blocks
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Ramps & Elevators</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{rampsCount + elevatorsCount}</div>
          <p className="text-xs text-slate-500 mt-1">
            {rampsCount} dual ramps • {elevatorsCount} elevators
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accessible Washrooms</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{washroomsCount}</div>
          <p className="text-xs text-slate-500 mt-1">
            With adult change tables & alarm cords
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Barrier Reports</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{activeReportsCount}</div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            {reports.filter(r => r.status === 'Submitted').length} pending inspection
          </p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-600" />
          Quick Navigation Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/map"
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Explore Campus Map
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Interactive POI & categories</p>
          </Link>

          <Link
            to="/routes"
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-400 hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Route className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              Find Accessible Route
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Step-free building wayfinding</p>
          </Link>

          <Link
            to="/report-barrier"
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
              Report a Barrier
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Log obstacle or broken elevator</p>
          </Link>

          <Link
            to="/facilities"
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Browse Facilities
            </div>
            <p className="text-xs text-slate-500 mt-0.5">View scores & amenities</p>
          </Link>
        </div>
      </div>

      {/* Recommended Facilities & Recent Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recommended Commonly Accessed Facilities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Commonly Accessed Campus Facilities
              </h3>
              <p className="text-xs text-slate-500">
                Frequent destinations with verified accessibility accommodations
              </p>
            </div>
            <Link
              to="/facilities"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View all ({facilities.length}) <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedFacilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                onSelectOnMap={(fac) => navigate(`/map?facility=${fac.id}`)}
                onViewDetails={(fac) => setSelectedFacility(fac)}
              />
            ))}
          </div>
        </div>

        {/* Right 1 Col: Recent Barrier Reports & Tips */}
        <div className="space-y-6">
          {/* Recent Reports Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-bold text-slate-900">Recent Barrier Reports</h4>
              </div>
              <Link to="/reports" className="text-xs font-semibold text-indigo-600 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {recentReports.map(rep => (
                <div key={rep.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 truncate pr-2">{rep.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rep.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rep.severity}
                    </span>
                  </div>
                  <div className="text-slate-500 font-medium flex items-center gap-1">
                    <span>{rep.building}</span> • <span>{rep.date}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className={`font-semibold ${
                      rep.status === 'Resolved' ? 'text-emerald-700' : 'text-indigo-700'
                    }`}>
                      ● {rep.status}
                    </span>
                    <Link to="/reports" className="text-indigo-600 hover:underline font-medium">
                      Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Tips Widget */}
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 p-5 rounded-2xl text-white shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-teal-400">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Inclusive Navigation Tip</h4>
            </div>
            <h5 className="text-sm font-bold">{ACCESSIBILITY_TIPS[0].title}</h5>
            <p className="text-xs text-indigo-200 leading-relaxed">
              {ACCESSIBILITY_TIPS[0].content}
            </p>
            <div className="pt-2">
              <Link
                to="/routes"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white transition-colors"
              >
                Plan a step-free journey now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Details Modal */}
      <FacilityModal
        facility={selectedFacility}
        isOpen={!!selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />
    </div>
  );
};

