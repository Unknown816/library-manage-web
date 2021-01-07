<template>
  <body id="paper">
    <el-form
      ref="loginForm"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="login-container"
      label-position="left"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          prefix-icon="el-icon-edit"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          prefix-icon="el-icon-edit"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="jump" type="primary">登录</el-button>
        <el-button @click="regist" type="primary">注册</el-button>
        <el-button @click="reset('loginForm')" type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import axios from "axios";

function filterNotEmpty(form) {
  let filtered = {};
  for (const field of Object.keys(form)) {
    if (form[field]) {
      filtered[field] = form[field];
    }
  }
  return filtered;
}

export default {
  name: "Login",
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else {
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ok: false,
      token: "",
      loginForm: {
        username: "",
        password: "",
      },
      getForm: {
        id: null,
        name: "",
        password: "",
        qx: "",
      },
      searchForm: {
        name: null,
        password: null,
      },
      responseResult: [],
      rules: {
        username: [
          { validator: checkName, trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    async is_qx() {
      await axios
        .get("/users", { params: filterNotEmpty(this.searchForm) })
        .then((response) => {
          this.getForm = response.data.list[0];
        });
      if (this.getForm.qx === "1") {
        localStorage.setItem("token", this.token);
        localStorage.setItem("isLogin", "1");
        this.$router.replace({ path: "/" });
      } else if (this.getForm.qx === "0") {
        localStorage.setItem("token", this.token);
        localStorage.setItem("isLogin", "0");
        this.$router.replace({ path: "/users" });
      }
    },
    login() {
      return axios
        .post("/users/login", {
          name: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((response) => {
          this.$message({
            message: "登录成功，欢迎您！",
            type: "success",
          });
          this.searchForm.name = this.loginForm.username;
          this.searchForm.password = this.loginForm.password;
          this.token = response.data.token;
          this.ok = true;
        })
        .catch((failResponse) => {
          this.$message.error(failResponse.response.data);
        });
    },
    async jump() {
      await this.login();
      if (this.ok) {
        this.is_qx();
      }
    },
    regist() {
      this.$router.replace("/regist");
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
#paper {
  background: url("../assets/bg.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0;
}
.login-container {
  border-radius: 15px;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>