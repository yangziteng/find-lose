// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.shape==1){
    // 先取出集合记录总数
  const countResult = await db.collection('find_lose_obj').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('find_lose_obj').where({id:event.id}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  
  }
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      // errMsg: acc.errMsg,
    }
  })
  }
  if (event.shape==2){
     // 先取出集合记录总数
  const countResult = await db.collection('find_lose_obj').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('find_lose_obj').where({school:event.school,id:event.id}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      // errMsg: acc.errMsg,
    }
  })
  } 
  if (event.shape==3){
     // 先取出集合记录总数
  const countResult = await db.collection('find_lose_obj').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('find_lose_obj').where({type:event.type,id:event.id}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      // errMsg: acc.errMsg,
    }
  })
  }
  if (event.shape==4){
    const countResult = await db.collection('find_lose_obj').count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('find_lose_obj').where({school:event.school,type:event.type,id:event.id}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        // errMsg: acc.errMsg,
      }
    })
  }
  if (event.shape==5){
    return cloud.database().collection("find_lose_obj").where({_openid:event.openid}).get({
      success(res){
        return res
      }
    });
  }

}