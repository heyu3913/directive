<template>
  <div>
    <!-- 其他内容 -->
    <div class="block">
      空白
    </div>
    <img v-lazy-load="lazyImageSrc" alt="Lazy Image">
  </div>
</template>

<script setup>
import {ref} from "vue";
const lazyImageSrc = ref('https://img1.baidu.com/it/u=1632607226,1185621596&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=728')
</script>
<style>
.block {
  height: 1000px;
}
</style>
