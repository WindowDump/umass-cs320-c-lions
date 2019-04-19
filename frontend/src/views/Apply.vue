<template>
  <div class="apply">
    <h1>Application Page</h1>
    <ApplyForm></ApplyForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ApplyForm from '@/components/ApplyForm.vue'
export default Vue.extend({
  components: {
    ApplyForm
  }
})
</script>
