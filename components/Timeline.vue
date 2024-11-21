<template>
  <div>
    <div class="text-right mb-4">
      <a v-if="isViewingOwnProfile" href="#" @click.prevent="onItemAddClick">
        <i class="fa fa-plus" /> {{ $t('general.create_new') }}
      </a>
    </div>
    <ul>
      <li v-for="(item,index) in sortedItems" :key="item.id" :class="isVisible(index)">
        <div class="h6 font-medium leading-none flex">
          <div class="flex-grow">
            {{ item.season.name }} <span v-if="item.title"> - {{ item.title }}</span>
          </div>
          <div v-if="isViewingOwnProfile">
            <a href="#" class="mx-3" @click.prevent="onItemEditClick(item)">
              <i class="fa fa-edit" />
            </a>
            <a href="#" @click.prevent="onItemDeleteClick(item)">
              <i class="fa fa-trash" />
            </a>
          </div>
        </div>
        <span class="font-serif text-grey">{{ item.description }}</span>
      </li>
    </ul>
    <timeline-modal
      ref="editModal"
      :unit-id="unitId"
      :seasons="seasonsItems"
      :input="activeInput"
    />
  </div>
</template>

<script>
import { orderBy } from 'lodash'
import { mapGetters } from 'vuex'
import TimelineModal from '@/components/modals/TimelineModal'

import {
  AllSeasonsQuery,
  UnitHeaderQuery,
  DeleteMilestoneMutation
} from '@/services/graphql'

export default {
  name: 'Timeline',

  components: {
    TimelineModal
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Number,
      default: 3
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
    }
  },

  data() {
    return {
      activeInput: {
        id: null,
        season: null,
        title: null,
        description: null
      },
      visibleAll: false
    }
  },

  computed: {
    ...mapGetters({
      activeUnitID: 'active/unitID'
    }),

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

    sortedItems() {
      return orderBy(this.items, 'season.name', 'desc')
    },
    isViewingOwnProfile() {
      return this.activeUnitID === this.unitId
    }
  },

  methods: {
    isVisible(index) {
      if (index >= this.visible && !this.visibleAll) {
        return 'hidden'
      } else {
        return ''
      }
    },
    onItemAddClick() {
      this.activeInput = {
        id: null,
        season: null,
        title: null,
        description: null
      }
      this.$refs.editModal.open()
    },
    onItemEditClick(item) {
      this.activeInput = {
        id: item.id || null,
        season: item.season ? item.season.id + '' : null,
        title: item.title ? item.title : null,
        description: item.description ? item.description : null
      }
      this.$refs.editModal.open()
    },

    refreshData() {
      this.$apollo.queries.unit.refetch()
    },

    async onItemDeleteClick(item) {
      if (confirm(this.$t('general.delete_confirmation'))) {
        await this.$apollo.mutate({
          ...DeleteMilestoneMutation,
          variables: {
            organizationUnitId: this.unitId,
            id: item ? item.id : null
          }
        })
        this.refreshData()
      }
    },
    showAll() {
      this.visibleAll = true
    },
    hideAll() {
      this.visibleAll = false
    }
  }
}
</script>

<style lang="postcss" scoped>
ul li {
  @apply .relative .pl-8 .pb-4;

  &::before {
    content: ' ';
    z-index: 2;
    @apply .bg-white .absolute .top-0 .left-0 .rounded-full .border-2 .border-green .h-4 .w-4 .mt-1;
  }

  &::after {
    content: ' ';
    left: 7px;
    @apply .absolute .top-0 .border-l-2 .border-green .h-full .w-px .mt-1;
  }
}
</style>
