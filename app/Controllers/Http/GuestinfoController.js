'use strict'

class GuestinfoController {
    async invoiceok({ view, session }){
        const invoicenum = session.get('invoicenum')
        //一進來就把session清掉
        session.clear()
        return view.render('guestinfo.guestinfo',{invoicenum:invoicenum})
    }
}

module.exports = GuestinfoController
