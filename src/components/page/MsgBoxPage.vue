<template>
  <el-scrollbar class="container" v-if="msgs.length > 0">
    <el-card v-for="(msg, index) in msgs" :key="index" class="msg-container" @click="goChat(msg.sender)">
      <div>
        {{msg.sender.name}}
      </div>
      <div class="num">
        {{msg.num}}
      </div>
    </el-card>
  </el-scrollbar>
  <div v-else>
    暂时没有未读消息
  </div>
</template>

<script>
import url from "@/http/url";

export default {
  name: "MsgBoxPage",
  data() {
    return {
      msgs: [],
    }
  },
  methods: {
    goChat(sender) {
      this.readMsg(sender)
      this.$router.push({
        path: '/chat',
        query: {
          id: sender.id,
          name: sender.name,
          role: sender.role,
        }
      })
    },
    async getUnreadMessage() {
      let loginRole = this.$store.getters.role
      let data = await this.$http.get(loginRole === 'teacher' ? url.teacherUnreadMessage : url.studentUnreadMessage)
      if (data == null) {
        return
      }
      this.msgs = data
    },
    async readMsg(sender) {
      let loginRole = this.$store.getters.role
      await this.$http.post(loginRole === 'teacher' ? url.readTeacherMessage : url.readStudentMessage, {
        senderRole: sender.role,
        senderId: sender.id,
      })
    }
  },
  mounted() {
    this.getUnreadMessage()
  }
}
</script>

<style scoped>
.msg-container {
  display: flex;
  justify-content: space-between;
}
.num {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background: red;
  border-radius: 100%;
  overflow: hidden;
  color: white;

}
</style>