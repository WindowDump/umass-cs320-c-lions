<template>
  <div class="positionlist">
    <Position
      v-for="pos in poslist"
      v-bind:key="pos._id"
      v-bind:id="pos._id"
      v-bind:companyId="pos.companyId"
      v-bind:title="pos.title"
      v-bind:description="pos.description"
      v-bind:payRange="pos.payRange"
      v-bind:jobType="pos.jobType"
      v-bind:startDate="pos.startDate"
      v-bind:postingDate="pos.postingDate"
      v-bind:postingExpirationDate="pos.postingExpirationDate"
      v-bind:applied="applications.includes(pos._id)"
      @onRemove="onRemove(pos._id)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Position from '@/components/Position.vue'
import Axios from 'axios'
export default Vue.extend({
  data() {
    return {
      poslist: [],
      applications: []
    }
  },
  async mounted() {
    const { data } = await Axios.get('/positions')
    this.poslist = data.filter((x: any) => !x.hiredUserId)
    this.applications = (window as any).$user.appliedPositionIds
  },
  components: {
    Position
  },
  methods: {
    onRemove(id: string) {
      this.poslist = this.poslist.filter((x: any) => x._id !== id)
    }
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
