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
          <v-layout row style="text-align: center">
            <h2 v-if="parentId" style="width: 100%">
              Appending a position under {{ parentName }}
              <v-btn flat icon color="red lighten-2" @click="parentId = ''">
                <v-icon>clear</v-icon>
              </v-btn>
            </h2>
            <h2 v-if="!parentId" style="width: 100%">
              Appending a top-level position
            </h2>
          </v-layout>
          <br />
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

            <v-flex xs6>
              <v-card-text>Pay Range:</v-card-text>
            </v-flex>

            <v-flex shrink style="width: 60px; margin-right: 20px">
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

            <v-flex>
              <v-range-slider
                v-model="theRange"
                :max="600"
                :min="0"
                :step="10"
                required
              ></v-range-slider>
            </v-flex>

            <v-flex shrink style="width: 60px; margin-left: 20px">
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
  props: ['parentId', 'parentName'],
  data: () => ({
    theTitle: '',
    theDesc: '',
    theRange: [0, 600],
    theType: '',
    theStart: new Date().toISOString().substr(0, 10),
    theExp: new Date().toISOString().substr(0, 10),
    items: ['Internship', 'Part-time', 'Full-time'],
    menu: null,
    menu2: null,
    valid: false,
    titleRules: [(v: String) => !!v || 'Title is required'],
    descRules: [(v: String) => !!v || 'Description is required'],
    typeRules: [(v: String) => !!v || 'Position type is required'],
    startRules: [(v: String) => !!v || 'Start date is required'],
    expRules: [(v: String) => !!v || 'Expiration date is required']
  }),

  methods: {
    positionSubmit: async function(event: Event) {
      console.log('PID', this.parentId)
      if ((this.$refs.form as any).validate()) {
        await Axios.post('/positions', {
          title: this.theTitle,
          description: this.theDesc,
          payRange: '$' + this.theRange[0] + '-$' + this.theRange[1],
          jobType: this.theType,
          startDate: this.theStart,
          postingDate: new Date().toISOString().substr(0, 10),
          postingExpirationDate: this.theExp,
          parentPositionId: this.parentId
        })

        alert('A new position has been added!')
        window.location.href = window.location.href + ''
      } else {
        alert('Some fields are not filled out correctly. Unable to submit.')
      }
    }
  }
})
</script>
