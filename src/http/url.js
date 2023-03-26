export default {
    getUserInfo: '/user/info',
    login: '/login',
    register: '/register',
    logout: '/logout',

    //teacher
    applySchool: '/teacher/school/apply',
    getSchoolApplyList: '/teacher/school/apply',
    getTeacherFollowerList: '/teacher/follower',
    getAdminSchoolList: '/teacher/admin/school',
    getAdminSchoolStudentList: '/teacher/admin/student',
    addStudent: '/teacher/student',


    // student
    getSameSchoolTeacherList: '/student/teacher',
    followTeacher: '/student/teacher/follow',
    unfollowTeacher: '/student/teacher/unfollow',
}