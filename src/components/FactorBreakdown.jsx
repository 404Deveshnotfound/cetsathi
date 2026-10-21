import React from 'react';
import { useApp } from '../context/AppContext';

export default function FactorBreakdown({ breakdown }) {
  const { navigate } = useApp();
  if (!breakdown) return null;

  const factors = [
    { label: 'Branch preference match', value: breakdown.branchMatch },
    { label: 'Cutoff context fit', value: breakdown.cutoffContext },
    { label: 'Fee comfort alignment', value: breakdown.feeFit },
    { label: 'Location fit', value: breakdown.locationFit },
    { label: 'College type preference', value: breakdown.collegeFit }
  ];

  return (
    <div className="factor-breakdown-card">
      <div className="factor-breakdown-header">
        <span className="factor-title">Priority factor breakdown</span>
        <button
          type="button"
          className="factor-methodology-link"
          onClick={() => navigate('methodology')}
        >
          How scoring works
        </button>
      </div>

      <div className="factor-list">
        {factors.map((f, i) => (
          <div key={i} className="factor-row">
            <div className="factor-label-row">
              <span className="factor-label">{f.label}</span>
              <span className="factor-score tabular">{f.value}%</span>
            </div>
            <div className="factor-bar-bg">
              <div
                className="factor-bar-fill"
                style={{ width: `${Math.min(100, Math.max(10, f.value))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="factor-disclaimer">
        Values represent illustrative preference compatibility scores, not admission probabilities.
      </p>
    </div>
  );
}
