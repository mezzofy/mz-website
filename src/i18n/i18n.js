// i18n.js - Core internationalization library for Mezzofy
class I18n {
  constructor() {
    this.currentLang = 'en';
    this.defaultLang = 'en';
    this.translations = {};
    this.supportedLanguages = ['en', 'zh-TW', 'zh-CN'];
    this.storageKey = 'mezzofy_language';
  }

  // Initialize i18n system
  async init() {
    // 1. Load saved language preference from localStorage
    const savedLang = this.getSavedLanguage();

    // 2. Detect browser language as fallback
    const browserLang = this.detectBrowserLanguage();

    // 3. Check for URL parameter override
    const urlLang = this.getUrlLanguage();

    // 4. Set initial language (priority: URL > saved > browser > default)
    this.currentLang = urlLang || savedLang || browserLang || this.defaultLang;

    // 5. Load translation file
    await this.loadTranslations(this.currentLang);

    // 6. Apply translations to page
    this.applyTranslations();

    // 7. Update HTML lang attribute
    document.documentElement.setAttribute('lang', this.currentLang);

    // 8. Remove loading class to prevent FOUC
    document.body.classList.remove('i18n-loading');
    document.body.classList.add('i18n-ready');
  }

  // Load translation JSON file
  async loadTranslations(lang) {
    try {
      const response = await fetch(`i18n/translations/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      this.translations = await response.json();
      return true;
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      // Fallback to English if translation fails
      if (lang !== this.defaultLang) {
        console.warn(`Falling back to ${this.defaultLang}`);
        return this.loadTranslations(this.defaultLang);
      }
      return false;
    }
  }

  // Switch to a different language
  async switchLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} not supported`);
      return false;
    }

    // Show loading state
    document.body.style.opacity = '0.7';

    await this.loadTranslations(lang);
    this.currentLang = lang;
    this.saveLanguage(lang);
    this.applyTranslations();
    document.documentElement.setAttribute('lang', lang);

    // Update URL parameter
    this.updateUrlLanguage(lang);

    // Remove loading state
    document.body.style.opacity = '1';

    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: lang }
    }));

    return true;
  }

  // Apply translations to all marked elements
  applyTranslations() {
    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);

      if (translation && typeof translation === 'string') {
        // Handle variable interpolation
        const vars = element.getAttribute('data-i18n-vars');
        if (vars) {
          try {
            element.textContent = this.interpolate(translation, JSON.parse(vars));
          } catch (e) {
            console.error(`Error parsing vars for ${key}:`, e);
            element.textContent = translation;
          }
        } else {
          // Check if translation contains HTML
          if (translation.includes('<')) {
            element.innerHTML = translation;
          } else {
            element.textContent = translation;
          }
        }
      } else if (translation) {
        console.warn(`Translation for "${key}" is not a string:`, translation);
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getTranslation(key);
      if (translation) {
        element.setAttribute('placeholder', translation);
      }
    });

    // Translate alt attributes
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      const key = element.getAttribute('data-i18n-alt');
      const translation = this.getTranslation(key);
      if (translation) {
        element.setAttribute('alt', translation);
      }
    });

    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = this.getTranslation(key);
      if (translation) {
        element.setAttribute('title', translation);
      }
    });
  }

  // Get translation by dot-notation key
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return key as fallback
      }
    }

    return value;
  }

  // Variable interpolation
  interpolate(text, vars) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return vars[key] !== undefined ? vars[key] : match;
    });
  }

  // LocalStorage management
  saveLanguage(lang) {
    try {
      localStorage.setItem(this.storageKey, lang);
    } catch (e) {
      console.warn('Unable to save language preference:', e);
    }
  }

  getSavedLanguage() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      return null;
    }
  }

  // URL parameter management
  getUrlLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && this.supportedLanguages.includes(urlLang)) {
        return urlLang;
      }
    } catch (e) {
      console.warn('Error reading URL language parameter:', e);
    }
    return null;
  }

  updateUrlLanguage(lang) {
    try {
      const url = new URL(window.location);
      if (lang !== this.defaultLang) {
        url.searchParams.set('lang', lang);
      } else {
        url.searchParams.delete('lang');
      }
      window.history.replaceState({}, '', url);
    } catch (e) {
      console.warn('Error updating URL language parameter:', e);
    }
  }

  // Browser language detection
  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;

    // Exact match
    if (this.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    // Partial match (e.g., zh-TW from zh-TW-HK)
    const langCode = browserLang.split('-')[0];
    const match = this.supportedLanguages.find(lang => lang.startsWith(langCode));

    return match || this.defaultLang;
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLang;
  }

  // Get language display name
  getLanguageName(lang) {
    const names = {
      'en': 'English',
      'zh-TW': '繁體中文',
      'zh-CN': '简体中文'
    };
    return names[lang] || lang;
  }
}

// Create global instance
window.i18n = new I18n();
