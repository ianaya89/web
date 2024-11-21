<template>
  <section class="brand-marketplace">
    <profile-header-partial class="hidden md:block">
      <template v-slot:image>
        <div class="relative">
          <highlighted-world-map
            v-if="valuationMap.length"
            class="h-128"
            :specific-options="mapOptions"
            :tooltip="false"
            :series="countryItemsMapSeries"
            @country-clicked="onMapCountryClick"
          />
          <h3 class="marketplace-title absolute text-h1">
            {{ $t('app.marketplace.find_team') }}
          </h3>
        </div>
        <div class="grid-graphics" />
      </template>

      <div class="w-full py-4 flex justify-start">
        <div class="w-64 pr-6">
          <multiselect v-model="searchParams.entities" :outline="true" :solo-label="$t('app.marketplace.filters.entities.title')" :items="entitiesItems" :single-line="true" />
        </div>
        <div class="w-64 pr-6">
          <multi-autoselect v-model="searchParams.continents" :outline="true" :solo-label="$t('general.continent')" :items="continentsItems" :single-line="true" />
        </div>
        <div class="w-64 pr-6">
          <multi-autoselect v-model="searchParams.countries" :outline="true" :solo-label="$t('general.country')" :items="countriesItems" :single-line="true" />
        </div>
        <div class="w-64 pr-6">
          <multiselect v-model="searchParams.categories" :solo-label="$t('general.categories')" :items="categoriesItems" :single-line="true" />
        </div>
        <div class="w-64">
          <app-select v-model="searchParams.budget[1]" :outline="true" :solo-label="$t('app.marketplace.filters.budget.title')" :items="budgetItems" />
        </div>
      </div>
      <div class="w-full flex border-t border-grey-l3">
        <!--        <app-button :title="showAdvancedSearchText" :btn-class="'link'" :icon="arrowDownUpIcon" @clicked="toggleAdvancedSearch()" />-->
        <app-button class="ml-auto" :btn-class="'primary'" :title="$t('general.search')" data-cy="search-submit" @clicked="onSearchClick()" />
      </div>
    </profile-header-partial>

    <div class="md:hidden p-8">
      <h3 class="text-h3 mb-2">
        {{ $t('app.marketplace.find_team') }}
      </h3>

      <multi-autoselect v-model="searchParams.continents" :outline="true" :solo-label="$t('general.continent')" :items="continentsItems" :single-line="true" />
      <multi-autoselect v-model="searchParams.countries" :outline="true" :solo-label="$t('general.country')" :items="countriesItems" :single-line="true" />
      <multiselect v-model="searchParams.categories" :solo-label="$t('general.categories')" :items="categoriesItems" :single-line="true" />

      <div class="flex items-center">
        <div class="w-1/2 pr-2">
          <app-select v-model="searchParams.budget[1]" :outline="true" :solo-label="$t('app.marketplace.filters.budget.title')" :items="budgetItems" />
        </div>

        <div class="w-1/2 pl-2">
          <multiselect v-model="searchParams.entities" :outline="true" :solo-label="$t('app.marketplace.filters.entities.title')" :items="entitiesItems" />
        </div>
      </div>

      <app-button class="w-full" :btn-class="'primary'" :title="$t('general.search')" data-cy="search-submit" @clicked="onSearchClick()" />
    </div>

    <div class="md:landing pt-16 pl-8 md:pl-0 pr-12">
      <div v-if="countryEvents">
        <div class="hidden md:block">
          <h3>{{ $t('app.marketplace.categories.vip-hospitality-by') }} <daimani-logo /></h3>
          <div class="w-full flex justify-start pt-4 pb-10" data-cy="hospitality">
            <div v-if="countryEvents && countryEvents.length === 0" class="w-full flex justify-start">
              <content-placeholders v-for="i in 5" :key="i" class="w-1/5 pr-2 mb-2 mr-2">
                <content-placeholders-text :lines="4" />
              </content-placeholders>
            </div>
            <hospitality-card
              v-for="countryEvent in countryEvents"
              v-else-if="countryEvents && countryEvents.length > 0"
              :key="countryEvent.id"
              class="w-1/5 pr-2 mb-2 mr-2"
              :unit-id="unitId"
              :team="countryEvent"
            />
          </div>
        </div>

        <div class="block md:hidden mb-8">
          <step-pager :items="countryEvents">
            <template v-slot:pager-title>
              <h4 class="my-auto mr-auto pr-10">
                {{ $t('app.marketplace.categories.vip-hospitality-by') }} <daimani-logo />
              </h4>
            </template>
            <template v-slot:content="props">
              <hospitality-card
                :key="props.item.id"
                class="w-full max-w-full"
                :unit-id="unitId"
                :team="props.item"
              />
            </template>
          </step-pager>

          <content-placeholders v-if="countryEvents.loading" class="w-full">
            <content-placeholders-text :lines="4" />
          </content-placeholders>
        </div>
      </div>

      <div v-if="$apollo.queries.featured.loading !== false || featured.length > 0">
        <div class="hidden md:block">
          <h3>{{ $t('app.marketplace.featured') }}</h3>
          <div class="w-full flex justify-start pt-4 pb-10" data-cy="featured">
            <div v-if="$apollo.queries.featured.loading" class="w-full flex justify-start">
              <content-placeholders v-for="i in 3" :key="i" class="w-1/3 pr-2 mb-2 mr-2">
                <content-placeholders-text :lines="4" />
              </content-placeholders>
            </div>
            <featured-card
              v-for="featuredItem in featured"
              v-else
              :key="featuredItem.id"
              class="w-1/3 pr-2 mb-2 mr-2"
              :unit-id="unitId"
              :team="featuredItem"
            />
          </div>
        </div>

        <div class="block md:hidden mb-8">
          <step-pager :items="featured">
            <template v-slot:pager-title>
              <h4 class="my-auto mr-auto">
                {{ $t('app.marketplace.featured') }}
              </h4>
            </template>
            <template v-slot:content="props">
              <featured-card
                :key="props.item.id"
                class="w-full max-w-full"
                :unit-id="unitId"
                :team="props.item"
              />
            </template>
          </step-pager>

          <content-placeholders v-if="$apollo.queries.featured.loading" class="w-full">
            <content-placeholders-text :lines="4" />
          </content-placeholders>
        </div>
      </div>

      <div v-if="$apollo.queries.nearby.loading !== false || nearby.length > 0">
        <div class="hidden md:block">
          <h3>{{ $t('app.marketplace.nearby') }}</h3>
          <div class="w-full flex justify-start pt-4 pb-6" data-cy="nearby">
            <div v-if="$apollo.queries.nearby.loading" class="w-full flex justify-start">
              <content-placeholders v-for="i in 3" :key="i" class="w-1/3 pr-2 mb-2 mr-2">
                <content-placeholders-text :lines="4" />
              </content-placeholders>
            </div>
            <featured-card
              v-for="nearbyItem in nearby"
              v-else
              :key="nearbyItem.id"
              class="w-1/3 pr-2 mb-2 mr-2"
              :unit-id="unitId"
              :team="nearbyItem"
            />
          </div>
        </div>

        <div class="block md:hidden mb-8">
          <step-pager :items="nearby">
            <template v-slot:pager-title>
              <h4 class="my-auto mr-auto">
                {{ $t('app.marketplace.nearby') }}
              </h4>
            </template>
            <template v-slot:content="props">
              <featured-card
                :key="props.item.id"
                class="w-full max-w-full"
                :unit-id="unitId"
                :team="props.item"
              />
            </template>
          </step-pager>

          <content-placeholders v-if="$apollo.queries.nearby.loading" class="w-full">
            <content-placeholders-text :lines="4" />
          </content-placeholders>
        </div>
      </div>

      <div v-if="$apollo.queries.newest.loading !== false || newest.length > 0">
        <div class="hidden md:block">
          <h3>{{ $t('app.marketplace.newest') }}</h3>
          <div class="w-full flex justify-start pt-4 pb-6" data-cy="newest">
            <div v-if="$apollo.queries.newest.loading" class="w-full flex justify-start">
              <content-placeholders v-for="i in 3" :key="i" class="w-1/3 pr-2 mb-2 mr-2">
                <content-placeholders-text :lines="4" />
              </content-placeholders>
            </div>
            <featured-card
              v-for="(newestItem) in newest"
              v-else
              :key="newestItem.id"
              class="w-1/3 pr-2 mb-2 mr-2"
              :unit-id="unitId"
              :team="newestItem"
            />
          </div>
        </div>

        <div class="block md:hidden mb-8">
          <step-pager :items="newest">
            <template v-slot:pager-title>
              <h4 class="my-auto mr-auto">
                {{ $t('app.marketplace.newest') }}
              </h4>
            </template>
            <template v-slot:content="props">
              <featured-card
                :key="props.item.id"
                class="w-full max-w-full"
                :unit-id="unitId"
                :team="props.item"
              />
            </template>
          </step-pager>

          <content-placeholders v-if="$apollo.queries.newest.loading" class="w-full">
            <content-placeholders-text :lines="4" />
          </content-placeholders>
        </div>
      </div>
    </div>
  </section>
</template>

  <script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import ProfileHeaderPartial from '@/components/partials/ProfileHeaderPartial'
import HighlightedWorldMap from '@/components/charts/HighlightedWorldMap'
import AppButton from '@/components/AppButton'
import FeaturedCard from '@/components/FeaturedCard'
import HospitalityCard from '@/components/HospitalityCard'
import DaimaniLogo from '@/components/DaimaniLogo'
// import FeaturedTopCard from '@/components/FeaturedTopCard'
import { searchIntroDataLabelFormatter } from '@/services/chartFormatters'
import {
  addLocalizedCountryName,
  addLocalizedContinentName
} from '@/services/helpers'
import {
  CountriesQuery,
  ContinentsQuery,
  FeaturedQuery,
  MarketplaceItemsQuery,
  MarketplaceMainCategoriesQuery,
  MarketplaceMapQuery,
  MarketplaceSearchRangesQuery,
  NearbyQuery,
  NewestQuery,
  SeasonsQuery,
  BrandHeaderQuery
} from '@/services/graphql'
// import DataLabel from '@/components/DataLabel'
import Multiselect from '@/components/Multiselect'
import MultiAutoselect from '@/components/MultiAutoselect'
import AppSelect from '@/components/AppSelect'
import StepPager from '@/components/widgets/StepPager'

export default {
  layout: 'brand',

  name: 'Marketplace',

  components: {
    HighlightedWorldMap,
    ProfileHeaderPartial,
    FeaturedCard,
    AppButton,
    AppSelect,
    Multiselect,
    MultiAutoselect,
    StepPager,
    HospitalityCard,
    DaimaniLogo
    // DataLabel,
    // FeaturedTopCard
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    valuationMap: MarketplaceMapQuery,
    seasons: {
      ...SeasonsQuery
    },
    featured: {
      ...FeaturedQuery,
      variables() {
        return {
          limit: 3,
          season: this.currentSeason.name,
          filter: {
            unit_id: this.unitId,
            type: 'FEATURED'
          }
        }
      },
      update(data) {
        return data.teams
      }
    },
    nearby: {
      ...NearbyQuery,
      variables() {
        return {
          limit: 3,
          season: this.currentSeason.name,
          filter: {
            unit_id: this.unitId,
            type: 'NEAR'
          }
        }
      },
      update(data) {
        return data.teams
      }
    },
    newest: {
      ...NewestQuery,
      variables() {
        return {
          limit: 3,
          season: this.currentSeason.name,
          filter: {
            unit_id: this.unitId,
            type: 'NEWEST'
          },
          orderBy: {
            field: 'created_at',
            order: 'DESC'
          }
        }
      },
      update(data) {
        return data.teams
      }
    },
    continents: {
      ...ContinentsQuery,
      update(data) {
        data.continents.map(addLocalizedContinentName.bind(this))
        data.continents = data.continents.filter(function(obj) {
          return obj.id !== '0'
        })
        return data.continents
      }
    },
    countries: {
      ...CountriesQuery,
      update(data) {
        data.countries.map(addLocalizedCountryName.bind(this))
        this.countriesList = data.countries
        return data.countries
      }
    },
    categories: MarketplaceMainCategoriesQuery,
    marketplaceItems: MarketplaceItemsQuery,
    marketplaceSearchRanges: {
      ...MarketplaceSearchRangesQuery,
      result({ data }) {
        if (this.searchParams.budget[1] === 0) {
          this.searchParams.budget[1] = data.marketplaceSearchRanges.budget
        }
      }
    },
    unit: {
      ...BrandHeaderQuery,
      variables() {
        return {
          id: this.unitId
        }
      },
      result({ data }) {
        this.selectedItem = this.$get(data, 'unit.entity.country.name', '')
        this.countryEvents = []
        if (this.selectedItem) {
          this.getEvents(this.selectedItem).then(res => {
            if (res.data.length) {
              this.countryEvents = res.data
            } else {
              this.getEvents('nocountry').then(res => {
                this.countryEvents = res.data.length ? res.data : null
              })
            }
          })
        }
      }
    }
  },

  data: () => ({
    valuationMap: [],
    countryEvents: [],
    countriesList: [],
    marketplaceItems: MarketplaceItemsQuery.mock,
    categories: MarketplaceMainCategoriesQuery.mock,
    countries: CountriesQuery.mock,
    continents: ContinentsQuery.mock,
    featured: FeaturedQuery.mock,
    nearby: NearbyQuery.mock,
    newest: NewestQuery.mock,
    advancedSearch: false,
    searchParams: {
      budget: [0, 0],
      continents: [],
      countries: [],
      categories: [],
      entities: []
    },
    mapOptions: {
      mapNavigation: {
        enabled: false
      },
      chart: {
        backgroundColor: 'transparent',
        events: {
          load() {
            this.mapZoom(0.4)
          }
        }
      },
      colorAxis: {
        min: 0,
        max: null,
        stops: [
          [0, '#D4D4D4'],
          [0.1, '#D4D4D4'],
          [0.3, '#D4D4D4'],
          [0.55, '#D4D4D4'],
          [0.6, '#D4D4D4'],
          [0.8, '#D4D4D4'],
          [1, '#D4D4D4']
        ]
      }
    }
  }),

  computed: {
    ...mapGetters({
      lastSeason: 'active/getLastSeason',
      currentSeason: 'active/getCurrentSeason'
    }),

    countriesItems() {
      return this.getCountriesItems()
    },
    continentsItems() {
      return this.continents.map(continent => {
        return {
          text: continent.localizedName,
          value: continent.id
        }
      })
    },
    budgetItems() {
      return this.$t('app.marketplace.filters.budget.items')
    },
    entitiesItems() {
      return this.$t('app.marketplace.filters.entities.items')
    },

    categoriesItems() {
      return this.categories.map(country => {
        return {
          text: country.name,
          value: country.id
        }
      })
    },

    showAdvancedSearchText() {
      return !this.advancedSearch
        ? this.$t('general.advanced_search')
        : this.$t('app.profile.header.show_less')
    },

    arrowDownUpIcon() {
      return !this.advancedSearch ? 'lni-arrow-down' : 'lni-arrow-up'
    },

    countryItemsMapSeries() {
      return {
        borderColor: 'white',
        borderWidth: 2,
        nullColor: '#F2F2F2',
        dataLabels: {
          enabled: true,
          color: '#000',
          useHTML: true,
          formatter: searchIntroDataLabelFormatter(this)
        },
        data: this.valuationMap.map(item => {
          return {
            name: item.country.name,
            countryId: item.country.id,
            value: item.valuation
          }
        })
      }
    }
  },

  methods: {
    getCountriesItems() {
      let countries = []
      const initialcountries = this.countries.map(country => {
        return {
          text: country.localizedName,
          continent_id: country.continent_id,
          value: country.id
        }
      })

      if (this.searchParams.continents.length > 0) {
        this.countriesList = initialcountries.filter(item => {
          return this.searchParams.continents.includes(item.continent_id)
        })
        countries = this.countriesList
      } else {
        countries = initialcountries
      }
      return countries
    },

    toggleAdvancedSearch() {
      this.advancedSearch = !this.advancedSearch
    },

    onSearchClick: function() {
      let filteredCountries
      if (
        this.searchParams.continents.length > 0 &&
        this.searchParams.countries.length === 0
      ) {
        filteredCountries = this.countriesList.map(item => {
          return item.value
        })
        this.searchParams.countries = filteredCountries
      }

      delete this.searchParams.continents

      this.$router.push(
        this.localePath({
          name: 'unit-id-marketplace-search',
          params: {
            id: this.unitId
          },
          query: this.searchParams
        })
      )
    },

    onMapCountryClick($event) {
      if (this.searchParams.countries.includes($event.countryId)) {
        this.searchParams.countries.splice(
          this.searchParams.countries.indexOf($event.countryId),
          1
        )
      } else {
        this.searchParams.countries.push($event.countryId)
      }
    },

    getEvents(country) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_BACKEND_URL + '/events', {
            params: { country },
            headers: {
              authorization: 'Bearer ' + this.$store.getters['auth/accessToken']
            }
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
</script>

  <style lang="postcss">
.brand-marketplace {
  @apply .min-h-screen .relative;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));

  .marketplace-title {
    @apply z-10;
    top: 40%;
    left: 10%;
  }

  .highcharts-container {
    @apply .z-10 !important;
  }

  .profile-header-block {
    @apply .z-20;
  }

  .grid-graphics {
    @apply .absolute .h-120 .w-192 opacity-25;
    background: url('~@/assets/images/find-team-mask.png');
    top: 8rem;
    left: 10rem;

    h2 {
      @apply .absolute .z-20;
      top: 5rem;
      left: -1rem;
    }
  }

  @responsive {
    .landing {
      width: calc(100% - 100px);
      margin-left: calc(100% - calc(100% - 100px));
    }
  }
}

@media (max-width: 1280px) {
  .brand-marketplace {
    @apply .min-h-screen .relative;
    width: calc(100% - 0px);
    margin-left: calc(100% - calc(100% - 0px));
  }
}
</style>
