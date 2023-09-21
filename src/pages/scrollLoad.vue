<template>
  <div v-scroll-load="loadMore"
       style="overflow: auto; height: 200px;
        border: 1px solid #ccc;">
    <ul style="height: 500px">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])


const loadMore = {
  fn() {
    // 模拟加载更多数据
    for (let i = 0; i < 10; i++) {
      items.value.push('Item ' + (items.value.length + 1));
    }
  },
  distance: 100
}
</script>
