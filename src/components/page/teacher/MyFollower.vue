<template class="apply">
  <el-scrollbar class="container">
    <el-table :data="list" style="width: 100%; height: 100%;">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="grade" label="年级" width="180" />
      <el-table-column prop="class" label="班级" width="180" />
      <el-table-column prop="school.name" label="学校名" width="180" />
      <el-table-column prop="school.province" label="省份" width="180" />
      <el-table-column prop="school.city" label="城市" width="180" />
      <el-table-column prop="school.address" label="地址" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="chat(scope.row)">发送消息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script>
import url from "@/http/url";

export default {
  name: "MyFollower",
  data() {
    return {
      list: [],
    }
  },
  methods: {
    chat(student) {
      this.$router.push({
        path: '/chat',
        query: {
          id: student.id
        }
      })
    },
    async getApplyList() {
      let data = await this.$http.get(url.getTeacherFollowerList)
      console.log(data)
      this.list = data
    }
  },
  mounted() {
    this.getApplyList();
  }
}
</script>

<style scoped>
.container {
  height: 70%;
  width: 100%;
  color: rebeccapurple;
  margin: 0 auto;
}
.pagination {
  display: flex;
  margin-top: 25px;
  justify-items: center;
  justify-content: center;
}
</style>