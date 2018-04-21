'use strict'

const Awards = use('App/Models/AdonisInvoice')

class Checkinvoice {
  async handle ({ request,session,response }, next) {
    // call next to advance the request
    console.log(session.get('invoicenum'))
    const invoicenum = session.get('invoicenum')
    const winning = await Awards
    .query()
    .where('invoice_num', invoicenum)
    .getCount()    

    if(winning == 0){
      session.flash({ NoWinMessage:'此發票號碼不符合資格' })
      return response.redirect('back');
    }
    else{
      await next()
    }
  }
}

module.exports = Checkinvoice
