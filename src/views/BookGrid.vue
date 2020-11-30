<template>
  <div class="book-grid">
    <div
      class="book-grid-item"
      v-for="book of list"
      :key="book.id"
      style="border=1"
    >
      <el-image
        style="height: 240px"
        fit="fit"
        :src="book.fileBase64"
      ></el-image>
      <div>
        {{ book.name }}
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
</style>