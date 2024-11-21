import { print } from 'graphql'
import { addTypenameToDocument } from 'apollo-utilities'
import { LoginMutation } from '../../../services/graphql'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // disable all ssl checks
require('dotenv').config()

const path = require('path')
const axios = require('axios')
const consola = require('consola')
const fs = require('fs-extra')
const rm = require('rimraf')
const argv = require('yargs').argv
const hash = require('object-hash')

class Manager {
  constructor(queries, dest, apiUrl, loginCredentials, stubSuffix = '') {
    this.queries = queries
    this.dest = dest
    this.apiUrl = apiUrl
    this.loginCredentials = loginCredentials
    this.stubSuffix = stubSuffix
    this.token = ''
    this.filter = argv.filter ? argv.filter.split(',') : false
    this.filteredQueries = this.queries
    this.checksumsPath = path.join(this.dest, 'checksums')
  }

  async fetch() {
    await this.fetchToken()

    this.createFilteredQueries()

    fs.mkdir(this.dest).catch(() => {})
    fs.mkdir(this.checksumsPath).catch(() => {})

    rm(path.join(this.dest, 'index.js'), () => {})

    fs.writeFileSync(
      path.join(this.dest, 'index.js'),
      `export const RecaptchaMutation = require('../manualResponses/RecaptchaMutation.json')
`
    )

    for (const queryObject of this.filteredQueries) {
      this.saveResponseToQuery(queryObject)
      this.storeResponseReference(queryObject)
    }
  }

  async fetchToken() {
    consola.info('Fetching access token')

    const response = await this.fetchResponse({
      query: LoginMutation.mutation,
      variables: this.loginCredentials
    })

    this.token = response.data.data.login.accessToken
    consola.success('Access token stored\n')
  }

  createFilteredQueries() {
    if (!this.filter) {
      return
    }

    this.filteredQueries = this.queries.filter(q => {
      if (!Object.prototype.hasOwnProperty.call(q, 'name')) {
        return false
      }

      return this.filter.some(
        f => f && q.name.toLowerCase().includes(f.toLowerCase())
      )
    })
  }

  shouldSaveNewResponse(queryObject) {
    if (argv.force) {
      return true
    }

    let stub = argv.stub

    if (stub) {
      if (typeof stub === 'string') {
        stub = [stub]
      }

      if (stub.indexOf(queryObject.name) !== -1) {
        return true
      }
    }

    const name = this.queryObjectName(queryObject)
    const checksumPath = path.join(this.checksumsPath, name)
    const queryObjectChecksum = hash(
      this.queryObjectToEndpointData(queryObject)
    )

    if (fs.existsSync(checksumPath)) {
      const storedChecksum = fs.readFileSync(checksumPath, 'utf8')

      if (queryObjectChecksum === storedChecksum) {
        return false
      }

      return true
    }

    return true
  }

  async saveResponseToQuery(queryObject) {
    const name = this.queryObjectName(queryObject)
    const checksumPath = path.join(this.checksumsPath, name)
    const queryObjectChecksum = hash(
      this.queryObjectToEndpointData(queryObject)
    )

    consola.info('Processing: ' + name)

    if (!this.shouldSaveNewResponse(queryObject)) {
      consola.info('Query did not change, skipping: ' + name)

      return
    } else {
      fs.writeFile(checksumPath, queryObjectChecksum, 'utf8', function() {
        consola.success('Stored checksum for: ' + name)
      })
    }

    try {
      const response = await this.fetchResponse(queryObject)

      return this.saveResponse(queryObject, response.data)
    } catch (error) {
      if (queryObject.shouldFail) {
        return this.saveResponse(queryObject, error.response.data)
      }

      consola.error(`
        HTTP Error: ${error.message}
        Query: ${this.prettyJson(queryObject)}
      `)
    }
  }

  queryObjectToEndpointData(queryObject) {
    return {
      query: print(addTypenameToDocument(queryObject.query)),
      variables: queryObject.variables
    }
  }

  fetchResponse(queryObject) {
    return axios({
      url: this.apiUrl,
      method: 'POST',
      data: this.queryObjectToEndpointData(queryObject),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token
      }
    })
  }

  saveResponse(queryObject, data) {
    const queryObjectName = this.queryObjectName(queryObject)
    const target = path.join(this.dest, queryObjectName + 'Stub.json')
    const dest = path.dirname(target)

    if (!fs.existsSync(dest)) {
      fs.ensureDirSync(dest)
    }

    // Clear out extensions info
    delete data.extensions

    fs.writeFileSync(target, this.prettyJson(data))

    consola.success(`Done: ${this.queryObjectName(queryObject)}\n`)
  }

  storeResponseReference(queryObject) {
    const queryObjectName = this.queryObjectName(queryObject)
    const file = path.join(this.dest, 'index.js')

    fs.appendFile(
      file,
      `export const ${queryObjectName} = require('./${queryObjectName}Stub.json')
`
    )
  }

  queryObjectName(queryObject) {
    return queryObject.name + this.stubSuffix
  }

  prettyJson(item) {
    return JSON.stringify(item, null, 2)
  }
}

const baseUrl = process.env.VUE_APP_BACKEND_URL + '/graphql'

const managerType = argv._[0] ? argv._[0] : 'default'

const pathsToResponses = {
  default: path.join(__dirname, '../fixtures/responses'),
  brand: path.join(__dirname, '../fixtures/responses-brand')
}

const responseMaps = {
  default: require(path.join(pathsToResponses[managerType], '../responseMap')),
  brand: require(path.join(
    pathsToResponses[managerType],
    '../responseMapBrand'
  ))
}

const loginCredentials = {
  default: {
    email: 'engineering@sponsoronline.eu',
    password: 'secret'
  },
  brand: {
    email: 'brand@sponsoronline.eu',
    password: 'secret'
  }
}

const manager = new Manager(
  responseMaps[managerType],
  pathsToResponses[managerType],
  baseUrl,
  loginCredentials[managerType],
  managerType === 'default'
    ? ''
    : managerType.charAt(0).toUpperCase() + managerType.slice(1)
)

manager.fetch().then(() => {
  consola.success('Done')
})
