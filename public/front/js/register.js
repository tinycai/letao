$(function(){
  
  //点击获取验证码触发的事件
  $(".btn_getcode").on("click",function(){
    //判断是否含有disable类,如果有则不做任何操作
    if($(this).hasClass("disable")){
      return false;
    }
    $(this).addClass("disable");
    var $this=$(this);
    
    //设置验证码倒计时
    var num=60;
    
    //调用后台接口获取验证码
    $.ajax({
      type:"get",
      url:"/user/vCode",
      success:function(data){
          console.log(data.vCode);
        var timer=setInterval(function(){
          num--;
          $this.html(num+"正在发送验证码....");
          if(num<=0){
            clearInterval(timer);
            $this.html("重新发送验证码")
          }
        },1000)
      }
    })
  })
  
  
  $(".reg_book").on("click",function(){
    var username=$(".username").val();
    var password=$(".password").val();
    var confirm_pwd=$(".confirm_pwd").val();
    var vcode=$(".v_code").val();
    var tel=$(".tel").val();
    // console.log(tel);
    if(!username){
      mui.toast("请输入用户名");
      return false;
    }
    if(!password){
      mui.toast("请输入密码");
      return false;
    }
    if(!confirm_pwd){
      mui.toast("请输入确认密码");
      return false;
    }
    if(password!=confirm_pwd){
      mui.toast("两次密码不一致");
      return false;
    }
    if(!tel){
      mui.toast("请输入电话号码");
      return false;
    }
    //手机号要使用正则表达式做判断,11位数字
    if(!/^1[34578]\d{9}$/.test(tel)){
      mui.toast("请输入有效的手机号")
      return false
    }
    
    
    if(!vcode){
      mui.toast("请输入验证码");
      return false;
    }
    
    //验证码是6位数字
    if(!/^\d{6}$/.test(vcode)){
      mui.toast("请输入有效的验证码");
      return false;
    }
    
    //发送ajax请求验证验证码
    $.ajax({
      type:"post",
      url:"/user/register",
      data:{
        username:username,
        password:password,
        mobile:tel,
        vCode:vcode
      },
      success:function(data){
        console.log(data);
        if(data.success){
          mui.toast("注册成功,即将跳转到下个界面")
          setTimeout(function(){
            location.href="login.html";
          },1000);
        }else{
          mui.toast(data.message);
        }
      }
    })
    
  })
  
})