<template>
  <div>
    <div class="flex mb-4 border-b border-grey-l3 flex-wrap justify-between">
      <div class="text-left flex items-center">
        <slot name="logo" />
        <span class="text-h3 sm:text-h2 leading-none ml-4 sm:ml-6 font-medium uppercase">
          <slot name="title" />
        </span>
      </div>
      <div class="flex">
        <div v-if="updatePhotosEnabled" class="w-full sm:w-auto mt-4 mr-2 sm:mt-3 -ml-1 sm:-ml-0">
          <app-button :title="$t('app.profile_header.edit_photos')" :btn-class="'primary'" icon="lni-pencil" class="w-full" @clicked="showUpdatePhotosModal" />
        </div>
        <!-- <div v-if="shareEnabled" class="w-full sm:w-auto mt-4 sm:mt-3 -ml-1 sm:-ml-0">
          <app-button :title="$t('app.marketplace.categories.campaign')" :btn-class="'secondary'" icon="lni-share" class="w-full" @clicked="redirectToCampaigns" />
        </div> -->
      </div>
    </div>

    <div class="flex -mb-4 flex-wrap">
      <slot name="content" />

      <div v-if="hasMore" class="w-full mb-4 text-right flex content-end">
        <div class="w-full">
          <app-button :title="showMoreLessText" :btn-class="'link'" :icon="arrowDownUpIcon" @clicked="toggleMoreInfo" />
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="!moreInfoHidden && hasMore" :class="{'hidden' : moreInfoHidden}" class="profile-header-block-more">
        <slot name="more" />
      </div>
    </transition>
    <update-unit-photos-modal ref="updateUnitPhotosModal" />
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import UpdateUnitPhotosModal from '@/components/modals/UpdateUnitPhotosModal'

export default {
  name: 'ProfileHeader',

  components: {
    UpdateUnitPhotosModal,
    AppButton
  },

  props: {
    shareEnabled: {
      type: Boolean,
      default: true
    },
    updatePhotosEnabled: {
      type: Boolean,
      default: false
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    moreInfoHidden: true
  }),

  computed: {
    showMoreLessText() {
      return this.moreInfoHidden
        ? this.$t('app.profile.header.show_more')
        : this.$t('app.profile.header.show_less')
    },
    arrowDownUpIcon() {
      return this.moreInfoHidden ? 'lni-arrow-down' : 'lni-arrow-up'
    },
    leaguePositionChartSeries() {
      return {
        name: 'League positions',
        data: [
          {
            name: '2nd division: 2008/09',
            y: 2.5
          },
          {
            name: '2nd division: 2009/10',
            y: 2.2
          },
          {
            name: '1st division: 2010/11',
            y: 1.3
          },
          {
            name: '1st division: 2011/12',
            y: 1.3
          },
          {
            name: '1st division: 2012/13',
            y: 1.7
          }
        ]
      }
    }
  },

  methods: {
    toggleMoreInfo() {
      this.moreInfoHidden = !this.moreInfoHidden
    },

    redirectToCampaigns() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-inventory-campaigns',
          params: this.$route.params
        })
      )
    },

    showUpdatePhotosModal() {
      this.$refs.updateUnitPhotosModal.open()
    }
  }
}
</script>

<style lang="postcss" scoped>
.profile-header-block-more {
  @apply .border-t .border-grey-l3;
}
</style>
