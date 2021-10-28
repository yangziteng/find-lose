//查看详情页面
wx.cloud.init()
const db = wx.cloud.database()
const data_name = db.collection('usernameid')
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    index:"",
  },


  //预览图片
  img:function(e){
    console.log(e)
    wx.previewImage({
      urls: [e.target.id]
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  //每次页面加载时获取数据，根据index定位
  onLoad: function (e) {
    console.log(e.infomation)
    this.navigatelogin()
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  //获得初始化数据info和index
  navigatelogin:function (e) {
    var that =this
       var infomation=app.globalData.info[app.globalData.index]
       
        console.log(app.globalData.info)
        that.setData({
        infomation:infomation
      })
     
    if(infomation.condition=="失物")
      that.setData({
        wp:"丢失物品",
        place:"所在校区",
        sj:"丢失时间"
      })
        else if(infomation.condition=="拾物")
        that.setData({
          wp:"拾捡物品",
          place:"所在校区",
          sj:"拾物时间"
      })
 },
  //获取专属二维码
  creat_codeimg:function (e) {
    var infomation = JSON.stringify(this.data.infomation) 
    var query = "?infomation="+infomation
    console.log(query)
    wx.showLoading({
      title: '二维码生成中',
    })
    wx.cloud.callFunction({
      name:"get_img",
      data:{  
        query:query
      },
      success(res){
        wx.hideLoading()
        console.log(res)
        console.log(res.result.wxacodefileID)
        app.globalData.imgid = res.result.wxacodefileID
        wx.navigateTo({
          url: '/pages/share/share',
        })
     
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function (e) {
  //   wx.showShareMenu({
  //     withShareTicket: true,
  //     menus: ['shareAppMessage', 'shareTimeline']
  //   })
   
  // },
  // onShareTimeline() {
  //   var query = "info="+this.data.info+"&index="+this.data.index
	// 	return { 
	//       title: '首页',
  //       query:query,
  //       imageUrl:""
	//     }
	// },
})