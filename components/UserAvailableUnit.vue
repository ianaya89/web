<template>
  <div class="cursor-pointer border-b border-grey-l4 px-6 py-2 hover:bg-grey-l4 relative" @click="switchAccount">
    <div v-if="switchingAccount" class="absolute inset-0 flex z-10 loader-bg">
      <logo-loader class="h-6 w-6 m-auto" />
    </div>
    <div v-if="unit" class="w-full flex">
      <div class="w-1/5 flex">
        <avatar
          class="my-auto"
          :src="unit.entity.logo.url"
          classes="h-12 w-12"
        />
      </div>
      <div class="w-4/5 pl-2">
        <p class="font-sans font-medium leading-tight text-p2 pt-2 leading-tight">
          {{ unit.entity.name }}
        </p>
        <p class="text-grey text-p3">
          {{ unit.organization.name }}
        </p>
      </div>
    </div>
    <content-placeholders v-else>
      <content-placeholders-heading :img="true" />
    </content-placeholders>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import LogoLoader from '@/components/LogoLoader'
import { persist } from '@/services/helpers'

export default {
  components: {
    Avatar,
    LogoLoader
  },

  props: {
    unit: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    switchingAccount: false
  }),

  methods: {
    switchAccount() {
      this.switchingAccount = true

      setTimeout(() => {
        const route = this.localePath({
          name: 'unit-id-dashboard',
          params: { id: this.unit.id }
        })

        this.$store.dispatch('compare/clear')
        this.$store.dispatch('proposal/clear')
        this.$store.dispatch('active/setUnitType', null)
        this.$store.dispatch('active/setUnitPermissions', [])
        this.$store.dispatch('active/setUnitActiveSubscription', null)
        this.$store.getters['dropdown/getActiveDropdown'].closeFnc()

        persist('lastAuthorizedUnitRoute', route)
        this.$router.push(route)
      }, 0) // has to be done this way, because loader doesnt show up
    }
  }
}
</script>

<style lang="postcss">
.loader-bg {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
