<template>
  <form class="Application" @submit.prevent="onSubmit">
    <div v-for="requirement in this.requirements" :key="requirement.name">
      <appForm
        :name="requirement.name"
        :question="requirement.question"
        :questionType="requirement.questionType"
        :results="this.results"
        @app-submitted="onSubmit"
      ></appForm>
    </div>
    <p>
      <input type="submit" value="Submit" />
    </p>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import appForm from '@/components/appForm.vue' // @ is an alias to /src
import Axios from 'axios'
import { application } from 'express'

export default Vue.extend({
  props: ['requirements', 'userId', 'posId', 'results'],
  data: function() {
    return {
      application: {
        results: this.results,
        userId: this.userId,
        posId: this.posId
      }
    }
  },
  methods: {
    onSubmit: function() {
      this.$emit('app-sumbitted', this.results)
      this.$services.application.create(application)
    }
  }
})
</script>
