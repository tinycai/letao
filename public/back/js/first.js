$(function(){

  //发送ajax请求向表格中传入数据
  var currentPage=1;
  var pageSize=5;
  
  function render(){
    $.ajax({
      type:"get",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      url:"/category/queryTopCategoryPaging",
      success:function(data){
        var html=template("tml",data);
        $("tbody").html(html);
      
        //创建分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          size:"small",
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render()
          }
        })
      }
    })
  }
  render();
  
})