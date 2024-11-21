<template>
  <section class="team__settings__social">
    <div class="w-full flex mt-12 -mx-4">
      <div class="w-full sm:w-1/2 px-4 mb-4">
        <h6 class="uppercase">
          {{ $t('app.team.settings.social.title') }}
        </h6>
      </div>
    </div>
    <div class="w-full flex flex-wrap -mx-4">
      <div v-if="!$apollo.queries.unit.loading" class="w-full px-4">
        <social-account-toggle v-for="account in accounts" :key="account.id" :account="account" />
      </div>

      <div v-else class="w-1/2 px-4">
        <content-placeholders>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </div>
  </section>
</template>

<script>
import { sortBy } from 'lodash'
import SocialAccountToggle from '@/components/social/SocialAccountToggle'
import { SocialAccountsQuery } from '@/services/graphql'

export default {
  name: 'SocialProfiles',

  components: {
    SocialAccountToggle
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...SocialAccountsQuery,
      fetchPolicy: 'network-only',
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  computed: {
    accounts() {
      return sortBy(
        this.$get(this.unit, 'entity.socialAccounts', []).filter(a => {
          return ['facebook', 'twitter', 'instagram'].includes(a.type)
        }),
        a => a.type
      )
    }
  },

  mounted() {
    if (this.$route.query.error) {
      this.$toast.error(this.$route.query.error)
    }
  }
}
</script>

<style lang="postcss">
</style>
