import React from 'react';
import { MapPin, Wallet, ArrowUpRight, GitCompare, Bookmark, Check } from 'lucide-react';
import { formatCurrency, formatPercentile } from '../utils/formatters';
import { useApp } from '../context/AppContext';

export default function CollegeCard({ college }) {
  const { navigate, compareList, toggleCompare, preferenceList, addToPreferenceList } = useApp();

  const primaryBranch = college.branches[0];

  const isCompared = compareList.some((c) => c.collegeId === college.id);

  return (
    <article className="college-card card">
      <div className="college-card-header">
        <div className="college-card-tags">
          <span className="badge badge-neutral">{college.autonomy}</span>
          <span className="badge badge-neutral">{college.type}</span>
          <span className="badge badge-neutral">Est. {college.established}</span>
        </div>
        <h3 className="college-card-title">{college.name}</h3>
        <p className="college-card-location">
          <MapPin size={14} className="inline-icon" aria-hidden="true" />
          {college.location} · {college.region}
        </p>
      </div>

      <p className="college-card-desc">{college.overview}</p>

      <div className="college-card-meta">
        <div className="college-card-stat">
          <span className="stat-label">Indicative annual tuition</span>
          <span className="stat-val tabular">{formatCurrency(college.indicativeFee)}</span>
        </div>
        <div className="college-card-stat">
          <span className="stat-label">Sample cutoff range</span>
          <span className="stat-val tabular">
            {formatPercentile(college.branches[college.branches.length - 1].sampleCutoff)} – {formatPercentile(college.branches[0].sampleCutoff)}
          </span>
        </div>
      </div>

      <div className="college-card-branches">
        <span className="branches-label">Sample branch programs ({college.branches.length}):</span>
        <div className="branches-pills">
          {college.branches.map((b) => (
            <span key={b.id} className="branch-pill">
              {b.name} <span className="branch-cutoff tabular">({b.sampleCutoff})</span>
            </span>
          ))}
        </div>
      </div>

      <div className="college-card-footer">
        <button
          type="button"
          className={`btn btn-sm ${isCompared ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => {
            toggleCompare({
              id: `rec-${college.id}-${primaryBranch.id}`,
              collegeId: college.id,
              collegeName: college.name,
              branch: primaryBranch.name,
              location: college.location,
              region: college.region,
              type: college.type,
              autonomy: college.autonomy,
              indicativeFee: college.indicativeFee,
              sampleCutoff: primaryBranch.sampleCutoff,
              sampleRound: primaryBranch.sampleRound,
              fitLabel: 'Target',
              preferenceMatchScore: 88,
              tradeOffs: 'Standard option profile based on catalog data.'
            });
          }}
        >
          <GitCompare size={14} aria-hidden="true" />
          {isCompared ? 'Compared' : 'Compare'}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('college-detail', college.id)}
        >
          <span>View college</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
