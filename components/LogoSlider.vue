<template>
  <div class="w-full">
    <div class="flex flex-row justify-start">
      <div v-for="(logo, key) in logobatches" :key="key" class="logo-img inline-block px-4">
        <img
          :src="require('../assets/images/clients' + logo.pathShort.substr(1))"
          :alt="logo.pathShort.substr(1)"
          style="max-width: 15rem;"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoSlider',

  components: {},

  props: {
    logobatches: {
      type: Array,
      required: true
    }
  },

  computed: {},

  methods: {}
}
</script>

<style scoped>
.logo-img {
  width: 20%;

  img {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 767px) {
  .logo-img {
    width: 25%;
  }

  @media (max-width: 500px) {
    .logo-img.px-4 {
      padding-left: 0.3rem;
      padding-right: 0.3rem;
    }
  }
}
</style>
