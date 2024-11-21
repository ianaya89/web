import { shallowMount } from '@vue/test-utils'
import LeaguePosition from '@/components/widgets/LeaguePosition'
// import Vue from 'vue'

describe('LeaguePosition', () => {
  it('formats chart data correctly', () => {
    const wrapper = shallowMount(LeaguePosition)

    expect(
      wrapper.vm.formatPositionForChart({
        league: {
          stage: 1,
          name: 'foo'
        },
        position: 1
      })
    ).toEqual(parseFloat('1.01'))

    expect(
      wrapper.vm.formatPositionForChart({
        league: {
          stage: 1,
          name: 'foo'
        },
        position: 2
      })
    ).toEqual(parseFloat('1.05'))

    expect(
      wrapper.vm.formatPositionForChart({
        league: {
          stage: 1,
          name: 'foo'
        },
        position: 10
      })
    ).toEqual(parseFloat('1.45'))

    expect(
      wrapper.vm.formatPositionForChart({
        league: {
          stage: 1,
          name: 'foo'
        },
        position: 11
      })
    ).toEqual(parseFloat('1.501'))

    expect(
      wrapper.vm.formatPositionForChart({
        league: {
          stage: 1,
          name: 'foo'
        },
        position: 15
      })
    ).toEqual(parseFloat('1.701'))
  })
})
