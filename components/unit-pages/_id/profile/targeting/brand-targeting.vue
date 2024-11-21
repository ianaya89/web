<template>
  <section v-if="showTargetingData" class="brand__profile__targeting">
    <transition name="fade-up" :appear="true">
      <div v-if="$apollo.loading" class="w-full mt-12 -mx-4">
        <content-placeholders>
          <content-placeholders-heading :img="true" />
          <content-placeholders-text :lines="10" />
        </content-placeholders>
      </div>
    </transition>
    <transition name="fade-up" :appear="true">
      <div v-if="!$apollo.loading && unit!==null" class="w-full flex flex-wrap mt-12 xl:-mx-4">
        <div class="w-full sm:w-1/2 xl:w-1/3 p-4">
          <h4 class="mb-8">
            {{ $t('app.brand.profile.targeting.demographics') }}
          </h4>
          <multiselect v-model="unit.entity.profile.preferredGenderGroups" :items="genderItems" :solo-label="$t('app.brand.profile.targeting.gender.label')" @input="updateTargeting()" />
          <multiselect v-model="unit.entity.profile.preferredAgeGroups" :items="ageItems" :solo-label="$t('app.brand.profile.targeting.age.label')" @input="updateTargeting()" />
        </div>
        <div class="w-full sm:w-1/2 xl:w-1/3 p-4">
          <h4 class="mb-8">
            {{ $t('app.sidebar.brand.marketplace') }}
          </h4>
          <multiselect :value="unit.entity.profile.preferredInventories.map(item => item.id)" :items="categoriesItems" :solo-label="$t('app.brand.profile.targeting.categories.label')" @input="preferredInventoriesProfile = $event; updateTargeting()" />
          <div class="p-4 pt-8 border-b border-grey-l4">
            <slider
              :value="preferredMarketplaceBudget"
              :range="true"
              :min="0"
              :max="marketplaceMaxBudget"
              :formatter="$filters.currency"
              :formatter-args="[true]"
              @change="preferredMarketplaceBudget = $event; updateTargeting()"
            >
              <template v-slot:label>
                {{ $t('general.budget') }}
              </template>
            </slider>
          </div>
        </div>
        <div class="w-full sm:w-1/2 xl:w-1/3 p-4">
          <h4 class="mb-8">
            {{ $t('app.brand.profile.targeting.media_settings') }}
          </h4>
          <multiselect v-model="unit.entity.profile.preferredSocialMediaChannels" :items="channelItems" :solo-label="$t('app.brand.profile.targeting.channel.label')" @input="updateTargeting()" />
          <multiselect v-model="unit.entity.profile.preferredEngagementGroups" :items="engagementItems" :solo-label="$t('app.brand.profile.targeting.engagement.label')" @input="updateTargeting()" />
        </div>
      </div>
    </transition>
    <appear-transition :percentage-offset="0.7">
      <div v-if="!$apollo.loading && unit!==null" class="w-full flex flex-wrap mt-12 xl:-mx-4">
        <div class="w-full sm:w-1/2 xl:w-1/3 p-4">
          <h4 class="mb-8">
            {{ $t('app.brand.profile.targeting.lang_countries.label') }}
          </h4>
          <multiselect
            :value="unit.entity.profile.preferredLanguages.map(item => item.id)"
            :items="languagesItems"
            :solo-label="$t('app.brand.profile.targeting.lang_countries.language')"
            @input="prefferedLanguagesProfile = $event; updateTargeting()"
          />
          <multiselect
            :value="unit.entity.profile.preferredCountries.map(item => item.id)"
            :items="countriesItems"
            :solo-label="$t('app.brand.profile.targeting.lang_countries.countries')"
            @input="preferredCountriesProfile = $event; updateTargeting()"
          />
        </div>
        <div class="w-full sm:w-1/2 xl:w-2/3 p-4">
          <highlighted-world-map v-if="preferredCountries.length" :specific-options="mapOptions" :tooltip="false" :series="highlightedMapSeries" />
        </div>
      </div>
    </appear-transition>
  </section>
</template>

<script>
import Slider from '@/components/Slider'
import Multiselect from '@/components/Multiselect'
import AppearTransition from '@/components/transitions/AppearTransition'
import {
  BrandMutation,
  BrandTargetingQuery,
  CountriesQuery,
  LanguagesQuery,
  MarketplaceCategoriesQuery,
  MarketplaceSearchRangesQuery
} from '@/services/graphql'
import HighlightedWorldMap from '@/components/charts/HighlightedWorldMap'
import {
  objectKeysToUnderscore,
  addLocalizedCountryName
} from '@/services/helpers'

export default {
  name: 'Targeting',

  components: {
    Slider,
    Multiselect,
    AppearTransition,
    HighlightedWorldMap
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    languages: LanguagesQuery,
    countries: {
      ...CountriesQuery,
      update(data) {
        data.countries.map(addLocalizedCountryName.bind(this))
        return data.countries
      }
    },
    categories: MarketplaceCategoriesQuery,
    marketplaceSearchRanges: MarketplaceSearchRangesQuery,
    unit: {
      ...BrandTargetingQuery,
      variables() {
        return {
          id: this.unitId
        }
      },
      result({ data }) {
        this.preferredCountries = Array.from(
          this.$get(data, 'unit.entity.profile.preferredCountries', [])
        )
        this.prefferedLanguagesProfile = this.$get(
          data,
          'unit.entity.profile.preferredLanguages',
          []
        ).map(item => item.id)
        this.preferredCountriesProfile = this.$get(
          data,
          'unit.entity.profile.preferredCountries',
          []
        ).map(item => item.id)
        this.preferredInventoriesProfile = this.$get(
          data,
          'unit.entity.profile.preferredInventories',
          []
        ).map(item => item.id)
        this.preferredMarketplaceBudget = this.$get(
          data,
          'unit.entity.profile.preferredMarketplaceBudget',
          [0, 0]
        )

        return data.unit
      }
    }
  },

  data: () => ({
    showTargetingData: false,
    isUpdating: false,
    unit: BrandTargetingQuery.mock,
    preferredCountries: [],
    prefferedLanguagesProfile: [],
    preferredCountriesProfile: [],
    preferredInventoriesProfile: [],
    preferredMarketplaceBudget: [0, 0],
    languages: LanguagesQuery.mock,
    countries: CountriesQuery.mock,
    marketplaceSearchRanges: MarketplaceSearchRangesQuery.mock,
    mapOptions: {
      chart: {
        backgroundColor: 'transparent',
        events: {
          load() {
            this.mapZoom(0.4)
          }
        }
      }
    }
  }),

  computed: {
    marketplaceMaxBudget() {
      return this.marketplaceSearchRanges.budget
    },

    languagesItems() {
      return this.languages.map(item => {
        return { text: item.name, value: item.id }
      })
    },

    countriesItems() {
      return this.countries.map(item => {
        return { text: item.localizedName, value: item.id }
      })
    },

    highlightedMapSeries() {
      return {
        tooltip: {
          enabled: false
        },
        data: this.preferredCountries.map(item => {
          return {
            name: item.name,
            value: 1
          }
        })
      }
    },

    categoriesItems() {
      return this.categories.map(item => {
        return { text: item.name, value: item.id }
      })
    },

    genderItems() {
      return [
        {
          text: this.$t('app.brand.profile.targeting.gender.male'),
          value: 'male'
        },
        {
          text: this.$t('app.brand.profile.targeting.gender.female'),
          value: 'female'
        },
        {
          text: this.$t('app.brand.profile.targeting.gender.other'),
          value: 'unknown'
        }
      ]
    },
    engagementItems() {
      return [
        {
          text: this.$t('app.brand.profile.targeting.engagement.group9'),
          value: 'group9'
        },
        {
          text: this.$t('app.brand.profile.targeting.engagement.group10'),
          value: 'group10'
        },
        {
          text: this.$t('app.brand.profile.targeting.engagement.group20'),
          value: 'group20'
        },
        {
          text: this.$t('app.brand.profile.targeting.engagement.group30'),
          value: 'group30'
        },
        {
          text: this.$t('app.brand.profile.targeting.engagement.group50'),
          value: 'group50'
        }
      ]
    },
    ageItems() {
      return [
        {
          text: this.$t('app.brand.profile.targeting.age.group17'),
          value: 'group17'
        },
        {
          text: this.$t('app.brand.profile.targeting.age.group18'),
          value: 'group18'
        },
        {
          text: this.$t('app.brand.profile.targeting.age.group25'),
          value: 'group25'
        },
        {
          text: this.$t('app.brand.profile.targeting.age.group35'),
          value: 'group35'
        },
        {
          text: this.$t('app.brand.profile.targeting.age.group45'),
          value: 'group45'
        },
        {
          text: this.$t('app.brand.profile.targeting.age.group55'),
          value: 'group55'
        },
        {
          text: this.$t('app.brand.profile.targeting.age.group65'),
          value: 'group65'
        }
      ]
    },
    channelItems() {
      return [
        {
          icon: 'pr-2 fab fa-facebook-f',
          text: this.$t('app.brand.profile.targeting.channel.facebook'),
          value: 'facebook'
        },
        {
          icon: 'pr-2 fab fa-instagram',
          text: this.$t('app.brand.profile.targeting.channel.instagram'),
          value: 'instagram'
        },
        {
          icon: 'pr-2 fab fa-twitter',
          text: this.$t('app.brand.profile.targeting.channel.twitter'),
          value: 'twitter'
        },
        {
          icon: 'pr-2 fab fa-youtube',
          text: this.$t('app.brand.profile.targeting.channel.youtube'),
          value: 'youtube'
        }
      ]
    }
  },

  methods: {
    async updateTargeting() {
      if (this.isUpdating) {
        return
      }

      this.isUpdating = true

      try {
        const preparedObject = Object.assign({}, this.unit.entity)
        delete preparedObject.id
        delete preparedObject.__typename
        delete preparedObject.profile.__typename
        delete preparedObject.profile.preferredSports
        const preparedObjectUnderscore = { profile: {} }
        preparedObjectUnderscore.profile = objectKeysToUnderscore(
          preparedObject.profile
        )
        preparedObjectUnderscore.profile.preferred_languages = this.prefferedLanguagesProfile
        preparedObjectUnderscore.profile.preferred_countries = this.preferredCountriesProfile
        preparedObjectUnderscore.profile.preferred_inventories = this.preferredInventoriesProfile
        preparedObjectUnderscore.profile.preferred_marketplace_budget = this.preferredMarketplaceBudget
        await this.$apollo
          .mutate({
            ...BrandMutation,
            variables: {
              id: this.unit.entity.id,
              input: preparedObjectUnderscore
            }
          })
          .then(() => {
            this.$apollo.queries.unit.refetch()
            this.$toast.success(
              this.$t('app.brand.profile.targeting.messages.success')
            )

            this.isUpdating = false
          })
      } catch (err) {
        this.$toast.error(this.$t('app.brand.profile.targeting.messages.error'))

        this.isUpdating = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.brand__profile__targeting {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
  @apply .relative .pb-16;
}

@media (max-width: 768px) {
  .brand__profile__targeting {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .brand__profile__targeting {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
