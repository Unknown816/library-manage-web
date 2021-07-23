<template>
  <div>
    <h1 style="text-align:center">
      公告栏      
    </h1>
    <el-row v-for="notice in noticeData" :key="notice"  type="flex" class="row-bg" justify="center">
      <el-col :span="2"></el-col>
      <el-col :span="10"><a href="" class="messlink" @click="add(notice)">{{notice.title}}</a><div class="grid-content "></div></el-col>      
      <el-col :span="10" style="text-align:right;">{{dateFormat(notice.createdDate)}}<div class="grid-content"></div></el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-pagination
      class="page"
      :page-size.sync="searchForm.pageSize"
      :current-page.sync="searchForm.pageIndex"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>

    
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
  data () {
    return {
      noticeData:[],
      searchForm: {
        title: null,
        author: null,
        pageSize: 10,
        pageIndex: 1,
      },
      editForm: {
        id: null,
        title: "",
        author: "",
        content: "",
        createdDate: "",
        click: null,
      },
      total: 0,
    };
  },

  
  methods: {
    // messdetail(){
    //   this.$router.replace({ path: "/messagedetail" });
    // },
    loadData() {
      axios
      .get("/notice", { params: filterNotEmpty(this.searchForm) })
      .then((response) => {
        this.noticeData = response.data.list;
        this.total = response.data.total;
        });
      },
    dateFormat(val) {
      return dayjs(val).format("YYYY年MM月DD日");
    }, 
    add(notice) {
      axios
        .get("/notice", {
          params: { id: notice.id },
        })
        .then((response) => {
          this.editForm = response.data.list[0];
          this.editForm.click += 1;
          axios
        .post("/notice", {
          ...this.editForm,
        })
      });
      localStorage.setItem("noticeId", notice.id);
      this.$router.replace({ path: "/messagedetail" });
    }, 
  },
  created() {
    this.loadData();
  },
  watch: {
    searchForm: {
      handler() {
        this.loadData();
      },
      deep: true,
      },
    },
}

</script>
<style>
.row-bg{
  margin-top: 30px;
  width: 1000px;
  margin: 0 auto;
}
.el-row {
    margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  
}
.row-bg {
  padding: 10px 0;
}
.messlink{
  text-decoration: none;
  color:rgb(33, 76, 166)
}
.messlink:hover{
  color:rgb(108, 209, 248)
}
.page{
  margin: 50px auto;
  width: 500px;

}
</style>