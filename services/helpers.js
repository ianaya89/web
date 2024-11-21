import { snakeCase } from 'lodash'
import marketplaceConfig from './marketplaceConfig'

function slug(title, separator) {
  if (typeof separator === 'undefined') separator = '-'

  // Convert all dashes/underscores into separator
  const flip = separator === '-' ? '_' : '-'
  title = title.replace(flip, separator)

  // Remove all characters that are not the separator, letters, numbers, or whitespace.
  title = title
    .toLowerCase()
    .replace(new RegExp('[^a-z0-9' + separator + '\\s]', 'g'), '')

  // Replace all separator characters and whitespace by a single separator
  title = title.replace(new RegExp('[' + separator + '\\s]+', 'g'), separator)

  return title.replace(
    new RegExp('^[' + separator + '\\s]+|[' + separator + '\\s]+$', 'g'),
    ''
  )
}

// expect 20 positions in division
const leagueChartPositionCoefficient = 5

// build only division position without stage information
export const buildLeagueChartPosition = position => {
  // 1st place in 1st division => 1.01
  // 2nd place in 1st division => 1.05
  // 4th place in 1st division => 1.15
  // 19th place in 1st division => 1.901
  // 4th place in 2nd division => 2.15
  // 5th place in 2nd division => 2.201
  // 14th place in 2nd division => 2.65
  const builtPlace = (parseInt(position) - 1) * leagueChartPositionCoefficient
  const suffix = builtPlace % 10 === 0 ? 1 : ''
  return `${builtPlace === 5 ? 0 : ''}${builtPlace}${suffix}`
}

// parse only division position without stage information
export const parseLeagueChartPosition = leagueChartPosition => {
  if ((parseInt(leagueChartPosition) - 1) % 100 === 0) {
    leagueChartPosition = (parseInt(leagueChartPosition) - 1) / 10
  }
  return leagueChartPosition / leagueChartPositionCoefficient + 1
}

export function addLocalizedCountryName(country) {
  country.localizedName = this.$t('countries.' + slug(country.name, '-'))
  return country
}

export function addLocalizedContinentName(continent) {
  continent.localizedName = this.$t('continents.' + slug(continent.name, '-'))
  return continent
}

export const defaultMarketplaceCategoryConfig = {
  images_info: null,
  availability: ['season', 'date'],
  quantity: 'pcs',
  quantity_info: null,
  broadcast_choice: false,
  dimensions: null
}

export const maxPassLengthPoints = 60
export const minPassLength = 8
export const numericCharPresentPoints = 14
export const lowercaseCharPresentPoints = 13
export const uppercaseCharPresentPoints = 13
export const defaultPerCharPoint = maxPassLengthPoints / minPassLength

export const ROUTES_PREFIX_4_TYPENAMES = {
  Team: 'unit-id',
  Brand: 'unit-id',
  League: 'unit-id'
}

export const DEFAULT_ROUTES_4_TYPENAMES = {
  Team: 'unit-id-dashboard',
  Brand: 'unit-id-dashboard',
  League: 'unit-id-dashboard'
}

export const SUBSCRIPTION_ROUTES_4_TYPENAMES = {
  Team: 'unit-id-settings-subscriptions',
  Brand: 'unit-id-settings-subscriptions',
  League: 'unit-id-settings-subscriptions'
}

export const GEO_COORDS = {
  berlin: {
    lat: 52.5069,
    lon: 13.2846
  },
  brussels: {
    lat: 50.855,
    lon: 4.3053
  },
  paris: {
    lat: 48.8589,
    lon: 2.277
  },
  amsterdam: {
    lat: 52.3547,
    lon: 4.8285
  },
  los_angeles: {
    lat: 34.0207,
    lon: -118.6919
  },
  london: {
    lat: 51.5287,
    lon: -0.2416
  },
  warsaw: {
    lat: 52.233,
    lon: 20.9211
  },
  belgrade: {
    lat: 44.8154,
    lon: 20.2825
  },
  buenos_aires: {
    lat: -34.6037,
    lon: -58.3816
  },
  madrid: {
    lat: 40.4381,
    lon: -3.8196
  },
  dubai: {
    lat: 25.0757,
    lon: 54.9475
  },
  rome: {
    lat: 41.9028,
    lon: 12.4964
  },
  lucerne: {
    lat: 47.0548,
    lon: 8.2472
  },
  ljublana: {
    lat: 46.0662,
    lon: 14.462
  },
  zagreb: {
    lat: 45.8402,
    lon: 15.8942
  },
  budapest: {
    lat: 47.4813,
    lon: 18.9902
  },
  vienna: {
    lat: 48.2207,
    lon: 16.31
  },
  bratislava: {
    lat: 48.1359,
    lon: 16.9758
  },
  prague: {
    lat: 50.0598,
    lon: 14.3255
  },
  athens: {
    lat: 37.97268483408159,
    lon: 23.72990004337889
  },
  braga: {
    lat: 41.54893966372768,
    lon: -8.425154555780637
  },
  mexico_city: {
    lat: 19.359234066185465,
    lon: -99.1085890121374
  },
  munich: {
    lat: 48.13869240352171,
    lon: 11.564364099667204
  }
}

export const TERMS_PRIVACY_MENU = {
  key: 'TERMS_PRIVACY_MENU',
  values: {
    privacy: 'PRIVACY_MENU',
    terms: 'TERMS_MENU'
  }
}

export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'bmp', 'gif']
export const VIDEO_EXTENSIONS = ['mov', 'wmv', 'avi', 'mpeg', 'mp4']
export const AUDIO_EXTENSIONS = []
export const ARCHIVE_EXTENSIONS = ['zip', 'rar']
export const DOC_EXTENSIONS = ['doc', 'docx']
export const PDF_EXTENSIONS = ['pdf']
export const EXCEL_EXTENSIONS = ['xls', 'xlsx']
export const PRESENTATION_EXTENSIONS = ['ppt', 'pptx']

/**
 * Deeply fetch dot notated strings from object.
 * Has fallback if value does not exist
 * @param {String|Array} path - Dot notated string or an array of keys
 * @param {Object} source - Object to traverse
 * @param {*} fallback - Fallback value
 * @return {*}
 */
export function get(source, path, fallback = '') {
  if (typeof source !== 'object') {
    return fallback
  }

  try {
    const keys = Array.isArray(path) ? path : path.split('.')

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (!source || !Object.prototype.hasOwnProperty.call(source, key)) {
        return fallback
      }
      source = source[key]
    }

    return source
  } catch (_) {
    return fallback
  }
}

export function socialMediaIcon(type) {
  switch (type) {
    case 'facebook':
      return 'fab fa-facebook-f'
    case 'instagram':
      return 'fab fa-instagram'
    case 'youtube':
      return 'fab fa-youtube'
    case 'web-page':
      return 'fas fa-globe'
    case 'twitter':
      return 'fab fa-twitter-square'
    case 'weibo':
      return 'fab fa-weibo'
    case 'tiktok':
      return 'fab fa-tiktok'
    default:
      return ''
  }
}

export function sumOfObjectsAttribute(objects, attributeName) {
  return objects.reduce((a, b) => a + (Number(b[attributeName]) || 0), 0)
}

export function isScrolledIntoView(el, offsetPercentageOfHeight = null) {
  if (el == null) {
    return false
  }
  const rect = el.getBoundingClientRect()
  const elemTop = rect.top
  const elemBottom = rect.bottom
  if (offsetPercentageOfHeight !== null) {
    const eleHeightThreshold = rect.height * offsetPercentageOfHeight
    return elemTop >= 0 && elemTop + eleHeightThreshold <= window.innerHeight
  } else {
    return elemTop >= 0 && elemBottom <= window.innerHeight
  }
}

export function removeItemFromArray(array, itemValue) {
  if (array.indexOf(itemValue) !== -1) {
    array.splice(array.indexOf(itemValue), 1)
  }
  return array
}

export function bountyFilterFix(bountyEle) {
  if (bountyEle != null) {
    bountyEle.querySelectorAll('[style*="filter"]').forEach(ele => {
      ele.style.filter = ''
    })
  }
}

export function firstCategory(category) {
  if (
    category == null ||
    !Object.prototype.hasOwnProperty.call(category, 'path')
  ) {
    return '-'
  }
  return category.path.split(' / ')[0]
}

export function secondaryCategory(category) {
  if (
    category == null ||
    !Object.prototype.hasOwnProperty.call(category, 'path')
  ) {
    return '-'
  }
  return category.path.split(' / ')[1]
}

export function tertiaryCategory(category) {
  if (
    category == null ||
    !Object.prototype.hasOwnProperty.call(category, 'path')
  ) {
    return '-'
  }
  return category.path.split(' / ')[2]
}

export function calculateGrowth(previousValue, currentValue) {
  if (currentValue === 0 && previousValue !== 0) {
    return -1 // growth e.g: from 1432 to 0 = -100%
  } else if (currentValue !== 0 && previousValue === 0) {
    return currentValue / 100 // growth e.g: from 0 to 1248 = 1248%
  }
  const percentageValue = previousValue
    ? (currentValue / previousValue) * 100
    : 0
  const growth = percentageValue - 100
  return percentageValue !== 0 ? growth / 100 : 0
}

export function objectKeysToUnderscore(object) {
  if (object == null) {
    return null
  }
  const preparedObjectUnderscore = {}
  for (const camel of Object.keys(object)) {
    preparedObjectUnderscore[snakeCase(camel)] = object[camel]
  }
  return preparedObjectUnderscore
}

export function isFileNotProccessing(file) {
  if (file === null) {
    return false
  }
  return file.processing === false
}

export function isFileUploading(file) {
  if (file === null) {
    return false
  }
  return file.status === 'uploading'
}

export function isFileComplete(file) {
  if (file === null) {
    return false
  }
  return file.status === 'success'
}

export function hasFileError(file) {
  if (file === null) {
    return false
  }
  return file.status === 'error' || file.status === 'canceled'
}

export function getGrowthClasses(growthValue) {
  return {
    iconClass:
      growthValue < 0
        ? 'fas fa-arrow-alt-circle-down text-red'
        : 'fas fa-arrow-alt-circle-up text-green',
    textClass: growthValue < 0 ? 'text-red' : 'text-green'
  }
}

export function findObjectByAttributeValue(
  objects,
  attributeName,
  attributeValue
) {
  return objects.find(element => {
    return element[attributeName] === attributeValue
  })
}

export function findDifferentValuesReturnKeys(object1, object2) {
  if (object1 === undefined || object2 === undefined) {
    return []
  }

  const differentKeys = []
  Object.keys(object1).forEach(key => {
    if (object2[key] !== undefined && object1[key] !== object2[key]) {
      differentKeys.push(key)
    }
  })

  return differentKeys
}

export function scrollTo(
  scrollableElement,
  toElement,
  callback,
  duration = 1500,
  toPositionProperty = 'offsetTop',
  scrollingProperty = 'scrollTop'
) {
  const to = toElement[toPositionProperty]
  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0

  function move(amount) {
    scrollableElement[scrollingProperty] = amount
  }

  function position() {
    return scrollableElement[scrollingProperty]
  }

  const requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()

  Math.inOutQuintic = function(t, b, c, d) {
    const ts = (t /= d) * t
    const tc = ts * t
    return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc)
  }

  const animateScroll = function() {
    currentTime += increment
    const val = Math.inOutQuintic(currentTime, start, change, duration)
    move(val)
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else if (callback && typeof callback === 'function') {
      callback()
    }
  }

  animateScroll()
}

export const fetchStored = (name, fallback = null) => {
  const value = localStorage.getItem(name) || fallback
  if (value === fallback) {
    return value
  } else {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
}

export const persist = (name, value) => {
  if (Array.isArray(value) || typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(name, value)
}

export const clear = name => {
  localStorage.removeItem(name)
}

export const normalizeCategoryName = (name, isPackageItem = false) => {
  if (name == null) {
    return '-'
  }
  if (isPackageItem) {
    return 'package.' + name.toLowerCase().replace(/ /g, '-')
  } else {
    return name.toLowerCase().replace(/ /g, '-')
  }
}

export const calculatePassStrength = password => {
  let points = 0
  if (password !== null) {
    points += Math.min(
      maxPassLengthPoints,
      password.length * defaultPerCharPoint
    ) // check password length
    if (/\d/.test(password)) {
      // check numeric character
      points += numericCharPresentPoints
    }
    if (/[a-z]/.test(password)) {
      // check lowercase character
      points += lowercaseCharPresentPoints
    }
    if (/[A-Z]/.test(password)) {
      // check uppercase character
      points += uppercaseCharPresentPoints
    }
  }
  return Math.min(100, points)
}

export const getMarketplaceCategoryIcon = categoryPath => {
  const icons = marketplaceConfig
  let lastFoundIcon = 'inventory'
  let currentLookingPath = ''

  if (categoryPath == null) {
    return lastFoundIcon
  }
  const splitedPath = categoryPath.split(' / ')

  splitedPath.forEach(currentCategoryItemPath => {
    if (currentLookingPath === '') {
      currentLookingPath += currentCategoryItemPath
    } else {
      currentLookingPath += '.' + currentCategoryItemPath
    }
    const iconItem = get(icons, currentLookingPath)
    if (
      iconItem !== null &&
      iconItem.icon !== undefined &&
      iconItem.icon !== ''
    ) {
      lastFoundIcon = iconItem.icon
    }
  })
  return lastFoundIcon
}

export const getMarketplaceCategoryConfig = categoryPath => {
  const config = marketplaceConfig
  let currentLookingPath = ''
  let lastFoundConfig = defaultMarketplaceCategoryConfig

  if (categoryPath == null) {
    return lastFoundConfig
  }
  const splitedPath = categoryPath.split(' / ')

  splitedPath.forEach(currentCategoryItemPath => {
    if (currentLookingPath === '') {
      currentLookingPath += currentCategoryItemPath
    } else {
      currentLookingPath += '.' + currentCategoryItemPath
    }
    const configItem = get(config, currentLookingPath)
    if (
      configItem !== null &&
      configItem.config !== undefined &&
      configItem.config !== ''
    ) {
      lastFoundConfig = configItem.config
    }
  })
  return lastFoundConfig
}

export const buildTeamSlug = team => {
  return slug(team, '-')
}
