<template>
  <div>
    <input v-model="inputValue" v-debounce="handleInput" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');


const handleInput = {
  event: 'input',
  fn (event) {
    console.log('Debounced Input:', event.target.value);
  },
  delay: 500
}
</script>
