import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown, Bookmark, GitCompare, RotateCcw, Filter, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import RecommendationCard from '../components/RecommendationCard';
import StatusTag from '../components/StatusTag';
import EmptyState from '../components/EmptyState';
import { formatPercentile, formatCurrency } from '../utils/formatters';
import { BRANCH_LIST, REGION_LIST, COLLEGE_TYPES } from '../data/mockData';

export default function RecommendationsPage() {
  const {
    recommendations,
    profile,
    navigate,
    compareList,
    preferenceList
  } = useApp();

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAutonomy, setSelectedAutonomy] = useState('All');
  const [selectedFit, setSelectedFit] = useState('All'); // 'All' | 'Ambitious' | 'Target' | 'Safer option'
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'fees-asc' | 'cutoff-desc' | 'cutoff-asc'

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedBranch('All');
    setSelectedRegion('All');
    setSelectedType('All');
    setSelectedAutonomy('All');
    setSelectedFit('All');
    setSortBy('recommended');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedBranch !== 'All' ||
    selectedRegion !== 'All' ||
    selectedType !== 'All' ||
    selectedAutonomy !== 'All' ||
    selectedFit !== 'All';

  // Filtered & Sorted Recommendations
  const filteredList = useMemo(() => {
    let result = [...recommendations];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.collegeName.toLowerCase().includes(q) ||
          r.branch.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q)
      );
    }

    // Branch filter
    if (selectedBranch !== 'All') {
      result = result.filter((r) => r.branch.toLowerCase().includes(selectedBranch.toLowerCase()));
    }

    // Region filter
    if (selectedRegion !== 'All') {
      result = result.filter((r) => r.region === selectedRegion);
    }

    // Type filter
    if (selectedType !== 'All') {
      result = result.filter((r) => r.type === selectedType);
    }

    // Autonomy filter
    if (selectedAutonomy !== 'All') {
      result = result.filter((r) => r.autonomy === selectedAutonomy);
    }

    // Fit group filter
    if (selectedFit !== 'All') {
      result = result.filter((r) => r.fitLabel === selectedFit);
    }

    // Sorting
    if (sortBy === 'fees-asc') {
      result.sort((a, b) => a.indicativeFee - b.indicativeFee);
    } else if (sortBy === 'cutoff-desc') {
      result.sort((a, b) => b.sampleCutoff - a.sampleCutoff);
    } else if (sortBy === 'cutoff-asc') {
      result.sort((a, b) => a.sampleCutoff - b.sampleCutoff);
    } else {
      // default: recommended order by match score
      result.sort((a, b) => b.preferenceMatchScore - a.preferenceMatchScore);
    }

    return result;
  }, [recommendations, searchQuery, selectedBranch, selectedRegion, selectedType, selectedAutonomy, selectedFit, sortBy]);

  return (
    <div className="recommendations-page">
      <div className="container">
        {/* Header and Summary */}
        <PageHeader
          eyebrow="Calibrated Decision Support"
          title="Recommended for your profile"
          subtitle="Ordered using your selected priorities, branch focus, and illustrative previous-round cutoff data."
          actions={
            <div className="header-actions-inline">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('preferences')}
              >
                <SlidersHorizontal size={14} aria-hidden="true" />
                <span>Edit preferences</span>
              </button>
              {compareList.length > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate('compare')}
                >
                  <GitCompare size={14} aria-hidden="true" />
                  <span>Compare ({compareList.length})</span>
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => navigate('preference-list')}
              >
                <Bookmark size={14} aria-hidden="true" />
                <span>My preference list ({preferenceList.length})</span>
              </button>
            </div>
          }
        />

        {/* Profile Summary Strip */}
        <section className="profile-summary-strip card" aria-label="Profile summary context">
          <div className="summary-strip-inner">
            <div className="summary-chip">
              <span className="summary-label">Percentile:</span>
              <strong className="summary-val tabular">{formatPercentile(profile.percentile)}</strong>
            </div>
            <div className="summary-chip">
              <span className="summary-label">Category:</span>
              <strong className="summary-val">{profile.category} ({profile.candidature})</strong>
            </div>
            <div className="summary-chip">
              <span className="summary-label">Top Branch:</span>
              <strong className="summary-val">{profile.preferredBranches[0] || 'Any'}</strong>
            </div>
            <div className="summary-chip">
              <span className="summary-label">Orientation:</span>
              <strong className="summary-val">{profile.priorityMode}</strong>
            </div>
            <div className="summary-chip">
              <span className="summary-label">Fee Comfort:</span>
              <strong className="summary-val">{profile.feeComfort}</strong>
            </div>
          </div>
        </section>

        {/* Fit Tier Category Tabs */}
        <div className="fit-tabs-row" role="tablist" aria-label="Fit categories">
          {[
            { id: 'All', label: 'All recommendations' },
            { id: 'Ambitious', label: 'Ambitious options' },
            { id: 'Target', label: 'Target options' },
            { id: 'Safer option', label: 'Safer options' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selectedFit === tab.id}
              className={`fit-tab-btn ${selectedFit === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedFit(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search, Filter & Sort Bar */}
        <div className="controls-card card">
          <div className="controls-top-row">
            {/* Search input */}
            <div className="search-field-wrapper">
              <Search size={16} className="search-icon" aria-hidden="true" />
              <input
                type="search"
                className="search-input"
                placeholder="Search by college name, branch, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search recommendations"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort selector */}
            <div className="sort-field-wrapper">
              <ArrowUpDown size={14} className="sort-icon" aria-hidden="true" />
              <label htmlFor="rec-sort" className="visually-hidden">Sort options by</label>
              <select
                id="rec-sort"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Sort: Recommended order</option>
                <option value="fees-asc">Sort: Lowest fees first</option>
                <option value="cutoff-desc">Sort: Highest previous cutoff</option>
                <option value="cutoff-asc">Sort: Lowest previous cutoff</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters Row */}
          <div className="controls-filters-row">
            <div className="filter-select-group">
              <label htmlFor="filter-branch">Branch</label>
              <select
                id="filter-branch"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="All">All branches</option>
                {BRANCH_LIST.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="filter-select-group">
              <label htmlFor="filter-region">Region</label>
              <select
                id="filter-region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="All">All regions</option>
                {REGION_LIST.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="filter-select-group">
              <label htmlFor="filter-type">Type</label>
              <select
                id="filter-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All college types</option>
                {COLLEGE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="filter-select-group">
              <label htmlFor="filter-autonomy">Autonomy</label>
              <select
                id="filter-autonomy"
                value={selectedAutonomy}
                onChange={(e) => setSelectedAutonomy(e.target.value)}
              >
                <option value="All">Autonomous & Non-autonomous</option>
                <option value="Autonomous">Autonomous only</option>
                <option value="Non-autonomous">Non-autonomous only</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="active-filters-strip">
              <span className="active-filters-label">Active filters:</span>
              {searchQuery && (
                <span className="filter-chip">
                  Search: "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery('')} aria-label="Remove search filter">
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedFit !== 'All' && (
                <span className="filter-chip">
                  Fit: {selectedFit}
                  <button type="button" onClick={() => setSelectedFit('All')} aria-label="Remove fit filter">
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedBranch !== 'All' && (
                <span className="filter-chip">
                  Branch: {selectedBranch}
                  <button type="button" onClick={() => setSelectedBranch('All')} aria-label="Remove branch filter">
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedRegion !== 'All' && (
                <span className="filter-chip">
                  Region: {selectedRegion}
                  <button type="button" onClick={() => setSelectedRegion('All')} aria-label="Remove region filter">
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedType !== 'All' && (
                <span className="filter-chip">
                  Type: {selectedType}
                  <button type="button" onClick={() => setSelectedType('All')} aria-label="Remove type filter">
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedAutonomy !== 'All' && (
                <span className="filter-chip">
                  Autonomy: {selectedAutonomy}
                  <button type="button" onClick={() => setSelectedAutonomy('All')} aria-label="Remove autonomy filter">
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                type="button"
                className="btn-clear-filters"
                onClick={handleClearFilters}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count and Caveat */}
        <div className="results-summary-row">
          <span className="results-count">
            Showing <strong>{filteredList.length}</strong> option{filteredList.length === 1 ? '' : 's'}
          </span>
          <span className="results-caveat">
            "Safer" denotes historical cushion against sample cutoffs, never an admission guarantee.
          </span>
        </div>

        {/* Recommendations List */}
        {filteredList.length === 0 ? (
          <EmptyState
            icon={Filter}
            title="No matching options found"
            description="No colleges match your current search and filter combination. Try clearing some filters."
            actionText="Clear all filters"
            onAction={handleClearFilters}
          />
        ) : (
          <div className="recommendations-list">
            {filteredList.map((rec, index) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                rank={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
