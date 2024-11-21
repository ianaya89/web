<template>
  <!-- <section class="page--login min-h-screen flex flex-wrap px-0 lg:px-10 pb-10 lg:py-6"> -->
  <section class="bg-white">
    <!-- <div
      class="mb-16 sm:mb-0 px-8 xl:px-12 w-full h-24 flex flex-wrap justify-between items-center shadow sm:shadow-none border-b border-transparent"
    >
      <div class="block lg:hidden">
        <logo />
      </div>
      <nuxt-link :to="localePath({name : 'login'})">
        {{ $t('app.forgot.to_login_link') }}
      </nuxt-link>
    </div> -->

    <!-- <div class="w-full lg:w-2/3 px-8 sm:px-12 mx-auto"> -->
    <div class="">
      <!-- <h1 class="uppercase text-h2 leading-none">
        {{ $t('app.register.title') }}
      </h1>
      <h5>{{ $t('app.register.info') }}</h5> -->

      <v-form class="mt-8">
        <div class="w-full flex flex-wrap">
          <app-input
            v-model="password"
            :solo-label="$t('app.register.password.label')"
            :label="null"
            data-cy="new-pass"
            class="w-full sm:w-1/2 sm:pr-4"
            :browser-autocomplete="'new-password'"
            :password-switch="true"
            :required="true"
            :outline="true"
            appended-icon="fa fa-eye"
            appended-icon2="fa fa-eye-slash"
            type="password"
            :error-messages="validationErrors['password'] || []"
          />

          <app-input
            v-model="passwordConfirmation"
            :solo-label="$t('app.register.password_again.label')"
            :label="null"
            :browser-autocomplete="'new-password'"
            :required="true"
            :outline="true"
            class="w-full sm:w-1/2 sm:pl-4"
            data-cy="new-pass-conf"
            type="password"
          />
        </div>

        <div class="w-full" data-cy="pass-strength">
          <p class="text-grey font-medium">
            {{ $t('app.reset.strength.title') }}
          </p>
          <progress-bar
            v-model="passwordStrength"
            class="-mt-1"
            :buffer-value="100"
            :color="passwordStrengthColor"
          />
          <p class="text-grey">
            {{ $t('app.reset.strength.hint') }}
          </p>
        </div>

        <animated-button
          ref="registerButton"
          type="submit"
          data-cy="register"
          :btn-class="'primary-lg'"
          class="w-full sm:w-auto mt-6 mb-10"
          :should-disable="true"
          :loader="true"
          :title="$t('app.register.submit')"
          :show-arrow="true"
          @clicked="checkForm"
        />
      </v-form>
    </div>
  </section>
</template>

<script>
import AppInput from '@/components/AppInput'
import AnimatedButton from '@/components/AnimatedButton'
// import Logo from '@/components/Logo'
import ProgressBar from '@/components/ProgressBar'
import alreadyAuthenticated from '@/services/mixins/alreadyAuthenticated'
import { calculatePassStrength } from '@/services/helpers'
import { RegisterConfirmation } from '@/services/graphql/register'

export default {
  layout: 'auth',

  name: 'Register',

  components: {
    AppInput,
    AnimatedButton,
    ProgressBar
    // Logo
  },

  apollo: {},

  mixins: [alreadyAuthenticated],

  data: () => ({
    email: null,
    token: null,
    password: null,
    passwordConfirmation: null,
    validationErrors: {}
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
    }
  },

  async mounted() {
    this.token = this.$route.query.token || null
    this.email = this.$route.query.email || null
    await this.$recaptcha.init()
  },

  methods: {
    async defaultRegistrationFlow() {
      await this.$recaptcha
        .execute('register')
        .then(token => {
          return this.$apollo.mutate({
            ...RegisterConfirmation,
            variables: {
              input: {
                recaptchaToken: token,
                email: this.email,
                token: this.token,
                password: this.password,
                password_confirmation: this.passwordConfirmation
              }
            }
          })
        })
        .then(response => {
          const isSuccessful = response.data.registerUnitConfirmation === true

          if (isSuccessful) {
            this.$toast.success(
              this.$t('app.register.messages.verification_success'),
              { duration: 12000 }
            )
            this.$router.push(
              this.localePath({
                name: 'login'
              })
            )
          } else {
            this.$toast.error(this.$t('errors.general'))
          }

          this.$refs.registerButton.loaded()
          this.password = null
          this.passwordConfirmation = null
          this.validationErrors = {}
        })
        .catch(({ graphQLErrors }) => {
          if (graphQLErrors && graphQLErrors.length > 0) {
            const error = graphQLErrors[0]
            const validationErrors = error.extensions.errors
            if (validationErrors) {
              this.validationErrors = validationErrors
            }
            this.$toast.error(this.$t(error.message))
          } else {
            this.$toast.error(this.$t('errors.general'))
          }
          this.$refs.registerButton.loaded()
        })
    },

    async checkForm() {
      try {
        await this.defaultRegistrationFlow()
      } catch (error) {
        if (this.isDevEnv) {
          this.$toast.error(error.message || this.$t('errors.reset-error'))
        } else {
          this.$toast.error(this.$t('errors.general'))
        }
        this.$refs.registerButton.loaded()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
