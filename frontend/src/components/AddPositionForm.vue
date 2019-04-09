<template>
  <div class="form">
    <div class="form-info">
      <div class="title">
        <div>Title:</div>
        <div>This should be a text box</div>
      </div>
      <div class="desc">
        <div>Description:</div>
        <div>This should be a text box</div>
      </div>
      <div class="range">
        <div>Pay Range:</div>
        <div>This should be a text box</div>
      </div>
      <div class="type">
        <div>Type:</div>
        <div>This should be a text box</div>
      </div>
      <div class="start">
        <div>Start Date:</div>
        <div>This should be a text box</div>
      </div>
      <div class="exp">
        <div>Posting Expiration Date:</div>
        <div>This should be a text box</div>
      </div>
      <button class="btn-apply" v-on:click="post">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
export default Vue.extend({
  props: ['title', 'desc', 'company', 'location', 'dateposted'],
  methods: {
    post: function async() {
      Axios.post('http://localhost:3030/positions', {
        title: 'CEO',
        description: 'Runs the company',
        payRange: 1000000,
        jobType: 'full-time',
        startDate: new Date(),
        postingDate: new Date(),
        postingExpirationDate: new Date()
      })
    }
  }
})
</script>

<style lang="scss">
.form {
  display: flex;
  justify-content: flex;
  align-items: flex;
  background: rgb(221, 240, 240);
  padding: 15px;
  width: 100%;

  margin: 5px;
}

.form-info {
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
  flex-direction: row;
}
</style>
