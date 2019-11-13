<template>
  <div class='login'>
    <!-- elementUI card卡片组件-->
    <el-card class='login-card'>
      <!-- 卡片内容 -->
      <div class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <!--  model属性 要绑定表单数据对象  rules表示绑定校验规则对象  ref属性(属性名随便写)-->
      <el-form ref="formObj" style="margin-top:30px" :model="loginForm" :rules="loginRules">
        <!-- 一个表单域就是一个form-item -->
        <el-form-item prop="mobile">
          <!-- 放置表单组件  -->
          <!-- 手机号 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码 和发送验证码 -->
          <el-input v-model="loginForm.code" style='width:280px' placeholder="请输入您的验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
         <el-form-item prop="checked">
           <!-- 勾选同意框 -->
           <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议及条款</el-checkbox>
         </el-form-item>
         <el-form-item>
           <el-button style="width:100%" type='primary' @click="login">登录</el-button>
         </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
  .login {
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 440px;
      height:360px;
      .title {
        text-align: center;
        img {
          height: 45px;
        }
      }
    }
  }
</style>
