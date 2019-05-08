<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-form
          ref="form"
          @submit.prevent="positionSubmit"
          v-model="valid"
          lazy-validation
        >
          <v-layout row wrap>
            <v-flex xs6>
              <v-card-text>Title:</v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="theTitle"
                :rules="titleRules"
                label="Enter position title..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs6>
              <label>Description:</label>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="theDesc"
                :rules="descRules"
                label="Enter position description..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs3>
              <v-card-text>Pay Range:</v-card-text>
            </v-flex>

            <v-flex shrink style="width: 60px" xs3>
              <v-text-field
                v-model="theRange[0]"
                hide-details
                single-line
                :min="0"
                :max="600"
                type="number"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs3>
              <v-range-slider
                v-model="theRange"
                :max="600"
                :min="0"
                :step="10"
                required
              ></v-range-slider>
            </v-flex>

            <v-flex shrink style="width: 60px" xs3>
              <v-text-field
                v-model="theRange[1]"
                hide-details
                single-line
                :min="0"
                :max="600"
                type="number"
              ></v-text-field>
            </v-flex>

            <v-flex xs6>
              <label>Position type:</label>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="theType"
                :items="items"
                :rules="typeRules"
                label="Select a position type..."
                outline
                required
              ></v-select>
            </v-flex>

            <v-flex xs6>
              <label>Position start date:</label>
            </v-flex>
            <v-flex xs6>
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
                    :rules="startRules"
                    label="Choose a start date..."
                    prepend-icon="event"
                    readonly
                    required
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="theStart"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs6>
              <label>Position expiration date:</label>
            </v-flex>
            <v-flex xs6>
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
                    :rules="expRules"
                    label="Choose an expiration date..."
                    prepend-icon="event"
                    readonly
                    required
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="theExp"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12>
              <v-btn class="bt-submit" type="submit" color="success"
                >Submit</v-btn
              >
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-app>
  </div>
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
  data: function() {
    return {
      theTitle: this.$route.params.title,
      theDesc: this.$route.params.description,
      // need to re-enter payrange everytime - POTENTIAL BUG
      theRange: [0, 600],
      theType: this.$route.params.jobType,
      theStart: this.$route.params.startDate,
      theExp: this.$route.params.postingExpirationDate,
      items: ['Internship', 'Part-time', 'Full-time'],
      menu: null,
      menu2: null,
      valid: false,
      titleRules: [(v: String) => !!v || 'Title is required'],
      descRules: [(v: String) => !!v || 'Description is required'],
      typeRules: [(v: String) => !!v || 'Position type is required'],
      startRules: [(v: String) => !!v || 'Start date is required'],
      expRules: [(v: String) => !!v || 'Expiration date is required']
    }
  },

  methods: {
    positionSubmit: function(event: Event) {
      Axios.patch('/positions/' + this.$route.params.id, {
        title: this.theTitle,
        description: this.theDesc,
        payRange: this.theRange,
        jobType: this.theType,
        startDate: this.theStart,
        postingExpirationDate: this.theExp
      })
      alert('You have edited the position')
      this.$router.push({ name: 'home' })
    }
  }
})
</script>
