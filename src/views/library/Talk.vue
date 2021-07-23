<template>
  <div class="wraper">
    <el-backtop target=".wraper"></el-backtop>
    <div class="talk-container">
      <!-- 留言板 -->
      <el-form
        ref="talkForm"
        :model="talkForm"
        label-width="80px"
        label-position="left"
        :rules="rules"
        ><h3 class="login_title">留言板</h3>
        <el-form-item label="评论" prop="content">
          <el-input
            name="sub"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 5 }"
            placeholder="请输入留言内容"
            v-model="talkForm.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">发表</el-button>
          <el-button @click="reset('talkForm')" type="primary">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 留言板 end -->
    </div>
    <br /><br />
    <!-- 留言遍历 -->
    <div class="talk-grid">
      <div class="talk-grid-item" v-for="talk of list" :key="talk.id">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div>
            <div>
              {{ talk.name }}
              <span v-show="talk.callId">
                <span style="font-size: 12px; color: #409eff">回复</span>
                {{ talk.callName }}</span
              >
            </div>
            <div>
              <el-input
                class="invalid"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4 }"
                :placeholder="talk.content"
              >
              </el-input>
            </div>

            <div style="float: left">
              <el-button
                v-show="talk.uid == uid"
                @click="deleteTalk(talk.id)"
                size="mini"
                type="danger"
                >删除</el-button
              >
              <!-- 留言回复 -->
              <el-popover placement="right" width="400" trigger="click">
                <el-input
                  name="call"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  placeholder="请输入回复内容"
                  v-model="talkForm.content"
                >
                </el-input>
                <el-button
                  @click="add(talk.uid, talk.name)"
                  type="primary"
                  size="mini"
                  >提交</el-button
                >
                <el-button @click="reset('talkForm')" type="primary" size="mini"
                  >重置</el-button
                >
                <el-button slot="reference" size="mini">回复</el-button>
              </el-popover>
              <!-- 留言回复 end -->
            </div>
            <div style="float: right; text-align: right; font-size: 12px">
              发表于 {{ dateFormat(talk.talkDate) }}
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 留言遍历 end -->
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

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
    var checkContent = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("内容不能为空"));
      } else {
        return callback();
      }
    };
    return {
      list: [],
      total: 0,
      uid: null,
      token: localStorage.getItem("token"),
      talkForm: {
        uid: null,
        name: "",
        callId: null,
        callName: "",
        content: "",
        talkDate: "",
      },
      searchForm: {
        name: "",
        callName: "",
        content: "",
        talkDate: "",
      },

      rules: {
        content: [{ validator: checkContent, trigger: "blur" }],
      },
    };
  },
  methods: {
    loadData() {
      axios
        .get("/talk", { params: filterNotEmpty(this.searchForm) })
        .then((response) => {
          this.list = response.data.list;
          this.total = response.data.total;
        });
    },
    getUid() {
      return axios
        .get("/token", { params: { token: this.token } })
        .then((response) => {
          this.talkForm.uid = response.data.list[0].userid;
          this.uid = this.talkForm.uid;
        });
    },
    getName() {
      return axios
        .get("/users", { params: { id: this.talkForm.uid } })
        .then((response) => {
          this.talkForm.name = response.data.list[0].name;
        });
    },
    async submit() {
      await this.getName();
      this.talkForm.talkDate = new Date().getTime();
      this.$refs["talkForm"].validate((valid) => {
        if (valid) {
          axios
            .post("/talk", {
              ...this.talkForm,
            })
            .then(() => {
              this.$message({
                message: "发表成功！",
                type: "success",
              });
              this.loadData();
            });
        } else {
          console.log("发表失败!!");
          return false;
        }
      });
    },
    add(id, name) {
      this.talkForm.callId = id;
      this.talkForm.callName = name;
      this.submit();
    },
    deleteTalk(id) {
      this.$confirm("确认删除吗", "提示").then(() => {
        axios.delete(`/talk/${id}`).then(() => {
          this.loadData();
        });
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    dateFormat(val) {
      return dayjs(val).format("YYYY年MM月DD日 HH时mm分ss秒");
    },
  },
  async created() {
    await this.loadData();
    this.getUid();
  },
};
</script>

<style>
.talk-container {
  border-radius: 5px;
  margin-left: 10%;
  margin-top: 1%;
  width: 74%;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.talk-grid {
  border-radius: 10px;
  margin-left: 10%;
  display: grid;
  grid-template-columns: repeat(1, 100%);
  gap: 10px;
  width: 80%;
}
.talk-grid-item {
  border-radius: 10px;
  text-align: left;
  border: 1;
}
</style>