<template>
  <div>
    <h1>This is the companies page</h1>
    <CompanyList></CompanyList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CompanyList from '@/components/CompanyList.vue'
export default Vue.extend({
  components: {
    CompanyList
  }
})
</script>
