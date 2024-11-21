<template>
  <div class="w-full px-6 py-6 md:px-16 md:py-16 lg:px-32 flex">
    <div class="mx-auto">
      <div class="w-full">
        <logo :variant="'dark'" class="w-32 mx-auto" />
      </div>

      <h1 class="text-h2 mt-8 mb-16 text-center">
        Questionnaire for <span class="font-bold">{{ $get(questionnaire, 'name', 'Loading...') }}</span>
      </h1>

      <div v-if="questionnaire && questionnaire.isFillable" class="w-full">
        <v-form
          ref="questionnaire"
          v-model="formValid"
          class="w-full"
        >
          <div v-for="question in questionnaire.structure" :key="question.uuid" class="w-full">
            <app-input
              v-if="question.type==='text'"
              v-model="answers.find(item => item.uuid === question.uuid).answer[0].value"
              :required="question.required"
              :outline="true"
              :label="null"
              :rules="[v => (!!v || !question.required) || 'This field is required']"
              :solo-label="question.label"
            />

            <app-input
              v-if="question.type==='number'"
              v-model="answers.find(item => item.uuid === question.uuid).answer[0].value"
              :required="question.required"
              :type="'number'"
              :outline="true"
              :label="null"
              :rules="[v => (!!v || !question.required) || 'This field is required']"
              :solo-label="question.label"
            />

            <text-area
              v-if="question.type==='textarea'"
              v-model="answers.find(item => item.uuid === question.uuid).answer[0].value"
              :required="question.required"
              :outline="true"
              :label="null"
              :rules="[v => (!!v || !question.required) || 'This field is required']"
              :solo-label="question.label"
            />

            <app-select
              v-if="question.type==='select'"
              v-model="answers.find(item => item.uuid === question.uuid).answer[0].value"
              :required="question.required"
              :items="question.options"
              :outline="true"
              :label="null"
              :rules="[v => (!!v || !question.required) || 'This field is required']"
              :solo-label="question.label"
            />
          </div>

          <div class="w-full flex">
            <app-button class="mx-auto" :title="'Submit'" @clicked="submitQuestionnaire" />
          </div>
        </v-form>
      </div>
      <div v-if="questionnaire && !questionnaire.isFillable" class="w-full flex">
        <span class="font-bold mx-auto text-h4">This questionnaire is disabled</span>
      </div>
    </div>
  </div>
</template>

<script>
import { QuestionnaireMutation, QuestionnaireQuery } from '@/services/graphql'
import Logo from '@/components/Logo'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import TextArea from '@/components/TextArea'
import AppButton from '@/components/AppButton'

export default {
  layout: 'questionnaire',

  name: 'Slug',

  components: {
    Logo,
    AppButton,
    AppInput,
    AppSelect,
    TextArea
  },

  apollo: {
    questionnaire: {
      ...QuestionnaireQuery,
      variables() {
        return {
          uuid: this.formId
        }
      },
      skip() {
        return this.formId == null
      },
      error() {
        this.$toast.error('Something went wrong. Our Engineers are on it.')
        this.$router.push(this.localePath({ name: 'index' }))
      },
      result({ data }) {
        this.answers = []
        this.$get(data, 'questionnaire.structure', []).forEach(question => {
          this.answers.push({
            uuid: question.uuid,
            answer: [
              {
                value: this.$get(question, 'answers.0.value', null)
              }
            ]
          })
        })
      }
    }
  },

  data: () => ({
    formValid: null,
    answers: []
  }),

  computed: {
    formId() {
      return this.$route.params.slug
    }
  },

  methods: {
    async submitQuestionnaire() {
      if (this.$refs.questionnaire.validate()) {
        this.answers.map(answer => {
          answer.answer[0] = {
            value: String(answer.answer[0].value),
            text: String(answer.answer[0].value)
          }
        })

        try {
          await this.$apollo.mutate({
            ...QuestionnaireMutation,
            variables: {
              uuid: this.formId,
              input: this.answers
            }
          })
          this.$toast.success('The questionnaire was submitted successfully')
          this.$router.push(this.localePath({ name: 'index' }))
        } catch (err) {
          if (this.isDevEnv) {
            this.$toast.error(
              err.message || 'Something went wrong. Our Engineers are on it.'
            )
          } else {
            this.$toast.error('Something went wrong. Our Engineers are on it.')
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
