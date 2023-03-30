<template>
  <h1>新增学生</h1>
  <el-form class="form" v-if="schoolList.length > 0">
    <el-form-item label="学校">
      <el-select v-model="student.schoolId" class="m-2" placeholder="选择学校">
        <el-option
            v-for="item in schoolList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="student.name" placeholder="输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="年段">
      <el-select v-model="student.grade" class="m-2" placeholder="选择年级">
      <el-option
          v-for="item in grades"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
      </el-select>
    </el-form-item>
    <el-form-item label="班级">
      <el-select v-model="student.class" class="m-2" placeholder="选择班级">
      <el-option
          v-for="item in classes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
      </el-select>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="student.username" placeholder="输入用户名"></el-input>
    </el-form-item>

    <el-form-item label="密码">
      <el-input v-model="student.password" type="password" placeholder="输入密码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="addStudent">新增</el-button>
    </el-form-item>
  </el-form>
  <div v-else>
    <span>暂时还没有管理的学校， 先去申请开通学校吧</span>
  </div>
</template>

<script>
import url from "@/http/url";
import { ElNotification } from 'element-plus'


export default {
  name: "AddStudentPage",
  data() {
    return {
      schoolList: [],
      grades: [
        {
          value: 1,
          label: '一年级',
        },
        {
          value: 2,
          label: '二年级',
        },
        {
          value: 3,
          label: '三年级',
        },
        {
          value: 4,
          label: '四年级',
        },
        {
          value: 5,
          label: '五年级',
        },
        {
          value: 6,
          label: '六年级',
        },

      ],
      classes: [
        {
          value: 1,
          label: '一班',
        },
        {
          value: 2,
          label: '二班',
        },
        {
          value: 3,
          label: '三班',
        },
        {
          value: 4,
          label: '四班',
        },
        {
          value: 5,
          label: '五班',
        },
        {
          value: 6,
          label: '六班',
        },

      ],
      student: {
        schoolId: '',
        name: '',
        username: '',
        password: '',
        grade: 0,
        class: 0,
      }
    }
  },
  methods: {
    async getAdminSchoolList() {
      let schools = await  this.$http.get(url.getAdminSchoolList)
      if (schools == null || schools.length === 0) {
        return
      }
      this.schoolList = schools
      if (this.student.schoolId === 0) {
        this.student.schoolId = schools[0].id
      }
    },
    async addStudent() {
      let data = await this.$http.post(url.addStudent, this.student)
      if (data == null) {
        return
      }
      ElNotification({
        title: "成功",
        message: "创建学生成功",
      })
      this.student.schoolId = ''
      this.student.name = ''
      this.student.username = ''
      this.student.password = ''
      this.student.grade = 0
      this.student.class = 0
    }
  },
  mounted() {
    this.getAdminSchoolList()
    if (this.$route.query.school !== undefined) {
     this.student.schoolId = +this.$route.query.school
    }
  }
}
</script>

<style scoped>
.form {
  width: 50%;
  margin:  0 auto;
}
</style>