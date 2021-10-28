// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.get({
        "path": 'page/index_detail/index_detail?'+event.query,
        "width": 600,
        auto_color:true,
        // "isHyaline":true
      })
      const upload = await cloud.uploadFile({
        cloudPath: 'wxacode.png',
        fileContent: result.buffer,
      })
      return {
        wxacodefileID: upload.fileID
      }
  } catch (err) {
    return err
  }
  
}