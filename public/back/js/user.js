$(function(){
  //设置页码
  var currentPage=1;
  //设置每页显示的数量
  var pageSize=5;
  
  
  function render(){
    //向后台发送ajax请求获取user信息
    $.ajax({
      type:"get",
      data:{page:currentPage,pageSize:pageSize},
      url:"/user/queryUser",
      success:function(data){
        // console.log(data);
        //打印出来的是数组,要转化为对象
        // console.log(data.rows);
        var html=template("tml",data);
        $("tbody").html(html);
      
      
        //分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//指定bootstrap的版本
          currentPage: currentPage,//指定了当前是第几页
          size: "small",
          totalPages: Math.ceil(data.total / pageSize),
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render()
          }
        });
      }
    })
  }
 
  render();
  
  
  
 
})