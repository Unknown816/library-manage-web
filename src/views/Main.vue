<template>
  <div>
    <div>
      <el-carousel :interval="5000" arrow="always" class="carousel1">
        <el-carousel-item v-for="item in list" :key="item.id">
          <el-image fit="fill" :src="item.url" style="width: 100%"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <br />
    <div class="block">
      <br />
      <span style="font-size: 20px">最近更新</span>
      <br />
      <el-divider></el-divider>
      <el-timeline>
        <el-timeline-item timestamp="2020/12/23" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>Joan 提交于 2020/12/23</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/21" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>Joan 提交于 2020/12/21</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/14" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>Joan 提交于 2020/12/14</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/11/30" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>Joan 提交于 2020/11/30</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/11/29" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>Joan 提交于 2020/11/29</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
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
    };
  },
};
</script>

<style>
.carousel1 {
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
  background-color: #fff;

  width: 80%;
  margin-left: 10%;
}
</style>