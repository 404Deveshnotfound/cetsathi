import React, { useState } from 'react';
import { ArrowLeft, MapPin, Wallet, CalendarDays, Bookmark, GitCompare, Building2, Check, Info, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusTag from '../components/StatusTag';
import { COLLEGES } from '../data/mockData';
import { formatCurrency, formatPercentile } from '../utils/formatters';

export default function CollegeDetailPage() {
  const {
    selectedCollegeId,
    navigate,
    preferenceList,
    addToPreferenceList,
    compareList,
    toggleCompare,
    profile
  } = useApp();

  const college = COLLEGES.find((c) => c.id === selectedCollegeId) || COLLEGES[0];

  const [selectedBranchId, setSelectedBranchId] = useState(college.branches[0]?.id);

  const activeBranch = college.branches.find((b) => b.id === selectedBranchId) || college.branches[0];

  const isSaved = preferenceList.some(
    (p) => p.collegeId === college.id && p.branch === activeBranch.name
  );

  const isCompared = compareList.some(
    (c) => c.collegeId === college.id && c.branch === activeBranch.name
  );

  const handleAddCurrentBranch = () => {
    addToPreferenceList({
      collegeId: college.id,
      collegeName: college.name,
      branch: activeBranch.name,
      location: college.location,
      sampleCutoff: activeBranch.sampleCutoff,
      indicativeFee: college.indicativeFee,
      fitLabel: activeBranch.sampleCutoff > profile.percentile ? 'Ambitious' : 'Target',
      autonomy: college.autonomy,
      type: college.type
    });
  };

  const handleCompareCurrentBranch = () => {
    toggleCompare({
      id: `rec-${college.id}-${activeBranch.id}`,
      collegeId: college.id,
      collegeName: college.name,
      branch: activeBranch.name,
      location: college.location,
      region: college.region,
      type: college.type,
      autonomy: college.autonomy,
      indicativeFee: college.indicativeFee,
      sampleCutoff: activeBranch.sampleCutoff,
      sampleRound: activeBranch.sampleRound,
      fitLabel: activeBranch.sampleCutoff > profile.percentile ? 'Ambitious' : 'Target',
      preferenceMatchScore: 88,
      tradeOffs: 'Standard option profile based on catalog data.'
    });
  };

  return (
    <div className="college-detail-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <button
            type="button"
            className="breadcrumb-btn"
            onClick={() => navigate('colleges')}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Explore colleges</span>
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{college.name}</span>
        </nav>

        {/* Hero Header Card */}
        <header className="detail-hero-card card">
          <div className="detail-hero-content">
            <div className="detail-tags-row">
              <span className="badge badge-neutral">{college.autonomy}</span>
              <span className="badge badge-neutral">{college.type}</span>
              <span className="badge badge-neutral">Est. {college.established}</span>
              <span className="badge badge-demo">Demo Data</span>
            </div>

            <h1 className="detail-title">{college.name}</h1>

            <div className="detail-location-row">
              <MapPin size={16} className="inline-icon" aria-hidden="true" />
              <span>{college.location}, {college.region} District, Maharashtra</span>
            </div>

            <p className="detail-overview-text">{college.overview}</p>
          </div>

          <div className="detail-hero-actions">
            <button
              type="button"
              className={`btn ${isCompared ? 'btn-primary' : 'btn-secondary'} btn-md`}
              onClick={handleCompareCurrentBranch}
            >
              <GitCompare size={15} aria-hidden="true" />
              <span>{isCompared ? 'In comparison' : 'Compare option'}</span>
            </button>

            <button
              type="button"
              className={`btn ${isSaved ? 'btn-secondary' : 'btn-primary'} btn-md`}
              onClick={handleAddCurrentBranch}
            >
              {isSaved ? <Check size={15} aria-hidden="true" /> : <Bookmark size={15} aria-hidden="true" />}
              <span>{isSaved ? 'In preference list' : 'Add to preference list'}</span>
            </button>
          </div>
        </header>

        {/* Key Facts Strip */}
        <div className="detail-facts-grid">
          <div className="detail-fact-card card">
            <span className="detail-fact-label">Indicative annual tuition</span>
            <span className="detail-fact-val tabular">{formatCurrency(college.indicativeFee)}</span>
            <span className="detail-fact-sub">Open category / academic year</span>
          </div>

          <div className="detail-fact-card card">
            <span className="detail-fact-label">Campus & infrastructure</span>
            <span className="detail-fact-val">{college.campusSize}</span>
            <span className="detail-fact-sub">
              {college.hostelAvailable ? 'Hostel available' : 'Day scholar commute'}
            </span>
          </div>

          <div className="detail-fact-card card">
            <span className="detail-fact-label">Transport connectivity</span>
            <span className="detail-fact-val" style={{ fontSize: '15px' }}>{college.transportConnectivity}</span>
            <span className="detail-fact-sub">{college.location} zone</span>
          </div>

          <div className="detail-fact-card card">
            <span className="detail-fact-label">Sample cutoff reference</span>
            <span className="detail-fact-val tabular">Round 1 (2025)</span>
            <span className="detail-fact-sub">Illustrative mock data only</span>
          </div>
        </div>

        {/* Two-Column Details Body */}
        <div className="detail-body-grid">
          {/* Main Column: Branches Catalogue */}
          <main className="detail-main-col">
            <section className="detail-section card">
              <div className="detail-section-header">
                <div>
                  <h2 className="detail-section-title">Available engineering branches</h2>
                  <p className="detail-section-subtitle">
                    Select a branch to review sample cutoff context and add directly to your CAP list.
                  </p>
                </div>
              </div>

              <div className="branches-table-wrapper">
                <table className="branches-table">
                  <thead>
                    <tr>
                      <th>Branch specialization</th>
                      <th>Sample cutoff</th>
                      <th>Intake</th>
                      <th>Curriculum focus</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {college.branches.map((branch) => {
                      const isBranchSaved = preferenceList.some(
                        (p) => p.collegeId === college.id && p.branch === branch.name
                      );
                      const isSelectedRow = branch.id === selectedBranchId;
                      const diff = branch.sampleCutoff - profile.percentile;
                      const fitTag = diff > 0.1 ? 'Ambitious' : diff < -3.0 ? 'Safer option' : 'Target';

                      return (
                        <tr
                          key={branch.id}
                          className={isSelectedRow ? 'selected-row' : ''}
                          onClick={() => setSelectedBranchId(branch.id)}
                        >
                          <td className="branch-name-cell">
                            <div className="branch-title-group">
                              <strong>{branch.name}</strong>
                              <StatusTag status={fitTag} size="sm" />
                            </div>
                          </td>
                          <td className="branch-cutoff-cell">
                            <strong className="tabular">{formatPercentile(branch.sampleCutoff)}</strong>
                            <span className="sub-stat">{branch.sampleRound}</span>
                          </td>
                          <td className="branch-intake-cell tabular">
                            {branch.intake} seats
                          </td>
                          <td className="branch-focus-cell">
                            {branch.keyFocus}
                          </td>
                          <td className="branch-action-cell" onClick={(e) => e.stopPropagation()}>
                            {isBranchSaved ? (
                              <span className="badge badge-safer">Added</span>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  addToPreferenceList({
                                    collegeId: college.id,
                                    collegeName: college.name,
                                    branch: branch.name,
                                    location: college.location,
                                    sampleCutoff: branch.sampleCutoff,
                                    indicativeFee: college.indicativeFee,
                                    fitLabel: fitTag,
                                    autonomy: college.autonomy,
                                    type: college.type
                                  });
                                }}
                              >
                                <Bookmark size={13} aria-hidden="true" />
                                <span>Add</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </main>

          {/* Sidebar: Priority Fit Context & Caveats */}
          <aside className="detail-sidebar-col">
            <div className="side-card card">
              <div className="side-card-header">
                <Info size={16} aria-hidden="true" />
                <h3 className="side-card-title">Priority alignment summary</h3>
              </div>
              <p className="side-card-desc">
                Evaluating this college for a candidate at <strong>{formatPercentile(profile.percentile)} percentile</strong> ({profile.category} category):
              </p>
              <ul className="side-checklist">
                <li>
                  <strong>Branch fit:</strong> Offers {college.branches.map((b) => b.name).join(', ')}.
                </li>
                <li>
                  <strong>Fee tier:</strong> Indicative tuition of {formatCurrency(college.indicativeFee)} falls {college.indicativeFee <= 150000 ? 'comfortably within' : 'close to'} your budget setting.
                </li>
                <li>
                  <strong>Autonomy:</strong> {college.autonomy === 'Autonomous' ? 'Provides independent syllabus flexibility and internal assessment structure.' : 'Follows university syllabus and central examination timetable.'}
                </li>
                <li>
                  <strong>Commute:</strong> Situated in {college.location}; {college.transportConnectivity.toLowerCase()}.
                </li>
              </ul>
            </div>

            <div className="side-card card">
              <div className="side-card-header">
                <ShieldCheck size={16} aria-hidden="true" />
                <h3 className="side-card-title">Data source notice</h3>
              </div>
              <p className="side-card-desc">
                Cutoff records and tuition approximations are fictional UI representations. Prior to entering choices on the official CET Cell portal, candidates must verify the official Information Brochure and latest Seat Matrix.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
