import React from 'react';
import { Trash2, ArrowUpRight, Bookmark, Check, Info } from 'lucide-react';
import StatusTag from './StatusTag';
import { formatCurrency, formatPercentile } from '../utils/formatters';
import { useApp } from '../context/AppContext';

export default function ComparisonTable({ items }) {
  const { navigate, removeFromCompare, preferenceList, addToPreferenceList } = useApp();

  if (!items || items.length === 0) return null;

  return (
    <div className="compare-table-wrapper">
      <div className="table-responsive-container">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="compare-metric-col">Feature / Attribute</th>
              {items.map((item, idx) => (
                <th key={`${item.collegeId}-${item.branch}-${idx}`} className="compare-item-header">
                  <div className="compare-header-box">
                    <div className="compare-header-top">
                      <StatusTag status={item.fitLabel} />
                      <button
                        type="button"
                        className="btn-remove-icon"
                        title="Remove from comparison"
                        onClick={() => removeFromCompare(item.collegeId, item.branch)}
                        aria-label={`Remove ${item.collegeName} from comparison`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="compare-header-title">{item.collegeName}</div>
                    <div className="compare-header-branch">{item.branch}</div>
                    <div className="compare-header-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => addToPreferenceList(item)}
                      >
                        <Bookmark size={13} aria-hidden="true" />
                        Add to list
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => navigate('college-detail', item.collegeId)}
                      >
                        Details <ArrowUpRight size={13} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="metric-label">Sample previous cutoff</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value">
                  <span className="bold-stat tabular">{formatPercentile(item.sampleCutoff)}</span>
                  <span className="sub-stat">{item.sampleRound || 'Round 1 (2025 sample)'}</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="metric-label">Indicative annual tuition</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value">
                  <span className="bold-stat tabular">{formatCurrency(item.indicativeFee)}</span>
                  <span className="sub-stat">Per academic year</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="metric-label">Location & Region</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value">
                  <span className="bold-stat">{item.location}</span>
                  <span className="sub-stat">{item.region || item.location} district</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="metric-label">Autonomy status</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value">
                  <span className="badge badge-neutral">{item.autonomy}</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="metric-label">Institution category</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value">
                  <span className="badge badge-neutral">{item.type}</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="metric-label">Branch preference fit</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value">
                  <div className="compare-bar-container">
                    <div className="compare-bar-val tabular">
                      {item.breakdown?.branchMatch || 90}%
                    </div>
                    <div className="compare-bar-bg">
                      <div
                        className="compare-bar-fill"
                        style={{ width: `${item.breakdown?.branchMatch || 90}%` }}
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="metric-label">Fee comfort fit</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value">
                  <div className="compare-bar-container">
                    <div className="compare-bar-val tabular">
                      {item.breakdown?.feeFit || 85}%
                    </div>
                    <div className="compare-bar-bg">
                      <div
                        className="compare-bar-fill"
                        style={{ width: `${item.breakdown?.feeFit || 85}%` }}
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="metric-label">Location fit</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value">
                  <div className="compare-bar-container">
                    <div className="compare-bar-val tabular">
                      {item.breakdown?.locationFit || 85}%
                    </div>
                    <div className="compare-bar-bg">
                      <div
                        className="compare-bar-fill"
                        style={{ width: `${item.breakdown?.locationFit || 85}%` }}
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="metric-label">Key trade-offs</td>
              {items.map((item, idx) => (
                <td key={idx} className="metric-value tradeoff-cell">
                  <p className="tradeoff-text">
                    {item.tradeOffs || 'Consistent choice within general suburban transit.'}
                  </p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="compare-interpretation-note">
        <Info size={16} aria-hidden="true" />
        <div>
          <strong>How to interpret this comparison:</strong> There is no single "best" college for all applicants. A student prioritizing immediate commute and affordable tuition may prefer a different option from one prioritizing autonomous curriculum flexibility or emerging branch specialization.
        </div>
      </div>
    </div>
  );
}
