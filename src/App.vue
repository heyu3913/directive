<template>
  <div>
    <RouterView/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()
    const router = useRouter()

    return {
      route,
      router,
    }
  },
})
</script>
