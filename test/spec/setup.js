import Vue from 'vue'
import Vuex from 'vuex'
import { config, RouterLinkStub } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueHighcharts from 'vue2-highcharts'
import {
  currencyFormatter,
  dateFormatter,
  dateTimeFormatter,
  numberFormatter,
  percentageFormatter,
  stringTruncater
} from '@/plugins/filters'
import {
  firstCategory,
  secondaryCategory,
  get,
  normalizeCategoryName,
  tertiaryCategory
} from '@/services/helpers'

Vue.config.silent = true
Vue.use(Vuetify)
// make sure that Vuetify always has data-app wrapper
const el = document.createElement('div')
el.setAttribute('data-app', true)
document.body.appendChild(el)

Vue.use(Vuex)
Vue.component('VueHighcharts', VueHighcharts)

Vue.filter('date', dateFormatter)
Vue.filter('dateTime', dateTimeFormatter)
Vue.filter('truncate', stringTruncater)
Vue.filter('number', numberFormatter)
Vue.filter('currency', currencyFormatter)
Vue.filter('percentage', percentageFormatter)

Vue.prototype.$get = get
Vue.prototype.$filters = {
  date: dateFormatter,
  percentage: percentageFormatter,
  dateTime: dateTimeFormatter,
  number: numberFormatter,
  currency: currencyFormatter
}
Vue.prototype.$helpers = {
  normalizeCategoryName,
  secondaryCategory,
  tertiaryCategory,
  firstCategory
}

// Mock general functions
config.mocks.localePath = path => path
config.mocks.$t = path => 'TRANSLATE:' + path
config.mocks.$tc = path => 'COUNT-TRANSLATE:' + path
config.mocks.$store = {}
config.mocks.$i18n = {
  locale: 'en',
  locales: [
    {
      code: 'en'
    }
  ],
  messages: []
}
config.mocks.$store.dispatch = args => 'STORE:' + args
config.mocks.$store.getters = args => 'STORE-getters:' + args
config.mocks.$store.getters['compare/items'] = []
config.mocks.$store.getters['dropdown/getActiveDropdown'] = null

config.mocks.$apollo = property => 'APOLLO:' + property

// Mock Nuxt components
config.stubs['nuxt-link'] = RouterLinkStub
config.stubs['no-ssr'] = '<span><slot /></span>'
