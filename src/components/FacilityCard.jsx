import React from 'react';
import { 
  Building, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  Heart, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FacilityCard = ({ facility, onSelectOnMap, onViewDetails }) => {
  const { savedFacilityIds, toggleSaveFacility } = useApp();
  const isSaved = savedFacilityIds.includes(facility.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Operational':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Operational
          </span>
        );
      case 'Under Maintenance':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Wrench className="w-3.5 h-3.5 text-rose-600" />
            Under Maintenance
          </span>
        );
      case 'Limited Access':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Limited Access
          </span>
        );
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-indigo-700 bg-indigo-50 border-indigo-200';
    return 'text-amber-700 bg-amber-50 border-amber-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
              {facility.category}
            </span>
            {getStatusBadge(facility.status)}
          </div>

          <button
            type="button"
            onClick={() => toggleSaveFacility(facility.id)}
            className={`p-2 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isSaved 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200'
            }`}
            aria-label={isSaved ? 'Remove from saved facilities' : 'Save facility for later'}
            title={isSaved ? 'Remove from saved' : 'Save facility'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Title and Building */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {facility.name}
        </h3>
        
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 mb-3">
          <Building className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium text-slate-700">{facility.building}</span>
          <span>•</span>
          <span>{facility.floor}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {facility.description}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {facility.features.slice(0, 3).map((feat, i) => (
            <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
              ✓ {feat}
            </span>
          ))}
          {facility.features.length > 3 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
              +{facility.features.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer info & action buttons */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <div className={`px-2 py-0.5 rounded-md border text-xs font-bold ${getScoreColor(facility.rating)}`}>
              {facility.rating}/100
            </div>
            <span className="text-[11px] text-slate-500">Demo Score</span>
          </div>
          <span className="text-[10px] text-slate-400">
            Updated {facility.lastChecked}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectOnMap?.(facility)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>View on Map</span>
          </button>

          <button
            type="button"
            onClick={() => onViewDetails?.(facility)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

