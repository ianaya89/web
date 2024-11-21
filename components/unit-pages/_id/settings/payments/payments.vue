<template>
  <section class="team__settings__payments">
    <div class="w-full flex flex-wrap mt-12 -mx-0 sm:-mx-4">
      <div class="w-full sm:w-1/3 px-0 sm:px-4 mb-4">
        <h6 class="uppercase font-medium mb-10">
          {{ $t('app.team.settings.payments.info') }}
        </h6>
        <div class="w-full">
          <app-input v-model="team.billings.name" :label="$t('app.team.settings.payments.name')" />
        </div>
        <div class="w-full">
          <app-input v-model="team.billings.address" :label="$t('app.team.settings.payments.address')" />
        </div>
        <div class="w-full">
          <app-input v-model="team.billings.city" :label="$t('app.team.settings.payments.city')" />
        </div>
        <div class="w-full">
          <app-input v-model="team.billings.tax_id" :label="$t('app.team.settings.payments.tax_id')" />
        </div>
        <div class="w-full">
          <app-input v-model="team.billings.vat_id" :label="$t('app.team.settings.payments.vat_id')" />
        </div>
        <div class="w-full">
          <app-input v-model="team.billings.iban" :label="$t('app.team.settings.payments.iban')" />
        </div>
        <div class="w-full mt-6">
          <app-button
            ref="saveButton"
            :title="$t('general.save')"
            :loader="true"
            :loading-text="$t('general.updating')"
            :should-disable="true"
            class="w-full sm:w-auto"
            @clicked="save"
          />
        </div>
      </div>
      <div class="w-full sm:w-2/3 px-0 sm:px-4 mt-12 sm:mt-0">
        <h6 class="uppercase font-medium mb-5">
          {{ $t('app.team.settings.payments.history') }}
        </h6>
        <div class="w-full overflow-auto">
          <table class="mt-4" style="min-width: 32rem;">
            <tbody>
              <tr v-for="payment in team.payments" :key="payment.id" class="border-b border-grey-l2 font-medium">
                <td class="py-3">
                  <span class="fab fa-cc-mastercard" />
                  <span class="ml-2">
                    {{ payment.name }}
                  </span>
                </td>
                <td>{{ payment.created_at | dateTime }}</td>
                <td>{{ payment.invoice.sum * 100 | currency }}</td>
                <td>
                  <a href="#" target="_blank" rel="noopener" class="hover:underline uppercase">{{ invoiceName(payment.invoice) }}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import { PaymentsQuery } from '@/services/graphql'

export default {
  name: 'Payments',

  components: {
    AppButton,
    AppInput
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    team: PaymentsQuery
  },

  data: () => ({
    team: PaymentsQuery.mock
  }),

  methods: {
    save() {
      // todo:: call POST update endpoint
      setTimeout(() => {
        this.$refs.saveButton.loaded()
      }, 2000)
    },

    invoiceName(invoice) {
      if (invoice.proforma) {
        return this.$t('app.team.settings.payments.proforma_invoice')
      } else {
        return this.$t('app.team.settings.payments.invoice')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
