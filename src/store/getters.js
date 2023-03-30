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
    }
}