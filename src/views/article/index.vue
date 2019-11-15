<template>
    <div class='article'>
        <!-- 筛选数据 -->
        <el-card class='box-card'>
            <div slot='header' class='clearfix'>
                <span>全部图文</span>
            </div>
            <el-form ref='form' label-width='80px'>
                <el-form-item label='文章状态'>
                    <el-radio-group>
                        <el-radio label='全部'></el-radio>
                        <el-radio label='草稿'></el-radio>
                        <el-radio label='待审核'></el-radio>
                        <el-radio label='审核通过'></el-radio>
                        <el-radio label='审核失败'></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label='频道列表'>
                    <el-select placeholder='请选择活动区域' v-model="filterForm.channel_id">
                        <el-option label='区域一' value='shanghai'></el-option>
                        <el-option label='区域二' value='beijing'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='时间选择'>
                    <el-date-picker
                    v-model='rangeDate'
                    type='daterange'
                    range-separator='——'
                    start-placeholder='开始日期'
                    end-placeholder='结束日期'
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 文章列表 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>共找到59806条符合条件的内容</span>
            </div>
            <el-table
            :data='articles'
            style='width:100%'>
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
                <template>
                    <el-button type='danger' size='mini'>编辑</el-button>
                    <el-button type='primary' size='mini'>删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      articles: [],
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
      ]
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      // 把token放到请求头中
      const token = window.localStorage.getItem('user-token')

      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          // 添加请求头
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.articles = res.data.data.results
      }).catch(err => {
        console.log(err, '获取数据失败')
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
