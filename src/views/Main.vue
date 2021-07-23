<template>
  <div class="wraper">
    <el-backtop target=".wraper"></el-backtop>
    <div>
      <el-carousel :interval="5000" arrow="always" class="carousel">
        <el-carousel-item v-for="item in list" :key="item.id">
          <el-image fit="fill" :src="item.url" style="width: 100%"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <br />
    <div class="block">
      <div class="messinfo">
        <el-card>
          <div slot="header" >
            <span style="color:rgb(24, 73, 108);font-size:18px;">
              <img src="@/assets/公告.png" alt="">公告栏
            </span>
            <el-button style="float:right; padding:5px 0;font-size:14px;" type="text" @click="messjump">More>></el-button>
          </div>
          <div v-for="notice in noticeData" :key="notice " class="text item">
            <a href="" class="messlink" @click="add(notice)">{{notice.title}}</a><hr>
          </div>
        </el-card>
      </div>
      <div class="chart">
        <h1>排行榜 Top10</h1>
        <el-row>
          <el-col class="bookchart" v-for="(book,index) of sortClick" :key="book.id" >
            <el-card class="bookcard">
              <img :src="book.fileBase64" class="image">
              <div style="padding: 15px;" class="bookinfo">
                <a href="#" class="theme">{{index+1}}.  {{book.name}}</a>
                <div class="author">
                  <span>{{book.authors}}</span><br>
                  <p style="font-size:12px">点击量: {{book.click}}</p>
                  <el-button @click="go(book)" icon="el-icon-circle-plus"
                >浏览</el-button
              >
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
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
//数组对象方法排序:
function sortByClick(array,key){
  return array.sort(function(a,b){
    var x=a[key];
    var y=b[key];
    return ((x>y)?-1:((x>y)?1:0));
  });
}
export default {
  data() {
      return {
      list: [
        {
          id: "1",
          content: "Welcome to Our Library!",
          url: require("@/assets/tree1.jpg"),
        },
        { id: "2", content: "2", url: require("@/assets/color.jpg") },
        { id: "3", content: "3", url: require("@/assets/pencil.jpg") },
        { id: "4", content: "4", url: require("@/assets/cloud.jpg") },
      ],
      total1: 0,
      booklist:[],
      total: 0,
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
      searchForm1: {
        name: null,
        authors: null,
        publisher: null,
        category: null,
        pageSize: 99999,
        pageIndex: 1,
      },
      editForm1: {
        id: null,
        name: "",
        authors: "",
        publisher: "",
        publishDate: "",
        click: null,
      },
    };
  },
  methods: {
    messjump(){
      this.$router.replace({ path: "/messageinfo" });
    },
    loadData() {
      axios
        .get("/notice", { params: filterNotEmpty(this.searchForm) })
        .then((response) => {
          this.noticeData = response.data.list;
          this.total = response.data.total;
        });
    },
    add(notice){
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
    go(book) {
      axios
        .get("/book", {
          params: { id: book.id },
        })
        .then((response) => {
          this.editForm = response.data.list[0];
          this.editForm.click += 1;
          axios
            .post("/book", {
              ...this.editForm,
            })
            .then(() => {
              this.$alert("请支持正版！", "建议", {
                confirmButtonText: "确定",
                callback: () => {
                  this.$message({
                    type: "success",
                    message: "祝您阅读愉快！",
                  });
                },
              });
            });
        });
      localStorage.setItem("bookId", book.id);
      this.$router.replace({ path: "/content" });
    },

    loadData1() {
      axios
        .get("/book", { params: filterNotEmpty(this.searchForm1) })
        .then((response) => {
          this.booklist = response.data.list;
          this.total1 = response.data.total;
        });
    },
  },
  computed:{
    sortClick:function(){
      return sortByClick(this.booklist,'click').slice(0,10);
    }
  },
  watch: {
    searchForm: {
      handler() {
        this.loadData();
      },
      deep: true,
      immediate: true,
    },
    editForm: {
      handler() {
        this.loadData();
      },
      deep: true,
      immediate: true,
    },
    searchForm1: {
      handler() {
        this.loadData1();
      },
      deep: true,
      immediate: true,
    },
    editForm1: {
      handler() {
        this.loadData1();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.loadData();
    this.loadData1();

  },
};
</script>

<style>
.wraper {
  height: 100%;
  overflow-x: hidden;
}
.carousel {
  background-color: #fff;
  border-radius: 5px;
  width: 80%;
  margin-left: 10%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.block {
  position: relative;
  background-color: #fff;
  height: 800px;
  width: 80%;
  margin-left: 10%;
}

.author{
  margin-top: 15px;
}
.author span{
  font-size: 12px;
  color:rgb(125, 111, 75)
}
.author:before,
.author:after {
    display: table;
    content: "";
}
  
.author:after {
    clear: both
}
.messinfo{
  position: absolute;
  top: 80px;
  right: 10px;
  height: 330px;
  width: 30%;
}
.messlink{
  text-decoration: none;
  color:rgb(33, 76, 166)
}
.messlink:hover{
  color:rgb(108, 209, 248)
}
.chart{
  position: absolute;
  top: 10px;
  left: 10px;
  /* height: 800px; */
  width: 70%;
}
.chart .bookchart{
  display: grid;
  grid-template-columns: repeat(2, 250px);
  gap:50px;
  width: 300px;
  height: 230px;
  margin-left: 25px;
  margin-bottom: 20px;
}

.chart .bookchart .bookcard:hover{

  background-color: rgb(245, 245, 245);
}
.chart .bookchart .bookcard .theme{
  font-size: 18px;
  color:black;
  text-decoration: none;
}
.chart .bookchart .bookcard .theme:hover{
  color:rgb(33, 76, 166);
}
.chart img{
  float: left;
  width: 90px;
  height: 120px;
}
.bookinfo{
  margin-left:60px;
  text-align: center;
}
</style>