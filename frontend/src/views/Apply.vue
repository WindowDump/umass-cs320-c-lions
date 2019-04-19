<template>
  <div class="apply">
    <h1>Application Page</h1>
    <appForm></appForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import appForm from '@/components/appForm.vue'
export default Vue.extend({
  components: {
    appForm
  }
})
</script>
