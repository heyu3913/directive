<template>
  <div>
    <button v-permission="'view'">View Button</button>
    <button v-permission="'edit'">Edit Button</button>
    <button v-permission="'delete'">Delete Button</button>
  </div>
</template>

<script>
export default {
  name: "Permission"
}
</script>

<style scoped>

</style>
