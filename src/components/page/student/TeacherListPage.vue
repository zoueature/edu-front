<template>
  <div class="title">
    <h1>教师列表</h1>
  </div>
  <el-scrollbar class="teachers">
    <el-table :data="teacherList" border stripe style="width: 100%; height: 100%" >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="school" label="学校" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="chat(scope.$index, scope.row)">发送消息</el-button>
          <el-button size="small" @click="follow(scope.$index, scope.row)" v-if="!scope.row.followed">关注</el-button>
          <el-button size="small" @click="unfollow(scope.$index, scope.row)" v-else type="danger">取消关注</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script>
import url from "@/http/url";
import {ElNotification} from "element-plus";

export default {
  name: "TeacherListPage",
  methods: {
    chat(index, row) {
      this.$router.push({
        path: '/chat',
        query: {
          id: row.id,
          name: row.name,
          role: 'teacher',
        }
      })
    },
    async follow(index, row) {
      let data = await this.$http.post(url.followTeacher, {
        teacherId: row.id,
      })
      if (data == null) {
        return
      }
      this.teacherList[index].followed = true
      ElNotification({
        title: "提示",
        message: "关注" + row.name + "成功"
      })
    },
    async unfollow(index, row) {
      let data = await this.$http.post(url.unfollowTeacher, {
        teacherId: row.id,
      })
      if (data == null) {
        return
      }
      this.teacherList[index].followed = false
      ElNotification({
        title: "提示",
        message: "取消关注" + row.name + "成功"
      })
    },
    async getTeacherList() {
      let data = await this.$http.get(url.getSameSchoolTeacherList)
      if (data == null) {
        return
      }
      this.teacherList = data;
    }
  },
  data() {
    return {
      teacherList: [],
      tableData: [
      ]
    }
  },
  mounted() {
    this.getTeacherList()
  }
}
</script>

<style scoped>
  .teachers {
    width: 100%;
    height: 75%;
  }
  .pagination {
    margin-top: 40px;
    display: flex;
    justify-items: center;
    justify-content: center;
  }
</style>