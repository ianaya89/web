<template>
  <nuxt-link :to="localePath({name: 'unit-id-settings-subscriptions', params: {id: unitId}})" class="text-black">
    <i class="fa fa-lock" /> {{ $t('app.brand.notAvailable') }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'NotAvailableLink',

  props: {
    unitId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss">
</style>
