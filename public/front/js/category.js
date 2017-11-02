
$(function(){
  
  //弹跳事件
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
  });
  
var sc= mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators:false
});
 console.log(sc);

//向后台拿数据填充左侧数据(一级分类)
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function(data){
      console.log(data);
      var html=template("tml",data);
      $(".first_nav").html(html);
      
      secondRender(data.rows[0].id);
      
    }
  })
  
  
  var id=0;
  $(".first_nav").on("click","li",function(){
    $(this).addClass("now").siblings().removeClass("now");
     id=$(this).data("id");
      secondRender(id);
  
  })
  

  //封装一个函数用来实现二级分类查询,两次调用,
  // 一次在界面开始显示的是第一个row的图标
  //第二次在点击后获得id值显示对应的图标
  //参数:获得的id值
  function secondRender(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      success:function(data){
        console.log(data);
        var html=template("tml2",data);
        $(".second_nav").html(html);
      
      }
    })
  }
  
 
})