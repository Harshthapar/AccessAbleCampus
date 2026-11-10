import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Compass, 
  Route, 
  Layers, 
  Maximize2, 
  RotateCcw, 
  Info,
  CheckCircle,
  AlertTriangle,
  Heart,
  ChevronRight,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_CAMPUS_CENTER, DEMO_BUILDINGS, FACILITY_CATEGORIES } from '../data/campusData';
import { FacilityModal } from '../components/FacilityModal';

// Custom SVG icon generator for Leaflet markers
const createCustomIcon = (category) => {
  let color = '#4f46e5'; // default primary
  let symbol = '♿';

  switch (category) {
    case 'Ramp':
      color = '#0d9488'; // teal
      symbol = '⬈';
      break;
    case 'Elevator':
      color = '#3b82f6'; // blue
      symbol = '⇅';
      break;
    case 'Accessible Washroom':
      color = '#8b5cf6'; // purple
      symbol = '🚻';
      break;
    case 'Wheelchair Accessible Entrance':
      color = '#10b981'; // emerald
      symbol = '🚪';
      break;
    case 'Parking':
      color = '#0284c7'; // sky
      symbol = 'P';
      break;
    case 'Medical Center':
      color = '#ef4444'; // red
      symbol = '✚';
      break;
    case 'Cafeteria':
      color = '#f59e0b'; // amber
      symbol = '☕';
      break;
    case 'Library':
      color = '#6366f1'; // indigo
      symbol = '📖';
      break;
    default:
      color = '#4f46e5';
      symbol = '♿';
  }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 15px;
      ">
        ${symbol}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
};

// Component to handle pan/zoom changes programmatically
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 16, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
};

export const CampusMapPage = () => {
  const { facilities, savedFacilityIds, toggleSaveFacility } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacilityForModal, setSelectedFacilityForModal] = useState(null);

  const [mapCenter, setMapCenter] = useState(DEMO_CAMPUS_CENTER);
  const [mapZoom, setMapZoom] = useState(16);
  const [showLegend, setShowLegend] = useState(true);

  // Check URL params if navigated from another page
  useEffect(() => {
    const facilityParamId = searchParams.get('facility');
    if (facilityParamId) {
      const match = facilities.find(f => f.id === facilityParamId);
      if (match) {
        setMapCenter(match.coordinates);
        setMapZoom(18);
      }
    }
  }, [searchParams, facilities]);

  // Filter facilities
  const filteredFacilities = facilities.filter(facility => {
    const matchesCategory = selectedCategory === 'All' || facility.category === selectedCategory;
    const matchesBuilding = selectedBuilding === 'All' || facility.building === selectedBuilding;
    const matchesSearch = !searchQuery.trim() || 
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesBuilding && matchesSearch;
  });

  const handleResetView = () => {
    setMapCenter(DEMO_CAMPUS_CENTER);
    setMapZoom(16);
    setSelectedCategory('All');
    setSelectedBuilding('All');
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] relative overflow-hidden bg-slate-100">
      {/* Top Search & Filter Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 z-10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ramp, elevator, washroom, building..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold py-2 px-3 rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by facility type"
          >
            {FACILITY_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>Category: {cat}</option>
            ))}
          </select>

          {/* Building Filter */}
          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="text-xs font-semibold py-2 px-3 rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by building"
          >
            <option value="All">All Campus Buildings</option>
            {DEMO_BUILDINGS.map(bld => (
              <option key={bld.id} value={bld.name}>{bld.name}</option>
            ))}
          </select>

          {/* Reset Map View */}
          <button
            type="button"
            onClick={handleResetView}
            className="inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Reset to campus center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset View</span>
          </button>
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="flex-1 relative z-0">
        <MapContainer
          center={DEMO_CAMPUS_CENTER}
          zoom={16}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <MapController center={mapCenter} zoom={mapZoom} />

          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Facility Markers */}
          {filteredFacilities.map((facility) => {
            const isSaved = savedFacilityIds.includes(facility.id);

            return (
              <Marker
                key={facility.id}
                position={facility.coordinates}
                icon={createCustomIcon(facility.category)}
              >
                <Popup className="custom-popup" maxWidth={280}>
                  <div className="p-3 text-slate-800 space-y-2">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-1.5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {facility.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1 leading-tight">
                          {facility.name}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        facility.status === 'Operational' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {facility.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{facility.building} ({facility.floor})</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {facility.description}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1 font-bold text-indigo-700">
                        <span>Score: {facility.rating}/100</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Demo estimate</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedFacilityForModal(facility)}
                        className="flex-1 py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold text-center transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/routes?destination=${facility.buildingId}`)}
                        className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                        title="Route here"
                      >
                        <Route className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend Overlay Floating on bottom-left */}
        <div className="absolute bottom-5 left-4 z-[400] max-w-xs">
          {showLegend ? (
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 text-xs text-slate-700 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  Map Accessibility Legend
                </span>
                <button
                  type="button"
                  onClick={() => setShowLegend(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold px-1"
                  aria-label="Hide legend"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
                  <span>Ramp (⬈)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                  <span>Elevator (⇅)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                  <span>Washroom (🚻)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span>ADA Entrance (🚪)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-sky-600 inline-block" />
                  <span>Mobility Parking (P)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span>Medical Clinic (✚)</span>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 italic">
                Showing {filteredFacilities.length} of {facilities.length} demo locations.
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowLegend(true)}
              className="bg-white p-2.5 rounded-xl shadow-lg border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 hover:bg-slate-50"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Show Legend</span>
            </button>
          )}
        </div>

        {/* Demo Notice Floating Badge */}
        <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-indigo-600" />
          <span>Demo Campus Coordinates</span>
        </div>
      </div>

      {/* Facility Details Modal */}
      <FacilityModal
        facility={selectedFacilityForModal}
        isOpen={!!selectedFacilityForModal}
        onClose={() => setSelectedFacilityForModal(null)}
      />
    </div>
  );
};

