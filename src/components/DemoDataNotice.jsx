import React from 'react';
import { Info } from 'lucide-react';

export default function DemoDataNotice({ compact = false }) {
  if (compact) {
    return (
      <div className="demo-notice-compact" role="note">
        <span className="badge badge-demo">Demo Data</span>
        <span className="demo-notice-text">
          Illustrative values for UI prototype demonstration. Historical cutoffs are not admission guarantees.
        </span>
      </div>
    );
  }

  return (
    <div className="demo-notice-banner" role="note">
      <div className="demo-notice-inner">
        <Info size={16} className="demo-notice-icon" aria-hidden="true" />
        <p className="demo-notice-text">
          <strong>Demonstration prototype:</strong> All college fees, cutoffs, and CAP updates shown are illustrative mock data. They do not constitute official CET Cell admissions guidance.
        </p>
      </div>
    </div>
  );
}
