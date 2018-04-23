'use strict'

const Schema = use('Schema')

class AdonisInvoiceSchema extends Schema {
  up () {
    this.create('adonis_invoices', (table) => {
      table.increments()
      table.string('invoice_num').notNullable()
      table.string('file_name')
      table.integer('user_id')
      table.timestamps()
    })

  }

  down () {
    this.drop('adonis_invoices')
  }
}

module.exports = AdonisInvoiceSchema
