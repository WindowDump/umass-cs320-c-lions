<template>
  <v-card class="pos">
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
      <v-btn @click="removepos()" class="bt-submit" type="submit" color="red">
        Delete
      </v-btn>
      <v-btn @click="passV()" color="blue">
        Edit
      </v-btn>
      <v-btn
        v-if="!applied && !forceApplication"
        @click="apply()"
        class="bt-submit"
        type="submit"
        color="green"
      >
        Apply
      </v-btn>
      <v-btn
        v-if="applied || forceApplication"
        disabled
        class="bt-submit"
        type="submit"
        color="green"
      >
        Applied
      </v-btn>
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
    'postingExpirationDate',
    'applied'
  ],
  data: () => ({
    user: (window as any).$user,
    forceApplication: false
  }),
  methods: {
    async removepos() {
      await Axios.delete('/positions/' + this.id)
    },
    async passV() {
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
    async apply() {
      console.log(this.id)
      await Axios.patch('/positions/' + this.id, {
        applyToPosition: true
      })
      this.user.appliedPositionIds.push(this.id)
      this.forceApplication = true
    }
  }
})
</script>

<style lang="scss">
.pos {
  float: left;
  margin: 15px;
  width: 350px;
  height: 375px;
}
</style>
