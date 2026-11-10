import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Upload, 
  Building2, 
  CheckCircle2, 
  Info, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEMO_BUILDINGS } from '../data/campusData';
import { BARRIER_CATEGORIES } from '../components/ReportModal';

export const ReportBarrierPage = () => {
  const { addReport } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Broken elevator',
    building: DEMO_BUILDINGS[0].name,
    locationDetail: '',
    description: '',
    severity: 'Medium',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters long';
    }

    if (!formData.description.trim()) {
      errs.description = 'Please provide details about the barrier';
    } else if (formData.description.trim().length < 15) {
      errs.description = 'Description should be at least 15 characters to assist facilities team';
    }

    if (!formData.building) {
      errs.building = 'Please select a campus building';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    addReport(formData);
    setIsSubmitted(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          Report an Accessibility Barrier
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Spotted a broken elevator, blocked ramp, or damaged sidewalk? Help notify the community and facility managers.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Barrier Report Logged Successfully</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you for helping keep our campus accessible. Your report has been stored to your browser localStorage and is now tracked under Accessibility Reports.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/reports"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 shadow-md transition-colors"
            >
              View Active Reports Dashboard
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  title: '',
                  category: 'Broken elevator',
                  building: DEMO_BUILDINGS[0].name,
                  locationDetail: '',
                  description: '',
                  severity: 'Medium',
                  image: null
                });
                setImagePreview(null);
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
            >
              Report Another Barrier
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Demo Disclaimer notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 mb-6">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> This is an interactive demo platform. Reports submitted here are persisted locally in your browser (localStorage) for testing and demonstration workflows. They are not dispatched to real campus emergency services.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Barrier Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Broken elevator sensor, blocked curb ramp, cracked pathway"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.title ? 'border-rose-300 focus:ring-rose-500' : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.title && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.title}</p>}
            </div>

            {/* Category & Severity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Barrier Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {BARRIER_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Severity Level
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="High">High (Completely obstructs mobility)</option>
                  <option value="Medium">Medium (Major inconvenience or detour)</option>
                  <option value="Low">Low (Minor cosmetic / low impact)</option>
                </select>
              </div>
            </div>

            {/* Building Selection & Specific Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Campus Building <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {DEMO_BUILDINGS.map(bld => (
                    <option key={bld.id} value={bld.name}>{bld.name} ({bld.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Specific Location Detail
                </label>
                <input
                  type="text"
                  placeholder="e.g. North quad entrance ramp, 3rd floor west wing"
                  value={formData.locationDetail}
                  onChange={(e) => setFormData({ ...formData, locationDetail: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Issue Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Explain what is blocked, broken, or in need of maintenance to ensure wheelchair and mobility access..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.description ? 'border-rose-300 focus:ring-rose-500' : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.description && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.description}</p>}
            </div>

            {/* Photo Attachment (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Upload Photo Evidence (Optional)
              </label>

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-w-sm">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-2xl hover:border-indigo-400 hover:bg-slate-50 transition-colors cursor-pointer text-center">
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-700">Attach screenshot or camera photo</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">JPEG, PNG up to 2MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                to="/reports"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Back to All Reports
              </Link>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit Report to Local Registry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

