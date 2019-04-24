<template>
  <div>
    <h1>OrgChart</h1>
    <OrgChart></OrgChart>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import OrgChart from '@/components/OrgChart.vue'
export default Vue.extend({
  components: {
    OrgChart
  }
})
</script>
