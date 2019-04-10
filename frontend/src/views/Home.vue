<template>
  <div>
    <h1>Home</h1>
    <PositionList></PositionList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PositionList from '@/components/PositionList.vue'
export default Vue.extend({
  components: {
    PositionList
  }
})
</script>
