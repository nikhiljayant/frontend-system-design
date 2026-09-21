# Config-Driven UI (Server-Driven UI) - LLD

A minimal, clean, and extensible **Config-Driven UI (CDUI)** architecture implemented in React.js.

In Config-Driven UI (popularized by companies like Swiggy, Flipkart, Uber, Airbnb), the backend API response controls **what** components are rendered, **where** they are placed, and **how** they behave, without requiring a client-side app deployment.

---

## 1. How the JSON Controls "What" and "Where"

The API response is framed as an ordered hierarchical tree:

```json
{
  "pageTitle": "Config-Driven E-Commerce Dashboard",
  "layout": [
    {
      "id": "nav-1",
      "type": "Navbar",
      "props": { "brand": "ShopEase", "links": ["Home", "Products"] }
    },
    {
      "id": "featured-container",
      "type": "Container",
      "props": { "layoutType": "grid", "columns": 3 },
      "children": [
        {
          "id": "product-1",
          "type": "ProductCard",
          "props": { "title": "Headphones", "price": "$199" }
        }
      ]
    }
  ]
}
```

### Deciding "What" Renders
- **`type`**: Matches a key in the frontend `COMPONENT_REGISTRY` (e.g., `"Navbar"`, `"HeroBanner"`, `"ProductCard"`).
- **`props`**: Arbitrary properties passed directly to the React component (e.g., text, images, prices).

### Deciding "Where" It Renders
1. **Vertical Order**: The array order in `layout` determines the vertical sequence on the screen.
2. **Layout Containers (`Container`)**: Using `layoutType: "grid"` or `"row"` or `"column"`, the API decides whether items are placed in a 3-column grid, horizontal scroll, or stacked column.
3. **Hierarchy (`children`)**: Containers can nest other components, allowing arbitrary layouts and placements.

---

## 2. Core Architecture

```
                 +-----------------------+
                 |  mockApiResponse.json |  <-- Treated as API response
                 +-----------+-----------+
                             |
                             v
                 +-----------------------+
                 |       App.jsx         |  <-- Fetches & manages state
                 +-----------+-----------+
                             |
                             v
                 +-----------------------+
                 |  ConfigRenderer.jsx   |  <-- Recursive CDUI Engine
                 +-----------+-----------+
                             |
             +---------------+---------------+
             |                               |
             v                               v
 +-----------------------+       +-----------------------+
 |  componentRegistry.js |       |   FallbackComponent   | (if unknown type)
 +-----------+-----------+       +-----------------------+
             |
             +---> Navbar.jsx
             +---> HeroBanner.jsx
             +---> Container.jsx (layout provider)
             +---> ProductCard.jsx
             +---> InfoCard.jsx
             +---> Footer.jsx
```

---

## 3. Project Structure

```
config-driven-ui/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx                     # Top-level demo with swap & JSON viewer
    ├── main.jsx                    # React entrypoint
    ├── index.css                   # Modern dark-mode styling
    ├── data/
    │   └── mockApiResponse.json   # The API response defining the UI
    ├── registry/
    │   └── componentRegistry.js    # Map of component types to React components
    ├── renderer/
    │   └── ConfigRenderer.jsx       # Recursive rendering engine
    └── components/
        ├── Navbar.jsx
        ├── HeroBanner.jsx
        ├── Container.jsx           # Decides layout (grid/row/col)
        ├── ProductCard.jsx
        ├── InfoCard.jsx
        ├── Footer.jsx
        └── FallbackComponent.jsx   # Safe fallback for unknown components
```

---

## 4. How to Run Locally

```bash
# 1. Navigate to the folder
cd /home/inxee-frontend/nikhil/frontend-system-design/lld/config-driven-ui

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 5. Key LLD Takeaways for System Design Interviews
1. **Separation of Concerns**: The renderer knows *how* to render, the registry knows *what* exists, and the API JSON knows *which* to display and *where*.
2. **Resilience / Backward Compatibility**: If the backend returns a new component type that older web/mobile apps don't support, the `FallbackComponent` prevents the entire page from breaking.
3. **Extensibility**: Adding a new widget requires only:
   - Creating the React component in `components/`.
   - Adding it to `COMPONENT_REGISTRY`.
   - Returning that `type` from the API.
