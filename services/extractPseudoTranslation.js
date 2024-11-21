const fs = require('fs')
const path = require('path')

const { localize } = require('pseudo-localization')
const { mapValues } = require('lodash')

const rawdata = fs.readFileSync(path.join(__dirname, '/../locales/en.json'))
const langFile = JSON.parse(rawdata)

const loop = structure => {
  return mapValues(structure, (value, key) => {
    if (typeof value === 'string' || value instanceof String) {
      return localize(value)
    } else if (typeof value === 'object' || value instanceof Object) {
      return loop(value)
    } else {
      throw new Error('Value is not a string: ' + key)
    }
  })
}

const pseudoLangFile = JSON.stringify(loop(langFile), null, 2)

fs.writeFileSync(
  path.join(__dirname, '/../locales/pseudo.json'),
  pseudoLangFile
)
