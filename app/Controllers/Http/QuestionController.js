'use strict'
const questionM = use('App/Models/Questionnaire')
const moment2 = use('moment')
const XlsxPopulate = use('xlsx-populate')
class QuestionController {
    async index({ view,session }){
        const question_data = await questionM.all();
        const question_data2 = question_data.toJSON();

        for(let i=0;i<question_data2.length;i++){
            question_data2[i].qu_test_date = moment2(question_data2[i].qu_test_date).format("YYYY-MM-DD");
        }

        return view.render('hiaudrey.questionindex',{
            SessionUser:session.get('username')+"你好",
            question_data:question_data2
        })
    }
    async writequestion({ view,session }){
        return view.render('hiaudrey.question',{
            SessionUser:session.get('username')+"你好"
        })
    }

//新增
    async store({ view,session,request,response }){
        const guest_data = request.only([
          'qu_store_num',
          'qu_store_name',
          'qu_test_date',
          'qu_test_size',
          'qu_size',
          'qu_1_1_1',
          'qu_1_1_2',
          'qu_1_1_3',
          'qu_1_2_1',
          'qu_1_2_2',
          'qu_1_2_3',
          'qu_1_3_1',
          'qu_1_3_2',
          'qu_1_3_3',
          'qu_2_1',
          'qu_2_2',
          'qu_2_3',
          'qu_2_4',
          'qu_2_5',
          'qu_2_6',
          'qu_2_7',
          'qu_2_7_2',
          'qu_2_8',
          'qu_award_num',
          'qu_service_name',
          'qu_award_name'
        ])

        await questionM.create(guest_data)
        session.flash({
          addsucess: "新增成功"
        })
        return response.redirect('/question')

    }

        //刪除
        async delete({params,session,response}){
            const delMem = await questionM.find(params.id)
            await delMem.delete()
            session.flash({ notification:'刪除成功' })
            return response.redirect('/question')
            
        }

        async downloadguestinfo({request,response,next}) {
          //==================下載的excel標題部分
          var hello = await XlsxPopulate.fromBlankAsync()
            .then(async workbook => {

              const r = workbook.sheet(0).range("B1:AA1");
              r.value([
                ["櫃號", "櫃名", "試穿日期", "試穿尺寸", "尺碼", "上胸圍", "下胸圍", "罩杯", "腰圍", "臀圍", "建議穿著內衣尺寸","A=上胸圍/腰圍","B=臀圍/腰圍","身型密碼","您曾經穿過Audrey魔塑W弦內衣嗎","您知道Audrey魔塑W弦內衣是台灣奧黛莉公司所擁有多國專利的商品嗎?","選購內衣時，吸引您的功能特點是什麼","您認為Audrey魔塑W弦內衣穿起來最令您滿意的地方","未來Audrey魔塑W弦內衣推出新款時, 您會喜歡什麼花色","您重視的內衣材質","您喜歡Audrey魔塑W弦內衣罩杯前中心鏤空的穿著效果嗎","原因","您會推薦誰體驗or購買Audrey魔塑W弦內衣","兌換貨號","服務員簽名","兌換者簽名"],
              ]);
              workbook.sheet(0).range("B1:AA1").style({
                fontColor: "ffffff",
                fill: "272727",
                horizontalAlignment: 'center'
              });

              //===================抓資料
              const question_data = await questionM.all();
              const question_data2 = question_data.toJSON();
      
              for(let i=0;i<question_data2.length;i++){
                  question_data2[i].qu_test_date = moment2(question_data2[i].qu_test_date).format("YYYY-MM-DD");
              }

              var datacount = question_data2.length;
              var arr = [];
              var arr2 =[];
              var rr = [];
              for(let i =0;i<datacount;i++){
                rr[i] =  workbook.sheet(0).range("B"+(i+2)+":AA"+(i+2));

                  var qus = question_data2[i];
                  for(var ob in qus){
                      arr2.push(qus[ob]);
                  }
                  arr.push(arr2);
                  rr[i].value(arr);
                  arr.length=0;
                  arr2.length=0;
              }
              

              //建立此excel檔案到server
              // Write to file.
              return workbook.toFileAsync("./public/download/book.xlsx");
            });

          return await response.attachment('./public/download/book.xlsx', 'Hello.xlsx');


        }

}

module.exports = QuestionController
