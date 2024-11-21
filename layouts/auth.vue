<template>
  <v-app class="layout--app min-h-screen bg-white">
    <div class="flex flex-wrap w-full min-h-screen relative">
      <div class="w-full sm:w-2/3">
        <transition name="fade-up" :appear="true">
          <nuxt />
        </transition>
      </div>
      <div class="hidden sm:flex w-1/3 justify-between h-screen fixed right-0">
        <div class="hidden lg:block absolute top-0 right-0 py-6 pr-12 z-10">
          <logo variant="light" />
        </div>
        <transition name="clip-path-slide-up" :appear="true">
          <div class="w-full side-img-02 bg-cover bg-right bg-no-repeat" />
        </transition>
      </div>
    </div>

    <portal-target name="modals-outlet" multiple />
  </v-app>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  name: 'AuthLayout',

  components: {
    Logo
  },

  mounted() {
    //
  }
}
</script>

<style lang="postcss" scoped>
.side-img-02 {
  background-image: url('../assets/images/login.jpg');
}
</style>
