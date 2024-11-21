module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^[./a-zA-Z0-9$_-]+\\.(bmp|gif|jpg|jpeg|png|psd|svg|webp)$':
      '<rootDir>/test/mediaFileTransformer.js'
  },
  transformIgnorePatterns: ['/node_modules/(?!@babel/runtime).+\\.js$'],
  setupFiles: ['<rootDir>/test/spec/setup.js'],
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '!<rootDir>/components/charts/*.vue',
    '!<rootDir>/components/unit-pages/**/*.vue',
    '<rootDir>/store/**/*.js',
    '<rootDir>/services/**/*.js',
    '!<rootDir>/services/marketplaceConfig.js',
    '!<rootDir>/services/extractPseudoTranslation.js',
    '!<rootDir>/services/mixins/*.js',
    '!<rootDir>/services/graphql/*.js',
    '<rootDir>/services/graphql/_mocks.js'
  ]
}
