'use strict'

//讀取操作excel的庫
var xlsx = require('node-xlsx');
//日期時間的
var dateFormat = require('dateformat');
var now = new Date();
//使用model 操作DB
var AdonisInvoice = use('App/Models/AdonisInvoice')

class UploadFileController {
  //上傳頁面index
  async index({ view,auth,session }) {    

  
    const AllData = await AdonisInvoice.all()

    //session.get() 取得session除存的資訊
    return view.render('uploadfile/index',{
      AllData:AllData.toJSON(),
      SessionUser:session.get('username')+"你好"
    })
  }

  //上傳檔案到server
  async store( {request,view,params,response,session } ) {
    const profilePic = request.file('profile_pic', {
      // types: [''],
      // size: '2mb'
    })

    //取得目前時間和上傳檔案名稱組合為 server中儲存的檔案名稱
    const filename = dateFormat(now, "yyyymmdd_hhMMss_") + profilePic.clientName;

    await profilePic.move('public/uploads', {
      name: filename
    })

    if (!profilePic.moved()) {
      return profilePic.error()
    }
    //組合路徑
    const newfilename = 'public/uploads/'+filename

    var obj = xlsx.parse(newfilename);

    //取得本次上傳的excel 第一個sheet中的資料
    var excelObj = obj[0].data;

    //將資料寫入DB

    // const InvoiceModel = new AdonisInvoice()
    const arr = [];

    //取出excel資料後 將資料組成物件 push進陣列 
    excelObj.forEach(element => {
      const myobj = {"invoice_num":element,"file_name":filename}
      arr.push(myobj)
    });
    //createMany 可以一次建立多筆資料 建立的格式為 [{col_name:data1},{col_name:data2},.....]
    await AdonisInvoice.createMany(arr)

    return view.render('uploadfile/sucess', {
      excelObj: excelObj
    })
  }

  async test() {

  }
}

module.exports = UploadFileController
