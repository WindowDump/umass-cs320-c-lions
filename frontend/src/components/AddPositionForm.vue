<template>
  <div id="app">
    <v-app id="inspire">
      <v-form @submit="positionSubmit" id="positionForm">
        <v-container>
          <v-layout column left>
            <v-flex xs12 md4 row>
              <label>Title:</label>
              <v-text-field
                v-model="theTitle"
                label="Enter position title..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
              <label>Description:</label>
              <v-text-field
                v-model="theDesc"
                label="Enter position description..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <label>Pay Range:</label>
            </v-flex>

            <v-flex shrink style="width: 60px">
              <v-text-field
                v-model="theRange[0]"
                hide-details
                single-line
                :min="0"
                :max="600"
                type="number"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-range-slider
                v-model="theRange"
                :max="600"
                :min="0"
                :step="10"
              ></v-range-slider>
            </v-flex>

            <v-flex shrink style="width: 60px">
              <v-text-field
                v-model="theRange[1]"
                hide-details
                single-line
                :min="0"
                :max="600"
                type="number"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <label>Position type:</label>
              <v-select
                v-model="theType"
                :items="items"
                label="Select a position type..."
                outline
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6 md4>
              <label>Position start date:</label>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="theStart"
                    label="Choose a start date..."
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="theStart"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12 sm6 md4>
              <label>Position expiration date:</label>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="theExp"
                    label="Choose an expiration date..."
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="theExp"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex>
              <v-btn class="bt-submit" type="submit" color="success"
                >Submit</v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    theTitle: '',
    theDesc: '',
    theRange: [0, 600],
    theType: '',
    theStart: new Date().toISOString().substr(0, 10),
    theExp: new Date().toISOString().substr(0, 10),
    items: ['Internship', 'Part-time', 'Full-time'],
    menu: null,
    menu2: null
  }),

  methods: {
    positionSubmit: function(event: Event) {
      Axios.post('/positions', {
        title: this.theTitle,
        description: this.theDesc,
        payRange: this.theRange,
        jobType: this.theType,
        startDate: this.theStart,
        postingDate: new Date().toISOString().substr(0, 10),
        postingExpirationDate: this.theExp
      })

      alert('A new position has been added!')
    }
  }
})
</script>
