import {ElNotification} from "element-plus";
function initWs(state) {
    const url = 'ws://192.168.31.44:18000/connect?token=' + localStorage.getItem('access_token')
    state.ws = new WebSocket(url)
    state.ws.onmessage = function(e) {
        ElNotification({
            title: '消息通知',
            message: e.data,
        })
    }
    state.ws.onopen = function () {
        setInterval(function () {
            state.ws.send(JSON.stringify({
                event: "heartbeat",
            }))
        }, 1000)
    }
    state.ws.onclose = function () {
        let ws = new WebSocket(url)
        ws.onmessage = state.ws.onmessage
        ws.onopen = state.ws.onopen
        ws.onclose = state.ws.onclose
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
        initWs(state)
    },

    setLogout(state) {
        state.login = false
        state.userType = ''
        state.userId = 0
        state.isAdmin = false
        localStorage.removeItem('access_token')
        localStorage.removeItem('role')

    },

    setWsNotify(state) {
        state.ws.onmessage = function(e) {
            ElNotification({
                title: '消息通知',
                message: e.data,
            })
        }
    },
    setWsInChat(state, handler) {
        state.ws.onmessage = handler
    }
}