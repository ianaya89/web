<template>
  <div class="w-full lg:w-1/2 pl-0 lg:pl-6 mt-10 lg:mt-0">
    <h6 class="float-right">
      {{ max | number }}

      <a v-if="isTeam()" class="ml-4" @click="onFansEditClick">
        <i class="fa fa-edit" /> {{ $t('general.edit') }}
      </a>
    </h6>
    <h6>
      {{ $t('app.profile.team.fans.fans_last_season') }}
      <fans-overview-edit-modal
        ref="editModal"
        :season-id="activeSeason.id"
        :unit-id="unitId"
        :input="input"
      />
    </h6>
    <div class="pt-4">
      <column-chart :height="300" :series="fansSeries" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UnitFansOverviewQuery } from '@/services/graphql'
import ColumnChart from '@/components/charts/ColumnChart'
import FansOverviewEditModal from '@/components/modals/FansOverviewEditModal'
import unitPage from '@/services/mixins/unitPage'

export default {
  components: {
    FansOverviewEditModal,
    ColumnChart
  },

  mixins: [unitPage],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitFansOverviewQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      },
      result({ data }) {
        this.input.seasonTicket = this.$get(
          data,
          'unit.entity.precalcs.0.data.fans.seasonTicket'
        )
        this.input.members = this.$get(
          data,
          'unit.entity.precalcs.0.data.fans.members'
        )
        this.input.newsletter = this.$get(
          data,
          'unit.entity.precalcs.0.data.fans.newsletter'
        )
        this.input.crm = this.$get(data, 'unit.entity.precalcs.0.data.fans.crm')
        this.input.mobileApp = this.$get(
          data,
          'unit.entity.precalcs.0.data.fans.mobileApp'
        )
      }
    }
  },

  data: () => ({
    columns: ['seasonTicket', 'members', 'newsletter', 'crm', 'mobileApp'],
    input: {
      seasonTicket: null,
      members: null,
      newsletter: null,
      crm: null,
      mobileApp: null
    }
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    fansSeries() {
      return {
        name: 'Fans - last season',
        data: this.columns.map(name => ({
          name: this.$t(`app.profile.team.fans.${name}Count`),
          y: this.$get(this.unit, `entity.precalcs.0.data.fans.${name}`, 0)
        }))
      }
    },

    max() {
      const value = Math.max(...this.fansSeries.data.map(d => d.y))

      return value === 0 ? null : value
    }
  },

  methods: {
    onFansEditClick() {
      this.$refs.editModal.open()
    },

    refreshData() {
      this.$apollo.queries.unit.refetch()
    }
  }
}
</script>
