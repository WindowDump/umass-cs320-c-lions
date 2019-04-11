<template>
  <div class="positionlist">
    <p>showing page {{ cur_page }}</p>
    <div v-for="pos in poslist" v-bind:key="pos">
      <Position
        v-bind:id="pos._id"
        v-bind:title="pos.title"
        v-bind:description="pos.description"
        v-bind:payRange="pos.payRange"
        v-bind:jobType="pos.jobType"
        v-bind:startDate="pos.startDate"
        v-bind:postingDate="pos.postingDate"
        v-bind:postingExpirationDate="pos.postingExpirationDate"
      />
      <br />
    </div>
    <v-pagination
      length="10"
      color="green darken-1"
      v-model="cur_page"
      @input="getPage"
    >
    </v-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Position from '@/components/Position.vue'
import Axios from 'axios'
export default Vue.extend({
  data() {
    return {
      cur_page: 1,
      poslist: null
    }
  },
  async mounted() {
    const { data } = await Axios.get('/positions')
    this.poslist = data
  },
  components: {
    Position
  },
  methods: {
    getPage: function(page: Number) {
      //alert(page)
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
