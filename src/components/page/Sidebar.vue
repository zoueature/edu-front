<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../../assets/logo.png">
    </div>
    <div class="menu">
      <div v-for="(menu, index) in menus" :key="index">
        <SidebarItem class="menu-item" :route="menu.path" :img="menu.icon !== undefined ? menu.icon: 'dashboard.svg'" :title="menu.title" ></SidebarItem>
      </div>
    </div>
    <LoginButton class="login"></LoginButton>
  </div>
</template>

<script>
import SidebarItem from "@/components/common/SidebarItem";
import LoginButton from "@/components/common/LoginButton";


export default {
  name: "SidebarCom",
  components: {
    SidebarItem,
    LoginButton,
  },
  computed: {
    menus() {
      let menus = this.studentMenu
      if (this.$store.getters.role === 'teacher') {
        menus = this.teacherMenu
      }
      console.log(menus)
      return menus
    },
  },
  data() {
    return {
      teacherMenu: [
        {
          id: 6,
          path: "/admin/school",
          title: "我管理的学校",
          icon: 'school.png',
        },
        {
          id: 1,
          path: "/school/apply",
          title: "学校申请",
          icon: 'receipt.png',
        },
        {
          id: 2,
          path: "/school/apply/list",
          title: "学校申请列表",
          icon: 'ticket.png',
        },

        {
          id: 3,
          path: "/teacher/follower",
          title: "关注我的学生",
          icon: 'following.png',
        },
        {
          id: 4,
          path: "/teacher/add-student",
          title: "新增学生",
          icon: 'user-add.png',
        },
        {
          id: 5,
          path: "/admin/school/student",
          title: "我管理的学生",
          icon: 'graduation-cap.png',
        },
        {
          id: 7,
          path: "/school/student",
          title: "我的学生",
          icon: 'graduation-cap.png',
        },
      ],
      studentMenu: [
        {
          path: "/student/teachers",
          title: "教师列表",
          icon: 'teacher.png',
        },
        {
          path: "/student/follow/teachers",
          title: "我关注的老师",
          icon: 'teacher.png',
        }
      ]
    }
  }

}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid #cccccc;
}
.logo {
  width: 5vw;
  height: 5vw;
  margin: 1vw auto 1vw auto;
}
.logo img {
  width: 100%;
  height: 100%;
}
.menu {
  flex-grow: 1;
}
.menu-item {
  margin: 0 auto;
}
.login {
  align-self: flex-end;
}

</style>