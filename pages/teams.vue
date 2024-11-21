<template>
  <v-app>
    <div class="public-page overflow-hidden">
      <div class="min-h-screen w-full flex relative">
        <div class="hidden md:block w-4 sm:w-16 xl:w-1/5 pl-4 xl:pl-10 z-10">
          <div class="w-3/5 relative flex flex-col xl:border-r pt-24 h-full" />
        </div>
        <div class="teams-content w-full xl:w-4/5 z-10 md:pr-32">
          <div :percentage-offset="0.5" class="pt-56 pb-5">
            <div class="mb-8">
              <div class="flex flex-wrap pl-8 items-center">
                <h1 class="uppercase text-5xl sm:text-h1 max-w-lg pr-12 leading-none mb-8 xl:mb-0">
                  {{ $t('landing.teams.title') }}
                </h1>
              </div>
            </div>

            <div class="w-full flex flex-wrap pl-8 mb-10">
              <div class="md:w-2/3 mb-10 md:mb-0">
                <div class="teams-subtitle links pr-8">
                  <h4 class="max-w-full md:max-w-md md:pr-20">
                    {{ $t('landing.teams.subtitle') }}
                  </h4>
                </div>
              </div>

              <div class="md:w-1/3">
                <div class="teams-button pr-4">
                  <transition name="fade-up-delayed" :appear="true">
                    <app-button class="text-left" @clicked="redirectToTeamSignup">
                      {{ $t('landing.teams.title_signup') }} <span class="underline">{{ $t('landing.teams.title_signup_cta') }}</span>
                    </app-button>
                  </transition>
                </div>
              </div>
            </div>
            <div class="filters-section">
              <div class="w-full flex flex-wrap pl-8 mb-10">
                <div class="w-full sm:w-1/2 md:w-2/3 mb-10 md:mb-0">
                  <div class="teams-subtitle links pr-4">
                    <dropdown-app-button
                      class="w-full text-left min-h-16"
                      :title="$t('landing.teams.filters')"
                      :btn-class="'secondary'"
                      :show-arrow="true"
                      :arrow-type="'arrow'"
                      @clicked="toggleFilters"
                    >
                      <template v-slot:arrow-text>
                        Show more
                      </template>
                    </dropdown-app-button>
                    <dropdown
                      ref="teamsFilter"
                      class="cursor-default"
                      :activator="false"
                      :deactivator="false"
                      :items-classes="'p-4 left-0'"
                    >
                      <div class="w-full pt-4 max-h-128">
                        <div class="w-full py-4 flex justify-start">
                          <div class="w-64 pr-6">
                            <multi-autoselect v-model="searchParams.continents" :outline="true" :solo-label="$t('general.continent')" :items="continentsItems" :single-line="true" />
                          </div>
                          <div class="w-64 pr-6">
                            <multi-autoselect v-model="searchParams.teamsCountries" :outline="true" :solo-label="$t('general.country')" :items="countriesItems" :single-line="true" />
                          </div>
                          <div class="w-64 pr-6">
                            <multi-autoselect v-model="searchParams.leagues" :outline="true" :solo-label="$t('general.league')" :items="leaguesItems" :single-line="true" />
                          </div>
                        </div>
                        <div class="w-full flex border-t border-grey-l3">
                          <app-button class="ml-auto" :btn-class="'primary'" :title="$t('general.search')" data-cy="filter-submit" @clicked="onFilterClick()" />
                        </div>

                        <div class="md:hidden p-8">
                          <h3 class="text-h3 mb-2">
                            {{ $t('app.marketplace.find_team') }}
                          </h3>

                          <multi-autoselect v-model="searchParams.continents" :outline="true" :solo-label="$t('general.continent')" :items="continentsItems" :single-line="true" />
                          <multi-autoselect v-model="searchParams.teamsCountries" :outline="true" :solo-label="$t('general.country')" :items="countriesItems" :single-line="true" />
                          <multi-autoselect v-model="searchParams.leagues" :outline="true" :solo-label="$t('general.league')" :items="leaguesItems" :single-line="true" />

                          <app-button class="w-full" :btn-class="'primary'" :title="$t('general.search')" data-cy="filter-submit" @clicked="onFilterClick()" />
                        </div>
                      </div>
                    </dropdown>
                  </div>
                </div>
                <div class="w-full sm:w-1/2 md:w-1/3">
                  <div class="teams-button">
                    <!-- <transition name="fade-up-delayed" :appear="true"> -->
                    <dropdown-app-button
                      class="w-full text-left min-h-16"
                      :title="$t('landing.teams.filters_sort.sort_by')"
                      :btn-class="'secondary'"
                      :show-arrow="true"
                      :arrow-type="'caret'"
                      @clicked="toggleSorting"
                    />

                    <dropdown
                      ref="teamsSorting"
                      class="cursor-default"
                      :activator="false"
                      :deactivator="false"
                      :items-classes="'left-0'"
                    >
                      <div class="w-full max-h-128">
                        <div class="w-full p-4">
                          <app-button
                            v-model="searchParams.sorting"
                            :title="$t('landing.teams.filters_sort.alpha_asc')"
                            :btn-class="'pt-4'"
                            data-cy="search-clear"
                            value="1"
                            @clicked="orderTeams(true)"
                          />
                        </div>
                        <hr>
                        <div class="w-full p-4">
                          <app-button
                            v-model="searchParams.sorting"
                            :title="$t('landing.teams.filters_sort.alpha_desc')"
                            :btn-class="''"
                            data-cy="search-clear"
                            value=""
                            @clicked="orderTeams(false)"
                          />
                        </div>
                      </div>
                    </dropdown>
                    <!-- </transition> -->
                  </div>
                </div>
              </div>
            </div>
            <transition name="fade-up-delayed" :appear="true">
              <div class="teams-section">
                <div class="pl-8">
                  <div v-if="$apollo.queries.PublicTeams.loading" class="w-full flex justify-start">
                    <content-placeholders v-for="i in 3" :key="i" class="w-1/3 pr-2 mb-2 mr-2">
                      <content-placeholders-text :lines="4" />
                    </content-placeholders>
                  </div>
                  <div v-else class="w-full flex flex-wrap justify-start mb-10">
                    <featured-card-simple
                      v-for="publicTeam in $get(PublicTeams, 'data', [])"
                      :key="publicTeam.id"
                      class="w-full sm:w-1/2 lg:w-1/3 pr-5 mb-4"
                      :unit-id="publicTeam.id"
                      :team="publicTeam"
                    />
                  </div>
                </div>

                <div v-if="$get(PublicTeams, 'paginatorInfo.lastPage', 0) > 1" class="w-full pt-8 mb-16 md:mb-0 flex justify-end">
                  <pagination v-show="!$apollo.queries.PublicTeams.loading" v-model="page" :length="$get(PublicTeams, 'paginatorInfo.lastPage', 0)" />
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div>
        <transition name="fade-up-delayed" :appear="true">
          <app-button v-if="scrolled" class="registration-sticky-button text-left" :max-width-md="true" @clicked="redirectToTeamSignup">
            {{ $t('landing.teams.title_signup_fixed') }} <span class="underline">{{ $t('landing.teams.title_signup_cta_fixed') }}</span> {{ $t('landing.teams.title_signup_2_fixed') }}
          </app-button>
        </transition>
      </div>
    </div>
  </v-app>
</template>

  <script>
import AppButton from '@/components/AppButton'
import DropdownAppButton from '@/components/DropdownAppButton'
import Dropdown from '@/components/Dropdown'
import MultiAutoselect from '@/components/MultiAutoselect'
import FeaturedCardSimple from '@/components/FeaturedCardSimple'
import Pagination from '@/components/Pagination'
import {
  // MeQuery,
  PublicTeamsQuery,
  ContinentsQuery,
  TeamsCountriesQuery,
  TeamsLeaguesQuery
} from '@/services/graphql'
import {
  // persist,
  addLocalizedCountryName,
  addLocalizedContinentName
} from '@/services/helpers'

export default {
  layout: 'landing',

  name: 'LandingTeams',

  components: {
    AppButton,
    DropdownAppButton,
    Dropdown,
    MultiAutoselect,
    FeaturedCardSimple,
    Pagination
  },

  apollo: {
    // me: {
    //   ...MeQuery,
    //   result({ data }) {
    //     if (this.lastAuthorizedUnitRoute) {
    //       return this.$router.push(this.lastAuthorizedUnitRoute)
    //     }
    //     return this.resolveFallbackRedirectRoute(data)
    //   }
    // },
    PublicTeams: {
      fetchPolicy: 'network-only',
      ...PublicTeamsQuery,
      variables() {
        return {
          countryIds: this.initCountries,
          leagueIds: this.initLeagues,
          page: this.page,
          count: this.count,
          orderAsc: this.initOrderAsc
        }
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
    teamsCountries: {
      ...TeamsCountriesQuery,
      update(data) {
        data.teamsCountries.map(addLocalizedCountryName.bind(this))
        this.countriesList = data.teamsCountries
        const countrylist = []
        const continentlist = []
        data.teamsCountries.forEach(function(obj) {
          countrylist.push(obj.id)
        })
        data.teamsCountries.forEach(function(obj) {
          continentlist.push(obj.continent_id)
        })
        this.countriesListIds = countrylist
        this.continentsListIds = [...new Set(continentlist)]
        return data.teamsCountries
      }
    },
    leagues: {
      ...TeamsLeaguesQuery,
      update(data) {
        return data.teamsLeagues
      }
    }
  },

  data: () => ({
    scrolled: false,
    entityId: null,
    countriesList: [],
    countriesListIds: [],
    continentsListIds: [],
    continents: ContinentsQuery.mock,
    teamsCountries: TeamsCountriesQuery.mock,
    leagues: TeamsLeaguesQuery.mock,
    teams: [],
    pager: {},
    page: 1,
    count: 9,
    initCountries: [],
    initLeagues: [],
    initOrderAsc: true,
    searchParams: {
      continents: [],
      teamsCountries: [],
      leagues: [],
      orderAsc: true
    }
  }),

  computed: {
    // getBrandId() {
    //   if (this.$store.getters['auth/isAuthenticated']) {
    //     if (
    //       this.$store.getters['active/unitType'] === 'brand' &&
    //       this.$store.getters['active/unitID']
    //     ) {
    //       return this.$store.getters['active/unitID']
    //     }

    //     return this.entityId
    //   }
    //   return null
    // },
    countriesItems() {
      return this.getCountriesItems()
    },
    continentsItems() {
      return this.continents
        .filter(continent => {
          return this.continentsListIds.indexOf(continent.id) !== -1
        })
        .map(continent => {
          return {
            text: continent.localizedName,
            value: continent.id
          }
        })
    },
    leaguesItems() {
      const selectedCountries = this.searchParams.teamsCountries

      return this.leagues
        .filter(league => {
          if (!selectedCountries || selectedCountries.length === 0) {
            return true
          } else {
            if (league.countryId) {
              return selectedCountries.indexOf(league.countryId) !== -1
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
    }
  },

  beforeMount() {
    window.addEventListener('scroll', this.pageScrolled)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.pageScrolled)
  },

  mounted() {
    this.$store.dispatch('public-menu/setPermanentMenu', true)
  },

  methods: {
    redirectToTeamSignup() {
      return this.$router.push(this.localePath({ name: 'register-team' }))
    },

    pageScrolled(event) {
      const top = window.pageYOffset || document.documentElement.scrollTop
      this.scrolled = top > 50
    },

    toggleFilters() {
      this.$refs.teamsFilter.toggleDropdown()
    },

    toggleSorting() {
      this.$refs.teamsSorting.toggleDropdown()
    },

    onFilterClick() {
      this.initCountries = this.searchParams.teamsCountries
      this.initLeagues = this.searchParams.leagues
    },

    orderTeams(order) {
      this.initOrderAsc = order
    },

    getCountriesItems() {
      let countries = []

      const initialcountries = this.teamsCountries.map(country => {
        return {
          text: country.localizedName,
          continent_id: country.continent_id,
          value: country.id
        }
      })

      if (
        this.searchParams.continents.length &&
        this.searchParams.continents.length > 0
      ) {
        this.countriesList = initialcountries.filter(item => {
          return this.searchParams.continents.includes(item.continent_id)
        })
        countries = this.countriesList
      } else {
        countries = initialcountries
      }

      return countries
    }

    // resolveFallbackRedirectRoute(data) {
    //   this.entityId = this.$get(data, 'me.units.0.id')
    //   let route = this.localePath({
    //     name: ''
    //   })
    //   route = this.localePath({
    //     name: 'unit-id-dashboard',
    //     params: { id: this.entityId }
    //   })
    //   persist('lastAuthorizedUnitRoute', route)
    // }
  }
}
</script>

<style lang="postcss">
.registration-sticky-button {
  position: fixed;
  bottom: 20px;
  right: 100px;
  z-index: 100;
}

@media all and (max-width: 700px) {
  .registration-sticky-button {
    left: 20px;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    span {
      font-size: 13px;
    }
  }
}
</style>
