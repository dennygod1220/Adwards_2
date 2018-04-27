$(function(){
const data = {
    qu_2_3:[],
    qu_2_4:[],
    qu_2_6:[],
    qu_2_7:[],
    qu_2_7_2:[],
    qu_2_8:[]
}

var qu_2_table = new Vue({
    delimiters: ['[[', ']]'],
    el:"#qu_2_table",
    data:data,
    methods:{
        qu_2_7_YN:function(e){
            console.log(e.target.value)
            if(e.target.value == "否"){
                this.qu_2_7 = "否";
                $("#ifisfalse").attr("style","display:block")
            }
            else if(e.target.value == "是"){
                $("#ifisfalse").attr("style","display:none");
                this.qu_2_7 = "";
                this.qu_2_7 = "是";
            }
        }
    }
}) 

})