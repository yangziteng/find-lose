// pages/post/post_detail/post_detail.js
wx.cloud.init()
const db = wx.cloud.database()
const data = db.collection('find_lose_obj')
var app=getApp()
var d =new Date()
var M =d.getMonth()+1
var D =d.getDate()
var Y=d.getFullYear()
console.log(Y+"-"+M+"-"+D)
// var app=APP()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_time:Y+"-"+M+"-"+D,
    obj_:"",
    school:"",
    time:"",
    phone:"",
    content:"",
    img_url:[],
    fileIDs:[],
    obj_list:["丢失物品","物品类别","联系方式","丢失时间","所在校区","是否悬赏"],
    all_obj:["证件","电子产品","生活用品","箱包","校卡","现金","饰品","其他"],
    values:"点击请选择物品类别",
    switch1Checked:false,
    school:"点击请选择校区",
    all_school:["西城","官渡",'光华'],
    choosecolor:"#808080",
    choosecolor_:"#808080"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //options用于接收上个页面传递过来的参数
    var that = this;
    console.log(options.id)
    that.setData({ //this.setData的方法用于把传递过来的id转化成小程序模板语言
    id: options.id, //id是a页面传递过来的名称，id是保存在本页面的全局变量,在页面上{{id}}使用
    })
  },
  switch1Change:function(e){
    console.log(e.detail.value)
    this.setData({switch1Checked:e.detail.value})
  },
  input_intro:function(e){
    this.setData({content:e.detail.value})
  },

  //联系方式
  input_phone:function(e){
    this.setData({phone:e.detail.value})
  },
  //丢失时间
  input_time:function(e){
    this.setData({time:e.detail.value})
  },
   //丢失物品
   input_item:function(e){
    this.setData({obj_:e.detail.value})
  },
  //滚动
  get_style:function(e){
    console.log(e.detail.value)
    var i =e.detail.value
    var values=this.data.all_obj[i]
    console.log(values)
    this.setData({'values':values,choosecolor_:"#000000"})
  },
  get_school:function(e){
    console.log(e.detail.value)
    var school_index=e.detail.value
    var school=this.data.all_school[school_index]
    console.log(school)
    this.setData({school:school,choosecolor:"#000000"})
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

//
  upload_img:function(e){
    if(this.data.img_url.length!=0){
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      var path=this.data.img_url
      var fileIDs=[]
      var that =this
      for(var i=0;i<this.data.img_url.length;i++){
         wx.cloud.uploadFile({
          cloudPath:'images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png',
          filePath:path[i],
        }).then(res=>{
          fileIDs.push(res.fileID)
          console.log(fileIDs)
          that.submit_con(e,fileIDs)
          wx.hideLoading()
        })
        }
    }
  else{
    wx.showToast({
      title: '输入的信息不全',
      icon: 'none',
      duration: 2000
    })
  }
  },
submit_con:function (e,fileIDS) {
  console.log(fileIDS)
  var phone=this.data.phone
  //手机号格式判断
  var phoneCodeVerification = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  var isPhone=phoneCodeVerification.test(phone);
  var that =this
  console.log(this.data.content)
  if(this.data.content!=""&
    this.data.phone!=""&
    this.data.schoo_l!=""&
    this.data.time!=""&
    this.data.obj_!=""){
      if(isPhone==true){
        wx.showModal({
          title:"提示",
          content:"是否发布",
          success(e){
            if(e.confirm){
              wx.showLoading({
                title: '加载中',
                success(res){
                  var condition= that.data.id== '1' ? "拾物" : "失物"
                  data.add({
                    data:{
                      id:that.data.id,
                      phone:that.data.phone,
                      content:that.data.content,
                      time:that.data.time,
                      obj_:that.data.obj_,
                      school:that.data.school,
                      type:that.data.values,
                      fileIDs:fileIDS,
                      condition:condition,
                      post_time:that.data.post_time,
                      open:that.data.switch1Checked,
                      index:app.globalData.info_len
                    },
                    success:res=>{
                      console.log(res)
                      wx.hideLoading()
                      wx.reLaunch({
                        url: '/pages/index/index',
                      })
                    }
                  })
                }
              })
             
            }
          }
        })
      }
      else{
        wx.showToast({
          title: '输入的手机号格式不正确',
          icon: 'none',
          duration: 2000
        })
      }

  }
  else{
    wx.showToast({
      title: '输入的信息不全',
      icon: 'none',
      duration: 2000
    })
  }
  
},
 submit:function(e){
    this.upload_img(e)
},

//选择
 //选择图片并将图片保存在js中
 chooseimage: function() {
  var that = this;
  wx.chooseImage({
    count: 3 - that.data.img_url.length, // 默认9 
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
    success: function(res) {

      if (res.tempFilePaths.length > 0) {
        //图如果满了3张，不显示加图
        if (that.data.img_url.length == 3) {
          that.setData({
            hideAdd: true
          })
        } else {
          that.setData({
            hideAdd: false
          })
        }
        //把每次选择的图push进数组
        let img_url = that.data.img_url;

        for (let i = 0; i < res.tempFilePaths.length; i++) {
          if (i <= 3) {
            img_url.push(res.tempFilePaths[i])
           
          }

        }
        console.log(img_url)
        that.setData({
          img_url: img_url
        })
        /**
         * 如果选择多于3张,停止添加
         */

        if (that.data.img_url.length == 3) {
          that.setData({
            hideAdd: true
          })
        } else {
          that.setData({
            hideAdd: false
          })
        }
      }
    }
  })
}, //图片上传

//删除图片
deleteImg: function(res) {

  let that = this;
  wx.showModal({
    title: '提示',
    content: '是否删除',
    success: function(e) {
      if (e.confirm) {
        var image = [];
        var i = 0;
        for (var j = 0; j < that.data.img_url.length; j++) {
          if (that.data.img_url[j] != res.target.id) {
            image.push(that.data.img_url[j])
            console.log(image)
          }
        }
        that.setData({
          img_url: image
        })
        if (that.data.img_url.length < 3) {
          that.setData({
            hideAdd: false
          })
        } else {
          that.setData({
            hideAdd: true
          })
        }
      }

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