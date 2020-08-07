
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' }
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/style.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/firebase.js',
  ],
  env: {
    GADA_FIREBASE_API_KEY: process.env.GADA_FIREBASE_API_KEY,
    GADA_FIREBASE_APP_ID: process.env.GADA_FIREBASE_APP_ID,
    GADA_FIREBASE_AUTH_DOMAIN: process.env.GADA_FIREBASE_AUTH_DOMAIN,
    GADA_FIREBASE_DATABASE_URL: process.env.GADA_FIREBASE_DATABASE_URL,
    GADA_FIREBASE_MEASUREMENT_ID: process.env.GADA_FIREBASE_MEASUREMENT_ID,
    GADA_FIREBASE_MESSAGING_SENDER_ID: process.env.GADA_FIREBASE_MESSAGING_SENDER_ID,
    GADA_FIREBASE_PASSWORD: process.env.GADA_FIREBASE_PASSWORD,
    GADA_FIREBASE_PROJECT_ID: process.env.GADA_FIREBASE_PROJECT_ID,
    GADA_FIREBASE_STORAGE_BUCKET: process.env.GADA_FIREBASE_STORAGE_BUCKET,
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  loaders: [
    { test: /\.js$/, loader: 'babel', query: { compact: false } }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/recaptcha',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt'
  ],


  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: '6LewnrsZAAAAAGl37ooaSgbpQXVzcPjIb9w19p6p', // Site key for requests
    version: 2, // Version
    size: 'invisible' // Size: 'compact', 'normal', 'invisible' (v2)
  },
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
