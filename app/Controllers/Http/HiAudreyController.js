'use strict'
const Guestinfo = use('App/Models/Guestinfo')
const moment2 = use('moment')
const XlsxPopulate = use('xlsx-populate')
class HiAudreyController {
    async index({ view,session }){

        //關聯式查詢
        const all_guestinfo = await Guestinfo
          .query()
          .with('StoreInfo')
          .fetch()
        const guestdata = all_guestinfo.toJSON()

        for(let i=0;i<guestdata.length;i++){
            guestdata[i].date = moment2(guestdata[i].date).format("YYYY-MM-DD");
            guestdata[i].birthday = moment2(guestdata[i].birthday).format("YYYY-MM-DD");
        }

        return view.render('hiaudrey/index',{
            guestdata:guestdata,
            SessionUser:session.get('username')+"你好"
          })
    }


        //刪除
        async delete({params,session,response}){
            console.log("delete");
            const delMem = await Guestinfo.find(params.id)
            await delMem.delete()
            session.flash({ notification:'刪除成功' })
            return response.redirect('/HiAudrey')
            
        }

        async downloadguestinfo( {request, response, next} ) {
//==================下載的excel標題部分
            var hello = await XlsxPopulate.fromBlankAsync()
              .then(async workbook => {

                const r = workbook.sheet(0).range("A1:K1");
                r.value([
                  ["店櫃", "預約日期", "預約時間", "姓名", "電話", "生日", "Email", "特殊需求", "發票號碼", "尺寸", "建立時間"],
                  ["店櫃", "預約日期", "預約時間", "姓名", "電話", "生日", "Email", "特殊需求", "發票號碼", "尺寸", "建立時間"],
                ]);
                workbook.sheet(0).range("A1:K1").style({
                  fontColor: "ffffff",
                  fill: "272727",
                  horizontalAlignment: 'center'
                });

                //===================抓資料
                const all_guestinfo = await Guestinfo
                  .query()
                  .with('StoreInfo')
                  .fetch()
                const guestdata = all_guestinfo.toJSON()

                const newrange = "A2:K"+ (guestdata.length+2);

                const r2 = workbook.sheet(0).range(newrange);
                //外層陣列
                var arr = [];
                //內層
                var arr2 =[];
                var arr3 =[];
                //資料筆數
                for (let i = 0; i < guestdata.length; i++) {
                  guestdata[i].date = moment2(guestdata[i].date).format("YYYY-MM-DD");
                  guestdata[i].birthday = moment2(guestdata[i].birthday).format("YYYY-MM-DD");
                  for(let j = 0;j<11;j++){
                    if(j=0)
                    arr2[i][j] = guestdata[i].StoreInfo.store_name;
                    else if(j=1)
                    arr2[i][j] = guestdata[i].date;
                    
                  }
                }
                r2.value(arr2)

                //建立此excel檔案到server
                // Write to file.
                return workbook.toFileAsync("./public/download/book.xlsx");
              });

            return await response.attachment('./public/download/book.xlsx', 'Hello.xlsx');

          }

} 

module.exports = HiAudreyController
