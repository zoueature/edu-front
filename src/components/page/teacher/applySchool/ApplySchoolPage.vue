<template>
  <h1>申请开通学校</h1>
  <div class="apply-form">
    <el-form :model="form" label-width="120px">
      <el-form-item label="学校名字">
        <el-input v-model="form.name" class="inputor" placeholder="输入名字"/>
      </el-form-item>
      <el-form-item label="国家">
        <el-input v-model="form.country" class="inputor" placeholder="输入国家"/>
      </el-form-item>
      <el-form-item label="省份">
        <el-input v-model="form.province" class="inputor" placeholder="输入省份"/>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.city" class="inputor" placeholder="输入城市"/>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" class="inputor" placeholder="输入地址"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import url from "@/http/url";
import {ElNotification} from "element-plus";

export default {
  name: "ApplySchoolPage",
  methods: {
    async onSubmit() {
      let data = await this.$http.post(url.applySchool, this.form)
      if (data == null) {
        return
      }
      ElNotification({
        title: '提示',
        message: '申请成功'
      })
      this.form.name = ''
      this.form.country = ''
      this.form.province = ''
      this.form.city = ''
      this.form.address = ''
    }
  },
  data() {
    return {
      form: {
        name: '',
        country: '',
        province: '',
        city: '',
        address: ''
      }
    }
  }
}
</script>

<style scoped>
.apply-form {
  width: 50%;
  margin: 0 auto;
}
.inputor {
  height: 40px;
}
</style>