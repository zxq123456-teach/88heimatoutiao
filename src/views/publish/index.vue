<template>
  <div class='publish'>
    <el-card class='box-card'>
      <div slot='header' class='clearfix'>
        <span>{{$route.params.articleId ? '编辑文章' : '发布文章'}}</span>
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
          <!-- <el-select v-model='article.channel_id' placeholder="请选择频道">
            <el-option
            :label='channel.name'
            :value='channel.id'
            v-for='channel in channels'
            :key='channel.id'>
            </el-option>
          </el-select> -->
          <channel-select v-model='article.channel_id'></channel-select>
        </el-form-item>
        <el-form-item label='封面'>
          <el-radio-group v-model="article.cover.type">
            <el-radio :label='1'>单图</el-radio>
            <el-radio :label='3'>三图</el-radio>
            <el-radio :label='0'>无图</el-radio>
            <el-radio :label='-1'>自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type > 0">
            <el-row :gutter='20'>
              <el-col :span="4" v-for="item in article.cover.type" :key='item'>
                <UploadImage></UploadImage>
              </el-col>
            </el-row>
          </template>
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

// 加载
import ChannelSelect from '@/components/channel-select'
import UploadImage from './components/upload-image.vue'
export default {
  name: 'PublishArticle',
  components: {
    // 注册局部组件
    quillEditor,
    ChannelSelect,
    UploadImage
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
    // 编辑需要在初始化的时候根据id获取加载文章的内容
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      })
    },
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        // 请求编辑文章
        this.updateArticle(draft)
      } else {
        // 请求添加文章
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
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
    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    }
    // loadChennels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     this.channels = res.data.data.channels
    //   }).catch(err => {
    //     console.log(err, '获取数据失败')
    //   })
    // }
  }
}
</script>

<style>
.ql-editor {
  min-height: 300px;
}
</style>
