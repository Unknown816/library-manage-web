<template>
  <div>
    <el-container>
      <el-header class="header1">
        图书管理系统
        <div style="float: right">
          <el-button @click="toMain">用户界面</el-button>
          <el-button @click="quit">退出登录</el-button>
        </div>
      </el-header>

      <el-container style="height: 510px">
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            class="categories"
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/book">
              <i class="el-icon-s-home"></i>
              <span slot="title">图书管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/lend">
              <i class="el-icon-user"></i>
              <span slot="title">借阅管理</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">关于</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main1">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    hasLogin() {
      return localStorage.getItem("isLogin") === "1";
    },
    quit() {
      this.$confirm("确认退出吗", "提示").then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLogin");
        this.$router.replace({ path: "/login" });
      });
    },
    toMain() {
      this.$confirm("确认前往用户界面吗", "提示").then(() => {
        this.$router.replace({ path: "/main" });
      });
    },
  },
  created() {
    if (!this.hasLogin()) {
      this.$router.replace("/login");
    }
  },
};
</script>

<style>
.el-header {
  background-color: #303133;
  color: #c0c4cc;
  line-height: 60px;
}
.categories {
  position: fixed;
  margin-left: 50%;
  left: -47%;
  top: 15%;
  width: 150px;
}
</style>