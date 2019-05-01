<template @submit.prevent="onSubmit" @add-result="addResult(String($event))">
  <div>
    <h1>This is a test Application</h1>
    <Application
      class="Application"
      :requirements="this.requirements"
      :userId="this.userId"
      :posId="this.posId"
      @onSubmit="onSubmit"
    ></Application>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Application from '@/components/Application.vue'
export default Vue.extend({
  components: {
    Application
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
      posId: 'prog122314'
    }
  },
  methods: {
    onSubmit: function(results: (string | null)[]) {
      alert('RESULTS!: ' + JSON.stringify(results))
      this.$emit('app-sumbitted', results)
    }
  }
})
</script>

<style lang="scss"></style>
