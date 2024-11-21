export const mockArray = (count = 1, props = ['id']) => {
  return [...new Array(count)].map((_, k) => {
    const mockedObject = {}

    props.forEach(p => {
      mockedObject[p] = `mocked ${p} ${k}`
    })

    return mockedObject
  })
}

export const mockObjects = (count = 1, cb = () => ({ id: 1 })) => {
  return [...new Array(count)].map((_, k) => {
    return cb(k)
  })
}
