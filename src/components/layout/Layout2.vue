<template>
  <div>
    <el-container>
      <el-header class="header2">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          router
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/main" style="width: 120px">首页</el-menu-item>
          <el-submenu index="3" style="width: 120px">
            <template slot="title">用户中心</template>
            <el-menu-item index="/update">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu index="2" style="width: 120px">
            <template slot="title">图书馆</template>
            <el-menu-item index="/bookgrid" style="">图书浏览</el-menu-item>
            <el-menu-item index="/bookpie">点击量图</el-menu-item>
          </el-submenu>
          <el-menu-item
            index="4"
            @click="quit"
            style="float: right; width: 120px"
            >退出登录</el-menu-item
          >
        </el-menu>
      </el-header>
      <el-main class="main2"><router-view /></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    hasLogin() {
      return localStorage.getItem("isLogin") === "0";
    },
    quit() {
      this.$confirm("确认退出吗", "提示").then(() => {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("name");
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
.el-menu-demo {
  width: 100%;
}
.header2 {
  background-color: #f2f6fc;
  text-align: center;
  line-height: 60px;
}
.main2 {
  background-color: #f2f6fc;
  text-align: center;
  height: 515px;
}
</style>