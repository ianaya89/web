import {
  LoginMutation,
  MeQuery,
  MarketplaceCategoriesQuery,
  MarketplaceItemsQuery,
  MarketplaceSearchRangesQuery,
  MarketplacePackagesCategoriesQuery,
  MarketplaceSearchQuery,
  MarketplaceMapQuery,
  SeasonsQuery,
  FeaturedQuery,
  NearbyQuery,
  NewestQuery,
  SearchAppearanceMutation
} from '../../../services/graphql'
import { stubQuery } from '../support/helpers'

module.exports = [
  stubQuery(LoginMutation.mutation, {
    email: 'brand@sponsoronline.eu',
    password: 'secret'
  }),
  stubQuery(MeQuery.query),
  stubQuery(MarketplaceCategoriesQuery.query),
  stubQuery(
    MarketplacePackagesCategoriesQuery.query,
    null,
    'MarketplacePackagesCategoriesQuery'
  ),
  stubQuery(MarketplaceItemsQuery.query),
  stubQuery(MarketplaceSearchRangesQuery.query),
  stubQuery(MarketplaceSearchQuery.query, {
    id: 75,
    page: 1,
    size: 9,
    searchProps: {},
    orderBy: { field: 'price', order: 'DESC' }
  }),
  stubQuery(SeasonsQuery.query),
  stubQuery(FeaturedQuery.query),
  stubQuery(NearbyQuery.query),
  stubQuery(NewestQuery.query),
  stubQuery(MarketplaceMapQuery.query),
  stubQuery(SearchAppearanceMutation.mutation, {
    input: {
      actor_unit_id: 1,
      target_unit_ids: [{ id: 1 }]
    }
  })
]
