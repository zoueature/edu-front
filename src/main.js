import { createApp } from 'vue'
// import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import axios from "@/http/axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import VueCookies from 'vue3-cookies'


import TeacherListPage from "@/components/page/student/TeacherListPage";
import ChatPage from "@/components/page/ChatPage";
import LoginPage from "@/components/page/LoginPage";
import RegisterPage from "@/components/page/RegisterPage";
import ApplySchoolPage from "@/components/page/teacher/applySchool/ApplySchoolPage";
import IndexPage from "@/components/page/IndexPage";
import SchoolApplyListPage from "@/components/page/teacher/applySchool/SchoolApplyListPage";
import MyFollower from "@/components/page/teacher/MyFollower";
import AddStudentPage from "@/components/page/teacher/AddStudentPage";
import AdminSchoolStudentPage from "@/components/page/teacher/AdminSchoolStudentPage";
import AdminSchoolPage from "@/components/page/teacher/AdminSchoolPage";
import BindUserPage from "@/components/page/BindUserPage";
import SchoolStudentPage from "@/components/page/teacher/SchoolStudentPage";
import FollowTeacherListPage from "@/components/page/student/FollowTeacherListPage";
import MsgBoxPage from "@/components/page/MsgBoxPage";


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: '/chat', component: ChatPage },
    { path: '/login', component:  LoginPage},
    { path: '/', component:  LoginPage},
    { path: '/register', component:  RegisterPage},
    { path: '/oauth/auth', component:  BindUserPage},

    { path: '/school/apply', component:  ApplySchoolPage},
    { path: '/school/apply/list', component:  SchoolApplyListPage},
    { path: '/teacher/follower', component:  MyFollower},
    { path: '/teacher/add-student', component:  AddStudentPage},
    { path: '/admin/school/student', component:  AdminSchoolStudentPage},
    { path: '/school/student', component:  SchoolStudentPage},
    { path: '/admin/school', component:  AdminSchoolPage},

    { path: '/student/teachers', component: TeacherListPage },
    { path: '/student/follow/teachers', component: FollowTeacherListPage },
    { path: '/msgbox', component: MsgBoxPage },

]


// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

axios.rejectHandler(router, store)

const app = createApp(IndexPage)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(VueCookies, {
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None"
});
app.config.globalProperties.$http = axios
app.mount('#app')
