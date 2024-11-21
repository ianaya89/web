import faker from 'faker'
import {
  bountyFilterFix,
  calculateGrowth,
  calculatePassStrength,
  defaultMarketplaceCategoryConfig,
  defaultPerCharPoint,
  firstCategory,
  get,
  getGrowthClasses,
  getMarketplaceCategoryConfig,
  getMarketplaceCategoryIcon,
  hasFileError,
  isFileComplete,
  isFileNotProccessing,
  isFileUploading,
  isScrolledIntoView,
  lowercaseCharPresentPoints,
  normalizeCategoryName,
  numericCharPresentPoints,
  objectKeysToUnderscore,
  removeItemFromArray,
  secondaryCategory,
  socialMediaIcon,
  sumOfObjectsAttribute,
  tertiaryCategory,
  uppercaseCharPresentPoints
} from '@/services/helpers'
import marketplaceConfig from '@/services/marketplaceConfig'

describe('helpers', () => {
  it('isScrolledIntoView', () => {
    expect(isScrolledIntoView(null)).toBe(false)
  })

  it('getMarketplaceCategoryConfig', () => {
    expect(getMarketplaceCategoryConfig(null)).toEqual(
      defaultMarketplaceCategoryConfig
    )
    expect(getMarketplaceCategoryConfig('')).toEqual(
      defaultMarketplaceCategoryConfig
    )
    expect(getMarketplaceCategoryConfig('player-kit / shirt / sleeve')).toEqual(
      marketplaceConfig['player-kit'].shirt.sleeve.config
    )
  })

  it('getMarketplaceCategoryIcon', () => {
    expect(getMarketplaceCategoryIcon(null)).toBe('inventory')
    expect(getMarketplaceCategoryIcon('')).toBe('inventory')
    expect(getMarketplaceCategoryIcon('player-kit / shirt / sleeve')).toBe(
      marketplaceConfig['player-kit'].shirt.sleeve.icon
    )
  })

  it('calculatePassStrength', () => {
    expect(calculatePassStrength(null)).toBe(0)
    expect(calculatePassStrength('')).toBe(0)
    expect(calculatePassStrength('a')).toBe(
      lowercaseCharPresentPoints + defaultPerCharPoint
    )
    expect(calculatePassStrength('A')).toBe(
      uppercaseCharPresentPoints + defaultPerCharPoint
    )
    expect(calculatePassStrength('3')).toBe(
      numericCharPresentPoints + defaultPerCharPoint
    )
    expect(calculatePassStrength('a3S')).toBe(
      numericCharPresentPoints +
        uppercaseCharPresentPoints +
        lowercaseCharPresentPoints +
        defaultPerCharPoint * 3
    )
  })

  it('normalizeCategoryName', () => {
    expect(normalizeCategoryName(null)).toBe('-')
    expect(normalizeCategoryName('SomeName WithSpace')).toBe(
      'somename-withspace'
    )
    expect(normalizeCategoryName('SomeName WithSpace', true)).toBe(
      'package.somename-withspace'
    )
  })

  it('firstCategory', () => {
    expect(firstCategory(null)).toBe('-')
    expect(firstCategory({ asd: 'asd' })).toBe('-')
    expect(firstCategory({ path: 'first / second / third' })).toBe('first')
  })

  it('secondaryCategory', () => {
    expect(secondaryCategory(null)).toBe('-')
    expect(secondaryCategory({ asd: 'asd' })).toBe('-')
    expect(secondaryCategory({ path: 'first / second / third' })).toBe('second')
  })

  it('tertiaryCategory', () => {
    expect(tertiaryCategory(null)).toBe('-')
    expect(tertiaryCategory({ asd: 'asd' })).toBe('-')
    expect(tertiaryCategory({ path: 'first / second / third' })).toBe('third')
  })

  it('objectKeysToUnderscore', () => {
    expect(objectKeysToUnderscore(null)).toBe(null)
    expect(
      objectKeysToUnderscore({ thisIsKey: 'key', nextOne: 'key' })
    ).toEqual({
      this_is_key: 'key',
      next_one: 'key'
    })
  })

  it('isFileNotProccessing', () => {
    expect(isFileNotProccessing(null)).toBeFalsy()
    expect(isFileNotProccessing({ status: 'processing' })).toBeFalsy()
    expect(isFileNotProccessing({ processing: false })).toBeTruthy()
  })

  it('isFileUploading', () => {
    expect(isFileUploading(null)).toBeFalsy()
    expect(isFileUploading({ uploading: true })).toBeFalsy()
    expect(isFileUploading({ status: 'uploading' })).toBeTruthy()
  })

  it('isFileComplete', () => {
    expect(isFileComplete(null)).toBeFalsy()
    expect(isFileComplete({ success: true })).toBeFalsy()
    expect(isFileComplete({ status: 'success' })).toBeTruthy()
  })

  it('hasFileError', () => {
    expect(hasFileError(null)).toBeFalsy()
    expect(hasFileError({ canceled: true })).toBeFalsy()
    expect(hasFileError({ status: 'error' })).toBeTruthy()
    expect(hasFileError({ status: 'canceled' })).toBeTruthy()
  })

  it('bountyFilterFix', () => {
    expect(() => {
      bountyFilterFix(null)
    }).not.toThrow()
  })

  it('get', () => {
    expect(get(null, 'path')).toBe('')

    expect(get({ name: { first: 'Luke' } }, 'name.first')).toBe('Luke')
    expect(get({ name: { first: 'Luke' } }, 'name.second', 'Luke')).toBe('Luke')
    expect(get({ name: { first: 'Luke' } }, ['name', 'second'], 'Lucas')).toBe(
      'Lucas'
    )
    expect(get({ name: { first: 'Luke' } }, ['name', 'first'])).toBe('Luke')
  })

  it('socialMediaIcon', () => {
    expect(socialMediaIcon('facebook')).toBe('fab fa-facebook-f')
    expect(socialMediaIcon('instagram')).toBe('fab fa-instagram')
    expect(socialMediaIcon('youtube')).toBe('fab fa-youtube')
    expect(socialMediaIcon('youtube')).toBe('fab fa-youtube')
    expect(socialMediaIcon('twitter')).toBe('fab fa-twitter-square')
    expect(socialMediaIcon('any')).toBe('')
    expect(socialMediaIcon(null)).toBe('')
  })

  it('getGrowthClasses', () => {
    expect(getGrowthClasses(0)).toEqual({
      iconClass: 'fas fa-arrow-alt-circle-up text-green',
      textClass: 'text-green'
    })
    expect(getGrowthClasses(-1)).toEqual({
      iconClass: 'fas fa-arrow-alt-circle-down text-red',
      textClass: 'text-red'
    })
    expect(getGrowthClasses(1)).toEqual({
      iconClass: 'fas fa-arrow-alt-circle-up text-green',
      textClass: 'text-green'
    })
  })

  it('calculateGrowth', () => {
    expect(calculateGrowth(100, 100)).toBe(0)
    expect(calculateGrowth(100, 200)).toBe(1)
    expect(calculateGrowth(100, 50)).toBe(-0.5)
    expect(calculateGrowth(100, 300)).toBe(2)
    expect(calculateGrowth(100, -100)).toBe(-2)
    const number = faker.random.number()
    expect(calculateGrowth(null, number)).toBe(0)
    expect(calculateGrowth(number, null)).toBe(0)
    expect(calculateGrowth(0, number)).toBe(number / 100)
    expect(calculateGrowth(number, 0)).toBe(-1)
  })

  describe('removeItemFromArray', () => {
    it('empty array given', () => {
      expect(removeItemFromArray([], 'first').length).toBe(0)
      expect(removeItemFromArray([], 'first')).toEqual([])
    })

    it('first removed', () => {
      expect(removeItemFromArray(['first', 'second'], 'first').length).toBe(1)
      expect(removeItemFromArray(['first', 'second'], 'first')).toEqual([
        'second'
      ])
    })

    it('last removed', () => {
      expect(removeItemFromArray(['first', 'second'], 'second').length).toBe(1)
      expect(removeItemFromArray(['first', 'second'], 'second')).toEqual([
        'first'
      ])
    })

    it('middle removed', () => {
      const array = ['first', 'second', 'third']
      removeItemFromArray(array, 'second')
      expect(array.length).toBe(2)
      removeItemFromArray(array, 'second')
      expect(array.length).toBe(2)
    })

    it('not found item', () => {
      expect(removeItemFromArray(['first', 'second'], 'third').length).toBe(2)
      expect(removeItemFromArray(['first', 'second'], 'third')).toEqual([
        'first',
        'second'
      ])
    })
  })

  describe('sumOfObjectsAttribute', () => {
    it('sum of correct values', () => {
      const objects = [
        {
          value: 12
        },
        {
          value: 56.3
        },
        {
          value: 0
        }
      ]
      expect(sumOfObjectsAttribute(objects, 'value')).toBe(68.3)
    })

    it('one value is string', () => {
      const objects = [
        {
          value: 12
        },
        {
          value: '56.3'
        }
      ]

      expect(sumOfObjectsAttribute(objects, 'value')).toBe(68.3)
    })
    it('one value is null', () => {
      const objects = [
        {
          value: 12
        },
        {
          value: null
        }
      ]

      expect(sumOfObjectsAttribute(objects, 'value')).toBe(12)
    })

    it('no objects with that attribute', () => {
      const objects = [
        {
          value: 12
        }
      ]

      expect(sumOfObjectsAttribute(objects, 'id')).toBe(0)
    })

    it('no objects', () => {
      expect(sumOfObjectsAttribute([], 'id')).toBe(0)
    })
  })
})
