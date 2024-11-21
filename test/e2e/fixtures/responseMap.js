import { stubQuery } from '../support/helpers'
import { LandingPageMapQuery } from '@/test/e2e/fixtures/responses'
import {
  ACTIVE_UNIT_QUERY,
  CampaignsPaginatedQuery,
  ContactsQuery,
  CountriesQuery,
  INVENTORY_ITEM_DUPLICATE_QUERY,
  CreateCampaignMutation,
  DealsQuery,
  FilteredPostsQuery,
  INDUSTRIES_QUERY,
  INVENTORY_ITEM_QUERY,
  InventoryItemMutation,
  LeagueQuery,
  LoginMutation,
  MARKETPLACE_CATEGORIES_QUERY,
  MeQuery,
  NotificationsQuery,
  PageVisitedMutation,
  SinglePostQuery,
  SocialAccountsQuery,
  SubmitContactMutation,
  SubmitNewsletter,
  TagsQuery,
  TEAM_SEARCH_APPEARANCES_QUERY,
  TopPostsQuery,
  UNIT_HEADER_QUERY,
  UNIT_INVENTORY_QUERY,
  UNIT_INVENTORY_STATUS_QUERY,
  UNIT_PROFILE_VIEWS_QUERY,
  UNIT_TOP_SOCIAL_MEDIA_QUERY,
  UserNotificationsUpdateMutation,
  UserPasswordUpdateMutation,
  UserUpdateMutation,
  InventoryItemUpdateMutation,
  UnitPackagesQuery,
  InventoryPackageMutation,
  InventoryPackageUpdateMutation,
  MarketplaceMapQuery,
  LeaguesQuery,
  TeamsQuery
} from '@/services/graphql'

module.exports = [
  stubQuery(TagsQuery.query),
  stubQuery(TopPostsQuery.query),
  stubQuery(
    FilteredPostsQuery.query,
    {
      author: 'Kailey Kertzmann MD'
    },
    'FilteredBlogPostsAuthor'
  ),
  stubQuery(
    FilteredPostsQuery.query,
    {
      tag: 'quis'
    },
    'FilteredBlogPostsTag'
  ),
  stubQuery(SinglePostQuery.query, {
    postId: 1
  }),
  stubQuery(CountriesQuery.query),
  stubQuery(LeaguesQuery.query),
  stubQuery(TeamsQuery.query, {
    season: '2021/22'
  }),
  stubQuery(LoginMutation.mutation, {
    email: 'engineering@sponsoronline.eu',
    password: 'secret'
  }),
  stubQuery(SubmitNewsletter.mutation, {
    email: Math.round(Math.random() * 10000) + '@email.com',
    meta: ''
  }),
  stubQuery(
    LoginMutation.mutation,
    {
      email: 'engineering@sponsoronline.eu',
      password: 'invalid'
    },
    'LoginInvalid'
  ),
  stubQuery(
    LoginMutation.mutation,
    {
      email: 'missing@sponsoronline.eu',
      password: 'secret'
    },
    'Login404'
  ),
  stubQuery(MeQuery.query),
  stubQuery(MarketplaceMapQuery.query),
  stubQuery(LandingPageMapQuery.query),
  stubQuery(UNIT_INVENTORY_QUERY, { id: 1 }),
  stubQuery(MARKETPLACE_CATEGORIES_QUERY),
  stubQuery(INDUSTRIES_QUERY),
  stubQuery(NotificationsQuery.query),
  stubQuery(ACTIVE_UNIT_QUERY, {
    id: 1
  }),
  stubQuery(CampaignsPaginatedQuery.query, {
    id: 1,
    size: 10
  }),
  stubQuery(UNIT_PROFILE_VIEWS_QUERY, {
    id: 1,
    page: 'PROFILE'
  }),
  stubQuery(TEAM_SEARCH_APPEARANCES_QUERY, {
    id: 1
  }),
  stubQuery(ContactsQuery.query, {
    id: 1
  }),
  stubQuery(DealsQuery.query, {
    id: 1
  }),
  stubQuery(UNIT_TOP_SOCIAL_MEDIA_QUERY, {
    id: 1
  }),
  stubQuery(INVENTORY_ITEM_DUPLICATE_QUERY, {
    ids: [105]
  }),
  stubQuery(
    INVENTORY_ITEM_QUERY,
    {
      itemId: 96,
      season: {
        get: 'SPECIFIC',
        value: '2019/20'
      }
    },
    'MarketplaceItemPackage'
  ),
  stubQuery(INVENTORY_ITEM_QUERY, {
    itemId: 48,
    season: {
      get: 'SPECIFIC',
      value: '2019/20'
    }
  }),
  stubQuery(UNIT_INVENTORY_STATUS_QUERY, {
    id: 1
  }),
  stubQuery(SocialAccountsQuery.query, {
    id: 1
  }),
  stubQuery(UNIT_HEADER_QUERY, {
    id: 1,
    season: '2018/19'
  }),
  stubQuery(LeagueQuery.query, {
    id: 1,
    season: '2018/19'
  }),
  stubQuery(UnitPackagesQuery.query, {
    id: 1,
    season: '2018/19'
  }),
  stubQuery(PageVisitedMutation.mutation, {
    input: {
      page: 'DASHBOARD',
      actor_unit_id: 1,
      target_unit_id: 1
    }
  }),
  stubQuery(SubmitContactMutation.mutation, {
    input: {
      email: Math.round(Math.random() * 10000) + '@email.com',
      name: 'some name',
      company: 'some company',
      organizationUnit: {
        connect: 1
      }
    }
  }),
  stubQuery(CreateCampaignMutation.mutation, {
    input: {
      name: 'asd',
      message: 'message',
      send_at: '2020-12-20 20:30:00',
      organizationUnit: {
        connect: 1
      },
      inventoryItems: {
        connect: [1]
      },
      packageItems: {
        connect: []
      },
      recipients: {
        connect: [1]
      }
    }
  }),
  stubQuery(UserUpdateMutation.mutation, {
    id: 1,
    input: {
      email: 'engineering@sponsoronline.eu',
      firstName: 'asdsad',
      lastName: 'sadsad',
      phoneNumber: '213123123123',
      jobTitle: 'asdasda',
      timezone: 'Europe/Bratislava'
    }
  }),
  stubQuery(UserPasswordUpdateMutation.mutation, {
    id: 1,
    password: 'secret'
  }),
  stubQuery(UserNotificationsUpdateMutation.mutation, {
    id: 1,
    input: {
      settings: {}
    }
  }),
  stubQuery(
    UserUpdateMutation.mutation,
    {
      id: 1,
      input: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        jobTitle: '',
        timezone: ''
      }
    },
    'UserUpdateMutationError'
  ),
  stubQuery(InventoryItemMutation.mutation, {
    input: {
      price: 1000,
      slotType: 'season',
      slots: [{ slot: '2019/20', quantity: 10 }],
      isSoldSeparately: true,
      visibleFrom: '2020-12-20 23:59:59',
      dimensions: '1000',
      description: 'Some basic description',
      organizationUnit: {
        sync: 1
      },
      category: {
        sync: 3
      }
    }
  }),
  stubQuery(InventoryItemUpdateMutation.mutation, {
    id: 48,
    input: {
      price: 1010302.64,
      slotType: 'date',
      slots: [{ slot: '2019-08-19', quantity: 3 }],
      isSoldSeparately: true,
      visibleFrom: '2019-08-06 23:59:59',
      dimensions: '20',
      description: 'Some basic description'
    }
  }),
  stubQuery(InventoryPackageUpdateMutation.mutation, {
    id: 96,
    input: {
      price: 1010302.64,
      slotType: 'date',
      slots: [{ slot: '2019-08-19', quantity: 3 }],
      visibleFrom: '2019-08-06 23:59:59',
      description: 'Some basic description',
      children: {
        sync: [92]
      }
    }
  }),
  stubQuery(InventoryPackageMutation.mutation, {
    input: {
      price: 1010302.64,
      slotType: 'date',
      slots: [{ slot: '2019-08-19', quantity: 3 }],
      visibleFrom: '2019-08-06 23:59:59',
      description: 'Some basic description',
      organizationUnit: {
        sync: 1
      },
      children: {
        sync: [92]
      },
      category: {
        sync: 136
      }
    }
  })
]
