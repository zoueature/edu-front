<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/logo.png">
    </div>
    <h1>Edu System</h1>
  </div>
</template>

<script>
export default {
  name: "HeaderCom"
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
}
.header {
  display: flex;
  height: 20%;
}
.logo {
  width: 100px;
  height: 100px;
  margin-right: 25px;
}
.logo img {
  width: 100%;
  height: 100%;
}
</style>