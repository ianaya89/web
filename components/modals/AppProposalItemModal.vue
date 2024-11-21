<template>
  <modal ref="modal" v-bind="$props" class="bg-white">
    <template v-slot:header>
      <div class="border-b border-grey-l4 pb-2">
        {{ $t('app.proposal.add_item_modal.title') }}
      </div>
      <app-button class="mt-4 mr-2" title btn-class="link" icon="lni-close" @clicked="close()" />
    </template>
    <template v-slot:body>
      <div class="border-b border-grey-l4 pb-6">
        <slot />
      </div>
    </template>
    <template v-slot:footer>
      <div>
        <div class="text-grey">
          <span>{{ $tc('app.proposal.add_item_modal.footer_packages', packagesCount, {packages: packagesCount}) }}</span>
          <span>{{ $tc('app.proposal.add_item_modal.footer_items', itemsCount, {items: itemsCount}) }}</span> <span>{{ $tc('app.proposal.add_item_modal.footer_suffix') }}</span>
        </div>
        <div class="mt-8">
          <app-button :btn-class="'primary mb-2 md:mb-0'" :title="$t('app.proposal.add_item_modal.show_proposal')" @clicked="onShowProposalClick" />
          <app-button :btn-class="'light'" :show-arrow="true" :title="$t('app.proposal.add_item_modal.continue_search')" @clicked="close" />
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'

export default {
  name: 'AppProposalItemModal',

  components: {
    Modal,
    AppButton
  },

  computed: {
    ...mapGetters({
      packagesCount: 'proposal/packagesCount',
      itemsCount: 'proposal/itemsCount'
    })
  },

  methods: {
    open() {
      this.$refs.modal.open()
    },

    close() {
      this.$refs.modal.close()
    },

    onShowProposalClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-proposal',
          params: this.$route.params
        })
      )
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
  @apply .py-6 .px-8 .font-serif;
}

.modal-footer {
  @apply .border-grey-l3 .pt-0 .pb-4 .px-8 .font-serif .w-full;
}
</style>
