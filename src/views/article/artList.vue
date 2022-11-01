<template lang="">
    <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章列表</span>
          </div>
          <!-- illine 不加值，默认为true -->
          <el-form :inline="true" :model="cateInline" class="demo-form-inline">
            <el-form-item label="文章分类">
              <el-select v-model="cateInline.cate_id" placeholder="请选择分类">
                <el-option v-for="obj in cateList" :label="obj.cate_name" :value="obj.id" :key="obj.index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布状态" style="margin-left: 20px">
              <el-select v-model="cateInline.state" placeholder="请选择状态">
                <el-option label="区域一" value="上海"></el-option>
                <el-option label="区域一" value="上海"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary">筛选</el-button>
            <el-button type="info">重置</el-button>
            <el-button type="primary" style="float: right" @click="showPubDialogFn">发表文章</el-button>
          </el-form>
          <el-dialog title="发表文章" :visible.sync="pubDialogVisible" width="30%" :before-close="handClose" :fullscreen="true">
            <el-form :model="pubForm" :rules="pubFormRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="文章标题" prop="title">
                <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="文章分类" prop="cate_id">
                <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width: 100%">
                  <!-- 注意: 这里的label的值是显示给用户看的,但是value是传递给后台系统的内容,后台这里需要id,就传去cate.id -->
                  <el-option v-for="cate in cateList" :label="cate.cate_name" :value="cate.id" :key="cate.index"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="surface">
              <span>文章封面</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="pubDialogVisible = false">发布</el-button>
              <el-button @click="pubDialogVisible = false">存为草稿</el-button>
            </span>
          </el-dialog>
        </el-card>
    </div>
</template>
<script>
import { getArtCateListAPI } from '@/api'
export default {
  name: 'art-cate',
  data () {
    return {
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ]
      },
      pubForm: {
        title: '',
        cate_id: ''
      },
      cateInline: {
        cate_id: '',
        state: ''
      },
      pubDialogVisible: false,
      // 保存文章分类列表
      cateList: []
    }
  },
  methods: {
    // 发表文章的事件
    showPubDialogFn () {
      this.pubDialogVisible = true
    },
    // $confirm内部虽然输一个确认提示框，但是他借用了Promise语法来管理，点击确定他的状态为兑现成功状态返回'confirm'，如果用户点击了取消按钮，此Promise对象状态为拒绝状态，返回'cancel'字符串

    // 知识点回顾：
    // 1. await只能在被async修饰的函数名左边加async关键字，如果没有函数名，在形参的左边加async
    // 原因：async修饰的函数时异步函数，如果此函数被调用，总是返回一个全新的Promise对象
    // 而且本次函数调用是因为是异步函数，所以外面的同步代码继续执行，二await暂停代码只能暂停async函数内的，等待await后面异步结果
    // 2.await只能拿到成功的结果并放行往下走，如果失败内部会向浏览器控制台抛出错误并不会让await往下走代码
    // 3.await后面的Promise的对象的拒绝状态（错误）如何捕获？
    // 方法1：try{} catch(err){}
    // 方法2：用Promise的链式调用，而且在catch里return的非Promise拒绝状态的对象之，都会当做成功的结果返回给原地新的Promise对象结果
    async handClose (done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
      const confirmResult = await this.$confirm(
        '此操作将导致文章信息丢失，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      console.log(confirmResult)
      if (confirmResult === 'cancel') return
      done()
    },
    async getArtCateListFn () {
      const { data: res } = await getArtCateListAPI()
      // console.log(res)
      this.cateList = res.data
    }
  },
  created () {
    this.getArtCateListFn()
  }
}
</script>
<style lang="less" scoped>
.el-card{
  .el-dialog {
    span{
      .el-button{
        float: left;
      margin-left: 22px;
      }
    }
  }
  .el-form{
      .el-button{
        font-size: 10px;
      }
    }
  }
</style>
