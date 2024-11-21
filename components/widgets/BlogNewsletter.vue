<template>
  <div class="blog__newsletter py-4 mt-8">
    <p class="text-p2 uppercase font-medium text-grey pb-4">
      {{ $t('blog.newsletter.title') }}
    </p>

    <div class="border font-serif border-grey-l4 px-4 pt-8 pb-4">
      <p class="mb-8 text-center text-grey">
        {{ $t('blog.newsletter.message') }}
      </p>

      <v-form ref="form" class="flex">
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          :validate-on-blur="true"
          :loading="isSubmitting"
          class="flex-1"
          type="email"
          label="Your email"
          outline
        />
        <v-btn :loading="isSubmitting" depressed @click="submit">
          <i class="lni-envelope text-h3" />
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { SubmitNewsletter } from '@/services/graphql/blog'
import { ActiveUnitQuery, MeQuery } from '@/services/graphql'

export default {
  apollo: {
    me: {
      ...MeQuery,
      result({ data }) {
        this.meta.firstName = this.$get(data, 'me.profile.firstName', '')
        this.meta.lastName = this.$get(data, 'me.profile.lastName', '')
        this.meta.phoneNumber = this.$get(data, 'me.profile.phoneNumber', '')
        // this.meta.jobTitle = this.$get(data, 'me.profile.jobTitle', '')
        this.unitId = this.$get(data, 'me.units.0.id')
        if (data.me.profile) {
          this.hasMeta = true
        }
      }
    },
    unit: {
      ...ActiveUnitQuery(function() {
        return { id: this.unitId }
      }),
      result({ data }) {
        this.meta.organizationName = this.$get(data, 'unit.organization.name')
        const entityType = this.$get(data, 'unit.entity.__typename', null)

        this.meta.type =
          entityType !== null && entityType === 'Team' ? 'team' : 'brand'
      }
    }
  },

  data: () => ({
    meta: {
      type: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      // jobTitle: '',
      organizationName: ''
    },
    unitId: '',
    email: '',
    isSubmitting: false,
    hasMeta: false,
    rules: {
      required: value => !!value || 'Email is required',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid email address'
      }
    }
  }),

  async mounted() {
    await this.$recaptcha.init()
  },

  methods: {
    // async submit() {
    //   if (!this.$refs.form.validate()) {
    //     return
    //   }

    //   this.isSubmitting = true

    //   try {
    //     await this.$apollo.mutate({
    //       ...SubmitNewsletter,
    //       variables: {
    //         email: this.email
    //       }
    //     })
    //     this.email = ''
    //   } catch (err) {}

    //   this.isSubmitting = false
    // },

    async submit() {
      if (!this.$refs.form.validate()) {
        return
      }

      this.isSubmitting = true

      await this.$recaptcha
        .execute('register_newsletter')
        .then(token => {
          return this.$apollo.mutate({
            ...SubmitNewsletter,
            variables: {
              email: this.email,
              recaptchaToken: token,
              meta: this.hasMeta ? JSON.stringify(this.meta) : ''
            }
          })
        })
        .then(response => {
          // eslint-disable-next-line no-console
          console.log(response)

          this.$toast.success(this.$t('blog.newsletter.success'), {
            duration: 6000
          })
        })
        .catch(({ graphQLErrors }) => {
          // eslint-disable-next-line no-console
          console.log(graphQLErrors)
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
          // this.$refs.registerButton.loaded()
        })
        .finally(() => {
          this.email = ''
          this.isSubmitting = false
        })
    }
  }
}
</script>

<style lang="postcss">
.blog__newsletter {
  .v-input {
    @apply .uppercase .font-sans;

    &__slot {
      @apply .border .border-grey-l3 .rounded-none !important;
    }
  }

  .v-btn {
    @apply .bg-red .text-white .m-0 .rounded-none !important;
    height: 56px;

    &:hover {
      @apply .bg-red-d1 !important;
    }
  }
}
</style>
