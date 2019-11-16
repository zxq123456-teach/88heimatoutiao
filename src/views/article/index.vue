<template>
    <div class='article'>
      <!-- 筛选数据 -->
      <el-card class='box-card'>
          <div slot='header' class='clearfix'>
              <span>全部图文</span>
          </div>
          <el-form ref='form' label-width='80px'>
              <el-form-item label='文章状态'>
                <!-- 单选框组会把选中的radio的label同步给绑定的数据 -->
                  <el-radio-group v-model='filterForm.status'>
                    <!-- 接口要求 不传为全部 -->
                      <el-radio :label='null'>全部</el-radio>
                      <el-radio label='0'>草稿</el-radio>
                      <el-radio label='1'>待审核</el-radio>
                      <el-radio label='2'>审核通过</el-radio>
                      <el-radio label='3'>审核失败</el-radio>
                      <el-radio label='4'>已删除</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label='频道列表'>
                  <el-select placeholder='请选择频道' v-model="filterForm.channel_id">
                    <el-option label='所有频道' :value='null'></el-option>
                      <el-option
                      :label='channel.name'
                      :value='channel.id'
                      v-for="channel in channels"
                      :key='channel.id'>
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label='时间选择'>
                  <el-date-picker
                  v-model='rangeDate'
                  type='daterange'
                  range-separator='——'
                  start-placeholder='开始日期'
                  end-placeholder='结束日期'
                  value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
              <!-- 点击查询按钮 重新发送请求获取筛选数据 新查询的数据肯定从第一页开始 -->
                  <el-button type='primary' @click='loadArticles(1)'>查询</el-button>
              </el-form-item>
          </el-form>
      </el-card>

      <!-- 文章列表 -->
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              <span>共找到{{totalCount}}条符合条件的内容</span>
          </div>
          <el-table
          :data='articles'
          style='width:100%'
          v-loading='loading'>
              <el-table-column
              prop='date'
              label='封面'
              width='180'>
              <template slot-scope='scope'>
                  <img width='50' :src='scope.row.cover.images[0]'>
              </template>
              </el-table-column>
              <el-table-column
              prop='title'
              label='标题'
              width='180'>
              </el-table-column>
              <el-table-column
              prop='status'
              label='状态'>
              <template slot-scope='scope'>
                  <el-tag
                  :type='articleStatus[scope.row.status].type'
                  >{{ articleStatus[scope.row.status].label }}</el-tag>
              </template>
              </el-table-column>
              <el-table-column
              prop='pubdate'
              label='发布日期'>
              </el-table-column>
              <el-table-column
              prop='address'
              label='操作'>
              <template slot-scope='scope'>
                  <el-button type='danger' size='mini'>编辑</el-button>
                  <el-button type='primary' size='mini' @click='onDelete(scope.row.id)'>删除</el-button>
              </template>
              </el-table-column>
          </el-table>
      </el-card>

      <!-- 分页 -->
      <el-pagination
      background
      layout='prev,pager,next'
      :total='totalCount'
      @current-change='onPageChange'
      :disabled='loading'>
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: null,
        channel_id: null
        // begin_pubdate: '',
        // end_pubdate: ''
      },
      rangeDate: [], // 日期范围（开始时间  结束时间）
      articles: [], // 文章数据列表
      articleStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ],

      // 总记录数
      totalCount: 0,
      // 表格的loading状态
      loading: true,
      // 频道列表
      channels: [],
      // 当前页面
      page: 1
    }
  },
  created () {
    // 初始化的时候加载第一页数据
    this.loadArticles(1)

    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      // 加载loading
      this.loading = true
      // 把token放到请求头中
      const token = window.localStorage.getItem('user-token')

      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          // 添加请求头
          Authorization: `Bearer ${token}`
        },
        // Query 参数使用 params 传递
        params: {
          page,
          per_page: 10,
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id, // 频道id 不传就是所有
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束时间
        }
      }).then(res => {
        // 成功执行这里
        // 更新文章列表数组
        this.articles = res.data.data.results
        // 更新总记录数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        // 失败执行这里
        console.log(err, '获取数据失败')
      }).finally(() => {
        // 无论成功失败都要执行这里
        // 停止loading
        this.loading = false
      })
    },
    onPageChange (page) {
      // 记录当前最新页码
      this.page = page
      // 请求加载指定页码的文章列表
      this.loadArticles(page)
    },
    loadChannels () {
      this.$axios({
        metho: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onDelete (articleId) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleId}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        }
      }).then(res => {
        // 删除成功 重新加载当前页码文章列表
        this.loadArticles(this.page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .article{
        .box-card{
            margin-bottom: 20px;
        }
    }
</style>
