<template class="register">
  <Header></Header>
  <div class="center">
    <h2>Teacher Register</h2>
    <div class="login-form">
      <el-input v-model="name" class="input" placeholder="请输入姓名" />
      <el-input v-model="email" class="input" placeholder="请输入邮箱" />
      <el-input v-model="password" class="input" type="password" placeholder="请输入密码" />
      <el-button type="primary" class="login-button" @click="register">注册</el-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import url from "@/http/url";
export default {
  name: "RegisterPage",
  components: {
    Header,
  },
  methods: {
    async register() {
      let data = await this.$http.post(url.register, {
        email: this.email,
        name: this.name,
        password: this.password,
      })
      if (data == null) {
        return
      }
      console.log(data)
      this.$store.commit('setLogin', data)
      // 跳转到学校申请
      this.$router.replace({
        path: '/school/apply'
      })
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  }
}
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  position: fixed;
}
.center {
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
}
.login-form {
  width: 25vw;
  display: flex;
  flex-direction: column;
}
.input {
  margin-top: 2vw;
  height: 50px;
}
.type-switch, .login-button {
  margin-top: 2vw;
}
.login-button {
  height: 50px;
}
</style>