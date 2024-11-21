
<template>
  <div class="container">
    <h2>Inputs</h2>

    <div class="max-w-sm">
      <app-input />

      <!-- Under is example of form field with button right -->
      <div class="flex">
        <app-input v-model="inputModel" :outline="true" class="mt-4" />

        <app-button
          ref="inputBtn"
          title="Check value"
          btn-class="primary"
          style="height: 3.5rem"
          @clicked="checkValueOfData('inputModel')"
        />
      </div>

      <app-input :rules="[v => !!v || 'Item is required']" :required="true" />
      <app-input
        :rules="[v => !!v || 'Item is required']"
        :required="true"
        label="Email"
        type="email"
      />
      <app-input
        :password-switch="true"
        appended-icon="lni-eye"
        appended-icon2="lni-cross-circle"
        label="Password"
        type="password"
      />
      <app-input :readonly="true" label="Read-only" />
      <app-input
        :sticky-label="true"
        :rules="[v => !!v || 'Item is required']"
        :required="true"
        label="Looong Label"
        class="w-1/5"
      />
      <app-input :sticky-label="true" :persistent-hint="true" :counter="30" hint="That's a hint" />
      <app-input :sticky-label="true" placeholder="My placeholder" />
      <app-input
        :outline="true"
        :rules="[v => !!v || 'Item is required']"
        :required="true"
        label="Outlined"
      />
      <app-input :counter="30" />
      <app-input :disabled="true" label="Disabled" />
      <!-- we can create an example with tooltip -->

      <div class="flex">
        <multiselect v-model="multiselectModel" :items="multiselectItems" label="Countries" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import Multiselect from '@/components/Multiselect'

export default {
  components: {
    AppInput,
    AppButton,
    Multiselect
  },

  data: () => ({
    inputModel: 'hua',

    multiselectModel: ['Alaska', 'Colorado'],

    multiselectItems: [
      'Alabama',
      'Alaska',
      'American Samoa',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Maryland',
      'Wyoming'
    ]
  }),

  methods: {
    checkValueOfData(dataName) {
      alert(this[dataName])
    }
  }
}
</script>

<style lang="postcss">
</style>
