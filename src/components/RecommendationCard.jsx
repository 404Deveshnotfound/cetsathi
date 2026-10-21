import React, { useState } from 'react';
import { MapPin, Wallet, ArrowUpRight, GitCompare, Bookmark, ChevronDown, ChevronUp, Check, Info } from 'lucide-react';
import StatusTag from './StatusTag';
import FactorBreakdown from './FactorBreakdown';
import { formatCurrency, formatPercentile } from '../utils/formatters';
import { useApp } from '../context/AppContext';

export default function RecommendationCard({ recommendation, rank }) {
  const [expanded, setExpanded] = useState(false);
  const {
    navigate,
    preferenceList,
    addToPreferenceList,
    removeFromPreferenceList,
    compareList,
    toggleCompare
  } = useApp();

  const isSaved = preferenceList.some(
    (p) => p.collegeId === recommendation.collegeId && p.branch === recommendation.branch
  );

  const isCompared = compareList.some(
    (c) => c.collegeId === recommendation.collegeId && c.branch === recommendation.branch
  );

  const formattedRank = rank < 10 ? `0${rank}` : `${rank}`;

  return (
    <article className="rec-card card" aria-label={`Recommendation ${formattedRank}: ${recommendation.collegeName}`}>
      {/* Top Header Row */}
      <div className="rec-top-row">
        <div className="rec-rank-badge tabular" aria-label={`Rank ${rank}`}>
          {formattedRank}
        </div>
        <div className="rec-heading-group">
          <div className="rec-tags-row">
            <StatusTag status={recommendation.fitLabel} />
            <span className="badge badge-neutral">{recommendation.autonomy}</span>
            <span className="badge badge-neutral">{recommendation.type}</span>
          </div>
          <h3 className="rec-college-name">
            {recommendation.collegeName}
          </h3>
          <div className="rec-branch-name">
            {recommendation.branch}
          </div>
        </div>
        <div className="rec-score-box">
          <span className="rec-score-label">Preference match</span>
          <span className="rec-score-val tabular">{recommendation.preferenceMatchScore}/100</span>
          <span className="rec-score-sub">demo score</span>
        </div>
      </div>

      {/* Facts Strip */}
      <div className="rec-facts-strip">
        <div className="rec-fact-item">
          <span className="rec-fact-label">Sample previous cutoff</span>
          <span className="rec-fact-val tabular">{formatPercentile(recommendation.sampleCutoff)}</span>
          <span className="rec-fact-sub">{recommendation.sampleRound}</span>
        </div>
        <div className="rec-fact-item">
          <span className="rec-fact-label">Indicative annual tuition</span>
          <span className="rec-fact-val tabular">{formatCurrency(recommendation.indicativeFee)}</span>
          <span className="rec-fact-sub">academic yr</span>
        </div>
        <div className="rec-fact-item">
          <span className="rec-fact-label">Campus location</span>
          <span className="rec-fact-val">
            <MapPin size={14} className="inline-icon" aria-hidden="true" />
            {recommendation.location}
          </span>
          <span className="rec-fact-sub">{recommendation.region} district</span>
        </div>
      </div>

      {/* Why this appears context */}
      <div className="rec-why-box">
        <div className="rec-why-title">
          <Info size={14} aria-hidden="true" />
          <span>Why this appears for your profile</span>
        </div>
        <p className="rec-why-text">{recommendation.whyAppears}</p>
      </div>

      {/* Expandable factor breakdown */}
      {expanded && (
        <div className="rec-expanded-section">
          <FactorBreakdown breakdown={recommendation.breakdown} />
          {recommendation.tradeOffs && (
            <div className="rec-tradeoffs-box">
              <span className="rec-tradeoffs-label">Important trade-off:</span>
              <p className="rec-tradeoffs-text">{recommendation.tradeOffs}</p>
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="rec-actions-bar">
        <button
          type="button"
          className="btn btn-ghost btn-sm expand-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Hide factor breakdown <ChevronUp size={14} aria-hidden="true" />
            </>
          ) : (
            <>
              Factor breakdown <ChevronDown size={14} aria-hidden="true" />
            </>
          )}
        </button>

        <div className="rec-actions-right">
          <button
            type="button"
            className={`btn btn-sm ${isCompared ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => toggleCompare(recommendation)}
            aria-pressed={isCompared}
          >
            <GitCompare size={14} aria-hidden="true" />
            {isCompared ? 'Compared' : 'Compare'}
          </button>

          {isSaved ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm btn-saved"
              onClick={() => {
                const found = preferenceList.find(
                  (p) => p.collegeId === recommendation.collegeId && p.branch === recommendation.branch
                );
                if (found) removeFromPreferenceList(found.id);
              }}
            >
              <Check size={14} aria-hidden="true" />
              In preference list
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => addToPreferenceList(recommendation)}
            >
              <Bookmark size={14} aria-hidden="true" />
              Add to list
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('college-detail', recommendation.collegeId)}
          >
            <span>View details</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
