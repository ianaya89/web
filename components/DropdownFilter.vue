<template>
  <div class="relative" @click.stop>
    <transition name="slide-fade">
      <div v-if="activated" class="dropdown-items" :class="itemsClasses">
        <div class="w-full pt-4 max-h-128">
          <div class="w-full py-4 flex justify-start">
            <div class="w-64 pr-6">
              <multi-autoselect v-model="searchParams.continents" :outline="true" :solo-label="$t('general.continent')" :items="continentsItems" :single-line="true" />
            </div>
            <div class="w-64 pr-6">
              <multi-autoselect v-model="searchParams.countries" :outline="true" :solo-label="$t('general.country')" :items="countriesItems" :single-line="true" />
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
            <multi-autoselect v-model="searchParams.countries" :outline="true" :solo-label="$t('general.country')" :items="countriesItems" :single-line="true" />
            <multi-autoselect v-model="searchParams.leagues" :outline="true" :solo-label="$t('general.league')" :items="leaguesItems" :single-line="true" />

            <app-button class="w-full" :btn-class="'primary'" :title="$t('general.search')" data-cy="filter-submit" @clicked="onFilterClick()" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MultiAutoselect from '@/components/MultiAutoselect'

export default {
  name: 'DropdownFilter',

  components: {
    MultiAutoselect
  },

  props: {
    itemsClasses: {
      type: String,
      default: 'top-gap p-4'
    }
  },

  data: () => ({
    activated: false
  }),

  computed: {
    activeDropdown() {
      return this.$store.getters['dropdown/getActiveDropdown']
    }
  },

  mounted() {
    document.addEventListener('click', () => {
      if (this.activated) {
        this.hideDropdown()
      }
    })
  },

  methods: {
    toggleDropdown() {
      if (this.activeDropdown != null && !this.activated) {
        this.activeDropdown.closeFnc()
      }
      this.activated = !this.activated
      if (this.activated) {
        this.$store.dispatch('dropdown/setActiveDropdown', {
          uuid: this._uid,
          closeFnc: this.hideDropdown
        })
      } else {
        this.$store.dispatch('dropdown/clear')
      }
    },

    hideDropdown() {
      this.activated = false
      this.$store.dispatch('dropdown/clear')
    }
  }
}
</script>

<style lang="postcss" scoped>
.dropdown-items {
  @apply .border .border-grey-l4 .bg-white .absolute .shadow-md .z-40 .right-0;
}

.top-gap {
  top: 1.5rem;
}
</style>
