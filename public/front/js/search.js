$(function(){
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
  })

  render();
  
  //功能1:获取本地存储的历史记录,  !!localStorage只能存储字符串
  function getData(){
    var search_history=localStorage.getItem("lt_search_history") || "[]";
    //将字符串转化为数组
    var arr=JSON.parse(search_history);
    return arr;
  }
  
  //功能2:将本地存贮的数据进行渲染
  function render(){
    var search_history=localStorage.getItem("lt_search_history") || "[]";
    //将字符串转化为数组
    var arr=JSON.parse(search_history);
    // console.log(arr);
    $(".history_content").html(template("tml",{arr:arr}));
    $(".history_content").removeClass("now");
  }
 
  
  
  //清空功能
  $(".empty").on("click",function(){
    //清除本地存储的数据
    localStorage.removeItem("lt_search_history");
    render();
  })
  
  
  //添加功能
      //1. 注册点击事件
      //2. 获取文本框中的value值，判断如果没有输入关键字，给用户一个提示
      //3. 需要把这个value值存储到缓存中
      //4. 页面需要跳转到搜索详情页-  把关键字带过去
  $(".btn_search").on("click",function(){
    var value=$(".search_text").val().trim();
    if(value===""){
      alert("请输入搜索内容");
      //返回空
      return;
    }
    
    //把value值存储到缓冲中
    //1. 先从缓冲中把数组获取到
    var arr=getData();
    //如果数组中已经存在了这条记录，删除这条记录，把value存到第一条
    //如果数组的长度>=10,删除最后一条，把key存在第一条
    
    var index=arr.indexOf(value);
    if(index>-1){
      //splice的用法
      //参数一:截取的下标
      //参数二:删去的个数
      //参数三:添加的元素
      arr.splice(index,1);
    }
    
    if(arr.length>=15){
      arr.pop();
    }
    //如果两个条件都满足,就将文本框的内容存入到,数组的第一个
    arr.unshift(value);
    
    //存储到缓存中
    //存入的必须是字符串
    var str=JSON.stringify(arr);
    localStorage.setItem("lt_search_history",str);
    
    render();
    
    //清空文本框中的内容
    $(".search_text").val(" ");
    
    //跳转到searchList.html界面
    location.href="searchList.html?key="+value;
  })
  
  
  //删除功能思路：
//1. 点击删除按钮，（委托事件）
//2. 获取到当前按钮的自定义属性 data-index
//3. 获取缓存中的数据，  把data-index对应的那条记录删除
//4. 把这个数组重新存储到缓存中
//5. 重新渲染
  $(".history_content").on("click",".delete",function(){
    var $this=$(this);
    var btnArray = ["是", "否"];
    mui.confirm('你确定要删除这条搜索历史吗?','警告',btnArray,function(data){
      if(data.index==0){
        var index=$this.data("index");
        var arr=getData();
        console.log(index);
        //删除那条数据
        arr.splice(index,1);
        var str=JSON.stringify(arr)
        localStorage.setItem("lt_search_history",str);
        render();
        mui.toast('删除成功');
      }else{
        mui.toast('删除失败');
      }
      
    });
    
  })
});
