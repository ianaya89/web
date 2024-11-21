<template>
  <modal ref="confirmationModal">
    <template v-slot:header>
      <div class="border-b border-grey-l4 pb-2">
        {{ getHeaderText }}
      </div>
      <span class="absolute top-8 right-8 lni-close text-red hover:text-red-d1 cursor-pointer" @click="$refs.confirmationModal.close()" />
    </template>
    <template v-slot:body>
      <div class="border-b border-grey-l4 pb-6">
        {{ getBodyText }}
      </div>
    </template>
    <template v-slot:footer>
      <div class="mt-8">
        <app-button ref="confirmBtn" :title="getConfirmBtnText" :loader="true" @clicked="$emit('confirmed')" />
        <app-button :btn-class="'light'" :show-arrow="true" :title="$t('general.cancel')" @clicked="$refs.confirmationModal.close()" />
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'

export default {
  name: 'ConfirmationModal',

  components: {
    Modal,
    AppButton
  },

  props: {
    headerText: {
      type: String,
      default: null
    },

    bodyText: {
      type: String,
      default: null
    },

    confirmBtnText: {
      type: String,
      default: null
    }
  },

  computed: {
    getConfirmBtnText() {
      return (
        this.confirmBtnText ||
        this.$t('app.confirmation_modal.confirm_btn.text')
      )
    },

    getBodyText() {
      return this.bodyText || this.$t('app.confirmation_modal.body.text')
    },

    getHeaderText() {
      return this.headerText || this.$t('app.confirmation_modal.header.title')
    }
  },

  methods: {
    open() {
      this.$refs.confirmationModal.open()
    },

    close() {
      this.$refs.confirmationModal.close()
    }
  }
}
</script>

<style lang="postcss" scoped>
.modal-backdrop {
  @apply .w-screen .h-screen .absolute .flex .justify-center .top-0 .left-0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99999;
  position: fixed;
  overflow: scroll;
  transition: all 0.3s ease-in;
}

.modal {
  @apply .bg-white .shadow-lg;
}

.modal-header {
  @apply .text-h3 .font-medium .pt-8 .px-8 .relative;

  button {
    @apply .text-menu .outline-none .mt-4 .mr-2 .right-0 .top-0;
    position: absolute !important;
  }
}

.modal-body {
  @apply .px-8 .py-2 .font-serif .relative;
}

.modal-footer {
  @apply .border-grey-l3 .pt-0 .pb-4 .px-8 .font-serif .w-full;
}

.social-type {
  @apply .ml-auto .text-h3 .mb-auto;

  &.fa-facebook-square {
    color: #3c5a99;
  }

  &.fa-instagram {
    color: #dc4175;
  }

  &.fa-youtube {
    color: #c4302b;
  }

  &.fa-twitter-square {
    color: #00aced;
  }
}
</style>
