import { join } from 'path'
import axios from 'axios'

const gtm_script = `// Google Tag Manager //
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TFJVDND');
// End Google Tag Manager`

export default {
  mode: 'spa',
  // for SSL
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
  //   }
  // },

  /*
   ** Headers of the page
   */
  head: {
    title: 'SPONSOR.ONLINE',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Game changing connections between top brands and professional football teams.'
      },
      {
        name: 'google-site-verification',
        content:
          process.env.NODE_ENV === 'staging'
            ? 'dummy'
            : 'Ube72l9yoLBip_8lCQ0ZF4gQ5aaIf5Fez0-0zQKt0SQ'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://cdn.lineicons.com',
        crossorigin: true
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.lineicons.com/1.0.1/LineIcons.min.css'
      }
    ],
    script:
      process.env.NODE_ENV === 'production'
        ? [
            {
              src: 'https://js.hs-scripts.com/3982395.js'
            },
            {
              type: 'text/javascript',
              innerHTML: gtm_script
            },
            {
              type: 'text/javascript',
              src: '//script.crazyegg.com/pages/scripts/0114/6798.js',
              async: true
            }
          ]
        : [
            {
              type: 'text/javascript',
              innerHTML: gtm_script
            },
            {
              type: 'text/javascript',
              src: '//script.crazyegg.com/pages/scripts/0114/6798.js',
              async: true
            }
          ],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/Loading.vue',
  // loading: {
  //   color: '#ff553f'
  // },
  loadingIndicator: '~/loading-indicator.html',

  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },

  /*
   ** Global CSS
   */
  css: [
    // 'nuxt-dropzone/dropzone.css',
    {
      src: join(__dirname, 'assets/css/vuetify/main.styl'),
      lang: 'styl'
    },
    '~/assets/css/tailwind.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/filters',
    '~/plugins/injector',
    '~/plugins/portals',
    '~/plugins/bugsnag',
    '~/plugins/echo',
    '~/plugins/vuetify',
    '~/plugins/placeholders',
    '~/plugins/socialSharing',
    '~/plugins/scrollSpy',
    '~/plugins/googleMaps',
    '~/plugins/masonry',
    '~/plugins/highcharts',
    '~/plugins/read-more',
    '~/plugins/cypress',
    '~/plugins/lazysizes.client.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // ['@nuxtjs/dotenv', { filename: '.env.e2e' }], // for e2e tests
    ['@nuxtjs/dotenv', { filename: '.env' }], // for dev
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/toast',
    '@nuxtjs/svg-sprite',
    'nuxt-webfontloader',
    'nuxt-stripe-module',
    [
      '@nuxtjs/redirect-module',
      [
        {
          from: '^/sign-in',
          to: '/login'
        },
        {
          from: '^/unit/(\\d*)/settings$',
          to: '/unit/$1/settings/profile'
        },
        {
          from: '^/unit/(\\d*)/marketplace/team/(\\d*)$',
          to: '/unit/$1/marketplace/team/$2/inventory'
        }
      ]
    ],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-120120441-1',
        dev: false
      }
    ],
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: true, // Hide badge element (v3)
        siteKey: '6LcT9HooAAAAAAO5_o7TsXSO1rNI_7v5saRD55y9', // Site key for requests
        version: 3 // Version
      }
    ],
    [
      'nuxt-i18n',
      {
        locales: [
          // {
          //   code: 'pseudo',
          //   iso: 'en-PSEUDO',
          //   file: 'pseudo.json'
          // },
          {
            code: 'en',
            iso: 'en-US',
            file: 'en.json'
          },
          {
            code: 'de',
            iso: 'de-DE',
            file: 'de.json'
          },
          {
            code: 'es',
            iso: 'es-ES',
            file: 'es.json'
          }
          // {
          //   code: 'fr',
          //   iso: 'fr-FR',
          //   file: 'fr.json'
          // },
          // {
          //   code: 'it',
          //   iso: 'it-IT',
          //   file: 'it.json'
          // }
        ],
        defaultLocale: 'en',
        detectBrowserLanguage: false,
        lazy: true,
        seo: true,
        langDir: './locales/',
        vueI18n: {
          fallbackLocale: 'en'
        }
      }
    ],
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    // '@nuxt/content',
    '@nuxtjs/feed'
  ],

  manifest: {
    name: 'Sponsor.Online',
    display: 'standalone',
    short_name: 'Sponsor',
    description:
      'Game changing connections between top brands and professional football teams.',
    start_url: '/',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#ff553f'
  },

  icon: {
    accessibleIcons: false,
    sizes: [64, 120, 144, 152, 192, 384, 512]
  },

  robots: {
    UserAgent: '*',
    Disallow: ['/pseudo', '/*?author', '/*?tag', '/unit*']
  },

  sitemap: {
    hostname: process.env.BASE_URL,
    gzip: true,
    exclude: [
      '/teams/**',
      '/brands/**',
      '/**/components/**',
      '/**/components',
      '/**/widgets/**',
      '/**/widgets',
      '/**/register/**'
    ],
    routes: async () => {
      const { data } = await axios.post(
        process.env.VUE_APP_BACKEND_URL
          ? process.env.VUE_APP_BACKEND_URL + '/graphql'
          : 'https://so-backendr-production.appspot.com/graphql',
        {
          operationName: 'FilteredBlogPosts',
          variables: {
            author: null,
            tag: null
          },

          query: `query FilteredBlogPosts($author: String, $tag: String) {
            blog {
              posts(latest: true, author: $author, tag: $tag) {
                id
                slug
                __typename
              }
              __typename
            }
          }`
        }
      )
      return data.data.blog.posts.map(post => encodeURI(`/news/${post.slug}`))
    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true
    }
  },

  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      create: async feed => {
        const { data } = await axios.post(
          process.env.VUE_APP_BACKEND_URL
            ? process.env.VUE_APP_BACKEND_URL + '/graphql'
            : 'https://so-backendr-production.appspot.com/graphql',
          {
            operationName: 'FilteredBlogPosts',
            variables: {
              author: null,
              tag: null
            },
            query: `query FilteredBlogPosts($author: String, $tag: String) {
              blog {
                posts(latest: true, author: $author, tag: $tag) {
                  id
                  title
                  slug
                  excerpt
                  __typename
                }
                __typename
              }
            }`
          }
        )

        const base_url = process.env.BASE_URL || 'https://sponsoronline.eu'

        feed.options = {
          title: 'Sponsor.Online',
          link: `${base_url}/feed.xml`,
          description:
            'Game changing connections between top brands and professional football teams.'
        }

        const feed_items = data.data.blog.posts.forEach(post => {
          const item_url = encodeURI(`${base_url}/news/${post.slug}`)
          feed.addItem({
            title: post.title,
            id: item_url,
            link: item_url,
            description: post.excerpt
          })
        })
      },
      cacheTime: 1000 * 60 * 24, // 24 hours
      type: 'rss2' // Can be: rss2, atom1, json1
    }
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js'
    }
  },

  stripe: {
    version: 'v3',
    publishableKey: 'pk_test_foBNqSuGERDxHZIPJlIR74Kb'
  },

  toast: {
    position: 'top-center',
    duration: 3000,
    iconPack: 'fontawesome'
  },

  webfontloader: {
    google: {
      families: ['Source+Sans+Pro:300,400,600,700:latin-ext']
    }
  },

  vue: {
    config: {
      performance: process.env.BASE_ENVIROMENT !== 'prod'
    }
  },

  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets() {
        const targets = { ie: '11' }

        return [[require.resolve('@nuxt/babel-preset-app'), { targets }]]
      }
    },
    postcss: {
      postcssOptions: {
        plugins: [
          require('postcss-for'),
          require('postcss-nested-ancestors'),
          require('postcss-nested'),
          require('postcss-current-selector'),
          require('tailwindcss')(join(__dirname, 'tailwind.config.js')),
          require('autoprefixer')
        ]
      }
    },
    transpile: [/^vue2-google-maps($|\/)/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        ctx.loaders.vue.transformAssetUrls.img = ['data-src', 'src']
        ctx.loaders.vue.transformAssetUrls.source = ['data-srcset', 'srcset']

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
