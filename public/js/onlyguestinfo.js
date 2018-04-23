$(function(){
//取得option的方法
  // $("#invisible_storeid").children(i).text()
  //儲存地區資訊
//   const store_area = [];
//   //儲存商店名稱資訊
//   const store_name = [];
//   //儲存精簡過的地區資料
//   //取得隱形select 中含有多少個 option 將值存入陣列中方便操作
//   const store_len = $("#invisible_storearea").children().length;
//   for (var i = 0; i < store_len; i++) {
//     let reg = {
//       id: $("#invisible_storearea option").eq(i).val(),
//       area: $("#invisible_storearea option").eq(i).text()
//     }
//     store_area.push(reg);

//     let reg2 ={
//       id: $("#invisible_storenamed option").eq(i).val(),
//       name: $("#invisible_storenamed option").eq(i).text()
//     }
//     store_name.push(reg2)
//   }

//==================================
const store_status_arr = [];
const store_len = $("#invisible_store_status_date").children().length;
for (var i = 0; i < store_len; i++) {
        let reg = {
          id: $("#invisible_store_status_date option").eq(i).val(),
          date: $("#invisible_store_status_date option").eq(i).text(),
          time: $("#invisible_store_status_time option").eq(i).text()
        }
        store_status_arr.push(reg);

}
// console.log(store_status_arr[0].id)
//============================================
// const guesttime = $("#inputTime").val();
// const guestdate = $("#inpdate").val();
// const gueststoreid = $("#real_store_id").val();
$("#select_time").change(function () {
 guesttime = $("#inputTime").val();
 guestdate = $("#inpdate").val();
 gueststoreid = $("#real_store_id").val();
 mapping(gueststoreid,guestdate,guesttime);
})

function mapping(gueststoreid,guestdate,guesttime){
    console.log(store_status_arr[0].id,store_status_arr[0].date,store_status_arr[0].time);
    console.log(gueststoreid,guestdate,guesttime)
    for(var i = 0; i < store_len; i++){
        if(store_status_arr[i].id == gueststoreid &&store_status_arr[i].date == guestdate&&store_status_arr[i].time == guesttime ){
            alert("此時段已有人預約，請重新選擇，謝謝")
            $("#inputTime").val("");
            $("#select_time").val("請挑選時段");
        }
    }
}


})
