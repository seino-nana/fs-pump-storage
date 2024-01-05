<script setup>
import { ref, onMounted, createVNode } from "vue";
import Base from "../Base/Base";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { getArticle, getPump, searchPump } from "@/api/pump.js";
onMounted(() => {
  new Base(document.querySelector(".base-canvas")); // 实例化canvasenv = new Env(baseInstance);
  _getArticle();
  _getPump();
});
const _getArticle = () => {
  getArticle().then((res) => {
    content.value = res[0].content;
    content2.value = res[1].content;
  });
};

const content = ref("");
const content2 = ref("");
const mid = ref("preview-only");

// 表格
let pumpList = ref([]);
const _getPump = () => {
  getPump().then((res) => {
    pumpList.value = res;
  });
};
const pagination = ref({ pageSize: 15 });
// 递归函数，用于处理参数值并添加换行
function formatValues(value) {
  return value.split(",").map((val) => createVNode("div", null, val));
}
// 递归函数，用于处理参数并添加换行
function formatColumns(columns) {
  return columns.map((column) => {
    if (column.children) {
      // 如果有子列，递归处理子列
      return {
        ...column,
        children: formatColumns(column.children),
      };
    } else if (column.render) {
      // 如果有render函数，添加适当的处理
      return {
        ...column,
        render: (row) => {
          return createVNode(
            "div",
            null,
            column
              .render(row)
              .children.map((val) => createVNode("div", null, val))
          );
        },
      };
    } else {
      // 处理普通列
      return {
        ...column,
        render: (row) => {
          return createVNode("div", null, formatValues(row[column.key]));
        },
      };
    }
  });
}

const cols = formatColumns([
  {
    title: "型号",
    key: "Type",
  },
  {
    title: "流量",
    key: "Capacity",
    children: [
      {
        title: "m3/h",
        key: "CapacityM",
      },
    ],
  },
  {
    title: "扬程",
    children: [{ title: "m", key: "Head" }],
  },
  {
    title: "转速",
    children: [
      {
        title: "r/min",
        key: "Speed",
      },
    ],
  },
  {
    title: "轴功率",
    children: [
      {
        title: "kw",
        key: "ShaftPower",
      },
    ],
  },
  {
    title: "配带电动机",
    children: [
      {
        title: "功率(kw)",
        key: "MotorPower",
      },
      { title: "型号", key: "MotorType" },
    ],
  },
  {
    title: "效率η",
    children: [
      {
        title: "%",
        key: "Eff",
      },
    ],
  },
  {
    title: "必须气蚀余量",
    children: [
      {
        title: "m",
        key: "NPSH",
      },
    ],
  },
  {
    title: "叶轮直径",
    children: [
      {
        title: "mm",
        key: "Impeller",
      },
    ],
  },
  {
    title: "泵进口",
    children: [
      {
        title: "mm",
        key: "Inlet",
      },
    ],
  },
  {
    title: "泵出口",
    children: [
      {
        title: "mm",
        key: "Outlet",
      },
    ],
  },
]);
const searchData = ref("");
const search = () => {
  if (searchData.value === "") {
    _getPump();
  } else {
    searchPump(searchData.value).then((res) => {
      pumpList.value = res;
    });
  }
};
</script>

<template>
  <div>
    <div class="base">
      <canvas class="base-canvas"></canvas>
    </div>
    <!-- Preloader -->
    <div class="preloader">
      <div class="preloader-wrapper">
        <div class="loading">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    </div>
    <div class="page" asscroll-container>
      <div class="page-wrapper" asscroll>
        <section class="hero">
          <div class="hero-wrapper">
            <div class="intro-text">长沙福斯水泵泵业有限公司</div>
            <div class="arrow-svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path
                  fill="currentColor"
                  d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"
                />
              </svg>
            </div>

            <div class="hero-main">
              <h1 class="hero-main-title">GX型高效节能单级双吸离心泵</h1>
              <p class="hero-main-description">
                GX Type High-Efficiency Energy-Saving Single-Stage
                Double-Suction Centrifugal Pump
              </p>
            </div>
          </div>
        </section>
        <div class="first-move section-margin"></div>
        <section class="second-section section left">
          <div class="progress-wrapper progress-bar-wrapper-left">
            <div class="progress-bar"></div>
          </div>
          <div class="section-intro-wrapper">
            <h1 class="section-title">
              <span class="section-title-text">产品手册</span>
              <div class="section-title-decoration styleOne"></div>
              <div class="section-title-decoration styleTwo"></div>
              <div class="section-title-decoration styleThree"></div>
            </h1>
            <span class="section-number">01</span>
          </div>
          <h1 class="section-title">
            <!-- 在这里显示你的文章内容 -->
            <MdPreview
              :editorId="mid"
              :modelValue="content"
              style="
                margin-top: 20px;
                box-shadow: 9px 9px 15px rgba(0, 0, 0, 0.1),
                  -9px -9px 15px rgba(255, 255, 255, 1);
                border-radius: 15px;
                transition: box-shadow 0.2s ease-out;
              "
            />
          </h1>
        </section>
        <div class="second-move section-margin"></div>
        <section class="second-section section right">
          <div class="progress-wrapper progress-bar-wrapper-right">
            <div class="progress-bar"></div>
          </div>
          <div class="section-intro-wrapper">
            <h1 class="section-title">
              <span class="section-title-text">外形及结构图</span>
              <div class="section-title-decoration styleOne"></div>
              <div class="section-title-decoration styleTwo"></div>
              <div class="section-title-decoration styleThree"></div>
            </h1>
            <span class="section-number">02</span>
          </div>
          <h1 class="section-title">
            <!-- 在这里显示你的文章内容 -->
            <MdPreview
              :editorId="mid"
              :modelValue="content2"
              style="
                margin-top: 20px;
                box-shadow: 9px 9px 15px rgba(0, 0, 0, 0.1),
                  -9px -9px 15px rgba(255, 255, 255, 1);
                border-radius: 15px;
              "
            />
          </h1>
        </section>
        <div class="third-move section-margin"></div>
        <section
          class="third-section section-center"
          style="
            margin-top: 20px;
            box-shadow: 9px 9px 15px rgba(0, 0, 0, 0.1),
              -9px -9px 15px rgba(255, 255, 255, 1);
            border-radius: 15px;
          "
        >
          <div class="progress-wrapper progress-bar-wrapper-left">
            <div class="progress-bar"></div>
          </div>
          <div style="margin: 10px 0">
            <n-input
              placeholder="请输入型号"
              :style="{ width: '20%' }"
              clearable
              v-model:value="searchData"
            >
            </n-input>
            <n-button type="info" ghost @click="search"> 查询 </n-button>
          </div>
          <n-space vertical :size="12">
            <n-data-table
              :data="pumpList"
              :columns="cols"
              :single-line="false"
              size="small"
              :striped="true"
              :pagination="pagination"
            />
          </n-space>
        </section>
        <div class="section-margin"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base --------------------------------------------- */

.base {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #f4f5df;
}

.base-canvas {
  width: 100%;
  height: 100%;
}
/* Page Itself --------------------------------------------- */
.page {
  z-index: 99999;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.page-wrapper {
  position: relative;
}
/*  */
/* Sections -------------- */

.section-intro-wrapper {
  position: relative;
  padding: 20% 5%;
  border-bottom: 2px solid #1057b4;
  padding-bottom: 400px;
}

.section-detail-wrapper {
  position: relative;
  padding: 20% 5%;
}

.section-heading {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.8;
  margin-top: 64px;
  color: #000;
}

.section-text {
  line-height: 2;
  margin-top: 18px;
  font-size: 16px;
  color: #000;
}

/* Fancy Decoration Part of Section */
.section-title {
  position: relative;
  color: #1057b4;
}

.section-title-text {
  display: block;
  font-size: 40px;
  font-weight: 500;
  transform-origin: left;
  transform: skewY(25deg);
  z-index: 5;
  text-transform: uppercase;
  color: #1057b4;
}

.styleOne,
.styleTwo,
.styleThree {
  position: absolute;
  display: block;
  width: 100%;
  max-width: 278px;
  height: 60px;
  border: 1px solid #1057b4;
  transform-origin: left;
  transform: skewY(-25deg);
}

.styleOne {
  top: 0px;
}

.styleTwo {
  top: 80px;
}

.styleThree {
  top: 80px;
  transform: skewY(25deg);
  background-color: #1057b4;
}

.section-number {
  position: absolute;
  bottom: 15px;
  right: 0;
  color: #1057b4;
  font-size: 24px;
}
/* Section Formatting --------------------------------------------- */
.section-margin {
  height: 3000px;
  width: 100%;
}
.section {
  position: relative;
  width: 40%;
  padding: 400px 4% 150px;
  margin: 0;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  overflow: hidden;
}
.section-center {
  width: 80%;
  padding: 0 20px 20px;
  background-color: #fff;
  overflow: hidden;
  margin: 0 10%;
}

.left {
  margin-right: auto;
}

.right {
  margin-left: auto;
}
/* Hero section -------------------------------- */

.hero {
  width: 100vw;
  height: 100vh;
}

.hero-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 1100px;
}

.hero-main {
  position: absolute;
  bottom: 168px;
  left: 0;
  color: #000;
}

.hero-second {
  position: absolute;
  top: calc(50% - 120px);
  right: 0;
  color: #000;
}

.hero-main-title {
  font-size: 32px;
  color: #000;
  opacity: 0;
}

.hero-main-description {
  font-size: 12px;
  padding-top: 5px;
  color: #000;
  opacity: 0;
}

.hero-second-subheading {
  font-size: 32px;
  text-transform: uppercase;
  color: #000;
}
/* Progress bars */
.progress-wrapper {
  height: 0;
  width: 12px;
  z-index: 9999;
}

.progress-bar-wrapper-left {
  position: absolute;
  top: 0;
  left: 0;
}

.progress-bar-wrapper-right {
  position: absolute;
  top: 0;
  right: 0;
}

.progress-bar {
  height: 100vh;
  width: 100%;
  background-color: #1057b4;
  transform-origin: top center;
  transform: scaleY(1);
}

/* Preloader */
.preloader {
  background-color: #f3f4df;
  width: 100%;
  height: 100vh;
  position: fixed;
  opacity: 1;
  z-index: 999;
}

.preloader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 6px;
  background-color: #1057b4;
  animation: load 1s ease-in-out infinite;
}

.circle:nth-child(2) {
  animation-delay: 0.1s;
}

.circle:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes load {
  0% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(-12px);
  }

  40% {
    transform: translateY(0);
  }
}

.intro-text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  font-weight: 600;
  font-size: 20px;
  color: var(--color-text);
  transform: translate(-50%, -40%);
}

.arrow-svg-wrapper {
  position: absolute;
  top: 90%;
  left: 50%;
  opacity: 0;
  color: var(--color-text);
  transform: translate(-50%, -50%);
  animation: bounce 0.5s ease-in alternate infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(8px);
  }
}

/* 表格 */
:deep(.n-data-table) .n-data-table-th {
  background-color: #c6eafa;
  text-align: center;
  min-width: 60px;
}

:deep(.n-data-table) .n-data-table-td {
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  /* background-color: #3498db; */
}
</style>
