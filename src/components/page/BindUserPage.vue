<template>
  <div class="bind-new">
    <el-button type="primary" @click="dialogVisible=true"> 绑定新用户</el-button>
    <el-button type="primary" @click="getBindUserList"> 刷新列表</el-button>
    <div class="qrcode">
      <img src="../../assets/qrcode.png">
    </div>
    <h3>扫码接收Line消息通知</h3>
  </div>
  <div class="bind-list">
    <h4>学生</h4>
    <div class="list-container" >
      <div v-for="(user, index) in bindUserList.student" :key="index" @click="switchUser('student', user.id)" class="bind-card">
        <el-card shadow="hover"> {{user.name}} </el-card>
        <div class="unbind-button" @click.stop="unbind(user)">x</div>
      </div>
    </div>
    <div class="list-container">
      <h4>教师</h4>
      <div v-for="(user, index) in bindUserList.teacher" :key="index" @click="switchUser('teacher', user.id)" class="bind-card">
        <el-card shadow="hover"> {{user.name}} </el-card>
        <div class="unbind-button" @click.stop="unbind(user)">x</div>
      </div>
    </div>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="输入用户名密码"
      width="30%"
  >
    <el-input v-model="bindUserInfo.username" placeholder="输入用户名/邮箱" class="inputor"></el-input>
    <el-input v-model="bindUserInfo.password" type="password" placeholder="输入密码" class="inputor"></el-input>
    <el-switch
        v-model="bindUserInfo.role"
        class="mb-2 type-switch inputor"
        active-text="学生绑定"
        inactive-text="教师绑定"
        active-value="student"
        inactive-value="teacher"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="bindUsr">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import url from "@/http/url";
import {ElNotification} from "element-plus";

export default {
  name: "BindUserPage",
  data() {
    return {
      token: '',
      bindUserList: {
        student: [],
        teacher: []
      },
      bindUserInfo: {
        username: '',
        password: '',
        role: 'student',
      },
      dialogVisible: false,
    }
  },
  methods: {
    async oauthAuth(type, code) {
      let data = await this.$http.get(url.oauthAuth, {loginType: type, code: code})
      if (data == null) {
        return false
      }
      this.token = data.token
      return true
    },
    async getBindUserList() {
      let data = await this.$http.get(url.getBindUserList, {}, {Authorization: "Bearer " + this.token})
      if (data == null) {
        return null
      }
      this.bindUserList = data
    },
    async bindUsr() {
      let data = await this.$http.post(url.bindUser, this.bindUserInfo, {Authorization: "Bearer " + this.token})
      if (data == null) {
        return
      }
      this.dialogVisible = false;
      ElNotification({
        title: '提示',
        message: '绑定成功',
      })
      await this.getBindUserList()
    },
    async unbind(user) {
      let data = await this.$http.post(url.unbindUser, {
        userId: user.id,
        role: user.role,
      }, {Authorization: "Bearer " + this.token})
      if (data == null) {
        return
      }
      ElNotification({
        title: '提示',
        message: '解绑成功',
      })
      await this.getBindUserList()
    },
    async switchUser(role, userId) {
      let data = await this.$http.post(url.switchUser, {
        userId: userId,
        role: role,
      }, {Authorization: "Bearer " + this.token})
      if (data == null) {
        return
      }
      this.$store.commit("setLogin", data)
      if (role === 'teacher') {
        this.$router.replace({path: '/school/apply/list'})
      } else {
        this.$router.replace({path: '/student/teachers'})
      }
    },
    async init(type, code) {
      let ok = await this.oauthAuth(type, code)
      if (!ok) {
        return;
      }
      await this.getBindUserList()
    }

  },
  mounted() {
    let code = this.$route.query.code
    if (code === undefined) {
      this.$router.replace({path: '/'})
      return
    }

    let type = this.$route.query.type
    if (type === undefined) {
      this.$router.replace({path: '/'})
      return
    }
    this.init(type, code)

  }
}
</script>

<style scoped>
.inputor {
  margin-bottom: 16px;
}
.bind-new {
  margin-bottom: 50px;
  display: flex;
}
.bind-list {
  display: flex;
}
.list-container {
  width: 45%;
}
.bind-card {
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
}
.unbind-button {
  width: 20px;
  height: 20px;
  background: red;
  color: white;
  position: absolute;
  right: 0;
  top: 0;
}
.qrcode {
  width: 100px;
  height: 100px;
  margin-left: 25px;
  margin-right: 25px;
}
.qrcode img {
  width: 100%;
  height: 100%;
}
</style>