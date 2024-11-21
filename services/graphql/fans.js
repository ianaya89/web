import gql from 'graphql-tag'
import faker from 'faker'
import { mockObjects } from './_mocks'
// import { mockArray } from './_mocks'

// TODO: Endpoint required
export const FansLastSeasonQuery = {
  mock: mockObjects(1, l => {
    const pC = faker.random.number()
    const sC = faker.random.number()
    const bC = faker.random.number()
    const mC = faker.random.number()

    const hashtags = mockObjects(10, k => {
      const fb = faker.random.number()
      const ig = faker.random.number()
      const tw = faker.random.number()
      const yt = faker.random.number()

      return {
        id: k,
        name: faker.name.findName(),
        counts: {
          week: fb,
          month: ig,
          quarter: tw,
          year: yt
        }
      }
    })

    const tvStations = mockObjects(20, k => {
      return {
        id: k,
        name: faker.name.findName(),
        logo: faker.image.avatar(),
        description: faker.name.findName()
      }
    })

    const prints = mockObjects(20, k => {
      return {
        id: k,
        name: faker.name.findName(),
        logo: faker.image.image(),
        description: faker.name.findName()
      }
    })

    const countries = mockObjects(7, k => {
      return {
        code: 'sk',
        fansCount: faker.random.number()
      }
    })

    const languages = mockObjects(9, k => {
      return {
        code: 'sk',
        fansCount: faker.random.number()
      }
    })

    return {
      fans: {
        origin: {
          seasonTicketsCount: faker.random.number(),
          membersCount: faker.random.number(),
          newsletterCount: faker.random.number(),
          websiteCount: faker.random.number(),
          socialMediaCount: faker.random.number()
        },
        countries: countries,
        languages: languages,
        hashtags: hashtags,
        exposures: {
          tvStations: tvStations,
          prints: prints
        },
        education: {
          primaryCount: pC,
          secondaryCount: sC,
          bachelorCount: bC,
          masterCount: mC,
          sum: pC + sC + bC + mC
        },
        income: {
          under10k: pC,
          till20k: sC,
          till50k: bC,
          over50k: mC,
          sum: pC + sC + bC + mC
        },
        status: {
          married: pC,
          divorced: sC,
          single: bC,
          sum: pC + sC + bC + mC
        },
        age: {
          under17: pC,
          till24: sC,
          till34: bC,
          till44: sC + bC,
          till54: sC + pC,
          till64: pC + bC,
          over65: mC,
          sum: pC + sC + bC + mC
        }
      }
    }
  })[0],
  query: gql`
    query FansLastSeason {
      fans {
        origin {
          seasonTicketsCount
          membersCount
          newsletterCount
          websiteCount
          socialMediaCount
        }
        hashtags {
          id
          name
          counts {
            week
            month
            quarter
            year
          }
        }
        countries {
          name
          fansCount
        }
        languages {
          name
          fansCount
        }
        education {
          primaryCount
          secondaryCount
          bachelorCount
          masterCount
        }
        income {
          under10k
          till20k
          till50k
          over50k
          sum
        }
        status {
          married
          divorced
          single
          sum
        }
        age {
          under17
          till24
          till34
          till44
          till54
          till64
          over65
          sum
        }
      }
    }
  `,
  fetchPolicy: 'cache-only',
  update(data) {
    return mockObjects(1, l => {
      const pC = faker.random.number()
      const sC = faker.random.number()
      const bC = faker.random.number()
      const mC = faker.random.number()

      const hashtags = mockObjects(10, k => {
        const fb = faker.random.number()
        const ig = faker.random.number()
        const tw = faker.random.number()
        const yt = faker.random.number()

        return {
          id: k,
          name: faker.name.findName(),
          counts: {
            week: fb,
            month: ig,
            quarter: tw,
            year: yt
          }
        }
      })

      const tvStations = mockObjects(20, k => {
        return {
          id: k,
          name: faker.name.findName(),
          logo: faker.image.avatar(),
          description: faker.name.findName()
        }
      })

      const prints = mockObjects(20, k => {
        return {
          id: k,
          name: faker.name.findName(),
          logo: faker.image.image(),
          description: faker.name.findName()
        }
      })

      const countries = mockObjects(7, k => {
        return {
          code: 'sk',
          fansCount: faker.random.number()
        }
      })

      const languages = mockObjects(9, k => {
        return {
          code: 'sk',
          fansCount: faker.random.number()
        }
      })

      return {
        fans: {
          origin: {
            seasonTicketsCount: faker.random.number(),
            membersCount: faker.random.number(),
            newsletterCount: faker.random.number(),
            websiteCount: faker.random.number(),
            socialMediaCount: faker.random.number()
          },
          countries: countries,
          languages: languages,
          hashtags: hashtags,
          exposures: {
            tvStations: tvStations,
            prints: prints
          },
          education: {
            primaryCount: pC,
            secondaryCount: sC,
            bachelorCount: bC,
            masterCount: mC,
            sum: pC + sC + bC + mC
          },
          income: {
            under10k: pC,
            till20k: sC,
            till50k: bC,
            over50k: mC,
            sum: pC + sC + bC + mC
          },
          status: {
            married: pC,
            divorced: sC,
            single: bC,
            sum: pC + sC + bC + mC
          },
          age: {
            under17: pC,
            till24: sC,
            till34: bC,
            till44: sC + bC,
            till54: sC + pC,
            till64: pC + bC,
            over65: mC,
            sum: pC + sC + bC + mC
          }
        }
      }
    })[0]
  }
}
