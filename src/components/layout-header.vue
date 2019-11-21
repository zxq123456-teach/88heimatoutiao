<template>
  <el-row type='flex' justify='space-between' align='middle'>
      <el-col :span='6' class='left'>
          <i class='el-icon-s-fold'></i>
          <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span='3' class='right'>
          <img width="50" :src='user.photo' alt="">
          <el-dropdown trigger='click'>
              <span>{{user.name}}</span>
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
import eventBus from '@/utils/event-bus'

export default {
  data () {
    return {
      user: {
        name: '', // 用户昵称
        photo: '' // 用户头像
      }
    }
  },

  created () {
    this.loadUser()

    // 在初始化中监听自定义事件
    eventBus.$on('update-user', user => {
      console.log('header 中的订阅执行了')
      // this.user = user
      this.user.name = user.name
      this.user.photo = user.photo
    })
  },
  methods: {
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        this.user = res.data.data
      }).catch(err => {
        console.log(err)
        this.$message.error('获取数据失败')
      })
    },
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
