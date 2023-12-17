<script setup>
import {ref,onMounted} from 'vue'
import Base from './Base/Base'

onMounted(()=> {
  new Base(document.querySelector(".base-canvas")) // 实例化canvas
})
</script>

<template>
  <div class="base">
    <canvas class="base-canvas"></canvas>
  </div>
</template>

<style scoped>
.base{
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.base-canvas{
  width: 100%;
  height: 100%;
}
</style>
