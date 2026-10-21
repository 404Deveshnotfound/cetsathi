import React from 'react';
import { SlidersHorizontal, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusTag from '../components/StatusTag';
import { formatPercentile } from '../utils/formatters';
import { CAP_UPDATES } from '../data/mockData';

export default function DashboardPage() {
  const {
    navigate,
    profile,
    recommendations
  } = useApp();

  const topRecommendations = recommendations.slice(0, 5);

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
                Review your profile snapshot, top recommended options, and sample CAP updates.
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
            {/* Top Recommended Options (Compressed format) */}
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

              <div className="dash-compressed-list">
                {topRecommendations.map((rec, index) => {
                  const rankNum = index + 1;
                  const formattedRank = rankNum < 10 ? `0${rankNum}` : `${rankNum}`;
                  return (
                    <article
                      key={rec.id}
                      className="dash-compressed-card card"
                      onClick={() => navigate('college-detail', rec.collegeId)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && navigate('college-detail', rec.collegeId)}
                      aria-label={`${formattedRank}: ${rec.collegeName}, ${rec.branch}`}
                    >
                      <div className="dash-compressed-left">
                        <div className="dash-compressed-rank tabular" aria-label={`Option ${formattedRank}`}>
                          {formattedRank}
                        </div>
                        <div className="dash-compressed-info">
                          <div className="dash-compressed-tags">
                            <StatusTag status={rec.fitLabel} size="sm" />
                            <span className="badge badge-neutral">{rec.autonomy}</span>
                            <span className="badge badge-neutral">{rec.type}</span>
                          </div>
                          <h3 className="dash-compressed-name">{rec.collegeName}</h3>
                          <div className="dash-compressed-branch">{rec.branch}</div>
                        </div>
                      </div>

                      <div className="dash-compressed-right">
                        <div className="rec-score-box">
                          <span className="rec-score-label">Preference match</span>
                          <span className="rec-score-val tabular">{rec.preferenceMatchScore}/100</span>
                          <span className="rec-score-sub">demo score</span>
                        </div>
                        <ArrowUpRight size={16} className="dash-compressed-arrow" aria-hidden="true" />
                      </div>
                    </article>
                  );
                })}
              </div>
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
