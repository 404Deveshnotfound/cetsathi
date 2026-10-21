import React from 'react';
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import DemoDataNotice from './DemoDataNotice';
import { useApp } from '../context/AppContext';

export default function AppShell({ children }) {
  const { toast } = useApp();

  return (
    <div className="app-layout">
      {/* Top Banner Notice */}
      <DemoDataNotice />

      {/* Main Top Navigation */}
      <TopNavigation />

      {/* Main Content Viewport */}
      <main className="main-content" id="main-content" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toast && (
        <aside className="toast-banner" role="status" aria-live="polite">
          <div className="toast-content">{toast}</div>
        </aside>
      )}
    </div>
  );
}
