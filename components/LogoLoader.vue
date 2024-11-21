<template>
  <div class="logo-loader">
    <img class="w-full h-full" :src="require('../assets/images/logos/so-symbol-primary.svg')">
  </div>
</template>

<script>
export default {
  name: 'LogoLoader'
}
</script>

<style lang="postcss" scoped>
.logo-loader {
  animation: scaling 1s ease-in-out infinite alternate;
  -webkit-animation: scaling 1s ease-in-out infinite alternate;

  @-webkit-keyframes scaling {
    0% {
      opacity: 0.6;
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    100% {
      opacity: 1;
      transform: scale(1.3);
      -webkit-transform: scale(1.3);
    }
  }

  @keyframes scaling {
    0% {
      opacity: 0.6;
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    100% {
      opacity: 1;
      transform: scale(1.3);
      -webkit-transform: scale(1.3);
    }
  }
}
</style>
