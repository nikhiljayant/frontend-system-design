import React from 'react';

/**
 * Navbar Component
 * Configurable props received from JSON:
 * - brand: string (Brand or Logo text)
 * - links: array of strings (Navigation items)
 */
export const Navbar = ({ brand, links = [] }) => {
  return (
    <header className="cdui-navbar">
      <div className="cdui-navbar-brand">{brand}</div>
      <nav className="cdui-navbar-links">
        {links.map((link, index) => (
          <a key={index} href={`#${link.toLowerCase()}`} className="cdui-nav-link">
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
};
