<template>
  <div class="home">
    <div>
      <el-form inline>
        <el-form-item label="书名">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="searchForm.authors"></el-input>
        </el-form-item>
        <el-form-item label="出版商">
          <el-input v-model="searchForm.publisher"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="float: right">
      <el-button @click="add" icon="el-icon-circle-plus">新增</el-button>
      <el-button @click="loadData" icon="el-icon-search">查询</el-button>
    </div>
    <el-table stripe :data="tableData" style="width: 100%" border>
      <el-table-column prop="name" label="书名"></el-table-column>
      <el-table-column prop="authors" label="作者"> </el-table-column>
      <el-table-column prop="publisher" label="出版商"></el-table-column>
      <el-table-column prop="publishDate" label="出版时间">
        <template #default="{ row }">
          {{ dateFormat(row.publishDate) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template #default="{ row }">
          <el-button size="mini" icon="el-icon-edit" @click="edit(row)"
            >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(row.id)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size.sync="searchForm.pageSize"
      :current-page.sync="searchForm.pageIndex"
      :total="total"
      layout="prev, pager, next"
    >
    </el-pagination>
    <el-dialog
      :title="editForm.id ? '编辑' : '新增'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="editForm">
        <el-form-item label="书名">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="editForm.authors" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版商">
          <el-input v-model="editForm.publisher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版时间">
          <el-date-picker
            v-model="editForm.publishDate"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="/api/file"
            :limit="1"
            :on-success="handleFileUploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-image :src="editForm.fileBase64"></el-image>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
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
  name: "Book",
  data() {
    return {
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      searchForm: {
        name: null,
        authors: null,
        publisher: null,
        pageSize: 5,
        pageIndex: 1,
      },
      editForm: {
        id: null,
        name: "",
        authors: "",
        publisher: "",
        publishDate: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
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
  methods: {
    loadData() {
      axios
        .get("/book", { params: filterNotEmpty(this.searchForm) })
        .then((response) => {
          this.tableData = response.data.list;
          this.total = response.data.total;
        });
    },
    dateFormat(val) {
      return dayjs(val).format("YYYY年MM月DD日");
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.editForm = {
        ...row,
      };
    },
    add() {
      this.dialogFormVisible = true;
      this.editForm = {
        id: null,
        name: "",
        authors: "",
        publisher: "",
        publishDate: "",
      };
    },
    handleEdit() {
      axios
        .post("/book", {
          ...this.editForm,
        })
        .then(() => {
          this.dialogFormVisible = false;
          this.loadData();
        });
    },
    handleDelete(id) {
      this.$confirm("确认删除吗", "提示").then(() => {
        axios.delete(`/book/${id}`).then(() => {
          this.loadData();
        });
      });
    },
    handleFileUploadSuccess(response) {
      this.editForm.file = {
        id: response,
      };
    },
  },
};
</script>
<style>
</style>
