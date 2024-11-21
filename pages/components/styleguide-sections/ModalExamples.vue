<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container">
    <h2>Modal examples</h2>
    <modal ref="modal">
      <template v-slot:header>
        Header
        <app-button title btn-class="link" icon="lni-close" @clicked="$refs.modal.close()" />
      </template>
      <template
        v-slot:body
      >
        Body Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dolores incidunt porro veniam! Eveniet autem odit ducimus earum, architecto, magnam laboriosam dolor ipsam fugit soluta id quae odio voluptatibus sequi!
      </template>
      <template v-slot:footer>
        <!-- <app-button @clicked="$refs.modal.close()" title="Close" btn-class="primary"/> -->
        <app-button title="Close" btn-class="primary" @clicked="$refs.modal.close()" />
      </template>
      <template v-slot:activator>
        <app-button @clicked="$refs.modal.open()" />
      </template>
    </modal>

    <app-button :title="'Proposal'" @clicked="clickProposal" />
    <app-proposal-item-modal ref="proposalModal" />
  </div>
</template>

<script>
import AppProposalItemModal from '@/components/modals/AppProposalItemModal'
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'

export default {
  name: 'ModalExamples',

  components: {
    Modal,
    AppButton,
    AppProposalItemModal
  },

  methods: {
    clickProposal() {
      this.$refs.proposalModal.open()
    }
  }
}
</script>

<style scoped>
</style>
