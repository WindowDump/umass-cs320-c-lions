<template>
  <div class="jobs">
    <Job
      v-for="job in joblist"
      v-bind:key="job.id"
      v-bind:title="job.title"
      v-bind:desc="job.desc"
      v-bind:location="job.location"
      v-bind:company="job.company"
      v-bind:dateposted="job.dateposted"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Job from '@/components/Job.vue' // @ is an alias to /src
import Axios from 'axios'
export default Vue.extend({
  data() {
    return {
      joblist: [
        {
          title: 'Chef',
          desc: "We're looking for someone really good at making soup.",
          company: 'Magic Soups',
          location: 'Westville',
          dateposted: '2/24/19'
        },
        {
          title: 'Bridge Builder',
          desc: "Uh, we're building bridges. Halp.",
          company: 'Bwidges',
          location: 'Oakland',
          dateposted: '2/4/19'
        },
        {
          title: 'Astronaut',
          desc: 'Top secret missions in deep space. Ae you ready?',
          company: 'Shhpace',
          location: 'Decker',
          dateposted: '1/27/19'
        },
        {
          title: 'Fisherman',
          desc: "Catchin' fish.  Not afraid of sharks? Apply now!",
          company: "Joe's Fishing Crew",
          location: 'Duckston',
          dateposted: '1/17/19'
        }
      ]
    }
  },
  components: {
    Job
  },
  async mounted() {
    const { data } = await Axios.get('/positions')
    console.log(data)
    // debugger
    this.joblist = data
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
