import {
  dateFormatter,
  numberFormatter,
  currencyFormatter,
  percentageFormatter,
  stringTruncater
} from '@/plugins/filters'

describe('global filters', () => {
  describe('dateFormatter', () => {
    it('returns dash for invalid dates', () => {
      // mock to avoid reporting in tests
      // eslint-disable-next-line no-console
      console.warn = jest.fn()

      expect(dateFormatter('foo')).toBe('-')
    })

    it('formats a correct date', () => {
      expect(dateFormatter('2019-03-04 19:29:51')).toBe('04 Mar 2019')
    })
  })

  describe('stringTruncater', () => {
    it('returns dash for invalid string', () => {
      expect(stringTruncater([1, 2, 3])).toBe('-')
    })

    it('does not affect a short string', () => {
      expect(stringTruncater('foo', 5)).toBe('foo')
    })

    it('truncates a long string', () => {
      expect(stringTruncater('foobar', 3)).toBe('foo...')
    })
  })

  describe('numberFormatter', () => {
    it('returns dash for invalid value', () => {
      expect(numberFormatter(null)).toBe('-')
      expect(numberFormatter(undefined)).toBe('-')
    })

    it('returns zero for 0 value', () => {
      expect(numberFormatter(0)).toBe('0')
    })

    it('formats small numbers', () => {
      expect(numberFormatter(6)).toBe('6')
      expect(numberFormatter(61)).toBe('61')
      expect(numberFormatter(613)).toBe('613')
    })

    it('formats large numbers', () => {
      expect(numberFormatter(42773)).toBe('42 773')
      expect(numberFormatter(12734195)).toBe('12 734 195')
    })

    it('formats large numbers optionally in a short form', () => {
      expect(numberFormatter(42773, true)).toBe('42.8K')
      expect(numberFormatter(12734195, true)).toBe('12.7M')
    })
  })

  describe('percentageFormatter', () => {
    it('returns dash for invalid value', () => {
      expect(percentageFormatter(null)).toBe('-')
      expect(percentageFormatter(undefined)).toBe('-')
    })

    it('returns zero for 0 value', () => {
      expect(percentageFormatter(0)).toBe('0%')
    })

    it('formats float numbers', () => {
      expect(percentageFormatter(0.32)).toBe('32%')
      expect(percentageFormatter(2.4)).toBe('240%')
    })
  })

  describe('currencyFormatter', () => {
    it('returns dash for invalid value', () => {
      expect(currencyFormatter(null)).toBe('-')
      expect(currencyFormatter(undefined)).toBe('-')
    })

    it('returns zero for 0 value', () => {
      expect(currencyFormatter(0)).toBe('0 €')
    })

    it('formats small numbers', () => {
      expect(currencyFormatter(6.0)).toBe('6 €')
      expect(currencyFormatter(61.01)).toBe('61 €')
      expect(currencyFormatter(613.13)).toBe('613 €')
    })

    it('formats large numbers', () => {
      expect(currencyFormatter(42773.0)).toBe('42 773 €')
      expect(currencyFormatter(42773.0, false, false)).toBe('42 773')
      expect(currencyFormatter(12734195.0)).toBe('12 734 195 €')
    })

    it('formats large numbers optionally in a short form', () => {
      expect(currencyFormatter(42773.0, true, true)).toBe('43K €')
      expect(currencyFormatter(42773.0, true, false)).toBe('43K')
      expect(currencyFormatter(12734195.0, true, true)).toBe('13M €')
    })
  })
})
