'use strict'

const Schema = use('Schema')

class GuestinfoSchema extends Schema {
  up () {
    this.create('guestinfos', (table) => {
      table.increments()
      table.integer('store_id',10).notNullable().comment('對應的店鋪ID')
      table.foreign('store_id')
      table.date('date').notNullable().comment('預約日期')
      table.string('time').notNullable().comment('預約時間')
      table.string('guest_name').notNullable().comment('客戶姓名')
      table.string('cell_phone').notNullable().comment('客戶手機')
      table.date('birthday').notNullable().comment('客戶生日')
      table.string('email',190).notNullable().comment('客戶Email')
      table.text('special_need').comment('客戶的特殊癖好')
      table.string('guest_invoice').notNullable().comment('這個人的發票號碼')
      table.string('guest_size').notNullable().comment('尺寸大小')
      table.timestamps()
    })
  }

  down () {
    this.drop('guestinfos')
  }
}

module.exports = GuestinfoSchema
 