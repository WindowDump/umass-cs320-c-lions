<template>
  <form @submit="positionSubmit" id="positionForm">
    <br /><label>
      Title:
      <input
        class="textbox"
        type="text"
        v-model="theTitle"
        placeholder="Enter position title..."
      /> </label
    ><br /><br />
    <label>
      Description:
      <input
        class="textbox"
        type="text"
        v-model="theDesc"
        placeholder="Enter position description..."
      /> </label
    ><br /><br />
    <label>
      Pay Range:
      <input
        class="textbox"
        type="text"
        v-model="theMin"
        placeholder="Enter position pay min..."
      />
      to
      <input
        class="textbox"
        type="text"
        v-model="theMax"
        placeholder="Enter position pay max..."
      /> </label
    ><br /><br />
    <label>
      Position type:
      <input
        class="textbox"
        type="text"
        v-model="theType"
        placeholder="Enter position type..."
      /> </label
    ><br /><br />
    <label>
      Start Date:
      <input
        class="textbox"
        type="text"
        v-model="theStart"
        placeholder="Enter start date..."
      /> </label
    ><br /><br />
    <label>
      Expiration:
      <input
        class="textbox"
        type="text"
        v-model="theExp"
        placeholder="Enter posting expiration date..."
      /> </label
    ><br /><br />
    <button class="bt-submit" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    theTitle: '',
    theDesc: '',
    theMin: '',
    theMax: '',
    theType: '',
    theStart: '',
    theExp: ''
  }),

  methods: {
    positionSubmit: function(event: Event) {
      let d = new Date()

      Axios.post('/positions', {
        title: this.theTitle,
        description: this.theDesc,
        payRange: this.theMin + '-' + this.theMax,
        jobType: this.theType,
        startDate: this.theStart,
        postingDate: d.getMonth() + '/' + d.getDay() + '/' + d.getFullYear(),
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

.textbox {
  border: 1px solid #888;
  background: #fff;
  width: 200px;
}

.bt-submit {
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
</style>
