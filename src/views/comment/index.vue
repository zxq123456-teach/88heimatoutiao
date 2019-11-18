<template>
  <div>
      <el-card class='box-card'>
        <div slot='header' class='clearfix'>
           <span>评论管理</span>
        </div>

        <el-table
        :data='tableData'
        style='width:100%'>
            <el-table-column
            prop='date'
            label='日期'
            width='180'>
            </el-table-column>
            <el-table-column
            prop='name'
            label='姓名'
            width='180'>
            </el-table-column>
            <el-table-column
            prop='address'
            label='地址'>
            </el-table-column>
        </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路1518弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路1517弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路1519弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路1516弄'
        }
      ]
    }
  },
  computed: {},
  watch: {

  },
  created () {

  },
  methods: {

  }
}

</script>

<style>

</style>
