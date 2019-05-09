<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-layout row wrap v-for="question in questions" v-bind:key="question">
          <span>Question: {{ question }}</span>
          <v-text-field label="Answer" v-model="answer" box></v-text-field>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    questions: ['a', 'b', 'c'],
    answers: []
  }),
  methods: {
    async onboarding_complete() {
      await Axios.patch('/positions/' + this.$route.params.id, {
        acceptPosition: true,
        qa: this.questions.map((q, i) => ({
          question: q,
          answer: this.answers[i]
        }))
      })
    }
  }
})
</script>
