import React from 'react';
import { SlidersHorizontal, Scale, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useApp } from '../context/AppContext';

export default function MethodologyPage() {
  const { navigate } = useApp();

  return (
    <div className="methodology-page">
      <div className="container">
        <PageHeader
          eyebrow="System Transparency"
          title="Ranking methodology & data caveats"
          subtitle="How our decision support model evaluates preferences, cutoff contexts, and trade-offs in this prototype."
        />

        <div className="methodology-content-grid">
          {/* Main Content Articles */}
          <main className="methodology-main-col">
            {/* Section 1: What the list considers */}
            <article className="method-article card">
              <h2 className="article-title">1. What our decision support model considers</h2>
              <p className="article-p">
                Traditional cutoff portals often display long, unsorted PDF lists that force students to manually sift through hundreds of codes. CET Sathi calculates a <em>Preference Match Score</em> (0–100) based on five multi-criteria factors:
              </p>

              <div className="factors-table-card">
                <table className="method-table">
                  <thead>
                    <tr>
                      <th>Factor</th>
                      <th>How it is evaluated</th>
                      <th>Influence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Branch priority</strong></td>
                      <td>Whether the program matches your primary engineering branch selections (e.g., Computer Engineering vs IT vs Mechanical).</td>
                      <td>Heavy (25%–35%)</td>
                    </tr>
                    <tr>
                      <td><strong>Cutoff context</strong></td>
                      <td>Compares your percentile to historical sample round cutoffs to establish Ambitious, Target, and Safer fit bands.</td>
                      <td>Substantial (20%–25%)</td>
                    </tr>
                    <tr>
                      <td><strong>Fee comfort</strong></td>
                      <td>Aligns indicative annual tuition against your selected annual budget tier.</td>
                      <td>Moderate (15%)</td>
                    </tr>
                    <tr>
                      <td><strong>Location & commute</strong></td>
                      <td>Prioritizes institutions inside your selected districts (e.g. Mumbai / Navi Mumbai vs Pune).</td>
                      <td>Moderate (15%)</td>
                    </tr>
                    <tr>
                      <td><strong>College attributes</strong></td>
                      <td>Considers university autonomy status, government-aided status, and campus facilities.</td>
                      <td>Calibrated (10%–30%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* Section 2: How Priorities Affect Ordering */}
            <article className="method-article card">
              <h2 className="article-title">2. How your priorities shift the sequence</h2>
              <p className="article-p">
                Different applicants have distinct personal philosophies. The prototype adapts its weighting formula depending on your chosen orientation:
              </p>

              <div className="weight-comparison-grid">
                <div className="weight-card">
                  <h4 className="weight-title">Branch-first orientation</h4>
                  <p className="weight-desc">
                    For students who must study their dream stream (e.g. AI or Computer Engineering) even if it means picking a less autonomous or slightly farther college.
                  </p>
                  <div className="weight-badge">Branch weight: 35% · College: 10%</div>
                </div>

                <div className="weight-card">
                  <h4 className="weight-title">Balanced orientation</h4>
                  <p className="weight-desc">
                    Distributes weights evenly between branch curriculum and college reputation for students seeking an equilibrium between brand and syllabus.
                  </p>
                  <div className="weight-badge">Branch: 25% · College: 20% · Cutoff: 25%</div>
                </div>

                <div className="weight-card">
                  <h4 className="weight-title">College-first orientation</h4>
                  <p className="weight-desc">
                    Favors established autonomous campuses, strong institutional infrastructure, and aided colleges over strict branch specialization.
                  </p>
                  <div className="weight-badge">College weight: 30% · Branch: 20%</div>
                </div>
              </div>
            </article>

            {/* Section 3: What cutoff data can and cannot tell you */}
            <article className="method-article card">
              <h2 className="article-title">3. What cutoff data can and cannot tell you</h2>
              <p className="article-p">
                Historical cutoffs are valuable reference benchmarks, but they are frequently misinterpreted. Understanding their nature is vital:
              </p>
              <ul className="caveat-points-list">
                <li>
                  <strong>Cutoffs vary by round:</strong> Round 1 cutoffs are typically highest; Round 2 and Round 3 cutoffs fluctuate as candidates accept seats or participate in betterment.
                </li>
                <li>
                  <strong>Seat matrices shift annually:</strong> Additions of new divisions, shifting reservation quotas, or changes in university affiliation alter seat dynamics.
                </li>
                <li>
                  <strong>Not an admission guarantee:</strong> Even if your score exceeds a previous cutoff by 1.5 percentile, higher overall applicant scores in a given year can shift closing ranks upward.
                </li>
              </ul>
            </article>

            {/* Section 4: Prototype Limitations */}
            <article className="method-article card">
              <h2 className="article-title">4. Prototype limitations & scope</h2>
              <div className="limitations-box">
                <AlertTriangle size={18} className="warn-icon" aria-hidden="true" />
                <div>
                  <p className="limitations-text">
                    This website is an interactive proof-of-concept prototype:
                  </p>
                  <ul className="limitations-sublist">
                    <li>All college names, cutoffs, and fees in this repository are illustrative fictional records.</li>
                    <li>The system runs entirely client-side in your web browser.</li>
                    <li>No official eligibility validation or document verification is performed.</li>
                    <li>It does not connect to the State CET Cell database or submit official CAP forms.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Section 5: Future Roadmap */}
            <article className="method-article card">
              <h2 className="article-title">5. Future roadmap</h2>
              <p className="article-p">
                As CET Sathi progresses beyond this static prototype, the planned evolution includes:
              </p>
              <ul className="future-list">
                <li>Ingestion of verified CET Cell merit lists and closing ranks from prior academic cycles.</li>
                <li>Category-specific quota breakdowns (Home University, Other-than-Home University, TFWS, EWS, and PwD).</li>
                <li>Multi-round betterment simulation tools.</li>
                <li>Carefully evaluated statistical models only when comprehensive multi-year verified datasets are available.</li>
              </ul>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="methodology-side-col">
            <div className="side-card card">
              <div className="side-card-header">
                <ShieldCheck size={16} aria-hidden="true" />
                <h3 className="side-card-title">Principles of design</h3>
              </div>
              <p className="side-card-desc">
                We believe students deserve honest tools:
              </p>
              <div className="side-principle-item">
                <strong>Calibrated confidence:</strong> Never promise guaranteed seat allotments.
              </div>
              <div className="side-principle-item">
                <strong>Explainable UI:</strong> Every suggestion details why it matched your inputs.
              </div>
              <div className="side-principle-item">
                <strong>Student autonomy:</strong> You control the ranking parameters, not a hidden algorithm.
              </div>
            </div>

            <div className="side-card card">
              <h3 className="side-card-title">Try it yourself</h3>
              <p className="side-card-desc">
                Adjust your profile settings in the Preference Builder to observe how weights re-rank recommendations in real time.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-md"
                style={{ width: '100%', marginTop: '12px' }}
                onClick={() => navigate('preferences')}
              >
                <span>Open Preference Builder</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
