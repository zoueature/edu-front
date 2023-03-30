<template>
  <h2>与{{chatName}}的聊天</h2>
  <el-scrollbar class="chat-msg" ref="scrollbar">
    <div class="msg-content" v-for="(item, index) in msgs" :key="index">
      <div class="from-msg" v-if="item.type ==='from'">
        <div class="avatar">
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622154903_3c36a.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682245009&t=d9a681014dd01edd73dd0db639bc63a5">
        </div>
        <span>{{item.msg}}</span>
      </div>
      <div v-else class="to-msg">
        <span>{{item.msg}}</span>
        <div class="avatar">
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622154903_3c36a.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682245009&t=d9a681014dd01edd73dd0db639bc63a5">
        </div>
      </div>
    </div>
  </el-scrollbar>
  <div class="inputer">
    <el-input v-model="input" placeholder="输入需要发送的消息" clearable @change="chat"/>
  </div>
</template>

<script>
import url from "@/http/url";

export default {
  name: "ChatPage",
  methods: {
    async getChatHistory() {
      let loginRole = this.$store.getters.role
      let history = await this.$http.get(loginRole === 'teacher' ? url.teacherChatHistory : url.studentChatHistory, {
        userId: this.chatTo,
        role: this.chatRole,
      })
      if (history == null) {
        return
      }
      this.msgs = history
    },
    chat() {
      this.pushMessage(this.input)
      this.input = ''
      console.log(this.$refs.scrollbar.wrapRef.scrollHeight)
    },
    pushMessage(msgContent) {
      let sendMsg = JSON.stringify({
        event: "chat",
        msg: msgContent,
      })
      this.ws.send(sendMsg)
      this.msgs.push({
        type: 'to',
        msg: this.input,
      })
    },
    receiveMessage(e) {
      this.msgs.push({
        type: 'from',
        msg: e.data,
      })
    },
    onOpen() {

    },
    openChat() {
      const url = 'ws://127.0.0.1:18000/connect?token=' + localStorage.getItem('access_token') + '&userId=' + this.$route.query.id
      this.ws = new WebSocket(url)
      this.ws.onmessage = this.receiveMessage
      this.ws.onopen = this.onOpen
    }
  },
  updated() {
    this.$refs.scrollbar.setScrollTop(this.$refs.scrollbar.wrapRef.scrollHeight)
  },
  data() {
    return {
      input: '',
      msgs: [],
      chatTo: 0,
      chatRole: '',
      chatName: '',
    }
  },
  mounted() {
    this.chatTo = this.$route.query.id
    this.chatName = this.$route.query.name
    this.chatRole = this.$route.query.role
    this.openChat()
    this.getChatHistory()
  }
}
</script>

<style scoped>
  .chat-msg {
    position: fixed;
    width: 70%;
    right: 20px;
    left: 20px;
    height: 80%;
    margin: 0 auto;
    overflow-y: scroll;
  }
  .inputer {
    position: fixed;
    bottom: 25px;
    width: 40%;
    height: 50px;
    right: 25px;
    display: flex;
    justify-content: center;
    justify-items: center;
  }
  .from-msg, .to-msg {
    display: flex;
    align-items: center;
  }
  .from-msg {
    justify-content: flex-start;
  }
  .to-msg {
    justify-content: flex-end;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    overflow: hidden;
    margin: 16px;
  }
  .avatar img {
    width: 100%;
    height: 100%;
  }
  .msg-content {
    width: 100%;
  }
</style>