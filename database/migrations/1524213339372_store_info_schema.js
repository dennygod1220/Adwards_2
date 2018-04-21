'use strict'

const Schema = use('Schema')

class StoreInfoSchema extends Schema {
  up () {
    this.create('store_infos', (table) => {
      table.increments()
      table.string('store_area')
      table.string('store_name')
      table.string('sotre_address')
      table.string('store_phone')
      table.timestamps()
    })
  }

  down () {
    this.drop('store_infos')
  }
}

module.exports = StoreInfoSchema
