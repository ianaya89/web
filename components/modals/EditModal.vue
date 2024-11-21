<template>
  <modal ref="modal">
    <template v-slot:header>
      <div class="border-b border-grey-l4 pb-2">
        {{ getHeaderText }}
      </div>
      <span class="absolute top-8 right-8 lni-close text-red hover:text-red-d1 cursor-pointer" @click="$refs.modal.close()" />
    </template>
    <template v-slot:body>
      <div class="border-b border-grey-l4 pb-6">
        <v-form
          ref="editForm"
          v-model="formValid"
          class="w-full"
        >
          <div v-for="(input, index) in $get(structure,'inputs',[])" :key="index" class="w-full">
            <app-input
              v-if="input.type==='text'"
              v-model="formInputModels[input.key]"
              :required="input.required"
              :outline="true"
              :label="null"
              :rules="[v => (!!v || !input.required) || $t('app.edit_modal.form.validation.required')]"
              :solo-label="$get(input,'label', $t('app.edit_modal.form.field'))"
            />

            <app-input
              v-if="input.type==='number'"
              v-model="formInputModels[input.key]"
              :required="input.required"
              :type="'number'"
              :outline="true"
              :label="null"
              :rules="[v => (!!v || !input.required) || $t('app.edit_modal.form.validation.required')]"
              :solo-label="$get(input,'label', $t('app.edit_modal.form.field'))"
            />

            <text-area
              v-if="input.type==='textarea'"
              v-model="formInputModels[input.key]"
              :required="input.required"
              :outline="true"
              :label="null"
              :rules="[v => (!!v || !input.required) || $t('app.edit_modal.form.validation.required')]"
              :solo-label="$get(input,'label', $t('app.edit_modal.form.field'))"
            />

            <app-select
              v-if="input.type==='select'"
              v-model="formInputModels[input.key]"
              :single-line="true"
              :items="input.options"
              :solo-label="$get(input,'label', $t('app.edit_modal.form.field'))"
              :rules="[v => (!!v || !input.required) || $t('app.marketplace.show_item.form.slots.validation.required')]"
            />
          </div>
        </v-form>
      </div>
    </template>
    <template v-slot:footer>
      <div class="mt-8">
        <app-button ref="submitBtn" :title="getConfirmBtnText" :loader="true" @clicked="formSubmit" />
        <app-button :btn-class="'light'" :show-arrow="true" :title="$t('general.cancel')" @clicked="$refs.modal.close()" />
      </div>
    </template>
  </modal>
</template>

<script>
import { cloneDeep, set } from 'lodash'
import Modal from '@/components/Modal'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import TextArea from '@/components/TextArea'
import { ActiveUnitQuery } from '@/services/graphql'
import AppSelect from '@/components/AppSelect'

export default {
  name: 'EditModal',

  components: {
    Modal,
    AppButton,
    AppInput,
    TextArea,
    AppSelect
  },

  props: {
    headerText: {
      type: String,
      default: null
    },

    submitBtnText: {
      type: String,
      default: null
    },

    structure: {
      type: Object,
      default: null
    },

    mutationInputStructure: {
      type: Object,
      default: null
    },

    mutation: {
      type: Object,
      default: null
    }
  },

  apollo: {
    unit: {
      ...ActiveUnitQuery(function() {
        return { id: this.activeUnitID }
      }),
      skip() {
        return this.activeUnitID == null
      }
    }
  },

  data: () => ({
    formInputModels: {},
    formValid: false
  }),

  computed: {
    activeUnitID() {
      return this.$store.getters['active/unitID']
    },

    getConfirmBtnText() {
      return this.submitBtnText || this.$t('app.edit_modal.confirm_btn.text')
    },

    getHeaderText() {
      return this.headerText || this.$t('app.edit_modal.header.title')
    }
  },

  watch: {
    structure: {
      deep: true,
      handler(newVal) {
        this.$get(newVal, 'inputs', []).forEach(input => {
          this.formInputModels[input.key] = input.model
        })
      }
    }
  },

  methods: {
    open() {
      this.$refs.modal.open()
    },

    close() {
      this.$refs.modal.close()
    },

    async formSubmit() {
      if (
        this.$refs.editForm.validate() &&
        this.$get(this.unit, 'entity.id', null) != null
      ) {
        const mutationInput = cloneDeep(this.mutationInputStructure)
        this.$get(this.structure, 'inputs', []).forEach(input => {
          const inputValue = this.formInputModels[input.key]
          const value = !input.transform
            ? inputValue
            : input.transform(inputValue)
          set(mutationInput, input.mutationKey, value)
        })

        await this.$apollo.mutate({
          ...this.mutation,
          variables: {
            id: this.$get(this.unit, 'entity.id'),
            input: mutationInput
          }
        })

        this.$refs.submitBtn.loaded()
        this.close()
      } else {
        this.$refs.submitBtn.loaded()
      }
    }
  }
}
</script>

<style scoped>
</style>
