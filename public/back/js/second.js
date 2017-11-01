$(function(){
  var currentPage=1;
  var pageSize=3;
  var $form=$("#form");
  // console.log($form);
  
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        // console.log(data);
        var html=template("tml",data)
        $("tbody").html(html);
      
        //制作分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          size:"small",
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  }
  render();
  
  
  
  //创建添加按钮事件
  $(".add").on("click",function(){
    $("#secondModal").modal("show");
  })
  
  
  //点击下拉框上的按钮触发事件
  $("#btn1").on("click",function(){
    
    var currentPage=1;
    var pageSize=100;
    //发送ajax请求,查询一级分类
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        // console.log(data);
        //不需要data.success做if判断,因为是查数据,不需要做判断
        var html=template("tml2",data);
        $(".dropdown-menu").html(html);
      }
    })
  })
  
  
  //因为a标签是渲染出来的数据,所以要创建委托事件
  $(".dropdown-menu").on("click","a",function(){
    
    //让下拉框的按钮显示的是选中的a标签的文本
    $(".dropdown_text").text($(this).text());
    
    //让a标签记录的id值,存在隐藏域name=categoryId中
    $("#categoryId").val($(this).data("id"));
    
    //让categoryId的校验通过
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })
  
  
  //初始文件上传
  $("#fileupload").fileupload({
    dataType:"json",
    //当文件上传成功时，会执行这个回调函数
    done:function (e, data) {
      //获取文件上传结果
      //给默认图片设置src
      $(".img_box img").attr("src", data.result.picAddr);
      $("#brandLogo").val( data.result.picAddr );
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  
  
  //表单校验
  $form.bootstrapValidator({
    //因为含有隐藏域所以指定不校验类型是空
    excluded: [],
    
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
  
      brandName:{
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级级分类'
          }
        }
      },
  
      brandLogo:{
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传图片'
          }
        }
      }
    }
    
  });
  
  //表单校验成功
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    
    //将数据传入后台
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function(data){
        if(data.success){
          console.log(1);
          $("#secondModal").modal("hide");
          currentPage=1;
          render();
          
          //重置表单
          $form[0].reset();
          $form.data('bootstrapValidator').resetForm();
          
          //手动还原表单中的数据
          $(".dropdown_text").text("请选择一级分类");
          $(".img_box img").attr("src","images/none.png");
        }
      }
      
    })
  })
})