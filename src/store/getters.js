export default {
    logined(state) {
        return state.login
    },
    isAdmin(state) {
        return state.isAdmin
    },
    role(state) {
        return state.userType
    },
    name(state) {
        return state.name
    },
    userId(state) {
        return state.userId
    },
    ws(state) {
        return state.ws
    },
    hasMsg(state) {
        return state.hasMsg
    }
}