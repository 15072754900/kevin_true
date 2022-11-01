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
              <div class="user-box">
                <img :src="user_pic" alt="" v-if="user_pic">
                <img src="../../assets/images/logo.png" alt="" v-else>
                <span>欢迎 {{nickname || username}}</span>
              </div>
                <el-row class="tac">
                <el-col :span="12">
                <!-- 侧边栏导航-菜单 -->
                <!--
                  el-menu:导航菜单
                  default-active: 当前激活菜单的 index（el-submenu/el-menu-item的index值），对应菜单就有激活样式
                  @open:sub-menu:激活的回调
                  @close:submenu 关闭的回调
                  active-text-color: 激活时的文字颜色，哪项index的值和default-active一致，就会被设置动态文字颜色

                  子标签：
                  如果有嵌套，先写el-submenu（里面嵌套template#title的设置当前展示内容，子用el-menu-items）

                  属性值没有显示传值，默认为true（背）
                 -->
                <el-menu
                    class="el-menu-vertical-demo"
                    :default-active="$route.path"
                    unique-opened
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="black"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router>
                    <template v-for="item in menus">
                      <el-menu-item :index="item.indexPath" :key="item.indexPath" v-if="!item.children">
                        <i :class='item.icon'></i>
                        <span slot="title">{{item.title}}</span>
                      </el-menu-item>
                      <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
                        <template slot="title">
                          <i :class="item.icon"></i>
                          <span>{{item.title}}</span>
                        </template>
                        <el-menu-item v-for="obj in item.children" :index="obj.indexPath" :key="obj.indexPath">
                            <i :class="obj.icon"></i>
                            <span>{{obj.title}}</span>
                        </el-menu-item>
                      </el-submenu>
                    </template>
                </el-menu>
                </el-col>
                </el-row>
            </el-aside>
            <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer><span>2506434902@qq.com  请联系华鹏先生添加相关文件</span></el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import { mapState } from 'vuex'
import { getMenusListAPI } from '@/api'

export default {
  name: 'my-layout',
  // 可以在每一次页面刷新进入的时候获取一次用户信息，也可以在全局路由守卫上添加
  // created () {
  //   this.$store.dispatch('getUserInfoActions')
  // },

  data () {
    return {
      menus: [],
      activeIndex: '1',
      activeIndex2: '1',
      ruleForm: {
        username: '',
        nickname: '',
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
  computed: {
    ...mapState({ user_pic: (state) => state.userInfo.user_pic, nickname: (state) => state.userInfo.nickname, username: (state) => state.userInfo.username })
    // 这里的userInfo是对象传过来的，不能直接看到里面的内容，需要进行解构赋值才能传输，一般可以在getters里面采用定义的方式，再在mapgetters传输过来
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
    async getMenusListAPI () {
      const res = await getMenusListAPI()
      this.menus = res.data.data
      // console.log(res)
      console.log(this.menus)
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
          this.$store.commit('updateUserInfo', {})
          this.$router.push('/login')
        })
        .catch((err) => err)
    }
  },
  created () {
    // 请求侧边栏的数据
    this.getMenusListAPI()
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
.user-box{
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
.el-menu {
    border-right: 0;
    .el-submenu{
        .el-menu-item{
          font-size: 12px;
      }
    }
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
// text-align: center;
// line-height: 160px;
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
