// 封装的是具体的接口请求方法
// 注意：每个方法只负责请求一个URL地址
import request from '@/utils/request.js'
// 导出接口方法，为了在逻辑页面引入后调用
export const registerAPI = ({ username, password, repassword }) => {
  // 这里的是一个Promise对象（内部包含原生ajax请求）
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果（.then(response...)）
  return request({
    // 这里时试用地址是否成功，若链接以http开头，直接读取http的地址
    // url: 'http://geek.itheima.net/v1_0/channels'
    url: '/api/reg',
    method: 'POST',
    // axios传参包括paramas,data
    // params的对象参数名和值，axios源码会把参数和值拼接在url?后面给后台（query查询字符串）
    // data的对象参数名和值，axios源码会把参数和值拼接在请求体里（body参数）
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 * 登录接口
 * @param {*} param0 { username: 用户名， password： 密码 }
 * @returns Promise对象
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export const getUserInfoAPI = () => { // 接口方法
  return request({
    url: '/my/userinfo'
    // method不写默认就是'get'方式请求
    // 传参给后台：params（查询字符串query），data（请求体body），headers（请求头）
    // 这里在拦截请求头中完成
    // headers: {
    //   // this.$store.state.token 这里this不是组件对象不能用this.$store拿到store对象
    //   Authorization: store.state.token
    // }
  })
}

export const getMenusListAPI = () => {
  return request({
    url: '/my/menus'
  })
}

export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}

export const updateUserAvatar = (avatar) => {
  return request({
    url: 'my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}
