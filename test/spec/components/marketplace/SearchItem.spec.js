import { shallowMount } from '@vue/test-utils'
import SearchItem from '@/components/marketplace/SearchItem'

describe('SearchItem', () => {
  it('renders SearchItem', () => {
    const wrapper = shallowMount(SearchItem, {
      propsData: {
        item: {
          id: 1,
          nameOverride: 'Name',
          itemType: 'inventory',
          price: 500,
          category: 'a / b / c',
          unit: {
            entity: {
              name: 'test',
              logo: {
                url: ''
              }
            }
          }
        }
      },

      mocks: {
        $store: {
          getters: {
            'compare/isInCompare': jest.fn()
          }
        },
        $helpers: {
          normalizeCategoryName: jest.fn(),
          firstCategory: jest.fn(),
          secondaryCategory: jest.fn(),
          tertiaryCategory: jest.fn()
        },
        $route: {
          params: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('checks if item is in compare', () => {
    const wrapper = shallowMount(SearchItem, {
      propsData: {
        item: {
          id: 1,
          nameOverride: 'Name',
          itemType: 'inventory',
          price: 500,
          category: 'a / b / c',
          unit: {
            entity: {
              name: 'test',
              logo: {
                url: ''
              }
            }
          }
        }
      },

      mocks: {
        $store: {
          getters: {
            'compare/isInCompare': id => id === 1
          }
        },
        $helpers: {
          normalizeCategoryName: jest.fn(),
          firstCategory: jest.fn(),
          secondaryCategory: jest.fn(),
          tertiaryCategory: jest.fn()
        },
        $route: {
          params: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.vm.isInCompare).toBeTruthy()

    wrapper.setProps({
      item: {
        id: 2,
        nameOverride: 'Name',
        itemType: 'inventory',
        price: 500,
        category: 'a / b / c',
        unit: {
          entity: {
            name: 'test',
            logo: {
              url: ''
            }
          }
        }
      }
    })

    expect(wrapper.vm.isInCompare).toBeFalsy()
  })

  it('returns items in package', () => {
    const wrapper = shallowMount(SearchItem, {
      propsData: {
        item: {
          id: 1,
          nameOverride: 'Name',
          itemType: 'package',
          children: [
            {
              category: {
                name: 'a'
              }
            },
            {
              category: {
                name: 'b'
              }
            }
          ],
          price: 500,
          category: 'a / b / c',
          unit: {
            entity: {
              name: 'test',
              logo: {
                url: ''
              }
            }
          }
        }
      },

      mocks: {
        $store: {
          getters: {
            'compare/isInCompare': jest.fn()
          }
        },
        $helpers: {
          normalizeCategoryName: name => name,
          firstCategory: jest.fn(),
          secondaryCategory: jest.fn(),
          tertiaryCategory: jest.fn()
        },
        $route: {
          params: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.vm.itemsInPackage).toEqual(
      'TRANSLATE:app.marketplace.categories.a, TRANSLATE:app.marketplace.categories.b'
    )
  })

  it('shows item on click', () => {
    const router = []

    const wrapper = shallowMount(SearchItem, {
      propsData: {
        item: {
          id: 1,
          nameOverride: 'Name',
          itemType: 'package',
          children: [
            {
              category: {
                name: 'a'
              }
            },
            {
              category: {
                name: 'b'
              }
            }
          ],
          price: 500,
          category: 'a / b / c',
          unit: {
            entity: {
              name: 'test',
              logo: {
                url: ''
              }
            }
          }
        }
      },

      mocks: {
        $store: {
          getters: {
            'compare/isInCompare': jest.fn()
          }
        },
        $helpers: {
          normalizeCategoryName: jest.fn(),
          firstCategory: jest.fn(),
          secondaryCategory: jest.fn(),
          tertiaryCategory: jest.fn()
        },
        $route: {
          params: {
            id: 1
          }
        },
        $router: {
          push: path => router.push(path)
        }
      }
    })

    wrapper.vm.onShowItemClick()

    expect(router.length).toEqual(1)
    expect(router[0]).toEqual({
      name: 'unit-id-marketplace-item-itemId',
      params: {
        id: 1,
        itemId: 1
      }
    })
  })

  it('links to unit', () => {
    const router = []

    const wrapper = shallowMount(SearchItem, {
      propsData: {
        item: {
          id: 1,
          nameOverride: 'Name',
          itemType: 'package',
          children: [
            {
              category: {
                name: 'a'
              }
            },
            {
              category: {
                name: 'b'
              }
            }
          ],
          price: 500,
          category: 'a / b / c',
          unit: {
            id: 2,
            entity: {
              name: 'test',
              logo: {
                url: ''
              }
            }
          }
        }
      },

      mocks: {
        $store: {
          getters: {
            'compare/isInCompare': jest.fn()
          }
        },
        $helpers: {
          normalizeCategoryName: jest.fn(),
          firstCategory: jest.fn(),
          secondaryCategory: jest.fn(),
          tertiaryCategory: jest.fn()
        },
        $route: {
          params: {
            id: 1
          }
        },
        $router: {
          push: path => router.push(path)
        }
      }
    })

    wrapper.vm.linkToUnit()

    expect(router.length).toEqual(1)
    expect(router[0]).toEqual({
      name: 'unit-id-marketplace-unit-unitId-inventory',
      params: {
        id: 1,
        unitId: 2
      }
    })
  })

  it('add item to compare', () => {
    let dispatch
    let idAddedToCompare

    const wrapper = shallowMount(SearchItem, {
      propsData: {
        item: {
          id: 5,
          nameOverride: 'Name',
          itemType: 'package',
          children: [
            {
              category: {
                name: 'a'
              }
            },
            {
              category: {
                name: 'b'
              }
            }
          ],
          price: 500,
          category: 'a / b / c',
          unit: {
            id: 2,
            entity: {
              name: 'test',
              logo: {
                url: ''
              }
            }
          }
        }
      },

      mocks: {
        $store: {
          getters: {
            'compare/isInCompare': jest.fn()
          },
          dispatch: (n, i) => {
            dispatch = n
            idAddedToCompare = i
          }
        },
        $helpers: {
          normalizeCategoryName: jest.fn(),
          firstCategory: jest.fn(),
          secondaryCategory: jest.fn(),
          tertiaryCategory: jest.fn()
        },
        $route: {
          params: {
            id: 1
          }
        }
      }
    })

    wrapper.vm.onAddToCompareClick()

    expect(dispatch).toEqual('compare/add')
    expect(idAddedToCompare).toEqual(5)
  })
})
