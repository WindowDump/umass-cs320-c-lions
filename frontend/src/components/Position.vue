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
        <v-btn class="btn-apply" color="green">Delete</v-btn>
      </form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
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
  data: () => ({}),
  methods: {
    removepos: async function(event: Event) {
      const { data } = await Axios.delete('/positions/' + this.id)
    }
  }
})
</script>

<style lang="scss"></style>
