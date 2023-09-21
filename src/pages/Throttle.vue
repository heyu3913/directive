<template>
  <div>
    <h1>Throttle</h1>
    <p>Welcome to the Throttle!</p>
    <button v-throttle="handleTest">测试</button>
  </div>
</template>

<script setup>
  const handleTest = {
    event: 'click',
    fn (event) {
      console.log('Throttled Click:', event.target);
    },
    delay: 1000
  }
</script>

<style scoped>

</style>
