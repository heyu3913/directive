<template>
  <div v-resize="resize">
    <h1>Resize</h1>
    <p>Resize the window to see the effect.</p>
    <p>Window width: {{ windowWidth }}</p>
    <p>Window height: {{ windowHeight }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);
const resize=(size)=>{
  console.log('Window size changed:', size);
}

</script>
