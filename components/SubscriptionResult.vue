<template>
  <div class="w-full">
    <h3 v-if="result === 'success'" class="subscription-result-title subscription-result-success">
      <i class="fa fa-check-circle" />
      {{ $t('app.subscription_result.success') }}
    </h3>

    <h3 v-else-if="result === 'cancel'" class="subscription-result-title subscription-result-cancel">
      <i class="fa fa-times-circle" />
      {{ $t('app.subscription_result.cancel') }}
    </h3>

    <app-button
      class="mt-8"
      :title="$t('app.subscription_result.return_to_subscriptions')"
      @clicked="onReturnButtonClick"
    />
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'SubscriptionResult',

  components: {
    AppButton
  },

  props: {
    result: {
      type: String,
      required: true
    },

    unitId: {
      type: String,
      required: true
    }
  },

  methods: {
    onReturnButtonClick() {
      this.$router.push(
        this.localePath({
          name: 'unit-id-settings-subscriptions',
          params: {
            id: this.$route.params.id
          }
        })
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.subscription-result-success {
  @apply .text-green;
}

.subscription-result-cancel {
  @apply .text-red;
}
</style>
