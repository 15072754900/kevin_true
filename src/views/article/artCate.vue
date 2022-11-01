
<template lang="">
    <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
              <span>文章分类</span>
              <el-button type="primary" @click="addCateShowDialogBtnFn">添加分类</el-button>
          </div>

          <!-- 添加文章的分类-对话框
            el-dialog 对话框组件
            title：左上角标题
            visible：控制对话框是否显示（右侧vue变量为true显示，为FALSE就隐藏）

            扩展内容：
            .sync:新增属性
            .sync类似于v-model，可以给子组件实现“双向数据绑定”
            // 复习：v-model本质：给所在标签绑定：value='vue变量' @input="val => vue变量 =val"
            // <标签 v-model='vue变量'></标签>
            // 运行时如下
            // <标签 :value='vue变量' @input='val => vue变量 = val'></标签>
            // 在vue2 中，v-model只能使用一次，vue3 中可以使用多次
            // .sync本质：给所在标签绑定：props属性名='vue变量'，同时@update：props属性名="val =>  vue变量 = val"
            // <标签 :visible.sync='vue变量'></标签>
            // <标签 :visible='vue变量' @update:visible='val => vue变量 =val'></标签>
            // 子组件内子传父的时候 this.$emit('update:visible',值)
          -->
          <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                @close="handleClose"
                >
                <!-- @close="dialogCloseFn" -->
              <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px" class="demo-addForm">
                <el-form-item label="分类名称" prop="cate_name">
                    <el-input v-model="addForm.cate_name"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="cate_alias">
                    <el-input v-model="addForm.cate_alias"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirmFn">确 定</el-button>
                </span>
              </el-dialog>
          <el-table
            :data="cateList"
            border
            style="width: 100%">
            <!-- type是table-column内置属性，你告诉他使用index，意思就是第一个单元格用索引值 -->
            <!-- 同样的，prop就是在table-column里面显示数据属于data里的什么数据 -->
            <el-table-column
              type="index"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="cate_name"
              label="分类名称"
              width="360">
            </el-table-column>
            <el-table-column
              prop="cate_alias"
              width="360"
              label="分类别名">
            </el-table-column>
            <el-table-column
              label="操作">
              <!-- scope对象，{row: 行对象} -->
              <template v-slot="scope">
                <el-button type="primary" size="mini" @click="updateCateBtnFn(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="deleteArtCateBtnFn(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </el-card>
      </div>
</template>
<script>
// 经验：如果同一个按钮，想要做状态区分
// 1.定义一个标记变量isEdit(true编辑,false新增),还要定义本次编辑的数据唯一id值，editId
// 2.在点击修改时，isEdit改为true，editId保存要修改的id
// 3.在点击新增按钮的时候，isEdit改为false
// 类似于节流阀
import { getArtCateListAPI, saveArtCateAPI, updteArtCateAPI, deleteArtCateAPI } from '@/api'
export default {
  name: 'art-list',
  data () {
    const sameName = (rules, value, callback) => {
      if (this.addForm.cate_name === value) {
        return callback(new Error('分类名称与别名不能一致'))
      }
      callback() // 通过校验
    }
    return {
      cateList: [],
      dialogVisible: false,
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      isEdit: false,
      editId: '', // 空字符串作为存储
      rules: {
        cate_name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '名称必须是1-10位的非空字符串', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '密码长度必须是1-10位的非空字符串', trigger: 'blur' },
          { validator: sameName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 修改数据按钮 -> 点击事件（先做数据回显）
    updateCateBtnFn (obj) {
      // obj的值：{ id:文章分类id，cate_name：文章分类名字，cate_alias：文章分类别名 }
      // console.log(obj)
      this.isEdit = true
      this.editId = obj.id
      this.addForm.id = this.editId
      // 数据回显
      this.dialogVisible = true // 这里让数据展示表格出现
      this.$nextTick(() => {
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    async deleteArtCateBtnFn (obj) {
      // console.log(obj)
      const { data: res } = await deleteArtCateAPI(obj.id)
      // console.log(obj.id)
      // console.log(res)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getArtCateListFn()
    },
    // 小bug：（el-form和el-dialog和数据回显 同时用，有bug）
    // 复现：第一次打开网页，先点击修改，在点击新增，发现输入框竟有值
    // 原因：点击修改后，关闭对话框的时候，置空失效了
    // 具体分析：主人公resetfields有问题
    // 线索：Dialog的数据是懒渲染的，即在第一次被打开之前，传入的默认slot不会被渲染到DOM上
    // 线索：vue数据改变（先执行同步所有）再去更新DOM（异步代码）

    // 无问题：第一次打开网页，先点击新增按钮 -> dialog出现 -> el-form组件第一次挂载（关联的addForm对象的属性的值为空字符串）e-form组件内绑定了初始值，所以后续调用resetfields的时候，他可以用空字符串初始值来重置
    // 有问题：第一次打开网页，先点击修改按钮 -> 虽然dialog变量为true了但是同步代码把addForm对象里赋值了（）默认值 -> DOM更新异步 -> dialog出现 -> el-form组件第一次挂载（使用addForm内置做回显然后第一次el-form内绑定了初始值（有值）） -> 以后做重置，他就用绑定的带数值的做重置

    // 我的理解：每次加载都是先同步再异步，相当于说我已经打开了dialog之后，内容中的异步数据修改才完成，不会显示出来

    // 解决方法： 让数据回显慢点执行
    addCateShowDialogBtnFn () {
      this.dialogVisible = true
      this.isEdit = false
    },
    async getArtCateListFn () {
      const res = await getArtCateListAPI()
      // console.log(res)
      this.cateList = res.data.data
    },
    handleClose () {
      this.$refs.addForm.resetFields()
    },
    confirmFn () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          if (!this.isEdit) {
          // 通过校验
          // 调接口，传数据
            const { data: res } = await saveArtCateAPI(this.addForm)
            // console.log(res)
            if (res.code !== 0) return this.$message.error(res.message) // 这里直接输出返回来的报错
            this.$message.success(res.message)
            // this.cateList = res.data.data 注意这里的res 不是之前的那个res 这里的没有data数据 ，所以需要重新执行读取后台数据
            this.getArtCateListFn()
          } else {
            const { data: res } = await updteArtCateAPI(this.addForm)
            console.log(res)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
            this.getArtCateListFn()
          }
        } else {
          return false
        }
      })
      this.dialogVisible = false
    }
  },
  created () {
    this.getArtCateListFn()
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
  .el-dialog {
    float: left;
  }
  .box-card {
    line-height: 20px;
    .el-table {
      .el-table-column{
        line-height: 20px;
        .el-button {
          font-size: 6px;
        }
      }
    }
    .clearfix{
      text-align: left;
      .el-button {
        float: right;
        font-size: 12px;
      }
    }
  }
</style>
