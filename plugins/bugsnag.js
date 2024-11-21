import Vue from 'vue'

import bugsnag from '@bugsnag/js'
import bugsnagVue from '@bugsnag/plugin-vue'

const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_API_KEY,
  autoCaptureSessions: true,
  maxEvents: 25,
  notifyReleaseStages: ['staging', 'present', 'production'],
  releaseStage: process.env.BUGSNAG_STAGE || 'development'
})

bugsnagClient.use(bugsnagVue, Vue)
