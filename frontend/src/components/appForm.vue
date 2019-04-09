<template>
  <form class="appForm">
    <p v-if="isShort">
      <label for="result">{{ question }}:</label>
      <input id="result" v-model="result" placeholder="name" required />
    </p>

    <p v-if="isLong">
      <label for="result">{{ question }}:</label>
      <textarea id="result" v-model="result" required></textarea>
    </p>

    <p v-if="isMult">
      <label for="result">{{ question }}:</label>
      <select id="result" v-model.number="result" required>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['name', 'questionType', 'question', 'results'],
  data: function() {
    return {
      result: 'None'
    }
  },
  methods: {
    isShort: function() {
      return this.questionType == 'short'
    },
    isLong: function() {
      return this.questionType == 'long'
    },
    isMult: function() {
      return this.questionType == 'mult'
    },
    onSubmit: function() {
      this.results.push(this.result)
    }
  }
})
</script>
