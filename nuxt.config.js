import colors from 'vuetify/es5/util/colors'

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
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    '@nuxtjs/global-components'
  ],
  styleResources: {
    // your settings here
    scss: ['./assets/styles/vars.scss',
      './assets/styles/base.scss']
  },
  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/firebase'],

  firebase:{
    config: {
      apiKey: "AIzaSyDRV3JoacIOFK4T7HQrZu4t5TaP3u30Jtw",
      authDomain: "sellbuyschool42.firebaseapp.com",
      databaseURL: "https://sellbuyschool42.firebaseio.com",
      projectId: "sellbuyschool42",
      storageBucket: "sellbuyschool42.appspot.com",
      messagingSenderId: "372751462960",
      appId: "1:372751462960:web:4f13fdb715eb530fc733f5",
      measurementId: "G-8L12WKM790"
    },
    onFirebaseHosting: false,
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          // onAuthStateChangedAction: 'onAuthStateChanged'
        },
        ssr: true
      },
      firestore: {
        memoryOnly: false,
        static: false,
      },

      storage: true,
      realtimeDb: true,
      performance: true,
      analytics: true,
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: 60000,
          minimumFetchIntervalMillis: 43200000
        },
        defaultConfig: {
          welcome_message: 'Welcome'
        }
      },
      messaging: {
        createServiceWorker: true,
        actions: [
          {
            action: 'goToUrl',
            url: "https://github.com/lupas"
          }
        ]
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    //customVariables: ['~/assets/styles/variablesVuetify.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          some: '#ff72fc',
          primary: '#ff7fac',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
