<template>
  <div>
    <input tyep="text" v-reg-rule="handleInput">
  </div>
</template>

<script setup>
import {ref} from "vue";
const handleInput = (value)=>{
  console.log('value',value)
}

</script>
