<template>
  <div>
    <center>
      <h1>List of Job Offers</h1>
    </center>
    <OfferList></OfferList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import OfferList from '@/components/OfferList.vue'
export default Vue.extend({
  components: {
    OfferList
  }
})
</script>
