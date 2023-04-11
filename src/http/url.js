export default {
    getUserInfo: '/user/info',
    login: '/login',
    register: '/register',
    logout: '/logout',
    getOauthLoginURL: '/oauth/login',
    oauthAuth: '/oauth/auth',
    getBindUserList: '/oauth/bind/user',
    bindUser: '/oauth/bind/user',
    unbindUser: '/oauth/unbind/user',
    switchUser: '/oauth/user/switch',

    //teacher
    applySchool: '/teacher/school/apply',
    getSchoolApplyList: '/teacher/school/apply',
    getTeacherFollowerList: '/teacher/follower',
    getAdminSchoolList: '/teacher/admin/school',
    getAdminSchoolStudentList: '/teacher/admin/student',
    getSchoolStudentList: '/teacher/student',
    addStudent: '/teacher/student',
    inviteTeacher: '/teacher/invite',
    teacherChatHistory: '/teacher/chat/history',
    teacherUnreadMessage: '/teacher/unread/message',
    readTeacherMessage: '/teacher/read/message',



    // student
    getSameSchoolTeacherList: '/student/teacher',
    getFollowTeacherList: '/student/follow/teacher',
    followTeacher: '/student/teacher/follow',
    unfollowTeacher: '/student/teacher/unfollow',
    studentChatHistory: '/student/chat/history',
    studentUnreadMessage: '/student/unread/message',
    readStudentMessage: '/student/read/message',
}