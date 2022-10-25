<template>
  <div id="app">
      <!-- <router-link class="link" to="/login">注册界面</router-link> -->
      <!-- 一级路由规则对象组件的挂载点 -->
      <router-view></router-view>
  </div>
</template>
<script>
// import { registerAPI } from '@/api/index'
// import { getUserInfoAPI } from '@/api'
export default {
  name: 'App'
  // async created () {
  //   const res = await registerAPI()
  //   console.log(res)
  // }
  // created () {
  //   getUserInfoAPI().then(res => {
  //     console.log(res)
  //   })
  // }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}

</style>
