import React, { useState } from 'react';
import { ArrowRight, SlidersHorizontal, Search, CheckCircle2, GitCompare, Bookmark, CalendarDays, FileText, ArrowUpRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRANCH_LIST, REGION_LIST, CAP_UPDATES } from '../data/mockData';
import { formatPercentile, formatCurrency } from '../utils/formatters';

export default function LandingPage() {
  const { navigate, profile, setProfile, showToast } = useApp();

  const [quickPercentile, setQuickPercentile] = useState(profile.percentile.toString());
  const [quickBranch, setQuickBranch] = useState(profile.preferredBranches[0] || 'Computer Engineering');
  const [quickRegion, setQuickRegion] = useState(profile.preferredRegions[0] || 'Mumbai');

  const handleQuickStartSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(quickPercentile);
    if (isNaN(val) || val < 0 || val > 100) {
      showToast('Please enter a valid percentile between 0 and 100.');
      return;
    }
    setProfile({
      ...profile,
      percentile: val,
      preferredBranches: [quickBranch],
      preferredRegions: [quickRegion]
    });
    navigate('recommendations');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          {/* Left Column: Value Proposition */}
          <div className="hero-copy-col">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span>MHT-CET · CAP ADMISSIONS</span>
            </div>

            <h1 className="hero-heading">
              Make your college choices with more clarity.
            </h1>

            <p className="hero-body">
              Compare colleges and branches using cutoff trends, fees, location, and your priorities. Build an ordered preference list you can understand and adjust.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigate('preferences')}
              >
                <SlidersHorizontal size={18} aria-hidden="true" />
                <span>Build my list</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('colleges')}
              >
                <Search size={18} aria-hidden="true" />
                <span>Explore colleges</span>
              </button>
            </div>

            <div className="hero-trust-note">
              <ShieldCheck size={16} className="trust-icon" aria-hidden="true" />
              <span>This prototype uses illustrative data. Historical cutoffs are not admission guarantees.</span>
            </div>
          </div>

          {/* Right Column: Recommendation Preview Card (UI graphic, not stock photo) */}
          <div className="hero-visual-col">
            <div className="hero-preview-card card">
              <div className="preview-card-header">
                <div className="preview-profile-badge">
                  <span className="preview-profile-label">Sample profile</span>
                  <strong className="preview-profile-score tabular">92.40 percentile</strong>
                </div>
                <span className="badge badge-demo">Demo Data</span>
              </div>

              <div className="preview-fit-indicators">
                <div className="preview-fit-item">
                  <span className="fit-name">Branch fit</span>
                  <div className="fit-pill fit-pill-high">Strong</div>
                </div>
                <div className="preview-fit-item">
                  <span className="fit-name">Fee comfort</span>
                  <div className="fit-pill fit-pill-med">Within range</div>
                </div>
                <div className="preview-fit-item">
                  <span className="fit-name">Location</span>
                  <div className="fit-pill fit-pill-high">Preferred area</div>
                </div>
              </div>

              <div className="preview-options-list">
                <div className="preview-option-item">
                  <div className="preview-option-top">
                    <span className="preview-option-name">Western Metro Engg (Demo)</span>
                    <span className="badge badge-target">Target</span>
                  </div>
                  <div className="preview-option-details">
                    <span>Information Technology</span>
                    <span className="tabular">Cutoff: 91.60</span>
                    <span className="tabular">₹1.10L / yr</span>
                  </div>
                </div>

                <div className="preview-option-item">
                  <div className="preview-option-top">
                    <span className="preview-option-name">Lakeside Tech (Demo)</span>
                    <span className="badge badge-safer">Safer based on sample cutoff</span>
                  </div>
                  <div className="preview-option-details">
                    <span>Information Technology</span>
                    <span className="tabular">Cutoff: 87.40</span>
                    <span className="tabular">₹95K / yr</span>
                  </div>
                </div>
              </div>

              <div className="preview-card-footer">
                <button
                  type="button"
                  className="preview-footer-link"
                  onClick={() => navigate('recommendations')}
                >
                  <span>Explore 6 sample recommendations</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick-Start Panel */}
      <section className="quick-start-section">
        <div className="container">
          <div className="quick-start-panel card">
            <div className="quick-start-header">
              <h2 className="quick-start-title">Quick start recommendation preview</h2>
              <p className="quick-start-subtitle">
                Enter your MHT-CET score to view sample branch alignment and cutoff contexts.
              </p>
            </div>

            <form onSubmit={handleQuickStartSubmit} className="quick-start-form">
              <div className="quick-input-group">
                <label htmlFor="quick-percentile">MHT-CET percentile</label>
                <input
                  id="quick-percentile"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={quickPercentile}
                  onChange={(e) => setQuickPercentile(e.target.value)}
                  placeholder="e.g. 92.40"
                  required
                />
              </div>

              <div className="quick-input-group">
                <label htmlFor="quick-branch">Preferred branch</label>
                <select
                  id="quick-branch"
                  value={quickBranch}
                  onChange={(e) => setQuickBranch(e.target.value)}
                >
                  {BRANCH_LIST.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="quick-input-group">
                <label htmlFor="quick-region">Preferred area</label>
                <select
                  id="quick-region"
                  value={quickRegion}
                  onChange={(e) => setQuickRegion(e.target.value)}
                >
                  {REGION_LIST.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="quick-btn-group">
                <button type="submit" className="btn btn-primary btn-md">
                  <span>View sample recommendations</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-head text-center">
            <span className="section-eyebrow">Structured Process</span>
            <h2 className="section-title">How CET Sathi supports your planning</h2>
            <p className="section-subtitle">
              A transparent 3-step workflow designed to replace confusing spreadsheets.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card card">
              <div className="step-number tabular">1</div>
              <h3 className="step-title">Share your priorities</h3>
              <p className="step-body">
                Specify your CET percentile, admission category, branch interests, location radius, and annual fee comfort level.
              </p>
            </div>

            <div className="step-card card">
              <div className="step-number tabular">2</div>
              <h3 className="step-title">Explore suitable options</h3>
              <p className="step-body">
                Review tailored options categorized as Ambitious, Target, and Safer with clear explanations and trade-off summaries.
              </p>
            </div>

            <div className="step-card card">
              <div className="step-number tabular">3</div>
              <h3 className="step-title">Build your list</h3>
              <p className="step-body">
                Compare colleges side-by-side, adjust rank positions with up/down controls, and export a thoughtful reference list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards (3 or 4 maximum) */}
      <section className="features-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Key Capabilities</span>
            <h2 className="section-title">Designed for informed college decisions</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon-box" aria-hidden="true">
                <SlidersHorizontal size={22} />
              </div>
              <h3 className="feature-title">Personalized college–branch list</h3>
              <p className="feature-desc">
                Recommendations balanced across your branch passion and institutional preferences rather than a single blunt cutoff number.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon-box" aria-hidden="true">
                <GitCompare size={22} />
              </div>
              <h3 className="feature-title">Side-by-side college comparison</h3>
              <p className="feature-desc">
                Compare up to three choices across tuition, autonomy, location, previous cutoff context, and specific trade-offs.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon-box" aria-hidden="true">
                <CalendarDays size={22} />
              </div>
              <h3 className="feature-title">Cutoff & CAP round context</h3>
              <p className="feature-desc">
                Learn how rounds function, understand Float vs Freeze choices, and keep sample checklists handy before option form submission.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon-box" aria-hidden="true">
                <FileText size={22} />
              </div>
              <h3 className="feature-title">Explanations for every suggestion</h3>
              <p className="feature-desc">
                No opaque probabilities. View the exact priority breakdown and rationale explaining why an option appears on your list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAP Updates Preview */}
      <section className="updates-preview-section">
        <div className="container">
          <div className="updates-preview-header">
            <div>
              <span className="section-eyebrow">CAP Context</span>
              <h2 className="section-title">Sample admission updates</h2>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('cap-updates')}
            >
              <span>View all updates</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>

          <div className="updates-preview-list">
            {CAP_UPDATES.slice(0, 3).map((up) => (
              <div key={up.id} className="update-preview-item card" onClick={() => navigate('cap-updates')} role="button" tabIndex={0}>
                <div className="update-meta-row">
                  <span className="badge badge-neutral">{up.category}</span>
                  <span className="update-date">{up.dateLabel}</span>
                </div>
                <h4 className="update-preview-title">{up.title}</h4>
                <p className="update-preview-summary">{up.summary}</p>
                <div className="update-source-tag">
                  <span className="source-label">{up.source}</span>
                  <span className="read-more">Read details <ArrowUpRight size={13} aria-hidden="true" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bottom-cta-section">
        <div className="container">
          <div className="cta-banner-card card">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Ready to organize your CAP options?</h2>
              <p className="cta-banner-text">
                Start with our sample student profile or enter your own priorities to build a customized, ordered preference list.
              </p>
            </div>
            <div className="cta-banner-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigate('preferences')}
              >
                <SlidersHorizontal size={18} aria-hidden="true" />
                <span>Build my preference list</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
