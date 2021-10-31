wx.cloud.init()
const db = wx.cloud.database()
const data = db.collection('find_lose_obj')
const data_name = db.collection('usernameid')
const app = getApp();
var startX, endX;  //首先创建2个变量 来记录触摸时的原点
var moveFlag = true;// 判断执行滑动事件
let col1H = 0;
let col2H = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:"",
    img:"",
    color1:"",
    color2:"",
    type_list:["证件","电子产品","生活用品","箱包","校卡","现金","饰品","其他","全部"],
    school_list:["西城","官渡","光华","全部"],
    school:"全部",
    type:"全部",
    info:[],
    id:'0',
    color1:'#0EC8E6',
    color2:"black",
    //瀑布流
    // scrollH: 0,
    // imgWidth: 0,
    // loadingCount: 0,
    // images: [],
    // col1: [],
    // col2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面显示
   */
  find_detail:function (e) {
    this.setData({color1:'#black',color2:"#0EC8E6",id:'1',info:this.data.info__,type:"全部",school:"全部"})
    console.log(this.data.id)
    this.f_f(e,this.data.id)
  },
  lose_detail:function (e) {
    this.setData({color1:'#0EC8E6',color2:"black",id:'0',info:this.data.info_,type:"全部",school:"全部"})
    console.log(this.data.id)
    this.f_f(e,this.data.id)

  },
  get_count:function(){
     data.where({id:"0"}).count().then(res =>{
      console.log(res.total)
      app.globalData.lose_total = res.total
    })
     data.where({id:"1"}).count().then(res =>{
      console.log(res.total)
      app.globalData.find_total = res.total
    })
  },
  navigatelogin:function (e) {
    var that =this
    wx.cloud.callFunction({
      name:"get_openid",
      success(res){
        console.log(res.result.openid)
        
        console.log("name"+res.result.openid)
        data_name.where({ide:"name"+res.result.openid}).get({
          success(res){
            console.log(res,62)
            if(res.data.length==0){
              wx.showModal({
                title:"提示",
                content:"您还未登录，请登录~",
                showCancel:false,
                success(res){
                  if (res.confirm){
                    wx.reLaunch({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
    
  },
  //选择写成函数
  choose_min:function(e,that,shape,id,school,type){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:"get_choose_data",
      data:{
        shape:shape,
        id:id,
        school:school,
        type:type
      },
      success(res){
        console.log("请求成功",res)
        that.setData({info:res.result.data})
        wx.hideLoading()
      }
    })
  },
  choose:function (e,that) {
    if (this.data.type=="全部"&&this.data.school=="全部"&&this.data.id==0){
      this.choose_min(e,that,1,"0")
    }
    else if (this.data.type=="全部"&&this.data.school!="全部"&&this.data.id==0){
      this.choose_min(e,that,2,"0",this.data.school)
     
    }
    else if (this.data.type!="全部"&&this.data.school=="全部"&&this.data.id==0){
      this.choose_min(e,that,3,"0",undefined,this.data.type)
    }
    else if (this.data.type!="全部"&&this.data.school!="全部"&&this.data.id==0){
      this.choose_min(e,that,4,"0",this.data.school,this.data.type)
     
    }
    else if (this.data.type=="全部"&&this.data.school=="全部"&&this.data.id==1){
      this.choose_min(e,that,1,"1")

    }
    else if (this.data.type=="全部"&&this.data.school!="全部"&&this.data.id==1){
      this.choose_min(e,that,2,"1",this.data.school)

    }
    else if (this.data.type!="全部"&&this.data.school=="全部"&&this.data.id==1){
      this.choose_min(e,that,3,"1",undefined,this.data.type)
    }
    else if (this.data.type!="全部"&&this.data.school!="全部"&&this.data.id==1){
      this.choose_min(e,that,4,"1",this.data.school,this.data.type)
    }
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
          url: '/pages/index_detail/index_detail?id='+that.data.id+"&index="+app.globalData.index
        })
        //将index放在全局变量
       
        app.globalData.info=that.data.info
        console.log(that.data.info[0])
      }
    })
   
  },
  //获得数据
  f_f:function (e,id) {
    var that =this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:"get_data",
      data:{
        id:id,
      },success(res){
        console.log(res)
        that.setData({
          info:res.result.data,
        })
        console.log(res.result.data)
        wx.hideLoading()
      }
    })
  },
  onload:function (e) {
  
  },
  choose_type:function (e) {
    var index=e.detail.value
    var type = this.data.type_list[index]
    var that =this
    console.log(type)
    this.setData({type:type})
    this.choose(e,that)
    
  },


  choose_school:function (e) {
    var index=e.detail.value
    var school = this.data.school_list[index]
    var that =this
    console.log(school)
    this.setData({school:school})
    this.choose(e,that)
  },
  onShow: function (e) {
    this.get_count()
    this.navigatelogin(e)
    if(this.data.type=="全部"&this.data.school=="全部"){
      this.f_f(e,this.data.id)
    }
    else{
      var that =this
      this.choose(e,that)
    }

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
    
  },
  //滑动事件
  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.lose_detail(e);
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        this.find_detail(e);
        moveFlag = false;
      }
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },
//瀑布流
// loadImages: function (e,images) {
//   console.log(e)

//   let baseId = "img-" + (+new Date());

//   for (let i = 0; i < images.length; i++) {
//       images[i].id = baseId + "-" + i;
//   }

//   this.setData({
//       loadingCount: images.length,
//       images: images
//   });
// },

// onImageLoad: function (e) {
//   console.log(e)
//   let imageId = e.currentTarget.id;
//   let oImgW = e.detail.width;         //图片原始宽度
//   let oImgH = e.detail.height;        //图片原始高度
//   let imgWidth = this.data.imgWidth;  //图片设置的宽度
//   let scale = imgWidth / oImgW;        //比例计算
//   let imgHeight = oImgH * scale;      //自适应高度

//   let images = this.data.images;
//   let imageObj = null;

//   for (let i = 0; i < images.length; i++) {
//       let img = images[i];
//       if (img.id === imageId) {
//           imageObj = img;
//           break;
//       }
//   }

//   imageObj.height = imgHeight;

//   let loadingCount = this.data.loadingCount - 1;
//   let col1 = this.data.col1;
//   let col2 = this.data.col2;

//   if (col1H <= col2H) {
//       col1H += imgHeight;
//       col1.push(imageObj);
//   } else {
//       col2H += imgHeight;
//       col2.push(imageObj);
//   }

//   let data_wave = {
//       loadingCount: loadingCount,
//       col1: col1,
//       col2: col2
//   };

//   if (!loadingCount) {
//     data_wave.images = [];
//   }

//   this.setData(data_wave);
// },

})