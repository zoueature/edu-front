import {ElNotification} from "element-plus";
function initWs(state) {
    const url = 'ws://47.243.117.37:18000/connect?token=' + localStorage.getItem('access_token')
    // const url = 'ws://192.168.31.44:18000/connect?token=' + localStorage.getItem('access_token')
    state.ws = new WebSocket(url)
    state.ws.onmessage = function(e) {
        let data = JSON.parse(e.data)
        ElNotification({
            title: '收到' + data.sender.name + '的消息',
            message: data.msg,
        })
        state.hasMsg = true
    }
    state.ws.onopen = function () {
        // setInterval(function () {
        //     state.ws.send(JSON.stringify({
        //         event: "heartbeat",
        //     }))
        // }, 1000)
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