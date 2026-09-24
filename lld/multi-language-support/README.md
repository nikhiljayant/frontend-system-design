# Simple Multi-Language Support (English & Hindi)

A minimal, lightweight frontend implementation of multi-language support (i18n) using HTML, CSS, and vanilla JavaScript.

## Project Structure

- `config/i18n-config.js` (~45 lines): Stores language metadata and translations dictionary for English (`en`) and Hindi (`hi`).
- `js/i18n.js` (~50 lines): Handles language switching, `localStorage` persistence, key lookup, and DOM translation (`data-i18n`, `data-i18n-placeholder`).
- `css/styles.css` (~65 lines): Clean, minimal styling.
- `index.html` (~35 lines): Home page.
- `about.html` (~30 lines): About page.
- `contact.html` (~40 lines): Contact page with translated form placeholder.

## How It Works

1. Mark elements to be translated with `data-i18n="key"`:
   ```html
   <h1 data-i18n="home.title">Welcome</h1>
   <input data-i18n-placeholder="contact.namePlaceholder">
   ```
2. Language switcher buttons use `data-lang="en"` or `data-lang="hi"`:
   ```html
   <button class="lang-btn" data-lang="en">English</button>
   <button class="lang-btn" data-lang="hi">हिन्दी</button>
   ```
3. `js/i18n.js` reads the active language from `localStorage` and translates all marked elements automatically without any inline JavaScript in HTML pages.
