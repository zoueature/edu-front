<template class="apply">
  <h1>学校申请列表</h1>
  <el-scrollbar class="container">
    <el-table :data="list" style="width: 100%; height: 100%;">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="school.name" label="名称" width="180" />
      <el-table-column prop="school.province" label="省份" width="180" />
      <el-table-column prop="school.city" label="城市" width="180" />
      <el-table-column prop="school.address" label="地址" width="180" />
      <el-table-column prop="statusName" label="状态" />
    </el-table>
  </el-scrollbar>
</template>

<script>
import url from "@/http/url";

const statusName = ['待审核', '通过', '拒绝']
export default {
  name: "SchoolApplyListPage",
  data() {
    return {
      list: [],
    }
  },
  methods: {
    async getApplyList() {
      let data = await this.$http.get(url.getSchoolApplyList)
     for (let i = 0; i < data.length; i ++) {
       data[i].statusName = statusName[+data[i].status]
     }
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