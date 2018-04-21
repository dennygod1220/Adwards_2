'use strict'

const Awards = use('App/Models/AdonisInvoice')

class AwardsIndexController {
    async index( { view } ){

        return view.render('awardsindex.index')
    }
    
    async check( { request ,response , auth, session } ){
        const data = await Awards.all();
        const data2 = data.toJSON();
        const {email,invoice_num} = request.all();
        session.put('invoicenum',invoice_num )
        return response.route('/invoiceok') 
    }
}

module.exports = AwardsIndexController
