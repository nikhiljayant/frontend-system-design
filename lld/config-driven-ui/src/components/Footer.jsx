import React from 'react';

/**
 * Footer Component
 * Configurable props from JSON:
 * - copyright: string
 * - note: string
 */
export const Footer = ({ copyright, note }) => {
  return (
    <footer className="cdui-footer">
      <p className="cdui-footer-copy">{copyright}</p>
      {note && <p className="cdui-footer-note">{note}</p>}
    </footer>
  );
};
