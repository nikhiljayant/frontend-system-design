import React from 'react';

/**
 * HeroBanner Component
 * Configurable props from JSON:
 * - badge: string (Chip / tag text)
 * - title: string (Main heading)
 * - subtitle: string (Secondary text)
 * - actionText: string (CTA button text)
 */
export const HeroBanner = ({ badge, title, subtitle, actionText }) => {
  return (
    <section className="cdui-hero-banner">
      {badge && <span className="cdui-badge">{badge}</span>}
      <h1 className="cdui-hero-title">{title}</h1>
      <p className="cdui-hero-subtitle">{subtitle}</p>
      {actionText && (
        <button
          className="cdui-btn cdui-btn-primary"
          onClick={() => alert(`Clicked action: "${actionText}" from config!`)}
        >
          {actionText}
        </button>
      )}
    </section>
  );
};
