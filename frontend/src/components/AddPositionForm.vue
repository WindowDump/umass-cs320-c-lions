<template>
  <form @submit="positionSubmit" id="positionForm">
    <label>
      Title:
      <input
        type="text"
        v-model="theTitle"
        placeholder="Enter position title..."
      />
    </label>
    <label>
      Description:
      <input
        type="text"
        v-model="theDesc"
        placeholder="Enter position description..."
      />
    </label>
    <label>
      Pay Range:
      <input
        type="text"
        v-model="theRange"
        placeholder="Enter position pay range..."
      />
    </label>
    <label>
      Position:
      <input
        type="text"
        v-model="theType"
        placeholder="Enter position type..."
      />
    </label>
    <label>
      Start Date:
      <input type="text" v-model="theStart" placeholder="Enter start date..." />
    </label>
    <label>
      Expiration:
      <input
        type="text"
        v-model="theExp"
        placeholder="Enter posting expiration date..."
      />
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { text } from 'body-parser'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    theTitle: '',
    theDesc: '',
    theRange: '',
    theType: '',
    theStart: '',
    theExp: ''
  }),

  methods: {
    positionSubmit: function(event: Event) {
      Axios.post('/positions', {
        title: this.theTitle,
        description: this.theDesc,
        payRange: this.theRange,
        jobType: this.theType,
        startDate: this.theStart,
        postingDate: new Date(),
        postingExpirationDate: this.theExp
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
