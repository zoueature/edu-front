import {ElNotification} from "element-plus";
import ReconnectingWebSocket from "reconnecting-websocket";
function initWs(state) {
    const url = 'ws://47.243.117.37:18000/connect?token=' + localStorage.getItem('access_token')
    // const url = 'ws://192.168.31.44:18000/connect?token=' + localStorage.getItem('access_token')
    state.ws = new ReconnectingWebSocket(url)
    state.ws.onmessage = function(e) {
        let data = JSON.parse(e.data)
        ElNotification({
            title: '收到' + data.sender.name + '的消息',
            message: data.msg,
        })
        state.hasMsg = true
    }
    state.ws.onopen = function () {
    }
    state.ws.onclose = function () {
    }

}

export default {
    setLogin(state, data) {
        if (data.token != null) {
            localStorage.setItem('access_token', data.token )
        }
        let userInfo = data.user
        state.login = true
        state.userType = userInfo.role
        state.userId = userInfo.id
        state.isAdmin = userInfo.isAdmin
        state.name = userInfo.name
        localStorage.setItem('role', userInfo.role)
        if (state.ws == null) {
            initWs(state)
        }
    },

    setLogout(state) {
        state.login = false
        state.userType = ''
        state.userId = 0
        state.isAdmin = false
        localStorage.removeItem('access_token')
        localStorage.removeItem('role')
        if (state.ws != null) {
            state.ws.close()
            state.ws = null
        }
    },

    setWsNotify(state) {
        state.ws.onmessage = function(e) {
            let data = JSON.parse(e.data)
            ElNotification({
                title: '收到' + data.sender.name + '的消息',
                message: data.msg,
            })
            state.hasMsg = true
        }
    },
    setWsInChat(state, handler) {
        state.ws.onmessage = handler
    }
}