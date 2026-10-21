import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, ArrowRight, Check, AlertCircle, Info, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import { SAMPLE_PROFILE, BRANCH_LIST, REGION_LIST, COLLEGE_TYPES, FEE_RANGES } from '../data/mockData';
import { validatePercentile } from '../utils/formatters';

export default function PreferencesPage() {
  const { profile, setProfile, navigate, showToast } = useApp();

  const [formData, setFormData] = useState({ ...profile });
  const [percentileError, setPercentileError] = useState('');

  const handlePercentileChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, percentile: val });
    const check = validatePercentile(val);
    if (!check.valid) {
      setPercentileError(check.message);
    } else {
      setPercentileError('');
    }
  };

  const toggleBranch = (branch) => {
    const current = formData.preferredBranches || [];
    if (current.includes(branch)) {
      if (current.length === 1) {
        showToast('At least one preferred branch should remain selected.');
        return;
      }
      setFormData({
        ...formData,
        preferredBranches: current.filter((b) => b !== branch)
      });
    } else {
      setFormData({
        ...formData,
        preferredBranches: [...current, branch]
      });
    }
  };

  const toggleRegion = (region) => {
    const current = formData.preferredRegions || [];
    if (current.includes(region)) {
      if (current.length === 1) {
        showToast('At least one preferred region should remain selected.');
        return;
      }
      setFormData({
        ...formData,
        preferredRegions: current.filter((r) => r !== region)
      });
    } else {
      setFormData({
        ...formData,
        preferredRegions: [...current, region]
      });
    }
  };

  const toggleCollegeType = (type) => {
    const current = formData.collegeTypes || [];
    if (current.includes(type)) {
      setFormData({
        ...formData,
        collegeTypes: current.filter((t) => t !== type)
      });
    } else {
      setFormData({
        ...formData,
        collegeTypes: [...current, type]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = validatePercentile(formData.percentile);
    if (!check.valid) {
      setPercentileError(check.message);
      showToast('Please correct the percentile error before continuing.');
      return;
    }
    setProfile({
      ...formData,
      percentile: check.value
    });
    showToast('Preferences updated successfully.');
    navigate('recommendations');
  };

  const handleUseSampleProfile = () => {
    setFormData({ ...SAMPLE_PROFILE });
    setPercentileError('');
    showToast('Loaded standard sample profile (92.40 percentile).');
  };

  return (
    <div className="preferences-page">
      <div className="container">
        <PageHeader
          eyebrow="Preference Builder"
          title="Configure your planning preferences"
          subtitle="Input your MHT-CET score, eligibility category, and personal trade-offs to calibrate your recommendations."
        />

        <div className="preferences-layout">
          <form onSubmit={handleSubmit} className="preferences-form">
            {/* Section A: CET and Eligibility */}
            <fieldset className="pref-fieldset card">
              <legend className="pref-legend">
                <span className="legend-index tabular">A</span>
                <span>CET and eligibility context</span>
              </legend>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="percentile-input">
                    MHT-CET percentile <span className="required-star">*</span>
                  </label>
                  <input
                    id="percentile-input"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.percentile}
                    onChange={handlePercentileChange}
                    aria-describedby={percentileError ? 'percentile-error' : 'percentile-desc'}
                    aria-invalid={!!percentileError}
                    required
                  />
                  {percentileError ? (
                    <div id="percentile-error" className="error-text">
                      <AlertCircle size={13} aria-hidden="true" />
                      <span>{percentileError}</span>
                    </div>
                  ) : (
                    <div id="percentile-desc" className="helper-text">
                      Example: 92.40. Enter up to 2 decimal places.
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category-select">
                    Admission category <span className="required-star">*</span>
                  </label>
                  <select
                    id="category-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Open">Open / General</option>
                    <option value="OBC">OBC (Other Backward Classes)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                    <option value="VJ/DT">VJ / DT (Vimukta Jati)</option>
                    <option value="NT">NT (Nomadic Tribes)</option>
                    <option value="Other">Other Category (Sample)</option>
                  </select>
                  <div className="helper-text">Select your verified category strictly as per documentation.</div>
                </div>

                <div className="form-group">
                  <label htmlFor="candidature-select">Candidature type</label>
                  <select
                    id="candidature-select"
                    value={formData.candidature}
                    onChange={(e) => setFormData({ ...formData, candidature: e.target.value })}
                  >
                    <option value="Maharashtra">Maharashtra State Candidate (Type A/B/C/D/E)</option>
                    <option value="All India">All India / OMS Candidate</option>
                    <option value="Minority">Minority Candidature (Sample)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="home-uni-select">Home university area (Optional)</label>
                  <select
                    id="home-uni-select"
                    value={formData.homeUniversity}
                    onChange={(e) => setFormData({ ...formData, homeUniversity: e.target.value })}
                  >
                    <option value="Mumbai University (MU)">Mumbai University (MU)</option>
                    <option value="Savitribai Phule Pune University (SPPU)">Savitribai Phule Pune University (SPPU)</option>
                    <option value="Dr. BATU (Autonomous/State)">Dr. BATU (State Level)</option>
                    <option value="Other University">Other State University</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Section B: Academic Preferences */}
            <fieldset className="pref-fieldset card">
              <legend className="pref-legend">
                <span className="legend-index tabular">B</span>
                <span>Academic priorities & branch focus</span>
              </legend>

              <div className="form-group">
                <label>
                  Preferred engineering branches (Select all that apply)
                </label>
                <div className="chips-selector">
                  {BRANCH_LIST.map((branch) => {
                    const selected = formData.preferredBranches.includes(branch);
                    return (
                      <button
                        key={branch}
                        type="button"
                        className={`chip-button ${selected ? 'selected' : ''}`}
                        onClick={() => toggleBranch(branch)}
                        aria-pressed={selected}
                      >
                        {selected && <Check size={14} aria-hidden="true" />}
                        <span>{branch}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="priority-mode-select">Branch vs. College orientation</label>
                  <select
                    id="priority-mode-select"
                    value={formData.priorityMode}
                    onChange={(e) => setFormData({ ...formData, priorityMode: e.target.value })}
                  >
                    <option value="Branch first">Branch first — Prioritize my chosen branches above college prestige</option>
                    <option value="Balanced">Balanced — Even balance between college reputation and branch</option>
                    <option value="College first">College first — Favor autonomous or established colleges</option>
                  </select>
                  <div className="helper-text">This directly adjusts recommendation scoring weights.</div>
                </div>

                <div className="form-group">
                  <label>College management types</label>
                  <div className="checkbox-row-group">
                    {['Autonomous', 'Private', 'Government-aided'].map((t) => {
                      const checked = formData.collegeTypes?.includes(t);
                      return (
                        <label key={t} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCollegeType(t)}
                          />
                          <span>{t}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Section C: Practical Constraints */}
            <fieldset className="pref-fieldset card">
              <legend className="pref-legend">
                <span className="legend-index tabular">C</span>
                <span>Practical constraints & budget</span>
              </legend>

              <div className="form-group">
                <label>Preferred regions / districts</label>
                <div className="chips-selector">
                  {REGION_LIST.map((region) => {
                    const selected = formData.preferredRegions.includes(region);
                    return (
                      <button
                        key={region}
                        type="button"
                        className={`chip-button ${selected ? 'selected' : ''}`}
                        onClick={() => toggleRegion(region)}
                        aria-pressed={selected}
                      >
                        {selected && <Check size={14} aria-hidden="true" />}
                        <span>{region}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="fee-comfort-select">Annual tuition budget comfort</label>
                  <select
                    id="fee-comfort-select"
                    value={formData.feeComfort}
                    onChange={(e) => setFormData({ ...formData, feeComfort: e.target.value })}
                  >
                    {FEE_RANGES.map((f) => (
                      <option key={f.label} value={f.label}>{f.label}</option>
                    ))}
                  </select>
                  <div className="helper-text">Indicative open-category annual tuition benchmark.</div>
                </div>

                <div className="form-group">
                  <label htmlFor="commute-select">Commute / Accommodation preference</label>
                  <select
                    id="commute-select"
                    value={formData.commutePreference}
                    onChange={(e) => setFormData({ ...formData, commutePreference: e.target.value })}
                  >
                    <option value="Local commute preferred">Local daily commute preferred</option>
                    <option value="Hostel acceptable">Hostel / PG accommodation acceptable</option>
                    <option value="Flexible">Flexible / Open to relocation</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Form Actions */}
            <div className="form-actions-bar">
              <button
                type="button"
                className="btn btn-secondary btn-md"
                onClick={handleUseSampleProfile}
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span>Use sample profile (92.40 %ile)</span>
              </button>

              <button type="submit" className="btn btn-primary btn-lg">
                <span>Show recommendations</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </form>

          {/* Side Guidance Card */}
          <aside className="pref-sidebar">
            <div className="side-card card">
              <div className="side-card-header">
                <Info size={16} aria-hidden="true" />
                <h3 className="side-card-title">Prototype guidance</h3>
              </div>
              <p className="side-card-desc">
                Preferences entered here are preserved in your local browser session. The recommendation ranking model uses rule-based weighting to simulate how preference lists are curated.
              </p>
              <div className="side-info-points">
                <div className="side-point">
                  <strong>Branch first mode:</strong> Places heaviest weighting on matching your desired computer/data streams over brand recognition.
                </div>
                <div className="side-point">
                  <strong>Historical cutoffs:</strong> Previous year cutoffs reflect past applicant demand and are never admission guarantees.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
