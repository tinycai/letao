$(function(){
  //表单校验功能
    //1.用户名,密码不能为空
    //2.用户密码必须是6-12位
  
  
  //初始化表单校验插件
  var $form=$("#form");
  $form.bootstrapValidator({
    
    //校验时使用的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    //配置校验规则
    fields:{
      //配置所有的字段的规则,对应表单中的name属性
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"用户密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"用户密码必须是6-12位"
          },
          callback:{
            message:"用户密码错误"
          }
        }
      }
    }
  });
  
  //获取validator实例,通过该是实例调用一些方法
  var validator=$("#form").data("bootstrapValidator");
  
  //注册表单成功提交事件
  $form.on("success.form.bv",function(e){
    //在表单提交的时候,默认会刷新页面,而通过ajax方式可以避免刷新
    //所以要组织浏览器默认行为
    e.preventDefault();
    
    //使用ajax方式提交数据
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function(data){
        if(data.success){
          location.href="index.html"
        }else{
          if(data.error === 1000){
            //使用js代码让username这个字段校验失败。
            //第一个参数：name属性
            //第二个参数：INVALID    VALID
            //第三个参数：
            validator.updateStatus("username", "INVALID", "callback");
          }
  
          if(data.error === 1001){
            validator.updateStatus("password", "INVALID", "callback");
          }
        }
      }
    })
  });
  
  //表单重置功能
  $("[type='reset']").on("click",function(){
    validator.resetForm();
  })
  
  
  
  
});