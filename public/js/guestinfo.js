$(function () {

  //=====================挑選時段部分==================================
  const items = {
    time: ['請挑選時段', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    test: ""
  }
  const example1 = new Vue({
    //更改vue的模板語法，不然會跟edge模板衝突
    delimiters: ['[[', ']]'],
    el: '#whattime',
    data: items,
    computed: {}
  })

  $("#select_time").change(function () {
    if ($('#select_time').val() == "請挑選時段") {
      alert("請選擇一個時段");
      $("#inputTime").val("");
    } else {
      $("#inputTime").val($("#select_time").val());
    }
  })

  //========================生日選單部分========================
  const birthday_Y = ["年"];
  const birthday_M = ["月"];
  const birthday_D = ["日"];
  for (var i = 1990; i < 2019; i++) {
    birthday_Y.push(i);
  }
  for (var i = 1; i < 13; i++) {
    birthday_M.push(i);
  }
  for (var i = 1; i < 32; i++) {
    birthday_D.push(i);
  }
  const birthdaydata = {
    birthday_Y: birthday_Y,
    birthday_M: birthday_M,
    birthday_D: birthday_D,
    birthday_Y2: "年",
    birthday_M2: "月",
    birthday_D2: "日"
  }
  const birdaybody = new Vue({
    delimiters: ['[[', ']]'],
    el: '#birdaybody',
    data: birthdaydata,
    computed: {
      combination_birthday: function () {
        return this.birthday_Y2 + "-" + this.birthday_M2 + "-" + this.birthday_D2
      }
    }
  })
})

