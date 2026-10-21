import React from 'react';
import { SlidersHorizontal, ArrowRight, ArrowUpRight, GitCompare, Bookmark, CheckCircle2, AlertCircle, FileText, CalendarDays } from 'lucide-react';
import { useApp } from '../context/AppContext';
import RecommendationCard from '../components/RecommendationCard';
import StatusTag from '../components/StatusTag';
import EmptyState from '../components/EmptyState';
import { formatPercentile, formatCurrency } from '../utils/formatters';
import { CAP_UPDATES } from '../data/mockData';

export default function DashboardPage() {
  const {
    navigate,
    profile,
    recommendations,
    preferenceList,
    removeFromPreferenceList,
    compareList,
    removeFromCompare
  } = useApp();

  const topRecommendations = recommendations.slice(0, 3);

  // Profile completeness check
  const calculateCompleteness = () => {
    let score = 0;
    if (profile.percentile) score += 25;
    if (profile.category) score += 20;
    if (profile.preferredBranches?.length > 0) score += 25;
    if (profile.preferredRegions?.length > 0) score += 15;
    if (profile.feeComfort) score += 15;
    return score;
  };

  const completeness = calculateCompleteness();

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Top Header Area */}
        <header className="dashboard-header card">
          <div className="dash-header-main">
            <div className="dash-title-group">
              <span className="badge badge-demo">Student Planning Workspace</span>
              <h1 className="dash-title">Your CET planning overview</h1>
              <p className="dash-subtitle">
                Review your profile snapshot, saved options, top recommendations, and sample CAP updates.
              </p>
            </div>

            <div className="dash-profile-snapshot">
              <div className="dash-snapshot-item">
                <span className="snapshot-label">Percentile</span>
                <span className="snapshot-val tabular">{formatPercentile(profile.percentile)}</span>
              </div>
              <div className="dash-snapshot-item">
                <span className="snapshot-label">Category</span>
                <span className="snapshot-val">{profile.category}</span>
              </div>
              <div className="dash-snapshot-item">
                <span className="snapshot-label">Domicile</span>
                <span className="snapshot-val">{profile.candidature}</span>
              </div>
              <div className="dash-snapshot-item">
                <span className="snapshot-label">Primary branch</span>
                <span className="snapshot-val">{profile.preferredBranches[0] || 'Any'}</span>
              </div>
            </div>
          </div>

          <div className="dash-header-actions">
            <button
              type="button"
              className="btn btn-secondary btn-md"
              onClick={() => navigate('preferences')}
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              <span>Edit preferences</span>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-md"
              onClick={() => navigate('recommendations')}
            >
              <span>View all recommendations</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* 8/4 Grid Layout */}
        <div className="dashboard-grid">
          {/* Main Column (8 cols) */}
          <main className="dashboard-main-col">
            {/* 1. Recommended Options */}
            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <h2 className="dash-section-title">Top recommended options</h2>
                  <p className="dash-section-subtitle">
                    Sample options matching your {profile.priorityMode.toLowerCase()} orientation and percentile.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => navigate('recommendations')}
                >
                  View all ({recommendations.length}) <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>

              <div className="dash-rec-list">
                {topRecommendations.map((rec, index) => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    rank={index + 1}
                  />
                ))}
              </div>
            </section>

            {/* 2. Preference List Snapshot */}
            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <h2 className="dash-section-title">Saved preference list</h2>
                  <p className="dash-section-subtitle">
                    You have {preferenceList.length} college–branch option{preferenceList.length === 1 ? '' : 's'} organized.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate('preference-list')}
                >
                  <Bookmark size={14} aria-hidden="true" />
                  <span>Open full preference list</span>
                </button>
              </div>

              {preferenceList.length === 0 ? (
                <EmptyState
                  icon={Bookmark}
                  title="No options saved yet"
                  description="Browse recommendations or search colleges to add options to your CAP preference sequence."
                  actionText="Browse recommendations"
                  onAction={() => navigate('recommendations')}
                />
              ) : (
                <div className="dash-pref-card card">
                  <div className="dash-pref-items-preview">
                    {preferenceList.slice(0, 4).map((item, idx) => (
                      <div key={item.id} className="dash-pref-mini-row">
                        <div className="mini-rank tabular">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</div>
                        <div className="mini-details">
                          <strong className="mini-name">{item.collegeName}</strong>
                          <span className="mini-sub">{item.branch} · {item.location}</span>
                        </div>
                        <div className="mini-stats">
                          <StatusTag status={item.fitLabel} size="sm" />
                          <span className="mini-cutoff tabular">{formatPercentile(item.sampleCutoff)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="dash-pref-card-footer">
                    <span className="footer-count-text">
                      Showing {Math.min(4, preferenceList.length)} of {preferenceList.length} saved options
                    </span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => navigate('preference-list')}
                    >
                      Reorder & manage <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* 3. Compare Shortlist */}
            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <h2 className="dash-section-title">Side-by-side comparison ({compareList.length}/3)</h2>
                  <p className="dash-section-subtitle">
                    Quickly evaluate trade-offs between your shortlisted choices.
                  </p>
                </div>
                {compareList.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate('compare')}
                  >
                    <GitCompare size={14} aria-hidden="true" />
                    <span>View full comparison</span>
                  </button>
                )}
              </div>

              {compareList.length === 0 ? (
                <EmptyState
                  icon={GitCompare}
                  title="No colleges selected for comparison"
                  description="Click 'Compare' on any recommendation or college card to compare up to 3 options."
                  actionText="Explore colleges"
                  onAction={() => navigate('colleges')}
                />
              ) : (
                <div className="dash-compare-grid">
                  {compareList.map((item) => (
                    <div key={`${item.collegeId}-${item.branch}`} className="dash-compare-card card">
                      <div className="dash-compare-top">
                        <StatusTag status={item.fitLabel} size="sm" />
                        <button
                          type="button"
                          className="btn-icon-subtle"
                          title="Remove from comparison"
                          onClick={() => removeFromCompare(item.collegeId, item.branch)}
                        >
                          ✕
                        </button>
                      </div>
                      <h4 className="dash-compare-name">{item.collegeName}</h4>
                      <p className="dash-compare-branch">{item.branch}</p>
                      <div className="dash-compare-facts">
                        <div className="fact-line">
                          <span>Cutoff:</span>
                          <strong className="tabular">{formatPercentile(item.sampleCutoff)}</strong>
                        </div>
                        <div className="fact-line">
                          <span>Tuition:</span>
                          <strong className="tabular">{formatCurrency(item.indicativeFee)}</strong>
                        </div>
                        <div className="fact-line">
                          <span>Location:</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {compareList.length < 3 && (
                    <div className="dash-compare-placeholder card" onClick={() => navigate('colleges')} role="button" tabIndex={0}>
                      <span className="placeholder-add">+ Add option to compare</span>
                      <span className="placeholder-sub">Up to 3 options</span>
                    </div>
                  )}
                </div>
              )}
            </section>
          </main>

          {/* Side Column (4 cols) */}
          <aside className="dashboard-side-col">
            {/* Profile Completeness */}
            <div className="side-card card">
              <div className="side-card-header">
                <h3 className="side-card-title">Profile completeness</h3>
                <span className="side-pct tabular">{completeness}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${completeness}%` }} />
              </div>
              <p className="side-card-desc">
                {completeness === 100
                  ? 'All core planning criteria are configured for calibrated recommendations.'
                  : 'Complete all criteria to refine recommendation rankings.'}
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', marginTop: '8px' }}
                onClick={() => navigate('preferences')}
              >
                Refine preferences
              </button>
            </div>

            {/* Priorities Snapshot */}
            <div className="side-card card">
              <h3 className="side-card-title">Active priorities</h3>
              <dl className="priorities-dl">
                <div className="dl-row">
                  <dt>Priority mode</dt>
                  <dd>
                    <span className="badge badge-neutral">{profile.priorityMode}</span>
                  </dd>
                </div>
                <div className="dl-row">
                  <dt>Branch interests</dt>
                  <dd>
                    <div className="chip-list">
                      {profile.preferredBranches.map((b) => (
                        <span key={b} className="chip-small">{b}</span>
                      ))}
                    </div>
                  </dd>
                </div>
                <div className="dl-row">
                  <dt>Target regions</dt>
                  <dd>
                    <div className="chip-list">
                      {profile.preferredRegions.map((r) => (
                        <span key={r} className="chip-small">{r}</span>
                      ))}
                    </div>
                  </dd>
                </div>
                <div className="dl-row">
                  <dt>Annual fee budget</dt>
                  <dd>
                    <strong>{profile.feeComfort}</strong>
                  </dd>
                </div>
                <div className="dl-row">
                  <dt>Commute preference</dt>
                  <dd>{profile.commutePreference}</dd>
                </div>
              </dl>
            </div>

            {/* CAP Updates Compact */}
            <div className="side-card card">
              <div className="side-card-header">
                <h3 className="side-card-title">Sample CAP notices</h3>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => navigate('cap-updates')}
                >
                  All
                </button>
              </div>

              <div className="side-updates-list">
                {CAP_UPDATES.slice(0, 3).map((up) => (
                  <div key={up.id} className="side-update-item" onClick={() => navigate('cap-updates')} role="button" tabIndex={0}>
                    <span className="side-update-date">{up.dateLabel}</span>
                    <h4 className="side-update-title">{up.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
