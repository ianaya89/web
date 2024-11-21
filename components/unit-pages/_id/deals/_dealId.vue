<template>
  <div class="w-full">
    <div v-if="deal && !$apollo.queries.deal.loading" class="deal-container">
      <deal-detail ref="dealDetail" :deal="deal" :editable="unitTypeCategory==='seller'" class="w-full bg-grey-l4 lg:w-3/4 lg:block" :class="{'hidden' : currentMobileView!=='deal', 'block': currentMobileView==='deal'}" />
      <div class="thread-bar w-full lg:w-1/3 lg:block" :class="{'hidden' : currentMobileView!=='messages', 'block': currentMobileView==='messages'}">
        <deal-thread ref="dealThread" :deal-id="dealId" />
      </div>
    </div>
    <div v-else class="w-full h-full bg-grey-l4 flex">
      <logo-loader class="h-16 w-16 m-auto" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DealDetail from '@/components/deals/DealDetail'
import DealThread from '@/components/widgets/deals/DealThread'
import { DealQuery } from '@/services/graphql'
import LogoLoader from '@/components/LogoLoader'

export default {
  name: 'Deal',

  components: {
    DealDetail,
    DealThread,
    LogoLoader
  },

  props: {
    dealId: {
      type: String,
      required: true
    }
  },

  apollo: {
    deal: {
      ...DealQuery,
      variables() {
        return {
          dealId: this.dealId
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      unitTypeCategory: 'active/unitTypeCategory'
    }),
    currentMobileView() {
      return this.$store.getters['deals/activeViewMobile']
    }
  }
}
</script>

<style lang="postcss" scoped>
.deal-container {
  @apply .w-full .flex;
  min-height: calc(100vh - 130px);
  max-height: calc(100vh - 80px);

  .thread-bar {
    @apply .border-l .border-grey-l3 .relative .bg-grey-l4;
    min-height: calc(100vh - 130px);
    max-height: calc(100vh - 130px);
  }
}

@screen lg {
  .deal-container {
    @apply .w-full .flex;
    min-height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);

    .thread-bar {
      @apply .border-l .border-grey-l3 .relative .bg-grey-l4;
      min-height: calc(100vh - 80px);
      max-height: calc(100vh - 80px);
    }
  }
}
</style>
