import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    title: 'x5',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ]
  },

  css: ['~/assets/style/app.scss'],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  plugins: [],

  modules: [
    '@nuxtjs/axios'
  ],

  vuetify: {
    customVariables: ['~/assets/style/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green
        }
      }
    }
  },

  build: {}
}
