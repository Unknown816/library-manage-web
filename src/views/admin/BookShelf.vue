<template>
  <div class="wraper">
    <el-backtop target=".wraper"></el-backtop>
    <div class="grid-content">
      <el-row type="flex" justify="center">
        <el-col>
          我的书架
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col>
          <!-- 图书grid -->
          <div class="book-grid">
            <div
              
              v-for="books of list"
              :key="books.id"
              style="border=1"
            >
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <el-image
                style="height: 260px; border-radius: 5px"
                fit="fill"
                :src="books.book.fileBase64"
                lazy
              ></el-image>
              <div class="book-name">
              <div>《{{ books.book.name }}》</div>
              <div>点击量: {{ books.book.click }}</div>
                <el-button @click="add(books.book)" icon="el-icon-circle-plus">浏览</el-button>
              </div>
            </el-card>
          </div>
        </div>
        <!-- 图书grid end -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      list: [],
      token: localStorage.getItem("token"),
      userid: null,
      bookShelfId: null,
    };
  },
  methods: {
    getUid() {
      return axios
        .get("/token", { params: { token: this.token } })
        .then((response) => {
          this.userid = response.data.list[0].userid;
        });
    },
    async getBookSheldId(){
      await this.getUid();
      return axios
        .get("/users", { params: { id: this.userid } })
        .then((response) => {
          this.bookShelfId = response.data.list[0].bookShelf.id;
        });
    },
    async loadData() {
      await this.getBookSheldId();
      axios
        .get("/collect", { params: { 'bookShelf.id': this.bookShelfId } })
        .then((response) => {
          this.list = response.data.list;
        });
    },
    async add(book) {
      await axios
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
  },
  created() {
    this.loadData();
  },
}
</script>

<style>

</style>