<template>
  <div id="app" class="fields">
    <v-app id="inspire">
      <v-container>
        <v-form
          ref="form"
          @submit="applySubmit"
          v-model="valid"
          lazy-validation
        >
          <v-layout row wrap>
            <!-- field for first name -->
            <v-flex xs4>
              <v-card-text id="statictext" class="text-xs-right"
                >First Name:</v-card-text
              >
            </v-flex>

            <v-flex xs4>
              <v-text-field
                v-model="theFirstName"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs4> </v-flex>

            <!-- field for last name -->
            <v-flex xs4>
              <v-card-text id="statictext" class="text-xs-right"
                >Last Name:</v-card-text
              >
            </v-flex>

            <v-flex xs4>
              <v-text-field
                v-model="theLastName"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs4> </v-flex>

            <!-- field for email address -->
            <v-flex xs4>
              <v-card-text id="statictext" class="text-xs-right"
                >Email Address:</v-card-text
              >
            </v-flex>

            <v-flex xs4>
              <v-text-field
                v-model="theEmail"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs4> </v-flex>

            <!-- button formatting -->
            <v-flex>
              <div class="text-xs-center">
                <v-btn class="bt-submit" type="submit" color="success"
                  >Submit</v-btn
                >
              </div>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    theFirstName: '',
    theLastName: '',
    theEmail: ''
  }),
  methods: {
    applySubmit: function(event: Event) {
      alert('Thank you for applying!')
    }
  }
})
</script>

<style>
/* .ApplyForm {
  display: flex;
  justify-content: right;
  align-items: flex-end;
  background: rgb(221, 240, 240);
  padding: 15px;
  width: 100%;
  position: relative;
  margin: 5px;
}

#statictext {
  color: rgb(65, 60, 60);
}

#app {
  background-color: #33d671;
}

#inspire {
  background-color: #42f486;
  border-radius: 25px;
  width: 45%;
  margin: auto;
  height: auto;
} */
</style>
