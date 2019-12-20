const pkg = require('./package')

module.exports = {
  env: {
    BASE_URL: 'http://localhost:3000'
  },
  mode: 'universal',
  generate: {
    routes: [
      '/',
      '/broadcast',
      '/view'
    ]
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '🐢 Turtle WebRTC Stream',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '@/plugins/webrtc-client',
      ssr: false
    }
  ],

  /*
  ** Nuxt.js modules
  */
  // modules: [
  //   '@nuxtjs/pwa'
  // ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
