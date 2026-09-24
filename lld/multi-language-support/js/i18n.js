/**
 * Minimal i18n Localization Engine
 * Resolves nested keys, translates DOM attributes, and persists selection in localStorage.
 */
const i18n = {
  // Get active language or default
  getLang: () => localStorage.getItem('app_lang') || I18N_CONFIG.defaultLang,

  // Change language and update DOM
  setLang(lang) {
    localStorage.setItem('app_lang', lang);
    this.updateUI();
  },

  // Resolve nested keys e.g. "home.title"
  t(key) {
    const lang = this.getLang();
    return key.split('.').reduce((obj, k) => obj && obj[k], I18N_CONFIG.translations[lang]) || key;
  },

  // Scan and update all DOM elements with translation attributes
  updateUI() {
    const lang = this.getLang();
    document.documentElement.lang = lang;

    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.getAttribute('data-i18n'));
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.getAttribute('data-i18n-placeholder'));
    });

    // Update active button state
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  },

  // Bind click events on language switcher buttons and render initial UI
  init() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.onclick = () => this.setLang(btn.getAttribute('data-lang'));
    });
    this.updateUI();
  }
};

document.addEventListener('DOMContentLoaded', () => i18n.init());
