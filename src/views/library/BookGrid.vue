<template>
  <div class="wraper1">
    <el-backtop target=".wraper1"></el-backtop>
    <div class="grid-content">
      <br />
      <el-input
        placeholder="请输入书名关键字"
        v-model="searchForm.name"
        class="input-with-select"
        style="width: 50%"
      >
        <el-select
          v-model="searchForm.category"
          slot="prepend"
          placeholder="分类"
        >
          <el-option
            v-for="item in category"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <br /><br />
      <div class="book-grid">
        <div
          class="book-grid-item"
          v-for="book of list"
          :key="book.id"
          style="border=1"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <el-image
              style="height: 220px; border-radius: 5px"
              fit="fill"
              :src="book.fileBase64"
              lazy
            ></el-image>
            <div class="book-name">
              <div>《{{ book.name }}》</div>
              <div>点击量: {{ book.click }}</div>
              <el-button @click="add(book)" icon="el-icon-circle-plus"
                >浏览</el-button
              >
            </div>
          </el-card>
        </div>
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

export default {
  data() {
    return {
      category: [
        { value: "", label: "全部" },
        { value: "经典", label: "经典" },
        { value: "文学", label: "文学" },
        { value: "流行", label: "流行" },
        { value: "科幻", label: "科幻" },
        { value: "政治", label: "政治" },
        { value: "哲学", label: "哲学" },
        { value: "经管", label: "经管" },
      ],
      list: [],
      total: 0,
      sortType: "click",
      searchForm: {
        name: null,
        authors: null,
        publisher: null,
        category: null,
        pageSize: 99999,
        pageIndex: 1,
      },
      editForm: {
        id: null,
        name: "",
        authors: "",
        publisher: "",
        publishDate: "",
        click: "",
      },
    };
  },
  methods: {
    loadData() {
      axios
        .get("/book", { params: filterNotEmpty(this.searchForm) })
        .then((response) => {
          this.list = response.data.list;
          this.total = response.data.total;
        });
    },
    add(book) {
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
                callback: (action) => {
                  this.$message({
                    type: "success",
                    message: `action: ${action}`,
                  });
                },
              });
            });
        });
    },
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
  },
  created() {
    this.loadData();
  },
};
</script>

<style>
.wraper1 {
  height: 82vh;
  overflow-x: hidden;
}
.book-grid {
  border-radius: 10px;
  background-color: rgba(192, 189, 9, 0.13);
  margin-left: 10%;
  display: grid;
  grid-template-columns: repeat(5, 170px);
  gap: 30px;
  width: 79%;
}
.book-grid-item {
  border-radius: 10px;
  border: 2px solid rgb(190, 190, 190);
}
.book-name {
  text-align: center;
  font-family: "微软雅黑", Arial, Helvetica, sans-serif;
}
.el-select .el-input {
  width: 80px;
}
</style>