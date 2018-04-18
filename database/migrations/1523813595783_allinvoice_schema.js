'use strict'

const Schema = use('Schema')

class AllinvoiceSchema extends Schema {
  up () {
    this.create('allinvoices', (table) => {
      table.increments()
      table.string('invioce_num')
      table.string('email')
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('allinvoices')
  }
}

module.exports = AllinvoiceSchema
