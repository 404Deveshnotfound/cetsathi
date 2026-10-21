import React from 'react';
import { GitCompare, Search, SlidersHorizontal, Trash2, Plus, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import ComparisonTable from '../components/ComparisonTable';
import EmptyState from '../components/EmptyState';

export default function ComparePage() {
  const { compareList, clearCompare, navigate } = useApp();

  return (
    <div className="compare-page">
      <div className="container">
        <PageHeader
          eyebrow="Side-by-Side Analysis"
          title="Compare college & branch options"
          subtitle="Directly contrast cutoffs, indicative fees, autonomy status, and trade-offs for up to three selections."
          actions={
            compareList.length > 0 && (
              <div className="header-actions-inline">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate('colleges')}
                >
                  <Plus size={14} aria-hidden="true" />
                  <span>Add another college</span>
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm text-danger"
                  onClick={clearCompare}
                >
                  <Trash2 size={14} aria-hidden="true" />
                  <span>Clear shortlist</span>
                </button>
              </div>
            )
          }
        />

        {compareList.length === 0 ? (
          <EmptyState
            icon={GitCompare}
            title="No options selected for comparison"
            description="You can compare up to three colleges or branch streams side-by-side. Browse our recommendations or explore the catalogue to add options."
            actionText="Browse recommendations"
            onAction={() => navigate('recommendations')}
          />
        ) : compareList.length === 1 ? (
          <div>
            <div className="compare-single-notice card">
              <Info size={16} aria-hidden="true" />
              <div>
                <strong>You have 1 college selected:</strong> Add at least one more option to unlock the side-by-side comparison matrix.
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => navigate('recommendations')}
              >
                Find comparison options
              </button>
            </div>
            <ComparisonTable items={compareList} />
          </div>
        ) : (
          <ComparisonTable items={compareList} />
        )}
      </div>
    </div>
  );
}
