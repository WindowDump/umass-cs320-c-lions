<template>
  <v-card>
    <v-card-title class="green darken-1">
      <h1 class=".display-2" style="color:white">{{ title }}</h1>
    </v-card-title>
    <v-card-text>
      <p>Posted: {{ postingDate }}</p>
      <p>Expires: {{ postingExpirationDate }}</p>
      <p>{{ description }}</p>
      <p>Pay: {{ payRange }}</p>
      <p>Job Type: {{ jobType }}</p>
      <p>Start Date: {{ startDate }}</p>
    </v-card-text>
    <v-card-actions>
      <form @submit="removepos" id="positionForm">
        <v-btn class="bt-submit" type="submit" color="green">Delete</v-btn>
      </form>
      <v-btn @click="passV()" color="blue">Edit</v-btn>
      <form @submit="editpos" id="positionForm">
        <v-btn class="bt-submit" type="submit" color="purple"
          >Apply One Click</v-btn
        >
      </form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
import { describe } from 'mocha'
export default Vue.extend({
  props: [
    'id',
    'title',
    'description',
    'payRange',
    'jobType',
    'startDate',
    'postingDate',
    'postingExpirationDate'
  ],
  data: () => ({
    user: (window as any).$user
  }),
  methods: {
    removepos: function(event: Event) {
      Axios.delete('/positions/' + this.id)
    },
    passV: function(event: Event) {
      let id = this.id
      let title = this.title
      let description = this.description
      let payRange = this.payRange
      let jobType = this.jobType
      let startDate = this.startDate
      let postingDate = this.postingDate
      let postingExpirationDate = this.postingExpirationDate

      this.$router.replace({
        name: 'editPosition',
        params: {
          id,
          title,
          description,
          payRange,
          jobType,
          startDate,
          postingExpirationDate
        }
      })
    },
    editpos: function(event: Event) {
      Axios.patch('/positions/' + this.id, {
        title: 'title',
        description: 'new description'
      })
    }
  }
})
</script>

<style lang="scss"></style>
