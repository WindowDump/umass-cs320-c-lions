<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <div row v-for="(question, i) in questions" v-bind:key="question">
          <p>Question: {{ question }}</p>
          <v-text-field label="Answer" v-model="answers[i]" box></v-text-field>
        </div>
        <center>
          <v-btn @click="onboarding_complete" color="green">Submit</v-btn>
        </center>
      </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    questions: [],
    answers: []
  }),
  async mounted() {
    const { companyId } = (await Axios.get(
      '/positions/' + this.$route.params.id
    )).data
    const { data } = await Axios.get('/companies/' + companyId)
    this.questions = data.questions || ['a', 'b', 'c']
  },
  methods: {
    async onboarding_complete() {
      await Axios.patch('/positions/' + this.$route.params.id, {
        acceptPosition: true,
        qa: this.questions.map((q, i) => ({
          question: q,
          answer: this.answers[i]
        }))
      })
      this.$router.push({ name: 'orgchart' })
    }
  }
})
</script>
