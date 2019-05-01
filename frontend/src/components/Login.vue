<template>
  <div id="app">
    <v-app id="inspire">
      <v-tabs color="cyan" dark slider-color="yellow" centered>
        <v-tab ripple>Login</v-tab>
        <v-tab-item column centered>
          <v-form
            ref="loginForm"
            @submit.prevent="login"
            v-model="valid"
            lazy-validation
          >
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-card-text class="text-xs-right">Email:</v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="loginEmail"
                    label="Enter email..."
                    box
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex sx6>
                  <v-card-text class="text-xs-right">Password:</v-card-text>
                </v-flex>
                <v-flex sx6>
                  <v-text-field
                    v-model="loginPwd"
                    :type="'password'"
                    label="Enter password..."
                    box
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-btn class="bt-submit" type="submit" color="success"
                    >Login</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-tab-item>

        <v-tab ripple>Create Account</v-tab>
        <v-tab-item>
          <v-form
            ref="createForm"
            @submit="create"
            v-model="valid"
            lazy-validation
          >
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-card-text class="text-xs-right">First Name:</v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="firstName"
                    label="Enter first name..."
                    box
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-card-text class="text-xs-right">Last Name:</v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="lastName"
                    label="Enter last name..."
                    box
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-card-text class="text-xs-right">Email:</v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="createEmail"
                    :rules="emailRules"
                    label="Enter email..."
                    box
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-card-text class="text-xs-right">Password:</v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="createPwd"
                    :type="'password'"
                    box
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-card-text class="text-xs-right"
                    >Confirm Password:</v-card-text
                  >
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-model="createPwdConfirm"
                    :type="'password'"
                    label="Confirm password..."
                    box
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-checkbox
                    v-model="isManager"
                    :label="'are you a manager?'"
                  ></v-checkbox>
                </v-flex>
                <v-flex xs12>
                  <v-btn class="bt-submit" type="submit" color="success"
                    >Create Account</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-tab-item>
      </v-tabs>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    loginEmail: '',
    loginPwd: '',
    createEmail: '',
    createPwd: '',
    createPwdConfirm: '',
    firstName: '',
    lastName: '',
    isManager: false,
    valid: false,
    emailRules: [
      (v: string) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(v) || 'Invalid e-mail.'
      }
    ]
  }),

  methods: {
    login: async function() {
      if ((this.$refs.loginForm as any).validate()) {
        try {
          const { status } = await Axios.post('/auth', {
            strategy: 'local',
            email: this.loginEmail,
            password: this.loginPwd
          })
          location.href = '/'
        } catch (e) {
          alert('Error: Invalid email/password combination')
        }
      } else {
        alert(
          'Some fields are not filled out correctly. Please verify the information you have entered is correct.'
        )
      }
    },
    create: function() {
      if ((this.$refs.createForm as any).validate()) {
        Axios.post('/users', {
          email: this.createEmail,
          password: this.createPwd,
          firstName: this.firstName,
          lastName: this.lastName,
          isManager: this.isManager
        })
        alert('Your account has been created! Please log in to continue')
      } else {
        alert(
          'Some fields are not filled out correctly. Please verify the information you have entered is correct.'
        )
      }
    }
  }
})
</script>
