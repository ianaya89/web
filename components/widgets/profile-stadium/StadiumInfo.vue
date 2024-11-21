<template>
  <div class="w-full">
    <transition name="fade-up" :appear="true">
      <div class="w-full">
        <h3>{{ $get(stadium, 'name', '-') }}</h3>
        <p class="mt-4 font-medium">
          {{ $get(stadium, 'address.name', '-') }}
        </p>
        <a :href="gMapHref" class="hover:underline font-serif" target="_blank" rel="noopener">{{ $t('app.profile.team.stadium.view_on_map') }}</a>
      </div>
    </transition>
    <transition name="fade-up-delayed" :appear="true">
      <div class="flex w-full flex-wrap mt-10">
        <div class="w-full sm:w-3/5 pr-0 sm:pr-8">
          <div class="flex w-full">
            <div class="w-1/3">
              <GmapMap
                class="w-full h-full"
                :center="mapCenter"
                :options="mapOptions"
                :zoom="7"
                map-type-id="terrain"
              />
            </div>
            <div class="w-2/3">
              <img :src="$get(stadium, 'photo.url', null)" :class="'stadium-img w-full h-96'">
            </div>
          </div>
        </div>
        <div class="w-full sm:w-2/5 pl-0 sm:pl-2 lg:pl-8 mt-6 sm:mt-0">
          <div class="flex w-full">
            <div class="w-1/2">
              <data-label :label="$t('app.profile.team.stadium.capacity')">
                {{ $get(stadium, 'precalcs.0.data.capacity') | number }}
              </data-label>
              <data-label :label="$t('app.profile.team.stadium.totalVisitors')" class="pt-6">
                {{ $get(metaData, 'visitorsTotal') | number }}
              </data-label>
              <data-label :label="$t('app.profile.team.stadium.skyboxes')" class="pt-6">
                {{ $get(stadium, 'precalcs.0.data.skyboxes') | number }}
              </data-label>
            </div>
            <div class="w-1/2">
              <data-label :label="$t('app.profile.team.stadium.perMatchVisitors')">
                {{ $get(metaData, 'visitorsPerMatch') | number }}
              </data-label>
              <data-label :label="$t('app.profile.team.stadium.businessSeats')" class="pt-6">
                {{ $get(stadium, 'precalcs.0.data.businessSeats') | number }}
              </data-label>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DataLabel from '@/components/DataLabel'
import { StadiumInfoQuery } from '@/services/graphql'

export default {
  name: 'StadiumInfo',

  components: {
    DataLabel
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    forceStadium: {
      type: Object,
      default: null
    },
    forceMetaData: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    mapOptions: {
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUi: false
    }
  }),

  apollo: {
    unit: {
      ...StadiumInfoQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.previousSeason.name,
          prevseason: this.previousSeason.name
        }
      },
      skip() {
        return this.forceStadium !== null
      }
    }
  },

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason',
      previousSeason: 'active/getLastSeason'
    }),

    stadium() {
      return this.$get(
        this.unit,
        'entity.teamStadiums.0.stadium',
        this.forceStadium
      )
    },

    metaData() {
      return this.$get(
        this.unit,
        'entity.teamStadiums.0.metaData',
        this.forceMetaData
      )
    },

    mapCenter() {
      return {
        lat: this.$get(this.stadium, 'address.latitude', 0),
        lng: this.$get(this.stadium, 'address.longitude', 0)
      }
    },

    gMapHref() {
      return (
        'https://www.google.com/maps/?q=' +
        this.$get(this.stadium, 'address.latitude', 0) +
        ',' +
        this.$get(this.stadium, 'address.longitude', 0)
      )
    }
  },

  methods: {
    refreshStadiumData() {
      this.$apollo.queries.unit.refetch()
    }
  }
}
</script>

<style scoped>
.stadium-img {
  object-fit: cover;
  object-position: center center;
}
</style>
