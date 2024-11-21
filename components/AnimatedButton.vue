<template>
  <button
    class="btn-primary-lg relative min-w-64 focus:outline-none"
    :disabled="isDisabled"
    @click.prevent="clickAction"
  >
    <transition name="grow-to-right" :appear="true">
      <div class="btn-primary-lg-content">
        <span>
          <span v-if="icon" :class="icon" class="pl-2 pr-1 -mt-2" />
          <span
            v-if="!loading || (loading && !loader)"
            :class="{'mr-16':showArrow, 'mr-3': title.length && icon}"
            class="max-w-xxs pt-px leading-tight"
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
      </div>
    </transition>
  </button>
</template>

<script>
export default {
  name: 'AnimatedButton',

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
    icon: {
      type: String,
      default: null
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

<style lang="postcss" scoped>
.btn-primary-lg {
  @apply .outline-none;
  .btn-primary-lg-content {
    @apply .font-sans .bg-red .text-white .text-h7 .font-semibold .uppercase .tracking-wide .text-left .px-4 .relative;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    transition: 150ms ease-in-out;
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

/* GROW TO RIGHT */
.grow-to-right-enter-active {
  animation: grow-to-right 1.6s cubic-bezier(0.32, 0.21, 0.4, 1.04);
}

.grow-to-right-leave-active {
  animation: grow-to-right 0.5s reverse;
}

@keyframes grow-to-right {
  0% {
    -webkit-clip-path: polygon(0 0, 0 0 at 0 100%, 0% 100%);
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
    opacity: 0;
  }

  100% {
    -webkit-clip-path: polygon(0 0, 100% 0 at 100% 100%, 0% 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    opacity: 100;
  }
}

/* FADE - DELAYED */
.fade-delayed-enter-active {
  transition: all 2s ease;
}

.fade-delayed-leave-active {
  transition: all 0.15s cubic-bezier(0.7, 0.03, 0.93, 0.71);
}

.fade-delayed-enter,
.fade-ldelayed-eave-to {
  opacity: 0;
}
</style>
