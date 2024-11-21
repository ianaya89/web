export default {
  computed: {
    isDevEnv() {
      return process.env.BASE_ENVIROMENT === 'dev'
    }
  }
}
