$(function(){

  //发送ajax请求向表格中传入数据
  var currentPage=1;
  var pageSize=2;
  
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
  
  
  
  //为添加按钮创建点击事件
  $(".add").on("click",function(){
    //显示模态框
    $("#firstModal").modal("show");
  })
  
  //给表单做校验311
  var form=$("#form");
  
  form.bootstrapValidator({
    //1.指定不校验类型
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    
    //2.指定校验时的图标显示,默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    //指定校验字段
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类不能为空"
          }
        }
      }
    }
  })
  
  //阻止浏览器默认行为
  form.on("success.form.bv",function(e){
    e.preventDefault();
  
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:form.serialize(),
      success:function(data){
        if(data.success){
          //关闭模态框
          $("#firstModal").modal("hide");
          //更新数据
          currentPage=1;
          render();
          
          //重置表单
          form.data("bootstrapValidator").resetForm();
          //并且会隐藏所有的错误提示和图标
          form[0].reset();
        }
      }
    })
  
  
  
  
  })
  
  
 
  
 
})
