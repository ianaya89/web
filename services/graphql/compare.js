import gql from 'graphql-tag'
import { mapValues, omit } from 'lodash'
import {
  currencyFormatter,
  dateFormatter,
  numberFormatter,
  percentageFormatter
} from '../../plugins/filters'
import { normalizeCategoryName, get } from '../helpers'

export const CompareItemsQuery = {
  mock: [],
  query: gql`
    query CompareItems(
      $ids: [ID!]
      $season: SeasonAttr!
      $seasonString: String!
    ) {
      compareMarketplaceItems(ids: $ids) {
        id
        slots {
          id
          slot
          quantity
        }
        price
        category {
          id
          name
          target
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
              teamLeagues(season: $season) {
                league {
                  id
                  name
                  logo {
                    url
                  }
                }
              }
              groupedSocialAccounts {
                type
                followersCount
              }
              socialAccounts {
                id
                name
                followersCount
                type
                precalcs(periodicity: SEASONAL, season: $seasonString) {
                  data {
                    totalEngagement
                  }
                }
              }
              precalcs(periodicity: SEASONAL, season: $seasonString) {
                data {
                  reach {
                    totalAttendance
                    uniqueWebsiteVisits
                    socialMedia
                    broadcasting
                    printOutdoor
                    emailsSent
                  }
                  fans {
                    seasonTicket
                    members
                    newsletter
                    crm
                    mobileApp
                  }
                  genderSplit {
                    male
                    female
                    unknown
                  }
                  ageSplit {
                    group17
                    group18
                    group25
                    group35
                    group45
                    group55
                    group65
                  }
                  matchVisitors {
                    avgStadiumAttendance
                  }
                }
              }
              city {
                id
                name
              }
              country {
                id
                name
              }
              profile {
                founded
              }
              teamStadiums(season: { get: SPECIFIC, value: $seasonString }) {
                stadium {
                  id
                  precalcs(periodicity: SEASONAL, season: $seasonString) {
                    data {
                      capacity
                      visitorsPerMatch
                      visitorsTotal
                      businessSeats
                      skyboxes
                    }
                  }
                }
                metaData {
                  visitorsPerMatch
                  matchesCount
                  visitorsTotal
                }
              }
            }
            ... on League {
              groupedSocialAccounts {
                type
                followersCount
              }
              socialAccounts {
                id
                type
                precalcs(periodicity: SEASONAL, season: $seasonString) {
                  data {
                    totalEngagement
                  }
                }
              }
              precalcs(periodicity: SEASONAL, season: $seasonString) {
                data {
                  reach {
                    totalAttendance
                    uniqueWebsiteVisits
                    socialMedia
                    broadcasting
                    printOutdoor
                    emailsSent
                  }
                  fans {
                    seasonTicket
                    members
                    newsletter
                    website
                    socialMedia
                  }
                  genderSplit {
                    male
                    female
                    unknown
                  }
                  ageSplit {
                    group17
                    group18
                    group25
                    group35
                    group45
                    group55
                    group65
                  }
                }
              }
              country {
                id
                name
              }
              profile {
                founded
              }
            }
          }
        }
      }
    }
  `,
  fetchPolicy: 'network-only',
  update(data) {
    data.compareMarketplaceItems = get(data, 'compareMarketplaceItems', []).map(
      item => {
        const stadiumData = {
          capacity: get(
            item,
            'unit.entity.teamStadiums.0.stadium.precalcs.0.data.capacity'
          ),
          visitorsPerMatch: get(
            item,
            'unit.entity.teamStadiums.0.metaData.visitorsPerMatch'
          ),
          visitorsTotal: get(
            item,
            'unit.entity.teamStadiums.0.metaData.visitorsTotal'
          ),
          businessSeats: get(
            item,
            'unit.entity.teamStadiums.0.stadium.precalcs.0.data.businessSeats'
          ),
          skyboxes: get(
            item,
            'unit.entity.teamStadiums.0.stadium.precalcs.0.data.skyboxes'
          )
        }

        return {
          inventoryName: [
            item.category.target === 'package'
              ? 'package.title'
              : normalizeCategoryName(item.category.path.split(' / ')[0]),
            normalizeCategoryName(
              item.category.name,
              item.category.target === 'package'
            )
          ],
          price: currencyFormatter(item.price),
          availableTime: (item.slots || []).map(s => s.slot).join(', '),
          basic: {
            id: item.id,
            logo: item.unit.entity.logo.url,
            title: item.unit.entity.name,
            unit_id: item.unit.id,
            visits: item.unit.entity.precalcs[0].data.reach.uniqueWebsiteVisits,
            info: ''
          },
          sections: {
            general: {
              founded: dateFormatter(item.unit.entity.profile.founded),
              location: `${get(item, 'unit.entity.city.name', '')}, ${get(
                item,
                'unit.entity.country.name',
                ''
              )}`,
              stadiumCapacity: numberFormatter(
                get(
                  item,
                  'unit.entity.teamStadiums.0.stadium.precalcs.0.data.capacity',
                  null
                )
              ),
              averageAttendance: numberFormatter(
                get(
                  item,
                  'unit.entity.teamStadiums.0.metaData.visitorsPerMatch',
                  null
                )
              )
            },
            gender: omit(
              mapValues(
                get(item, 'unit.entity.precalcs.0.data.genderSplit', {}),
                reachItemValue => percentageFormatter(reachItemValue)
              ),
              ['__typename']
            ),
            age: omit(
              mapValues(
                get(item, 'unit.entity.precalcs.0.data.ageSplit', {}),
                reachItemValue => percentageFormatter(reachItemValue)
              ),
              ['__typename']
            ),
            socialmedia: omit(get(item, 'unit.entity.socialAccounts'), [
              '__typename'
            ]),
            fans: omit(
              mapValues(
                get(item, 'unit.entity.precalcs.0.data.fans', {
                  total: null,
                  seasonTicket: null,
                  members: null,
                  newsletter: null,
                  crm: null,
                  mobileApp: null
                }),
                fansItemValue => numberFormatter(fansItemValue)
              ),
              ['__typename']
            ),
            stadium: omit(
              mapValues(stadiumData, stadiumItemValue => {
                if (typeof stadiumItemValue === 'boolean') {
                  return {
                    translate: true,
                    value: stadiumItemValue
                  }
                } else {
                  return numberFormatter(stadiumItemValue)
                }
              }),
              ['__typename']
            ),
            league: {
              leagueName: get(
                item,
                'unit.entity.teamLeagues.0.league.name',
                '-'
              )
            }
          }
        }
      }
    )

    return data.compareMarketplaceItems
  }
}
