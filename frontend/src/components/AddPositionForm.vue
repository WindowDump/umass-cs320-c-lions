<template>
  <div class="form">
    <div class="form-info">
      <div class="title">
        <div>Title:</div>
        <input
          type="text"
          v-model="text"
          placeholder="Enter position title here..."
          v-bind="theTitle"
        />
      </div>
      <div class="desc">
        <div>Description:</div>
        <input
          type="text"
          v-model="text"
          placeholder="Enter position description here..."
          v-bind="theDesc"
        />
      </div>
      <div class="range">
        <div>Pay Range:</div>
        <input
          type="text"
          v-model="text"
          placeholder="Enter position pay range here..."
          v-bind="theRange"
        />
      </div>
      <div class="type">
        <div>Type:</div>
        <input
          type="text"
          v-model="text"
          placeholder="Enter position type here..."
          v-bind="theType"
        />
      </div>
      <div class="start">
        <div>Start Date:</div>
        <input
          type="text"
          v-model="text"
          placeholder="Enter start date here..."
          v-bind="theStart"
        />
      </div>
      <div class="exp">
        <div>Posting Expiration Date:</div>
        <input
          type="text"
          v-model="text"
          placeholder="Enter posting expiration date here"
          v-bind="theExp"
        />
      </div>
      <button class="btn-apply" v-on:click="post">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { text } from 'body-parser'
import Axios from 'axios'

let theTitle: String = ''
let theDesc: String = ''
let theRange: String = ''
let theType: String = ''
let theStart: String = ''
let theExp: String = ''

export default Vue.extend({
  data: () => ({}),

  methods: {
    post: async function(event: Event) {
      const { data } = await Axios.post('http://localhost:3030/positions', {
        title: theTitle,
        description: theDesc,
        payRange: theRange,
        jobType: theType,
        startDate: theStart,
        postingDate: new Date(),
        postingExpirationDate: theExp
      })

      alert('A new position has been added!')
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
