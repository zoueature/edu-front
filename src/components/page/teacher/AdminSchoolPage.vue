<template class="apply">
  <el-scrollbar class="container">
    <el-table :data="list" style="width: 100%; height: 100%;">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
<!--      <el-table-column prop="country" label="国家" width="180" />-->
<!--      <el-table-column prop="province" label="省份" width="180" />-->
      <el-table-column prop="city" label="城市" width="180" />
      <el-table-column prop="address" label="地址" width="180" />
      <el-table-column prop="created_at" label="创建时间" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="gotoAddStudent(scope.row)">新增学生</el-button>
          <el-button size="small" @click="showDialog(scope.row)">邀请老师</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="输入邮箱邀请老师加入"
        width="30%"
    >
      <el-input v-model="inviteEmail" placeholder="输入邀请邮箱"></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="inviteTeacher">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import url from "@/http/url";
import {ElNotification} from "element-plus";

export default {
  name: "AdminSchoolPage",
  data() {
    return {
      list: [],
      dialogVisible: false,
      inviteEmail: '',
      inviteSchool: 0,
    }
  },
  methods: {
    async getApplyList() {
      let data = await this.$http.get(url.getAdminSchoolList)
      console.log(data)
      this.list = data
    },
    async inviteTeacher() {
      let data = await this.$http.post(url.inviteTeacher, {
        email: this.inviteEmail,
        schoolId: this.inviteSchool
      })
      this.dialogVisible = false
      if (data === null) {
        return
      }
      ElNotification({
        title: "提示",
        message: "邀请成功"
      })
    },
    showDialog(school) {
      this.dialogVisible = true
      this.inviteSchool = school.id
    },
    gotoAddStudent(school) {
      this.$router.push({'path': '/teacher/add-student', query: {school: school.id}})
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
  margin: 0 auto;
}
.pagination {
  display: flex;
  margin-top: 25px;
  justify-items: center;
  justify-content: center;
}
</style>