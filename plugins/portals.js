import Vue from 'vue'
import PortalVue, { Portal, PortalTarget } from 'portal-vue'

Vue.use(PortalVue)
Vue.component('PortalTarget', PortalTarget)
Vue.component('Portal', Portal)
