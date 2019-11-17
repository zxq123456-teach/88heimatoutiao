<template>
  <div class='publish'>
    <el-card class='box-card'>
      <div slot='header' class='clearfix'>
        <span>发布文章</span>
      </div>
      <el-form ref='form' :model='article' label-width="80px">
        <el-form-item label='标题'>
          <el-input v-model='article.title'></el-input>
        </el-form-item>
        <el-form-item label='内容'>
          <!-- <el-input type='textarea' v-model='article.content'></el-input> -->
          <!-- 富文本编辑器 -->
          <quill-editor
          v-model='article.content'
          ref='myQuillEditor'
          :options='editorOption'>
          </quill-editor>
        </el-form-item>
        <el-form-item label='频道'>
          <el-select v-model='article.channel_id' placeholder="请选择频道">
            <el-option
            :label='channel.name'
            :value='channel.id'
            v-for='channel in channels'
            :key='channel.id'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click='onSubmit(false)'>发表</el-button>
          <el-button @click='onSubmit(true)'>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 加载富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'PublishArticle',
  components: {
    // 注册局部组件
    quillEditor
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1自动 0无图  1：1张  3:3张
          images: [] // 图片 无图为空数组
        },
        channel_id: ''
      },
      channels: [],
      editorOption: {} // 富文本编辑器的配置选项对象
    }
  },
  created () {
    this.loadChennels()
  },
  methods: {
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        },
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err, '保存失败')
      })
    },
    loadChennels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }
  }
}
</script>

<style>

</style>
