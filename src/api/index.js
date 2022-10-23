// 封装的是具体的接口请求方法
// 注意：每个方法只负责请求一个URL地址
import request from '@/utils/request.js'
// 导出接口方法，为了在逻辑页面引入后调用
export const registerAPI = () => {
  // 这里的是一个Promise对象（内部包含原生ajax请求）
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果（.then(response...)）
  return request({
    // 这里时试用地址是否成功，若链接以http开头，直接读取http的地址
    // url: 'http://geek.itheima.net/v1_0/channels'
    url: '/api/reg',
    method: 'POST',
    data: {
      username: 'huapeng',
      password: '123456',
      repassword: '123456'
    }
  })
}
