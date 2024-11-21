import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range'
import numeral from 'numeral'
import Vue from 'vue'
import { fetchStored } from '../services/helpers'

numeral.register('locale', 'sk', {
  delimiters: {
    thousands: ' ',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'K',
    million: 'M',
    billion: 'B',
    trillion: 'T'
  },
  ordinal: number => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = number % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  },
  currency: {
    symbol: '£'
  }
})

export const dateFormatter = (
  val,
  format = 'DD MMM YYYY',
  timezone = fetchStored('timezone', 'Europe/Bratislava')
) => {
  const date = moment(val)
    .tz(timezone)
    .format(format)

  if (date === 'Invalid date') {
    return '-'
  }

  return date
}

export const dateTimeFormatter = (
  val,
  format = 'DD. MM. YYYY, HH:mm',
  relativeTime = false,
  timezone = fetchStored('timezone', 'Europe/Bratislava')
) => {
  const date = moment.tz(val, 'UTC')

  if (date === 'Invalid date') {
    return '-'
  }

  if (relativeTime) {
    return date.tz(timezone).fromNow()
  } else {
    return date.tz(timezone).format(format)
  }
}

export const dateTimeShortFormatter = (
  val,
  timezone = fetchStored('timezone', 'Europe/Bratislava')
) => {
  const date = moment.tz(val, 'UTC')

  if (date === 'Invalid date') {
    return '-'
  }
  return date.tz(timezone).fromNow()
}

export const stringTruncater = (val, length = 150) => {
  if (typeof val !== 'string') {
    return '-'
  }

  if (val.length <= length) {
    return val
  }

  return val.substring(0, length) + '...'
}

export const currencyFormatter = (
  val,
  short = false,
  withSymbol = true,
  fallback = '-',
  locale = 'sk'
) => {
  if (val == null) {
    return fallback
  }

  if (withSymbol) {
    return numberFormatter(val, short, locale, '0,0 $', '0,0a $')
  } else {
    return numberFormatter(val, short, locale, '0,0', '0,0a')
  }
}

export const numberFormatter = (
  val,
  short = false,
  locale = 'sk',
  format = '0,0',
  shortFormat = '0,0.0a'
) => {
  if (val == null) {
    return '-'
  }

  if (short) {
    format = shortFormat
  }

  if (numeral.locale() !== locale) {
    numeral.locale(locale)
  }

  return numeral(val).format(format)
}

export const percentageFormatter = (val, locale = 'sk') => {
  if (val == null) {
    return '-'
  }

  return numberFormatter(val, false, locale, '0,0%')
}

Vue.filter('date', dateFormatter)
Vue.filter('dateTime', dateTimeFormatter)
Vue.filter('dateTimeShort', dateTimeShortFormatter)
Vue.filter('truncate', stringTruncater)
Vue.filter('number', numberFormatter)
Vue.filter('currency', currencyFormatter)
Vue.filter('percentage', percentageFormatter)
