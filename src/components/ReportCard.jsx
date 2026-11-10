import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Building2, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Edit3,
  Calendar,
  ShieldAlert,
  UserCheck
} from 'lucide-react';

export const ReportCard = ({ report, onEdit, onDelete, onStatusChange }) => {
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'High':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
            High Severity
          </span>
        );
      case 'Medium':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Medium Severity
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Low Severity
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3.5 h-3.5" />
            Resolved
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
            <Clock className="w-3.5 h-3.5" />
            Under Review
          </span>
        );
      case 'Submitted':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <AlertCircle className="w-3.5 h-3.5" />
            Submitted
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
              {report.category}
            </span>
            {getSeverityBadge(report.severity)}
          </div>
          {getStatusBadge(report.status)}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
          {report.title}
        </h3>

        {/* Location info */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3 font-medium">
          <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>{report.building}</span>
          {report.locationDetail && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 truncate">{report.locationDetail}</span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {report.description}
        </p>

        {/* Image preview if any */}
        {report.image && (
          <div className="mb-4 rounded-xl overflow-hidden max-h-48 border border-slate-200">
            <img src={report.image} alt="Report attachment" className="w-full h-auto object-cover" />
          </div>
        )}
      </div>

      {/* Meta and actions footer */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Reported {report.date}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{report.reporter || 'Anonymous'}</span>
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between gap-2">
          {/* Quick status dropdown for interactive verification */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-slate-500 font-medium">Status:</span>
            <select
              value={report.status}
              onChange={(e) => onStatusChange?.(report.id, e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
              aria-label="Change report status"
            >
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(report)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                aria-label="Edit report"
                title="Edit Report"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(report.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                aria-label="Delete report"
                title="Delete Report"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

