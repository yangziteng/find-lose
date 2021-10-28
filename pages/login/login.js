//index.js
//获取应用实例
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
const data = db.collection('usernameid')
//index.js
//获取应用实例
Page({
  data:{
    user:"",
    pwd:""
  },
  onReady: function () {
  },
  onShow:function (e) {
    // wx.showLoading({
    //   title: '数据载入中',
    //   mask:true
    // })
    // wx.cloud.callFunction({
    //   name:"get_openid",
    //   success (res){
    //     console.log(res)
    //     data.where({ide:"name"+res.result.openid}).get({
    //       success(res){
    //         wx.hideLoading()
    //         console.log(res.data.length)
    //         if(res.data.length!=0){
    //           wx.reLaunch({
    //             url: '/pages/index/index',
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
    
  },
  activity: function (e) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  login(e){
    var that =this
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.user.length == 0 || this.data.pwd.length == 0) {
      wx.showToast({
        title: '帐号及密码不能为空',
        icon: "none"
      })
      return -1;
    }
      wx.showLoading({
      title: '刷新中',
      mask: true
    })
    var that = this;
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {
        username: that.data.user,
        password: that.data.pwd,
      },
      success: res => {
       
        console.log(res,10233)
        if (res.result = true) {
          wx.cloud.callFunction({
            name:"get_openid",
            success(res){
              app.globalData.userInfo=res.result.openid
              // wx.setStorage({key:"user",data:res.result.openid})
              console.log(res)
              data.add({
                data:{
                  user:that.data.user,
                  password:that.data.password,
                  ide:"name"+res.result.openid 
                },
                success(res){
                  console.log(res)
                }
              })
            }
          })
            wx.reLaunch({
              url: '/pages/index/index'
            })
        }
        else {
          wx.showToast({
            icon: 'none',
            title: res.result.msg,
          })
        }
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          icon: 'none',
          title: '校园网关闭或者服务器异常',
        })
      }
    })
   
  },
  // login: function (e) {
  //   var that = this
    // if (this.data.user.length == 0 || this.data.pwd.length == 0) {
    //   wx.showToast({
    //     title: '帐号及密码不能为空',
    //     icon: "none"
    //   })
    //   return -1;
    // }
  //   wx.showLoading({
  //     title: '刷新中',
  //     mask: true
  //   })
  //   var that = this;
  //   wx.showLoading({
  //     title: '登录中',
  //     mask: true
  //   })
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {
    //     username: that.data.user,
    //     password: that.data.pwd,
    //   },
    //   success: res => {
    //     wx.setStorage({
    //       key: 'data',
    //       data: ""
    //     })
    //     console.log(res,10233)
    //     if (res.result.msg == "/login!welcome.action") {
    //         wx.reLaunch({
    //           url: '/pages/index/index'
    //         })
    //     }
    //     else {
    //       wx.showToast({
    //         icon: 'none',
    //         title: res.result.msg,
    //       })
    //     }
    //   },
    //   fail: err => {
    //     console.log(err)
    //     wx.showToast({
    //       icon: 'none',
    //       title: '校园网关闭或者服务器异常',
    //     })
    //   }
    // })
  // },
  input(e){
    this.setData({
      [e.target.id]:e.detail.value
    })
  },

  // 帮助弹窗
  tapHelp: function(e){
    if(e.target.id == 'help_model'){
      this.hideHelp();
    }
  },
  showHelp: function(e){
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e){
    this.setData({
      'help_status': false
    });
  },
  copy(){
    wx.setClipboardData({
      data:'http://210.38.250.43/',
      success(){
        wx.showToast({
          title: '已成功复制地址，快用浏览器打开吧',
          icon: "none"
        })
      }
    })
  }

})

