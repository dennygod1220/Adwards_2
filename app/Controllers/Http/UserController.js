'use strict'

const User = use('App/Models/User')

class UserController {

    async store( {request,response,auth} ){

        const user = await User.create( request.only(['username','email','password']) );


        await auth.login(user);

        return response.redirect('/')
    }
    
    async signIn( { request ,response , auth, session } ){
        //取得sign-in.edge 畫面中，使用者輸入的email 和 password
        const {email,password} = request.all();
        
        try{
            // auth.attempt (uid,password) 方法能夠用來進行登錄，如果找不到email或是密碼不對會引發錯誤
            await auth.attempt(email,password);

            session.flash({ notification:'Login Sucessful' })
            
            // return response.redirect('/uploadfile')
            //將這個測試使用者放入session
            session.put('username','testuser')
            
            return response.route('/uploadfile', {email: email}) 
        }
        catch(error){
            console.log(error)
            session.flash({error:'帳號或密碼有誤，請重新輸入!!'})

            return response.redirect('back');
        }
    }
}

module.exports = UserController
