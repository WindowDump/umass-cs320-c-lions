<template>
  <div>
    <input
      type="text"
      v-model="text"
      placeholder="enter name here"
      v-bind="message"
      @input="updateText($event)"
    />
    <button v-on:click="addcomp">Add Company</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { text } from 'body-parser'
import Axios from 'axios'

let message: String = ''

export default Vue.extend({
  data: () => ({}),
  methods: {
    addcomp: async function(event: Event) {
      const { data } = await Axios.post('/companies', { name: message })
    },
    updateText: function(event: Event) {
      message = event!.target.value
    }
  }
})
</script>
