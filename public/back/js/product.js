$(function(){
  var currentPage=1;
  var pageSize=5;
  
  function render(){
    //调用ajax向表格中传入数据
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        console.log(data);
        $("tbody").html(template("tml",data));
      
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(data.total/pageSize),
          size:"small",
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  }
  render();
  
})
