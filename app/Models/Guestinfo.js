'use strict'

const Model = use('Model')

class Guestinfo extends Model {
  StoreInfo () {
    //guest info 和 store info 的關西為 1:多  所以在 guest的 model內用belonsTo關聯store model 
    //belongsTo(關聯model,本model對應的欄位,關聯model對應的欄位)
    return this.belongsTo('App/Models/StoreInfo','store_id','id')
  }
}


module.exports = Guestinfo
 