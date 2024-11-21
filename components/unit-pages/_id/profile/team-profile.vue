<template>
  <section class="team__profile w-full">
    <team-profile-header :unit-id="this.$route.params.id" :season="activeSeason.name" />

    <transition name="fade-up-delayed" :appear="true">
      <navbar-tabs class="mt-12 nav-tabs">
        <lockable-navbar-tab-link
          :href="{ name: 'unit-id-profile-fans', params: {id: unitId} }"
          :locked="!accessFansAndReach"
        >
          {{ $t('app.navbar.fans') }}
        </lockable-navbar-tab-link>
        <lockable-navbar-tab-link
          :href="{ name: 'unit-id-profile-players', params: {id: unitId} }"
          :locked="!accessPlayers"
        >
          {{ $t('app.navbar.players') }}
        </lockable-navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-profile-stadium', params: {id: unitId} }">
          {{ $t('app.navbar.stadium') }}
        </navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-profile-finances', params: {id: unitId} }">
          {{ $t('app.navbar.partners') }}
        </navbar-tab-link>
        <lockable-navbar-tab-link
          :href="{ name: 'unit-id-profile-league', params: {id: unitId} }"
          :locked="!accessLeague"
        >
          {{ $t('app.navbar.league') }}
        </lockable-navbar-tab-link>
        <!-- <lockable-navbar-tab-link
          :href="{ name: 'unit-id-profile-sponsorship', params: {id: unitId} }"
          :locked="!accessSponsorship"
        >
          {{ $t('app.navbar.sponsorship') }}
        </lockable-navbar-tab-link> -->

        <!-- <v-menu bottom class="v-tabs__div" left>
          <template v-slot:activator="{ on }">
            <div class="flex flex-wrap ml-auto pr-8">
              <span class="text-grey text-p3 uppercase leading-none">{{ $t('general.season') }}</span>
              <div class="w-full">
                <a class="text-black font-medium text-h4" v-on="on">
                  {{ activeSeason.name }}
                  <span class="text-h6 ml-1 fas fa-caret-down text-red" />
                </a>
              </div>
            </div>
          </template>
          <v-list class="">
            <v-list-tile
              v-for="season in seasonsWithoutActive"
              :key="season.id"
              class="cursor-pointer hover:text-red"
              @click="changeActiveSeason(season)"
            >
              {{ season.name }}
            </v-list-tile>
          </v-list>
        </v-menu> -->
      </navbar-tabs>
    </transition>

    <nuxt-child
      :access-fans-and-reach="accessFansAndReach"
      :access-players="accessPlayers"
      :access-league="accessLeague"
      :access-sponsorship="accessSponsorship"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarTabs from '@/components/NavbarTabs'
import NavbarTabLink from '@/components/NavbarTabLink'
import LockableNavbarTabLink from '@/components/LockableNavbarTabLink'
import TeamProfileHeader from '@/components/widgets/TeamProfileHeader'
import { PageVisitedMutation, SeasonsQuery } from '@/services/graphql'
import unitPage from '@/services/mixins/unitPage'

export default {
  name: 'TeamProfile',

  components: {
    TeamProfileHeader,
    NavbarTabs,
    NavbarTabLink,
    LockableNavbarTabLink
  },

  mixins: [unitPage],

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    seasons: SeasonsQuery
  },

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    }),

    seasonsWithoutActive() {
      return (this.seasons || []).filter(s => s.name !== this.activeSeason.name)
    },

    accessFansAndReach() {
      return this.checkPermission('access-team-fans-reach')
    },

    accessPlayers() {
      return this.checkPermission('access-team-players')
    },

    accessLeague() {
      return this.checkPermission('access-team-league')
    },

    accessSponsorship() {
      return this.checkPermission('access-team-sponsorship')
    }
  },

  mounted() {
    this.recordProfileVisit()
  },

  methods: {
    async recordProfileVisit() {
      try {
        await this.$apollo.mutate({
          ...PageVisitedMutation,
          variables: {
            input: {
              page: 'PROFILE',
              actor_unit_id: this.unitId,
              target_unit_id: this.unitId
            }
          }
        })
      } catch (err) {
        //
      }
    },

    changeActiveSeason(season) {
      this.$store.dispatch('active/setSeason', season)
    }
  }
}
</script>

<style lang="postcss" scoped>
.team__profile .nav-tabs {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  @apply .relative;
}

@media (max-width: 768px) {
  .team__profile .nav-tabs {
    @apply pr-8;
    width: auto;
    margin-left: calc(100% - calc(100% - 30px));
  }
}

@media (max-width: 576px) {
  .team__profile .nav-tabs {
    @apply pr-6;
    width: auto;
    margin-left: calc(100% - calc(100% - 20px));
  }
}
</style>
