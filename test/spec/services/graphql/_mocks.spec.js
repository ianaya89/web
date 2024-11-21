import { mockArray, mockObjects } from '@/services/graphql/_mocks'

describe('_mocks', () => {
  describe('mockArray', () => {
    it('returns an array with a single mocked idd object', () => {
      expect(mockArray()).toEqual([
        {
          id: 'mocked id 0'
        }
      ])
    })

    it('allows specifying the number of mocked objects', () => {
      expect(mockArray(3)).toEqual([
        {
          id: 'mocked id 0'
        },
        {
          id: 'mocked id 1'
        },
        {
          id: 'mocked id 2'
        }
      ])
    })

    it('allows specifying the properties of mocked objects', () => {
      expect(mockArray(1, ['foo', 'bar', 'baz'])).toEqual([
        {
          foo: 'mocked foo 0',
          bar: 'mocked bar 0',
          baz: 'mocked baz 0'
        }
      ])
    })
  })

  describe('mockObjects', () => {
    it('returns an array with a single mocked idd object', () => {
      expect(mockObjects()).toEqual([
        {
          id: 1
        }
      ])
    })

    it('allows custom callback to define body of the object', () => {
      expect(
        mockObjects(3, k => {
          return {
            id: k,
            name: 'foo ' + k
          }
        })
      ).toEqual([
        {
          id: 0,
          name: 'foo 0'
        },
        {
          id: 1,
          name: 'foo 1'
        },
        {
          id: 2,
          name: 'foo 2'
        }
      ])
    })
  })
})
