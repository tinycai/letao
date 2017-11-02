$(function(){
  mui(".mui-scroll-wrapper").scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  
  
  //思路：
  //1. 获取地址栏的参数，设置到文本框中.
  //2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
  //3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
  //4. 点击排序，需要对商品进行排序。
  //5. 添加一个遮罩效果
  
  //调用tools方式获取地址栏中传入的一级分类的名称

 
 data={
   proName:"",
   brandId:"",
   price:"",
   num:"",
   page:1,
   pageSize:10
 }

 function render(data){
   $.ajax({
     type:"get",
     url:"/product/queryProduct",
     data:data,
     success:function(data){
       console.log(data);
       $(".pic_area").html(template("tml",data))
     }
   })
  
 }
  var value=tools.getKey("key");
  $(".search_text").val(value);
  data.proName=value;
  render(data);
  
 
  
  $(".btn_search").on("click",function(){
   //将a标签的样式还原
    $(".pro_nav a").removeClass("now");
    //将所有的箭头都恢复原来朝下的状态
    $(".pro_nav span").removeClass("fa-angle-up").addClass("fa-angle-up");
    //将之前的price和num清空,避免影响后面的排序
    data.price="";
    data.num="";
    var value=$(".search_text").val().trim();
    $(".search_text").val("");
    if(value==""){
      mui.toast("请输入搜索内容");
    }
    data.proName=value;
    render(data);
    
  })
  
  
  //排序功能
  $(".pro_nav a[data-type]").on("click",function(){
    
    //如果当前a标签没有now， 给当前a标签加上now，同时清除其他a的now,  还需要把其他a标签的箭头都向下即可。
    var $this=$(this);
    var $span=$(this).find("span");
    
  
    //如果当前a标签有now， 切换span的箭头
    if($(this).hasClass("now")){
      //toggleClass用于切换class类,表示有这个类就去掉,没有就加上
      $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else{
      $this.addClass("now").parent().siblings().children("a").removeClass("now");
      //将其他span的箭头都朝下
      $(".pro_nav span").removeClass("fa-angle-up").addClass("fa-angle-down")
    }
    
    //获取并判断点击的是价格还是库存
    var type=$this.data("type");
    // console.log(type);
    var value=$span.hasClass("fa-angle-down")?2:1;
    // console.log(value);
  
    //要将之前的price和num清空
    data[type]=value;
    render(data);
  })
  
  
 
  
})