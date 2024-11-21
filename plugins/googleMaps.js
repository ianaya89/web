import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDyhw8RtoLeOv9IvGdH82Vz0BgdP_vMLwc',
    libraries: 'places'
  }
})
