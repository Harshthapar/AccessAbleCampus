import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Eye, 
  Sparkles, 
  RotateCcw, 
  Trash2, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2,
  Info,
  SlidersHorizontal,
  Moon,
  Sun,
  Type
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { 
    settings, 
    updateSettings, 
    resetAllData, 
    clearSavedFacilities, 
    savedFacilityIds,
    reports 
  } = useApp();

  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showConfirmClearSaved, setShowConfirmClearSaved] = useState(false);

  const handleTextSizeChange = (size) => {
    updateSettings({ textSize: size });
  };

  const handleToggleContrast = () => {
    updateSettings({ highContrast: !settings.highContrast });
  };

  const handleToggleReducedMotion = () => {
    updateSettings({ reducedMotion: !settings.reducedMotion });
  };

  const handleToggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const handleRoutingPreferenceChange = (key, value) => {
    updateSettings({
      preferredRouting: {
        ...settings.preferredRouting,
        [key]: value
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-indigo-600" />
          Accessibility & Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize interface accessibility parameters, font scale, contrast modes, and routing preferences.
        </p>
      </div>

      {/* Accessibility Preferences Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Visual & Interaction Accessibility</h2>
            <p className="text-xs text-slate-500">Settings persist immediately across the entire application</p>
          </div>
        </div>

        {/* Text Size Adjustment */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-indigo-600" />
            Adjustable Text Size
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'sm', label: 'Compact', sample: 'Aa (Small)' },
              { id: 'base', label: 'Default', sample: 'Aa (Normal)' },
              { id: 'lg', label: 'Large', sample: 'Aa (112%)' },
              { id: 'xl', label: 'Extra Large', sample: 'Aa (125%)' },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTextSizeChange(item.id)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  settings.textSize === item.id
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold ring-2 ring-indigo-500/30'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                }`}
              >
                <div className="text-base font-bold mb-0.5">{item.sample}</div>
                <div className="text-[11px] text-slate-500">{item.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-slate-900">High Contrast Mode</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enforces maximum contrast dark backgrounds, vibrant text, and pronounced focus outlines.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleContrast}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              settings.highContrast ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
            role="switch"
            aria-checked={settings.highContrast}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                settings.highContrast ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Reduced Motion</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Disables CSS animations, smooth fly-to zooms, and slide transitions for vestibular safety.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleReducedMotion}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              settings.reducedMotion ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
            role="switch"
            aria-checked={settings.reducedMotion}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Preferred Route Options Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Default Route Preferences</h2>
            <p className="text-xs text-slate-500">Automatically populated when initiating new path calculations</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { key: 'avoidStairs', label: 'Strictly Avoid Stairs', desc: 'Eliminates segments featuring exterior steps or historic curbstones' },
            { key: 'preferRamps', label: 'Prefer Verified Ramps', desc: 'Weights ramps with continuous dual handrails higher' },
            { key: 'preferElevators', label: 'Prioritize Elevators', desc: 'Selects indoor elevator connections where multi-level transitions exist' },
            { key: 'preferAccessibleEntrances', label: 'Target Automated Entrances', desc: 'Guides you directly towards sensor or motorized push-plate doors' },
          ].map(pref => (
            <label key={pref.key} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={settings.preferredRouting?.[pref.key] ?? false}
                onChange={(e) => handleRoutingPreferenceChange(pref.key, e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">{pref.label}</span>
                <span className="text-[11px] text-slate-500 leading-tight block">{pref.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Application Data & Reset Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Application Storage & Reset</h2>
            <p className="text-xs text-slate-500">Manage client-side localStorage state and sample campus records</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Clear Saved Facilities */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Clear Saved Favorites</h4>
              <p className="text-xs text-slate-500 mt-1">
                You currently have <strong>{savedFacilityIds.length}</strong> facilities saved for offline access.
              </p>
            </div>

            <div className="mt-4">
              {showConfirmClearSaved ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      clearSavedFacilities();
                      setShowConfirmClearSaved(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs"
                  >
                    Confirm Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmClearSaved(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmClearSaved(true)}
                  disabled={savedFacilityIds.length === 0}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold disabled:opacity-50"
                >
                  Clear Saved List
                </button>
              )}
            </div>
          </div>

          {/* Reset All Demo Data */}
          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/40 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-rose-950">Reset Demo Data & Settings</h4>
              <p className="text-xs text-rose-800/80 mt-1">
                Restores all initial demo facilities, default barrier reports, and wipes custom storage.
              </p>
            </div>

            <div className="mt-4">
              {showConfirmReset ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetAllData();
                      setShowConfirmReset(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs"
                  >
                    Confirm Full Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(true)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Reset To Defaults
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

