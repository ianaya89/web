import gql from 'graphql-tag'

export const QuestionnaireQuery = {
  query: gql`
    query QuestionnaireQuery($uuid: ID!) {
      questionnaire(uuid: $uuid) {
        uuid
        name
        isFillable
        structure {
          uuid
          label
          required
          type
          answers {
            text
            value
          }
          options {
            text
            value
          }
        }
      }
    }
  `
}

export const QuestionnaireMutation = {
  mutation: gql`
    mutation QuestionnaireSubmit(
      $uuid: ID!
      $input: [QuestionnaireAnswersInput]!
    ) {
      submitQuestionnaire(uuid: $uuid, input: $input) {
        uuid
      }
    }
  `
}
