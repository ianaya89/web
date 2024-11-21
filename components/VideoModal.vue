<template>
  <portal to="modals-outlet">
    <slot name="activator" />

    <transition name="fade-fast">
      <div
        v-show="visible"
        class="modal-backdrop"
        :class="{ 'items-start sm:items-center': !fullPage, 'items-start': fullPage }"
        @click.prevent.stop="close()"
      >
        <!--          <transition name="fade-fast">-->
        <div
          v-show="visible"
          class="modal media-modal w-full flex flex-col items-start"
          :class="modalClasses"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
          @click.stop
        >
          <header v-if="header" id="modalTitle" class="modal-header">
            <slot name="header">
              This is the default title!
              <button type="button" class="btn-close focus:outline-none" @click="close" />
            </slot>
          </header>
          <section id="modalDescription" class="modal-body text-h7 sm:text-menu mx-auto py-3 px-4">
            <div v-if="!header" class="modal-closer" @click="close">
              <span class="lni-close" />
            </div>
            <slot name="body" />
          </section>
        </div>
        <footer v-if="footer" class="modal-footer flex flex-initial items-end">
          <slot name="footer" />
        </footer>
        <!--          </transition>-->
      </div>
    </transition>
  </portal>
</template>

  <script>
export default {
  name: 'VideoModal',

  props: {
    fullPage: {
      type: Boolean,
      default: false
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
      default: ''
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
      this.$emit('start-iframe-video')
    },
    close() {
      this.visible = false
      this.$emit('pause-iframe-video')
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

.modal.media-modal {
  @apply .flex .bg-transparent .my-auto;
  height: 80%;

  .modal-header {
    @apply .text-h3 .font-medium .pt-8 .px-8 .relative;

    button {
      @apply .text-red .text-menu .outline-none .absolute .right-0 .top-0;
    }
  }

  .modal-body {
    @apply .p-0 .font-serif .relative;
    width: 60vw;
    height: auto;

    .modal-closer {
      @apply .absolute .font-bold .cursor-pointer .z-50;
      top: -5px;
      right: -10px;
    }
  }

  .lni-close:before {
    content: '\e951';
    color: #fff;
    font-weight: 900;
  }

  .modal-footer {
    @apply .border-grey-l3 .pt-4 .pb-8 .px-8 .font-serif .w-full;
  }
}

@media (max-width: 1200px) {
  .modal.media-modal {
    .modal-body {
      width: 80vw;
    }
  }
}
</style>
