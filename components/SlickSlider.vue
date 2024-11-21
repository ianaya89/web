<template>
  <div class="slick-slider relative w-full h-full">
    <transition name="fade-down" appear>
      <div class="nav-arrows px-8 py-8 absolute z-10">
        <span class="item-left lni-arrow-left" :class="{'disabled': itemIndex === 0}" @click="sliderToLeft" />
        <span class="item-right lni-arrow-right" :class="{'disabled': itemIndex === (items.length - 1)}" @click="sliderToRight" />
      </div>
    </transition>
    <div class="items-container">
      <div class="moving-items-container w-1/2 sm:w-full" :class="getSliderMoveClass">
        <div v-for="(item, index) in items" :key="index" class="slick-item" :class="getActiveItem(index)">
          <div class="images" @click="itemIndex = index">
            <img class="original-image w-auto" :src="item.image" :alt="item.name">
            <img class="grayscale-mask w-auto" :src="item.image" :alt="item.name">
          </div>
          <div class="item-text leading-normal">
            <p class="font-bold">
              {{ item.name }}
            </p> {{ item.position }}
            <a target="_blank" rel="noopener" :href="item.link" tabindex="0"><i class="fab fa-linkedin-in pl-1 text-p4 text-red" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlickSlider',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    itemIndex: 0
  }),

  computed: {
    getActiveItem() {
      return itemIndex => (this.itemIndex === itemIndex ? 'active' : '')
    },

    getSliderMoveClass() {
      return this.itemIndex === 0 ? '' : 'left-' + this.itemIndex
    }
  },

  methods: {
    sliderToLeft() {
      if (this.itemIndex !== 0) {
        this.itemIndex--
      }
    },

    sliderToRight() {
      if (this.itemIndex !== this.items.length - 1) {
        this.itemIndex++
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.slick-slider {
  @apply .w-full;

  .nav-arrows {
    top: 50rem;

    .item-left,
    .item-right {
      @apply .text-white .text-h4 .cursor-pointer;
      transition: color 150ms ease-in-out;
      user-select: none;

      &.disabled {
        @apply .cursor-default;
      }
    }

    .item-right {
      @apply .pl-6;
    }

    .item-left:not(.disabled):hover,
    .item-right:not(.disabled):hover {
      @apply .text-red;
    }
  }

  .items-container {
    @apply .overflow-hidden .absolute;

    .moving-items-container {
      @apply .relative .flex;
      transition: transform 500ms ease-out;
      will-change: transform;

      &.left-1 {
        transform: translate3d(-225px, 0px, 0px);
      }

      &.left-2 {
        transform: translate3d(-450px, 0px, 0px);
      }

      &.left-3 {
        transform: translate3d(-672px, 0px, 0px);
      }

      &.left-4 {
        transform: translate3d(-900px, 0px, 0px);
      }
    }

    @media (max-width: 576px) {
      .moving-items-container {
        &.left-1 {
          transform: translate3d(-225px, 0px, 0px);
        }

        &.left-2 {
          transform: translate3d(-450px, 0px, 0px);
        }

        &.left-3 {
          transform: translate3d(-672px, 0px, 0px);
        }

        &.left-4 {
          transform: translate3d(-800px, 0px, 0px);
        }
      }
    }

    .slick-item {
      @apply .inline-block .relative .w-56;

      .images {
        @apply .relative .overflow-hidden .w-full .block;

        img {
          @apply .max-w-none;
          transition: all 500ms ease-out;
        }

        .grayscale-mask {
          @apply .opacity-100 .absolute .top-0 .left-0 .cursor-pointer;
          -webkit-filter: grayscale(100%);
          filter: grayscale(100%);
        }
      }

      .item-text {
        @apply .absolute .text-white .w-56 .h-48 .opacity-0 .p-4;
        left: 0;
        bottom: 7px;
        transition: opacity 500ms ease-out;
        will-change: opacity;
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(0, 0, 0, 0.15) 75%,
          rgba(0, 0, 0, 0) 100%
        );

        a {
          @apply .text-white;
        }
      }

      &.active {
        @apply .w-full;

        .images {
          @apply .w-full;

          .original-image {
            @apply;
          }

          .grayscale-mask {
            @apply .opacity-0 .cursor-default;
          }
        }

        .item-text {
          @apply .opacity-100;
        }
      }
    }
  }
}
</style>
