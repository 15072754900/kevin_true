<template lang="">
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>重置资料</span>
            </div>
            <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="old_pwd">
                <el-input v-model="pwdForm.old_pwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd">
                <el-input type="password" v-model="pwdForm.new_pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="re_pwd">
                <el-input type="password" v-model="pwdForm.re_pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('pwdForm')">修改密码</el-button>
                <el-button @click="resetForm('pwdForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>
<script>
import { updatePwdAPI } from '@/api'
export default {
  name: 'userPwd',
  data () {
    // const checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('年龄不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'))
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('必须年满18岁'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   }, 1000)
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (this.ruleForm.checkPass !== '') {
    //       this.$refs.ruleForm.validateField('checkPass')
    //     }
    //     callback()
    //   }
    // }
    // const validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error('两次输入密码不一致!'))
    //   } else {
    //     callback()
    //   }
    // }
    const samePwd = (rules, value, callback) => {
      if (this.pwdForm.old_pwd === value) {
        return callback(new Error('新旧密码不能一致'))
      }
      callback() // 通过校验
    }
    const rePwd = (rules, value, callback) => {
      if (this.pwdForm.new_pwd !== value) {
        return callback(new Error('密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      rules: {
        old_pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        //   { validator: checkAge, trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          alert('submit!')
          const { data: res } = await updatePwdAPI(this.pwdForm)
          console.log(res)
          if (res.code !== 0) return this.$message.error('更新密码失败')
          this.$message.success('更新密码成功')
          this.$refs.pwdForm.resetFields()
          // 重置密码(被动退出)
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', {})
          this.$router.push('/login')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
  .text {
    font-size: 14px;
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
    .clearfix{
        line-height: 20px;
        text-align: left;
    }
    .demo-ruleForm {
        width: 500px;
        .el-button {
            float: left;
        }
    }
  }
</style>
