<template>
  <div class="relative" :class="{'w-5 h-6' : activator || deactivator}" @click.stop>
    <transition name="fade">
      <div v-show="!activated && activator" class="cursor-pointer absolute top-0 left-0 right-0 bottom-0 text-center" @click="toggleDropdown">
        <slot name="activator">
          <span class="fas fa-chevron-down text-red" />
        </slot>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="activated && deactivator" class="cursor-pointer absolute top-0 left-0 right-0 bottom-0 text-center" @click="toggleDropdown">
        <slot name="deactivator">
          <span class="fas fa-times text-red" />
        </slot>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="activated" class="dropdown-items" :class="itemsClasses">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',

  props: {
    itemsClasses: {
      type: String,
      default: 'top-gap p-4'
    },
    activator: {
      type: Boolean,
      default: true
    },
    deactivator: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    activated: false
  }),

  computed: {
    activeDropdown() {
      return this.$store.getters['dropdown/getActiveDropdown']
    }
  },

  mounted() {
    document.addEventListener('click', () => {
      if (this.activated) {
        this.hideDropdown()
      }
    })
  },

  methods: {
    toggleDropdown() {
      if (this.activeDropdown != null && !this.activated) {
        this.activeDropdown.closeFnc()
      }
      this.activated = !this.activated
      if (this.activated) {
        this.$store.dispatch('dropdown/setActiveDropdown', {
          uuid: this._uid,
          closeFnc: this.hideDropdown
        })
      } else {
        this.$store.dispatch('dropdown/clear')
      }
    },

    hideDropdown() {
      this.activated = false
      this.$store.dispatch('dropdown/clear')
    }
  }
}
</script>

<style lang="postcss" scoped>
.dropdown-items {
  @apply .border .border-grey-l4 .bg-white .absolute .shadow-md .z-40 .right-0;
}

.top-gap {
  top: 1.5rem;
}
</style>
