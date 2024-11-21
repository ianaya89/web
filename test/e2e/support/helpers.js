const { get } = require('../../../services/helpers')

export const stubQuery = (query, variables = {}, name) => {
  name = name || get(query, 'definitions.0.name.value')

  return {
    name,
    query,
    variables
  }
}
