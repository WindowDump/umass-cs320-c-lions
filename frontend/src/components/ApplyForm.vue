<template>
  <div id="app" class="fields">
    <v-app id="inspire">
      <v-container>
        <v-layout justify-center>
          <v-form
            ref="form"
            @submit="applySubmit"
            v-model="valid"
            lazy-validation
          >
            <v-flex align-self: center>
              <label>First Name:</label>
              <v-text-field
                v-model="theFirstName"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <label>Last Name:</label>
              <v-text-field
                v-model="theLastName"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <label>Enter your Email Address:</label>
              <v-text-field
                v-model="theEmail"
                label="Type here..."
                box
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-btn class="bt-submit" type="submit" color="success"
                >Submit</v-btn
              >
            </v-flex>
          </v-form>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['name', 'questionType', 'question', 'results'],
  data() {
    return {
      result: ''
    }
  },
  methods: {
    applySubmit: function(event: Event) {
      alert('Thank you for applying!')
    }
  }
})
</script>

<style>
.ApplyForm {
  display: flex;
  justify-content: right;
  align-items: flex-end;
  background: rgb(221, 240, 240);
  padding: 15px;
  width: 100%;
  position: relative;
  margin: 5px;
}

.fields {
  align-items: center;
  width: 100%;
}
</style>
