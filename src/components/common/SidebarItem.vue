<template>
  <div class="sidebar-item" @click="goto(route)">
    <div class="icon"><img :src="imURL"></div>
    <span class="title">{{title}}</span>
  </div>
</template>

<script>

export default {
  props: [
      "img",
      "route",
      "title",
  ],
  computed: {
    imURL() {
      return require("@/assets/" + this.img);
    },
  },
  name: "SidebarItem",
  methods: {
    goto(route) {
      this.$router.push({path: route})
    }
  }
}
</script>

<style scoped>
  .sidebar-item {
    width: 90%;
    height: 50px;
    margin: 2px auto;
    display: flex;
    align-items: center;
    align-content: center;
    cursor: pointer ;
  }
  .sidebar-item img {
    width: 100%;
    height: 100%;
  }
  .icon {
    width: 25px;
    height: 25px;
  }
  .icon img {
    width: 100%;
    height: 100%;
  }
  .title {
    margin-left: 10px;
  }
  .menu {
    display: flex;
    align-content: center;
    align-items: center;
  }
  a {
    color: black;
    text-underline: none;
    text-decoration: none;
  }
</style>