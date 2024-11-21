<template>
  <section class="proposal">
    <div class="proposal-header">
      <div class="w-1/3 my-auto">
        <app-button class="ml-8" :btn-class="'secondary'" :title="$t('app.proposal.back')" @clicked="onBackClick" />
      </div>
      <div class="w-1/3 text-center hidden md:flex justify-center pt-1">
        <h3 class="my-auto">
          {{ $t('app.proposal.title') }}
        </h3>
      </div>
      <div class="w-2/3 md:w-1/3 flex justify-end my-auto">
        <transition name="slide-fade">
          <compare-header-info v-if="hasItemsInCompare" class=" text-p1 px-0" />
        </transition>
        <transition name="slide-fade">
          <app-button class="mr-2" :btn-class="'primary-inverted'" :title="'To marketplace'" :icon="'fas fa-tag'" @clicked="moveToMarketplace" />
        </transition>
      </div>
    </div>
    <div v-if="units.length!==0" class="w-full min-h-screen flex mt-20 px-3 py-8 bg-grey-l5">
      <div class="w-full md:w-4/5 px-6">
        <h3 class="mb-4 md:hidden">
          {{ $t('app.proposal.title') }}
        </h3>

        <div class="w-full bg-white px-6 md:px-12 pt-8 pb-12">
          <div class="w-full flex flex-wrap pb-2 border-b border-grey-l3">
            <h4 class="w-1/2 md:w-auto md:mr-auto md:my-auto">
              {{ $t('general.proposal') }}
            </h4>

            <div class="w-1/2 text-right md:text-left md:w-auto ml-auto md:-mr-32">
              <avatar
                v-for="(unit, index) in units"
                :key="index"
                class="zoomable-avatar"
                :classes="'w-10 h-10 -ml-5'"
                :avatar-classes="'border-2 border-white'"
                :src="unit.entity.logo.url"
              />
            </div>

            <span v-if="proposalSum[1] === 0 || proposalSum[1] === null || proposalSum[0] === proposalSum[1] " class="font-medium text-h4 md:ml-auto mt-4 md:my-auto">{{ proposalSum[0] | currency }}</span>
            <span v-else class="font-medium text-h4 md:ml-auto mt-4 md:my-auto">{{ proposalSum[0] | currency }} - {{ proposalSum[1] | currency }}</span>
          </div>

          <accordion class="pb-8">
            <proposal-unit v-for="(unit, index) in units" :key="index" class="mt-6" :unit="unit" />
          </accordion>

          <text-area v-model="dealDescription" :placeholder="$t('app.marketplace.proposal.description_placeholder')" :outline="true" solo-label="" :label="null" />

          <div class="pt-4 w-full flex flex-wrap">
            <div class="w-full md:w-1/2 font-serif mb-6 md:mb-0 md:pr-6">
              {{ $t('app.proposal.deals_info') }}
            </div>
            <div class="w-full md:w-1/2 flex md:justify-end items-center">
              <div class="flex flex-wrap-reverse">
                <app-button class="w-full md:w-auto" :title="$t('app.proposal.delete')" :btn-class="'primary-inverted'" @clicked="onDeleteProposalClick" />
                <app-button class="w-full md:w-auto mb-4 md:mb-0 md:ml-4" :title="$t('app.proposal.send')" @clicked="submitProposal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-grey w-full flex mt-64 justify-center">
      <div class="text-center">
        <div>
          <span class="text-h3 lni-select" />
        </div>
        <div class="mt-2">
          <span class="text-h4 ml-2">{{ $t('errors.no-items-in-proposal') }}</span>
        </div>
      </div>
    </div>

    <confirmation-modal
      ref="confirmationModal"
      :body-text="$t('app.proposal.delete_modal.text')"
      :header-text="$t('app.proposal.delete_modal.title')"
      :confirm-btn-text="$t('app.proposal.delete_modal.btn')"
      @confirmed="deleteProposal"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '@/components/AppButton'
import Accordion from '@/components/Accordion'
import Avatar from '@/components/Avatar'
import ProposalUnit from '@/components/proposal/ProposalUnit'
import TextArea from '@/components/TextArea'
import CompareHeaderInfo from '@/components/CompareHeaderInfo'
import compare from '@/services/mixins/compare'
import proposal from '@/services/mixins/proposal'
// import ProposalHeaderInfo from '@/components/ProposalHeaderInfo'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import { ProposeDealMutation } from '@/services/graphql'

export default {
  name: 'Proposal',

  components: {
    AppButton,
    Accordion,
    ProposalUnit,
    Avatar,
    TextArea,
    // ProposalHeaderInfo,
    CompareHeaderInfo,
    ConfirmationModal
  },

  mixins: [compare, proposal],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    formValid: false,
    dealDescription: null
  }),

  computed: {
    ...mapGetters({
      proposalSum: 'proposal/proposalSum',
      proposalItems: 'proposal/allItems',
      units: 'proposal/units'
    })
  },

  methods: {
    onBackClick() {
      this.$router.back()
    },

    onDeleteProposalClick() {
      this.$refs.confirmationModal.open()
    },

    deleteProposal() {
      this.$store.dispatch('proposal/clear')
      this.$refs.confirmationModal.$refs.confirmBtn.loaded()
      this.$refs.confirmationModal.close()
    },

    moveToMarketplace() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-marketplace-search',
          params: {
            id: this.$route.params.id
          },
          query: this.$store.getters['proposal/getLastMarketplaceSearch']
        })
      )
    },

    submitProposal() {
      if (!this.$store.getters['proposal/hasError']) {
        try {
          this.$apollo
            .mutate({
              ...ProposeDealMutation,
              variables: {
                unitId: this.$route.params.id,
                input: {
                  message: this.dealDescription || '',
                  items: this.proposalItems.map(i => {
                    return {
                      id: i.marketplaceItem.id,
                      slots: i.slots
                    }
                  })
                }
              }
            })
            .then(({ data }) => {
              this.$toast.success(this.$t('success.offer-sent'))

              this.$store.dispatch('proposal/clear')

              this.$router.push(
                this.localePath({
                  name: 'unit-id-deals-dealId',
                  params: {
                    id: this.$route.params.id,
                    dealId: data.proposeDeal[data.proposeDeal.length - 1].id
                  }
                })
              )
            })
        } catch (err) {
          if (this.isDevEnv) {
            this.$toast.error(err.message || this.$t('errors.general'))
          } else {
            this.$toast.error(this.$t('errors.general'))
          }
        }
      }
    }
  }
}
</script>

<style lang="postcss">
.proposal {
  .proposal-header {
    @apply .w-full .fixed .bg-white .shadow .py-4 .flex .justify-between .z-20;
    height: 80px;
  }

  .zoomable-avatar {
    @apply .z-10 .relative;
    will-change: z-index;

    &:hover {
      @apply .z-20;
    }
  }
}
</style>
