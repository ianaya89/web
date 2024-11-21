<template>
  <section class="team__settings w-full pb-12">
    <profile-header-partial>
      <template v-slot:image>
        <transition mode="out-in" name="fade">
          <div :key="$apollo.loading && $get(unit, 'entity.titlePhotos.0', null)===null" class="w-full h-80 sm:h-auto sm:min-h-128 overflow-hidden">
            <img
              v-if="$apollo.loading && $get(unit, 'entity.titlePhotos.0', null)===null"
              class="hero-bg sm:w-full h-80 sm:h-auto sm:min-h-128"
              :src="require('../../../../assets/images/profile-image-fallback.jpg')"
              alt="Image"
            >
            <div class="w-full">
              <img
                class="hero-bg sm:w-full h-80 sm:h-auto sm:min-h-128"
                :src="$get(unit, 'entity.titlePhotos.0.url', undefined)"
                alt="Image"
              >
            </div>
          </div>
        </transition>
      </template>

      <h2 class="pb-8">
        {{ $t('app.team.settings.title') }}
      </h2>

      <navbar-tabs data-cy="settings-tabs">
        <navbar-tab-link :href="{ name: 'unit-id-settings-profile', params: {id:unitId} }">
          {{ $t('app.team.settings.navbar.profile') }}
        </navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-settings-password', params: {id:unitId} }">
          {{ $t('app.team.settings.navbar.password') }}
        </navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-settings-social-profiles', params: {id:unitId} }">
          {{ $t('app.team.settings.navbar.social') }}
        </navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-settings-notifications', params: {id:unitId} }">
          {{ $t('app.team.settings.navbar.notifications') }}
        </navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-settings-subscriptions', params: {id:unitId} }">
          {{ $t('app.team.settings.navbar.subscriptions') }}
        </navbar-tab-link>
        <!-- <navbar-tab-link :href="{ name: 'unit-id-settings-payments', params: {id:unitId} }">
          {{ $t('app.team.settings.navbar.payments') }}
        </navbar-tab-link> -->
      </navbar-tabs>

      <nuxt-child />
    </profile-header-partial>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarTabs from '@/components/NavbarTabs'
import NavbarTabLink from '@/components/NavbarTabLink'
import ProfileHeaderPartial from '@/components/partials/ProfileHeaderPartial'
import { metaTitles } from '@/services/seo'
import { UnitHeaderQuery } from '@/services/graphql'

export default {
  name: 'Settings',

  components: {
    NavbarTabs,
    NavbarTabLink,
    ProfileHeaderPartial
  },

  apollo: {
    unit: {
      ...UnitHeaderQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      }
    }
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      activeSeason: 'active/getCurrentSeason'
    })
  },

  head() {
    const title = `${this.$t('general.settings')} - ${this.$t(
      'general.platform'
    )}`
    return {
      title: title,
      meta: [...metaTitles(title)]
    }
  }
}
</script>

<style lang="postcss">
img.hero-bg {
  max-width: none;
}
</style>
