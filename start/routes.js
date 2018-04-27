'use strict'

const Route = use('Route')
const Helpers = use('Helpers')

//首頁
Route.on('/').render('awardsindex.index')

//20180421_因不須跳到別的頁面輸入發票號碼，因此直接從'/'發送post請求到invoiceok頁面
// Route.on('/reservationnow').render('awardsindex.reservationnow')
Route.post('/','AwardsIndexController.check')

//填個人資料，發票符合資格才能到達此頁
Route.get('/invoiceok','GuestinfoController.invoiceok').middleware(['Checkinvoice'])

Route.post('/invoiceok','GuestinfoController.store').validator('guestinfo') 
// Route.post('/invoiceok','GuestinfoController.store') 
  

//預約試穿
Route.on('/testdress').render('testdress')
//內衣密碼
Route.on('/underwearsecret').render('underwearsecret')
//門市活動
Route.on('/storeactive').render('storeactive')


//===============================================後台====================================
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

//後台首頁
Route.get('/HiAudrey','HiAudreyController.index').middleware('auth')
//刪除客戶資料
Route.get('/HiAudrey/delete/:id', 'HiAudreyController.delete').middleware('auth')
//手動新增客戶資料
Route.get('/createguest','CreateguestinfoController.index').middleware('auth')

Route.post('/createguest','CreateguestinfoController.store').middleware('auth')
//奧黛莉他們上傳用的路徑
Route.get('/uploadfile','UploadFileController.index').middleware('auth')

Route.post('upload', 'UploadFileController.store')

//問卷調查
Route.get('/question','QuestionController.index').middleware('auth')
Route.get('/writequestion','QuestionController.writequestion')
//新增問卷
Route.post('writequestion', 'QuestionController.store').middleware('auth')
//刪除問卷
Route.get('/question/delete/:id', 'QuestionController.delete').middleware('auth')

//錯誤頁面
Route.on('/errorpage').render('error.404')


//下載測試
Route.get('/downloadQu','QuestionController.downloadguestinfo')

// Route.get('/report', async({request, response, next})=> {

// //    response.download('./public/download/book.xlsx','Hello');
//    response.attachment('./public/download/book.xlsx','Hello.xlsx');

// });

   