import React from 'react';

/**
 * InfoCard Component
 * Configurable props from JSON:
 * - icon: string (emoji or icon character)
 * - title: string
 * - description: string
 */
export const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="cdui-card cdui-info-card">
      <div className="cdui-info-icon">{icon}</div>
      <h4 className="cdui-info-title">{title}</h4>
      <p className="cdui-info-desc">{description}</p>
    </div>
  );
};
