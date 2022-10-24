<template lang="">
  <div class="container">
    <div class="commond">
      <div class="title-box"></div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input placeholder="请再次输入密码" v-model="form.repassword" show-password></el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-button type="primary" @click="registerFn">注册</el-button>
        </el-form-item><br>
        <el-form-item prop="">
          <el-link type="info" :underline="false" href="http://baidu.com">去登录</el-link>
        </el-form-item>
        <!-- <router-link to="/"></router-link> -->
      </el-form>
    </div>
  </div>
</template>
<script>
// 经验：
// 前端绑定数据对象"属性名"，可以直接给要调用的功能接口的"参数名"一致

// import axios from 'axios'

import { registerAPI } from '@/api'

// 好处：我可以直接把前端对象（带着同名的属性和前端收到的值）发给后台
export default {
  name: 'my-register',
  data () {
  // 注意：必须在data函数里定义此箭头函数，才能确保this.form使用
    const samePwdFn = (rule, value, callback) => { // 为什么这里要这样写
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{4,10}$/, message: '用户名必须是4到10位的大小写字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,12}$/, message: '用户名必须是6到12位的非空字符', trigger: 'blur' }

        ],
        repassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,12}$/, message: '用户名必须是6到12位的非空字符', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerFn () {
      // JS兜底校验
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 通过校验
          // console.log(this.form)
          // console.log(registerAPI(this.form))
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$router.push('/login')
        } else {
          return false // 阻止默认提交行为（表单下面红色提示会自动出现）
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

.container {
// position: relative;
background: url(../../assets/images/login_bg.jpg) center;
width: 100%;
height: 100%;
background-color: #ddd;
display: flex;
justify-content: center;
align-items: center;
.commond{
  // 以下为用定位设置的
// position: absolute;
// top:0;
// left: 0;
// bottom: 0;
// right: 0;
// 让四周位置都为零
// margin: auto;

// top: 50%;
// left: 50%;
// margin-left: -150px;
// margin-top: -150px;
// 让绝对定位设置一个点位置，然后再偏移

width: 300px;
height: 300px;
background-color: white;
border: 1px solid white;
border-radius: 5px;
.el-form {
  margin-left: 30px;
  .el-input {
    width: 80%;
  }
  .el-button {
    width: 80%;
  }
  .el-link {
    margin-top: 3px;
    color: grey;
  }
}
.title-box{
  height: 60px;
  background: url(../../assets/images/login_title.png) center no-repeat;
}
}
.link {
display: block;
width: 100px;
height: 30px;
background-color: aqua;
}
}
// 弹性布局

</style>
