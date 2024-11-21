<template>
  <div class="w-full relative">
    <transition name="fade-down" appear>
      <div class="relative mt-4">
        <contacts-world-map ref="map" class="w-full" :specific-options="mapOptions" :series="contactMapSeries" @city-clicked="onCityClick($event)" />

        <div class="absolute top-0 left-0 pl-3 pt-5">
          <div class="select-none cursor-pointer text-h3 text-black text-center leading-none" @click="$refs.map.zoomInMap()">
            +
          </div>
          <div class="select-none cursor-pointer text-h3 text-black text-center leading-none" @click="$refs.map.zoomOutMap()">
            -
          </div>
        </div>
      </div>
    </transition>

    <transition name="scale-fade" appear>
      <div v-if="selectedContact!==null" :key="selectedContact.city" class="absolute right-0 top-0 bg-white p-8 shadow-lg min-w-72">
        <div class="w-full flex justify-end -mt-2 ml-3">
          <app-button :title="$t('general.hide')" :btn-class="'link'" @clicked="selectedContact = null">
            <span class="lni-close" />
          </app-button>
        </div>
        <div class="relative w-full">
          <h3 class="mb-4">
            {{ $t('app.contact_us.modal_title') }}
          </h3>
          <a class="text-red" href="mailto:info@sponsoronline.eu">info@sponsoronline.eu</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ContactsWorldMap from '@/components/charts/ContactsWorldMap'
import { GEO_COORDS } from '@/services/helpers'
import AppButton from '@/components/AppButton'

export default {
  name: 'ContactWithMap',

  components: {
    AppButton,
    ContactsWorldMap
  },

  data: () => ({
    mapOptions: {
      chart: {
        backgroundColor: 'transparent'
      }
    },
    selectedContact: null,
    cities: {
      munich: {
        city: 'Munich'
      },
      lucerne: {
        city: 'Lucerne'
      },
      london: {
        city: 'London'
      },
      athens: {
        city: 'Athens'
      },
      prague: {
        city: 'Prague'
      },
      braga: {
        city: 'Braga'
      },
      mexico_city: {
        city: 'Mexico City'
      }
    }
  }),

  computed: {
    contactMapSeries() {
      return {
        type: 'mappoint',
        name: 'Cities',
        zIndex: 2,
        data: Object.keys(this.cities).map(key => {
          const cityData = this.cities[key]

          return {
            code3: key,
            contact: {
              city: cityData.city
            },
            lat: GEO_COORDS[key].lat,
            lon: GEO_COORDS[key].lon
          }
        }),
        minSize: 12,
        maxSize: 12
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.selectedContact = {
        city: this.cities.prague.city
      }
    })
  },

  methods: {
    onCityClick(city) {
      this.selectedContact = city.contact
    }
  }
}
</script>
