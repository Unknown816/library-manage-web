<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/messageinfo' }">公告栏</el-breadcrumb-item>
        <el-breadcrumb-item>当前公告</el-breadcrumb-item>
        <el-breadcrumb-item>点击量：{{tableData[0].click}} </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="detail">
      <h1>{{tableData[0].title}}</h1>
      <div class="date">
        <span>{{dateFormat(tableData[0].createdDate)}}</span>
      </div>
      <div class="content" style="text-indent:20px;">
        <span >{{tableData[0].content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  data () {
    return {
      message:111,
      tableData: [],
      noticeId: localStorage.getItem("noticeId"),
      searchForm: {
        title: null,
        author: null,
        pageSize: 10,
        pageIndex: 1,
      },
    };
  },

  methods: {
    loadData() {
      axios.get("/notice", { params: { id: this.noticeId } }).then((response) => {
        this.tableData = response.data.list;
        console.log(this.tableData);
      });
    },
    back() {
      localStorage.removeItem("noticeId");
      this.$router.replace({ path: "/messageinfo" });
    },
    dateFormat(val) {
      return dayjs(val).format("YYYY年MM月DD日");
    },
  },
  created() {
    this.loadData();
  },
}

</script>
<style>
.bread{
  width: 80%;
  margin: 10px auto;

}
.detail{
  position: relative;
  width: 80%;
  margin: 30px auto;
}
.detail h1{
  text-align: center;
}
.detail .date{
  position: absolute;
  top: 10px;
  right: 10px;
}
.detail .content{
  padding-top: 20px;
  text-indent: 2px;

} 

</style>