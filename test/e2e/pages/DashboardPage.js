import Page from './Page'
import UnitHeader from './partials/UnitHeader'
import SellerSidebar from './partials/SellerSidebar'
import BuyerSidebar from './partials/BuyerSidebar'

export default class DashboardPage extends Page {
  constructor(sidebarType = 'seller') {
    super()
    this.header = new UnitHeader()
    this.sidebar =
      sidebarType === 'seller' ? new SellerSidebar() : new BuyerSidebar()
    this.seeAllKeyElements(false)
  }

  visit() {
    return this
  }

  seeAllKeyElements(checkPartials = true) {
    if (checkPartials) {
      this.header.seeAllKeyElements()
      this.sidebar.seeAllKeyElements()
    }

    return this
  }
}
