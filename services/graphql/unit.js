import gql from 'graphql-tag'
import faker from 'faker'
import { get } from '../helpers'
import { mockArray, mockObjects } from './_mocks'

export const UNIT_HEADER_QUERY = gql`
  query UnitHeader($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        name
        logo {
          url
        }
        titlePhotos {
          url
        }
        ... on Team {
          country {
            id
            name
          }
          city {
            id
            name
          }
          profile {
            founded
            keyQuote
            vision
            fullTimeEmployeesCount
            academiesCount
            footballSchoolsCount
            partnerClubsCount
            youthPlayersCount
            coachesCount
            shareholders {
              name
            }
          }
          teamLeagues(season: { get: SPECIFIC, value: $season }) {
            league {
              id
              name
            }
          }
          teamStadiums(season: { get: SPECIFIC, value: $season }) {
            stadium {
              id
              name
              precalcs(season: "2022/23", periodicity: SEASONAL) {
                data {
                  capacity
                }
              }
            }
            metaData {
              visitorsPerMatch
              matchesCount
              visitorsTotal
            }
          }
          precalcs(season: "2022/23", periodicity: SEASONAL) {
            season {
              id
              name
            }
            data {
              matchVisitors {
                avgStadiumAttendance
              }
              finance {
                totalRevenue
              }
            }
          }
          trophies {
            id
            type {
              id
              name
              scope
            }
            season {
              id
              name
            }
            stage {
              name
              id
            }
          }
          milestones {
            id
            title
            description
            season {
              id
              name
            }
          }
          heroes {
            id
            name
            logo {
              url
            }
            description
          }
        }
        ... on League {
          country {
            id
            name
          }
          profile {
            founded
            keyQuote
            vision
            fullTimeEmployeesCount
            academiesCount
            footballSchoolsCount
            partnerClubsCount
            youthPlayersCount
            coachesCount
            shareholders {
              name
            }
          }
          trophies {
            id
            type {
              id
              name
              scope
            }
            season {
              id
              name
            }
            stage {
              name
            }
          }
          milestones {
            id
            title
            description
            season {
              id
              name
            }
          }
          heroes {
            id
            name
            logo {
              url
            }
            description
          }
          leagueTeams(season: { get: SPECIFIC, value: $season }) {
            team {
              id
              precalcs(season: $season, periodicity: SEASONAL) {
                season {
                  id
                  name
                }
                data {
                  finance {
                    totalRevenue
                  }
                }
              }
            }
          }
          precalcs(season: $season, periodicity: SEASONAL) {
            season {
              id
              name
            }
            data {
              matchVisitors {
                avgStadiumAttendance
                avgStadiumCapacity
              }
            }
          }
        }
      }
    }
  }
`

export const TEAM_LEAGUE_POSITIONS_QUERY = gql`
  query TEAM_LEAGUE_POSITIONS_QUERY($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          teamLeagues(season: { get: PAST }) {
            id
            position
            league {
              id
              name
              stage
            }
            season {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const TEAM_HISTORY_QUERY = gql`
  query TEAM_HISTORY_QUERY($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          teamLeagues(season: { get: PAST }) {
            id
            position
            league {
              id
              name
              stage
            }
            season {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const COUNTRY_UEFA_COEFFICIENTS_QUERY = gql`
  query CountryCoefficientsQuery($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on League {
          country {
            id
            uefaCoefficients {
              season {
                name
              }
              value
              position
            }
          }
        }
      }
    }
  }
`

export const TEAM_LEAGUE_QUERY = gql`
  query TeamLeaguePositions($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          city {
            id
            name
            latitude
            longitude
            info {
              description
              population
              district
              area
            }
          }
          teamLeagues(season: { get: SPECIFIC, value: $season }) {
            league {
              id
              name
              logo {
                url
              }
              country {
                id
                name
                info {
                  teamsCount
                  malePlayersCount
                  femalePlayersCount
                }
              }
              leagueTeams(season: { get: SPECIFIC, value: $season }) {
                team {
                  id
                  name
                  logo {
                    url
                  }
                  groupedSocialAccounts {
                    type
                    followersCount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const LeagueCountriesUEFACoefficients = {
  query: COUNTRY_UEFA_COEFFICIENTS_QUERY
}

export const TeamLeagueQuery = {
  query: TEAM_LEAGUE_QUERY
}

export const UNIT_FANS_OVERVIEW_QUERY = gql`
  query UnitFansOverview($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              fans {
                total
                seasonTicket
                members
                newsletter
                website
                socialMedia
                crm
                mobileApp
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              fans {
                total
                seasonTicket
                members
                newsletter
                website
                socialMedia
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_REACH_OVERVIEW_QUERY = gql`
  query UnitReachOverview($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          socialAccounts {
            name
            type
            followersCount
          }
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              reach {
                total
                totalAttendance
                emailsSent
                uniqueWebsiteVisits
                socialMedia
                broadcasting
                printOutdoor
              }
            }
          }
        }
        ... on League {
          socialAccounts {
            name
            type
            followersCount
          }
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              reach {
                total
                totalAttendance
                emailsSent
                uniqueWebsiteVisits
                socialMedia
                broadcasting
                printOutdoor
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_GENDER_SPLIT_QUERY = gql`
  query UnitGenderSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              genderSplit {
                male
                female
                unknown
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              genderSplit {
                male
                female
                unknown
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_EDUCATION_SPLIT_QUERY = gql`
  query UnitEducationSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              educationSplit {
                primary
                secondary
                bachelor
                master
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              educationSplit {
                primary
                secondary
                bachelor
                master
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_BROADCAST_COVERAGE_SPLIT_QUERY = gql`
  query UnitBroadcastCoverageSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              broadcastCoverageSplit {
                liveBroadcastHours
                delayedBroadcastHours
                broadcastedHighlightsHours
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              broadcastCoverageSplit {
                liveBroadcastHours
                delayedBroadcastHours
                broadcastedHighlightsHours
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_BROADCAST_VIEWERS_SPLIT_QUERY = gql`
  query UnitBroadcastViewersSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              broadcastViewersSplit {
                liveBroadcastViewers
                delayedBroadcastViewers
                broadcastedHighlightsViewers
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              broadcastViewersSplit {
                liveBroadcastViewers
                delayedBroadcastViewers
                broadcastedHighlightsViewers
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_SHARED_VIDEO_PLATFORMS_SPLIT_QUERY = gql`
  query UnitSharedVideoPlatformsSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              sharedVideoPlatformsSplit {
                youtube
                twitch
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              sharedVideoPlatformsSplit {
                youtube
                twitch
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_INCOME_SPLIT_QUERY = gql`
  query UnitIncomeSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              incomeSplit {
                group00
                group10
                group20
                group50
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              incomeSplit {
                group00
                group10
                group20
                group50
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_AGE_SPLIT_QUERY = gql`
  query UnitAgeSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
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
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
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
        }
      }
    }
  }
`

export const UNIT_STATUS_SPLIT_QUERY = gql`
  query UnitStatusSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              statusSplit {
                married
                divorced
                single
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              statusSplit {
                married
                divorced
                single
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_COUNTRY_SPLIT_QUERY = gql`
  query UnitCountrySplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              countrySplit {
                label
                value
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              countrySplit {
                label
                value
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_LANGUAGE_SPLIT_QUERY = gql`
  query UnitCountrySplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              languageSplit {
                label
                value
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              languageSplit {
                label
                value
              }
            }
          }
        }
      }
    }
  }
`

export const LEAGUE_SOCIAL_MEDIA_QUERY = gql`
  query LeagueSocialMedia($id: ID!, $season: String!) {
    leagueWithTeamsSocialAccounts(
      unitId: $id
      season: { get: SPECIFIC, value: $season }
    ) {
      id
      name
      type
      profilePicture {
        url
      }
      followersCount
      unit {
        entityName
      }
      precalcs(season: $season) {
        data {
          totalEngagement
        }
      }
    }
  }
`

export const TEAM_SOCIAL_MEDIA_QUERY = gql`
  query TeamSocialMedia($id: ID!, $season: String!) {
    teamWithPlayersSocialAccounts(
      unitId: $id
      season: { get: SPECIFIC, value: $season }
    ) {
      id
      name
      type
      profilePicture {
        url
      }
      followersCount
      unit {
        entityName
      }
      precalcs(season: $season) {
        data {
          totalEngagement
        }
      }
    }
  }
`

export const UNIT_TOP_SOCIAL_MEDIA_QUERY = gql`
  query UnitTopSocialMedia($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          socialAccounts {
            id
            posts(limit: 5, orderBy: { field: "engagement", order: "DESC" }) {
              id
              content
              reach
              engagement
              image {
                url
              }
              socialAccount {
                id
                url
                type
                profilePicture {
                  url
                }
                name
              }
            }
          }
        }
        ... on League {
          socialAccounts {
            id
            posts(limit: 5, orderBy: { field: "engagement", order: "DESC" }) {
              id
              content
              reach
              engagement
              image {
                url
              }
              socialAccount {
                id
                url
                type
                profilePicture {
                  url
                }
                name
              }
            }
          }
        }
      }
    }
  }
`

export const UnitTopSocialMediaQuery = {
  mock: [],
  query: UNIT_TOP_SOCIAL_MEDIA_QUERY
}

export const UNIT_PROFILE_VIEWS_QUERY = gql`
  query UnitProfileViews($id: ID!, $page: PageType!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          pageVisits(page: $page) {
            date
            count
          }
        }
        ... on League {
          pageVisits(page: $page) {
            date
            count
          }
        }
      }
    }
  }
`

export const TEAM_SEARCH_APPEARANCES_QUERY = gql`
  query TeamProfileSearchAppearances($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          searchAppearances {
            date
            count
          }
        }
        ... on League {
          searchAppearances {
            date
            count
          }
        }
      }
    }
  }
`

export const UnitProfileViewsQuery = {
  mock: { unit: { entity: { pageVisits: [] } } },
  query: UNIT_PROFILE_VIEWS_QUERY
}

export const TeamSearchAppearancesQuery = {
  mock: { unit: { entity: { searchAppearances: [] } } },
  query: TEAM_SEARCH_APPEARANCES_QUERY
}

export const UNIT_HASHTAGS_QUERY = gql`
  query UnitHashtagsSplit($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              hashtags {
                name
                value
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              hashtags {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`

export const UNIT_OVERALL_VALUATION_QUERY = gql`
  query UnitOverallVauation($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              overallValuation {
                stadium
                fans
                media
                team
                players
              }
              overallEngagement {
                picturesCount {
                  stadium
                  fans
                  media
                  team
                  players
                }
                videosCount {
                  stadium
                  fans
                  media
                  team
                  players
                }
                mentionsCount {
                  stadium
                  fans
                  media
                  team
                  players
                }
                hashtagsCount {
                  stadium
                  fans
                  media
                  team
                  players
                }
                brandedContentCount {
                  stadium
                  fans
                  media
                  team
                  players
                }
              }
            }
          }
        }
      }
    }
  }
`

export const UnitOverallValuationQuery = {
  query: UNIT_OVERALL_VALUATION_QUERY
}

export const TEAM_TRADITIONAL_MEDIA_EXPOSURES_QUERY = gql`
  query TeamTraditionalMediaExposures($id: ID!, $from: String!, $to: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          traditionalMediaExposures(from: $from, to: $to) {
            traditionalMedia {
              id
              name
              logo {
                url
              }
            }
            postsCount
            engagement
            valuation
          }
          traditionalMediaExposuresByDate(from: $from, to: $to) {
            traditionalMedia {
              id
              name
              logo {
                url
              }
            }
            valuation
            engagement
            publishedDate
          }
        }
      }
    }
  }
`

export const TeamTraditionalMediaExposuresQuery = {
  query: TEAM_TRADITIONAL_MEDIA_EXPOSURES_QUERY
}

export const TEAM_TRADITIONAL_MEDIA_QUERY = gql`
  query TeamTraditionalMedia($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          traditionalMedia {
            id
            name
            logo {
              url
            }
            type
            periodicity
          }
        }
      }
    }
  }
`

export const LEAGUE_TRADITIONAL_MEDIA_QUERY = gql`
  query LeagueTraditionalMedia($id: ID!) {
    league(id: $id) {
      id
      traditionalMedia {
        id
        name
        logo {
          url
        }
        type
        periodicity
      }
    }
  }
`

export const UNIT_BRANDED_ENGAGEMENT_QUERY = gql`
  query UnitBrandedEngagement($id: ID!, $from: String!, $to: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          brandedPostsByDate(from: $from, to: $to) {
            brand {
              id
              logo {
                url
              }
              name
            }
            engagement
            engagementValuation
            postsCount
            publishedDate
          }
        }
        ... on League {
          brandedPostsByDate(from: $from, to: $to) {
            brand {
              id
              logo {
                url
              }
              name
            }
            engagement
            engagementValuation
            postsCount
            publishedDate
          }
        }
      }
    }
  }
`

export const UnitBrandedEngagementQuery = {
  mock: [],
  query: UNIT_BRANDED_ENGAGEMENT_QUERY,
  update(data) {
    return get(data, 'unit.entity.brandedPostsByDate')
  }
}

export const UNIT_PLAYERS_QUERY = gql`
  query UnitPlayers($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          teamPlayers(season: { get: SPECIFIC, value: $season }) {
            player {
              id
              name
              logo {
                url
              }
              groupedSocialAccounts {
                type
                followersCount
              }
            }
          }
        }
        ... on League {
          leaguePlayers(season: { get: SPECIFIC, value: $season }) {
            player {
              id
              name
              logo {
                url
              }
              groupedSocialAccounts {
                type
                followersCount
              }
            }
            team {
              id
              name
              logo {
                url
              }
            }
          }
        }
      }
    }
  }
`

export const STADIUM_INFO_QUERY = gql`
  query StadiumInfo($id: ID!, $season: String!, $prevseason: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          teamStadiums(season: { get: SPECIFIC, value: $season }) {
            stadium {
              id
              photo {
                url
              }
              address {
                name
                latitude
                longitude
              }
              name
              precalcs(season: $prevseason, periodicity: SEASONAL) {
                data {
                  capacity
                  businessSeats
                  skyboxes
                  parking
                  trainingPitches
                  wifi
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
          leagueTeams(season: { get: SPECIFIC, value: $season }) {
            team {
              id
              teamStadiums(season: { get: SPECIFIC, value: $season }) {
                stadium {
                  id
                  photo {
                    url
                  }
                  address {
                    name
                    latitude
                    longitude
                  }
                  name
                  precalcs(season: $season, periodicity: SEASONAL) {
                    data {
                      capacity
                      businessSeats
                      skyboxes
                      parking
                      trainingPitches
                      wifi
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
          }
        }
      }
    }
  }
`

export const UNIT_REVENUE_SEASON_QUERY = gql`
  query UnitRevenueForSeason($id: ID!, $season: String!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              finance {
                domestic
                uefa
                commercial
                gate
                others
                totalRevenue
                enterpriseValue
                squadMarketValue
              }
            }
          }
        }
        ... on League {
          precalcs(season: $season, periodicity: SEASONAL) {
            data {
              finance {
                domestic
                uefa
                commercial
                gate
                others
                totalRevenue
                enterpriseValue
                squadMarketValue
              }
            }
          }
        }
      }
    }
  }
`

export const UnitRevenueSeasonQuery = {
  query: UNIT_REVENUE_SEASON_QUERY
}

export const UNIT_REVENUES_QUERY = gql`
  query UnitRevenue($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          precalcs(periodicity: SEASONAL) {
            season {
              id
              name
            }
            data {
              finance {
                totalRevenue
              }
            }
          }
        }
        ... on League {
          precalcs(periodicity: SEASONAL) {
            season {
              id
              name
            }
            data {
              finance {
                totalRevenue
              }
            }
          }
        }
      }
    }
  }
`

export const UnitRevenuesQuery = {
  query: UNIT_REVENUES_QUERY,
  update(data) {
    return get(data, 'unit.entity.precalcs', []).map(entry => ({
      name: get(entry, 'season.name', '-'),
      y: get(entry, 'data.finance.totalRevenue', 0)
    }))
  }
}

export const UNIT_PARTNERS_QUERY = gql`
  query UnitPartners($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          profile {
            brandPartners {
              id
              logo {
                url
              }
              name
            }
          }
        }
        ... on League {
          profile {
            brandPartners {
              id
              logo {
                url
              }
              name
            }
          }
        }
      }
    }
  }
`

export const UnitPartnersQuery = {
  query: UNIT_PARTNERS_QUERY
}

export const UnitMatchesQuery = {
  query: gql`
    query UnitMatches($id: ID!, $season: String) {
      unit(id: $id) {
        id
        entity {
          id
          ... on Team {
            matches(season: $season) {
              id
              occurredAt
              attendanceCount
              homeTeamScore
              awayTeamScore
              homeTeam {
                id
                name
                logo {
                  url
                }
              }
              awayTeam {
                id
                name
                logo {
                  url
                }
              }
            }
          }
          ... on League {
            matches(season: $season) {
              id
              occurredAt
              attendanceCount
              homeTeamScore
              awayTeamScore
              homeTeam {
                id
                name
                logo {
                  url
                }
              }
              awayTeam {
                id
                name
                logo {
                  url
                }
              }
            }
          }
        }
      }
    }
  `
}

export const STADIUM_MENTIONS_QUERY = gql`
  query($teamId: ID!) {
    stadium {
      id
      mentions {
        id
        name
        videos
        images
        checkIns
        sum
      }
    }
  }
`

export const UNIT_INVENTORY_STATUS_QUERY = gql`
  query UnitInventoryStatus($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          inventoryStatus {
            percentage
            selectedCategories {
              id
            }
            allCheckedCategories {
              id
              path
            }
          }
        }
        ... on League {
          inventoryStatus {
            percentage
            selectedCategories {
              id
            }
            allCheckedCategories {
              id
              path
            }
          }
        }
      }
    }
  }
`

export const UNIT_INVENTORY_QUERY = gql`
  query UnitInventory($id: ID!) {
    unit(id: $id) {
      id
      daimaniName
      entity {
        id
        name
        ... on Team {
          inventories {
            id
            nameOverride
            category {
              id
              name
              path
              target
            }
            description
            price
            expiredAt
          }
          packages {
            id
            nameOverride
            category {
              id
              name
              path
              target
            }
            description
            price
            expiredAt
          }
        }
        ... on League {
          inventories {
            id
            nameOverride
            category {
              id
              name
              path
              target
            }
            description
            price
            expiredAt
          }
          packages {
            id
            nameOverride
            category {
              id
              name
              path
              target
            }
            description
            price
            expiredAt
          }
        }
      }
    }
  }
`

export const UnitInventoryQuery = {
  mock: { entity: { packages: [], inventories: [] } },
  query: UNIT_INVENTORY_QUERY
}

export const UnitInventoryStatusQuery = {
  query: UNIT_INVENTORY_STATUS_QUERY
}

export const UNIT_PACKAGES_QUERY = gql`
  query UnitPackages($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Team {
          packages {
            id
            nameOverride
            description
            expiredAt
            category {
              id
              name
              path
            }
            children {
              id
              category {
                id
                name
                path
              }
            }
          }
        }
        ... on League {
          packages {
            id
            nameOverride
            description
            expiredAt
            category {
              id
              name
              path
            }
            children {
              id
              category {
                id
                name
                path
              }
            }
          }
        }
      }
    }
  }
`

export const UnitPackagesQuery = {
  query: UNIT_PACKAGES_QUERY
}

export const UnitHeaderQuery = {
  mock: { entity: { logo: {} } },
  query: UNIT_HEADER_QUERY
}

export const TeamLeaguePositionsQuery = {
  query: TEAM_LEAGUE_POSITIONS_QUERY
}

export const UnitFansOverviewQuery = {
  query: UNIT_FANS_OVERVIEW_QUERY
}

export const UnitReachOverviewQuery = {
  query: UNIT_REACH_OVERVIEW_QUERY
}

export const UnitGenderSplitQuery = {
  query: UNIT_GENDER_SPLIT_QUERY
}

export const UnitAgeSplitQuery = {
  query: UNIT_AGE_SPLIT_QUERY
}

export const UnitStatusSplitQuery = {
  query: UNIT_STATUS_SPLIT_QUERY
}

export const UnitEducationSplitQuery = {
  query: UNIT_EDUCATION_SPLIT_QUERY
}

export const UnitBroadcastCoverageSplitQuery = {
  query: UNIT_BROADCAST_COVERAGE_SPLIT_QUERY
}

export const UnitBroadcastViewersSplitQuery = {
  query: UNIT_BROADCAST_VIEWERS_SPLIT_QUERY
}

export const UnitSharedVideoPlatformsSplitQuery = {
  query: UNIT_SHARED_VIDEO_PLATFORMS_SPLIT_QUERY
}

export const UnitIncomeSplitQuery = {
  query: UNIT_INCOME_SPLIT_QUERY
}

export const UnitCountrySplitQuery = {
  query: UNIT_COUNTRY_SPLIT_QUERY
}

export const UnitLanguageSplitQuery = {
  query: UNIT_LANGUAGE_SPLIT_QUERY
}

export const TeamSocialMediaQuery = {
  query: TEAM_SOCIAL_MEDIA_QUERY
}

export const LeagueSocialMediaQuery = {
  query: LEAGUE_SOCIAL_MEDIA_QUERY
}

export const UnitPlayersQuery = {
  query: UNIT_PLAYERS_QUERY
}

export const UnitHashtagsQuery = {
  query: UNIT_HASHTAGS_QUERY
}

export const TeamTraditionalMediaQuery = {
  query: TEAM_TRADITIONAL_MEDIA_QUERY
}

export const LeagueTraditionalMediaQuery = {
  query: LEAGUE_TRADITIONAL_MEDIA_QUERY
}

export const StadiumMentionsQuery = {
  mock: mockArray(1),
  query: STADIUM_MENTIONS_QUERY,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(1, k => {
      const socials = ['Facebook', 'Instagram', 'Twitter']
      const mentions = mockObjects(3, l => {
        const videos = faker.random.number()
        const images = faker.random.number()
        const checkIns = faker.random.number()
        return {
          id: l,
          name: socials[l],
          videos: videos,
          images: images,
          checkIns: checkIns,
          sum: videos + images + checkIns
        }
      })

      return {
        stadium: {
          id: k,
          mentions: mentions
        }
      }
    })[0]
  }
}

export const StadiumInfoQuery = {
  query: STADIUM_INFO_QUERY
}

export const TeamQuery = {
  mock: mockArray(1),
  query: gql`
    query Team($teamId: ID!) {
      team {
        id
        name
        photo
        city {
          id
          name
          description
          latitude
          longitude
          population
          area
          district
        }
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(1, k => {
      return {
        id: k,
        name: faker.name.findName(),
        photo: faker.image.avatar(),
        city: {
          id: k,
          name: faker.name.findName(),
          description: faker.lorem.words(110),
          latitude: faker.address.latitude(),
          longitude: faker.address.longitude(),
          population: faker.random.number(),
          area: faker.random.number(),
          district: faker.name.findName()
        }
      }
    })[0]
  }
}

export const PlayersListQuery = {
  mock: mockArray(5),
  query: gql`
    query PlayersList($teamId: ID!) {
      team(id: $teamId) {
        players {
          id
          name
          photo
          followers {
            total {
              facebook
              instagram
              twitter
              youtube
              sum
            }
          }
        }
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(15, k => {
      const fb = faker.random.number()
      const ig = faker.random.number()
      const tw = faker.random.number()
      const yt = faker.random.number()

      return {
        id: k,
        name: faker.name.findName(),
        photo: faker.image.avatar(),
        followers: {
          total: {
            facebook: fb,
            instagram: ig,
            twitter: tw,
            youtube: yt,
            sum: fb + ig + tw + yt
          }
        }
      }
    })
  }
}

export const TeamSettingsQuery = {
  query: gql`
    query Team($id: ID!) {
      unit(id: $id) {
        id
        entity {
          id
          ... on Team {
            name
            city {
              id
            }
            country {
              id
            }
            logo {
              url
            }
          }
        }
      }
    }
  `
}

export const BRAND_HEADER_QUERY = gql`
  query BrandHeader($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        name
        logo {
          url
        }
        titlePhotos {
          url
        }
        ... on Brand {
          industries {
            id
            name
          }
          country {
            id
            continent_id
            name
          }
          city {
            id
            name
          }
          profile {
            description
            preferredSports {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const BRAND_INDUSTRIES_QUERY = gql`
  query BrandIndustries($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          industries {
            id
            name
          }
        }
      }
    }
  }
`

export const BRAND_PROFILE_PERCENTAGE_QUERY = gql`
  query BrandProfilePercentage($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          profile {
            completedPercentage
          }
        }
      }
    }
  }
`

export const BRAND_TARGETING_QUERY = gql`
  query BrandTargeting($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          profile {
            preferredGenderGroups
            preferredAgeGroups
            preferredEducationGroups
            preferredIncomeGroups
            preferredMaritalGroups
            preferredEngagementGroups
            preferredSocialMediaChannels
            preferredMarketplaceBudget
            preferredInventories {
              id
            }
            preferredCountries {
              id
              name
            }
            preferredLanguages {
              id
            }
            preferredSports {
              id
            }
          }
        }
      }
    }
  }
`

export const BRAND_AUDIENCE_QUERY = gql`
  query BrandAudience($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          socialAccounts {
            id
          }
        }
      }
    }
  }
`

export const BRAND_SOCIAL_WAS_OCCURRED_QUERY = gql`
  query BrandSocialWasOccurredQuery(
    $id: ID!
    $count: Int = 15
    $page: Int = 1
    $filter: PostsFilterInput
    $orderBy: OrderByInput
  ) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          postsWhereWasOccurred(
            count: $count
            page: $page
            filter: $filter
            orderBy: $orderBy
          ) {
            data {
              id
              image {
                url
              }
              thumb {
                url
              }
              url
              type
              content
              likes
              shares
              comments
              engagement
              reach
              valuation
              publishedAt
              orgUnitsOccurred {
                id
                entity {
                  id
                  name
                  logo {
                    url
                  }
                }
              }
              socialAccount {
                id
                profilePicture {
                  url
                }
                name
                type
              }
            }
            paginatorInfo {
              lastPage
              total
            }
          }
        }
      }
    }
  }
`

export const BrandSocialWasOccurredQuery = {
  query: BRAND_SOCIAL_WAS_OCCURRED_QUERY
}

export const BrandAudienceQuery = {
  query: BRAND_AUDIENCE_QUERY
}

export const BrandHeaderQuery = {
  query: BRAND_HEADER_QUERY
}

export const BrandTargetingQuery = {
  mock: {
    entity: {
      profile: {
        preferredInventories: [],
        preferredCountries: [],
        preferredLanguages: [],
        preferredSports: []
      }
    }
  },
  query: BRAND_TARGETING_QUERY
}

export const BrandMutation = {
  mutation: gql`
    mutation BrandMutation($id: ID!, $input: BrandUpdateInput!) {
      updateBrand(id: $id, input: $input) {
        id
      }
    }
  `
}

export const UpdateBrandProfileMutation = {
  mutation: gql`
    mutation UpdateBrandProfileMutation(
      $id: ID!
      $input: BrandProfileUpdateInput!
    ) {
      updateBrandProfile(id: $id, input: $input) {
        id
      }
    }
  `
}

export const UpdateUnitTitlePhotoMutation = {
  mutation: gql`
    mutation UpdateUnitTitlePhotoMutation(
      $id: ID!
      $input: UnitPhotoUpdateInput!
    ) {
      updateUnitTitlePhoto(id: $id, input: $input) {
        id
      }
    }
  `
}

export const UpdateUnitLogoMutation = {
  mutation: gql`
    mutation UpdateUnitLogoMutation($id: ID!, $input: UnitPhotoUpdateInput!) {
      updateUnitLogo(id: $id, input: $input) {
        id
      }
    }
  `
}

export const UpdateHeroLogoMutation = {
  mutation: gql`
    mutation UpdateHeroLogoMutation(
      $organizationUnitId: ID!
      $id: ID!
      $input: HeroPhotoUpdateInput!
    ) {
      updateHeroLogo(
        organizationUnitId: $organizationUnitId
        id: $id
        input: $input
      ) {
        id
      }
    }
  `
}

export const BRAND_SOCIAL_MEDIA_QUERY = gql`
  query BrandSocialMedia($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          socialAccounts {
            id
            type
          }
          followedTeams {
            id
            name
          }
        }
      }
    }
  }
`

export const BRAND_SOCIAL_ACCOUNTS_QUERY = gql`
  query BrandSocialAccounts($id: ID!) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          socialAccounts {
            id
            type
          }
        }
      }
    }
  }
`

export const BRAND_FOLLOWED_TEAMS_QUERY = gql`
  query BrandsFollowedTeams($id: ID!, $season: String) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          followedTeams {
            id
            name
            logo {
              url
            }
            city {
              id
              name
            }
            teamStadiums {
              stadium {
                id
                precalcs(season: $season, periodicity: MONTHLY) {
                  date
                  data {
                    visitorsTotal
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const BRAND_SOCIAL_ACCOUNTS_POSTS_QUERY = gql`
  query BrandSocialAccountsPosts($id: ID!, $from: String, $to: String) {
    unit(id: $id) {
      id
      entity {
        id
        ... on Brand {
          socialAccounts {
            id
            type
            posts(from: $from, to: $to) {
              id
              engagement
              reach
              content
              socialAccount {
                id
                name
                type
                profilePicture {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

export const BrandFollowedTeamsQuery = {
  query: BRAND_FOLLOWED_TEAMS_QUERY
}

export const BrandSocialAccountsPostsQuery = {
  mock: { entity: { socialAccounts: [] } },
  query: BRAND_SOCIAL_ACCOUNTS_POSTS_QUERY
}

export const BrandSocialAccountsQuery = {
  mock: { entity: { socialAccounts: [] } },
  query: BRAND_SOCIAL_ACCOUNTS_QUERY
}

export const BrandSocialMediaQuery = {
  mock: { entity: { socialAccounts: [], followedTeams: [] } },
  query: BRAND_SOCIAL_MEDIA_QUERY
}

export const BrandProfilePercentageQuery = {
  mock: { entity: { profile: {} } },
  query: BRAND_PROFILE_PERCENTAGE_QUERY
}

export const BrandIndustriesQuery = {
  query: BRAND_INDUSTRIES_QUERY
}

export const BrandSettingsQuery = {
  query: gql`
    query Brand($id: ID!) {
      unit(id: $id) {
        id
        entity {
          id
          ... on Brand {
            name
            city {
              id
            }
            country {
              id
            }
            logo {
              url
            }
          }
        }
      }
    }
  `
}

// TODO: Endpoint required
export const BrandQuery = {
  mock: {},
  query: gql`
    query Brand {
      brand {
        id
        name
        city
        country
        industry
        logo
        description
        visible
        mediaProfileCount
        topMediaPosts {
          image
          source
          content
          reach
          engagement
        }
        monthlyBroadcast {
          date
          matches
          stations
        }
        monthlyStadiumAttendance {
          date
          attendance
          matches
        }
        monthlyPageViews {
          date
          total
          unique
        }
        mediaAudience {
          date
          facebook
          youtube
          instagram
          twitter
          google
          sum
        }
        monthlyReach {
          date
          hashtags
          mentions
          tags
          sum
        }
        valueGrowth {
          date
          value
          growth
        }
        totalGrowth
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(1, k => {
      const monthlyStadiumAttendance = mockObjects(12, l => {
        const date = faker.date.past()
        date.setMonth(l)
        return {
          date: date,
          attendance: faker.random.number(),
          matches: faker.random.number()
        }
      })

      const topMediaPosts = mockObjects(3, l => {
        return {
          id: k,
          reach: faker.random.number(),
          engagement: faker.random.number(),
          socialAccount: {
            id: faker.random.number(),
            name: faker.name.findName(),
            type: faker.random.word(),
            logo: {
              url: faker.image.avatar()
            }
          }
        }
      })

      const monthlyBroadcast = mockObjects(12, l => {
        const date = faker.date.past()
        date.setMonth(l)
        return {
          date: date,
          matches: faker.random.number(),
          stations: faker.random.number()
        }
      })

      const monthlyPageViews = mockObjects(12, l => {
        const date = faker.date.past()
        date.setMonth(l)
        return {
          date: date,
          total: faker.random.number(),
          unique: faker.random.number()
        }
      })

      let lastValue = null
      const valueGrowth = mockObjects(12, l => {
        const date = faker.date.past()
        const value = faker.random.number()
        const percentageValue = lastValue ? (value / lastValue) * 100 : 0
        const growth = percentageValue - 100
        lastValue = value
        date.setMonth(l)
        return {
          date: date,
          value: value,
          growth: percentageValue !== 0 ? growth / 100 : 0
        }
      })

      const monthlyReach = mockObjects(12, l => {
        const date = faker.date.past()
        const fb = faker.random.number()
        const ig = faker.random.number()
        const tw = faker.random.number()
        date.setMonth(l)
        return {
          date: date,
          hashtags: fb,
          mentions: ig,
          tags: tw,
          sum: fb + ig + tw
        }
      })

      const mediaAudience = mockObjects(12, l => {
        const date = faker.date.past()
        const fb = faker.random.number()
        const ig = faker.random.number()
        const tw = faker.random.number()
        const yt = faker.random.number()
        const gl = faker.random.number()
        date.setMonth(l)
        return {
          date: date,
          facebook: fb,
          instagram: ig,
          twitter: tw,
          youtube: yt,
          google: gl,
          sum: fb + ig + tw + yt + gl
        }
      })

      return {
        id: k,
        name: faker.name.findName(),
        logo: faker.image.avatar(),
        description: faker.random.words(50),
        city: faker.address.city(),
        country: faker.address.country(),
        industry: faker.name.findName(),
        visible: faker.random.boolean(),
        mediaProfileCount: String(faker.random.number()),
        monthlyStadiumAttendance: monthlyStadiumAttendance,
        valueGrowth: valueGrowth,
        totalGrowth: 0.22,
        mediaAudience: mediaAudience,
        monthlyBroadcast: monthlyBroadcast,
        monthlyPageViews: monthlyPageViews,
        monthlyReach: monthlyReach,
        topMediaPosts: topMediaPosts
      }
    })[0]
  }
}

export const TeamPrecalcsQuery = {
  mock: {},
  query: gql`
    query Team($id: ID!, $season: String) {
      team(id: $id) {
        id
        precalcs(season: $season, periodicity: SEASONAL) {
          season {
            id
            name
          }
          date
          data {
            matchVisitors {
              avgStadiumAttendance
              avgMatchdayAttendance
              avgStadiumCapacity
              avgStadiumUtilization
              matchesCount
              cumulativeAttendance
            }
          }
        }
      }
    }
  `
}

export const LeagueQuery = {
  mock: {},
  query: gql`
    query League($id: ID!, $season: String) {
      league(id: $id) {
        id
        precalcs(season: $season, periodicity: SEASONAL) {
          season {
            id
            name
          }
          date
          data {
            matchVisitors {
              avgStadiumAttendance
              avgMatchdayAttendance
              avgStadiumCapacity
              avgStadiumUtilization
              matchesCount
              cumulativeAttendance
            }
          }
        }
      }
    }
  `
}

export const LeagueSettingsQuery = {
  query: gql`
    query League($id: ID!) {
      unit(id: $id) {
        id
        entity {
          id
          ... on League {
            name
            country {
              id
            }
            logo {
              url
            }
          }
        }
      }
    }
  `
}

export const ACTIVE_UNIT_QUERY = gql`
  query ActiveUnitQuery($id: ID!) {
    unit(id: $id) {
      id
      hasStripeCustomerId
      activeSubscription {
        id
        stripePlan
        trialEndsAt
        endsAt
        isOnTrial
        trialDaysRemaining
      }
      permissions {
        role {
          id
          name
        }
        list {
          name
          can
        }
      }
      organization {
        id
        name
      }
      entity {
        id
        name
        profileCompletion
        logo {
          url
        }
        titlePhotos {
          url
        }
      }
    }
  }
`

export const ActiveUnitQuery = variables => ({
  query: ACTIVE_UNIT_QUERY,
  variables
})

export const PERMISSIONS_QUERY = gql`
  query PermissionsQuery($id: ID!) {
    unit(id: $id) {
      id
      activeSubscription {
        id
        stripePlan
        trialEndsAt
        endsAt
        isOnTrial
        trialDaysRemaining
      }
      permissions {
        role {
          id
          name
        }
        list {
          name
          can
        }
      }
    }
  }
`

export const PermissionsQuery = variables => ({
  query: PERMISSIONS_QUERY,
  variables
})

export const UnitTypeQuery = {
  query: gql`
    query UnitTypeQuery($id: ID!) {
      unit(id: $id) {
        id
        entity {
          id
        }
      }
    }
  `
}

export const UnitQuery = {
  query: gql`
    query Unit($id: ID!, $season: String) {
      unit(id: $id) {
        id
        entity {
          id
          name
          logo {
            url
          }
          ... on Team {
            precalcs(season: $season) {
              season {
                name
              }
            }
          }
          ... on League {
            country {
              id
              name
              info {
                teamsCount
                malePlayersCount
                femalePlayersCount
              }
            }
            leagueTeams(season: { get: SPECIFIC, value: $season }) {
              team {
                id
                name
                logo {
                  url
                }
                city {
                  id
                  name
                  latitude
                  longitude
                  info {
                    description
                    population
                    district
                    area
                  }
                }
                groupedSocialAccounts {
                  type
                  followersCount
                }
              }
            }
          }
        }
      }
    }
  `,

  mock: {
    id: null,
    entity: {
      id: null,
      name: '-',
      logo: {
        url: null
      }
    },
    permissions: {
      role: {
        id: null,
        name: '-'
      },
      list: []
    }
  }
}

export const SwitchPlanMutation = {
  mutation: gql`
    mutation SwitchPlan($id: ID!, $plan: String!) {
      switchPlan(id: $id, plan: $plan) {
        id
        subscriptions {
          id
          stripePlan
          stripeId
        }
      }
    }
  `
}

export const RegisterBrandMutation = {
  mutation: gql`
    mutation RegisterBrand($input: BrandRegister) {
      registerBrand(input: $input) {
        id
      }
    }
  `
}

export const PrepareBrandRegister = {
  mutation: gql`
    mutation PrepareBrandRegister($input: PrepareBrandRegister) {
      prepareRegisterBrand(input: $input) {
        userID
        stripeClientToken
      }
    }
  `
}

export const CreateStripeSession = {
  mutation: gql`
    mutation CreateStripeSession(
      $organizationUnitId: ID!
      $plan: String!
      $isYearly: Boolean!
    ) {
      createStripeSession(
        organizationUnitId: $organizationUnitId
        plan: $plan
        isYearly: $isYearly
      ) {
        id
        url
      }
    }
  `
}

export const CreateStripeCustomerPortalSession = {
  mutation: gql`
    mutation CreateStripeCustomerPortalSession($organizationUnitId: ID!) {
      createStripeCustomerPortalSession(
        organizationUnitId: $organizationUnitId
      ) {
        id
        url
      }
    }
  `
}

export const TeamProfileMutation = {
  mutation: gql`
    mutation TeamProfileMutation($id: ID!, $input: TeamUpdateInput!) {
      updateTeam(id: $id, input: $input) {
        id
        profile {
          keyQuote
          vision
          founded
          fullTimeEmployeesCount
          academiesCount
          footballSchoolsCount
          partnerClubsCount
          youthPlayersCount
          coachesCount
          shareholders {
            name
          }
        }
      }
    }
  `
}
