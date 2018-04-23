'use strict'

const gestmodel = use('App/Models/Guestinfo')
const storemodel = use('App/Models/StoreInfo')
const Database = use('Database')

class GuestinfoController {

  async invoiceok({view,session}) {
    const invoicenum = session.get('invoicenum')
    //一進來就把session清掉
    // session.clear();


    const storeinfo_1 =await storemodel.all()
    const storeinfo = storeinfo_1.toJSON()
    //取得store info 資料
    const restructur_storeinfo = await Database.select('id', 'store_area','store_name').from('store_infos')
    //取得store_area並用sql 直接去除重複丟到前端去
    const store_area_distinct = await Database.select('store_area').from('store_infos').distinct('store_area')
    return view.render('guestinfo.guestinfo', {
      invoicenum: invoicenum,
      restructur_storeinfo:restructur_storeinfo,
      store_area_distinct:store_area_distinct
    })
  }


  async store( { request,response,session } ){
    
    const guest_data = request.only(['store_id','date','time','guest_name','cell_phone','birthday','email','special_need','guest_invoice','guest_size'])
    console.log(guest_data)
    // const user = await gestmodel.find(1)
    // const test = await user.StoreInfo().fetch()
    // const store_guest_data = [];
    // store_guest_date

    await gestmodel.create(guest_data)
    session.clear();
    return "預約成功"
  }
}

module.exports = GuestinfoController
