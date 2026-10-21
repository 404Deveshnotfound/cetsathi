import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="brand-group" onClick={() => navigate('landing')} role="button" tabIndex={0}>
              <div className="brand-logo-mark" aria-hidden="true">
                <span className="brand-letter">CET</span>
              </div>
              <div className="brand-text-block">
                <span className="brand-name">CET Sathi</span>
                <span className="brand-tagline">Your CET college planning companion</span>
              </div>
            </div>
            <p className="footer-mission-text">
              A calmer, more structured approach to evaluating MHT-CET options and building your CAP preference list with cutoff context and personal priorities.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-nav-list">
                <li><button type="button" onClick={() => navigate('landing')}>Home</button></li>
                <li><button type="button" onClick={() => navigate('dashboard')}>Student Dashboard</button></li>
                <li><button type="button" onClick={() => navigate('recommendations')}>Recommendations</button></li>
                <li><button type="button" onClick={() => navigate('preferences')}>Preference Builder</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Tools & Data</h4>
              <ul className="footer-nav-list">
                <li><button type="button" onClick={() => navigate('colleges')}>Explore Colleges</button></li>
                <li><button type="button" onClick={() => navigate('compare')}>College Comparison</button></li>
                <li><button type="button" onClick={() => navigate('preference-list')}>My Preference List</button></li>
                <li><button type="button" onClick={() => navigate('cap-updates')}>CAP Round Updates</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Transparency</h4>
              <ul className="footer-nav-list">
                <li><button type="button" onClick={() => navigate('methodology')}>Ranking Methodology</button></li>
                <li><button type="button" onClick={() => navigate('methodology')}>Data Caveats</button></li>
                <li><button type="button" onClick={() => navigate('methodology')}>Future Roadmap</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-disclaimer-box">
            <p className="footer-disclaimer-text">
              <strong>Demonstration Prototype:</strong> This website is an illustrative product concept. All college names, fee estimates, sample cutoff percentiles, and CAP update notices are fictional sample data created solely for user interface evaluation. It is not affiliated with the State Common Entrance Test Cell, Maharashtra, and must not be used as official admission or eligibility guidance.
            </p>
          </div>
          <div className="footer-meta-line">
            <span>© 2026 CET Sathi Prototype. All mock records illustrative.</span>
            <span>Client-side demonstration · No official verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
