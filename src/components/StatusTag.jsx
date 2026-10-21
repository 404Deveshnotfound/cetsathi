import React from 'react';

export default function StatusTag({ status, size = 'md' }) {
  if (!status) return null;

  let className = 'badge badge-neutral';
  let label = status;

  if (status.toLowerCase().includes('safer')) {
    className = 'badge badge-safer';
    label = 'Safer option';
  } else if (status.toLowerCase().includes('target')) {
    className = 'badge badge-target';
    label = 'Target';
  } else if (status.toLowerCase().includes('ambitious')) {
    className = 'badge badge-ambitious';
    label = 'Ambitious';
  }

  return (
    <span className={`${className} ${size === 'sm' ? 'btn-sm' : ''}`}>
      {label}
    </span>
  );
}
