<template>
  <div class="companylist">
    <Company
      v-for="com in comlist"
      v-bind:key="com.id"
      v-bind:name="com.name"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Company from '@/components/Company.vue' // @ is an alias to /src
import Axios from 'axios'
export default Vue.extend({
  data() {
    return {
      joblist: null
    }
  },
  async mounted() {
    const { data } = await Axios.get('/companies')
    // console.log(data)
    // debugger
    this.joblist = data
  },
  components: {
    Company
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
