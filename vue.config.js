module.exports = {
  pwa: {
    manifestOptions: {
      display: 'fullscreen',
      // eslint-disable-next-line @typescript-eslint/camelcase
      start_url: '.',
    },
    name: 'Börsenclient',
    themeColor: '#000',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    iconPaths: {
      favicon32: 'pwa/moonstonks.svg',
      favicon16: 'pwa/moonstonks.svg',
      appleTouchIcon: 'pwa/splash/apple-icon-180.jpg',
      maskIcon: 'pwa/moonstonks.svg',
      msTileImage: 'pwa/splash/manifest-icon-512.png',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData:
          "@import '@/scss/_variables.scss';\n@import '@/scss/_mixins.scss';",
      },
    },
  },
};
