<template>
  <body id="paper">
    <el-form
      :model="registForm"
      status-icon
      :rules="rules"
      ref="registForm"
      label-width="80px"
      class="login-container"
      label-position="left"
    >
      <h3 class="login_title">用户注册</h3>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="registForm.name" autocomplete="new-text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registForm.password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="registForm.checkPass"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit('registForm')" type="primary">提交</el-button>
        <el-button @click="reset('registForm')" type="primary">重置</el-button>
        <el-button @click="back" type="primary">返回</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import axios from "axios";
export default {
  name: "Regist",
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
        if (this.registForm.checkPass !== "") {
          this.$refs.registForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registForm: {
        name: "",
        password: "",
        checkPass: "",
      },
      responseResult: [],
      rules: {
        name: [
          { validator: checkName, trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("/users", {
              ...this.registForm,
            })
            .then(() => {
              this.$router.replace({ path: "/login" });
            });
          this.$message({
            message: "注册成功！",
            type: "success",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.replace({ path: "/login" });
    },
  },
};
</script>

<style>
#paper {
  background: url("../assets/login.jpg") no-repeat;
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