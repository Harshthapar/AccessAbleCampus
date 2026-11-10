import React from 'react';
import { 
  Compass, 
  MapPin, 
  Route, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  HeartHandshake, 
  Users, 
  CheckCircle2, 
  Layers, 
  Eye, 
  Activity,
  Building,
  HelpCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DEMO_FACILITIES, DEMO_BUILDINGS } from '../data/campusData';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Compass className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                AccessAble
                <span className="text-xs px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold tracking-wider">CAMPUS</span>
              </span>
              <p className="text-xs text-slate-500 font-medium">Navigate Without Barriers</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/map" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
              Campus Map
            </Link>
            <Link to="/routes" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
              Route Finder
            </Link>
            <Link to="/facilities" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
              Facilities
            </Link>
            <Link to="/report-barrier" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
              Report Barrier
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-6 tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Smart Accessibility & Inclusion Navigator</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Navigate Your Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">Without Barriers</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              Discover accessible facilities, explore mobility-friendly routes, and help build a more inclusive campus for students, faculty, and visitors.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-200/50 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <MapPin className="w-5 h-5 text-indigo-200" />
                <span>Explore Campus</span>
              </Link>

              <Link
                to="/routes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-base border border-slate-200 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <Route className="w-5 h-5 text-teal-600" />
                <span>Find Accessible Routes</span>
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Interactive Prototype Powered by OpenStreetMap & Accessible Client Graph
            </p>
          </div>

          {/* Interactive Preview Card Showcase */}
          <div className="max-w-5xl mx-auto rounded-3xl bg-white p-3 sm:p-5 shadow-2xl border border-slate-200/80">
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-lg text-left">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Interactive Campus System
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">
                    Smart step-free wayfinding between academic blocks
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Filter by ADA ramps, automatic sliding doors, functional elevators, tactile paving, and universal accessible restrooms.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">♿ Wheelchair Friendly</span>
                    <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">🚶 Stride & Incline Guidance</span>
                    <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">🔔 Real-time Obstacle Alerting</span>
                  </div>
                </div>

                <div className="w-full md:w-80 bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 border-b border-slate-700 pb-2">
                    <span>Live Sample Route</span>
                    <span className="text-teal-400">Step-Free ✓</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                      <span className="font-semibold text-white">Green Main Library</span>
                    </div>
                    <div className="pl-3 border-l-2 border-dashed border-slate-600 text-slate-400 py-1 text-[11px]">
                      Central Quad Ramp (1:12 slope) • 250m
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                      <span className="font-semibold text-white">Terman Engineering Center</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/routes')}
                    className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition-colors"
                  >
                    Simulate Route In Engine →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Built for Campus Inclusivity
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Everything students, staff, and visitors require to plan accessible journeys with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Interactive Campus Map
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Explore campus points of interest with dedicated icons for elevators, entrance ramps, wheelchair parking, and universal restrooms.
              </p>
              <Link to="/map" className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800">
                Open Map View <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Route className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Smart Route Calculation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Select your origin and destination. Customize preferences to bypass flights of stairs, target verified ramps, or minimize travel distances.
              </p>
              <Link to="/routes" className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-900">
                Plan A Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Crowdsourced Barrier Reporting
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Encountered a broken elevator or blocked ramp? Submit instant notifications to track resolution statuses and inform fellow students.
              </p>
              <Link to="/report-barrier" className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-900">
                Submit Report <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              How AccessAble Campus Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center mb-4 text-base">
                1
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Find or Search Facility</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Look up study halls, classrooms, dining centers, or sports complexes with detailed accessibility ratings and amenity checklists.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center mb-4 text-base">
                2
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Generate Barrier-Free Route</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Filter out stairs and narrow doorways. Follow a step-by-step route trajectory with clear travel time estimates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center mb-4 text-base">
                3
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Report Obstacles in Real Time</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Help the campus community stay updated by logging damaged pathways, blocked ramps, or malfunctioning lifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Mission Section */}
      <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <HeartHandshake className="w-14 h-14 text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Our Mission: Inclusivity by Design
          </h2>
          <p className="text-lg text-indigo-100 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Every university member deserves dignified, uninhibited access to educational opportunities, facilities, and communal spaces. AccessAble Campus harnesses technology and shared community awareness to dismantle physical barriers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/facilities"
              className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-extrabold text-sm transition-colors shadow-lg"
            >
              Browse Campus Directory
            </Link>
            <Link
              to="/settings"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              Configure A11y Modes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">AccessAble Campus</p>
              <p className="text-xs text-slate-500">Navigate Without Barriers • MVP Prototype</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-600">
            <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link to="/map" className="hover:text-indigo-600">Map</Link>
            <Link to="/routes" className="hover:text-indigo-600">Route Finder</Link>
            <Link to="/facilities" className="hover:text-indigo-600">Facilities</Link>
            <Link to="/reports" className="hover:text-indigo-600">Reports</Link>
            <Link to="/settings" className="hover:text-indigo-600">Settings</Link>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right">
            Sample demo platform for campus accessibility evaluation.
          </p>
        </div>
      </footer>
    </div>
  );
};

