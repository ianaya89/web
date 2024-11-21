<template>
  <section class="team__settings__notifications">
    <div class="w-full flex flex-wrap mt-12 -mx-4">
      <div class="w-full sm:w-1/2 px-4">
        <div class="mb-4">
          <h6 class="uppercase">
            {{ $t('app.team.settings.notifications.system') }}
          </h6>
        </div>
        <div class="mb-6 sm:mb-0">
          <switcher
            :value="isEnabled('notifications_new_offers')"
            :label="$t('app.team.settings.notifications.new_offers')"
            :disabled="$apollo.loading"
            data-cy="new-offers"
            @input="save($event, 'notifications_new_offers')"
          />
          <switcher
            :value="isEnabled('notifications_weekly_review')"
            :label="$t('app.team.settings.notifications.weekly_review')"
            :disabled="$apollo.loading"
            data-cy="weekly-review"
            @input="save($event, 'notifications_weekly_review')"
          />
        </div>
      </div>
      <div class="w-full sm:w-1/2 px-4">
        <div class="mb-4">
          <h6 class="uppercase">
            {{ $t('app.team.settings.notifications.marketing') }}
          </h6>
        </div>
        <switcher
          :value="isEnabled('notifications_monthly_newsletter')"
          :label="$t('app.team.settings.notifications.monthly_newsletter')"
          :disabled="$apollo.loading"
          data-cy="monthly-newsletter"
          @input="save($event, 'notifications_monthly_newsletter')"
        />
        <switcher
          :value="isEnabled('notifications_weekly_suggestions')"
          :label="$t('app.team.settings.notifications.weekly_suggestions')"
          :disabled="$apollo.loading"
          data-cy="weekly-suggestions"
          @input="save($event, 'notifications_weekly_suggestions')"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Switcher from '@/components/Switcher'
import { MeQuery, UserNotificationsUpdateMutation } from '@/services/graphql'
import { objectKeysToUnderscore } from '@/services/helpers'

export default {
  name: 'Notifications',

  components: {
    Switcher
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    me: {
      ...MeQuery
    }
  },

  data: () => ({
    me: MeQuery.mock
  }),

  computed: {
    isEnabled() {
      return key =>
        this.me.settings.find(setting => setting.key === key) &&
        this.me.settings.find(setting => setting.key === key).isEnabled
    }
  },

  methods: {
    async save(value, key) {
      if (value) {
        const settingsIndex = this.me.settings.findIndex(
          setting => setting.key === key
        )
        if (settingsIndex === -1) {
          this.me.settings.push({ key: key, value: '', isEnabled: true })
        } else {
          this.me.settings[settingsIndex].isEnabled = true
        }
      } else {
        const settingsIndex = this.me.settings.findIndex(
          setting => setting.key === key
        )
        this.me.settings[settingsIndex].isEnabled = false
      }
      try {
        this.updating = true
        await this.$apollo
          .mutate({
            ...UserNotificationsUpdateMutation,
            variables: {
              id: this.me.id,
              input: {
                settings: {
                  create: this.me.settings.map(setting => {
                    const object = objectKeysToUnderscore(setting)
                    delete object.typename
                    delete object.__typename
                    return object
                  })
                }
              }
            },
            refetchQueries: [MeQuery]
          })
          .then(() => {
            this.$toast.success(
              this.$t('app.brand.settings.notifications.messages.success')
            )
            this.updating = false
          })
      } catch (err) {
        this.$toast.error(
          this.$t('app.brand.settings.notifications.messages.error')
        )
        this.updating = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
