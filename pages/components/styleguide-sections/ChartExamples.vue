<template>
  <div class="container">
    <h2>Charts</h2>

    <highlighted-world-map :series="highlightedMapSeries" />
    <contacts-world-map :series="contactMapSeries" />
    <pie-chart :series="pieChartSeries" />
    <column-chart :height="400" :series="columnChartSeries" />
    <league-position-chart :height="400" :series="leaguePositionChartSeries" />
    <revenue-chart :height="400" :series="revenueChartSeries" />
    <stadium-visitors-chart :height="400" :series="stadiumVisitorsChartSeries" />
    <line-chart :height="400" :series="lineChartSeries" />
  </div>
</template>

<script>
import moment from 'moment'
import PieChart from '@/components/charts/PieChart'
import ColumnChart from '@/components/charts/ColumnChart'
import LeaguePositionChart from '@/components/charts/LeaguePositionChart'
import RevenueChart from '@/components/charts/RevenueChart'
import StadiumVisitorsChart from '@/components/charts/StadiumVisitorsChart'
import ContactsWorldMap from '@/components/charts/ContactsWorldMap'
import HighlightedWorldMap from '@/components/charts/HighlightedWorldMap'
import LineChart from '@/components/charts/LineChart'

export default {
  name: 'ChartExamples',

  components: {
    PieChart,
    ColumnChart,
    LeaguePositionChart,
    RevenueChart,
    StadiumVisitorsChart,
    ContactsWorldMap,
    HighlightedWorldMap,
    LineChart
  },

  data: () => ({
    counter: 0
  }),

  computed: {
    pieChartSeries() {
      return {
        name: 'Reach',
        data: [
          {
            name: 'Total attendance',
            y: 4440660 - this.counter
          },
          {
            name: 'Emails sent',
            y: 4600
          },
          {
            name: 'Unique website visits',
            y: 554240 + 2 * this.counter
          },
          {
            name: 'Social media',
            y: 7734460
          },
          {
            name: 'Broadcasting',
            y: 150 + 5 * this.counter
          },
          {
            name: 'Print & Outdoor',
            y: 85 + 3 * this.counter
          }
        ]
      }
    },

    columnChartSeries() {
      return {
        name: 'Fans',
        data: [
          {
            name: 'Season ticket',
            y: 5800 + this.counter
          },
          {
            name: 'Members',
            y: 3500
          },
          {
            name: 'Newsletter',
            y: 15000 + 2 * this.counter
          },
          {
            name: 'Website',
            y: 204220
          },
          {
            name: 'Social media',
            y: 136890 + 5 * this.counter
          }
        ]
      }
    },

    leaguePositionChartSeries() {
      return {
        name: 'League positions',
        data: [
          {
            name: '2nd division: 2008/09',
            y: 2.5
          },
          {
            name: '2nd division: 2009/10',
            y: 2.2
          },
          {
            name: '1st division: 2010/11',
            y: 1.3
          },
          {
            name: '1st division: 2011/12',
            y: 1.3
          },
          {
            name: '1st division: 2012/13',
            y: 1.7
          }
        ]
      }
    },

    revenueChartSeries() {
      return {
        name: 'Revenue',
        data: [
          {
            name: '2008/09',
            y: 12049000 / 100 // need to be in dollars
          },
          {
            name: '2009/10',
            y: 14042000 / 100 // need to be in dollars
          },
          {
            name: '2010/11',
            y: 12339040 / 100 // need to be in dollars
          },
          {
            name: '2011/12',
            y: 12234500 / 100 // need to be in dollars
          },
          {
            name: '2012/13',
            y: 14003212 / 100 // need to be in dollars
          }
        ]
      }
    },

    lineChartSeries() {
      return {
        name: 'Revenue',
        data: [
          {
            name: '2008/09',
            y: 12049000 / 100 // need to be in dollars
          },
          {
            name: '2009/10',
            y: 14042000 / 100 // need to be in dollars
          },
          {
            name: '2010/11',
            y: 12339040 / 100 // need to be in dollars
          },
          {
            name: '2011/12',
            y: 12234500 / 100 // need to be in dollars
          },
          {
            name: '2012/13',
            y: 14003212 / 100 // need to be in dollars
          }
        ]
      }
    },

    stadiumVisitorsChartSeries() {
      return {
        name: 'Stadium visitors',
        data: [
          {
            match: {
              teams: [
                {
                  name: 'Bayern',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
                  goalsCount: 2
                },
                {
                  name: 'Dortmund',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
                  goalsCount: 0
                }
              ]
            },
            x: moment()
              .subtract(4, 'month')
              .valueOf(),
            y: 12049000
          },
          {
            match: {
              teams: [
                {
                  name: 'Bayern',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
                  goalsCount: 2
                },
                {
                  name: 'Dortmund',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
                  goalsCount: 1
                }
              ]
            },
            x: moment()
              .subtract(3, 'month')
              .valueOf(),
            y: 14042000
          },
          {
            match: {
              teams: [
                {
                  name: 'Bayern',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
                  goalsCount: 1
                },
                {
                  name: 'Dortmund',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
                  goalsCount: 0
                }
              ]
            },
            x: moment()
              .subtract(2, 'month')
              .valueOf(),
            y: 12339040
          },
          {
            match: {
              teams: [
                {
                  name: 'Bayern',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
                  goalsCount: 2
                },
                {
                  name: 'Dortmund',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
                  goalsCount: 2
                }
              ]
            },
            x: moment()
              .subtract(1, 'month')
              .valueOf(),
            y: 12234500
          },
          {
            match: {
              teams: [
                {
                  name: 'Bayern',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
                  goalsCount: 3
                },
                {
                  name: 'Dortmund',
                  logo:
                    'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
                  goalsCount: 5
                }
              ]
            },
            x: moment().valueOf(),
            y: 14003212
          }
        ]
      }
    },

    contactMapSeries() {
      return {
        type: 'mappoint',
        name: 'Cities',
        borderColor: '#ffffff',
        zIndex: 2,
        data: [
          {
            code3: 'Argentina',
            contact: {
              city: 'Buenos Aires',
              name: 'Carla di Rocco',
              position: 'Sponsorship Manager',
              mail: 'carla@sponsoronline.eu',
              photo: 'cdr.jpg'
            },
            lat: -34.6037,
            lon: -58.3816
          },
          {
            code3: 'Italy',
            contact: {
              city: 'Rome',
              name: 'Carla di Rocco',
              position: 'Sponsorship Manager',
              mail: 'carla@sponsoronline.eu',
              photo: 'cdr.jpg'
            },
            lat: 41.9028,
            lon: 12.4964
          }
        ],
        minSize: 12,
        maxSize: 12
      }
    },
    highlightedMapSeries() {
      return {
        tooltip: {
          enabled: false
        },
        data: [
          {
            name: 'Slovakia',
            value: 0.3
          },
          {
            name: 'Italy',
            value: 0.5
          },
          {
            name: 'Denmark',
            value: 0.2
          },
          {
            name: 'Spain',
            value: 0.89
          },
          {
            name: 'Greece',
            value: 0.01
          }
        ]
      }
    }
  },

  mounted() {
    setInterval(() => {
      // return (this.counter += 10000)
    }, 2000)
  }
}
</script>

<style scoped>
</style>
