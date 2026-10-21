import React from 'react';
import { ChevronUp, ChevronDown, Trash2, MapPin, ArrowUpRight } from 'lucide-react';
import StatusTag from './StatusTag';
import { formatCurrency, formatPercentile } from '../utils/formatters';
import { useApp } from '../context/AppContext';

export default function PreferenceListItem({ item, index, total, onMoveUp, onMoveDown, onRemove }) {
  const { navigate } = useApp();

  const rankNumber = index + 1;
  const formattedRank = rankNumber < 10 ? `0${rankNumber}` : `${rankNumber}`;

  return (
    <div className="pref-list-row card" role="listitem">
      {/* Rank and Reorder controls */}
      <div className="pref-reorder-col">
        <div className="pref-rank-badge tabular" aria-label={`Preference position ${rankNumber}`}>
          {formattedRank}
        </div>
        <div className="pref-btn-group">
          <button
            type="button"
            className="btn-icon-subtle"
            title="Move up"
            aria-label={`Move ${item.collegeName} up`}
            disabled={index === 0}
            onClick={onMoveUp}
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            className="btn-icon-subtle"
            title="Move down"
            aria-label={`Move ${item.collegeName} down`}
            disabled={index === total - 1}
            onClick={onMoveDown}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* College & Branch Info */}
      <div className="pref-main-col">
        <div className="pref-tags-row">
          <StatusTag status={item.fitLabel} />
          {item.autonomy && <span className="badge badge-neutral">{item.autonomy}</span>}
          {item.type && <span className="badge badge-neutral">{item.type}</span>}
        </div>
        <div className="pref-title-row">
          <h4 className="pref-college-name">{item.collegeName}</h4>
          <span className="pref-branch-name">{item.branch}</span>
        </div>
        <div className="pref-meta-row">
          <span className="pref-location">
            <MapPin size={13} className="inline-icon" aria-hidden="true" />
            {item.location}
          </span>
          <span className="pref-separator">·</span>
          <span className="pref-cutoff tabular">
            Sample cutoff: <strong>{formatPercentile(item.sampleCutoff)}</strong>
          </span>
          <span className="pref-separator">·</span>
          <span className="pref-fee tabular">
            Tuition: <strong>{formatCurrency(item.indicativeFee)}</strong>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="pref-actions-col">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('college-detail', item.collegeId)}
          title="View college details"
        >
          Details <ArrowUpRight size={13} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm text-danger"
          title="Remove option"
          aria-label={`Remove ${item.collegeName} from preference list`}
          onClick={onRemove}
        >
          <Trash2 size={14} />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}
