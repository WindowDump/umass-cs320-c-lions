<template>
  <h1>
    TEST APPLICATION
    <form @submit.prevent="submit()">
      <div
        v-for="(requirement, index) in this.requirements"
        :key="requirement.name"
      >
        <appForm
          class="appForm"
          :name="requirement.name"
          :question="requirement.question"
          :questionType="requirement.questionType"
          :index="index"
          @updateValue="setResultAtIndex"
        ></appForm>
      </div>
      <button>
        <input type="submit" />
      </button>
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
  components: {
    appForm
  },
  props: ['requirements', 'userId', 'posId', 'onSubmit'],
  data() {
    return {
      application: {
        results: [] as string[],
        userId: this.userId,
        posId: this.posId
      }
    }
  },
  methods: {
    setResultAtIndex: function(index: number, result: string) {
      console.log(`CALLING LAMBDA AT INDEX ${index}: RESULT IS ${result}`)
      this.application.results[index] = result
    },
    submit: function() {
      console.log('SUBMITTING FROM WITHIN APPLICATION.VUE')
      this.$emit('onSubmit', this.application.results)
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
