<template class="login">
  <Header></Header>
  <div class="center">
    <h2>Login</h2>
    <el-switch
        v-model="type"
        class="mb-2 type-switch"
        active-text="学生登陆"
        inactive-text="教师登陆"
        active-value="student"
        inactive-value="teacher"
    />
    <div class="login-form">
      <el-input v-model="username" class="input" placeholder="请输入用户名" />
      <el-input v-model="password" class="input" type="password" placeholder="请输入密码" />
      <el-button type="primary" class="login-button" @click="login">登陆</el-button>
      <div class="register">
        <span>还没账号？ <a href="/register">注册</a></span>
      </div>
    </div>
    <div class="line-login" @click="lineLogin">
      <img src="../../assets/line.png">
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import url from "@/http/url";

export default {
  name: "LoginPage",
  components: {
    Header,
  },
  methods: {
    async login() {
      let data = await  this.$http.post(url.login, {
        'username': this.username,
        'password': this.password,
        'role': this.type,
      })
      if (data == null) {
        return
      }
      this.$store.commit('setLogin',  data)
      if (this.type === 'teacher') {
        this.$router.replace({path: '/school/apply/list'})
      } else {
        this.$router.replace({path: '/student/teachers'})
      }
    },
    async lineLogin() {
      let data = await this.$http.get(url.getOauthLoginURL, {loginType: 'line'})
      if (data == null) {
        return
      }

      // let loginURL = data['url']
      // this.$router.push({path: '/oauth/auth'})
      // window.location.href = loginURL
    }
  },
  data() {
    return {
      username: '',
      password: '',
      type: '',
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.login {
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

.register {
  display: flex;
  justify-items: center;
  justify-content: center;
  margin-top: 2vw;
}
.line-login {
  width: 40px;
  height: 40px;
  margin-top: 25px;
  cursor: pointer;
}
.line-login img {
  width: 100%;
  height: 100%;
}
</style>