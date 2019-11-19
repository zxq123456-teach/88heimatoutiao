<template>
  <div>
      <el-card class='box-card'>
          <div slot="header" class='clearfix'>
              <span>评论详情列表</span>
              <el-button style="float:right; padding:3px 0" type="text">操作按钮</el-button>
          </div>

          <el-table
          :data='comments'
          style='width:100%'>
              <el-table-column
              label='头像'
              width='180'>
                  <template slot-scope="scope">
                      <img :src="scope.row.aut_photo" width='50'>
                  </template>
              </el-table-column>
              <el-table-column
              prop='content'
              label='评论内容'
              width='180'>
              </el-table-column>
              <el-table-column
              prop='name'
              label='点赞'
              width="180">
                  <template slot-scope="scope">
                    {{ scope.row.is_liking === 1 ? '已赞' : '没有赞' }}</template>
              </el-table-column>
              <el-table-column
              prop='like_count'
              label='点赞数量'
              width="180">
              </el-table-column>
              <el-table-column
              prop='pubdate'
              label='评论日期'
              width="180">
                   <template slot-scope="scope">
                       {{ scope.row.pubdate | dateFormat('YYYY-MM-DD') }}</template>
              </el-table-column>
               <el-table-column
                  label="是否推荐"
                  width="180">
                    <template slot-scope="scope">
                       <el-switch
                        v-model="scope.row.is_top"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="onTop(scope.row)">
                       </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                prop="reply_count"
                label="回复数量"
                width="180">
                </el-table-column>
          </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'CommentDetail',
  components: {},
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comments: []
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.loadComments()
  },
  methods: {
    loadComments () {
      this.$axios({
        methos: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          source: this.articled
        }
      }).then(res => {
        const comments = res.data.data.results

        this.comments = comments
      }).catch(err => {
        console.log(err)
        this.$message.error('获取数据失败')
      })
    },
    onTop (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`,
        data: {
          sticky: comment.is_top
        }
      }).then(res => {
        this.$message('操作成功')
      }).catch(err => {
        this.$message.error(err, '操作失败')
      })
    }
  }
}
</script>

<style scoped></style>
