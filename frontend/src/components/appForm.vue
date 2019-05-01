<template>
  <form class="appForm">
    <p v-if="isShort">
      <label for="result">{{ question }}:</label>
      <input
        id="result"
        v-model="result"
        placeholder="answer here"
        required
        @input="updateValue()"
      />
    </p>

    <p v-else-if="isLong">
      <label for="result">{{ question }}:</label>
      <textarea
        id="result"
        v-model="result"
        required
        @input="updateValue()"
      ></textarea>
    </p>

    <p v-else>
      <label for="result">{{ question }}:</label>
      <select
        id="result"
        v-model.number="result"
        required
        @change="updateValue()"
      >
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
  props: ['name', 'questionType', 'question', 'index'],
  data() {
    return {
      result: ''
    }
  },
  methods: {
    isShort() {
      console.log('SUBMIT FN:', this.updateValue)
      return this.questionType == 'short'
    },
    isLong() {
      console.log('SUBMIT FN:', this.updateValue)
      return this.questionType == 'long'
    },
    isMult() {
      console.log('SUBMIT FN:', this.updateValue)
      return this.questionType == 'mult'
    },
    updateValue() {
      console.log('VALUE CHANGED', this.index, this.result)
      this.$emit('updateValue', this.index, this.result)
    }
  }
})
</script>

<style>
.appForm {
  display: flex;
  justify-content: right;
  align-items: flex-end;
  background: rgb(221, 240, 240);
  padding: 15px;
  width: 100%;
  position: relative;
  margin: 5px;
}
</style>
