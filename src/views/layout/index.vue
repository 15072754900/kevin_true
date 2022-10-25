<template lang="">
    <el-container>
        <el-header>
            <img src="../../assets/images/logo.png" alt="">
            <i @click="logoutFn" class="el-icon-switch-button" text-color="#fff">退出</i>
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="black"
                text-color="#fff"
            >
                <el-submenu index="1">
                    <template slot="title">个人中心</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-submenu>
            </el-menu>
            <img src="" alt="">
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                <el-col :span="12">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="black"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>文章管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1"><i class="el-icon-s-operation"></i><span>基本资料</span></el-menu-item>
                            <el-menu-item index="3-2"><i class="el-icon-camera-solid"></i><span>更换头像</span></el-menu-item>
                            <el-menu-item index="3-3"><i class="el-icon-key"></i><span>重置密码</span></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                </el-col>
                </el-row>
            </el-aside>
            <el-container>
            <el-main>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item style="margin-left: 22px  " label="登录名称">
                        <el-input v-model="form.loginname"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户昵称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 200px width: 300px" >
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer><span>@2506434902qq.com  请联系华鹏先生添加相关文件</span></el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
export default {
  name: 'my-layout',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      form: {
        loginname: ''
      },
      ruleForm: {
        name: '',
        region: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入您的昵称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入正确的邮箱地址', trigger: 'blur' },
          { min: 15, max: 20, message: '格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    logoutFn () {
      this.$confirm('您确认退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warming'
      })
        .then(() => {
        // TODO：执行退出登录的操作
          this.$store.commit('updateToken', '')
          this.$router.push('/login')
        })
        .catch((err) => err)
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
    height: 100%;
}
.el-header, .el-footer {
background-color: #B3C0D1;
color: #333;
text-align: center;
line-height: 60px;
}

.el-header {
    background-color: black;
    img{
        float: left;
    }
    .el-menu-demo {
        float: right;
        width: 130px;
        color: white;
    }
    .el-icon-switch-button{
        margin-left: 12px;
        float: right;
        line-height: 60px;
        color: white;
    }
}

.el-aside {
background-color: black;
color: #333;
text-align: center;
line-height: 200px;
.el-menu {
    border-right: 0;
}
.el-menu-vertical-demo{
    width: 200px;
    height: 100%;
    i{
        margin-left: -70px;
    }
}
}

.el-main {
background-color: #E9EEF3;
color: #333;
text-align: center;
line-height: 160px;
}

body > .el-container {
margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
line-height: 320px;
}
</style>
