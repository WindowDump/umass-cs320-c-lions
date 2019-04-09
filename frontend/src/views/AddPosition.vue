<template>
  <div>
    <h1>Add a new Position</h1>
    <AddPositionForm></AddPositionForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AddPositionForm from '@/components/AddPositionForm.vue'
export default Vue.extend({
  components: {
    AddPositionForm
  }
})
</script>
