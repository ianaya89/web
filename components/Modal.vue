<template>
  <portal to="modals-outlet">
    <slot name="activator" />

    <transition name="fade-fast">
      <div
        v-show="visible"
        :data-cy="cyIdentifier"
        class="modal-backdrop"
        :class="{ 'items-start sm:items-center': !fullPage, 'items-start': fullPage }"
        @click.prevent.stop="close()"
      >
        <!--          <transition name="fade-fast">-->
        <div
          v-show="visible"
          class="modal w-full flex flex-col items-start"
          :class="modalClasses"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
          @click.stop
        >
          <div class="w-full flex-grow">
            <header v-if="header" id="modalTitle" class="modal-header">
              <slot name="header">
                This is the default title!
                <button type="button" class="btn-close" @click="close" />
              </slot>
            </header>
            <section id="modalDescription" class="modal-body text-h7 sm:text-menu">
              <slot name="body" />
            </section>
          </div>
          <footer v-if="footer" class="modal-footer flex flex-initial items-end">
            <slot name="footer" />
          </footer>
        </div>
        <!--          </transition>-->
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    fullPage: {
      type: Boolean,
      default: false
    },
    cyIdentifier: {
      type: String,
      default: ''
    },
    header: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    modalSizeClasses: {
      type: String,
      default: 'min-h-screen sm:min-h-auto sm:max-w-md sm:mx-12'
    }
  },

  data: () => ({
    visible: false
  }),

  computed: {
    modalClasses() {
      if (this.fullPage) {
        return 'min-w-screen min-h-screen'
      } else {
        return this.modalSizeClasses
      }
    }
  },

  methods: {
    open() {
      this.visible = true
      this.$emit('opened')
    },
    close() {
      this.visible = false
      this.$emit('closed')
    }
  }
}
</script>

<style lang="postcss" scoped>
.modal-backdrop {
  @apply .w-screen .h-screen .fixed .flex .justify-center .top-0 .left-0 .overflow-y-scroll;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99999;
  transition: all 0.3s ease-in;
}

.modal {
  @apply .bg-white .shadow-lg;
}

.modal-header {
  @apply .text-h3 .font-medium .pt-8 .px-8 .relative;

  button {
    @apply .text-red .text-menu .outline-none .absolute .right-0 .top-0;
  }
}

.modal-body {
  @apply .py-6 .px-8 .font-serif;
}

.modal-footer {
  @apply .border-grey-l3 .pt-4 .pb-8 .px-8 .font-serif .w-full;
}
</style>
