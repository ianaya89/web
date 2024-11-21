<template>
  <img :src="src" :alt="alt" :class="{'clip-animation' : animationImg}" @load="animateImg">
</template>

<script>
export default {
  name: 'AnimatedImage',

  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },

  data: () => ({
    animationImg: false
  }),

  methods: {
    animateImg() {
      this.animationImg = true
      setTimeout(() => {
        this.animationImg = false
      }, 1000)
    }
  }
}
</script>

<style lang="postcss" scoped>
img {
  @apply .absolute;
  object-fit: cover;
  z-index: -10;
}

@media (min-width: 577px) and (max-width: 991px) {
  img {
    @apply .h-full;
    right: -18rem;
  }
}

@media (max-width: 576px) {
  img {
    @apply .h-full;
    right: -16rem;
  }
}

.clip-animation {
  -webkit-clip-path: polygon(
    0 100%,
    0 100%,
    100% 100%,
    100% 100%,
    68% 100%,
    68% 100%,
    25% 100%,
    25% 100%
  );
  clip-path: polygon(
    0 100%,
    0 100%,
    100% 100%,
    100% 100%,
    68% 100%,
    68% 100%,
    25% 100%,
    25% 100%
  );
}

.clip-animation {
  animation: clip 1s 1;
}

@keyframes clip {
  0% {
    -webkit-clip-path: polygon(
      0 100%,
      0 100%,
      100% 100%,
      100% 100%,
      68% 100%,
      68% 100%,
      25% 100%,
      25% 100%
    );
    clip-path: polygon(
      0 100%,
      0 100%,
      100% 100%,
      100% 100%,
      68% 100%,
      68% 100%,
      25% 100%,
      25% 100%
    );
  }
  20% {
    -webkit-clip-path: polygon(
      0 33%,
      0 100%,
      100% 100%,
      100% 70%,
      68% 70%,
      68% 58%,
      25% 58%,
      25% 33%
    );
    clip-path: polygon(
      0 33%,
      0 100%,
      100% 100%,
      100% 70%,
      68% 70%,
      68% 58%,
      25% 58%,
      25% 33%
    );
  }
  100% {
    -webkit-clip-path: polygon(
      0 0,
      0 100%,
      100% 100%,
      100% 70%,
      68% 70%,
      68% 58%,
      25% 58%,
      25% 33%
    );
    clip-path: polygon(
      0 0,
      0 100%,
      100% 100%,
      100% 0,
      68% 0,
      68% 0,
      25% 0,
      25% 0
    );
  }
}
</style>
