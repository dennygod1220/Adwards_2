'use strict'

const Route = use('Route')
const Helpers = use('Helpers')


Route.on('/').render('awardsindex.index')

Route.on('/reservationnow').render('awardsindex.reservationnow')
Route.post('/reservationnow','AwardsIndexController.check')

Route.get('/uploadfile','UploadFileController.index').middleware('auth')

Route.post('upload', 'UploadFileController.store')

//===============使用者驗證相關=================

Route.group(()=>{
//=============創建使用者=======================================
    Route.on('/signup').render('auth.sign-up')

    Route.post('/signup','UserController.store').validator('SignUp')    
//==============登出===============================
    Route.get('/logout',async({ auth,response }) =>{
        await auth.logout();
        return response.redirect('/');
    } )
//================登入=================================
    
    Route.on('/signin').render('auth.sign-in')
    
    Route.post('/signin','UserController.signIn').validator('SignIn')
}).prefix('/auth')

