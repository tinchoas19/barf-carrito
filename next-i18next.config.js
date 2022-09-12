const path = require('path');

module.exports = {
  i18n: {
    //locales: ['en', 'de', 'es', 'ar', 'he', 'zh'],
    locales: ['es'],
    defaultLocale: 'es',
    // localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
