<template>
  <div>
    <h1>Add a new Job Listing</h1>
    <AddPositionForm></AddPositionForm>
    <PositionList></PositionList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AddPositionForm from '@/components/AddPositionForm.vue'
import PositionList from '@/components/PositionList.vue'
export default Vue.extend({
  components: {
    AddPositionForm,
    PositionList
  }
})
</script>
