// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    img:"",
    detail:[
      {
        name:"关于我们",
        url:"/pages/my/contant/contant",
        src:"/image/contant.png"
      },
      {
        name:"我的发布",
        url:"/pages/my/post_mine/post_mine",
        src:"/image/post_mine_.png"
      },


    
  ]
  },
  get_info:function (e) {
    console.log(e)
    console.log(e.detail.userInfo)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login:function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })
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
  prize:function (e) {
    wx.previewImage({
      current:"https://7975-yun1-5gy3a6uw4b2f28e8-1306221227.tcb.qcloud.la/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210904170055.jpg?sign=70fc8a98bceb8624729f22c65c595e89&t=1630746658", // 当前显示图片的http链接
      urls: ["https://7975-yun1-5gy3a6uw4b2f28e8-1306221227.tcb.qcloud.la/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210904170055.jpg?sign=70fc8a98bceb8624729f22c65c595e89&t=1630746658"] // 需要预览的图片http链接列表
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})