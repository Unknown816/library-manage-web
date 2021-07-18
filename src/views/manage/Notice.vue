<template>
  <div>
      <div>
      <el-form class="on-table-input" inline>
        <el-form-item label="标题">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="发布者">
          <el-input v-model="searchForm.authors"></el-input>
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
    <!-- 公告查询表 -->
    <div>
      <el-table
        class="table"
        stripe
        :data="tableData"
        height="666"
        border>
      <el-table-column prop="createdDate" width="150" fixed label="发布时间" sortable>
        <template #default="{ row }">
          {{ dateFormat(row.publishDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="title" width="200" label="标题"></el-table-column>
      <el-table-column prop="author" width="200" label="发布者"> </el-table-column>
      <el-table-column prop="click" width="120" label="浏览量" sortable> </el-table-column>
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
    <!-- 编辑/新增对话框 -->
    <el-dialog
      :title="editForm.id ? '编辑' : '新增'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="editForm" label-width="80px" label-position="left">
        <e-row>
          <e-col :span="8">
            <el-form-item label="标题">
              <el-input
                v-model="editForm.title"
                autocomplete="new-text"
                prefix-icon="el-icon-edit"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="发布者">
              <el-input
                v-model="editForm.author"
                autocomplete="new-text"
                prefix-icon="el-icon-edit"
                placeholder="请输入发布者"
              ></el-input>
            </el-form-item>
          </e-col>
        </e-row>
        <el-form-item label="简介">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 12 }"
            placeholder="请输入简介内容"
            v-model="editForm.content"
          >
          </el-input>
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
    name: "Notice",
    data() {
        return {
            tableData: [],
            total: 0,
            dialogFormVisible: false,
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
            .get("/notice", { params: filterNotEmpty(this.searchForm) })
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
                title: "",
                author: "",
                content: "",
                createdDate: new Date().getTime(),
                click: 0,
            };
        },
        handleEdit() {
            axios
            .post("/notice", {
                ...this.editForm,
            })
            .then(() => {
                this.dialogFormVisible = false;
                this.loadData();
            });
        },
        handleDelete(id) {
            this.$confirm("确认删除吗", "提示").then(() => {
            axios.delete(`/notice/${id}`).then(() => {
                this.loadData();
                });
            });
        },
    },
}
</script>

<style>

</style>