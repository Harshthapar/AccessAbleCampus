import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Trash2,
  Edit3,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ReportCard } from '../components/ReportCard';
import { ReportModal, BARRIER_CATEGORIES } from '../components/ReportModal';

export const AccessibilityReportsPage = () => {
  const { reports, addReport, updateReport, deleteReport } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  // Metrics
  const total = reports.length;
  const submittedCount = reports.filter(r => r.status === 'Submitted').length;
  const underReviewCount = reports.filter(r => r.status === 'Under Review').length;
  const resolvedCount = reports.filter(r => r.status === 'Resolved').length;

  // Filter & Sort
  const filteredReports = reports.filter(rep => {
    if (selectedCategory !== 'All' && rep.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && rep.status !== selectedStatus) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rep.title.toLowerCase().includes(q);
      const matchBuilding = rep.building.toLowerCase().includes(q);
      const matchDesc = rep.description.toLowerCase().includes(q);
      if (!matchTitle && !matchBuilding && !matchDesc) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  const handleOpenCreateModal = () => {
    setEditingReport(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (report) => {
    setEditingReport(report);
    setIsModalOpen(true);
  };

  const handleSaveModal = (formData) => {
    if (editingReport) {
      updateReport(editingReport.id, formData);
    } else {
      addReport(formData);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateReport(id, { status: newStatus });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            Accessibility Reports Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor reported barriers, verify inspection statuses, and track repairs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Barrier Report</span>
        </button>
      </div>

      {/* 4 Summary Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reports</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{total}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Submitted
          </span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{submittedCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Under Review
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">{underReviewCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Resolved
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{resolvedCount}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, building, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Categories</option>
              {BARRIER_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              onEdit={handleOpenEditModal}
              onDelete={deleteReport}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No reports found</h3>
          <p className="text-xs text-slate-500">
            No barrier reports matched your selected filter criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Report Edit / Create Modal */}
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingReport}
        onSubmit={handleSaveModal}
      />
    </div>
  );
};

