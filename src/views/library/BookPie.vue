<template>
  <!--饼图-->
  <div id="main"></div>
</template>

<script>
// 引入 ECharts 主模块
let echarts = require("echarts/lib/echarts");
// 引入饼图
require("echarts/lib/chart/pie");
// 引入提示框、标题组件、图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/graphic");
require("echarts/lib/component/legend");
// 按需引入
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
      book: [],
      column: [],
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
      return axios
        .get("/book", { params: filterNotEmpty(this.searchForm) })
        .then((response) => {
          this.list = response.data.list;
        });
    },
    change() {
      this.book = this.list.map((item) => {
        const container = {};
        container.value = item.click;
        container.name = item.name;
        return container;
      });
      this.column = this.list.map((item) => {
        return item.name;
      });
    },
    // 绘制饼图
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        backgroundColor: "#fff",
        title: {
          text: "图书点击量统计",
          subtext: "数据量小，还请见谅",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>《{b}》: {c} ({d}%)", // 处理hover显示的文本
        }, // 提示文本的显示
        legend: {
          orient: "vertical",
          right: 65,
          data: this.column,
        }, // 用例
        series: [
          {
            name: "图书",
            type: "pie",
            radius: ["55%", "75%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              }, // 固定文本hover效果，普通状态环形圈中间文本（各个模块文本保持一致时使用）
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold",
                },
              }, // 不固定文本hover效果，环形圈中间文本 强调状态（各个模块文本不同时使用）
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.book, // 数据来源
          },
        ],
      });
    },
  },
  async created() {
    await this.loadData();
    this.change();
    this.drawPie("main");
  },
};
</script>

<style>
#main {
  border-radius: 5px;
  height: 480px;
  width: 100%;
}
</style>