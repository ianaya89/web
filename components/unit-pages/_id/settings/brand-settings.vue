<template>
  <section class="brand__settings w-full pb-12">
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
        {{ $t('app.brand.settings.title') }}
      </h2>

      <navbar-tabs data-cy="settings-tabs">
        <navbar-tab-link :href="{ name: 'unit-id-settings-profile', params: {id:unitId} }">
          {{ $t('app.brand.settings.navbar.profile') }}
        </navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-settings-password', params: {id:unitId} }">
          {{ $t('app.brand.settings.navbar.password') }}
        </navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-settings-notifications', params: {id:unitId} }">
          {{ $t('app.brand.settings.navbar.notifications') }}
        </navbar-tab-link>
        <navbar-tab-link :href="{ name: 'unit-id-settings-subscriptions', params: {id:unitId} }">
          {{ $t('app.brand.settings.navbar.subscriptions') }}
        </navbar-tab-link>
      </navbar-tabs>

      <nuxt-child />
    </profile-header-partial>
  </section>
</template>

<script>
import NavbarTabs from '@/components/NavbarTabs'
import NavbarTabLink from '@/components/NavbarTabLink'
import ProfileHeaderPartial from '@/components/partials/ProfileHeaderPartial'
import { metaTitles } from '@/services/seo'
import { BrandHeaderQuery } from '@/services/graphql'

export default {
  layout: 'brand',

  name: 'ProfileSettingIndex',

  components: {
    NavbarTabs,
    NavbarTabLink,
    ProfileHeaderPartial
  },

  apollo: {
    unit: {
      ...BrandHeaderQuery,
      variables() {
        return {
          id: this.unitId
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
