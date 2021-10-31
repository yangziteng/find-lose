// pages/post/mine_find/mine_find.js
wx.cloud.init()
const db = wx.cloud.database()
const data = db.collection('find_lose_obj')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    info:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:"get_openid",
    }).then(res=>{
      console.log(res.result.openid)
      that.setData({
        openid:res.result.openid
      })
      console.log(that.data.openid)
      wx.cloud.callFunction({
        name:"get_choose_data",
        data:{
          shape:5,
          openid:that.data.openid
        }
      }).then(res=>{
        wx.hideLoading()
        console.log(res)
        that.setData({
          info:res.result.data,
        })
        console.log(that.data.info)
      })
    })
  },
  delete:function(e){
    console.log(e.currentTarget.id)
    var id=e.currentTarget.id
    var _id=this.data.info[id]._id
    var that =this
    console.log(_id)
    wx.showModal({
      title: '提示',
      content: '请确定是否删除',
      success (res) {
        if (res.confirm) {
          data.doc(_id).remove({
            success:function(res){
              data.where({
               _openid:that.data.openid
              }).get().then(e=>{
                console.log(e.data)
                that.setData({
                  info:e.data
                })
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  new_p:function(res){
    console.log(res.currentTarget.dataset.index)
    var index = res.currentTarget.dataset.index
    var that =this
    wx.showLoading({
      title: '加载中',
      success(res){
        app.globalData.index=index
        wx.navigateTo({
          url: '/pages/index_detail/index_detail?id='+that.data.info[index].id+"&index="+that.data.info[index].index
        })
        //将index放在全局变量
       
        // app.globalData.info=that.data.info
        // console.log(that.data.info[index].id)
        wx.hideLoading()
      }
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