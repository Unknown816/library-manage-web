<template>
  <div class="bg">
    <div class="person-card">
      <el-card :body-style="{ padding: '0px' }">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <div style="padding: 14px">
          <span>用户名: {{ name }}</span>
        </div>
        <div style="padding: 14px">
          <span> 性 别: {{ sex }} </span>
        </div>
        <el-button @click="edit" type="text">修改</el-button>
      </el-card>
    </div>

    <div>
      <el-dialog title="修改" :visible.sync="isUpdate">
        <el-form :model="searchForm" label-width="80px" label-position="left">
          <el-form-item label="用户名">
            <el-input
              v-model="searchForm.name"
              autocomplete="new-text"
              prefix-icon="el-icon-edit"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="searchForm.password"
              type="password"
              autocomplete="new-password"
              prefix-icon="el-icon-edit"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              v-model="searchForm.sex"
              placeholder="请选择"
              style="width: 100px; float: left"
            >
              <el-option
                v-for="item in Isex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isUpdate = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
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
  data() {
    return {
      token: localStorage.getItem("token"),
      Isex: [
        { value: "男", label: "男" },
        { value: "女", label: "女" },
      ],
      name: "",
      password: "",
      sex: "",
      isUpdate: false,
      searchForm: {
        id: null,
        password: "",
        sex: "",
      },
    };
  },
  methods: {
    getUid(){
      return axios
        .get("/token", { params:  {token:this.token}})
        .then((response) => {
          this.searchForm.id = response.data.list[0].userid;
        });
    },
    async loadData() {
      await this.getUid();
      axios
        .get("/users", { params: filterNotEmpty(this.searchForm) })
        .then((response) => {
          this.searchForm = response.data.list[0];
          this.name = response.data.list[0].name;
          this.password = response.data.list[0].password;
          this.sex = response.data.list[0].sex;
        });
    },
    edit() {
      this.isUpdate = true;
      this.editForm.id = this.id;
    },
    handleEdit() {
      axios
        .post("/users", {
          ...this.searchForm,
        })
        .then(() => {
          this.isUpdate = false;
          this.loadData();
        });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style>
.bg {
  background: url("../../assets/psbg.jpg") no-repeat;
  background-position: center;
  border-radius: 5px;
  height: 83%;
  width: 80%;
  margin-left: 10%;
  background-size: cover;
  position: fixed;
}
.person-card {
  margin-top: 8%;
  width: 30%;
  margin-left: 35%;
}
</style>