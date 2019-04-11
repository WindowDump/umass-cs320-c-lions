<template>
  <div>
    <h1>Login</h1>
    <Login></Login>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Login from '@/components/Login.vue'
export default Vue.extend({
  components: {
    Login
  }
})
</script>
