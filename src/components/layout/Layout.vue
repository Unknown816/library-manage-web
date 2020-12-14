<template>
  <div>
    <el-container>
      <el-header>
        图书管理系统
        <div style="float: right">
          <el-button @click="quit">退出登录</el-button>
        </div>
      </el-header>

      <el-container style="height: 550px">
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
            <el-menu-item index="/bookgrid">
              <i class="el-icon-menu"></i>
              <span slot="title">图书浏览</span>
            </el-menu-item>
            <el-menu-item index="/bookpie">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">点击量图</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">关于</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
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
        localStorage.removeItem("isLogin");
        this.$router.replace({ path: "/login" });
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