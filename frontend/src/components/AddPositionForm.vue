<template>
  <div class="form">
    <div class="form-info">
      <p class="title"></p>
      <div>Title:</div>
      <input
        class="tText"
        type="text"
        v-model="titleText"
        placeholder="Enter position title..."
        v-bind="theTitle"
      />
      <p />
      <p class="desc"></p>
      <div>Description:</div>
      <input
        type="text"
        v-model="descText"
        placeholder="Enter position description..."
        v-bind="theDesc"
      />
      <p />
      <p class="range"></p>
      <div>Pay Range:</div>
      <input
        type="text"
        v-model="rangeText"
        placeholder="Enter position pay range..."
        v-bind="theRange"
      />
      <p />
      <p class="type"></p>
      <div>Type:</div>
      <input
        type="text"
        v-model="typeText"
        placeholder="Enter position type..."
        v-bind="theType"
      />
      <p />
      <p class="start"></p>
      <div>Start Date:</div>
      <input
        type="text"
        v-model="startText"
        placeholder="Enter start date..."
        v-bind="theStart"
      />
      <p />
      <p class="exp"></p>
      <div>Posting Expiration Date:</div>
      <input
        type="text"
        v-model="expText"
        placeholder="Enter posting expiration date..."
        v-bind="theExp"
      />
      <p />
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
  data: () => ({
    theTitle: '',
    theDesc: '',
    theRange: '',
    theType: '',
    theStart: '',
    theExp: '',
    titleText: '',
    descText: '',
    rangeText: '',
    typeText: '',
    startText: '',
    expText: ''
  }),

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
