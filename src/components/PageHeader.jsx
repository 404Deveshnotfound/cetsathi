import React from 'react';

export default function PageHeader({ eyebrow, title, subtitle, actions, demoBadge = true }) {
  return (
    <div className="page-header">
      <div className="page-header-content">
        {eyebrow && <div className="page-header-eyebrow">{eyebrow}</div>}
        <div className="page-header-title-row">
          <h1 className="page-header-title">{title}</h1>
          {demoBadge && <span className="badge badge-demo">Demo Data</span>}
        </div>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
}
