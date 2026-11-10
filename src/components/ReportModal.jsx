import React from 'react';
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  Upload, 
  Building2, 
  CheckCircle,
  Info
} from 'lucide-react';
import { DEMO_BUILDINGS } from '../data/campusData';

export const BARRIER_CATEGORIES = [
  'Broken elevator',
  'Blocked ramp',
  'Inaccessible entrance',
  'Damaged pathway',
  'Missing accessibility signage',
  'Accessible Washroom',
  'Other accessibility barriers'
];

export const ReportModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    category: 'Broken elevator',
    building: DEMO_BUILDINGS[0].name,
    locationDetail: '',
    description: '',
    severity: 'Medium',
    image: null
  });

  const [errors, setErrors] = React.useState({});
  const [imagePreview, setImagePreview] = React.useState(null);

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'Broken elevator',
        building: initialData.building || DEMO_BUILDINGS[0].name,
        locationDetail: initialData.locationDetail || '',
        description: initialData.description || '',
        severity: initialData.severity || 'Medium',
        image: initialData.image || null
      });
      setImagePreview(initialData.image || null);
    } else {
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
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

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
    onSubmit(formData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {initialData ? 'Edit Barrier Report' : 'Report Accessibility Barrier'}
              </h2>
              <p className="text-xs text-slate-500">
                Help improve campus accessibility by reporting obstacles
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Demo Disclaimer notice */}
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
            <p>
              Reports are saved securely to your browser localStorage for demonstration and prototype tracking.
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Issue Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Science Library automatic door opener motor failed"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                errors.title ? 'border-rose-300 focus:ring-rose-500' : 'border-slate-300 focus:ring-indigo-500'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.title}</p>}
          </div>

          {/* Category & Severity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Barrier Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="High">High (Completely blocks transit)</option>
                <option value="Medium">Medium (Difficult or requires detour)</option>
                <option value="Low">Low (Inconvenient / minor defect)</option>
              </select>
            </div>
          </div>

          {/* Building Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Campus Building <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {DEMO_BUILDINGS.map(bld => (
                  <option key={bld.id} value={bld.name}>{bld.name} ({bld.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Specific Location Details
              </label>
              <input
                type="text"
                placeholder="e.g. 2nd floor corridor by Room 204"
                value={formData.locationDetail}
                onChange={(e) => setFormData({ ...formData, locationDetail: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describe the barrier, obstruction details, or physical accessibility concern..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                errors.description ? 'border-rose-300 focus:ring-rose-500' : 'border-slate-300 focus:ring-indigo-500'
              }`}
            />
            {errors.description && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.description}</p>}
          </div>

          {/* Photo Attachment (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Photo Evidence (Optional Preview)
            </label>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-2xl hover:border-indigo-400 hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-medium text-slate-600">Click to upload an image from device</span>
                <span className="text-[11px] text-slate-400">PNG, JPG up to 2MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
            {errors.image && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.image}</p>}
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors"
            >
              {initialData ? 'Update Report' : 'Submit Barrier Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

