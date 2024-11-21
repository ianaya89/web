<template>
  <section class="bg-white">
    <div class="">
      <v-form class="mt-8">
        <app-input
          v-model="email"
          type="email"
          data-cy="email"
          :label="$t('app.register.email.label')"
          :required="true"
          :error-messages="validationErrors['email'] || []"
        />
        <div class="w-full flex">
          <app-input
            v-model="firstName"
            class="w-1/2 pr-4"
            type="text"
            data-cy="firstname"
            :label="$t('app.register.firstName.label')"
            :required="true"
            :error-messages="validationErrors['firstName'] || []"
          />
          <app-input
            v-model="lastName"
            class="w-1/2 pl-4"
            type="text"
            data-cy="lastname"
            :label="$t('app.register.lastName.label')"
            :required="true"
            :error-messages="validationErrors['lastName'] || []"
          />
        </div>

        <div class="w-full flex flex-wrap mt-8">
          <app-select-auto-complete
            v-model="continent"
            class="w-full sm:w-1/2 sm:pr-4"
            data-cy="continent"
            :loading="teams === undefined"
            :items="continentsItems"
            :hide-details="false"
            :required="false"
            :solo-label="$t('app.register.continent.label')"
          />
          <app-select-auto-complete
            v-if="continent"
            v-model="country"
            class="w-full sm:w-1/2 sm:pl-4"
            data-cy="country"
            :loading="teams === undefined"
            :items="countriesItems"
            :hide-details="false"
            :required="true"
            :solo-label="$t('app.register.country.label')"
            :error-messages="validationErrors['country'] || []"
          />

          <app-select-auto-complete
            v-if="country"
            v-model="city"
            class="w-full sm:w-1/2 sm:pr-4"
            data-cy="city"
            :items="cityItems"
            :hide-details="false"
            :required="true"
            :solo-label="$t('app.register.city.label')"
            :error-messages="validationErrors['city'] || []"
          />
        </div>

        <div>
          <div class="w-full flex flex-wrap">
            <app-select
              v-model="league"
              class="w-full sm:w-1/2 sm:pr-4"
              data-cy="league"
              :loading="teams === undefined"
              :items="leaguesItems"
              :hide-details="false"
              :required="true"
              :solo-label="$t('app.register.league.label')"
              :error-messages="validationErrors['league'] || []"
            />

            <app-select
              v-if="league"
              v-model="team"
              class="w-full sm:w-1/2 sm:pl-4"
              data-cy="team"
              :loading="teams === undefined"
              :items="teamsItems"
              :hide-details="false"
              :required="true"
              :solo-label="$t('app.register.team.label')"
              :error-messages="validationErrors['team'] || []"
            />
          </div>
        </div>

        <checkbox
          v-model="agreed"
          :checkbox-value="1"
          :required="true"
          data-cy="agree"
          class="mt-4"
          :error-messages="validationErrors['agreed'] || []"
        >
          <template v-slot:label>
            <div class="inline-block">
              {{ $t("general.agree_to") }}
              <nuxt-link :to="localePath({ name: 'terms' })">
                {{ $t("app.sidebar.team.terms") }}
              </nuxt-link>
              {{ $t("general.and") }}
              <nuxt-link :to="localePath({ name: 'privacy' })">
                {{ $t("app.sidebar.team.privacy") }}
              </nuxt-link>
              {{ $t("general.of_platform") }}
            </div>
          </template>
        </checkbox>

        <animated-button
          ref="registerButton"
          type="submit"
          data-cy="register"
          :btn-class="'primary-lg'"
          class="w-full sm:w-auto mt-6 mb-10"
          :should-disable="true"
          :loader="true"
          :title="$t('app.register.submit')"
          :show-arrow="true"
          @clicked="checkForm"
        />
      </v-form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortBy } from 'lodash'
import AppInput from '@/components/AppInput'
import AnimatedButton from '@/components/AnimatedButton'
import {
  ContinentsQuery,
  ContinentById,
  CountriesQuery,
  CountryById,
  TeamsWithEnabledRegistrationQuery
} from '@/services/graphql'
import AppSelect from '@/components/AppSelect'
import AppSelectAutoComplete from '@/components/AppSelectAutoComplete'
import Checkbox from '@/components/Checkbox'
import alreadyAuthenticated from '@/services/mixins/alreadyAuthenticated'
import {
  addLocalizedCountryName,
  addLocalizedContinentName
} from '@/services/helpers'
import { Register } from '@/services/graphql/register'

export default {
  layout: 'auth',

  name: 'Register',

  components: {
    AppInput,
    AnimatedButton,
    Checkbox,
    AppSelect,
    AppSelectAutoComplete
  },

  apollo: {
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
    continentById: {
      ...ContinentById,
      variables() {
        return {
          id: this.continent
        }
      },
      skip() {
        return this.continent == null
      }
    },
    countries: {
      ...CountriesQuery,
      update(data) {
        data.countries.map(addLocalizedCountryName.bind(this))
        return data.countries
      }
    },
    countryById: {
      ...CountryById,
      variables() {
        return {
          id: this.country
        }
      },
      skip() {
        return this.country == null
      }
    },
    teams: {
      ...TeamsWithEnabledRegistrationQuery,
      variables() {
        return {
          seasonId: this.currentSeason.id
        }
      },
      update(data) {
        return data.teamsEnabledRegistrations.map(team => {
          return {
            teamName: team ? team.teamName : null,
            teamId: team ? team.teamId : null,
            leagueName: team ? team.leagueName : null,
            leagueId: team ? team.leagueId : null,
            countryName: team ? team.countryName : null,
            countryId: team ? team.countryId : null
          }
        })
      }
    }
  },

  mixins: [alreadyAuthenticated],

  data: () => ({
    firstName: null,
    lastName: null,
    country: null,
    continent: null,
    city: null,
    league: null,
    team: null,
    type: 'team',
    agreed: null,
    email: null,
    organizationName: null,
    teamsJson: [],
    countries: [],
    continents: [],
    validationErrors: {}
  }),

  computed: {
    ...mapGetters({
      currentSeason: 'active/getCurrentSeason'
    }),

    continentsItems() {
      const continents = this.continents.map(item => {
        if (item.localizedName) {
          return { text: item.localizedName, value: item.id }
        }
      })

      return sortBy(continents, 'text')
    },
    countriesItems() {
      let countries = []
      const brandCountries = sortBy(
        this.$get(this.continentById, 'countries', [])
          .map(addLocalizedCountryName.bind(this))
          .map(item => {
            return { text: item.name, value: item.id }
          }),
        'text'
      )

      countries = brandCountries
      // let countries = this.countries.map(item => {
      //   return { text: item.localizedName, value: item.id }
      // })

      if (this.teams) {
        countries = this.teams
          .map(team => {
            const countryName = team.countryName
            const countryId = team.countryId

            return {
              text: countryName,
              value: countryId
            }
          })
          .filter(item => {
            const index = brandCountries.findIndex(element => {
              if (element.value === item.value) {
                return true
                // return !!item.value
              }
              return false
            })
            if (index !== -1) {
              return !!item.value
            }
          })
      } else {
        countries = []
      }

      return sortBy(countries, 'text')
    },
    cityItems() {
      return sortBy(
        this.$get(this.countryById, 'cities', []).map(item => {
          return { text: item.name, value: item.id }
        }),
        'text'
      )
    },

    teamsItems() {
      if (!this.teams) {
        return []
      }

      let teams = this.teams

      if (this.country) {
        teams = teams.filter(team => {
          return team.countryId && team.countryId === this.country
        })
      }

      if (this.league) {
        teams = teams.filter(team => {
          return team.leagueId && team.leagueId === this.league
        })
      }

      teams = teams.map(item => {
        return {
          text: item.teamName,
          value: item.teamId
        }
      })

      return teams
    },

    leaguesItems() {
      if (!this.teams) {
        return []
      }

      let leagues = this.teams
        .map(team => {
          const leagueName = team.leagueName
          const leagueId = team.leagueId
          const countryName = team.countryName
          const countryId = team.countryId

          return {
            text: leagueName,
            value: leagueId,
            countryName: countryName,
            countryId: countryId
          }
        })
        .filter(item => {
          return !!item.value
        })

      if (this.country) {
        leagues = leagues.filter(item => {
          return item.countryId && item.countryId === this.country
        })
      }

      return sortBy(leagues, 'text')
    }
  },

  async mounted() {
    await this.$recaptcha.init()
  },

  methods: {
    async defaultRegistrationFlow() {
      await this.$recaptcha
        .execute('register')
        .then(token => {
          return this.$apollo.mutate({
            ...Register,
            variables: {
              input: {
                recaptchaToken: token,
                firstName: this.firstName,
                lastName: this.lastName,
                country: this.country,
                city: this.city,
                league: this.league,
                team: this.team,
                type: this.type,
                email: this.email,
                organizationName: this.organizationName,
                agreed: this.agreed === 1
              }
            }
          })
        })
        .then(response => {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: `so_successful_${this.type}_registration`
          })

          this.$toast.success(this.$t('app.register.messages.success'), {
            duration: 12000
          })

          this.$refs.registerButton.loaded()
          this.firstName = null
          this.lastName = null
          this.country = null
          this.city = null
          this.league = null
          this.team = null
          this.type = 'team'
          this.email = null
          this.organizationName = null
          this.agreed = null
          this.validationErrors = {}
        })
        .catch(({ graphQLErrors }) => {
          if (graphQLErrors && graphQLErrors.length > 0) {
            const error = graphQLErrors[0]
            const validationErrors = error.extensions.errors
            if (validationErrors) {
              this.validationErrors = validationErrors
            }
            this.$toast.error(this.$t(error.message))
          } else {
            this.$toast.error(this.$t('errors.general'))
          }
          this.$refs.registerButton.loaded()
        })
    },

    async checkForm() {
      try {
        await this.defaultRegistrationFlow()
      } catch (error) {
        if (this.isDevEnv) {
          this.$toast.error(error.message || this.$t('errors.reset-error'))
        } else {
          this.$toast.error(this.$t('errors.general'))
        }
        this.$refs.registerButton.loaded()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
