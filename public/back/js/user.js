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
        // console.log(data.total);
        // console.log(data);
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
  
  
  //因为按钮是动态渲染出来的,所以给tbody注册委托事件
  $("tbody").on("click",".btn",function(){
    //显示模态框
    $("#btnModal").modal("show");
    
    //获取存储在td上的id值和isDelete的值
    var id=$(this).parent().data("id");
    var isDelete=$(this).parent().data("isDelete");
    isDelete=isDelete===1?0:1;
  
    //注册操作按钮模态框上确认按钮的点击事件
    //为了避免重复注册事件,!!!一定要先取消之前的事件!!!
    $(".user_confirm").off().on("click",function(){
      //隐藏模态框
      $("#btnModal").modal("hide");
      //更新用户信息调用ajax请求
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(data){
          if(data.success){
            console.log(1);
            render();
          }
        }
      })
    })
    
  })
  
  
 
})