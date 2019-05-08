<template>
  <div>
    <h1>Edit an existing Job Listing</h1>
    <EditPositionForm></EditPositionForm>
    <PositionList></PositionList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditPositionForm from '@/components/EditPositionForm.vue'
import PositionList from '@/components/PositionList.vue'
export default Vue.extend({
  components: {
    EditPositionForm,
    PositionList
  }
})
</script>
