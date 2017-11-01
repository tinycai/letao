$(function(){
  var currentPage=1;
  var pageSize=5;
  var $form=$("#form");
  var imgArr=[];
  
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
  
  
  //给添加商品注册点击事件
  $(".add").on("click",function(){
    $("#productModal").modal("show");
  })
  
  
  //查询二级分类的数据
  $("#btn1").on("click",function(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function(data){
        $(".dropdown-menu").html(template("tml2",data));
      }
    })
  })
  
  //给下拉框ul注册委托时间
  $(".dropdown-menu").on("click","a",function(){
    $(".dropdown_text").text($(this).text());
    $("#brandId").val($(this).data("id"));
    // console.log($("#brandId").val());
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  })
  
  //图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">')
      imgArr.push(data.result);
      if(imgArr.length===3){
        //改成通过状态
        $form.data("bootstrapValidator").updateStatus("brandLogo","VALID");
      }else{
        $form.data("bootstrapValidator").updateStatus("brandLogo","INVALID");
      }
    }
  })
  
  
  //校验表单
  $form.bootstrapValidator({
    //默认不校验的配置
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            //必须是0以上的数字
            regexp:/^[1-9]\d*$/,
            message:"请输入一个大于0的库存"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺寸"
          },
          regexp:{
            //33-55
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入正确的尺码（30-50）"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品的折扣价"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      },
    }
  });
  
  
  //提交表单
 $("#form").on("success.form.bv",function(e){
   e.preventDefault();

   var tmp=$form.serialize();
   //该字符串不完整,必须要将图片的picName和picAddr拼在其后
   tmp+="&picName1="+imgArr[0].picName+"&picAddr1="+imgArr[0].picAddr;
   tmp+="&picName2="+imgArr[1].picName+"&picAddr2="+imgArr[1].picAddr;
   tmp+="&picName3="+imgArr[2].picName+"&picAddr3="+imgArr[2].picAddr;
   
   //发送ajax请求
   $.ajax({
     type:"post",
     url:"/product/addProduct",
     data:tmp,
     success:function(data){
       if(data.success){
         $("#productModal").modal("hide");
         currentPage=1;
         render();
  
         //重置表单
         $form[0].reset();
         $form.data("bootstrapValidator").resetForm();
         
         //手动修改下拉框中的文字
         $(".dropdown_text").text("请选择二级分类");
         $(".img_box img").remove();
         imgArr=[];
         
       }
     }
   })
 })
  
})
