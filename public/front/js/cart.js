$(function(){
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback:function(){
          
          //渲染购物车功能
          $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function(data){
              console.log(data);
              setTimeout(function(){
                //在渲染数据之前判断是否登录过
                tools.checkLogin(data);
                $("#OA_task_2").html(template("tml",{data:data}));
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              },1000)
            }
          })
        }
      }
    }
  });
  
  
  //给删除按钮注册点击事件(不能使用click,只能使用tap)
  $("#OA_task_2").on("tap",".btn_delete",function(){
    //获取id必须
    var id=$(this).data("id");
    // console.log(id);
    mui.confirm("亲,你确定删除吗?","提示",["否","是"],function(data){
      if(data.index==0){
        mui.toast("操作取消");
      }else{
        //调用删除购物车端口
        $.ajax({
          type:"get",
          url:"/cart/deleteCart",
          data:{
            id:[id]
          },
          success:function(data){
            console.log(data);
            if(data.success){
              tools.checkLogin(data);
              //让之下拉刷新一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
              mui.toast("删除成功");
            }
          }
        })
      }
    })
  })
  
  
  //给编辑按钮注册点击事件(只能用tap不能用click)
  $("#OA_task_2").on("tap",".btn_edit",function(){
    
    //通过模板来渲染数据
    var data=this.dataset;
    console.log(data);
    var html=template("tml2",data);
    //要将html中所有的"\n"都替换掉,否则会出现大量换行
    html=html.replace(/\n/g,"")
    
    
    //获取参数
    var id=$(this).data("id");
    
    
    mui.confirm(html,"编辑",['取消','确认'],function(data){
      if(data.index==0){
        mui.toast("操作取消");
      }else{
        //调用后台接口修改数据
        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:id,
            size:$(".tml2_size_num.now").html(),
            num:$(".mui-numbox-input").val()
          },
          success:function(data){
            if(data.success){
              tools.checkLogin(data);
              //让之下拉刷新一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
              mui.toast("修改成功");
            }
          }
        })
      }
    })
    //给弹出框中的尺码注册点击事件
    // 动态添加的Numbox组件需要手动初始化
    mui(".mui-numbox").numbox()
  
    //因为已经渲染出来所以不需要注册委托事件
    $(".tml2_size_num").on("tap",function(){
      $(this).addClass("now").siblings().removeClass("now");
    })
  })
  
  
  //计算总价格
  $("#OA_task_2").on("click",".checkbox",function(){
    var total=0;
    // console.log(1);
    
    //筛选出被选中的checkbox
    $(":checked").each(function(i,e){
      // console.log(e);
      total+=$(e).data("price")*$(e).data("num");
    })
    total=parseFloat(total).toFixed(2);
    $(".total").html(total);
  })
  
})
  

