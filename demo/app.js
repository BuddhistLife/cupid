//app.js
App({
  onLaunch: function () 
  {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  toLogin: function () {
     // 前往授权登录界面
             wx.navigateTo({
               url: '/pages/toLogin/toLogin',
           })
    
  },
       ready: function() {
     return Promise((resolve, reject) => {
                   const userkey = wx.getStorageSync('userkey')
                   const userId = wx.getStorageSync('userId')
                   const sessionData = wx.getStorageSync('sessionData')
       // 检查用户是否具有登陆态
       if (!userkey || !userId || !sessionData) {
         // 如果未登录就前往登录界面
         this.toLogin()
        
      } else {
     
                        resolve()
        
      }
      
    })
    26
  },
  getUserInfo:function(cb){
   
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
       })
      //调用登录接口
      // wx.login({
      //   success: function (lb) {
      //     //console.log(lb.code);
      //     //console.log(that.requestUrl);
      //     //拿到code后请求服务器获取身份标识写入缓存
      //     wx.request({
      //       url: that.requestUrl,
      //       data: 
      //       {
      //         flag: 'code' ,
      //         code: lb.code
      //       },
      //       header: 
      //       {
      //           'content-type': 'application/x-www-form-urlencoded',
      //       },
      //       method:'POST',
      //       success: function(lb) 
      //       {
      //         console.log(lb);
      //         console.log(lb.data)
      //         that.userId = lb
      //       },
      //       fail: function(lb)
      //       {
      //         console.log(lb)
      //       }
      //     })

      //     // 用户OBJ写入全局对象
      //     wx.getUserInfo({
      //       success: function (res) {
      //         that.globalData.userInfo = res.userInfo
      //         typeof cb == "function" && cb(that.globalData.userInfo)
      //       }
      //     })
      //   }
      // })
    }
  },
  globalData:{
    userInfo:null
  },
  requestUrl: 'https://weixing.tunnel.qydev.com/Login',
  userId:null,
})