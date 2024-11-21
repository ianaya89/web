<template>
  <v-app class="layout--app min-h-screen flex bg-white">
    <transition name="slide-fade">
      <nuxt />
    </transition>

    <portal-target name="modals-outlet" multiple />
  </v-app>
</template>
<script>
export default {
  name: 'QuestionnaireLayout'
}
</script>
<style>
</style>
