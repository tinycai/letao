
var tools={
  setKey:function() {
    var obj = {};
    //获取地址栏传入的参数
    var search = location.search;
    //去除问号
    var str = search.slice(1);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split("=")[0];
      var value = decodeURI(arr[i].split("=")[1]);
      obj[key] = value;
    }
    return obj;
  },
  getKey:function(key){
      return this.setKey()[key];
    },
  checkLogin:function(data){
    if(data.message==400){
      location.href="login.html?=retUrl"+location.href;
    }
  }
    
}

