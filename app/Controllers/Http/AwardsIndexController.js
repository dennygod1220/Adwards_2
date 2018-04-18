'use strict'

const Awards = use('App/Models/Adonisinvoice')

class AwardsIndexController {
    async index( { view } ){

        return view.render('awardsindex.index')
    }

    async check( { request ,response , auth, session } ){
        const data = await Awards.all();
        const data2 = data.toJSON();
        
        const {email,invoicenum} = request.all();

        //將使用者輸入的發票號碼和DB內中獎號碼比對，如果沒中獎回傳直=0
        const winning = await Awards
            .query()
            .where('invoice_num', invoicenum)
            .getCount()        

        if( winning == 0){
            console.log("fail")
            session.flash({ NoWinMessage:'沒中' })
        }
        else{
            console.log("win")
            session.flash({ WinMessage:'恭喜' })
        }
        return response.redirect('back');
    }
}

module.exports = AwardsIndexController
