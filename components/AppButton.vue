<template>
  <button
    :class="['button--' + btnClass, {disabled : isDisabled}]"
    :disabled="isDisabled"
    class="relative focus:outline-none"
    @click.prevent="clickAction"
  >
    <span
      v-if="showLeftArrow"
      class="text-h3 animation--left-arrow h-full flex align-center justify-end"
    >
      <span class="lni-arrow-left my-auto" />
    </span>

    <span>
      <span v-if="icon" :class="icon" class="pl-2 pr-1 -mt-2" />
      <span
        v-if="!loading || (loading && !loader)"
        :class="{'mr-16':showArrow, 'mr-3': title.length && icon, 'pl-10':showLeftArrow, 'custom-max-md': maxWidthMd, 'max-w-xxs': !maxWidthMd}"
      >
        <slot>{{ title }}</slot>
      </span>

      <span v-if="loading && loader" class="animation--loading-dots">
        {{ $t('general.loading') }}
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </span>

    <span
      v-if="showArrow"
      class="text-h3 ml-8 animation--arrow w-full h-full flex align-center justify-end"
    >
      <span class="lni-arrow-right my-auto" />
    </span>
  </button>
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    title: {
      type: String,
      default: 'title'
    },
    loader: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    shouldDisable: {
      type: Boolean,
      default: false
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    showLeftArrow: {
      type: Boolean,
      default: false
    },
    btnClass: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: null
    },
    maxWidthMd: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    loading: false
  }),

  computed: {
    isDisabled() {
      return (this.shouldDisable && this.loading) || this.disabled
    }
  },

  methods: {
    clickAction() {
      this.$emit('clicked')
      if (!this.loading) {
        this.loading = true
      }
    },

    loaded() {
      this.loading = false
    }
  }
}
</script>

<style lang="postcss">
.custom-max-md {
  max-width: 23.5rem;
}
.button--primary {
  @apply .font-sans .bg-red .text-white .text-menu .font-semibold .uppercase .tracking-wide .px-8;
  padding-top: 0.8rem;
  padding-bottom: 0.625rem;
  min-width: 4rem;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .bg-red-d1 .outline-none;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }

  .lni-arrow-right {
    line-height: 1.3;
  }

  .lni-arrow-left {
    line-height: 1.3;
  }
}

.button--primary-outlined {
  @apply .font-sans .text-red .bg-transparent .text-menu .font-semibold .uppercase .tracking-wide .px-1 .border .border-red;
  padding-top: 0.8rem;
  padding-bottom: 0.625rem;
  border-style: solid;
  min-width: 4rem;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .bg-red .outline-none .text-white .shadow-md;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }

  .lni-arrow-right {
    line-height: 1.3;
  }

  .lni-arrow-left {
    line-height: 1.3;
  }
}

.button--primary-inverted {
  @apply .font-sans .text-red .bg-white .text-menu .font-semibold .uppercase .tracking-wide .px-8;
  padding-top: 0.8rem;
  padding-bottom: 0.625rem;
  min-width: 4rem;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .bg-red-l6 .outline-none .text-red;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }

  .lni-arrow-right {
    line-height: 1.3;
  }

  .lni-arrow-left {
    line-height: 1.3;
  }
}

.button--primary-inverted-circle {
  @apply .font-sans .text-red .bg-white .text-menu .font-semibold .uppercase .tracking-wide .w-14 .h-14 .rounded-full .shadow-lg .flex .items-center .justify-center .cursor-pointer;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .bg-red-l6 .outline-none .text-red;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }

  .lni-arrow-right {
    line-height: 1.3;
  }

  .lni-arrow-left {
    line-height: 1.3;
  }
}

.button--primary-inverted-outlined {
  @apply .font-sans .text-red .bg-white .border .border-solid .border-red .text-menu .font-semibold .uppercase .tracking-wide .px-8;
  padding-top: 0.8rem;
  padding-bottom: 0.625rem;
  min-width: 4rem;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .bg-red-l6 .outline-none .text-red;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }

  .lni-arrow-right {
    line-height: 1.3;
  }

  .lni-arrow-left {
    line-height: 1.3;
  }
}

.button--primary-lg {
  @apply .font-sans .bg-red .text-white .text-h7 .font-semibold .uppercase .tracking-wide .text-left .px-4 .relative;
  padding-top: 1.5rem;
  padding-bottom: 1.25rem;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .bg-red-d1 .outline-none;
  }

  &:active {
    @apply .bg-red-d1;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }

  span {
    @apply .flex .items-center;

    span {
      @apply px-1;
    }
  }
}

@media (min-width: 576px) {
  .button--primary-lg {
    @apply .px-16;
  }
}

.button--secondary {
  @apply .font-sans .bg-black .text-white .text-menu .font-semibold .uppercase .tracking-wide .px-8;
  padding-top: 0.8em;
  padding-bottom: 0.625rem;
  min-width: 4rem;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .bg-grey-d1 .outline-none;
  }

  &:active {
    @apply .bg-black;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }

  .lni-arrow-right {
    line-height: 1.3;
  }

  .lni-arrow-left {
    line-height: 1.3;
  }
}

.button--secondary-inverted {
  @apply .font-sans .bg-white .text-black .text-menu .font-semibold .uppercase .tracking-wide .px-8;
  padding-top: 0.8em;
  padding-bottom: 0.625rem;
  min-width: 4rem;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .bg-grey-l5 .outline-none;
  }

  &:active {
    @apply .bg-grey-l4;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }

  .lni-arrow-right {
    line-height: 1.3;
  }

  .lni-arrow-left {
    line-height: 1.3;
  }
}

.button--light {
  @apply .font-sans .text-black .text-menu .font-semibold .uppercase .tracking-wide .px-5;
  padding-top: 0.8em;
  padding-bottom: 0.625rem;
  background-image: url('../assets/images/buton--link-bg.svg');
  background-size: 100%;
  background-position: -2rem;
  background-repeat: no-repeat;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .outline-none;
    background-position: 0rem;
  }

  .lni-arrow-right {
    line-height: 1.3;
  }

  .lni-arrow-left {
    line-height: 1.3;
  }
}

.button--link {
  @apply .text-red .font-serif;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .text-red-d1;
  }

  .lni-arrow-right {
    line-height: 0.5;
  }

  .lni-arrow-left {
    line-height: 0.5;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }
}

.button--link--secondary {
  @apply .text-black .font-serif;
  transition: 150ms ease-in-out;

  &:hover,
  &:active {
    @apply .text-grey;
  }

  .lni-arrow-right {
    line-height: 0.5;
  }

  .lni-arrow-left {
    line-height: 0.5;
  }

  &:hover .animation--arrow {
    right: 0.75rem;
  }
}

.animation--arrow {
  @apply .top-0 .absolute .text-right;
  right: 1.5rem;
  transition: 150ms ease-in-out;
}

.animation--left-arrow {
  @apply .top-0 .left-0 .absolute .text-left;
  transition: 150ms ease-in-out;
}

/* disabled button */
.disabled {
  opacity: 0.5;
}

/* LOADING DOTS ANIMATION */
@keyframes blink {
  0% {
    opacity: 0.2;
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}

.animation--loading-dots {
  span {
    animation-name: blink;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }
}
</style>
