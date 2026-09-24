/**
 * Language Configuration (English & Hindi)
 * Stores supported languages and localized text data
 */
const I18N_CONFIG = {
  defaultLang: 'en',
  languages: {
    en: { name: 'English' },
    hi: { name: 'हिन्दी' }
  },
  translations: {
    en: {
      nav: { home: 'Home', about: 'About', contact: 'Contact' },
      home: {
        title: 'Welcome to Multi-Language App',
        desc: 'This is a simple demo of language localization using a config file.'
      },
      about: {
        title: 'About Us',
        desc: 'We create simple, scalable frontend architectures with multi-language support.'
      },
      contact: {
        title: 'Contact Us',
        desc: 'Feel free to send us a message anytime.',
        namePlaceholder: 'Enter your name',
        submitBtn: 'Submit'
      }
    },
    hi: {
      nav: { home: 'होम', about: 'हमारे बारे में', contact: 'संपर्क' },
      home: {
        title: 'बहुभाषी ऐप में आपका स्वागत है',
        desc: 'यह कॉन्फ़िग फ़ाइल का उपयोग करके भाषा स्थानीयकरण का एक सरल उदाहरण है।'
      },
      about: {
        title: 'हमारे बारे में',
        desc: 'हम बहुभाषी समर्थन के साथ सरल और स्केलेबल फ्रंटएंड आर्किटेक्चर बनाते हैं।'
      },
      contact: {
        title: 'संपर्क करें',
        desc: 'किसी भी समय हमें संदेश भेज सकते हैं।',
        namePlaceholder: 'अपना नाम दर्ज करें',
        submitBtn: 'जमा करें'
      }
    }
  }
};
