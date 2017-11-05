$(function(){
  mui(".mui-scroll-wrapper").scroll({
    indicators:false
  })
  
  
  //获取地址栏传入的productId
  var id=tools.getKey("productId");
  // console.log(id);
  //通过id去后台拿数据
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:id
    },
    success:function(data){
      console.log(data);
      //对数量增减框进行处理
      var arr=data.size.split("-");
      // console.log(arr);
      //["40","50"]
      var start=Number(arr[0]);
      var end=Number(arr[1]);
      var arrNum=[];
      for(var i=start;i<=end;i++){
        arrNum.push(i);
      }
      
      //要将arrNum存入data数据中,才能将数据存入前台
      data.arrNum=arrNum;
      $(".mui-scroll").html(template("tml",data));
      
      
      
      
      //当内容渲染完成后，需要去初始化轮播图
      //轮播图效果
      mui('.mui-slider').slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      mui(".mui-numbox").numbox();
    }
  })
  
  //选择尺码给对应的添加背景颜色
  $(".mui-scroll").on("click",".pro_size_num",function(){
    $(this).toggleClass("now").siblings().removeClass("now");
  })
  
  //点击"加入购物车"按钮触发的事件
  $(".foot_btn_join").on("click",function(){
    if(!($(".pro_size_num").hasClass("now"))){
      mui.toast("请选择尺码");
      return false;
    }
    
    var size=$(".pro_size_num.now").html();
    var num=$(".mui-numbox-input").val();
    
    //将数据传入后台,调用ajax请求
    $.ajax({
      type:"post",
      url:"/cart/addCart",
      data:{
        productId:id,
        num:num,
        size:size,
      },
      success:function(data){
        console.log(data);
        if(data.success){
          mui.toast("添加成功");
        }
        if(data.error===400){
          mui.toast("请登录");
          location.href="login.html?retUrl="+location.href;
        }
        
      }
    })
    
    
  })
  
  
  
  
})