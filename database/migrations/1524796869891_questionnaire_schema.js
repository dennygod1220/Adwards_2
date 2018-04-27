'use strict'

const Schema = use('Schema')

class QuestionnaireSchema extends Schema {
  up () {
    this.create('questionnaires', (table) => {
      table.increments()

      table.string('qu_store_num').comment('櫃號')
      table.string('qu_store_name').comment('櫃名')
      table.date('qu_test_date').comment('試穿日期')
      table.string('qu_test_size').comment('試穿尺寸')
      table.string('qu_size').comment('尺碼')
      table.string('qu_1_1_1').comment('上胸圍')
      table.string('qu_1_1_2').comment('下胸圍')
      table.string('qu_1_1_3').comment('罩杯')
      table.string('qu_1_2_1').comment('腰圍')
      table.string('qu_1_2_2').comment('臀圍')
      table.string('qu_1_2_3').comment('建議穿著內衣尺寸')
      table.string('qu_1_3_1').comment('A=上胸圍/腰圍')
      table.string('qu_1_3_2').comment('B=臀圍/腰圍')
      table.string('qu_1_3_3').comment('身型密碼')
      table.string('qu_2_1').comment('您曾經穿過Audrey魔塑W弦內衣嗎')
      table.string('qu_2_2').comment('您知道Audrey魔塑W弦內衣是台灣奧黛莉公司所擁有多國專利的商品嗎?')
      table.string('qu_2_3').comment('選購內衣時，吸引您的功能特點是什麼??')
      table.string('qu_2_4').comment('您認為Audrey魔塑W弦內衣穿起來最令您滿意的地方?')
      table.string('qu_2_5').comment('未來Audrey魔塑W弦內衣推出新款時, 您會喜歡什麼花色?')
      table.string('qu_2_6').comment('您重視的內衣材質?')
      table.string('qu_2_7').comment('您喜歡Audrey魔塑W弦內衣罩杯前中心鏤空的穿著效果嗎? 是否')
      table.string('qu_2_7_2').comment('您喜歡Audrey魔塑W弦內衣罩杯前中心鏤空的穿著效果嗎? 原因')
      
      table.string('qu_2_8').comment('您會推薦誰體驗or購買Audrey魔塑W弦內衣?')
      table.string('qu_award_num').comment('兌換貨號')
      table.string('qu_service_name').comment('服務員簽名')
      table.string('qu_award_name').comment('兌換者簽名')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('questionnaires')
  }
}

module.exports = QuestionnaireSchema
