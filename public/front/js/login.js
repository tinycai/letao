

var search=location.search;
// console.log(search);
var str=search.slice(1);
var returnUrl=str.replace("retUrl=","");
// console.log(returnUrl);

$(".btn_login").on("click",function(){
  var username=$(".login_user").val();
  var password=$(".login_pwd").val();

  if(!username){
    mui.toast("请输入用户名");
    return;
  }
  if(!password){
    mui.toast("请输入密码");
    return;
  }
  
  
  $.ajax({
    type:"post",
    url:"/user/login",
    data:{
      username:username,
      password:password
    },
    success:function(data){
      if(data.success){
        var search=location.search;
        //如果地址栏中有回调的地址就回到原来的地方
        if(search.indexOf("retUrl=")>-1){
          var str=search.slice(1);
          var returnUrl=str.replace("retUrl=","");
          location.href=returnUrl;
        }else{
          //如果没有就登录界面
          location.href="user.html";
        }
      }
      
      if(data.error===403){
        mui.toast(data.message);
      }
      
    }
  })
})
