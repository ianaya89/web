<template>
  <div class="compare__page">
    <div class="compare-header">
      <div class="absolute left-0 my-auto">
        <app-button
          class="ml-8"
          :btn-class="'secondary'"
          :title="$t('app.compare.back')"
          @clicked="onBackClick"
        />
      </div>
      <div class="flex-grow text-center flex justify-center">
        <h3 class="my-auto">
          {{ $t('app.compare.title') }}
        </h3>
      </div>
      <div class="absolute right-0 inset-y-0 flex">
        <transition name="slide-fade">
          <proposal-header-info v-if="hasItemsInProposal" class="text-p1" />
        </transition>
      </div>
    </div>
    <div class="w-full flex">
      <div class="compare-section compare-section-height">
        <div v-if="compareMarketplaceItemsIds.length === 0" class="p-32 w-full text-center">
          {{ $t('app.compare.empty') }}
        </div>
        <div v-else class="pr-10 w-full">
          <div v-if="$apollo.loading" class="w-full p-12 flex min-h-128">
            <logo-loader class="h-16 w-16 m-auto" />
          </div>
          <table v-else-if="!$apollo.loading && compareMarketplaceItems.length!==0">
            <thead>
              <tr>
                <th class="left-0 top-0 sticky z-20 bg-white" />
                <th v-for="compareItem in compareMarketplaceItems" :key="compareItem.id" class="compare-item-head   sticky top-0 z-10 px-4 pt-4 min-w-56 bg-white">
                  <compare-item-info :id="compareItem.basic.id" :title="compareItem.basic.title" :info="compareItem.basic.info" :src="compareItem.basic.logo" />
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(compareItemKey, index) in Object.keys(compareMarketplaceItems[0])">
                <tr v-if="compareItemKey!=='sections' && compareItemKey!=='basic'" :key="index" class="compare-field-row">
                  <td class="text-right text-grey min-w-56 pl-10 pr-10 sticky left-0 z-10 bg-grey-l4 overlay-outline font-medium">
                    {{ $t('app.compare.field_keys.'+compareItemKey) }}
                  </td>
                  <td v-for="(compareItem, index2) in compareMarketplaceItems" :key="index2" class="border-b border-grey-l2 pr-8 h-full">
                    <div class="font-medium text-h7 py-2 px-4 min-w-56 bg-white h-full">
                      <div v-if="!isUnlocked && ['price', 'availableTime'].indexOf(compareItemKey) !== -1">
                        <not-available-link :unit-id="unitId" />
                      </div>
                      <div v-else>
                        <span v-if="Array.isArray(compareItem[compareItemKey])">
                          {{ $t('app.marketplace.categories.'+compareItem[compareItemKey][0]) }} - {{ $t('app.marketplace.categories.'+compareItem[compareItemKey][1]) }}
                        </span>
                        <span v-else>{{ compareItem[compareItemKey] }}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
              <tr class="compare-field-blank-row">
                <td class="bg-white sticky left-0 z-10" />
                <td v-for="(compareItem, index2) in compareMarketplaceItems" :key="'deal-button-'+index2" class="pr-8">
                  <div class="bg-white p-4">
                    <app-button @clicked="addToProposal(compareItem)">
                      <i v-if="!isUnlocked" class="fa fa-lock" />
                      {{ $t('app.compare.addDeal') }}
                    </app-button>
                  </div>
                </td>
              </tr>
            </tbody>
            <template v-for="(compareSection, compareSectionKey, index) in compareMarketplaceItems[0]['sections']">
              <tbody :key="'section-' + index">
                <tr class="compare-field-blank-row">
                  <th class="text-right pl-10 pr-10 bg-white sticky left-0 z-10 py-3 uppercase cursor-pointer" @click="toggleSection(compareSectionKey)">
                    <span v-if="compareSectionKey === 'socialmedia'">{{ $t('app.profile.team.fans.web_social') }}</span>
                    <span v-else>{{ compareSectionKey }}</span>
                    <span class="text-red ml-4" :class="toggleSectionIcon(compareSectionKey)" />
                  </th>
                  <th v-for="index2 in compareMarketplaceItems.length" :key="'section-spacer-'+index2" class="pr-8">
                    <div class="bg-white py-2 px-4">
                      <span>&nbsp;</span>
                    </div>
                  </th>
                </tr>
              </tbody>
              <transition-group v-if="compareSectionKey === 'socialmedia'" v-show="isSectionToggled(compareSectionKey)" :key="'section-values-social-' + index" name="fade-down" tag="tbody">
                <tr v-for="(row, index1) in reachSeries.data" :key="'reach-series-' + index1" class="compare-field-row">
                  <td class="text-right text-grey bg-white min-w-56 pl-10 pr-10 sticky left-0 z-10 bg-grey-l4 overlay-outline font-medium">
                    <span class="ml-2">{{ row.name }}</span>
                  </td>
                  <td v-for="(item, index2) in reachSeries.dicti" :key="'reach-series-inner-' + index2" class="border-b border-grey-l2 pr-8">
                    <div class="font-medium px-4 py-2 min-w-56 bg-white">
                      <div v-if="!isUnlocked && compareSectionKey !== 'general'">
                        <not-available-link :unit-id="unitId" />
                      </div>
                      <div v-else>
                        <div v-if="item[index1]===undefined">
                          -
                        </div>
                        <div v-else>
                          {{ hideZero(item[index1].y) | number(true) }}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </transition-group>
              <transition-group v-else :key="'section-values-all-' + index" name="fade-down" tag="tbody">
                <tr v-for="(compareSectionItemKey, index2) in Object.keys(compareSection)" v-show="isSectionToggled(compareSectionKey)" :key="'section-row-' + index2" class="compare-field-row">
                  <td class="text-right text-grey bg-white min-w-56 pl-10 pr-10 sticky left-0 z-10 bg-grey-l4 overlay-outline font-medium">
                    {{ $t('app.compare.field_keys.'+compareSectionItemKey) }}
                  </td>
                  <td v-for="compareItem in compareMarketplaceItems" :key="compareItem.id" class="border-b border-grey-l2 pr-8">
                    <div class="font-medium px-4 py-2 min-w-56 bg-white">
                      <div v-if="!isUnlocked && compareSectionKey !== 'general'">
                        <not-available-link :unit-id="unitId" />
                      </div>
                      <div v-else>
                        <div v-if="typeof compareItem['sections'][compareSectionKey][compareSectionItemKey] === 'object'">
                          <span v-if="compareItem['sections'][compareSectionKey][compareSectionItemKey].translate">{{ $t('app.compare.field_values.'+compareItem['sections'][compareSectionKey][compareSectionItemKey].value) }}</span>
                        </div>
                        <div v-else>
                          {{ compareItem['sections'][compareSectionKey][compareSectionItemKey] }}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </transition-group>
            </template>
          </table>
        </div>
      </div>
      <div class="w-1/6 p-6 bg-white compare-section-height overflow-y-auto shadow-lg z-10">
        <h4 class="pb-4">
          {{ $t('app.compare.sidebar.title') }}
        </h4>
        <div v-if="$apollo.loading">
          <content-placeholders v-for="i in compareMarketplaceItemsIds.length" :key="i" class="pb-2">
            <content-placeholders-heading :img="true" />
          </content-placeholders>
        </div>
        <compare-item-info
          v-for="(compareItem, index) in compareMarketplaceItems"
          v-else
          :id="compareItem.basic.id"
          :key="'sidebar-item-'+index"
          :remover="true"
          :title="compareItem.basic.title"
          :info="compareItem.basic.info"
          :src="compareItem.basic.logo"
          class="border-b border-grey-l2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import AppButton from '@/components/AppButton'
import CompareItemInfo from '@/components/CompareItemInfo'
import { CompareItemsQuery } from '@/services/graphql'
import onBack from '@/services/mixins/onBack'
import proposal from '@/services/mixins/proposal'
import compare from '@/services/mixins/compare'
import ProposalHeaderInfo from '@/components/ProposalHeaderInfo'
import LogoLoader from '@/components/LogoLoader'
import unitPage from '@/services/mixins/unitPage'
import NotAvailableLink from '@/components/NotAvailableLink'

export default {
  name: 'Compare',

  components: {
    NotAvailableLink,
    LogoLoader,
    AppButton,
    CompareItemInfo,
    ProposalHeaderInfo
  },

  mixins: [onBack, proposal, compare, unitPage],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    compareMarketplaceItems: {
      ...CompareItemsQuery,
      variables() {
        return {
          ids: this.compareMarketplaceItemsIds,
          season: {
            get: 'SPECIFIC',
            value: this.activeSeason.name
          },
          seasonString: this.activeSeason.name
        }
      }
    }
  },

  data: () => ({
    compareMarketplaceItems: CompareItemsQuery.mock,
    sectionsTogglers: ['general'],
    columns: ['uniqueWebsiteVisits'],
    socialAccounts: ['facebook', 'instagram', 'twitter', 'tiktok', 'weibo']
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    isSectionToggled() {
      return sectionKey => this.sectionsTogglers.includes(sectionKey)
    },

    toggleSectionIcon() {
      return sectionKey =>
        this.isSectionToggled(sectionKey)
          ? 'fa fa-chevron-up'
          : 'fa fa-chevron-down'
    },

    isUnlocked() {
      return this.checkBrandPermission('brand-comparison-tool-unrestricted')
    },
    reachSeries() {
      let data = []
      const dicti = {}
      for (let i = 0; i < this.compareMarketplaceItems.length; i++) {
        const tempfilteredSocialAccounts = this.compareMarketplaceItems[i]
          .sections.socialmedia
        const size = Object.keys(tempfilteredSocialAccounts).length
        let filteredSocialAccounts = []
        for (let j = 0; j < size; j++) {
          filteredSocialAccounts.push(tempfilteredSocialAccounts[j])
        }
        filteredSocialAccounts = filteredSocialAccounts.filter(
          account => this.socialAccounts.indexOf(account.type) !== -1
        )
        const precalcData = this.columns.map(name => ({
          name: this.$t(`app.profile.team.fans.reach.${name}Count`),
          y: this.compareMarketplaceItems[i].basic.visits
        }))
        const groupedSocialAccounts = {}
        filteredSocialAccounts
          .map(account => ({
            type: account.type,
            name: this.$t(`general.${account.type}`),
            y: account.followersCount
          }))
          .forEach(account => {
            if (!groupedSocialAccounts[account.type]) {
              groupedSocialAccounts[account.type] = {
                type: account.type,
                name: account.name,
                y: account.y
              }
            } else {
              groupedSocialAccounts[account.type].y += account.y
            }
          })

        data = _.concat(precalcData, Object.values(groupedSocialAccounts))
        dicti[i] = data
      }
      return {
        name: 'Reach - last season',
        data: data,
        dicti: dicti
      }
    }
  },

  watch: {
    compareMarketplaceItemsIds(val) {
      const route = this.$router.resolve(
        this.localePath({
          name: 'unit-id-compare',
          params: { id: this.unitId },
          query: { items: val.join(',') }
        })
      )
      if (route.href !== window.location.pathname + window.location.search) {
        window.history.pushState({ key: Date.now().toFixed(3) }, '', route.href)
      }
    }
  },

  mounted() {
    if (this.$route.query.items !== undefined) {
      // parse items id from url and store it
      this.$store.dispatch('compare/addAll', this.$route.query.items.split(','))
    }
  },

  methods: {
    hideZero(value) {
      return value === 0 ? null : value
    },

    toggleSection(sectionKey) {
      if (this.isSectionToggled(sectionKey)) {
        const sectionKeyIndex = this.sectionsTogglers.indexOf(sectionKey)
        this.sectionsTogglers.splice(sectionKeyIndex, 1)
      } else {
        this.sectionsTogglers.push(sectionKey)
      }
    },

    onDealsClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-proposal',
          params: {
            id: this.unitId
          }
        })
      )
    },

    addToProposal(compareItem) {
      let path = this.localePath({
        name: 'unit-id-marketplace-item-itemId',
        params: {
          id: this.unitId,
          itemId: compareItem.basic.id
        }
      })

      if (!this.isUnlocked) {
        path = this.localePath({
          name: 'unit-id-settings-subscriptions',
          params: {
            id: this.unitId
          }
        })
      }

      this.$router.push(path)
    }
  }
}
</script>

<style lang="postcss" scoped>
.compare__page {
  th {
    @apply .font-medium;
  }
  .compare-item-head {
    box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
  }
  .compare-header {
    @apply .bg-white .border-b .border-grey-l2 .py-4 .flex .relative;
    height: 80px;
  }

  .compare-section {
    @apply .w-5/6 .pb-10 .pr-10 .flex .overflow-auto .relative;
  }

  .compare-section-height {
    min-height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
  }

  .compare-field-blank-row {
    th:last-of-type {
      @apply .pr-0;
    }

    td:last-of-type {
      @apply .pr-0;
    }
  }

  .compare-field-row {
    td {
      @apply .max-w-xxs;
    }

    td:last-of-type {
      @apply .pr-0;
    }
  }

  .overlay-outline {
    outline: 1px solid #f2f2f2;
  }
}
</style>
