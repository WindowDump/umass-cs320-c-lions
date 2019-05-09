<template>
  <div id="app">
    <!-- <v-app id="inspire"> -->
    <v-container>
      <v-form ref="form" @submit.prevent="hireApplicant" lazy-validation>
        <v-layout row wrap>
          <h2 v-if="parentId">
            <v-flex xs12>
              Selected {{ parentName }}
              <v-flex xs12>
                <v-select
                  v-model="applicant"
                  :items="items"
                  label="Select a position type..."
                  outline
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-btn class="bt-submit" type="submit" color="success"
                  >Submit</v-btn
                >
              </v-flex>
            </v-flex>
          </h2>
        </v-layout>
      </v-form>
    </v-container>
    <!-- </v-app> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    applicant: '',
    userNames: []
  }),
  props: ['parentId', 'parentName', 'items', 'users', 'userMap'],
  methods: {
    hireApplicant: async function(event: Event) {
      console.log(this.userMap)
      await Axios.patch('/positions/' + this.parentId, {
        acceptEmployee: this.userMap[this.applicant]
      })
    }
  }
})
</script>
