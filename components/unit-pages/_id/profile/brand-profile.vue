<template>
  <section class="brand__profile w-full">
    <profile-header-partial>
      <template v-slot:image>
        <transition mode="out-in" name="fade">
          <div :key="$get(unit, 'entity.titlePhotos.0.url', 'NIL')" class="w-full h-80 sm:h-auto sm:min-h-128 overflow-hidden">
            <img
              class="hero-bg sm:w-full h-80 sm:h-auto sm:min-h-128 object-cover"
              :src="$get(unit, 'entity.titlePhotos.0.url', require('../../../../assets/images/profile-image-fallback.jpg'))"
              alt="Image"
            >
          </div>
        </transition>
      </template>
      <transition name="fade-up" :appear="true">
        <profile-header :share-enabled="false" :has-more="false" :update-photos-enabled="activeUnitID === unitId">
          <template v-slot:logo>
            <div class="w-16 h-16 mb-2">
              <avatar
                class="w-16 h-16"
                :src="$get(unit, 'entity.logo.url', undefined)"
              />
            </div>
          </template>
          <template v-slot:title>
            {{ $get(unit, 'entity.name', '-') }}
          </template>
          <template v-slot:content>
            <transition name="fade" mode="out-in">
              <div v-if="editing" class="w-full flex flex-wrap">
                <div class="w-1/2 sm:w-1/3 pb-4 pr-2">
                  <app-select-auto-complete
                    v-model="data.continent"
                    :outline="true"
                    :solo-label="$t('app.brand.profile.header.continent')"
                    :items="continentsItems"
                    :required="false"
                  />
                  <app-select-auto-complete
                    v-model="data.country"
                    :outline="true"
                    :solo-label="$t('app.brand.profile.header.country')"
                    :items="countriesItems"
                    :required="true"
                    :error-messages="validationErrors['country'] || []"
                  />
                  <app-select-auto-complete
                    v-model="data.city"
                    :outline="true"
                    :solo-label="$t('app.brand.profile.header.city')"
                    :items="citiesItems"
                    :required="true"
                    :error-messages="validationErrors['city'] || []"
                  />
                  <multiselect
                    v-model="data.preferredSports"
                    :outline="true"
                    :solo-label="$t('app.brand.profile.header.pref_sports')"
                    :items="sportsItems"
                    :required="true"
                    :error-messages="validationErrors['preferredSports'] || []"
                  />
                </div>

                <div class="w-1/2 sm:w-2/3 pb-6 pl-2">
                  <multiselect
                    v-model="data.industries"
                    :outline="true"
                    :solo-label="$t('app.brand.profile.header.industry')"
                    :items="industriesItems"
                    :required="true"
                    :error-messages="validationErrors['industries'] || []"
                  />

                  <data-label
                    :label="$t('app.brand.profile.header.description')"
                    :required="true"
                    class="text-left pt-2"
                  >
                    <text-area
                      v-model="data.description"
                      class="font-serif w-full"
                      :counter="500"
                      :label="null"
                      :outline="true"
                      :solo-label="null"
                      :error-messages="validationErrors['description'] || []"
                    />
                  </data-label>
                </div>

                <div class="w-full flex flex-wrap md:pr-32">
                  <app-button
                    class="mt-auto"
                    :title="$t('general.save')"
                    :btn-class="'primary-inverted'"
                    :loader="loading"
                    :disabled="loading"
                    :loading-text="''"
                    @clicked="updateProfile()"
                  />
                  <app-button
                    :title="$t('general.cancel')"
                    :btn-class="'secondary-inverted'"
                    @clicked="editing = false"
                  />
                </div>
              </div>
              <div v-else class="w-full flex flex-wrap md:pr-32">
                <div class="w-1/2 sm:w-1/3 pb-4">
                  <data-label
                    :label="$t('app.brand.profile.header.city')"
                    class="text-left pt-2 pr-2"
                  >
                    {{ $get(unit, 'entity.city.name', '-') }}
                  </data-label>
                  <data-label
                    :label="$t('app.brand.profile.header.country')"
                    class="text-left pt-2 pr-2"
                  >
                    {{ $get(unit, 'entity.country.name', '-') }}
                  </data-label>
                  <data-label
                    :label="$t('app.brand.profile.header.pref_sports')"
                    class="text-left pt-2 pr-2"
                  >
                    {{ $get(unit, 'entity.profile.preferredSports', []).map(sport => sport.name).join(', ') }}
                  </data-label>
                </div>
                <div class="w-1/2 sm:w-2/3 pb-6">
                  <div class="flex flex-wrap justify-between">
                    <data-label
                      :label="$t('app.brand.profile.header.industry')"
                      class="text-left pt-2 pr-2"
                    >
                      {{ $get(unit, 'entity.industries', []).map(industry => industry.name).join(', ') }}
                    </data-label>
                    <data-label
                      :label="$t('app.brand.profile.header.description')"
                      class="text-left pt-2 pr-2"
                    >
                      <p class="text-menu font-serif normal-case leading-normal pr-20">
                        {{ $get(unit, 'entity.profile.description', '-') }} <span class="text-red ml-2 lni-pencil cursor-pointer" @click="editing = true" />
                      </p>
                    </data-label>
                  </div>
                </div>
              </div>
            </transition>
          </template>
        </profile-header>
      </transition>
    </profile-header-partial>
    <!-- <transition name="fade-up" :appear="true">
      <navbar-tabs class="mt-16 nav-tabs">
        <navbar-tab-link :href="{name: 'unit-id-profile-targeting', params: {id: unitId}}">
          {{ $t('app.brand.profile.navbar.targeting') }}
        </navbar-tab-link> -->
    <!--        <navbar-tab-link :href="{name: 'unit-id-profile-audience', params: {id: unitId}}">-->
    <!--          {{ $t('app.brand.profile.navbar.audience') }}-->
    <!--        </navbar-tab-link>-->
    <!-- <navbar-tab-link :href="{name: 'unit-id-profile-social', params: {id: unitId}}">
          {{ $t('app.brand.profile.navbar.social') }}
        </navbar-tab-link> -->
    <!-- </navbar-tabs>
    </transition> -->

    <nuxt-child />
  </section>
</template>

<script>
// import NavbarTabs from '@/components/NavbarTabs'
// import NavbarTabLink from '@/components/NavbarTabLink'
import DataLabel from '@/components/DataLabel'
import Avatar from '@/components/Avatar'
import ProfileHeader from '@/components/ProfileHeader'
import ProfileHeaderPartial from '@/components/partials/ProfileHeaderPartial'
import {
  BrandHeaderQuery,
  BrandQuery,
  // CountriesQuery,
  ContinentsQuery,
  ContinentById,
  CountryById,
  IndustriesQuery,
  UpdateBrandProfileMutation
} from '@/services/graphql'
import { SportsQuery } from '@/services/graphql/sports'
import TextArea from '@/components/TextArea'
import AppButton from '@/components/AppButton'
// import AppSelect from '@/components/AppSelect'
import AppSelectAutoComplete from '@/components/AppSelectAutoComplete'
import Multiselect from '@/components/Multiselect'
import { addLocalizedContinentName } from '@/services/helpers'

export default {
  layout: 'brand',

  name: 'BrandProfile',

  components: {
    // AppSelect,
    AppSelectAutoComplete,
    Avatar,
    AppButton,
    DataLabel,
    Multiselect,
    // NavbarTabs,
    // NavbarTabLink,
    ProfileHeader,
    ProfileHeaderPartial,
    TextArea
  },

  apollo: {
    unit: {
      ...BrandHeaderQuery,
      variables() {
        return {
          id: this.unitId
        }
      },
      result({ data }) {
        this.data.city = this.$get(data, 'unit.entity.city.id')
        this.data.country = this.$get(data, 'unit.entity.country.id')
        this.data.continent = this.$get(
          data,
          'unit.entity.country.continent_id'
        )
        this.data.preferredSports = this.$get(
          data,
          'unit.entity.profile.preferredSports',
          []
        ).map(item => item.id)
        this.data.industries = this.$get(
          data,
          'unit.entity.industries',
          []
        ).map(item => item.id)
        this.data.description = this.$get(
          data,
          'unit.entity.profile.description'
        )
      }
    },
    brand: BrandQuery,
    industries: IndustriesQuery,
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
      ...ContinentById,
      variables() {
        return {
          id: this.data.continent
        }
      },
      skip() {
        return !this.data.continent
      },
      update(data) {
        return this.$get(data, 'continentById.countries')
      }
    },
    sports: SportsQuery,
    cities: {
      ...CountryById,
      variables() {
        return {
          id: this.data.country
        }
      },
      skip() {
        return !this.data.country
      },
      update(data) {
        return this.$get(data, 'countryById.cities')
      }
    }
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    brand: BrandQuery.mock,
    data: {
      city: null,
      country: null,
      continent: null,
      preferredSports: [],
      industries: [],
      description: ''
    },
    editing: false,
    loading: false,
    validationErrors: {}
  }),

  computed: {
    activeUnitID() {
      return this.$store.getters['active/unitID']
    },

    industriesItems() {
      if (!this.industries) {
        return []
      }
      return this.industries.map(item => ({
        text: item.name,
        value: item.id
      }))
    },

    continentsItems() {
      if (!this.continents) {
        return []
      }
      return this.continents.map(item => ({
        text: item.name,
        value: item.id
      }))
    },

    countriesItems() {
      if (!this.countries) {
        return []
      }
      return this.countries.map(item => ({
        text: item.name,
        value: item.id
      }))
    },

    citiesItems() {
      if (!this.cities) {
        return []
      }
      return this.cities.map(item => ({
        text: item.name,
        value: item.id
      }))
    },

    sportsItems() {
      if (!this.sports) {
        return []
      }
      return this.sports.map(item => ({
        text: item.name,
        value: item.id
      }))
    }
  },

  methods: {
    updateProfile() {
      this.validationErrors = {}
      this.loading = true
      this.$apollo
        .mutate({
          ...UpdateBrandProfileMutation,
          variables: {
            id: this.unit.entity.id,
            input: {
              city: this.data.city,
              country: this.data.country,
              preferredSports: this.data.preferredSports,
              industries: this.data.industries,
              description: this.data.description
            }
          }
        })
        .then(() => {
          this.$apollo.queries.unit.refetch()
          this.$toast.success(
            this.$t('app.brand.settings.profile.messages.success')
          )
          this.editing = false
          this.loading = false
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
            this.$toast.error(
              this.$t('app.brand.settings.profile.messages.error')
            )
          }
          this.loading = false
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.brand__profile {
  img.hero-bg {
    max-width: none;
  }
  .nav-tabs {
    width: calc(100% - 100px);
    margin-left: calc(100% - calc(100% - 100px));
    @apply .relative;
  }
}

span.required-sign {
  &::after {
    @apply .text-red;
    content: '*';
  }
}

@media (max-width: 768px) {
  .brand__profile .nav-tabs {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .brand__profile .nav-tabs {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
