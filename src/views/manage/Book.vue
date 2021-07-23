<template>
  <div>
    <div>
      <el-form class="on-table-input" inline>
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
      <el-button
        @click="add"
        icon="el-icon-circle-plus-outline"
        type="primary"
        plain
        >新增</el-button
      >
      <el-button @click="loadData" icon="el-icon-search" type="info" plain
        >查询</el-button
      >
    </div>
    <!-- 图书查询表 -->
    <div>
      <el-table
        class="table"
        stripe
        :data="tableData"
        height="635"
        border>
      <el-table-column prop="publishDate" width="150" fixed label="出版时间" sortable>
        <template #default="{ row }">
          {{ dateFormat(row.publishDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="name" width="200" label="书名"></el-table-column>
      <el-table-column prop="authors" width="200" label="作者"> </el-table-column>
      <el-table-column prop="click" width="120" label="点击量" sortable> </el-table-column>
      <el-table-column prop="pages" width="120" label="页数" sortable></el-table-column>
      <el-table-column prop="category" width="120" label="分类"> </el-table-column>
      <el-table-column prop="publisher" width="200" label="出版商"></el-table-column>
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
    </div>
    <!-- 图书查询表 end -->
    <!-- 分页 -->
    <div>
      <el-pagination
      class="page"
      :page-size.sync="searchForm.pageSize"
      :current-page.sync="searchForm.pageIndex"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    </div>
    <!-- 分页 end -->
    <!-- 编辑/新增对话框 -->
    <el-dialog
      :title="editForm.id ? '编辑' : '新增'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="editForm" label-width="80px" label-position="left">
        <e-row>
          <e-col :span="8">
            <el-form-item label="书名">
              <el-input
                v-model="editForm.name"
                autocomplete="new-text"
                prefix-icon="el-icon-edit"
                placeholder="请输入书名"
              ></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input
                v-model="editForm.authors"
                autocomplete="new-text"
                prefix-icon="el-icon-edit"
                placeholder="请输入作者"
              ></el-input>
            </el-form-item>
          </e-col>
          <e-col :span="8">
            <el-form-item label="分类" style="width: 200px">
              <el-select
                v-model="editForm.category"
                placeholder="请选择"
                style="width: 100px; float: left"
              >
                <el-option
                  v-for="item in category"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出版商">
              <el-input
                v-model="editForm.publisher"
                autocomplete="new-text"
                prefix-icon="el-icon-edit"
                placeholder="请输入出版商"
              ></el-input>
            </el-form-item>
          </e-col>
        </e-row>

        <el-form-item label="点击量">
          <el-input
            v-model="editForm.click"
            autocomplete="new-text"
            prefix-icon="el-icon-edit"
            placeholder="请输入初始点击量0"
          ></el-input>
        </el-form-item>
        <el-form-item label="出版时间">
          <el-date-picker
            v-model="editForm.publishDate"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入简介内容"
            v-model="editForm.brifContent"
          >
          </el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item>
          <el-upload
            name="file"
            action="/api/file"
            :limit="1"
            :on-success="handleFileUploadSuccess"
            :before-upload="beforeAvatarUpload"
            :on-exceed="whenUploadtooMuch"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <!-- 图片上传 end -->
        <!-- 图片显示 -->
        <el-form-item>
          <el-image
            style="height: 220px; width: 170px"
            :src="editForm.fileBase64"
          ></el-image>
        </el-form-item>
        <!-- 图片显示 end -->
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
      category: [
        { value: "经典", label: "经典" },
        { value: "文学", label: "文学" },
        { value: "流行", label: "流行" },
        { value: "科幻", label: "科幻" },
        { value: "政治", label: "政治" },
        { value: "哲学", label: "哲学" },
        { value: "经管", label: "经管" },
      ],
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      searchForm: {
        name: null,
        authors: null,
        publisher: null,
        pageSize: 10,
        pageIndex: 1,
      },
      editForm: {
        id: null,
        name: "",
        authors: "",
        publisher: "",
        publishDate: "",
        click: null,
        category: "",
        brifContent: "",
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
        click: null,
        category: "",
        brifContent: "",
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt500K = file.size / 1024 < 500;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 png 格式!");
      }
      if (!isLt500K) {
        this.$message.error("上传图片大小不能超过 500KB!");
      }
      return isJPG && isLt500K;
    },
    whenUploadtooMuch() {
      this.$message.error("上传图片个数不能超过 1 !");
    },
  },
};
</script>
<style>
.on-table-input{
  position: relative;
  top: 20px;
}
.table{
  position: relative;
  top: 10px;
}
.page{
  position: relative;
}
</style>
