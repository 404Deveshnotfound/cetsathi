import React, { useState } from 'react';
import { Menu, X, SlidersHorizontal, GitCompare, Bookmark, FileText, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPercentile } from '../utils/formatters';

export default function TopNavigation() {
  const { currentView, navigate, preferenceList, compareList, profile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Overview' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'colleges', label: 'Find Colleges' },
    { id: 'compare', label: 'Compare', count: compareList.length },
    { id: 'preference-list', label: 'Preference List', count: preferenceList.length },
    { id: 'cap-updates', label: 'CAP Updates' },
    { id: 'methodology', label: 'Methodology' }
  ];

  const handleNavClick = (viewId) => {
    navigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="top-nav-bar">
      <div className="container top-nav-container">
        {/* Brand Wordmark */}
        <div className="brand-group" onClick={() => handleNavClick('landing')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleNavClick('landing')}>
          <div className="brand-logo-mark" aria-hidden="true">
            <span className="brand-letter">CET</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-name">CET Sathi</span>
            <span className="brand-tagline">College planning companion</span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
                {typeof link.count === 'number' && link.count > 0 && (
                  <span className="nav-count-pill tabular">{link.count}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action & Profile Affordance */}
        <div className="nav-right-actions">
          {/* Demo Profile pill */}
          <div
            className="demo-profile-pill"
            onClick={() => handleNavClick('preferences')}
            role="button"
            tabIndex={0}
            title="Click to view or edit profile"
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('preferences')}
          >
            <div className="profile-dot" aria-hidden="true" />
            <div className="profile-info">
              <span className="profile-percentile tabular">{formatPercentile(profile.percentile)} %ile</span>
              <span className="profile-cat-separator">·</span>
              <span className="profile-cat">{profile.category}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm btn-nav-cta"
            onClick={() => handleNavClick('preferences')}
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            <span>Build my list</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="mobile-profile-strip">
            <div className="profile-info-mobile">
              <span className="mobile-profile-label">Current sample profile</span>
              <span className="mobile-profile-val tabular">
                {formatPercentile(profile.percentile)} Percentile · {profile.category} · {profile.candidature}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleNavClick('preferences')}
            >
              Edit
            </button>
          </div>

          <div className="mobile-nav-list">
            <button
              type="button"
              className={`mobile-nav-item ${currentView === 'landing' ? 'active' : ''}`}
              onClick={() => handleNavClick('landing')}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`mobile-nav-item ${currentView === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                <span>{link.label}</span>
                {typeof link.count === 'number' && link.count > 0 && (
                  <span className="nav-count-pill tabular">{link.count}</span>
                )}
              </button>
            ))}
          </div>

          <div className="mobile-nav-footer">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              onClick={() => handleNavClick('preferences')}
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              <span>Build my preference list</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
