<template>
  <div class="positionlist">
    <Position
      v-for="pos in poslist"
      v-bind:key="pos.id"
      v-bind:id="pos._id"
      v-bind:title="pos.title"
      v-bind:description="pos.description"
      v-bind:payRange="pos.payRange"
      v-bind:jobType="pos.jobType"
      v-bind:startDate="pos.startDate"
      v-bind:postingDate="pos.postingDate"
      v-bind:postingExpirationDate="pos.postingExpirationDate"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Position from '@/components/Position.vue' // @ is an alias to /src
import Axios from 'axios'
export default Vue.extend({
  data() {
    return {
      poslist: null
    }
  },
  async mounted() {
    const { data } = await Axios.get('/positions')
    this.poslist = data
  },
  components: {
    Position
  }
})
</script>

<style lang="scss">
.jobs {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
