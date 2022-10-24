<template>
  <div id="app">
    <router-link class="link" to="/login">注册界面</router-link>
    <!-- 一级路由规则对象组件的挂载点 -->
    <router-view></router-view>
  </div>
</template>
<script>
import { registerAPI } from '@/api/index'
export default {
  async created () {
    const res = await registerAPI()
    console.log(res)
  }
}
</script>
<style lang="less">
.link {
  display: block;
  width: 100px;
  height: 30px;
  background-color: aqua;
}
</style>
