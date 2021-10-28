const app = getApp()

Page({
  data: {

   obj:[{
    name: "失物发布",
    img:"/image/lose.png",
    id:"0"
   },
  {
    name: "寻物发布",
    img:"/image/find.png",
    id:"1"
  }]
  },
  bind:function(e){
    if(e.currentTarget.id==0){
      wx.navigateTo({
        url: 'post_detail/post_detail?id=0',
      })
    }
    else{
      wx.navigateTo({
        url: 'post_detail/post_detail?id=1',
      })
    }
  }
})
