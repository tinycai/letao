/**
 * Created by JIANG on 2017/10/29.
 */

//首先要判断用户是否登录
if(location.href.indexOf("login.html")<0){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function(data){
      if(data===400){
        location.href="login.html";
      }
    }
  })
}


//进度条功能
$(function(){
  //进度条功能
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },500);
  })
  
  
  //头部菜单按钮动画
  $(".justify").on("click",function(){
    $(".aside").toggleClass("now");
    $(".contener").toggleClass("now");l
  })
  
  //左侧导航动画开始
  $(".nav li").on("click",function(){
    $(this).toggleClass("now");
  })
  
  //二级分类点击事件
  $(".category").on("click",function(){
    $(".child").slideToggle();
  })
  
  
  //公用退出功能
    //1.显示模态框
    $(".logout").on("click",function(){
      $("#myModal").modal("show");
    })
    //2.点击模态框上的取消按钮,退出模态框模式
    $(".cancel").on("click",function(){
      $("#myModal").modal("hidden");
    })
    //3.点击模态框的确认按钮,确认退出
    $(".confirm").on("click",function(){
      $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function(data){
          //如果退出成功,则跳转到登录界面
          if(data.success){
            location.href="login.html";
          }
        }
      })
    })
})





