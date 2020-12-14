<template>
  <div>
    <div class="book-grid">
      <div
        class="book-grid-item"
        v-for="book of list"
        :key="book.id"
        style="border=1"
      >
        <el-image
          style="height: 220px"
          fit="fit"
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
      list: [],
      total: 0,
      searchForm: {
        name: null,
        authors: null,
        publisher: null,
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
          this.editForm = response.data.list;
          this.editForm = {
            ...book,
          };
          this.editForm.click+=1;
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
.book-grid {
  display: grid;
  grid-template-columns: repeat(5, 170px);
  gap: 30px;
}
.book-grid-item {
  border-radius: 10px;
  border: 10px solid rgb(190, 190, 190);
}
.book-name {
  text-align: center;
  font-family: "微软雅黑", Arial, Helvetica, sans-serif;
}
</style>