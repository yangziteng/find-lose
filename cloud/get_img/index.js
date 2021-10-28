// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.get({
        "path": 'pages/index_detail/index_detail?'+event.query,
        "width": 400,
        auto_color:true,
      })
      const upload = await cloud.uploadFile({
        cloudPath:'wxcode/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png',
        fileContent: result.buffer,
      })
      return {
        wxacodefileID: upload.fileID
      }
  } catch (err) {
    return err
  }
  
}