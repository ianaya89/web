<template>
  <section class="page--login min-h-screen max-w-xl w-full flex flex-wrap mx-auto px-0 lg:px-12 pb-10 lg:py-20">
    <div class="block lg:hidden mb-16 px-8 sm:px-12 w-full h-24 flex flex-wrap justify-between items-center shadow sm:shadow-none border-b border-transparent">
      <logo />
      <nuxt-link :to="localePath({ name : 'register' })">
        {{ $t('app.login.register_link') }}
      </nuxt-link>
    </div>

    <div class="hidden lg:flex justify-end w-1/3">
      <div class="pr-8">
        <card
          :title="$t('app.login.side_card.title')"
          :body="$t('app.login.side_card.content')"
          :link-title="$t('app.login.side_card.link_text')"
          :to="localePath({ name : 'register' })"
          :info="$t('app.login.side_card.no_credit_required')"
        />
      </div>
    </div>

    <div class="w-full lg:w-2/3 px-8 sm:px-12">
      <h1 class="uppercase text-h2 pb-6">
        {{ $t('app.login.title') }}
      </h1>

      <v-form
        ref="loginForm"
        v-model="formValid"
        method="post"
      >
        <app-input
          v-model="email"
          :type="'email'"
          :label="$t('app.login.email.label')"
          :required="true"
          :browser-autocomplete="'new-username'"
          :rules="emailRules"
          data-cy="email"
        />

        <app-input
          v-model="password"
          type="password"
          :label="$t('app.login.password.label')"
          :required="true"
          :password-switch="true"
          :rules="passwordRules"
          :browser-autocomplete="'new-password'"
          appended-icon="fa fa-eye"
          appended-icon2="fa fa-eye-slash"
          data-cy="password"
        />
        <animated-button
          ref="loginButton"
          type="submit"
          class="mt-10 w-full lg:w-auto"
          :should-disable="true"
          :disabled="!formValid"
          :loader="true"
          :title="$t('app.login.submit')"
          :show-arrow="true"
          data-cy="submit"
          @clicked="checkForm"
        />
      </v-form>

      <p class="text-grey font-serif mt-6 text-p2">
        {{ $t('app.login.info_text') }}
        <nuxt-link :to="localePath({ name: 'terms' })">
          {{ $t('general.terms') }}
        </nuxt-link> & <nuxt-link :to="localePath({ name: 'privacy' })">
          {{ $t('general.privacy') }}
        </nuxt-link>
      </p>

      <div class="w-full border border-grey-l3 py-4 px-6 mt-10 lg:mt-24">
        <p class="font-medium mb-1">
          {{ $t('app.login.forgot_info') }}
        </p>
        <nuxt-link :to="localePath({ name: 'forgot' })" class="font-medium">
          {{ $t('app.login.forgot_link') }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { persist } from '@/services/helpers'
import Card from '@/components/Card'
import AppInput from '@/components/AppInput'
import AnimatedButton from '@/components/AnimatedButton'
import Logo from '@/components/Logo'
import { LoginMutation, MeQuery } from '@/services/graphql'
import isDev from '@/services/mixins/isDev'
import alreadyAuthenticated from '@/services/mixins/alreadyAuthenticated'

export default {
  layout: 'auth',

  name: 'Login',

  components: {
    Card,
    AppInput,
    AnimatedButton,
    Logo
  },

  mixins: [isDev, alreadyAuthenticated],

  data: () => ({
    email: null,
    emailRules: [],
    password: null,
    passwordRules: [],
    formValid: false,

    loginSuccessful: false,
    me: {
      units: []
    }
  }),

  apollo: {
    me: {
      ...MeQuery,
      skip() {
        return !this.loginSuccessful
      },
      result({ data }) {
        this.$refs.loginButton.loaded()
        this.$store.dispatch(
          'active/setTimezone',
          this.$get(data, 'me.profile.timezone', 'Europe/Bratislava')
        )
        if (this.lastAuthorizedUnitRoute) {
          return this.$router.push(this.lastAuthorizedUnitRoute)
        }

        return this.resolveFallbackRedirectRoute(data)
      }
    }
  },

  mounted() {
    this.emailRules = [
      v => !!v || this.$t('app.login.email.validation.required'),
      v => /.+@.+\..+/.test(v) || this.$t('app.login.email.validation.valid')
    ]

    this.passwordRules = [
      v => !!v || this.$t('app.login.password.validation.required')
    ]
  },

  methods: {
    async checkForm() {
      if (this.$refs.loginForm.validate()) {
        try {
          const res = await this.$apollo.mutate({
            ...LoginMutation,
            variables: {
              email: this.email,
              password: this.password
            }
          })

          this.$apolloHelpers.onLogin(res.data.login.accessToken)
          this.$store.dispatch('auth/login', res.data.login)

          this.loginSuccessful = true

          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: 'so_successful_user_login'
          })
        } catch (err) {
          if (this.isDevEnv) {
            this.$toast.error(
              err.message || this.$t('errors.general-authentication-error')
            )
          } else {
            this.$toast.error(this.$t('errors.general-authentication-error'))
          }
          this.$refs.loginButton.loaded()
        }
      }
    },

    resolveFallbackRedirectRoute(data) {
      const unitId = this.$get(data, 'me.units.0.id')

      let route = this.localePath({
        name: ''
      })

      route = this.localePath({
        name: 'unit-id-dashboard',
        params: { id: unitId }
      })

      persist('lastAuthorizedUnitRoute', route)
      this.$router.push(route)
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
