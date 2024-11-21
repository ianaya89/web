<template>
  <section class="page--login min-h-screen flex flex-wrap px-0 lg:px-12 pb-10 lg:py-6">
    <div class="mb-16 sm:mb-0 px-6 w-full h-24 flex flex-wrap justify-between items-center shadow sm:shadow-none">
      <div class="block lg:hidden">
        <logo />
      </div>
    </div>

    <div class="w-full lg:w-2/3 px-8 sm:px-16 mx-auto mb-16">
      <h1 class="uppercase">
        {{ $t('app.reset.title') }}
      </h1>

      <v-form
        ref="resetForm"
        v-model="formValid"
      >
        <app-input
          v-model="password"
          type="password"
          :label="$t('app.reset.password.label')"
          :required="true"
          :password-switch="true"
          :rules="passwordRules"
          appended-icon="fa fa-eye"
          appended-icon2="fa fa-eye-slash"
          @input="validateConfirmation"
        />

        <app-input
          v-model="password_again"
          type="password"
          :label="$t('app.reset.password_again.label')"
          :required="true"
          :password-switch="true"
          :rules="passwordAgainRules"
          appended-icon="fa fa-eye"
          appended-icon2="fa fa-eye-slash"
        />

        <p class="text-grey mt-12 font-medium">
          {{ $t('app.reset.strength.title') }}
        </p>
        <progress-bar v-model="passwordStrength" class="-mt-1" :buffer-value="100" :color="passwordStrengthColor" />
        <p class="text-grey">
          {{ $t('app.reset.strength.hint') }}
        </p>

        <app-button
          ref="resetButton"
          type="submit"
          :btn-class="'primary-lg'"
          class="mt-16 w-full sm:w-auto"
          :should-disable="true"
          :disabled="!formValid"
          :loader="true"
          :title="$t('app.reset.submit')"
          :show-arrow="true"
          @clicked="checkForm"
        />
      </v-form>
    </div>
  </section>
</template>

<script>
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import ProgressBar from '@/components/ProgressBar'
import Logo from '@/components/Logo'
import { ResetMutation } from '@/services/graphql'
import { calculatePassStrength } from '@/services/helpers'

export default {
  layout: 'auth',

  name: 'Reset',

  components: {
    AppInput,
    AppButton,
    ProgressBar,
    Logo
  },

  data: () => ({
    password: null,
    password_again: null,
    formValid: false
  }),

  computed: {
    passwordStrength() {
      return calculatePassStrength(this.password)
    },

    passwordStrengthColor() {
      if (this.passwordStrength < 75) {
        return 'red'
      } else {
        return 'green'
      }
    },

    passwordRules() {
      return [
        v => !!v || this.$t('app.reset.password.validation.required'),
        v =>
          this.passwordStrength >= 75 ||
          this.$t('app.reset.password.validation.strength')
      ]
    },

    passwordAgainRules() {
      return [
        v => !!v || this.$t('app.reset.password_again.validation.required'),
        v =>
          v === this.password ||
          this.$t('app.reset.password_again.validation.confirmed')
      ]
    }
  },

  methods: {
    async checkForm() {
      if (this.$refs.resetForm.validate()) {
        try {
          await this.$apollo
            .mutate({
              ...ResetMutation,
              variables: {
                email: this.$route.query.email,
                password: this.password,
                token: this.$route.query.token
              }
            })
            .then(({ data }) => {
              if (data.resetPassword) {
                this.$toast.success(this.$t('app.reset.messages.success'))
                this.$router.push(this.localePath({ name: 'login' }))
              } else {
                this.$toast.error(this.$t('app.reset.messages.error'))
              }
            })
        } catch (err) {
          if (this.isDevEnv) {
            this.$toast.error(err.message || this.$t('errors.reset-error'))
          } else {
            this.$toast.error(this.$t('errors.reset-error'))
          }
        }
        this.$refs.resetButton.loaded()
      }
    },

    validateConfirmation() {
      if (this.password_again !== null) {
        this.$refs.resetForm.validate()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
