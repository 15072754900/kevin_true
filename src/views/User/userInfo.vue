<template lang="">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>基本资料</span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录名称">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>
<script>
import { updateUserInfoAPI } from '@/api'
export default {
  name: 'UserInfo',
  data () {
    return {
      ruleForm: {
        id: this.$store.state.userInfo.id,
        username: this.$store.state.userInfo.username, // 登录后自动回填数据
        nickname: '',
        email: ''
      },
      rules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '长度在 1 到 10 个非空字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' } // 这里不知道验证的格式方式
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          console.log(this.ruleForm)
          this.updateUserInfoAPI()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async updateUserInfoAPI () {
      const res = await updateUserInfoAPI(this.ruleForm)
      // this.menus = res.data.data
      console.log(res)
      if (res.data.code !== 0) return this.$message.error('更新用户信息失败')
      this.$message.success('更新成功')
      this.$store.dispatch('getUserInfoActions')
      // console.log(this.menus)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields() // ele-ui的本身的方法
    }
  }
}
</script>
<style lang="less" scoped>
.el-form {
  width: 500px;
}
  .text {
    font-size: 14px;
  }
  .box-card {
    line-height: 20px;
    span {
      float: left;
    }
  }
  .el-button {
    float: left;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
