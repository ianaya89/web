import sinon from 'sinon'
import { state, getters, mutations, actions } from '@/store/active'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('ActiveStore', () => {
  const defaultState = extendState({})

  describe('getters', () => {
    it('provides a default season', () => {
      expect(getters.getSeason(defaultState)).not.toBeNull()
    })

    it('checks default timezone', () => {
      expect(getters.getTimeZone(defaultState)).not.toBeNull()
    })

    it('provides unit type', () => {
      const teamUnitState = extendState({ unitType: 'team' })

      expect(getters.unitType(teamUnitState)).toEqual('team')
    })

    it('check if unit type is team', () => {
      const teamUnitState = extendState({ unitType: 'team' })

      expect(getters.unitType(teamUnitState)).toEqual('team')
      expect(getters.isTeamActive(teamUnitState)).toBeTruthy()
    })

    it('check if unit type is brand', () => {
      const brandUnitState = extendState({ unitType: 'brand' })

      expect(getters.unitType(brandUnitState)).toEqual('brand')
      expect(getters.isBrandActive(brandUnitState)).toBeTruthy()
    })

    it('check if unit type is league', () => {
      const leagueUnitState = extendState({ unitType: 'league' })

      expect(getters.unitType(leagueUnitState)).toEqual('league')
      expect(getters.isLeagueActive(leagueUnitState)).toBeTruthy()
    })

    it('provides unit type category based on unit type', () => {
      const brandUnitState = extendState({ unitType: 'brand' })
      const teamUnitState = extendState({ unitType: 'team' })

      expect(getters.unitTypeCategory(brandUnitState)).toEqual('buyer')
      expect(getters.unitTypeCategory(teamUnitState)).toEqual('seller')
    })
  })

  describe('mutations', () => {
    it('set timezone', () => {
      const state = extendState({})

      mutations.SET_TIMEZONE(state, 'Europe/Berlin')

      expect(state.timezone).toBe('Europe/Berlin')
    })

    it('set unit type', () => {
      const state = extendState({})

      mutations.SET_UNIT_TYPE(state, 'brand')

      expect(state.unitType).toBe('brand')
    })

    it('set season', () => {
      const state = extendState({})
      const newSeason = {
        id: 10,
        name: '2018/19',
        from: '2018/07/01',
        to: '2019/06/30'
      }

      mutations.SET_SEASON(state, newSeason)

      expect(state.season).toBe(newSeason)
    })
  })

  describe('actions', () => {
    it('set timezone', () => {
      const commit = sinon.spy()

      actions.setTimezone({ commit, state: defaultState }, 'Europe/Berlin')

      expect(commit.args).toEqual([
        [mutations.SET_TIMEZONE.name, 'Europe/Berlin']
      ])
    })

    it('set unit type', () => {
      const commit = sinon.spy()

      actions.setUnitType({ commit, state: defaultState }, 'brand')

      expect(commit.args).toEqual([[mutations.SET_UNIT_TYPE.name, 'brand']])
    })

    it('set season', () => {
      const commit = sinon.spy()
      const newSeason = {
        id: 10,
        name: '2018/19',
        from: '2018/07/01',
        to: '2019/06/30'
      }

      actions.setSeason(
        {
          commit,
          state: defaultState
        },
        newSeason
      )

      expect(commit.args).toEqual([[mutations.SET_SEASON.name, newSeason]])
    })
  })
})
