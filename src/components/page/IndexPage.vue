<template>
  <div class="home">
    <sidebar class="sidebar" v-if="logined"></sidebar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/page/Sidebar";
import url from "@/http/url";

export default {
  name: 'IndexPage',
  components: {
    Sidebar,
  },
  methods: {
    async checkUserInfo() {
      let data = await this.$http.get(url.getUserInfo)
      if (data == null) {
        return
      }
      if (data.user.role !== localStorage.getItem('role')) {
        this.$store.commit('setLogout')
        this.$router.replace({path: '/'})
        return
      }
      this.$store.commit('setLogin', data)
    },
    async init() {
      await this.checkUserInfo()
    }
  },
  computed: {
    logined() {
      return this.$store.getters.logined
    }
  },
  mounted()  {
    if (this.$store.getters.logined || localStorage.getItem('access_token') != null) {
      this.init()
    }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
.home {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0;
  padding: 0;
}
.sidebar {
  display: flex;
  width: 16%;
  min-width: 55px;
}
.content {
  width: 82%;
  padding: 1%;
}

.title-font {
  font-size: 25px;
  font-weight: bold;
}

.module-title-font {
  font-size: 22px;
  font-weight: bold;
}
</style>
