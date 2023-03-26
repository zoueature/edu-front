<template>
  <div class="sidebar-item">
    <a :href="route">
      <div class="menu">
        <div class="icon"><img :src="imURL"></div>
        <span>{{title}}</span>
      </div>
    </a>
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

  }
}
</script>

<style scoped>
  .sidebar-item {
    width: 90%;
    /*height: 50%;*/
  }
  .sidebar-item img {
    width: 100%;
    height: 100%;
  }
  .icon {
    width: 32%;
  }
  .menu {
    display: flex;
    align-content: center;
    align-items: center;
  }
  a {
    color: black;
    text-underline: none;
  }
</style>