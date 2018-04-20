'use strict'

class invoicecheck {
  get rules () {
    return {
      // validation rules
      'invoicenum':'required|invoicenum'
    }
  }
}

module.exports = invoicecheck
