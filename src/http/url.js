export default {
    getUserInfo: '/user/info',
    login: '/login',
    register: '/register',
    logout: '/logout',
    getOauthLoginURL: '/oauth/login',
    oauthAuth: '/oauth/auth',
    getBindUserList: '/oauth/bind/user',
    bindUser: '/oauth/bind/user',
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


    // student
    getSameSchoolTeacherList: '/student/teacher',
    getFollowTeacherList: '/student/follow/teacher',
    followTeacher: '/student/teacher/follow',
    unfollowTeacher: '/student/teacher/unfollow',
}