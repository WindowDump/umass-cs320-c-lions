<template>
  <div>
    <h1>Home</h1>
    <Jobs></Jobs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Jobs from "@/components/Jobs.vue";
export default Vue.extend({
  components: {
    Jobs
  }
});
</script>
