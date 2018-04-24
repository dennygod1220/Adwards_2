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
const store_status_arr = [];//store_status_arr 儲存了所有在guestinfo DB內的店櫃id、預約時段、預約日期
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

//mapping 用來判斷同時段、日期、店櫃是否超過兩次
function mapping(gueststoreid,guestdate,guesttime){
    // console.log(store_status_arr[0].id,store_status_arr[0].date,store_status_arr[0].time);
    // console.log(gueststoreid,guestdate,guesttime)
    var key2 = 0;
    for(var i = 0; i < store_len; i++){
        if(store_status_arr[i].id == gueststoreid &&store_status_arr[i].date == guestdate&&store_status_arr[i].time == guesttime ){
            key2++;
        }
    }
    if (key2 >= 2) {
      alert("此時段預約已滿，請重新選擇，謝謝")
      $("#inputTime").val("");
      $("#select_time").val("請挑選時段");
    }

}

//判斷某店櫃是否已經超過100組客人預約了，使用者選擇店櫃2時觸發
    $("#store_id").change(function () {
    var this_guest_stid = $("#store_id").val();
    var now_stid_count = 0;
    for (var i = 0; i < store_len; i++) {
        if (store_status_arr[i].id == this_guest_stid) {
        now_stid_count++;
        }
    }
    //判斷是否超過的地方
    if (now_stid_count >= 100) {
        alert("此店櫃所有的預約都已經滿了歐，請換店櫃，或是下次請早");
        $("#real_store_id").val("");
        $("#store_id").val("");
    }

    })

//======================按下送出按鈕時跳出確認提醒
    $("#submitbtn").click(function(){
        console.log("con");
        
        if(confirm("『提醒您，一旦確認預約後，時間地點將無法更改。』")){
          document.forms[1].submit();
        }
        else{
          return false;
        }
    })

})
