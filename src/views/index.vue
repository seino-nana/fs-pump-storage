<script setup>
import { ref, onMounted } from "vue";
import { MdEditor } from "md-editor-v3";
import {
  addArticle,
} from "@/api/pump.js";
import "md-editor-v3/lib/style.css";

// 导入路由
import { useRouter } from "vue-router";
const router = useRouter();
const article = ref({
  title: "",
  content: "",
});
onMounted(() => {});

// const handleSuccess = (file) => {
//   article.value.imgUrl = file;
//   console.log(file);
// };
// const beforeUpload = (file) => {};
const submit = () => {
    // console.log(article.value);
    addArticle(article.value).then((res) => {
      console.log(res);
    });
}
</script>

<template>
  <div class="addArticle">
    <n-input v-model:value="article.title" type="text" placeholder="请输入标题" />
    <MdEditor v-model="article.content" style="height: 600px;" />
    <div style="text-align:center;margin-top:30px">
      <n-button type="primary" @click="submit"> 发布 </n-button>
    </div>
  </div>
</template>

<style scoped>
</style>
