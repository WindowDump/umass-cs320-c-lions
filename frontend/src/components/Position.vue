<template>
  <div class="job">
    <span class="dateposted"
      >Posted: {{ postingDate }} <br />
      Expires: {{ postingExpirationDate }}</span
    >
    <div class="job-info">
      <div class="title">{{ title }}</div>
      <div class="position-heading">
        <p>{{ description }}</p>
      </div>
      <p>Pay: {{ payRange }}</p>
      <p>Job Type: {{ jobType }}</p>
      <p>Start Date: {{ startDate }}</p>
    </div>
    <form @submit="removepos" id="positionForm">
      <button class="btn-apply">Delete</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
export default Vue.extend({
  props: [
    'id',
    'title',
    'description',
    'payRange',
    'jobType',
    'startDate',
    'postingDate',
    'postingExpirationDate'
  ],
  data: () => ({}),
  methods: {
    removepos: async function(event: Event) {
      const { data } = await Axios.delete('/positions/' + this.id)
    }
  }
})
</script>

<style lang="scss">
.job {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: rgb(221, 240, 240);
  padding: 15px;
  width: 100%;
  position: relative;
  margin: 5px;
}
.job-info {
  flex: 1 1;
  padding-right: 10px;
}
.btn-apply {
  width: 100px;
  border-radius: 5px;
  border: none;
  background: green;
  color: #fff;
  font-size: 1rem;
  padding: 10px;
  cursor: pointer;
}
.btn-apply:hover,
.btn-apply:focus {
  background: rgb(5, 150, 5);
}
.btn-apply:focus {
  outline: none;
}
.btn-apply:active {
  transform: scale(0.97);
}
.title {
  font-size: 1.5em;
  padding-bottom: 10px;
}
.position-heading {
  padding-bottom: 5px;
}
.position {
  font-weight: bold;
  padding-bottom: 5px;
}
.dateposted {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
