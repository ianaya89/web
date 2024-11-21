import { shallowMount } from '@vue/test-utils'
import SearchSidebar from '@/components/marketplace/SearchSidebar'

describe('SearchSidebar', () => {
  it('renders SearchSidebar', () => {
    const wrapper = shallowMount(SearchSidebar, {
      mocks: {
        $route: {
          query: null
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets searchParams from query params', () => {
    const wrapper = shallowMount(SearchSidebar, {
      mocks: {
        $route: {
          query: {
            budget: [100, 200],
            totalFans: [200, 300]
          }
        }
      }
    })

    expect(wrapper.vm.searchParams.budget).toEqual([100, 200])
    expect(wrapper.vm.searchParams.totalFans).toEqual([200, 300])

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0][0]).toEqual(wrapper.vm.searchParams)
  })

  it('emits refetch query', () => {
    const wrapper = shallowMount(SearchSidebar, {
      mocks: {
        $route: {
          query: null
        }
      }
    })

    wrapper.vm.onSearchClicked()

    expect(wrapper.emitted('refetch-query')).toBeTruthy()
  })

  it('rebuilds url and emits change event', () => {
    jest.useFakeTimers()

    let dispatch
    let params
    const router = []

    const wrapper = shallowMount(SearchSidebar, {
      mocks: {
        $route: {
          query: null,
          params: {
            id: 4
          }
        },
        $store: {
          dispatch: (d, p) => {
            dispatch = d
            params = p
          }
        },
        $router: {
          push: r => router.push(r)
        }
      }
    })

    expect(wrapper.vm.rebuildingUrlTimeout).toBeNull()

    wrapper.vm.rebuildSlug()

    expect(wrapper.vm.rebuildingUrlTimeout).not.toBeNull()

    jest.runOnlyPendingTimers()

    expect(wrapper.emitted('change')).toBeTruthy()

    expect(dispatch).toEqual('proposal/setMarketplaceSearch')
    expect(params).toEqual(wrapper.vm.searchParams)

    expect(router.length).toEqual(1)
    expect(router[0]).toEqual({
      name: 'unit-id-marketplace-search',
      params: {
        id: 4
      },
      query: wrapper.vm.searchParams
    })
  })
})
