import proj4 from 'proj4'

import Vue from 'vue'
import VueHighcharts from 'vue2-highcharts'

if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4
}

Vue.component('VueHighcharts', VueHighcharts)
