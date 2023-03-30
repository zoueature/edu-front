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
    },

    setLogout(state) {
        state.login = false
        state.userType = ''
        state.userId = 0
        state.isAdmin = false
        localStorage.removeItem('access_token')
        localStorage.removeItem('role')

    }
}