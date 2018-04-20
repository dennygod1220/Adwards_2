'use strict'

const Schema = use('Schema')

class StoreInfoSchema extends Schema {
  up () {
    this.create('store_infos', (table) => {
      table.increments()
      table.string('stor_name')
      table.timestamps()
    })
  }

  down () {
    this.drop('store_infos')
  }
}

module.exports = StoreInfoSchema
