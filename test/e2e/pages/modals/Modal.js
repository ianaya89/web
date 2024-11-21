import BaseOperations from '../base/BaseOperations'

export default class Modal extends BaseOperations {
  constructor() {
    super()
    this.mainSelector = '.modal-wrapper'
  }
}
