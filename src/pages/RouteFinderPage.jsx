import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Route as RouteIcon, 
  Sliders, 
  Clock, 
  Compass, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Footprints,
  RotateCcw
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { DEMO_CAMPUS_CENTER, DEMO_BUILDINGS, CAMPUS_ROUTE_NODES } from '../data/campusData';
import { findAccessibleRoute } from '../utils/routing';
import { useApp } from '../context/AppContext';

// Map focus adjuster for Route
const RouteMapController = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });
    }
  }, [coordinates, map]);
  return null;
};

// Start & Target Custom Markers
const startIcon = L.divIcon({
  className: 'route-start-icon',
  html: `<div style="background-color: #10b981; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:white; font-size:12px; font-weight:bold;">A</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const targetIcon = L.divIcon({
  className: 'route-target-icon',
  html: `<div style="background-color: #4f46e5; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:white; font-size:12px; font-weight:bold;">B</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

export const RouteFinderPage = () => {
  const { settings } = useApp();
  const [searchParams] = useSearchParams();

  // State
  const [startBuildingId, setStartBuildingId] = useState(DEMO_BUILDINGS[0].id);
  const [targetBuildingId, setTargetBuildingId] = useState(DEMO_BUILDINGS[1].id);

  const [preferences, setPreferences] = useState({
    avoidStairs: settings.preferredRouting?.avoidStairs ?? true,
    preferRamps: settings.preferredRouting?.preferRamps ?? true,
    preferElevators: settings.preferredRouting?.preferElevators ?? true,
    preferAccessibleEntrances: settings.preferredRouting?.preferAccessibleEntrances ?? true,
    minimizeDistance: settings.preferredRouting?.minimizeDistance ?? false,
  });

  const [calculatedRoute, setCalculatedRoute] = useState(null);

  // Read URL destination param if set from map or facility card
  useEffect(() => {
    const destParam = searchParams.get('destination');
    if (destParam && DEMO_BUILDINGS.some(b => b.id === destParam)) {
      setTargetBuildingId(destParam);
    }
  }, [searchParams]);

  // Run route calculation
  const handleCalculateRoute = () => {
    const result = findAccessibleRoute(startBuildingId, targetBuildingId, preferences);
    setCalculatedRoute(result);
  };

  // Recalculate on mount or parameter changes
  useEffect(() => {
    handleCalculateRoute();
  }, [startBuildingId, targetBuildingId, preferences]);

  const handleSwapLocations = () => {
    const temp = startBuildingId;
    setStartBuildingId(targetBuildingId);
    setTargetBuildingId(temp);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Demo Disclaimer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <RouteIcon className="w-6 h-6 text-indigo-600" />
            Accessible Route Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Calculate barrier-free and step-free travel paths adapted to mobility requirements.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Demo routes calculated via simulated campus graph.</span>
        </div>
      </div>

      {/* Main Grid: Left Controls & Output, Right Map View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Route Results (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Journey Selector Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Plan Campus Transit</span>
              <button
                type="button"
                onClick={handleSwapLocations}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Swap Buildings
              </button>
            </div>

            {/* Starting Building */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Starting Building (Origin)
              </label>
              <select
                value={startBuildingId}
                onChange={(e) => setStartBuildingId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {DEMO_BUILDINGS.map(bld => (
                  <option key={bld.id} value={bld.id}>{bld.name} ({bld.code})</option>
                ))}
              </select>
            </div>

            {/* Destination Building */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                Destination Building
              </label>
              <select
                value={targetBuildingId}
                onChange={(e) => setTargetBuildingId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {DEMO_BUILDINGS.map(bld => (
                  <option key={bld.id} value={bld.id}>{bld.name} ({bld.code})</option>
                ))}
              </select>
            </div>

            {/* Accessibility Preferences Accordion/Checkboxes */}
            <div className="pt-2 border-t border-slate-100">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                Routing Accessibility Preferences
              </span>

              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.avoidStairs}
                    onChange={(e) => setPreferences({ ...preferences, avoidStairs: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>Avoid all outdoor stairs & step transitions</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.preferRamps}
                    onChange={(e) => setPreferences({ ...preferences, preferRamps: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>Prefer dedicated ramps with continuous handrails</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.preferElevators}
                    onChange={(e) => setPreferences({ ...preferences, preferElevators: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>Prioritize elevator connector walkways</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.preferAccessibleEntrances}
                    onChange={(e) => setPreferences({ ...preferences, preferAccessibleEntrances: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>Target automatic sensor doors</span>
                </label>
              </div>
            </div>
          </div>

          {/* Route Results Box */}
          {calculatedRoute && calculatedRoute.success ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Recommended Barrier-Free Route
                </span>
                <span className="text-[11px] font-medium text-slate-400">Demo estimate</span>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Footprints className="w-3.5 h-3.5 text-indigo-600" /> Estimated Distance
                  </span>
                  <div className="text-xl font-black text-slate-900 mt-1">
                    {calculatedRoute.totalDistance} <span className="text-xs font-normal text-slate-500">meters</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> Travel Time (~70m/m)
                  </span>
                  <div className="text-xl font-black text-slate-900 mt-1">
                    ~{calculatedRoute.estimatedTimeMinutes} <span className="text-xs font-normal text-slate-500">mins</span>
                  </div>
                </div>
              </div>

              {/* Route Summary Description */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Route Instructions
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {calculatedRoute.description}
                </p>
              </div>

              {/* Accessibility Accommodations On Route */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Verified Accommodations Encountered
                </span>
                <div className="space-y-1.5">
                  {calculatedRoute.featuresEncountered.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Obstacles or Advisories */}
              {calculatedRoute.potentialBarriers.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Advisories Along Way</span>
                  </div>
                  {calculatedRoute.potentialBarriers.map((barr, i) => (
                    <p key={i} className="text-[11px] text-amber-800">• {barr}</p>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-slate-500">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-semibold">No direct path found</p>
              <p className="text-xs mt-1">Try loosening accessibility filters or changing destination.</p>
            </div>
          )}
        </div>

        {/* Right Column: Leaflet Map Visualizing Polyline (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col min-h-[480px]">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-600" />
              Interactive Route Polyline Visualization
            </span>
            <span className="text-teal-700 font-bold">
              ● Active Waypoints
            </span>
          </div>

          <div className="flex-1 relative z-0 min-h-[450px]">
            <MapContainer
              center={DEMO_CAMPUS_CENTER}
              zoom={16}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
            >
              {calculatedRoute && calculatedRoute.fullCoordinates && (
                <RouteMapController coordinates={calculatedRoute.fullCoordinates} />
              )}

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Draw polyline */}
              {calculatedRoute && calculatedRoute.fullCoordinates && calculatedRoute.fullCoordinates.length > 0 && (
                <Polyline
                  positions={calculatedRoute.fullCoordinates}
                  color="#4f46e5"
                  weight={6}
                  opacity={0.85}
                  dashArray="10, 10"
                />
              )}

              {/* Start Marker */}
              {calculatedRoute?.startNode && (
                <Marker
                  position={[calculatedRoute.startNode.lat, calculatedRoute.startNode.lng]}
                  icon={startIcon}
                >
                  <Popup>
                    <div className="text-xs">
                      <strong>Start Origin:</strong> {calculatedRoute.startNode.name}
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Destination Marker */}
              {calculatedRoute?.targetNode && (
                <Marker
                  position={[calculatedRoute.targetNode.lat, calculatedRoute.targetNode.lng]}
                  icon={targetIcon}
                >
                  <Popup>
                    <div className="text-xs">
                      <strong>Destination:</strong> {calculatedRoute.targetNode.name}
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

