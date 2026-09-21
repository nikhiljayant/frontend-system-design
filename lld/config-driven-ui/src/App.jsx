import React, { useState, useEffect } from 'react';
import { ConfigRenderer } from './renderer/ConfigRenderer';
import initialApiResponse from './data/mockApiResponse.json';
import './index.css';

/**
 * App Component
 * 
 * Simulates an API call that returns the UI configuration JSON.
 * In Config-Driven UI (CDUI):
 * 1. The frontend requests the UI layout from the server (or uses mockApiResponse.json).
 * 2. The server sends back the layout array describing what components to render and where.
 * 3. The frontend renders the UI purely based on this configuration without needing hardcoded JSX.
 */
export function App() {
  const [uiData, setUiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfigInspector, setShowConfigInspector] = useState(false);

  // Simulate an asynchronous API fetch for the UI configuration
  useEffect(() => {
    // Simulating network delay (e.g., 500ms)
    const timer = setTimeout(() => {
      // Treat the imported mock JSON as the API response
      setUiData(initialApiResponse);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Demo helper: reorder sections dynamically to demonstrate CDUI flexibility
  const handleSwapSections = () => {
    if (!uiData || !uiData.layout) return;

    // Clone and reverse the middle sections to demonstrate dynamic rearrangement
    const newLayout = [...uiData.layout];
    const bannerIdx = newLayout.findIndex(i => i.type === 'HeroBanner');
    const containerIdx = newLayout.findIndex(i => i.id === 'featured-products-container');

    if (bannerIdx !== -1 && containerIdx !== -1) {
      const temp = newLayout[bannerIdx];
      newLayout[bannerIdx] = newLayout[containerIdx];
      newLayout[containerIdx] = temp;
      setUiData({ ...uiData, layout: newLayout });
    }
  };

  // Reset to original config
  const handleReset = () => {
    setUiData(initialApiResponse);
  };

  if (loading) {
    return (
      <div className="cdui-loading-screen">
        <div className="cdui-spinner"></div>
        <p>Loading UI configuration from API...</p>
      </div>
    );
  }

  return (
    <div className="cdui-app">
      {/* Top CDUI Control Bar to experiment with layout changes */}
      <div className="cdui-controls-bar">
        <div className="cdui-badge-tag">Config-Driven UI Demo</div>
        <span className="cdui-controls-title">Page: {uiData?.pageTitle} (v{uiData?.version})</span>
        <div className="cdui-controls-actions">
          <button className="cdui-btn-control" onClick={handleSwapSections}>
            ⇄ Swap Banner & Products
          </button>
          <button className="cdui-btn-control" onClick={handleReset}>
            ↺ Reset Layout
          </button>
          <button
            className="cdui-btn-control cdui-btn-toggle"
            onClick={() => setShowConfigInspector(!showConfigInspector)}
          >
            {showConfigInspector ? 'Hide JSON Config' : 'View JSON Config'}
          </button>
        </div>
      </div>

      {/* Optional Side-by-Side or Dropdown Inspector for the raw JSON */}
      {showConfigInspector && (
        <div className="cdui-inspector-panel">
          <div className="cdui-inspector-header">
            <h4>API Response JSON (Config driving this page):</h4>
          </div>
          <pre className="cdui-json-code">
            {JSON.stringify(uiData, null, 2)}
          </pre>
        </div>
      )}

      {/* MAIN RENDERER: Renders whatever the JSON layout dictates */}
      <main className="cdui-main-content">
        <ConfigRenderer layout={uiData?.layout} />
      </main>
    </div>
  );
}

export default App;
