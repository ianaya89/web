<template>
  <div class="flex items-center">
    <switcher :value="isActivated" :disabled="isActivated" label="" @input="activate" />
    <avatar
      :src="this.$get(account, 'profilePicture.url', undefined)"
      :rounded="false"
      :icon-sign="$helpers.socialMediaIcon(account.type)"
      classes="h-12 w-12 mr-4"
    />
    <span class="font-serif text-grey">
      {{ account.name || account.url }}
    </span>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Switcher from '@/components/Switcher'

export default {
  name: 'SocialAccountToggle',

  components: {
    Avatar,
    Switcher
  },

  props: {
    account: {
      type: Object,
      required: true
    }
  },

  computed: {
    isActivated() {
      return (
        ['youtube', 'instagram'].includes(this.account.type) ||
        this.account.isAuthorized
      )
    }
  },

  methods: {
    activate(val) {
      if (val) {
        window.location.replace(
          `${process.env.VUE_APP_BACKEND_URL}/auth/${
            this.account.type
          }?unit_id=${this.$route.params.id}&account_id=${this.account.id}`
        )
      }
    }
  }
}
</script>
