<template>
  <div class="w-full flex flex-wrap" data-cy="marketplace-page">
    <div class="w-full md:w-1/5 pt-8 pb-12 shadow" :class="{ 'hidden md:block': ! filtersShownForMobile, 'block': filtersShownForMobile }">
      <search-sidebar @change="onSearchParamsChange" @refetch-query="refetchQuery" />
    </div>

    <div class="w-full md:w-4/5 px-2 py-6 md:py-12 bg-grey-l5" :class="{ 'hidden md:block': filtersShownForMobile, 'block' : !filtersShownForMobile }">
      <transition name="fade" mode="out-in">
        <div :key="showOnMap" class="w-full">
          <div v-if="showOnMap" class="w-full relative">
            <contacts-world-map
              ref="map"
              class="items-map"
              :tooltip="false"
              :specific-options="mapOptions"
              :null-color="'#eee'"
              :series="itemsMapSeries"
              @city-clicked="selectedCity = $event"
            />

            <div class="show-on-list" @click="toggleMap()">
              <span class="fas fa-list-ul my-auto" />
              <span class="ml-2 my-auto pt-1 text-p2">{{ $t('app.marketplace.search.show_list') }}</span>
            </div>

            <div class="absolute top-0 left-0 pl-2 pt-3">
              <div class="select-none cursor-pointer text-h3 text-black text-center leading-none" @click="$refs.map.zoomInMap()">
                +
              </div>
              <div class="select-none cursor-pointer text-h3 text-black text-center leading-none" @click="$refs.map.zoomOutMap()">
                -
              </div>
            </div>

            <transition name="scale-fade" appear>
              <div v-if="selectedCity!==null" :key="selectedCity.code3" class="absolute right-0 top-0 bg-white p-8 shadow-lg min-w-72">
                <div class="bg-white w-64">
                  <div class="w-full flex py-4 px-6 border-b border-grey-l3">
                    <img class="h-10 w-10" :src="selectedCity.unit.entity.logo.url" :alt="selectedCity.unit.entity.name">
                    <div class="w-full flex flex-col pl-2 my-auto">
                      <span class="text-p1 my-auto font-medium">
                        {{ selectedCity.unit.entity.name }}
                      </span>
                      <span class="text-p3 my-auto text-grey">
                        {{ selectedCity.unit.entity.city.name }}
                      </span>
                    </div>
                  </div>
                  <div class="w-full px-6 py-2">
                    <span class="text-p1 font-medium">
                      {{ $filters.number(selectedCity.items.length) }}
                    </span>
                    <span class="uppercase text-grey font-medium pl-1 text-p5">
                      {{ $t('app.marketplace.items') }}
                    </span>
                  </div>
                  <div class="w-full px-2">
                    <app-button class="w-full" :btn-class="'primary-inverted-outlined'" @clicked="linkToTeam(selectedCity.unit.id)">
                      {{ $t('general.see_items') }}
                    </app-button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div v-else class="w-full">
            <div class="w-full flex md:hidden">
              <div class="w-1/2 mr-auto text-grey font-medium">
                <span class="block text-p1 ml-2 mb-1">{{ $get(marketplaceSearch, 'paginatorInfo.total', '-') }} {{ $tc('general.items',$get(marketplaceSearch, 'paginatorInfo.total', 0)) }}</span>

                <app-select
                  v-model="selectedOrder"
                  :items="orderTypeItems"
                  :hide-details="true"
                  :solo-label="''"
                  class="ml-2 my-auto"
                />
              </div>

              <div class="ml-auto flex items-center">
                <div class="mr-4">
                  <app-button :btn-class="'primary-inverted-circle'" @clicked="toggleMap()">
                    <span class="fas fa-map" />
                  </app-button>
                </div>

                <app-button :btn-class="'primary-inverted-circle'" @clicked="toggleMobileFiltersView()">
                  <span class="fas fa-filter" />
                </app-button>
              </div>
            </div>

            <div class="w-full hidden md:flex">
              <div class="mr-auto text-grey font-medium flex">
                <app-select
                  v-model="selectedOrder"
                  :items="orderTypeItems"
                  :hide-details="true"
                  :solo-label="$t('app.brand.profile.social.order_type')"
                  class="ml-2 my-auto"
                />
                <span class="text-p1 pt-1 mt-8 ml-4">{{ $get(marketplaceSearch, 'paginatorInfo.total', '-') }} {{ $tc('general.items',$get(marketplaceSearch, 'paginatorInfo.total', 0)) }}</span>
              </div>
              <div class="ml-auto mt-10 pr-8">
                <app-button :btn-class="'link'" @clicked="toggleMap()">
                  <span class="fas fa-map mr-1" /> {{ $t('app.marketplace.show_on_map') }}
                </app-button>
              </div>
            </div>


            <div class="relative w-full flex flex-wrap min-h-128">
              <div v-if="$apollo.queries.marketplaceSearch.loading" class="updating-loader">
                <div class="mt-96 w-full flex justify-center">
                  <logo-loader class="text-center w-16 fixed" />
                </div>
              </div>
              <div v-else data-cy="search-results" class="w-full flex flex-wrap min-h-128">
                <search-item v-for="marketplaceItem in $get(marketplaceSearch, 'data', [])" :key="marketplaceItem.id" :item="marketplaceItem" :show-prices="showPrices" />
              </div>
            </div>
            <div v-if="$get(marketplaceSearch, 'paginatorInfo.lastPage', 0) > 1" class="w-full pt-8 mb-16 md:mb-0">
              <pagination v-show="!$apollo.queries.marketplaceSearch.loading" v-model="page" :length="$get(marketplaceSearch, 'paginatorInfo.lastPage', 0)" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { groupBy, mapValues, values } from 'lodash'
import SearchSidebar from '@/components/marketplace/SearchSidebar'
import AppButton from '@/components/AppButton'
import SearchItem from '@/components/marketplace/SearchItem'
import {
  MarketplaceItemsQuery,
  MarketplaceSearchQuery,
  SearchAppearanceMutation
} from '@/services/graphql'
import Pagination from '@/components/Pagination'
import LogoLoader from '@/components/LogoLoader'
import ContactsWorldMap from '@/components/charts/ContactsWorldMap'
import { searchDataLabelItemFormatter } from '@/services/chartFormatters'
import AppSelect from '@/components/AppSelect'
import unitPage from '@/services/mixins/unitPage'

export default {
  name: 'MarketplaceSearch',

  components: {
    LogoLoader,
    Pagination,
    SearchItem,
    AppButton,
    AppSelect,
    SearchSidebar,
    ContactsWorldMap
  },

  mixins: [unitPage],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    marketplaceItems: MarketplaceItemsQuery,
    marketplaceSearch: {
      fetchPolicy: 'network-only',
      ...MarketplaceSearchQuery,
      variables() {
        return {
          id: this.unitId,
          page: this.page,
          size: this.size,
          searchProps: this.searchProps,
          orderBy: this.selectedOrder
        }
      }
    }
  },

  data: () => ({
    marketplaceItems: MarketplaceItemsQuery.mock,
    marketplaceSearch: MarketplaceSearchQuery.mock,
    page: 1,
    size: 9,
    searchProps: {},
    selectedCity: null,
    selectedOrder: { field: 'price', order: 'DESC' },
    showOnMap: false,
    mapOptions: {
      chart: {
        backgroundColor: '#aadaff',
        events: {
          load() {
            this.mapZoom(0.3)
          }
        }
      },
      plotOptions: {
        series: {
          marker: {
            radius: 3,
            symbol: 'circle',
            lineColor: '#ff553f',
            fillColor: '#fff',
            lineWidth: 1,
            states: {
              select: {
                radius: 4,
                symbol: 'circle',
                lineColor: '#ff553f',
                fillColor: '#fff',
                lineWidth: 1
              },
              hover: {
                radius: 4,
                symbol: 'circle',
                lineColor: '#ff553f',
                fillColor: '#fff',
                lineWidth: 2
              }
            }
          }
        }
      },
      searchAppearanceUnitIds: []
    },
    filtersShownForMobile: false
  }),

  computed: {
    showPrices() {
      return this.checkBrandPermission('brand-marketplace-show-prices')
    },

    orderTypeItems() {
      return [
        {
          text: this.$t('app.marketplace.sorters.price.desc'),
          value: { field: 'price', order: 'DESC' }
        },
        {
          text: this.$t('app.marketplace.sorters.price.asc'),
          value: { field: 'price', order: 'ASC' }
        },
        {
          text: this.$t('app.marketplace.sorters.reach.desc'),
          value: { field: 'reach', order: 'DESC' }
        },
        {
          text: this.$t('app.marketplace.sorters.reach.asc'),
          value: { field: 'reach', order: 'ASC' }
        }
      ]
    },

    itemsMapSeries() {
      return {
        type: 'mappoint',
        name: 'Cities',
        zIndex: 2,
        dataLabels: {
          enabled: true,
          color: '#000',
          useHTML: true,
          formatter: searchDataLabelItemFormatter(this)
        },
        data: values(
          mapValues(
            groupBy(this.marketplaceItems, 'unit.entity.city.id'),
            items => ({
              code3: items[0].id,
              items: items,
              unit: items[0].unit,
              lat: items[0].unit.entity.city.latitude,
              lon: items[0].unit.entity.city.longitude
            })
          )
        ),
        minSize: 12,
        maxSize: 12
      }
    }
  },

  watch: {
    marketplaceSearch(value) {
      if (!value || !value.data) {
        return
      }

      this.searchAppearanceUnitIds = []

      for (let i = 0; i < value.data.length; i++) {
        const item = value.data[i]

        if (item.unit && item.unit.id) {
          this.searchAppearanceUnitIds.push({
            id: item.unit.id
          })
        }
      }

      this.recordSearchAppearance()
    }
  },

  methods: {
    toggleMobileFiltersView() {
      this.filtersShownForMobile = !this.filtersShownForMobile
    },

    refetchQuery() {
      this.$apollo.queries.marketplaceSearch.refetch()
      this.filtersShownForMobile = false
    },

    onSearchParamsChange(newSearchParams) {
      const newSearchProps = Object.assign({}, newSearchParams)
      newSearchProps.budget = {
        from: newSearchProps.budget[0] || null,
        to: newSearchProps.budget[1] || null
      }
      this.searchProps = newSearchProps
    },

    toggleMap() {
      this.showOnMap = !this.showOnMap
    },

    linkToTeam(teamId) {
      this.$router.push(
        this.localePath({
          name: 'unit-id-marketplace-unit-unitId-inventory',
          params: {
            id: this.unitId,
            unitId: teamId
          }
        })
      )
    },

    async recordSearchAppearance() {
      if (!this.searchAppearanceUnitIds.length) {
        return
      }

      try {
        await this.$apollo.mutate({
          ...SearchAppearanceMutation,
          variables: {
            input: {
              actor_unit_id: this.unitId,
              target_unit_ids: this.searchAppearanceUnitIds
            }
          }
        })
      } catch (err) {
        //
      }
    }
  }
}
</script>

<style lang="postcss">
.items-map.map-column {
  .chart__val {
    white-space: nowrap;
    @apply .text-menu .font-bold;
  }
}

.show-on-list {
  @apply .shadow-xl .bg-white .py-2 .px-4 .absolute .text-red .cursor-pointer flex;
  left: 2rem;
  top: 1rem;
}

.search-item-label {
  @apply .bg-red .text-white .px-2 .py-px .relative;
  &::before {
    @apply .border-white .bg-red .absolute .border-b .border-l;
    left: 1.05rem;
    bottom: -0.25rem;
    content: ' ';
    width: 0.425rem;
    height: 0.425rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

.updating-loader {
  @apply .absolute .top-0 .left-0 .bottom-0 .right-0 .z-50 .text-center;
  min-height: calc(100vh - 80px);
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
