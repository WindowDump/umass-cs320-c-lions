<template>
  <h1>
    TEST APPLICATION
    <form @submit.prevent="onSubmit">
      <div v-for="requirement in this.requirements" :key="requirement.name">
        <appForm
          class="appForm"
          :name="requirement.name"
          :question="requirement.question"
          :questionType="requirement.questionType"
          :results="this.results"
          @app-submitted="onSubmit"
        ></appForm>
      </div>
    </form>
  </h1>
</template>

<script lang="ts">
import Vue from 'vue'
import appForm from '@/components/appForm.vue' // @ is an alias to /src
import Axios from 'axios'
import { application } from 'express'
import { create } from 'domain'

export default Vue.extend({
  props: ['requirements', 'userId', 'posId', 'results'],
  data() {
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
    }
  }
})
</script>
<style lang="scss">
.Application {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: rgb(221, 240, 240);
  padding: 15px;
  width: 100%;
  position: relative;
  margin: 5px;
}
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
