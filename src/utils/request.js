// 基于axios封装，网络请求的函数
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

// axios.create()创建一个带配置项的自定义axios函数
// myAxios请求的时候,地址baseURL(称为基地址)+url,然后去请求后台
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 定义请求拦截器，为相关请求头加点东西，统一处理，避免后续处理
// 相应的会有响应头，也会有操作
myAxios.interceptors.request.use(
  function (config) {
    // 为请求头挂载 Authorization字段
    config.headers.Authorization = store.state.token
    return config
  },
  function (error) {
    return error
  }
)

myAxios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      // 本次响应是token过期了
      // this.$message()
      store.commit('updateToken', '')
      store.commit('updateUserInfo', {})
      // this.$router.push('/login') 注意这里的this只是在vue文件里使用，在js里面不能使用，需要将router拿到
      router.push('/login')
      Message({
        message: '身份信息失效，请重新登录',
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
  // 这里的返回值：
)

// 暴露axios自定义函数
export default myAxios
