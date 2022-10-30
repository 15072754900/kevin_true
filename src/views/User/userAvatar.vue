<template lang="">
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>更换头像</span>
            </div>
            <div class="demo-image">
                <div class="block">
                    <el-image v-if="!avatar" style="width: 300px; height: 300px;" :src="require('../../assets/images/avatar.jpg')"></el-image>
                    <el-image v-else  style="width: 300px; height: 300px;" :src="avatar"></el-image>
                </div>
                <div class="demo-button">
                    <input type="file" accept="img/*" style="display: none" ref="iptRef" @change="onFileChange">
                    <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
                    <el-button type="success" icon="el-icon-upload" plain :disabled="avatar === ''" @click="uploadFn">上传头像</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import { updateUserAvatar } from '@/api'
export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: '' // 保存图片链接、base64字符串
    }
  },
  methods: {
    // 选择图片 -> 点击事件
    chooseImg () {
      this.$refs.iptRef.click()
      // 目的：为了让input[type=file]标签，让他再用js代码来触发他的点击事件（导致他默认行为给一个文件选择人窗口）
      // 原因：input属于原生标签不好修改，必须通过其他时间触发点击事件
      // 移花接木
    },
    onFileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        // 证明刚刚选择了文件窗口打开了，但是他一个文件都没选择，然后点击了确定关闭选择弹窗
        this.avatar = ''
      } else {
        console.log(files[0])
        // 目标，选择图片文件，要给到img标签上做纯前端的预览
        // img标签的src值
        // *只能是图片的'链接地址'（外链http://开头、图片文件相对路径）
        // *或者是图片的base64字符串（而且字符串还必须是data:image/png;base64,图片转base64的字符串）
        // 解决：解决方案一：文件 -> 内存临时地址（这个地址只能在js里面使用，不能发给后台）
        // 语法：URL.createObjectURL(文件)
        // 返回值：内存临时地址
        // this.avatar = URL.createObjectURL(files[0]) // 文件转链接的方法，只能纯前端使用，不能给后台
        // 第二种方法，可以发给后台的内容
        // 解决方案二： 文件 -> base64字符串（此字符串是可以发给后台的）
        // 语法：
        // 创建filereader对象
        const fr = new FileReader()
        // 调用readerAsDataURL函数，读取文件内容
        fr.readAsDataURL(files[0]) // 传入文件对象开始读
        // 监听fr的onload事件
        fr.onload = e => { // onload等待吧文件读成base64字符串后会触发onload事件函数
          // 通过 e.target.result获取到读取的结果，值是字符串（base64 格式的字符串）
          this.avatar = e.target.result
        }
      }
    },
    // async updateUserAvatar () {
    //   const res = await updateUserAvatar(this.avatar)
    //   console.log(res)
    //   // if (res.data.code !== 0) return this.$message.error('更新用户信息失败')
    //   // this.$message.success('更新成功')
    //   // this.$store.dispatch('getUserInfoActions')
    // },
    // uploadFn () {
    //   this.updateUserAvatar()
    // }
    async uploadFn () {
      const res = await updateUserAvatar(this.avatar)
      if (res.data.code === 0) {
        this.$message.success('头像上传成功')
        this.$store.dispatch('getUserInfoActions')
      } else {
        this.$message.error('头像上传失败')
      }
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
    line-height: 20px;
    .demo-image {
        float: left;
        .el-button{
            margin: 12px;
            float: left;
        }
    }
    .clearfix{
        span{
            float: left;
        }
    }
  }
</style>
