<template>
  <div class="w-full">
    <div class="p-4 border-b border-grey-l4">
      <div class="flex items-center justify-between pb-4">
        <h4>
          {{ $t('app.marketplace.find_team') }}
        </h4>

        <app-button
          :title="$t('app.marketplace.search.clear')"
          :btn-class="'link'"
          data-cy="search-clear"
          @clicked="clearFilters()"
        />
      </div>
    </div>

    <div class="p-4 pt-8 border-b border-grey-l4">
      <multiselect
        v-model="searchParams.entities"
        :outline="true"
        :solo-label="$t('app.marketplace.filters.entities.title')"
        :items="entitiesItems"
        data-cy="entities-filter"
      />
    </div>

    <div class="p-4 pt-8 border-b border-grey-l4">
      <multiselect
        v-model="searchParams.countries"
        :loading="countries.length === 0 && !countriesQueryDone"
        :outline="true"
        :solo-label="$t('general.country')"
        :items="countriesItems"
        data-cy="countries-filter"
      />
    </div>

    <div v-if="searchParams.countries.length > 0" class="p-4 pt-8 border-b border-grey-l4">
      <multiselect
        v-model="searchParams.leagues"
        :loading="!leaguesQueryDone"
        :outline="true"
        :solo-label="$t('general.league')"
        :items="leaguesItems"
        data-cy="leagues-filter"
      />
    </div>
    <div v-if="searchParams.leagues.length > 0" class="p-4 pt-8 border-b border-grey-l4">
      <multiselect
        v-model="searchParams.teams"
        :loading="!teamsQueryDone"
        :outline="true"
        :solo-label="$t('general.team')"
        :items="teamsItems"
        data-cy="teams-filter"
      />
    </div>
    <div class="p-4 pt-8 border-b border-grey-l4">
      <multiselect
        v-model="searchParams.categories"
        :loading="categories.length === 0 && !categoriesQueryDone"
        :outline="true"
        :solo-label="$t('general.categories')"
        :items="categoriesItems"
        data-cy="categories-filter"
      />
    </div>
    <div v-if="searchParams.categories.length > 0 && inventoryTypesItems.length > 0" class="p-4 pt-8 border-b border-grey-l4">
      <multiselect
        v-model="searchParams.inventoryTypes"
        :loading="categories.length === 0 && !categoriesQueryDone"
        :outline="true"
        :solo-label="$t('general.inventoryTypes')"
        :items="inventoryTypesItems"
        data-cy="inventory-types-filter"
      />
    </div>
    <div class="p-4 pt-8 border-b border-grey-l4">
      <slider
        v-model="searchParams.budget"
        :range="true"
        :min="budgetMin"
        :max="budgetMax"
        :formatter="$filters.currency"
        :formatter-args="[true]"
        data-cy="budget-filter"
      >
        <template v-slot:label>
          {{ $t('general.budget') }}
        </template>
      </slider>
    </div>
    <div class="p-4 pt-8">
      <div class="fixed md:relative bottom-0 left-0 w-full md:w-auto p-4 md:p-0">
        <app-button
          class="w-full"
          :title="$t('general.search')"
          :btn-class="'primary'"
          data-cy="search-submit"
          @clicked="onSearchClicked()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { assign, mapValues } from 'lodash'
import { mapGetters } from 'vuex'
import AppButton from '@/components/AppButton'
import Slider from '@/components/Slider'
import Multiselect from '@/components/Multiselect'
import { addLocalizedCountryName } from '@/services/helpers'
import {
  CountriesQuery,
  LeaguesQuery,
  MarketplaceMainSecondaryCategoriesQuery,
  MarketplacePackagesCategoriesQuery,
  MarketplaceSearchRangesQuery,
  TeamsByCountryIdsQuery,
  TeamsQuery
} from '@/services/graphql'

export default {
  name: 'SearchSidebar',

  components: {
    AppButton,
    Slider,
    Multiselect
  },

  apollo: {
    countries: {
      ...CountriesQuery,
      update(data) {
        data.countries.map(addLocalizedCountryName.bind(this))
        return data.countries
      }
    },
    leagues: {
      ...LeaguesQuery
    },
    teams: {
      ...TeamsByCountryIdsQuery,
      variables() {
        return {
          countryIds: this.searchParams.countries,
          season: this.currentSeason.name
        }
      },
      skip() {
        return (
          !this.searchParams.countries ||
          this.searchParams.countries.length === 0
        )
      },
      update(data) {
        return data.teamsByCountryIds
      }
    },
    categories: MarketplaceMainSecondaryCategoriesQuery,
    packages: MarketplacePackagesCategoriesQuery,
    marketplaceSearchRanges: MarketplaceSearchRangesQuery
  },

  data: () => ({
    budgetMin: 0,
    searchParams: {
      budget: [0, 0],
      countries: [],
      leagues: [],
      teams: [],
      categories: [],
      inventoryTypes: [],
      entities: []
    },
    rebuildingUrlTimeout: null,
    countries: CountriesQuery.mock,
    leagues: LeaguesQuery.mock,
    teams: TeamsQuery.mock,
    categories: MarketplaceMainSecondaryCategoriesQuery.mock,
    packages: MarketplacePackagesCategoriesQuery.mock,
    marketplaceSearchRanges: MarketplaceSearchRangesQuery.mock,
    teamsQueryDone: false,
    countriesQueryDone: false,
    leaguesQueryDone: false,
    categoriesQueryDone: false,
    packagesQueryDone: false
  }),

  computed: {
    currentCountry() {
      return this.searchParams.countries
    },

    ...mapGetters({
      currentSeason: 'active/getCurrentSeason'
    }),

    budgetMax() {
      return this.marketplaceSearchRanges.budget
    },

    countriesItems() {
      return this.countries.map(country => {
        return {
          text: country.localizedName,
          value: country.id
        }
      })
    },

    leaguesItems() {
      const selectedCountries = this.searchParams.countries

      return this.leagues
        .filter(league => {
          if (!selectedCountries || selectedCountries.length === 0) {
            return true
          } else {
            if (league.country && league.country.id) {
              return selectedCountries.indexOf(league.country.id) !== -1
            }
            return false
          }
        })
        .map(league => {
          return {
            text: league.name,
            value: league.id
          }
        })
    },

    teamsItems() {
      const selectedLeagues = this.searchParams.leagues

      return this.teams
        .filter(team => {
          if (!selectedLeagues || selectedLeagues.length === 0) {
            return true
          } else {
            const teamLeagues = team.teamLeagues
            if (teamLeagues && teamLeagues.length > 0 && teamLeagues[0]) {
              const leagueId = teamLeagues[0].league.id
              return selectedLeagues.indexOf(leagueId) !== -1
            }
            return false
          }
        })
        .map(team => {
          return {
            text: team.name,
            value: team.id
          }
        })
    },

    categoriesItems() {
      const categoriesSearchItems = this.categories
        .filter(category => category.layer === '1')
        .map(category => {
          return {
            text: this.$t(
              'app.marketplace.categories.' +
                this.$helpers.normalizeCategoryName(
                  this.$helpers.firstCategory(category),
                  false
                )
            ),
            value: category.id
          }
        })
      if (this.packages.length) {
        this.packages.map(packageCategory => {
          categoriesSearchItems.push({
            text:
              this.$t(
                'app.marketplace.categories.' +
                  this.$helpers.normalizeCategoryName(
                    this.$helpers.firstCategory(packageCategory),
                    true
                  )
              ) +
              ' ' +
              this.$tc('general.packages', 1).toLowerCase(),
            value: packageCategory.id
          })
        })
      }
      return categoriesSearchItems
    },

    inventoryTypesItems() {
      const selectedCategoryIds = this.searchParams.categories

      return this.categories
        .filter(
          category =>
            category.layer === '2' &&
            !!category.parent &&
            selectedCategoryIds.indexOf(category.parent.id) !== -1
        )
        .map(category => {
          return {
            text: this.$t(
              'app.marketplace.categories.' +
                this.$helpers.normalizeCategoryName(
                  this.$helpers.secondaryCategory(category),
                  false
                )
            ),
            value: category.id
          }
        })
    },

    entitiesItems() {
      return this.$t('app.marketplace.filters.entities.items')
    }
  },

  watch: {
    searchParams: {
      handler(val) {
        this.rebuildSlug()
      },
      deep: true
    },

    currentCountry: {
      handler(val) {
        this.teamsQueryDone = false
        this.leaguesQueryDone = false
      }
    },

    teams: {
      handler() {
        this.teamsQueryDone = true
      }
    },

    countries: {
      handler() {
        this.countriesQueryDone = true
      }
    },

    leagues: {
      handler() {
        this.leaguesQueryDone = true
      }
    },
    categories: {
      handler() {
        this.categoriesQueryDone = true
      }
    },
    packages: {
      handler() {
        this.packagesQueryDone = true
      }
    }
  },

  mounted() {
    if (this.$route.query != null) {
      this.searchParams = assign(
        {},
        this.searchParams,
        mapValues(this.$route.query, item => {
          if (!Array.isArray(item)) {
            return [String(item)]
          } else {
            return item
          }
        })
      )
      this.$emit('change', this.searchParams)
    }
  },
  methods: {
    clearFilters() {
      this.searchParams = {
        budget: [0, 0],
        countries: [],
        leagues: [],
        teams: [],
        categories: [],
        inventoryTypes: [],
        entities: []
      }

      this.onSearchClicked()
    },

    onSearchClicked() {
      this.$emit('refetch-query')
    },

    rebuildSlug() {
      if (this.rebuildingUrlTimeout !== null) {
        clearTimeout(this.rebuildingUrlTimeout)
      }
      this.rebuildingUrlTimeout = setTimeout(() => {
        this.$router.push(
          this.localePath({
            name: 'unit-id-marketplace-search',
            params: {
              id: this.$route.params.id
            },
            query: this.searchParams
          })
        )
        this.$store.dispatch('proposal/setMarketplaceSearch', this.searchParams)
        this.$emit('change', this.searchParams)
      }, 500)
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
