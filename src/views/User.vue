<template>
  <div>
    <div>
      <el-form inline>
        <el-form-item label="用户名">
          <el-input v-model="searchForm.name"></el-input>
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
    <el-table stripe :data="tableData" style="width: 100%" border>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="qx" label="权限"></el-table-column>
      <el-table-column prop="createDate" label="创建时间">
        <template #default="{ row }">
          {{ dateFormat(row.createDate) }}
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
      <el-form :model="editForm" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input
            v-model="editForm.name"
            autocomplete="new-text"
            prefix-icon="el-icon-edit"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="editForm.password"
            type="password"
            autocomplete="new-password"
            prefix-icon="el-icon-edit"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="editForm.sex"
            placeholder="请选择"
            style="width: 100px; float: left"
          >
            <el-option
              v-for="item in Isex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限">
          <el-input
            v-model="editForm.qx"
            autocomplete="new-text"
            prefix-icon="el-icon-edit"
            placeholder="请输入权限0/1"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="editForm.createDate"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            style="width: 100%"
          >
          </el-date-picker>
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
  name: "User",
  data() {
    return {
      Isex: [
        { value: "男", label: "男" },
        { value: "女", label: "女" },
      ],
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      searchForm: {
        name: null,
        pageSize: 5,
        pageIndex: 1,
      },
      editForm: {
        id: null,
        name: "",
        password: "",
        createDate: "",
        sex: "",
        qx: null,
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
        .get("/users", { params: filterNotEmpty(this.searchForm) })
        .then((response) => {
          this.tableData = response.data.list;
          this.total = response.data.total;
        });
    },
    dateFormat(val) {
      return dayjs(val).format("YYYY年MM月DD日");
    },
    add() {
      this.dialogFormVisible = true;
      this.editForm = {
        id: null,
        name: "",
        password: "",
        createDate: "",
        sex: null,
        qx: 0,
      };
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.editForm = {
        ...row,
      };
    },
    handleEdit() {
      axios
        .post("/users", {
          ...this.editForm,
        })
        .then(() => {
          this.dialogFormVisible = false;
          this.loadData();
        });
    },
    handleDelete(id) {
      this.$confirm("确认删除吗", "提示").then(() => {
        axios.delete(`/users/${id}`).then(() => {
          this.loadData();
        });
      });
    },
  },
};
</script>

<style>
</style>