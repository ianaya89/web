<template>
  <app-tooltip v-if="alt!==null" :position="tooltipPosition" :color="tooltipColor">
    <template v-slot:activator>
      <div :class="classes" class="bg-transparent p-px">
        <div :style="{ 'background-image': imageUrl }" :class="[roundedClass, avatarClasses]" class="h-full bg-center bg-no-repeat bg-cover border border-grey-l4" />
      </div>
    </template>
    {{ alt }}
  </app-tooltip>
  <div v-else :class="classes" class="inline-block bg-transparent p-px">
    <div :style="{ 'background-image': imageUrl }" :class="[roundedClass, avatarClasses]" class="h-full bg-center bg-no-repeat bg-cover relative border border-grey-l4">
      <div v-if="hasIcon" class="bottom-0 right-0 absolute z-10 icon-sign -m-1" :class="iconSign">
        <span :class="iconSign" />
      </div>
    </div>
  </div>
</template>

<script>
import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'Avatar',

  components: {
    AppTooltip
  },

  props: {
    alt: {
      type: String,
      default: null
    },
    tooltipPosition: {
      type: String,
      default: 'top'
    },
    tooltipColor: {
      type: String,
      default: 'light'
    },
    src: {
      type: String,
      default: require('../assets/images/thumb-fallback.svg')
    },
    iconSign: {
      type: String,
      default: null
    },
    rounded: {
      type: Boolean,
      default: true
    },
    classes: {
      type: String,
      default: 'h-16 w-16'
    },
    avatarClasses: {
      type: String,
      default: ''
    }
  },

  computed: {
    imageUrl() {
      return `url(${this.src ||
        require('../assets/images/thumb-fallback.svg')})`
    },

    hasIcon() {
      return this.iconSign !== null && this.iconSign !== ''
    },

    roundedClass() {
      return this.rounded ? 'rounded-full' : ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.icon-sign {
  @apply .text-p3 .text-white .text-center .p-1 .w-6 .h-6 .shadow .flex;

  span {
    @apply .m-auto;
  }

  &::before {
    content: none;
  }

  &.fa-facebook-f {
    background-color: #3c5a99;
  }

  &.fa-instagram {
    @apply .text-p2;
    background-color: #dc4175;
  }

  &.fa-youtube {
    background-color: #c4302b;
  }

  &.fa-twitter {
    background-color: #00aced;
  }

  &.fa-twitter-square {
    background-color: #00aced;
  }

  &.fa-tiktok {
    background-color: #000;
  }

  &.fa-weibo {
    background-color: #d52a2c;
  }

  &.fa-globe {
    background-color: #fff;
    color: #999;
  }
}
</style>
