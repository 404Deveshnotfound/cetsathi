import React, { useState } from 'react';
import { CalendarDays, Filter, ChevronDown, ChevronUp, CheckSquare, ShieldAlert, Info, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { CAP_UPDATES, CAP_CHECKLIST } from '../data/mockData';

export default function CapUpdatesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('up-1');
  const [checkedItems, setCheckedItems] = useState({ 'chk-1': true, 'chk-2': true });

  const categories = ['All', 'CAP process', 'Documents', 'Allotment', 'Institute-level'];

  const filteredUpdates = activeCategory === 'All'
    ? CAP_UPDATES
    : CAP_UPDATES.filter((u) => u.category === activeCategory);

  const toggleCheck = (id) => {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id]
    });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="cap-updates-page">
      <div className="container">
        <PageHeader
          eyebrow="Admissions Intelligence"
          title="CAP updates & round guidance"
          subtitle="Keep essential procedural notices, documentation prerequisites, and option filing reminders organized."
        />

        {/* Demo Caveat Banner */}
        <div className="cap-notice-banner card">
          <Info size={18} className="notice-icon" aria-hidden="true" />
          <div className="notice-text">
            <strong>Sample updates for interface demonstration:</strong> Announcements and timeline stages below are mock examples intended to show the notification feed UX. Always refer exclusively to the official State CET Cell website (mahacet.org) for certified dates and statutory announcements.
          </div>
        </div>

        <div className="cap-updates-layout">
          {/* Main Updates Feed */}
          <main className="cap-feed-col">
            {/* Category Filter Tabs */}
            <div className="cap-tabs-row" role="tablist" aria-label="CAP update categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`cap-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Updates List */}
            <div className="cap-feed-list">
              {filteredUpdates.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <article key={item.id} className="cap-update-card card">
                    <div className="cap-update-header">
                      <div className="cap-update-meta">
                        <span className="badge badge-neutral">{item.category}</span>
                        <span className="cap-update-date">{item.dateLabel}</span>
                      </div>
                      <span className="badge badge-demo">Illustrative</span>
                    </div>

                    <h3 className="cap-update-title">{item.title}</h3>
                    <p className="cap-update-summary">{item.summary}</p>

                    {isExpanded && (
                      <div className="cap-update-expanded">
                        <p className="cap-expanded-text">{item.details}</p>
                        <div className="cap-source-box">
                          <span className="source-label">Reference tag: {item.source}</span>
                          <span className="source-link-disabled" title="Official links are disabled in the prototype">
                            Official portal reference (Sample)
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="cap-update-footer">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => toggleExpand(item.id)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? (
                          <>
                            <span>Collapse details</span>
                            <ChevronUp size={14} aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            <span>Read detailed guidelines</span>
                            <ChevronDown size={14} aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>

          {/* Sidebar: Pinned Checklist */}
          <aside className="cap-sidebar-col">
            <div className="checklist-card card">
              <div className="checklist-header">
                <CheckSquare size={18} aria-hidden="true" />
                <h3 className="checklist-title">Before you submit checklist</h3>
              </div>
              <p className="checklist-subtitle">
                Interactive verification checklist for your CAP application readiness.
              </p>

              <div className="checklist-items-list">
                {CAP_CHECKLIST.map((chk) => {
                  const isChecked = !!checkedItems[chk.id];
                  return (
                    <label key={chk.id} className={`checklist-item ${isChecked ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(chk.id)}
                        className="checklist-checkbox"
                      />
                      <div className="checklist-item-body">
                        <strong className="chk-item-title">{chk.title}</strong>
                        <p className="chk-item-desc">{chk.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="checklist-footer">
                <span className="checklist-progress-text tabular">
                  {Object.values(checkedItems).filter(Boolean).length} of {CAP_CHECKLIST.length} completed
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
