<template>
  <div>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="2"><div></div></el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }" class="card">
        <el-image
          class="p1"
          style="height: 220px; width: 170px; border-radius: 5px; float: left"
          fit="fill"
          :src="list[0].fileBase64"
        ></el-image>
        <div class="pc1">
          <div style="padding: 14px; text-align: left">
            <span>书名: {{ list[0].name }}</span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>作者: {{ list[0].authors }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>分类: {{ list[0].category }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>出版商: {{ list[0].publisher }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>出版日期: {{ dateFormat(list[0].publishDate) }} </span>
          </div>
        </div>
        <div>
          <el-button @click="showBrifContent" type="text">简介</el-button>
          <el-button type="text">目录</el-button>
          <el-button @click="back" type="text">返回</el-button>
        </div>
      </el-card>
        </div>
      </el-col>

      <el-col :span="10">
        <div class="grid-content bg-purple-light">
          <el-card :body-style="{ padding: '0px' }" class="card">
        <el-image
          class="p1"
          style="height: 220px; width: 170px; border-radius: 5px; float: left"
          fit="fill"
          :src="list[0].fileBase64"
        ></el-image>
        <div class="pc1">
          <div style="padding: 14px; text-align: left">
            <span>书名: {{ list[0].name }}</span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>作者: {{ list[0].authors }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>分类: {{ list[0].category }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>出版商: {{ list[0].publisher }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>出版日期: {{ dateFormat(list[0].publishDate) }} </span>
          </div>
        </div>
        <div>
          <el-button @click="showBrifContent" type="text">简介</el-button>
          <el-button type="text">目录</el-button>
          <el-button @click="back" type="text">返回</el-button>
        </div>
      </el-card>
        </div>
      </el-col>

      <el-col :span="2"><div></div></el-col>
    </el-row>

    <el-row>
      <el-card :body-style="{ padding: '0px' }" class="card">
        <el-image
          class="p1"
          style="height: 220px; width: 170px; border-radius: 5px; float: left"
          fit="fill"
          :src="list[0].fileBase64"
        ></el-image>
        <div class="pc1">
          <div style="padding: 14px; text-align: left">
            <span>书名: {{ list[0].name }}</span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>作者: {{ list[0].authors }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>分类: {{ list[0].category }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>出版商: {{ list[0].publisher }} </span>
          </div>
          <div style="padding: 14px; text-align: left">
            <span>出版日期: {{ dateFormat(list[0].publishDate) }} </span>
          </div>
        </div>
        <div>
          <el-button @click="showBrifContent" type="text">简介</el-button>
          <el-button type="text">目录</el-button>
          <el-button @click="back" type="text">返回</el-button>
        </div>
      </el-card>
    </el-row>
    <div class="pc">
      
    </div>
    <el-dialog
      title="简介"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ list[0].brifContent }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      bookId: localStorage.getItem("bookId"),
      searchForm: {
        id: null,
        name: null,
        authors: null,
        publisher: null,
        pageSize: 10,
        pageIndex: 1,
      },
    };
  },
  methods: {
    loadData() {
      axios.get("/book", { params: { id: this.bookId } }).then((response) => {
        this.list = response.data.list;
        console.log(this.list);
      });
    },
    back() {
      localStorage.removeItem("bookId");
      this.$router.replace({ path: "/bookgrid" });
    },
    dateFormat(val) {
      return dayjs(val).format("YYYY年MM月DD日");
    },
    showBrifContent() {
      this.dialogVisible = true;
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style>
.pc1 {
  float: right;
  margin-right: 15%;
  margin-top: 11%;
}
.pc {
  width: 80%;
  margin-left: 10%;
}
.card {
  height: 470px;
}
.p1 {
  margin-left: 20%;
  margin-top: 13%;
}
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>