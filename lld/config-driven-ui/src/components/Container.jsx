import React from 'react';

/**
 * Container Component
 * Responsible for structural layout (grid, row, column).
 * This allows the API config to decide WHERE and HOW elements are arranged.
 * 
 * Props from JSON:
 * - title: string (Optional section heading)
 * - layoutType: 'grid' | 'row' | 'column' (Layout arrangement)
 * - columns: number (Optional number of grid columns)
 * - children: ReactNode (Rendered child components)
 */
export const Container = ({ title, layoutType = 'column', columns = 3, children }) => {
  // Compute container class based on layout configuration
  const layoutClass = `cdui-container-${layoutType}`;
  
  // Custom style for dynamic grid columns if specified in config
  const customStyle = layoutType === 'grid' && columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : {};

  return (
    <section className="cdui-container-wrapper">
      {title && <h2 className="cdui-section-title">{title}</h2>}
      <div className={`cdui-container ${layoutClass}`} style={customStyle}>
        {children}
      </div>
    </section>
  );
};
