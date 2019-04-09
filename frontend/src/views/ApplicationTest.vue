<template @submit.prevent="onSubmit" @add-result="addResult(String($event))">
  <div>
    <h1>This is a test Application</h1>
    <appForm
      class="appForm"
      name="test"
      question="how do you do"
      questionType="long"
      :results="this.results"
    ></appForm>
    <Application
      class="Application"
      :requirements="this.requirements"
      :userId="this.userId"
      :posId="this.posId"
      :results="this.results"
    ></Application>
    <button v-on:click="onSubmit">
      <input type="submit" value="Submit" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Application from '@/components/Application.vue'
import appForm from '@/components/appForm.vue'
export default Vue.extend({
  components: {
    Application,
    appForm
  },
  data() {
    return {
      requirements: [
        {
          name: 'test',
          question: 'can you program in C?',
          questionType: 'short'
        },
        {
          name: 'longer',
          question: 'What was your greatest accomplishment ever?',
          questionType: 'long'
        },
        {
          name: 'scale',
          question: 'from 1-5 how much do you hate questions?',
          questionType: 'mult'
        },
        {
          name: 'otherlong',
          question: 'are these questions pointless? Why or why not',
          questionType: 'long'
        }
      ],
      userId: 'axsdf',
      posId: 'prog122314',
      results: new Array()
    }
  },
  methods: {
    onSubmit: function() {
      this.$emit('app-sumbitted')
    },
    addResult(result: String) {
      this.results.push(result)
    }
  }
})
</script>

<style lang="scss"></style>
