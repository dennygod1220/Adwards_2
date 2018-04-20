'use strict'

const Awards = use('App/Models/Adonisinvoice')

class AwardsIndexController {
    async index( { view } ){

        return view.render('awardsindex.index')
    }

    async check( { request ,response , auth, session } ){
        const data = await Awards.all();
        const data2 = data.toJSON();
        
        const {email,invoice_num} = request.all();

        //=======================================================================
        //將使用者輸入的發票號碼和DB內中獎號碼比對，如果沒中獎回傳直=0
        // const winning = await Awards
        //     .query()
        //     .where('invoice_num', invoice_num)
        //     .getCount()        

        // if( winning == 0){
        //     console.log("fail")
        //     session.flash({ NoWinMessage:'沒中' })
        //     return response.redirect('back');
        // }
        // else{
        //     // console.log("win")
        //     session.flash({ WinMessage:'恭喜' })

        //     try{
        //         const email = 'test@gmail.com'
        //         const password = 'test'
        //         // await auth.attempt(email,password);                
        //         // return response.redirect('/uploadfile')
        //         //將這個測試使用者放入session
        //         // session.put('username','testuser')
                session.put('invoicenum',invoice_num )
                return response.route('/invoiceok') 
        //     }
        //     catch(error){
        //         console.log(error)    
        //         return response.redirect('back');
        //     }
        // }
    }

    async invoiceok({ view, session }){
        const invoicenum = session.get('invoicenum')
        //一進來就把session清掉
        session.clear()        
        return view.render('awardsindex.guestinfo',{invoicenum:invoicenum})
    }
}

module.exports = AwardsIndexController
