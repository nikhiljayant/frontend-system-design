import React from 'react';
import { getComponentByType } from '../registry/componentRegistry';
import { FallbackComponent } from '../components/FallbackComponent';

/**
 * Single Component Node Renderer
 * 
 * Takes a single component node from the JSON config:
 * {
 *   id: "...",
 *   type: "ProductCard",
 *   props: { ... },
 *   children: [ ... ] (optional nested children)
 * }
 */
export const RenderComponentNode = ({ node }) => {
  if (!node || !node.type) {
    return null;
  }

  const { id, type, props = {}, children } = node;

  // 1. Look up the component in the registry using the "type" string
  const Component = getComponentByType(type);

  // 2. If the component type is not registered, render a safe fallback
  if (!Component) {
    return <FallbackComponent key={id || Math.random()} type={type} />;
  }

  // 3. Handle recursive nested children (e.g. Container holding Cards)
  // If node has children in JSON, recursively render them inside this component
  const renderedChildren = Array.isArray(children) && children.length > 0
    ? children.map((childNode) => (
        <RenderComponentNode key={childNode.id || Math.random()} node={childNode} />
      ))
    : null;

  // 4. Render the registered component with its props and children
  return (
    <Component key={id} {...props}>
      {renderedChildren}
    </Component>
  );
};

/**
 * Top-level Config Renderer
 * 
 * Accepts a list (or single object) of layout items from the API response
 * and iterates through them to build the entire UI dynamically.
 */
export const ConfigRenderer = ({ layout = [] }) => {
  if (!Array.isArray(layout) || layout.length === 0) {
    return <div className="cdui-empty-state">No UI configuration provided.</div>;
  }

  return (
    <div className="cdui-root-canvas">
      {layout.map((item) => (
        <RenderComponentNode key={item.id || Math.random()} node={item} />
      ))}
    </div>
  );
};
