<template>
  <div class="w-full">
    <transition name="fade-up" :appear="true">
      <div class="w-full">
        <h3>{{ getStadiumName }}</h3>
        <p class="mt-4 font-medium">
          {{ getStadiumAddress }}
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
              <!-- <img :src="$get(stadium, 'photo.url', null)" :class="'stadium-img w-full h-96'"> -->
              <img :src="getStadiumPhoto" :class="'stadium-img w-full h-96'">
            </div>
          </div>
        </div>
        <div class="w-full sm:w-2/5 pl-0 sm:pl-2 lg:pl-8 mt-6 sm:mt-0">
          <div class="flex w-full">
            <div class="w-1/2">
              <data-label :label="$t('app.profile.team.stadium.capacity')">
                {{ getStadiumCapacity | number }}
              </data-label>
              <data-label :label="$t('app.profile.team.stadium.totalVisitors')" class="pt-6">
                {{ $get(getStadiumMeta, 'visitorsTotal') | number }}
              </data-label>
              <data-label :label="$t('app.profile.team.stadium.skyboxes')" class="pt-6">
                {{ getSkyboxes | number }}
              </data-label>
            </div>
            <div class="w-1/2">
              <data-label :label="$t('app.profile.team.stadium.perMatchVisitors')">
                {{ $get(getStadiumMeta, 'visitorsPerMatch') | number }}
              </data-label>
              <data-label :label="$t('app.profile.team.stadium.businessSeats')" class="pt-6">
                {{ getBusinessSeats | number }}
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

export default {
  name: 'StadiumInfoLanding',

  components: {
    DataLabel
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    skyboxes: {
      type: Number,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    businessSeats: {
      type: Number,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    stadiumCapacity: {
      type: Number,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    stadiumMeta: {
      type: Object,
      required: false
    },
    stadiumAddress: {
      type: String,
      required: true
    },
    stadiumLat: {
      type: Number,
      required: true
    },
    stadiumLng: {
      type: Number,
      required: true
    },
    stadiumName: {
      type: String,
      required: true
    },
    stadiumPhoto: {
      type: String,
      required: true
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

  apollo: {},

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    }),

    mapCenter() {
      return {
        lat: this.getStadiumLat,
        lng: this.getStadiumLng
      }
    },

    gMapHref() {
      return (
        'https://www.google.com/maps/?q=' +
        this.getStadiumLat +
        ',' +
        this.getStadiumLng
      )
    },

    getSkyboxes() {
      return this.skyboxes
    },

    getBusinessSeats() {
      return this.businessSeats
    },
    getStadiumCapacity() {
      return this.stadiumCapacity
    },
    getStadiumMeta() {
      return this.stadiumMeta
    },
    getStadiumAddress() {
      return this.stadiumAddress
    },
    getStadiumName() {
      return this.stadiumName
    },
    getStadiumLat() {
      return this.stadiumLat
    },
    getStadiumLng() {
      return this.stadiumLng
    },
    getStadiumPhoto() {
      return this.stadiumPhoto
    }
  },

  methods: {}
}
</script>

<style scoped>
.stadium-img {
  object-fit: cover;
  object-position: center center;
}
</style>
