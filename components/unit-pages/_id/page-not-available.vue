<template>
  <section class="brand__dashboard py-12 px-6 sm:px-12">
    <h3 class="pb-6">
      {{ $t('app.brand.pageNotAvailable.title') }}
    </h3>
    <div class="w-full flex flex-wrap pb-12">
      <div class="w-full bg-white shadow-xl px-4 pt-8 pb-4">
        <p class="mb-4">
          {{ $t('app.brand.pageNotAvailable.text') }}
        </p>

        <app-button
          class="ml-auto"
          :btn-class="'primary'"
          :title="$t('app.brand.pageNotAvailable.button')"
          @clicked="onButtonClick()"
        />
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  layout: 'brand',

  name: 'PageNotAvailable',

  components: { AppButton },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  methods: {
    onButtonClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-settings-subscriptions',
          params: {
            id: this.unitId
          }
        })
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.brand__dashboard {
  @apply .w-full .overflow-hidden;
}
</style>
