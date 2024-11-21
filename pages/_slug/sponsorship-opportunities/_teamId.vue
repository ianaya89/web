<template>
  <v-app>
    <section class="team__profile w-full flex pt-24">
      <div class="landing-sidebar-column hidden xl:flex bg-white" />
      <div class="w-full">
        <team-profile-landing-header
          :unit-id="this.$route.params.teamId"
          :season="activeSeason.name"
          :team-photo="getTeamPhoto"
          :logo-url="getLogoUrl"
          :team-name="getTeamName"
          :country-name="getCountryName"
          :city-name="getCityName"
          :stadium-name="getStadiumName"
          :founded="getFounded"
          :league-name="getLeagueName"
          :stadium-capacity="getStadiumCapacity"
          :average-attendance="getAverageAttendance"
          :club-revenue="getClubRevenue"
        />

        <transition name="fade-up-delayed" :appear="true">
          <navbar-tabs class="mt-12 nav-tabs">
            <navbar-tab-link :href="{ path: 'fans', params: {teamId: this.$route.params.teamId, slug: getTeamSlug } }">
              {{ $t('app.navbar.fans') }}
            </navbar-tab-link>
            <navbar-tab-link :href="{ path: 'players', params: {teamId: this.$route.params.teamId, slug: getTeamSlug} }">
              {{ $t('app.navbar.players') }}
            </navbar-tab-link>
            <navbar-tab-link :href="{ path: 'stadium', params: {teamId: this.$route.params.teamId, slug: getTeamSlug} }">
              {{ $t('app.navbar.stadium') }}
            </navbar-tab-link>
            <navbar-tab-link :href="{ path: 'finances', params: {teamId: this.$route.params.teamId, slug: getTeamSlug} }">
              {{ $t('app.navbar.partners') }}
            </navbar-tab-link>
            <navbar-tab-link :href="{ path: 'league', params: {teamId: this.$route.params.teamId, slug: getTeamSlug} }">
              {{ $t('app.navbar.league') }}
            </navbar-tab-link>
          </navbar-tabs>
        </transition>

        <div v-if="$apollo.queries.PublicSingleTeam.loading" class="team-preview-page">
          <content-placeholders class="w-full w-full pt-8">
            <content-placeholders-text :lines="6" />
          </content-placeholders>
        </div>
        <nuxt-child
          v-else
          :unit-id="$get(PublicSingleTeam, 'unitid', 0)"
          :country-split="getCountrySplit"
          :country="getCountryName"
          :league-name="getLeagueName"
          :league-logo="getLeagueLogoUrl"
          :league-id="getLeagueId"
          :city="getCity"
          :skyboxes="getSkyboxes"
          :business-seats="getBusinessSeats"
          :stadium-capacity="getStadiumCapacity"
          :stadium-meta="getStadiumMeta"
          :stadium-address="getStadiumAddress"
          :stadium-name="getStadiumName"
          :stadium-photo="getStadiumPhoto"
          :stadium-lat="getStadiumLat"
          :stadium-lng="getStadiumLng"
          :brand-partners="getBrandPartners"
          :is-authenticated="isAuthenticated"
        />
      </div>
      <div>
        <transition name="fade-up-delayed" :appear="true">
          <app-button v-if="scrolled" class="registration-sticky-button text-left" :max-width-md="true" @clicked="redirectToTeamSignup">
            {{ $t('landing.teams.title_signup_fixed') }} <span class="underline">{{ $t('landing.teams.title_signup_cta_fixed') }}</span> {{ $t('landing.teams.title_signup_2_fixed') }}
          </app-button>
        </transition>
      </div>
    </section>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '@/components/AppButton'
import NavbarTabs from '@/components/NavbarTabs'
import NavbarTabLink from '@/components/NavbarTabLink'
import TeamProfileLandingHeader from '@/components/widgets/TeamProfileLandingHeader'
import { MeQuery, SeasonsQuery, PublicSingleTeam } from '@/services/graphql'
import unitPage from '@/services/mixins/unitPage'
import { persist, buildTeamSlug } from '@/services/helpers'

export default {
  layout: 'landing',

  name: 'LandingTeam',

  components: {
    AppButton,
    TeamProfileLandingHeader,
    NavbarTabs,
    NavbarTabLink
  },

  mixins: [unitPage],

  props: {},

  data: () => ({
    scrolled: false,
    unitId: null
  }),

  apollo: {
    me: {
      ...MeQuery,
      result({ data }) {
        if (this.lastAuthorizedUnitRoute) {
          return this.$router.push(this.lastAuthorizedUnitRoute)
        }
        return this.resolveFallbackRedirectRoute(data)
      }
    },
    seasons: SeasonsQuery,
    PublicSingleTeam: {
      ...PublicSingleTeam,
      variables() {
        return {
          id: this.$route.params.teamId
          // season: this.activeSeason.name
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    }),

    seasonsWithoutActive() {
      return (this.seasons || []).filter(s => s.name !== this.activeSeason.name)
    },
    getTeamPhoto() {
      return this.$get(
        this.PublicSingleTeam,
        'titlePhotos.0.url',
        require('../../../assets/images/profile-image-fallback.jpg')
      )
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    getLogoUrl() {
      return this.$get(this.PublicSingleTeam, 'logoUrl', undefined)
    },
    getTeamName() {
      return this.$get(this.PublicSingleTeam, 'teamName', '-')
    },
    getCountryName() {
      return this.$get(this.PublicSingleTeam, 'countryName', '-')
    },
    getCityName() {
      return this.$get(this.PublicSingleTeam, 'cityName', '-')
    },
    getStadiumName() {
      return this.$get(this.PublicSingleTeam, 'stadiumName', '-')
    },
    getFounded() {
      return this.$get(this.PublicSingleTeam, 'founded', '-')
    },
    getLeagueId() {
      return this.$get(this.PublicSingleTeam, 'league.id', null)
    },
    getLeagueLogoUrl() {
      return this.$get(this.PublicSingleTeam, 'league.logo.url', undefined)
    },
    getLeagueName() {
      return this.$get(this.PublicSingleTeam, 'league.name', '-')
    },
    getStadiumCapacity() {
      return this.$get(this.PublicSingleTeam, 'stadiumCapacity', null)
    },
    getAverageAttendance() {
      return this.$get(this.PublicSingleTeam, 'averageAttendance', 0)
    },
    getClubRevenue() {
      return this.$get(this.PublicSingleTeam, 'clubRevenue', null)
    },
    getCountrySplit() {
      return this.$get(this.PublicSingleTeam, 'countrySplit', [])
    },
    getCity() {
      return this.$get(this.PublicSingleTeam, 'city', null)
    },
    getSkyboxes() {
      return this.$get(this.PublicSingleTeam, 'skyboxes', null)
    },
    getBusinessSeats() {
      return this.$get(this.PublicSingleTeam, 'businessSeats', null)
    },
    getStadiumMeta() {
      return this.$get(this.PublicSingleTeam, 'teamStadium.metaData', null)
    },
    getStadiumAddress() {
      return this.$get(this.PublicSingleTeam, 'stadiumAddress', '-')
    },
    getStadiumLat() {
      return this.$get(this.PublicSingleTeam, 'stadiumLat', 0)
    },
    getStadiumLng() {
      return this.$get(this.PublicSingleTeam, 'stadiumLng', 0)
    },
    getStadiumPhoto() {
      return this.$get(this.PublicSingleTeam, 'stadiumPhoto', '')
    },
    getBrandPartners() {
      return this.$get(this.PublicSingleTeam, 'brandPartners', [])
    },
    getTeamSlug() {
      return buildTeamSlug(this.getTeamName)
    }
  },

  beforeMount() {
    window.addEventListener('scroll', this.pageScrolled)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.pageScrolled)
  },

  mounted() {
    this.unitId = this.$route.query.id
    this.$store.dispatch('public-menu/setPermanentMenu', true)
  },

  methods: {
    changeActiveSeason(season) {
      this.$store.dispatch('active/setSeason', season)
    },

    redirectToTeamSignup() {
      return this.$router.push(this.localePath({ name: 'register-team' }))
    },

    pageScrolled(event) {
      const top = window.pageYOffset || document.documentElement.scrollTop
      this.scrolled = top > 50
    },

    resolveFallbackRedirectRoute(data) {
      this.entityId = this.$get(data, 'me.units.0.id')
      let route = this.localePath({
        name: ''
      })
      route = this.localePath({
        name: 'unit-id-dashboard',
        params: { id: this.entityId }
      })
      persist('lastAuthorizedUnitRoute', route)
    }
  }
}
</script>

<style lang="postcss" scoped>
.team-preview-page {
  @apply .pt-10 .pb-32;
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  padding-right: calc(100% - calc(100% - 100px));
}
.landing-sidebar-column {
  border-right-width: 1px;
  --border-opacity: 1;
  border-color: #d4d4d4;
  border-color: rgba(212, 212, 212, var(--border-opacity));
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex-wrap: wrap;
  flex-shrink: 0;
  width: 12.5rem;
}
.team__profile .nav-tabs {
  width: calc(100% - 100px);
  margin-left: calc(100% - calc(100% - 100px));
  @apply .relative;
}

.registration-sticky-button {
  position: fixed;
  bottom: 20px;
  right: 100px;
  z-index: 100;
}

@media all and (max-width: 700px) {
  .registration-sticky-button {
    left: 20px;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    span {
      font-size: 13px;
    }
  }
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
