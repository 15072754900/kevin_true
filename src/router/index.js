import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 默认打开直接看到布局页
    component: () => import('@/views/layout'),
    redirect: '/home', // 这里进行重定向，使当前初始界面展示为重定向后面的内容
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info',
        component: () => import('@/views/User/userInfo')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/User/userAvatar')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/User/userPwd')
      }
    ]
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
    // webpack提供import函数来路由懒加载导入组件
    // 路由懒加载，就是页面路由路径切换到/reg,才去加载对应组件代码
    // 好处：让首页加载文件体积更小，打开更快
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    children: [
      {
        path: 'demo',
        component: () => import('@/components/index_demo.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) {
      // 要在本地就有token值才能进入，否则不能
      store.dispatch('getUserInfoActions')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router

// 这里需求是：
// 退出登录，重新登录，只走相关组件代码，不能在APP组件里面写获取用户信息的内容
// 效果不对：在APP中编写无法让用户更换账号时再次获取，只能在界面初始化时输出一次
// 解决方案：
// 1.可以在登录界面设置，登陆成功后，再次发出请求拿到用户信息
// 2.可以在全局前置路由守卫中，写（路由跳转的时候，判断+获取）
