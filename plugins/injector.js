import {
  currencyFormatter,
  dateFormatter,
  dateTimeFormatter,
  dateTimeShortFormatter,
  numberFormatter,
  percentageFormatter
} from './filters'
import {
  firstCategory,
  get,
  normalizeCategoryName,
  secondaryCategory,
  socialMediaIcon,
  tertiaryCategory
} from '@/services/helpers'

export default ({ store, app }, inject) => {
  inject('get', (source, path, fallback) => {
    const result = get(source, path, fallback)

    return result === null ? fallback : result
  })

  inject('helpers', {
    normalizeCategoryName,
    firstCategory,
    secondaryCategory,
    tertiaryCategory,
    socialMediaIcon
  })

  inject('filters', {
    date: dateFormatter,
    dateTime: dateTimeFormatter,
    dateTimeShort: dateTimeShortFormatter,
    number: numberFormatter,
    currency: currencyFormatter,
    percentage: percentageFormatter
  })
}
