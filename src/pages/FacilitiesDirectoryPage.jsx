import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Heart, 
  MapPin, 
  SlidersHorizontal,
  ChevronDown,
  X,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FACILITY_CATEGORIES, DEMO_BUILDINGS } from '../data/campusData';
import { FacilityCard } from '../components/FacilityCard';
import { FacilityModal } from '../components/FacilityModal';

export const FacilitiesDirectoryPage = () => {
  const { facilities, savedFacilityIds, clearSavedFacilities } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const [selectedFacilityModal, setSelectedFacilityModal] = useState(null);

  // Filter facilities
  const filtered = facilities.filter(fac => {
    if (filterSavedOnly && !savedFacilityIds.includes(fac.id)) return false;
    if (selectedCategory !== 'All' && fac.category !== selectedCategory) return false;
    if (selectedBuilding !== 'All' && fac.building !== selectedBuilding) return false;
    if (fac.rating < minRating) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = fac.name.toLowerCase().includes(q);
      const matchBuilding = fac.building.toLowerCase().includes(q);
      const matchFeatures = fac.features.some(f => f.toLowerCase().includes(q));
      if (!matchName && !matchBuilding && !matchFeatures) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBuilding('All');
    setFilterSavedOnly(false);
    setMinRating(0);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            Campus Facilities Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Searchable index of all evaluated ramps, elevators, automated doors, and accessible amenities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedFacilityIds.length > 0 && (
            <button
              type="button"
              onClick={() => setFilterSavedOnly(!filterSavedOnly)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                filterSavedOnly
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${filterSavedOnly ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span>Saved Only ({savedFacilityIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, feature (e.g. braille, sensor), building..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors"
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

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {FACILITY_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>Category: {cat}</option>
              ))}
            </select>
          </div>

          {/* Building Filter */}
          <div>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Campus Buildings</option>
              {DEMO_BUILDINGS.map(bld => (
                <option key={bld.id} value={bld.name}>{bld.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Second row: rating filter + count */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-600">Minimum Score:</span>
            <div className="flex items-center gap-1.5">
              {[0, 80, 90, 95].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setMinRating(score)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                    minRating === score
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {score === 0 ? 'Any' : `${score}+`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-medium">
              Showing <strong>{filtered.length}</strong> of {facilities.length} demo facilities
            </span>
            {(searchQuery || selectedCategory !== 'All' || selectedBuilding !== 'All' || filterSavedOnly || minRating > 0) && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Facility Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onSelectOnMap={(fac) => navigate(`/map?facility=${fac.id}`)}
              onViewDetails={(fac) => setSelectedFacilityModal(fac)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching facilities found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search criteria or removing active category filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Facility Details Modal */}
      <FacilityModal
        facility={selectedFacilityModal}
        isOpen={!!selectedFacilityModal}
        onClose={() => setSelectedFacilityModal(null)}
      />
    </div>
  );
};

