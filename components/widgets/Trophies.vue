<template>
  <div class="pr-2">
    <div class="text-right mb-4">
      <a v-if="isViewingOwnProfile" href="#" @click.prevent="onItemAddClick">
        <i class="fa fa-plus" /> {{ $t('general.create_new') }}
      </a>
    </div>
    <div v-for="trophies in groupedItems" :key="trophies[0].type.id">
      <div class="flex items-center mb-6 sm:mb-12">
        <div class="w-1/5 text-left text-grey text-p2 uppercase tracking-wide mb-auto">
          <svg-icon class="w-full h-10" name="inventory/trophy" />
        </div>
        <div class="w-4/5 text-left pl-2">
          <h6 class="font-medium leading-none">
            {{ trophies[0].type.name }}
          </h6>
          <ul class="font-serif text-grey">
            <li v-for="occurrence in sortOccurrences(trophies)" :key="occurrence.id" class="trophy__occurrence">
              {{ occurrence.stage.name }} - {{ occurrence.season.name }}
              <span v-if="isViewingOwnProfile" class="float-right">
                <a href="#" class="mx-3" @click.prevent="onItemEditClick(occurrence)">
                  <i class="fa fa-edit" />
                </a>
                <a href="#" @click.prevent="onItemDeleteClick(occurrence)">
                  <i class="fa fa-trash" />
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <trophies-modal
      ref="editModal"
      :unit-id="unitId"
      :seasons="seasonsItems"
      :trophy-types="trophiesItems"
      :trophy-stages="stageItems"
      :input="activeInput"
    />
  </div>
</template>

<script>
import { groupBy, sortBy } from 'lodash'
import { mapGetters } from 'vuex'
import TrophiesModal from '@/components/modals/TrophiesModal'
import {
  AllSeasonsQuery,
  TrophyTypesQuery,
  TrophyStagesQuery,
  DeleteTeamTrophyMutation,
  UnitHeaderQuery
} from '@/services/graphql'

export default {
  name: 'Trophies',

  components: {
    TrophiesModal
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
    }
  },

  apollo: {
    allSeasons: AllSeasonsQuery,
    unit: {
      ...UnitHeaderQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.season
        }
      }
    },
    trophyTypes: TrophyTypesQuery,
    trophyStages: TrophyStagesQuery
  },

  data() {
    return {
      activeInput: {
        id: null,
        season: null,
        trophyType: null,
        trophyStage: null
      }
    }
  },

  computed: {
    ...mapGetters({
      activeUnitID: 'active/unitID'
    }),

    groupedItems() {
      return groupBy(this.items, 'type.id')
    },
    seasonsItems() {
      if (!this.allSeasons) {
        return []
      }
      return this.allSeasons.map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    },

    trophiesItems() {
      if (!this.trophyTypes) {
        return []
      }
      const items = this.trophyTypes.map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
      return sortBy(items, 'text')
    },

    stageItems() {
      if (!this.trophyStages) {
        return []
      }
      const items = this.trophyStages.map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
      return sortBy(items, 'text')
    },

    isViewingOwnProfile() {
      return this.activeUnitID === this.unitId
    }
  },

  methods: {
    sortOccurrences(occurrences) {
      return sortBy(occurrences, o => -parseInt(o.season.name))
    },
    onItemAddClick() {
      this.activeInput = {
        id: null,
        season: null,
        trophyType: null,
        torphyStage: null
      }
      this.$refs.editModal.open()
    },
    onItemEditClick(item) {
      this.activeInput = {
        id: item.id || null,
        season: item.season ? item.season.id + '' : null,
        trophyType: item.type ? item.type.id + '' : null,
        trophyStage: item.stage ? item.stage.id + '' : null
      }
      this.$refs.editModal.open()
    },

    refreshData() {
      this.$apollo.queries.unit.refetch()
    },

    async onItemDeleteClick(item) {
      if (confirm(this.$t('general.delete_confirmation'))) {
        await this.$apollo.mutate({
          ...DeleteTeamTrophyMutation,
          variables: {
            organizationUnitId: this.unitId,
            seasonId: item.season ? item.season.id : null,
            trophyTypeId: item.type ? item.type.id : null,
            trophyStageId: item.stage ? item.stage.id : null
          }
        })
        this.refreshData()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
/*.trophy__occurrence {*/
/*  @apply .relative .cursor-pointer;*/
/*}*/
/*.trophy__occurrence + .trophy__occurrence {*/
/*  @apply .ml-4;*/

/*  &::before {*/
/*    @apply .block .absolute .h-2 .w-2;*/
/*    content: '\00B7';*/
/*    left: -0.875rem;*/
/*    padding-left: 0.25rem;*/
/*  }*/
/*}*/
</style>
