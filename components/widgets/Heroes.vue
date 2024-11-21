<template>
  <div class="h-full relative">
    <div class="fading-gradient" />
    <div class="flex mb-5">
      <div class="w-1/2 text-left text-grey text-p2 uppercase tracking-wide">
        {{ $t('app.profile.header.info.heroes') }}
      </div>
      <div class="w-1/2 text-right">
        <app-button v-if="isViewingOwnProfile" :btn-class="'link'" class="mr-4" @clicked="onItemAddClick">
          <i class="fa fa-plus" /> {{ $t('general.create_new') }}
        </app-button>
        <app-button :title="toggleTitle" :btn-class="'link'" @clicked="toggleAll" />
      </div>
    </div>
    <div class="flex relative shadow-inner sm:shadow-none pl-4 sm:pl-0">
      <accordion ref="heroesAccordion" :multi="true" class="w-full scrollable-medium">
        <accordion-item
          v-for="(hero, index) in items"
          :key="hero.id"
          :show-icon="'lni-chevron-down'"
          :hide-icon="'lni-chevron-up'"
          :top-border="index === 0"
        >
          <template v-slot:header>
            <div class="flex w-full items-center py-1">
              <div class="flex-grow flex items-center">
                <div class="mr-2 pt-2">
                  <avatar :src="hero.logo.url" :classes="'w-10 h-10'" />
                </div>
                <span class="h6 leading-tight">{{ hero.name }}</span>
              </div>
              <div v-if="isViewingOwnProfile">
                <a href="#" class="mx-3" @click.prevent="onItemEditClick(hero)">
                  <i class="fa fa-edit" />
                </a>
                <a href="#" @click.prevent="onItemDeleteClick(hero)">
                  <i class="fa fa-trash" />
                </a>
              </div>
            </div>
          </template>
          <span class="font-serif text-grey pb-4">
            {{ hero.description }}
          </span>
        </accordion-item>
        <div class="w-full h-10" />
      </accordion>
    </div>
    <heroes-modal
      ref="editModal"
      :unit-id="unitId"
      :input="activeInput"
      :update-photos-enabled="updatePhotosEnabled"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/Avatar'
import AppButton from '@/components/AppButton'
import Accordion from '@/components/Accordion'
import AccordionItem from '@/components/AccordionItem'
import HeroesModal from '@/components/modals/HeroesModal'
import { DeleteHeroMutation, UnitHeaderQuery } from '@/services/graphql'

export default {
  name: 'Heroes',

  components: {
    Avatar,
    AppButton,
    AccordionItem,
    Accordion,
    HeroesModal
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },
    unitId: {
      type: String,
      required: true
    },
    season: {
      type: String,
      required: true
    },
    updatePhotosEnabled: {
      type: Boolean,
      default: false
    }
  },

  apollo: {
    unit: {
      ...UnitHeaderQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.season
        }
      }
    }
  },

  data() {
    return {
      activeInput: {
        id: null,
        name: null,
        description: null,
        logo: null
      },
      toggledAll: false
    }
  },

  computed: {
    ...mapGetters({
      activeUnitID: 'active/unitID'
    }),

    toggleTitle() {
      return this.toggledAll
        ? this.$t('general.collapse_all')
        : this.$t('general.expand_all')
    },

    isViewingOwnProfile() {
      return this.activeUnitID === this.unitId
    }
  },

  methods: {
    toggleAll() {
      this.toggledAll = !this.toggledAll
      if (this.toggledAll) {
        this.$refs.heroesAccordion.showAll()
      } else {
        this.$refs.heroesAccordion.hideAll()
      }
    },
    onItemAddClick() {
      this.activeInput = {
        id: null,
        name: null,
        description: null,
        logo: null
      }
      this.$refs.editModal.open()
    },
    onItemEditClick(item) {
      this.activeInput = {
        id: item.id || null,
        name: item.name ? item.name : null,
        description: item.description ? item.description : null,
        logo: item.logo ? item.logo.url : null
      }
      this.$refs.editModal.open()
    },

    refreshData() {
      this.$apollo.queries.unit.refetch()
    },

    async onItemDeleteClick(item) {
      if (confirm(this.$t('general.delete_confirmation'))) {
        await this.$apollo.mutate({
          ...DeleteHeroMutation,
          variables: {
            organizationUnitId: this.unitId,
            id: item ? item.id : null
          }
        })
        this.refreshData()
      }
    }
  }
}
</script>

<style scoped>
</style>
