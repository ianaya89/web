<template>
  <div class="w-full relative">
    <transition name="fade-up" :appear="true">
      <sortable-table
        v-slot:default="props"
        class="mt-12 overflow-x-auto"
        :headers="headers"
        :rows-per-page="10"
        :data="players"
      >
        <td class="font-semibold flex items-center">
          <img
            :src="require('../../../assets/images/team/players/player.png')"
            alt="player image"
            class=""
          >
        </td>
        <td class="text-right">
          <img
            :src="require('../../../assets/images/team/players/facebook.png')"
            alt="facebook followers image"
            class="float-right"
          >
        </td>
        <td class="text-right">
          <img
            :src="require('../../../assets/images/team/players/instagram.png')"
            alt="instagram followers image"
            class="float-right"
          >
        </td>
        <td class="text-right">
          <img
            :src="require('../../../assets/images/team/players/twitter.png')"
            alt="twitter followers image"
            class="float-right"
          >
        </td>
        <td class="text-right">
          <img
            :src="require('../../../assets/images/team/players/youtube.png')"
            alt="youtube followers image"
            class="float-right"
          >
        </td>
        <td class="text-right font-semibold">
          <img
            :src="require('../../../assets/images/team/players/total.png')"
            alt="total followers image"
            class="float-right"
          >
        </td>
      </sortable-table>
    </transition>
  </div>
</template>

<script>
// import { sum } from 'lodash'
import { mapGetters } from 'vuex'
// import { UnitPlayersQuery } from '@/services/graphql/index'
import SortableTable from '@/components/SortableTable'

export default {
  name: 'PlayersSplitLanding',

  components: {
    SortableTable
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Squad:',
        align: 'left',
        value: 'player.name',
        sortable: false,
        width: '50%'
      },
      {
        text: 'Facebook',
        value: 'social.facebook',
        align: 'right'
      },
      {
        text: 'Instagram',
        value: 'social.instagram',
        align: 'right'
      },
      {
        text: 'Twitter',
        value: 'social.twitter',
        align: 'right'
      },
      {
        text: 'YouTube',
        value: 'social.youtube',
        align: 'right'
      },
      {
        text: 'Total',
        value: 'social.total',
        align: 'right'
      }
    ]
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    }),

    players() {
      const playersArr = []
      for (let i = 1; i <= 10; i++) {
        playersArr.push({
          id: i,
          player: {
            name: 'Player ' + i,
            groupedSocialAccounts: Array(4).fill({
              type: 'test',
              followersCount: 1
            }),
            id: i,
            logo: {
              url: 'logo'
            }
          },
          social: {
            total: 1
          }
        })
      }
      return playersArr
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
