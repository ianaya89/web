import gql from 'graphql-tag'

export const TeamsQuery = {
  mock: [],
  query: gql`
    query Teams($season: String!) {
      teams {
        id
        name
        teamLeagues(season: { get: SPECIFIC, value: $season }) {
          league {
            id
            name
          }
        }
      }
    }
  `,
  result: data => {
    data.data.teams.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}

export const TeamsByCountryIdsQuery = {
  mock: [],
  query: gql`
    query TeamsByCountryIdsQuery($countryIds: [ID!], $season: String!) {
      teamsByCountryIds(countryIds: $countryIds) {
        id
        name
        teamLeagues(season: { get: SPECIFIC, value: $season }) {
          league {
            id
            name
          }
        }
      }
    }
  `
}

export const TeamsWithEnabledRegistrationQuery = {
  mock: [],
  query: gql`
    query TeamsWithEnabledRegistration($seasonId: ID!) {
      teamsEnabledRegistrations(seasonId: $seasonId) {
        teamId
        teamName
        leagueId
        leagueName
        countryId
        countryName
      }
    }
  `
}

export const UpdateTeamFansMutation = {
  mutation: gql`
    mutation UpdateTeamFansMutation(
      $organizationUnitId: ID!
      $seasonId: ID!
      $input: TeamFansUpdateInput!
    ) {
      updateTeamFans(
        organizationUnitId: $organizationUnitId
        seasonId: $seasonId
        input: $input
      ) {
        id
      }
    }
  `
}

export const UpdateTeamStadiumMutation = {
  mutation: gql`
    mutation UpdateTeamStadiumMutation(
      $organizationUnitId: ID!
      $seasonId: ID!
      $input: TeamStadiumUpdateInput!
    ) {
      updateTeamStadium(
        organizationUnitId: $organizationUnitId
        seasonId: $seasonId
        input: $input
      ) {
        id
      }
    }
  `
}

export const DeleteTeamLeaguePositionMutation = {
  mutation: gql`
    mutation DeleteTeamLeaguePositionMutation(
      $organizationUnitId: ID!
      $leagueTeamId: ID!
    ) {
      deleteTeamLeaguePosition(
        organizationUnitId: $organizationUnitId
        leagueTeamId: $leagueTeamId
      ) {
        id
      }
    }
  `
}

export const DeleteTeamTrophyMutation = {
  mutation: gql`
    mutation DeleteTeamTrophyMutation(
      $organizationUnitId: ID!
      $trophyTypeId: ID
      $trophyStageId: ID
      $seasonId: ID
    ) {
      deleteTeamTrophy(
        organizationUnitId: $organizationUnitId
        trophyTypeId: $trophyTypeId
        trophyStageId: $trophyStageId
        seasonId: $seasonId
      ) {
        id
      }
    }
  `
}

export const DeleteMilestoneMutation = {
  mutation: gql`
    mutation DeleteMilestoneMutation($organizationUnitId: ID!, $id: ID!) {
      deleteMilestone(organizationUnitId: $organizationUnitId, id: $id) {
        id
      }
    }
  `
}

export const UpdateTeamLeaguePositionMutation = {
  mutation: gql`
    mutation UpdateTeamLeaguePositionMutation(
      $organizationUnitId: ID!
      $leagueTeamId: ID
      $input: TeamLeagueUpdateInput!
    ) {
      updateTeamLeaguePosition(
        organizationUnitId: $organizationUnitId
        leagueTeamId: $leagueTeamId
        input: $input
      ) {
        id
      }
    }
  `
}

export const UpdateTeamTrophyMutation = {
  mutation: gql`
    mutation UpdateTeamTrophyMutation(
      $organizationUnitId: ID!
      $input: TeamTrophyUpdateInput!
    ) {
      updateTeamTrophy(organizationUnitId: $organizationUnitId, input: $input) {
        id
      }
    }
  `
}

export const UpdateMilestoneMutation = {
  mutation: gql`
    mutation UpdateMilestoneMutation(
      $organizationUnitId: ID!
      $id: ID
      $input: UpdateMilestoneInput!
    ) {
      updateMilestone(
        organizationUnitId: $organizationUnitId
        id: $id
        input: $input
      ) {
        id
      }
    }
  `
}

export const UpdateHeroMutation = {
  mutation: gql`
    mutation UpdateHeroMutation(
      $organizationUnitId: ID!
      $id: ID
      $input: UpdateHeroInput!
    ) {
      updateHero(
        organizationUnitId: $organizationUnitId
        id: $id
        input: $input
      ) {
        id
      }
    }
  `
}

export const DeleteHeroMutation = {
  mutation: gql`
    mutation DeleteHeroMutation($organizationUnitId: ID!, $id: ID!) {
      deleteHero(organizationUnitId: $organizationUnitId, id: $id) {
        id
      }
    }
  `
}

export const PublicTeamsQuery = {
  mock: [],
  query: gql`
    query PublicTeams(
      $countryIds: [Int]
      $leagueIds: [Int]
      $count: Int
      $page: Int
      $orderAsc: Boolean!
    ) {
      PublicTeams(
        countryIds: $countryIds
        leagueIds: $leagueIds
        count: $count
        page: $page
        orderAsc: $orderAsc
      ) {
        paginatorInfo {
          total
          currentPage
          lastPage
          perPage
        }
        data {
          id
          unitid
          teamName
          logoUrl
          countryName
        }
      }
    }
  `
}

export const PublicSingleTeam = {
  mock: [],
  query: gql`
    query PublicSingleTeam($id: Int) {
      PublicSingleTeam(id: $id) {
        id
        unitid
        teamName
        logoUrl
        league {
          id
          name
          logo {
            url
          }
        }
        city {
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
        cityName
        countryName
        continentName
        founded
        stadiumName
        stadiumPhoto
        stadiumAddress
        stadiumLat
        stadiumLng
        stadiumCapacity
        skyboxes
        businessSeats
        averageAttendance
        clubRevenue
        titlePhotos {
          url
        }
        countrySplit {
          label
          value
        }
        stadiumPrecalc {
          capacity
          visitorsPerMatch
          visitorsTotal
          matchesCount
          businessSeats
          skyboxes
          parking
          trainingPitches
          wifi
        }
        teamStadium {
          metaData {
            matchesCount
            visitorsPerMatch
            visitorsTotal
          }
        }
        brandPartners {
          name
          logo {
            url
          }
        }
      }
    }
  `
}

export const TeamsCountriesQuery = {
  mock: [],
  query: gql`
    query TeamsCountries {
      teamsCountries {
        continent_id
        id
        name
      }
    }
  `,
  result: data => {
    data.data.teamsCountries.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}

export const TeamsLeaguesQuery = {
  mock: [],
  query: gql`
    query teamsLeagues {
      teamsLeagues {
        id
        name
        countryId
        countryName
      }
    }
  `,
  result: data => {
    data.data.teamsLeagues.sort((a, b) => (a.name > b.name ? 1 : -1))
    return data
  }
}
