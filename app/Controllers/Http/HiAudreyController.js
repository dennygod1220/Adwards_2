'use strict'
const Guestinfo = use('App/Models/Guestinfo')
const moment2 = use('moment')
class HiAudreyController {
    async index({ view,session }){

        //關聯式查詢
        const all_guestinfo = await Guestinfo
          .query()
          .with('StoreInfo')
          .fetch()
        const guestdata = all_guestinfo.toJSON()

        for(let i=0;i<guestdata.length;i++){
            guestdata[i].date = moment2(guestdata[i].date).format("YYYY-MM-DD");
            guestdata[i].birthday = moment2(guestdata[i].birthday).format("YYYY-MM-DD");
        }
        return view.render('hiaudrey/index',{
            guestdata:guestdata,
            SessionUser:session.get('username')+"你好"
          })
    }


        //刪除
        async delete({params,session,response}){
            console.log("delete");
            const delMem = await Guestinfo.find(params.id)
            await delMem.delete()
            session.flash({ notification:'刪除成功' })
            return response.redirect('/HiAudrey')
            
        }

}

module.exports = HiAudreyController
