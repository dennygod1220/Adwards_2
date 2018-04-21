'use strict'

const Route = use('Route')
const Helpers = use('Helpers')

//首頁
Route.on('/').render('awardsindex.index')

//輸入發票號碼頁面
Route.on('/reservationnow').render('awardsindex.reservationnow')
Route.post('/reservationnow','AwardsIndexController.check')

//填個人資料，發票符合資格才能到達此頁
Route.get('/invoiceok','GuestinfoController.invoiceok').middleware(['Checkinvoice'])


//===============使用者驗證相關(給奧黛莉上傳檔案用驗證)=================

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



//奧黛莉他們上傳用的路徑
Route.get('/uploadfile','UploadFileController.index').middleware('auth')

Route.post('upload', 'UploadFileController.store')


//錯誤頁面
Route.on('/errorpage').render('error.404')