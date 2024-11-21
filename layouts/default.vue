<template>
  <v-app class="layout--app min-h-screen flex bg-white">
    <transition name="slide-fade">
      <nuxt />
    </transition>

    <portal-target name="modals-outlet" multiple />
  </v-app>
</template>
<script>
import App from './app'

export default App.extend({
  name: 'DefaultLayout',

  middleware: ['unit-permissions']
})
</script>
<style>
</style>
