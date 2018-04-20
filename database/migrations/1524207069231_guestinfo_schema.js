'use strict'

const Schema = use('Schema')

class GuestinfoSchema extends Schema {
  up () {
    this.create('guestinfos', (table) => {
      table.increments()
      table.integer('store_id').notNullable()
      table.date('date').notNullable()
      table.string('time',50).notNullable()
      table.string('guest_name').notNullable()
      table.string('cell_phone').notNullable()
      table.date('birthday').notNullable()
      table.string('email',190).notNullable()
      table.text('special_need')
      table.timestamps()
    })
  }

  down () {
    this.drop('guestinfos')
  }
}

module.exports = GuestinfoSchema
