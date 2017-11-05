$(function(){

  
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function(data){
      console.log(data);
      $(".user").html(template("tml",data))
    }
  })
  
  $(".checkout").on("click",function(){
    mui.confirm("你确定退出吗?","提示",["否","是"],function(e){
      if(e.index==0){
        mui.toast("取消退出");
      }else{
        location.href="login.html";
      }
    })
  })
  
})