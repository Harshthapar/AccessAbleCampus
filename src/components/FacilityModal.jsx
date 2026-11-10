import React from 'react';
import { 
  Building, 
  MapPin, 
  ShieldCheck, 
  Info, 
  X, 
  ExternalLink, 
  Heart,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Route
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const FacilityModal = ({ facility, isOpen, onClose }) => {
  const { savedFacilityIds, toggleSaveFacility } = useApp();
  const navigate = useNavigate();

  if (!isOpen || !facility) return null;

  const isSaved = savedFacilityIds.includes(facility.id);

  const handleRouteTo = () => {
    onClose();
    navigate(`/routes?destination=${facility.buildingId}`);
  };

  const handleShowMap = () => {
    onClose();
    navigate(`/map?facility=${facility.id}`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-facility-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-teal-600 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white">
              {facility.category}
            </span>
            <span className="text-xs font-medium text-indigo-100 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Inspected: {facility.lastChecked}
            </span>
          </div>

          <h2 id="modal-facility-title" className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {facility.name}
          </h2>

          <div className="flex items-center gap-2 text-sm text-indigo-100 mt-2">
            <Building className="w-4 h-4 text-teal-300" />
            <span>{facility.building}</span>
            <span>•</span>
            <span>{facility.floor}</span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {/* Disclaimer badge */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Demo Accessibility Information:</strong> Data represents a mock evaluation designed for the AccessAble prototype. Always verify site conditions during on-campus transit.
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Overview & Access</h4>
            <p className="text-sm leading-relaxed text-slate-600">
              {facility.description}
            </p>
          </div>

          {/* Accessibility Score Breakdown */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Demo Accessibility Score</span>
                <p className="text-xs text-slate-500">Comprehensive multi-parameter rating estimate</p>
              </div>
              <div className="text-2xl font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
                {facility.rating}<span className="text-sm font-semibold text-indigo-500">/100</span>
              </div>
            </div>

            {facility.scores && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Ramp Grade & Handrails</span>
                    <span className="font-bold">{facility.scores.rampQuality}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${facility.scores.rampQuality}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Elevator & Step-Free</span>
                    <span className="font-bold">{facility.scores.elevatorAccess}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${facility.scores.elevatorAccess}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Automated Entrance</span>
                    <span className="font-bold">{facility.scores.accessibleEntrance}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${facility.scores.accessibleEntrance}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Signage & Braille / Audio</span>
                    <span className="font-bold">{facility.scores.signageQuality}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${facility.scores.signageQuality}%` }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Key Verified Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Verified Accessibility Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {facility.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => toggleSaveFacility(facility.id)}
            className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isSaved ? 'Saved in Favorites' : 'Save Facility'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRouteTo}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-colors"
            >
              <Route className="w-4 h-4" />
              <span>Route Here</span>
            </button>

            <button
              type="button"
              onClick={handleShowMap}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Show on Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

