import gql from 'graphql-tag'

export const MARKETPLACE_CATEGORIES_QUERY = gql`
  query MarketplaceCategories {
    marketplaceCategories {
      id
      name
      path
      layer
      suggestedSlotType
      target
      description
      parent {
        id
      }
    }
  }
`

export const MARKETPLACE_MAP_QUERY = gql`
  query MarketplaceMapQuery {
    valuationMap {
      country {
        id
        name
      }
      valuation
    }
  }
`

export const LANDING_PAGE_MAP_QUERY = gql`
  query LandingPageMapQuery {
    countriesValuationMap {
      country {
        id
        name
      }
      valuation
    }
  }
`

export const MARKETPLACE_ITEMS_BY_IDS_QUERY = gql`
  query MarketplaceItems($ids: [ID!]) {
    marketplaceItemsByIds(ids: $ids) {
      id
      price
      itemType
      category {
        id
        name
        path
      }
      unit {
        id
        entity {
          id
          name
          logo {
            url
          }
          ... on Team {
            city {
              id
              name
              latitude
              longitude
            }
            country {
              id
              name
            }
          }
          ... on League {
            country {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const MARKETPLACE_ITEMS_QUERY = gql`
  query MarketplaceItems {
    marketplaceItems {
      id
      price
      priceTo
      itemType
      category {
        id
        name
        path
      }
      unit {
        id
        entity {
          id
          name
          logo {
            url
          }
          ... on Team {
            city {
              id
              name
              latitude
              longitude
            }
            country {
              id
              name
            }
          }
          ... on League {
            city {
              id
              name
              latitude
              longitude
            }
            country {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const MARKETPLACE_SEARCH_RANGES_QUERY = gql`
  query MarketplaceSearchRanges {
    marketplaceSearchRanges {
      budget
    }
  }
`

export const MARKETPLACE_SEARCH_QUERY = gql`
  query MarketplaceSearch(
    $id: ID!
    $page: Int = 1
    $size: Int!
    $searchProps: SearchFilterInput
    $orderBy: OrderByInput = { order: "ASC", field: "price" }
  ) {
    marketplaceSearch(
      id: $id
      count: $size
      page: $page
      filter: $searchProps
      orderBy: $orderBy
    ) {
      data {
        id
        nameOverride
        price
        priceTo
        itemType
        children {
          id
          category {
            id
            name
          }
        }
        category {
          id
          name
          path
        }
        unit {
          id
          entity {
            id
            name
            logo {
              url
            }
            ... on Team {
              city {
                id
                latitude
                longitude
              }
            }
          }
        }
      }
      paginatorInfo {
        lastPage
        total
      }
    }
  }
`

export const INVENTORY_ITEM_LIGHT_QUERY = gql`
  query MarketplaceItem($itemId: ID!) {
    marketplaceItem(id: $itemId) {
      id
      category {
        id
        name
        path
      }
      description
      itemType
      price
    }
  }
`

export const INVENTORY_ITEM_DELETE_QUERY = gql`
  query MarketplaceItemDelete($ids: [ID!]!) {
    deleteMarketplaceItems(id: $ids) {
      id
    }
  }
`

export const INVENTORY_ITEM_DUPLICATE_QUERY = gql`
  query MarketplaceItemDuplicate($ids: [ID!]!) {
    duplicateMarketplaceItems(id: $ids) {
      id
    }
  }
`

export const INVENTORY_ITEM_QUERY = gql`
  query MarketplaceItem($itemId: ID!, $season: SeasonAttr!) {
    marketplaceItem(id: $itemId) {
      id
      nameOverride
      expiredAt
      description
      dimensions
      images {
        url
      }
      visibleFrom
      price
      priceTo
      slots {
        id
        slot
        quantity
        expiredAt
      }
      specialPricing {
        type
        meta {
          coefficient
          conditionType
          conditionValue
        }
      }
      slotType
      isBroadcasted
      isSoldSeparately
      itemType
      children {
        id
        dimensions
        description
        nameOverride
        category {
          id
          name
          path
        }
      }
      excludedIndustries {
        id
        name
      }
      category {
        id
        name
        path
        suggestedSlotType
      }
      unit {
        id
        entity {
          id
          name
          logo {
            url
          }
          ... on Team {
            country {
              id
              name
            }
            teamLeagues(season: $season) {
              league {
                id
                name
              }
            }
          }
          ... on League {
            country {
              id
              name
            }
          }
        }
      }
    }
  }
`
export const INVENTORY_PACKAGE_QUERY = gql`
  query MarketplaceItem($itemId: ID!) {
    marketplaceItem(id: $itemId) {
      id
      nameOverride
      description
      visibleFrom
      price
      slots {
        id
        slot
        quantity
      }
      specialPricing {
        type
        meta {
          coefficient
          conditionType
          conditionValue
        }
      }
      slotType
      children {
        id
        nameOverride
        category {
          id
          name
          path
        }
      }
      excludedIndustries {
        id
      }
      category {
        id
        name
        path
      }
    }
  }
`

export const InventoryItemMutation = {
  mutation: gql`
    mutation InventoryItemMutation($input: CreateInventoryInput!) {
      createInventory(input: $input) {
        id
        price
      }
    }
  `
}

export const InventoryPackageMutation = {
  mutation: gql`
    mutation InventoryPackageMutation($input: CreatePackageInput!) {
      createPackage(input: $input) {
        id
        price
      }
    }
  `
}

export const InventoryPackageUpdateMutation = {
  mutation: gql`
    mutation InventoryPackageUpdateMutation(
      $id: ID!
      $input: UpdatePackageInput!
    ) {
      updatePackage(id: $id, input: $input) {
        id
        price
        children {
          id
        }
        excludedIndustries {
          id
        }
      }
    }
  `
}

export const InventoryItemUpdateMutation = {
  mutation: gql`
    mutation InventoryItemUpdateMutation(
      $id: ID!
      $input: UpdateInventoryInput!
    ) {
      updateInventory(id: $id, input: $input) {
        id
        price
      }
    }
  `
}

export const MarketplaceSearchQuery = {
  mock: { data: [], paginatorInfo: { lastPage: 1, total: 0 } },
  query: MARKETPLACE_SEARCH_QUERY
}

export const MarketplaceMapQuery = {
  mock: [],
  query: MARKETPLACE_MAP_QUERY,
  result: data => {
    const ukValuation = data.data.valuationMap.reduce((valuation, entry) => {
      if (
        ['England', 'Wales', 'Scotland', 'Ireland'].includes(entry.country.name)
      ) {
        valuation += entry.valuation
      }

      return valuation
    }, 0)

    // UK summary valuation
    data.data.valuationMap.push({
      country: {
        id: 100,
        name: 'United Kingdom',
        __typename: 'Country'
      },
      valuation: ukValuation || 0
    })

    return data
  }
}

export const LandingPageMapQuery = {
  mock: [],
  query: LANDING_PAGE_MAP_QUERY,
  result: data => {
    const ukValuation = data.data.countriesValuationMap.reduce(
      (valuation, entry) => {
        if (
          ['England', 'Wales', 'Scotland', 'Ireland'].includes(
            entry.country.name
          )
        ) {
          valuation += entry.valuation
        }

        return valuation
      },
      0
    )

    // UK summary valuation
    data.data.countriesValuationMap.push({
      country: {
        id: 100,
        name: 'United Kingdom',
        __typename: 'Country'
      },
      valuation: ukValuation || 0
    })

    return data
  }
}

export const MarketplaceItemsQuery = {
  mock: [],
  query: MARKETPLACE_ITEMS_QUERY
}

export const MarketplaceItemsByIdsQuery = {
  mock: [],
  query: MARKETPLACE_ITEMS_BY_IDS_QUERY
}

export const MarketplaceSearchRangesQuery = {
  mock: { budget: 100000000 },
  query: MARKETPLACE_SEARCH_RANGES_QUERY
}

export const MarketplaceMainCategoriesQuery = {
  mock: [],
  query: MARKETPLACE_CATEGORIES_QUERY,
  update(data) {
    return data.marketplaceCategories.filter(
      entry => entry.layer === '1' && entry.target === 'inventory'
    )
  }
}

export const MarketplaceMainSecondaryCategoriesQuery = {
  mock: [],
  query: MARKETPLACE_CATEGORIES_QUERY,
  update(data) {
    return data.marketplaceCategories.filter(
      entry =>
        ['1', '2'].indexOf(entry.layer) !== -1 && entry.target === 'inventory'
    )
  }
}

export const MarketplacePackagesCategoriesQuery = {
  mock: [],
  query: MARKETPLACE_CATEGORIES_QUERY,
  update(data) {
    return data.marketplaceCategories.filter(
      entry => entry.layer === '1' && entry.target === 'package'
    )
  }
}

export const MarketplaceCategoriesQuery = {
  mock: [],
  query: MARKETPLACE_CATEGORIES_QUERY,
  update(data) {
    return data.marketplaceCategories.filter(
      entry => entry.target === 'inventory'
    )
  }
}

export const InventoryItemLightQuery = {
  mock: { category: {}, dates: [] },
  query: INVENTORY_ITEM_LIGHT_QUERY
}

export const InventoryItemQuery = {
  mock: {
    category: { path: '' },
    slots: [],
    unit: { entity: { logo: {}, country: {}, teamLeagues: [{ league: {} }] } }
  },
  query: INVENTORY_ITEM_QUERY
}

export const InventoryPackageQuery = {
  mock: {
    category: { path: '' },
    slots: []
  },
  query: INVENTORY_PACKAGE_QUERY
}

export const InventoryItemDeleteQuery = {
  query: INVENTORY_ITEM_DELETE_QUERY
}

export const InventoryItemDuplicateQuery = {
  query: INVENTORY_ITEM_DUPLICATE_QUERY
}

export const InventoryRequestMutation = {
  mutation: gql`
    mutation InventoryRequest($input: InventoryRequestInput!) {
      inventoryRequest(input: $input)
    }
  `
}

export const SearchAppearanceMutation = {
  mutation: gql`
    mutation SearchAppearance($input: SearchAppearanceInput!) {
      searchAppearance(input: $input)
    }
  `
}
