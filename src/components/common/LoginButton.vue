<template>
  <div class="logbut">
    <el-avatar :size="50" :src="avatar" />
    <span>{{'Hello'}}</span>
    <el-button type="danger" class="but" @click="logout">Logout</el-button>
  </div>
</template>

<script>
import url from "@/http/url";

export default {
  name: "LoginButton",
  computed: {
    avatar() {
      return  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      // return this.$store.getters.avatar
    },
    name() {
      return  this.$store.name
      // return this.$store.getters.avatar
    }
  },
  methods: {
    async logout() {
      let data = await this.$http.post(url.logout)
      if (data == null) {
        return
      }
      this.$store.commit('setLogout')
      this.$router.replace({path:'/'})
    }
  }
}
</script>

<style scoped>
.logbut {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  margin-bottom: 5vw;
}
.but {
  margin-top: 2vw;
}
</style>