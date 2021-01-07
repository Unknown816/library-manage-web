<template>
  <div class="bg">
    <div class="person-card">
      <el-card :body-style="{ padding: '0px' }">
        <el-avatar :size="100" fit="fill" :src="list[0].fileBase64"></el-avatar>
        <div style="padding: 14px">
          <span>用户名: {{ list[0].name }}</span>
        </div>
        <div style="padding: 14px">
          <span> 性 别: {{ list[0].sex }} </span>
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
          <el-form-item>
            <el-upload
              name="face"
              action="/api/face"
              :limit="1"
              :on-success="handleFaceUploadSuccess"
              :before-upload="beforeAvatarUpload"
              :on-exceed="whenUploadtooMuch"
            >
              <el-button size="small" type="primary">点击上传头像</el-button>
              <div slot="tip" class="el-upload_tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-image
              style="height: 170px; width: 170px"
              :src="searchForm.fileBase64"
            ></el-image>
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

export default {
  data() {
    return {
      list: [],
      faceId: null,
      token: localStorage.getItem("token"),
      Isex: [
        { value: "男", label: "男" },
        { value: "女", label: "女" },
      ],
      isUpdate: false,
      searchForm: {
        id: null,
        password: "",
        sex: "",
      },
    };
  },
  methods: {
    getUid() {
      return axios
        .get("/token", { params: { token: this.token } })
        .then((response) => {
          this.searchForm.id = response.data.list[0].userid;
        });
    },
    async loadData() {
      await this.getUid();
      axios
        .get("/users", { params: { id: this.searchForm.id } })
        .then((response) => {
          this.list = response.data.list;
          this.searchForm = response.data.list[0];
        });
    },
    edit() {
      this.isUpdate = true;
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
    handleFileUploadSuccess(response) {
      return this.searchForm.face = {
        id: response,
      };
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt500K = file.size / 1024 < 500;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 png 格式!");
      }
      if (!isLt500K) {
        this.$message.error("上传图片大小不能超过 500KB!");
      }
      return isJPG && isLt500K;
    },
    whenUploadtooMuch() {
      this.$message.error("上传图片个数不能超过 1 !");
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