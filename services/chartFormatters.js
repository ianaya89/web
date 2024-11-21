export const searchIntroDataLabelFormatter = vm =>
  function() {
    if (this.point.value) {
      return `
        <span class="text-p1 font-medium">
          ${vm.$filters.currency(this.point.value, true)}
        </span>
          `
    }
  }

export const landingMapDataLabelFormatter = vm =>
  function() {
    if (this.point.value) {
      return `
        <span class="valuation-map-item-label">
          <span class="text-p3 font-medium">
            ${vm.$filters.currency(this.point.value, true)}
          </span>
        </span>
          `
    }
  }

export const searchDataLabelItemFormatter = vm =>
  function() {
    return `
            <span class="search-item-label">
              <span class="text-p2 font-medium">${vm.$filters.number(
                this.point.items.length
              )}</span>
              <span class="uppercase font-medium text-p5">${vm.$tc(
                'general.items',
                this.point.items.length
              )}</span>
            </span>
            `
  }

export const growthLabelFormatter = vm =>
  function() {
    return `
            <div class="text-h4">${vm.$filters.date(
              this.point.date,
              'MMM YYYY'
            )}</div>
            <div class="flex w-full">
              <div class="flex-1">
                <div class="pt-3">
                  <div class="text-grey text-p5 uppercase tracking-wide">
                    ${vm.$t(
                      'app.brand.profile.audience.activity_valuation.chart.value'
                    )}
                  </div>
                  <div class="text-h7 uppercase font-medium leading-tight">
                    ${vm.$filters.currency(this.y * 100)}
                  </div>
                </div>
              </div>
              <div class="flex justify-end">
                <div class="pt-3">
                  <div class="text-grey text-p5 uppercase tracking-wide">
                    ${vm.$t(
                      'app.brand.profile.audience.activity_valuation.chart.growth'
                    )}
                  </div>
                  <div class="text-h7 uppercase font-medium leading-tight">
                    <span class="${this.point.growthClasses.iconClass}"></span>
                    <span class="${this.point.growthClasses.textClass}">
                      ${vm.$filters.percentage(this.point.growth)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            `
  }

export const attendanceLabelFormatter = vm =>
  function() {
    return `
            <div class="text-h4">${vm.$filters.date(
              this.point.date,
              'MMM YYYY'
            )}</div>
            <div class="flex w-full">
              <div class="w-1/2">
                <div class="pt-3">
                  <div class="text-grey text-p5 uppercase tracking-wide">
                    ${vm.$t(
                      'app.brand.profile.audience.stadium_attendance.chart.matches'
                    )}
                  </div>
                  <div class="text-h7 uppercase font-medium leading-tight">
                    ${vm.$filters.number(this.point.matches)}
                  </div>
                </div>
              </div>
              <div class="w-1/2">
                <div class="pt-3">
                  <div class="text-grey text-p5 uppercase tracking-wide">
                    ${vm.$t(
                      'app.brand.profile.audience.stadium_attendance.chart.attendance'
                    )}
                  </div>
                  <div class="text-h7 uppercase font-medium leading-tight">
                    ${vm.$filters.number(this.y)}
                  </div>
                </div>
              </div>
            </div>
            `
  }

export const mediaAudienceLabelFormatter = vm =>
  function() {
    return `
            <div class="flex w-full">
              <div class="w-1/2 text-h5">
                ${vm.$filters.date(this.point.date, 'MMM YYYY')}
              </div>
              <div class="w-1/2 text-h5 text-right">
                <span class="${this.point.sumGrowthClasses.iconClass}"></span>
                <span class="${this.point.sumGrowthClasses.textClass}">
                  ${vm.$filters.percentage(this.point.sumGrowth)}
                </span>
              </div>
             </div>
            <div class="flex w-full border-b border-grey-l2">
              <div class="w-1/2 text-p3 text-grey">${vm.$t(
                'general.facebook'
              )}</div>
              <div class="w-1/2 text-p3 text-right">
                <span class="${this.point.fbGrowthClasses.iconClass}"></span>
                <span class="${this.point.fbGrowthClasses.textClass}">
                  ${vm.$filters.percentage(this.point.facebookGrowth)}
                </span>
              </div>
            </div>
            <div class="flex w-full border-b border-grey-l2">
              <div class="w-1/2 text-p3 text-grey">${vm.$t(
                'general.twitter'
              )}</div>
              <div class="w-1/2 text-p3 text-right">
                <span class="${this.point.twGrowthClasses.iconClass}"></span>
                <span class="${this.point.twGrowthClasses.textClass}">
                  ${vm.$filters.percentage(this.point.twitterGrowth)}
                </span>
              </div>
            </div>
            <div class="flex w-full border-b border-grey-l2">
              <div class="w-1/2 text-p3 text-grey">${vm.$t(
                'general.instagram'
              )}</div>
              <div class="w-1/2 text-p3 text-right">
                <span class="${this.point.igGrowthClasses.iconClass}"></span>
                <span class="${this.point.igGrowthClasses.textClass}">
                  ${vm.$filters.percentage(this.point.instagramGrowth)}
                </span>
              </div>
            </div>
            <div class="flex w-full">
              <div class="w-1/2 text-p3 text-grey">${vm.$t(
                'general.youtube'
              )}</div>
              <div class="w-1/2 text-p3 text-right">
                <span class="${this.point.ytGrowthClasses.iconClass}"></span>
                <span class="${this.point.ytGrowthClasses.textClass}">
                  ${vm.$filters.percentage(this.point.youtubeGrowth)}
                </span>
              </div>
            </div>
            `
  }

export const reachLabelFormatter = vm =>
  function() {
    return `
            <div class="flex w-full">
              <div class="w-1/2 text-h5">
                ${vm.$filters.date(this.point.date, 'MMM YYYY')}
              </div>
             </div>
            <div class="flex w-full border-b border-grey-l2">
              <div class="w-1/2 text-p3 text-grey">${vm.$t(
                'general.hashtags'
              )}</div>
              <div class="w-1/2 text-p3 text-right">
                  ${vm.$filters.number(this.point.hashtags)}
              </div>
            </div>
            <div class="flex w-full border-b border-grey-l2">
              <div class="w-1/2 text-p3 text-grey">${vm.$t(
                'general.mentions'
              )}</div>
              <div class="w-1/2 text-p3 text-right">
                  ${vm.$filters.number(this.point.mentions)}
              </div>
            </div>
            <div class="flex w-full border-b border-grey-l2">
              <div class="w-1/2 text-p3 text-grey">${vm.$t(
                'general.tags'
              )}</div>
              <div class="w-1/2 text-p3 text-right">
                  ${vm.$filters.number(this.point.tags)}
              </div>
            </div>
            <div class="flex w-full font-medium">
              <div class="w-1/2 text-h5 text-grey">${vm.$t(
                'general.total'
              )}</div>
              <div class="w-1/2 text-h5 text-right">
                  ${vm.$filters.number(this.y)}
              </div>
            </div>
            `
  }

export const pageViewsLabelFormatter = vm =>
  function() {
    return `
            <div class="text-h4">${vm.$filters.date(
              this.point.date,
              'MMM YYYY'
            )}</div>
            <div class="flex w-full">
              <div class="w-1/2">
                <div class="pt-3">
                  <div class="text-grey text-p5 uppercase tracking-wide">
                    ${vm.$t(
                      'app.brand.profile.audience.page_views.chart.total'
                    )}
                  </div>
                  <div class="text-h7 uppercase font-medium leading-tight">
                    ${vm.$filters.number(this.y)}
                  </div>
                </div>
              </div>
              <div class="w-1/2">
                <div class="pt-3">
                  <div class="text-grey text-p5 uppercase tracking-wide">
                    ${vm.$t(
                      'app.brand.profile.audience.page_views.chart.unique'
                    )}
                  </div>
                  <div class="text-h7 uppercase font-medium leading-tight">
                    ${vm.$filters.number(this.point.unique)}
                  </div>
                </div>
              </div>
            </div>
            `
  }

export const broadcastLabelFormatter = vm =>
  function() {
    return `
            <div class="text-h4">${vm.$filters.date(
              this.point.date,
              'MMM YYYY'
            )}</div>
            <div class="flex w-full">
              <div class="w-1/2">
                <div class="pt-3">
                  <div class="text-grey text-p5 uppercase tracking-wide">
                    ${vm.$t(
                      'app.brands.profile.audience.broadcast.chart.matches'
                    )}
                  </div>
                  <div class="text-h7 uppercase font-medium leading-tight">
                    ${vm.$filters.number(this.point.matches)}
                  </div>
                </div>
              </div>
              <div class="w-1/2">
                <div class="pt-3">
                  <div class="text-grey text-p5 uppercase tracking-wide">
                    ${vm.$t(
                      'app.brands.profile.audience.broadcast.chart.stations'
                    )}
                  </div>
                  <div class="text-h7 uppercase font-medium leading-tight">
                    ${vm.$filters.number(this.y)}
                  </div>
                </div>
              </div>
            </div>
            `
  }
