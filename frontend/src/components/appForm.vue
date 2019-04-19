<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-layout column left>
          <v-form
            ref="form"
            @submit="applySubmit"
            v-model="valid"
            lazy-validation
          >
            <v-flex>
              <label>First Name:</label>
              <v-text-field
                v-model="theFirstName"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <label>Last Name:</label>
              <v-text-field
                v-model="theLastName"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <label>Enter your Email Address:</label>
              <v-text-field
                v-model="theEmail"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-btn class="bt-submit" type="submit" color="success"
                >Submit</v-btn
              >
            </v-flex>
          </v-form>
        </v-layout>
      </v-container>
    </v-app>
  </div>

  <!-- <form class="appForm" @app-submitted="onSubmit">
    <p v-if="isShort">
      <label for="result">{{ question }}:</label>
      <input id="result" v-model="result" placeholder="answer here" required />
    </p>

    <p v-else-if="isLong">
      <label for="result">{{ question }}:</label>
      <textarea id="result" v-model="result" required></textarea>
    </p>

    <p v-else>
      <label for="result">{{ question }}:</label>
      <select id="result" v-model.number="result" required>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
  </form> -->
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['name', 'questionType', 'question', 'results'],
  data() {
    return {
      result: ''
    }
  },
  methods: {
    applySubmit: function(event: Event) {
      alert('Thank you for applying!')
    }
    // isShort() {
    //   return this.questionType == 'short'
    // },
    // isLong() {
    //   return this.questionType == 'long'
    // },
    // isMult() {
    //   return this.questionType == 'mult'
    // },
    // onSubmit() {
    //   this.$emit('add-result', String(this.result))
    // }
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
