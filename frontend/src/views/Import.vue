<template>
  <div>
    <center>
      <h1>Import position and employee data</h1>
    </center>
    <Import></Import>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Import from '@/components/Import.vue'
export default Vue.extend({
  components: {
    Import
  }
})
</script>
