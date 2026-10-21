import React, { useState } from 'react';
import { Bookmark, RotateCcw, Plus, GitCompare, ShieldAlert, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import PreferenceListItem from '../components/PreferenceListItem';
import EmptyState from '../components/EmptyState';
import { formatPercentile, formatCurrency } from '../utils/formatters';

export default function PreferenceListPage() {
  const {
    preferenceList,
    movePreferenceItem,
    removeFromPreferenceList,
    resetPreferenceList,
    navigate,
    toggleCompare,
    showToast
  } = useApp();

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleReset = () => {
    resetPreferenceList();
    setConfirmResetOpen(false);
  };

  const handleCompareAll = () => {
    if (preferenceList.length === 0) return;
    // Add first 3 to compare list
    preferenceList.slice(0, 3).forEach((item) => {
      toggleCompare({
        id: item.recId || `rec-${item.collegeId}-${item.branch}`,
        collegeId: item.collegeId,
        collegeName: item.collegeName,
        branch: item.branch,
        location: item.location,
        type: item.type,
        autonomy: item.autonomy,
        indicativeFee: item.indicativeFee,
        sampleCutoff: item.sampleCutoff,
        fitLabel: item.fitLabel,
        preferenceMatchScore: 90
      });
    });
    navigate('compare');
  };

  return (
    <div className="preference-list-page">
      <div className="container">
        <PageHeader
          eyebrow="CAP Option Form Simulator"
          title="My preference list"
          subtitle="Review the sequence, compare trade-offs, and adjust your draft preference hierarchy before finalizing it on the official portal."
          actions={
            <div className="header-actions-inline">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('colleges')}
              >
                <Plus size={14} aria-hidden="true" />
                <span>Add more colleges</span>
              </button>
              {preferenceList.length > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleCompareAll}
                >
                  <GitCompare size={14} aria-hidden="true" />
                  <span>Compare top choices</span>
                </button>
              )}
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setConfirmResetOpen(true)}
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Reset sample list</span>
              </button>
            </div>
          }
        />

        {/* Reset Confirmation Dialog */}
        {confirmResetOpen && (
          <div className="confirm-modal-overlay card" role="alertdialog" aria-modal="true">
            <div className="confirm-modal-box">
              <h3 className="confirm-title">Reset to default demo list?</h3>
              <p className="confirm-desc">
                This will discard any manual reordering or added colleges and restore the initial 5 sample demo options.
              </p>
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setConfirmResetOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleReset}
                >
                  Confirm reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Official Process Disclaimer Banner */}
        <div className="pref-disclaimer-banner card">
          <ShieldAlert size={18} className="disclaimer-icon" aria-hidden="true" />
          <div className="disclaimer-text">
            <strong>Important reminder:</strong> This is a client-side decision planning workspace. Modifying or ordering options here <em>does not</em> submit an option form to the State CET Cell. You must enter your final preference choice codes on the official state portal during the authorized CAP round windows.
          </div>
        </div>

        {/* Preference Sequence List */}
        {preferenceList.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="Your preference list is empty"
            description="Start building your sequence by reviewing recommendations or exploring our college catalogue."
            actionText="View recommendations"
            onAction={() => navigate('recommendations')}
          />
        ) : (
          <div className="preference-list-container">
            <div className="pref-list-header-row">
              <span className="pref-count-badge tabular">
                {preferenceList.length} Option{preferenceList.length === 1 ? '' : 's'} in Sequence
              </span>
              <span className="pref-help-tip">
                Use the up/down arrows to adjust preference priority.
              </span>
            </div>

            <div className="pref-items-wrapper" role="list">
              {preferenceList.map((item, index) => (
                <PreferenceListItem
                  key={item.id}
                  item={item}
                  index={index}
                  total={preferenceList.length}
                  onMoveUp={() => movePreferenceItem(index, 'up')}
                  onMoveDown={() => movePreferenceItem(index, 'down')}
                  onRemove={() => removeFromPreferenceList(item.id)}
                />
              ))}
            </div>

            {/* Strategy Guidelines Box */}
            <div className="pref-strategy-card card">
              <div className="strategy-header">
                <Info size={16} aria-hidden="true" />
                <h3 className="strategy-title">Recommended preference structure guideline</h3>
              </div>
              <div className="strategy-grid">
                <div className="strategy-tier">
                  <span className="tier-badge badge badge-ambitious">Preferences 1 – 3: Ambitious</span>
                  <p className="tier-text">
                    Institutions with historical cutoffs slightly above your percentile. If allotment occurs, it is a favorable stretch outcome.
                  </p>
                </div>
                <div className="strategy-tier">
                  <span className="tier-badge badge badge-target">Preferences 4 – 8: Realistic Target</span>
                  <p className="tier-text">
                    Colleges and branches closely centered around your percentile and budget parameters.
                  </p>
                </div>
                <div className="strategy-tier">
                  <span className="tier-badge badge badge-safer">Preferences 9+: Safer Backups</span>
                  <p className="tier-text">
                    Options where previous cutoffs have provided a comfortable margin below your score, ensuring security against unforeseen round shifts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
