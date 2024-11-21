const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { introspectionQuery } = require('graphql')
require('dotenv').config()

console.log(introspectionQuery) // eslint-disable-line no-console

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // disable all ssl checks

fetch(`http://localhost/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: introspectionQuery
  })
})
  .then(result => result.json())
  .then(result => {
    console.log('MIERDA', JSON.stringify(result, null, 2)) // eslint-disable-line no-console

    fs.writeFile(
      path.join(__dirname, '../schema.json'),
      JSON.stringify(result.data),
      err => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error('Error writing schema file', err)
        } else {
          // eslint-disable-next-line no-console
          console.log('Schema successfully extracted!')
        }
      }
    )

    // here we're filtering out any type information unrelated to unions or interfaces
    result.data.__schema.types = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    )
    fs.writeFile(
      path.join(__dirname, '../fragmentTypes.json'),
      JSON.stringify(result.data),
      err => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error('Error writing fragmentTypes file', err)
        } else {
          // eslint-disable-next-line no-console
          console.log('Fragment types successfully extracted!')
        }
      }
    )
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err)
    return -1
  })
