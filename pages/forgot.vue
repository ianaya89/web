<template>
  <section class="page--login min-h-screen flex flex-wrap px-0 lg:px-12 pb-10 lg:py-6">
    <div class="mb-16 sm:mb-0 px-8 sm:px-12 w-full h-24 flex flex-wrap justify-between items-center shadow sm:shadow-none border-b border-transparent">
      <div class="block lg:hidden">
        <logo />
      </div>
      <nuxt-link :to="localePath({name : 'login'})">
        {{ $t('app.forgot.to_login_link') }}
      </nuxt-link>
    </div>
    <div class="w-full lg:w-2/3 px-8 sm:px-16 mx-auto">
      <h1 class="uppercase leading-none text-6xl">
        {{ $t('app.forgot.title') }}
      </h1>
      <h5>
        {{ $t('app.forgot.info') }}
      </h5>

      <v-form
        ref="forgotForm"
        v-model="formValid"
      >
        <app-input
          v-model="email"
          :type="'text'"
          :label="$t('app.forgot.email.label')"
          :required="true"
          :rules="emailRules"
        />

        <app-button
          ref="forgotButton"
          type="submit"
          class="mt-10 w-full sm:w-auto"
          :should-disable="true"
          :disabled="!formValid"
          :loader="true"
          :title="$t('app.forgot.submit')"
          @clicked="checkForm"
        />
      </v-form>
    </div>
  </section>
</template>

<script>
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import Logo from '@/components/Logo'
import { ForgotMutation } from '@/services/graphql'
import isDev from '@/services/mixins/isDev'
import alreadyAuthenticated from '@/services/mixins/alreadyAuthenticated'

export default {
  layout: 'auth',

  name: 'Forgot',

  components: {
    AppInput,
    AppButton,
    Logo
  },

  mixins: [isDev, alreadyAuthenticated],

  data: () => ({
    email: null,
    formValid: false
  }),

  computed: {
    emailRules() {
      return [
        v => !!v || this.$t('app.forgot.email.validation.required'),
        v =>
          /^.+@.+\..+$/.test(v) ||
          /^[0-9+ ]+$/.test(v) ||
          this.$t('app.forgot.email.validation.valid')
      ]
    }
  },

  methods: {
    async checkForm() {
      if (this.$refs.forgotForm.validate()) {
        try {
          await this.$apollo
            .mutate({
              ...ForgotMutation,
              variables: {
                email: this.email
              }
            })
            .then(({ data }) => {
              if (data.forgotPassword) {
                this.$toast.success(this.$t('app.forgot.messages.success'))
              } else {
                this.$toast.error(this.$t('app.forgot.messages.error'))
              }
            })
        } catch (err) {
          if (this.isDevEnv) {
            this.$toast.error(err.message || this.$t('errors.forgot-error'))
          } else {
            this.$toast.error(this.$t('errors.forgot-error'))
          }
        }
        this.$refs.forgotButton.loaded()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
