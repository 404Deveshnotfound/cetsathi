import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Filter, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import CollegeCard from '../components/CollegeCard';
import EmptyState from '../components/EmptyState';
import { COLLEGES, BRANCH_LIST, REGION_LIST, COLLEGE_TYPES, FEE_RANGES } from '../data/mockData';

export default function ExploreCollegesPage() {
  const { navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAutonomy, setSelectedAutonomy] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [maxFee, setMaxFee] = useState('All');

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedType('All');
    setSelectedAutonomy('All');
    setSelectedBranch('All');
    setMaxFee('All');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedRegion !== 'All' ||
    selectedType !== 'All' ||
    selectedAutonomy !== 'All' ||
    selectedBranch !== 'All' ||
    maxFee !== 'All';

  const filteredColleges = useMemo(() => {
    return COLLEGES.filter((col) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = col.name.toLowerCase().includes(q);
        const matchesLoc = col.location.toLowerCase().includes(q) || col.region.toLowerCase().includes(q);
        const matchesBranch = col.branches.some((b) => b.name.toLowerCase().includes(q));
        if (!matchesName && !matchesLoc && !matchesBranch) return false;
      }

      // Region
      if (selectedRegion !== 'All' && col.region !== selectedRegion) {
        return false;
      }

      // Type
      if (selectedType !== 'All' && col.type !== selectedType) {
        return false;
      }

      // Autonomy
      if (selectedAutonomy !== 'All' && col.autonomy !== selectedAutonomy) {
        return false;
      }

      // Branch
      if (selectedBranch !== 'All') {
        const hasBranch = col.branches.some((b) => b.name.toLowerCase().includes(selectedBranch.toLowerCase()));
        if (!hasBranch) return false;
      }

      // Fee
      if (maxFee !== 'All') {
        const threshold = parseInt(maxFee, 10);
        if (col.indicativeFee > threshold) return false;
      }

      return true;
    });
  }, [searchQuery, selectedRegion, selectedType, selectedAutonomy, selectedBranch, maxFee]);

  return (
    <div className="explore-page">
      <div className="container">
        <PageHeader
          eyebrow="Sample Catalogue"
          title="Explore engineering colleges"
          subtitle="Search and filter our illustrative institutional dataset across locations, university autonomy, and tuition tiers."
        />

        <div className="explore-layout">
          {/* Filter Sidebar (Desktop) */}
          <aside className="explore-filter-sidebar card">
            <div className="sidebar-filter-header">
              <div className="filter-title-group">
                <Filter size={16} aria-hidden="true" />
                <h3 className="filter-heading">Filter catalogue</h3>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="btn-text-subtle"
                  onClick={handleClearFilters}
                >
                  Reset
                </button>
              )}
            </div>

            {/* Region Filter */}
            <div className="filter-block">
              <label htmlFor="exp-region">Location / Region</label>
              <select
                id="exp-region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="All">All regions</option>
                {REGION_LIST.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Branch Filter */}
            <div className="filter-block">
              <label htmlFor="exp-branch">Branch offering</label>
              <select
                id="exp-branch"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="All">All branches</option>
                {BRANCH_LIST.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* College Type */}
            <div className="filter-block">
              <label htmlFor="exp-type">Institution category</label>
              <select
                id="exp-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All categories</option>
                {COLLEGE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Autonomy */}
            <div className="filter-block">
              <label htmlFor="exp-autonomy">Autonomy status</label>
              <select
                id="exp-autonomy"
                value={selectedAutonomy}
                onChange={(e) => setSelectedAutonomy(e.target.value)}
              >
                <option value="All">All statuses</option>
                <option value="Autonomous">Autonomous only</option>
                <option value="Non-autonomous">Non-autonomous only</option>
              </select>
            </div>

            {/* Max Tuition */}
            <div className="filter-block">
              <label htmlFor="exp-fee">Maximum annual tuition</label>
              <select
                id="exp-fee"
                value={maxFee}
                onChange={(e) => setMaxFee(e.target.value)}
              >
                <option value="All">Any tuition level</option>
                <option value="80000">Up to ₹80,000</option>
                <option value="120000">Up to ₹1,20,000</option>
                <option value="150000">Up to ₹1,50,000</option>
              </select>
            </div>
          </aside>

          {/* Main Results Area */}
          <main className="explore-main-col">
            {/* Search Input Bar */}
            <div className="explore-search-bar card">
              <Search size={18} className="search-icon" aria-hidden="true" />
              <input
                type="search"
                className="explore-search-input"
                placeholder="Search college name, area, or branch programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search college catalogue"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Active Chips Strip */}
            {hasActiveFilters && (
              <div className="active-filters-strip">
                <span className="active-filters-label">Active:</span>
                {searchQuery && (
                  <span className="filter-chip">
                    Search: "{searchQuery}"
                    <button type="button" onClick={() => setSearchQuery('')}><X size={12} /></button>
                  </span>
                )}
                {selectedRegion !== 'All' && (
                  <span className="filter-chip">
                    Region: {selectedRegion}
                    <button type="button" onClick={() => setSelectedRegion('All')}><X size={12} /></button>
                  </span>
                )}
                {selectedBranch !== 'All' && (
                  <span className="filter-chip">
                    Branch: {selectedBranch}
                    <button type="button" onClick={() => setSelectedBranch('All')}><X size={12} /></button>
                  </span>
                )}
                {selectedType !== 'All' && (
                  <span className="filter-chip">
                    Type: {selectedType}
                    <button type="button" onClick={() => setSelectedType('All')}><X size={12} /></button>
                  </span>
                )}
                {selectedAutonomy !== 'All' && (
                  <span className="filter-chip">
                    Autonomy: {selectedAutonomy}
                    <button type="button" onClick={() => setSelectedAutonomy('All')}><X size={12} /></button>
                  </span>
                )}
                {maxFee !== 'All' && (
                  <span className="filter-chip">
                    Fee: ≤ ₹{parseInt(maxFee, 10).toLocaleString('en-IN')}
                    <button type="button" onClick={() => setMaxFee('All')}><X size={12} /></button>
                  </span>
                )}

                <button
                  type="button"
                  className="btn-clear-filters"
                  onClick={handleClearFilters}
                >
                  Reset all
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="results-summary-row">
              <span className="results-count">
                Showing <strong>{filteredColleges.length}</strong> college{filteredColleges.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* Colleges Grid */}
            {filteredColleges.length === 0 ? (
              <EmptyState
                icon={Filter}
                title="No colleges match your criteria"
                description="Try relaxing your filters or clear your search term to see more sample institutions."
                actionText="Reset filters"
                onAction={handleClearFilters}
              />
            ) : (
              <div className="colleges-grid">
                {filteredColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
