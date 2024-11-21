<template>
  <div class="deals-container">
    <div class="w-full flex border-b border-grey-l3 shadow fixed inset-x-0 z-20 bg-white h-12 lg:hidden">
      <transition name="fade-fast">
        <app-button
          v-if="prevMobileViewLink!==null"
          :title="$t(prevMobileViewLink.btnTitle)"
          class="my-auto mr-auto ml-6"
          :btn-class="'link'"
          :show-left-arrow="true"
          @clicked="switchMobileView(prevMobileViewLink)"
        />
      </transition>
      <transition name="fade-fast">
        <app-button
          v-if="nextMobileViewLink!==null"
          :title="$t(nextMobileViewLink.btnTitle)"
          class="my-auto ml-auto"
          :btn-class="'link'"
          :show-arrow="true"
          @clicked="switchMobileView(nextMobileViewLink)"
        />
      </transition>
    </div>
    <div v-if="$apollo.queries.unit.loading" class="w-full flex mt-12 lg:mt-0">
      <logo-loader class="h-16 w-16 m-auto" />
    </div>
    <div v-else class="deals-tabs w-full lg:w-80 mt-12 lg:mt-0 lg:flex" :class="{'flex' : currentMobileView==='deals', 'hidden': currentMobileView!=='deals'}">
      <div class="w-full">
        <deal-tab
          v-for="deal in deals"
          :key="deal.id"
          :deal="deal"
          :active="isDealActive(deal.id)"
          class="bg-white w-full p-4 flex"
          @clicked="showDeal(deal.id)"
        />

        <div v-if="deals.length === 0" class="bg-white w-full p-4 flex">
          <p class="text-center text-grey mt-4">
            {{ $t('errors.no_results') }}
          </p>
        </div>
      </div>
    </div>

    <nuxt-child v-if="$route.params.dealId!=null && !$apollo.queries.unit.loading" class="mt-12 lg:mt-0 lg:block" :class="{'hidden' : currentMobileView==='deals', 'block': currentMobileView!=='deals'}" />
  </div>
</template>

<script>
import { DealsQuery } from '@/services/graphql'
import DealTab from '@/components/deals/DealTab'
import LogoLoader from '@/components/LogoLoader'
import AppButton from '@/components/AppButton'

export default {
  name: 'Deals',

  components: {
    AppButton,
    DealTab,
    LogoLoader
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...DealsQuery,
      fetchPolicy: 'network-only',
      variables() {
        return {
          id: this.unitId
        }
      },
      result({ data }) {
        const firstDealId = this.$get(data, 'unit.entity.deals.0.id')

        if (firstDealId && !this.$route.params.dealId) {
          this.showDeal(firstDealId)
        }
      }
    }
  },

  data: () => ({
    dealMobileViews: {
      deals: {
        key: 'deals',
        btnTitle: 'app.deals.mobile.views.deals'
      },
      deal: {
        key: 'deal',
        btnTitle: 'app.deals.mobile.views.deal'
      },
      messages: {
        key: 'messages',
        btnTitle: 'app.deals.mobile.views.messages'
      }
    }
  }),

  computed: {
    deals() {
      return this.$get(this.unit, 'entity.deals', [])
    },

    currentMobileView() {
      return this.$store.getters['deals/activeViewMobile']
    },

    prevMobileViewLink() {
      const viewKeys = Object.keys(this.dealMobileViews)
      const currentIndex = viewKeys.indexOf(this.currentMobileView)

      if (currentIndex === 0) {
        return null
      } else {
        return this.dealMobileViews[viewKeys[currentIndex - 1]]
      }
    },

    nextMobileViewLink() {
      const viewKeys = Object.keys(this.dealMobileViews)
      const currentIndex = viewKeys.indexOf(this.currentMobileView)

      if (currentIndex === viewKeys.length - 1) {
        return null
      } else {
        return this.dealMobileViews[viewKeys[currentIndex + 1]]
      }
    }
  },

  methods: {
    isDealActive(dealId) {
      return Number(dealId) === Number(this.$route.params.dealId)
    },

    switchMobileView(mobileViewObj) {
      this.$store.dispatch('deals/setMobileView', mobileViewObj.key)
    },

    showDeal(dealId) {
      this.$store.dispatch('deals/setMobileView', 'deal')

      this.$router.push(
        this.localePath({
          name: 'unit-id-deals-dealId',
          params: { id: this.unitId, dealId }
        })
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.deals-container {
  @apply .flex .w-full;
  min-height: calc(100vh - 130px);
  max-height: calc(100vh - 130px);

  .deals-tabs {
    @apply .overflow-y-scroll;
    min-height: calc(100vh - 130px);
    max-height: calc(100vh - 130px);
  }
}

@screen lg {
  .deals-container {
    @apply .flex .w-full;
    min-height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);

    .deals-tabs {
      @apply .overflow-y-scroll;
      min-height: calc(100vh - 80px);
      max-height: calc(100vh - 80px);
    }
  }
}
</style>
