import React from 'react';

/**
 * FallbackComponent
 * Gracefully handles unknown or unsupported component types from the API.
 * Prevents UI crashes if backend returns a new or deprecated widget type.
 */
export const FallbackComponent = ({ type }) => {
  return (
    <div className="cdui-fallback">
      <span className="cdui-fallback-badge">Unknown Component</span>
      <p>Component type <code>"{type}"</code> is not registered in the UI registry.</p>
    </div>
  );
};
