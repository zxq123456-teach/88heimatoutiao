<template>
  <el-row type='flex' justify='space-between' align='middle'>
      <el-col :span='6' class='left'>
          <i class='el-icon-s-fold'></i>
          <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span='3' class='right'>
          <img src="../assets/img/avatar.jpg" alt="">
          <el-dropdown trigger='click'>
              <span style="cursor:pointer">猪猪女孩</span>
              <el-dropdown-menu slot='dropdown'>
                  <el-dropdown-item>账户信息</el-dropdown-item>
                  <el-dropdown-item>git地址</el-dropdown-item>
                  <el-dropdown-item @click.native='onlogout'>退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    onlogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //   确认执行 删除token
        window.localStorage.removeItem('user-token')

        // 跳转至登录页
        this.$router.push('/login')

        this.$message({
          type: 'success',
          message: '退出成功！'
        })
      }).catch(() => {
        //   取消执行这里
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.left{
    display: flex;
    align-items: center;
    i{
        font-size: 24px;
    }
    span{
        margin-left: 4px;
    }
}
.right{
    display: flex;
    align-items: center;
    img{
        border-radius: 50%;
        margin-right: 5px;
    }
}
</style>
