<template>
  <div class="feature-container w-full block sm:flex xl:mb-16" :class="{'flex-row-reverse justify-end' : leftImages}">
    <appear-transition ref="appearTransition" :percentage-offset="0.5">
      <div :class="{'w-full flex flex-col': leftImages, 'xl:w-4/5': !leftImages}">
        <div class="px-8 sm:pl-20 xl:pl-10 pr-6">
          <h2 class="text-5xl sm:text-6xl uppercase leading-none mt-2 xl:mt-24 max-w-xs" :class="{'ml-16 sm:ml-80 xl:ml-16': leftImages, 'pr-10 xl:pr-0': !leftImages}">
            {{ title }}
          </h2>
          <div class="max-w-xxs xl:max-w-sm pt-4" :class="{'ml-16 sm:ml-80 xl:ml-16': leftImages, '': !leftImages}">
            <p class="font-medium text-h7 text-grey">
              {{ body }}
            </p>
          </div>
          <ul class=" pt-10 pb-6" :class="{'pl-16 sm:text-right': leftImages, '': !leftImages}">
            <li v-for="(item, index) in items" :key="index" class="under-hood-link" :class="getUnderHoodLinkClass(index)" @click="activateUnderHoodImage(index)">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- <div class="px-8 sm:pl-20 xl:px-0">
          <app-button
            class="hidden sm:block md:w-auto mt-10 max-w-xs px-8 sm:px-24 xl:px-0"
            :class="{'-mr-24 sm:-mr-10': leftImages, '': !leftImages}"
            :title="$t('general.show_more')"
            :btn-class="'primary-lg'"
            :show-arrow="true"
            @clicked="redirectToTeamSignup"
          />
        </div> -->
      </div>
    </appear-transition>
    <div class="relative overflow-visible w-96" :class="{'xl:w-4/5 sm:-ml-64 xl:-ml-32 xxl:-ml-0': leftImages, '-ml-4 sm:-ml-0': !leftImages}">
      <img
        v-for="(item, index) in items"
        :key="index + 'image'"
        :ref="'underHoodImage' + index"
        :class="[getUnderHoodImageClass(index), getImageToUpAnimationClass(index), getImageToDownAnimationClass(index),getImageFromUpAnimationClass(index), getImageFromDownAnimationClass(index)]"
        class="under-hood-image h-full w-auto max-w-none max-h-none absolute opacity-0 overflow-hidden sm:h-128 shadow-xl xxl:shadow-none"
        :src="item.image"
        :alt="item.name"
      >
    </div>
    <!-- <div class="cta-button">
      <div :class="{'px-16 -mr-16': leftImages, 'xl:px-8 pr-14': !leftImages}">
        <app-button
          class="w-full block sm:hidden mt-96"
          :class="{'sm:ml-8 xl:-ml-10': leftImages, 'sm:-ml-8 xl:-ml-7': !leftImages}"
          :title="$t('general.show_more')"
          :btn-class="'primary-lg'"
          :show-arrow="true"
          @clicked="redirectToTeamSignup"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
import { removeItemFromArray } from '@/services/helpers'
import AppearTransition from '@/components/transitions/AppearTransition'
// import AppButton from '@/components/AppButton'

export default {
  name: 'AnimatedFeatures',

  components: {
    // AppButton,
    AppearTransition
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true
    },
    leftImages: {
      type: Boolean,
      default: false
    },
    forceAnimate: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    underHoodImageActiveIndex: 0,
    underHoodImagesToUpAnimation: [],
    underHoodImagesToDownAnimation: [],
    underHoodImagesFromUpAnimation: [],
    underHoodImagesFromDownAnimation: []
  }),

  computed: {
    getAnimationClassWithDirection() {
      return animation => animation + (this.leftImages ? '-left' : '-right')
    },

    getUnderHoodLinkClass() {
      return linkIndex =>
        linkIndex === this.underHoodImageActiveIndex
          ? 'under-hood-link-active'
          : ''
    },

    getUnderHoodImageClass() {
      return imageIndex =>
        imageIndex === this.underHoodImageActiveIndex
          ? 'under-hood-image-active'
          : ''
    },

    getImageToUpAnimationClass() {
      return imageIndex =>
        this.underHoodImagesToUpAnimation.includes(imageIndex)
          ? this.getAnimationClassWithDirection('under-hood-image-to-up')
          : ''
    },

    getImageToDownAnimationClass() {
      return imageIndex =>
        this.underHoodImagesToDownAnimation.includes(imageIndex)
          ? this.getAnimationClassWithDirection('under-hood-image-to-down')
          : ''
    },

    getImageFromUpAnimationClass() {
      return imageIndex =>
        this.underHoodImagesFromUpAnimation.includes(imageIndex)
          ? this.getAnimationClassWithDirection('under-hood-image-from-up')
          : ''
    },

    getImageFromDownAnimationClass() {
      return imageIndex =>
        this.underHoodImagesFromDownAnimation.includes(imageIndex)
          ? this.getAnimationClassWithDirection('under-hood-image-from-down')
          : ''
    }
  },

  mounted() {
    if (this.forceAnimate) {
      this.$refs.appearTransition.animateElement()
    }
  },

  methods: {
    redirectToTeamSignup() {
      return this.$router.push(this.localePath({ name: 'register' }))
    },

    activateUnderHoodImage(imageIndex) {
      const currentImageIndexCopy = this.underHoodImageActiveIndex

      if (imageIndex < this.underHoodImageActiveIndex) {
        this.underHoodImagesToUpAnimation = [currentImageIndexCopy]
        this.underHoodImagesFromDownAnimation = [imageIndex]
        setTimeout(() => {
          removeItemFromArray(
            this.underHoodImagesToUpAnimation,
            currentImageIndexCopy
          )
          removeItemFromArray(this.underHoodImagesFromDownAnimation, imageIndex)
        }, 700)
      } else if (imageIndex > this.underHoodImageActiveIndex) {
        this.underHoodImagesToDownAnimation = [currentImageIndexCopy]
        this.underHoodImagesFromUpAnimation = [imageIndex]
        setTimeout(() => {
          removeItemFromArray(
            this.underHoodImagesToDownAnimation,
            currentImageIndexCopy
          )
          removeItemFromArray(this.underHoodImagesFromUpAnimation, imageIndex)
        }, 700)
      }
      this.underHoodImageActiveIndex = imageIndex
    }
  }
}
</script>

<style lang="postcss" scoped>
.under-hood-image {
  @apply;
  transition: opacity 450ms ease-in;
  will-change: opacity;
}

@media (max-width: 576px) {
  .under-hood-image {
    @apply .h-auto .w-full;
  }
}

@media (min-width: 577px) and (max-width: 991px) {
  .under-hood-image {
    @apply .h-128;
  }
}

.under-hood-image-from-down-right {
  animation: come_from_down_right 700ms 1;
  animation-timing-function: linear;
}

.under-hood-image-from-up-right {
  animation: come_from_up_right 700ms 1;
  animation-timing-function: linear;
}

.under-hood-image-to-down-right {
  animation: to_down_right 700ms 1;
  animation-timing-function: linear;
}

.under-hood-image-to-up-right {
  animation: to_up_right 700ms 1;
  animation-timing-function: linear;
}

.under-hood-image-from-down-left {
  animation: come_from_down_left 700ms 1;
  animation-timing-function: linear;
}

.under-hood-image-from-up-left {
  animation: come_from_up_left 700ms 1;
  animation-timing-function: linear;
}

.under-hood-image-to-down-left {
  animation: to_down_left 700ms 1;
  animation-timing-function: linear;
}

.under-hood-image-to-up-left {
  animation: to_up_left 700ms 1;
  animation-timing-function: linear;
}

.under-hood-image-active {
  @apply .opacity-100;
}

.under-hood-link {
  @apply .inline .relative .uppercase .font-medium .text-h4 .text-grey-l2 .pr-1 .pb-2 .cursor-pointer .leading-loose;

  &:not(:last-of-type) {
    @apply .mr-4;
  }

  &:before {
    @apply .absolute .border-b-6 .border-grey-l3 .opacity-0 .left-0 .bottom-0;
    transition: 400ms ease-in-out;
    content: ' ';
    width: 0;
    height: 10px;
  }
}

@media (max-width: 576px) {
  .under-hood-link {
    &:not(:last-of-type) {
      @apply .mr-10;
    }
  }
}

.under-hood-link-active {
  @apply .text-black;

  &:before {
    @apply .opacity-100 .w-full;
  }
}

@keyframes come_from_down_right {
  0% {
    transform: matrix(0.85, 0, 0, 0.85, -100, 0);
  }
  100% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
}

@keyframes come_from_up_right {
  0% {
    transform: matrix(1.15, 0, 0, 1.15, 100, 0);
  }
  100% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
}

@keyframes to_up_right {
  0% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
  100% {
    transform: matrix(1.15, 0, 0, 1.15, 100, 0);
  }
}

@keyframes to_down_right {
  0% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
  100% {
    transform: matrix(0.85, 0, 0, 0.85, -100, 0);
  }
}

@keyframes come_from_down_left {
  0% {
    transform: matrix(0.85, 0, 0, 0.85, 100, 0);
  }
  100% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
}

@keyframes come_from_up_left {
  0% {
    transform: matrix(1.15, 0, 0, 1.15, -100, 0);
  }
  100% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
}

@keyframes to_up_left {
  0% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
  100% {
    transform: matrix(1.15, 0, 0, 1.15, -100, 0);
  }
}

@keyframes to_down_left {
  0% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
  100% {
    transform: matrix(0.85, 0, 0, 0.85, 100, 0);
  }
}
</style>
