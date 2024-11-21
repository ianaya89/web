import { fetchStored, persist } from '@/services/helpers'

export const state = () => ({
  season: fetchStored('active_season', {
    id: 138,
    name: '2023/24',
    fromDate: '2023/07/01',
    toDate: '2024/06/30'
  }),
  lastSeason: {
    id: 136,
    name: '2022/23',
    fromDate: '2022/07/01',
    toDate: '2023/06/30'
  },
  currentSeason: {
    id: 138,
    name: '2023/24',
    fromDate: '2023/07/01',
    toDate: '2024/06/30'
  },
  unitType: null,
  unitID: null,
  unitPermissions: [],
  unitActiveSubscription: null,
  timezone: fetchStored('timezone', 'Europe/Bratislava')
})

export const getters = {
  getSeason: state => {
    return state.season
  },

  getLastSeason: state => {
    return state.lastSeason
  },

  getCurrentSeason: state => {
    return state.currentSeason
  },

  unitType: state => {
    return state.unitType
  },

  unitID: state => {
    return state.unitID
  },

  unitPermissions: state => {
    return state.unitPermissions
  },

  unitActiveSubscription: state => {
    return state.unitActiveSubscription
  },

  isTeamActive: state => {
    return state.unitType === 'team'
  },

  isBrandActive: state => {
    return state.unitType === 'brand'
  },

  isLeagueActive: state => {
    return state.unitType === 'league'
  },

  unitTypeCategory: state => {
    return getters.isBrandActive(state) ? 'buyer' : 'seller'
  },

  getTimeZone: state => {
    return state.timezone
  }
}

export const mutations = {
  SET_TIMEZONE(state, newZone) {
    persist('timezone', newZone)
    state.timezone = newZone
  },

  SET_SEASON(state, season) {
    persist('active_season', season)
    state.season = season
  },

  SET_UNIT_TYPE(state, unitType) {
    state.unitType = unitType
  },

  SET_UNIT_ID(state, unitID) {
    state.unitID = unitID
  },

  SET_UNIT_PERMISSIONS(state, unitPermissions) {
    state.unitPermissions = unitPermissions
  },

  SET_UNIT_ACTIVE_SUBSCRIPTION(state, unitActiveSubscription) {
    state.unitActiveSubscription = unitActiveSubscription
  }
}

export const actions = {
  setTimezone({ commit }, newZone) {
    commit(mutations.SET_TIMEZONE.name, newZone)
  },

  setUnitType({ commit }, unitType) {
    commit(mutations.SET_UNIT_TYPE.name, unitType)
  },

  setUnitID({ commit }, unitID) {
    commit(mutations.SET_UNIT_ID.name, unitID)
  },

  setSeason({ commit }, season) {
    commit(mutations.SET_SEASON.name, season)
  },

  setUnitPermissions({ commit }, unitPermissions) {
    commit(mutations.SET_UNIT_PERMISSIONS.name, unitPermissions)
  },

  setUnitActiveSubscription({ commit }, unitActiveSubscription) {
    commit(mutations.SET_UNIT_ACTIVE_SUBSCRIPTION.name, unitActiveSubscription)
  }
}
