<template>
  <div id="app">
    <v-app id="inspire">
      <v-tabs v-model="active" color="cyan" dark slider-color="yellow" centered>
        <v-tab ripple>Login</v-tab>
        <v-tab-item column centered>
          <v-form
            ref="loginForm"
            @submit="login"
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
          <v-form ref="form" @submit="create" v-model="valid" lazy-validation>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
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
                    :rules="pwdRules"
                    :type="'password'"
                    label="At least 1 lowercase, 1 uppercase, 1 numeric, 1 special character, 8 characters long"
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
                    :rules="pwdRules"
                    :type="'password'"
                    label="Confirm password..."
                    box
                    required
                  ></v-text-field>
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
    valid: false,
    emailRules: [
      (v: string) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(v) || 'Invalid e-mail.'
      }
    ],
    pwdRules: [
      (v: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        return regex.test(v) || 'Invalid password.'
      }
    ]
    //pwdMatch: (v: string) => {this.createPwd === this.createPwdConfirm || 'Passwords do not match'}
  }),

  methods: {
    login: async function() {
      if ((this.$refs.loginForm as any).validate()) {
        const { status } = await Axios.post('/auth', {
          strategy: 'local',
          email: this.loginEmail,
          password: this.loginPwd
        })

        if (status === 201) {
          alert('Successful login')
          const { data } = await Axios.get('/users/me')
          console.log((window as any).$user)
          ;(window as any).$user = data
          console.log((window as any).$user)
        } else alert('Error: Unable to login')
      } else {
        alert(
          'Some fields are not filled out correctly. Please verify the information you have entered is correct.'
        )
      }
    },
    create: function() {
      alert('Account created!')
    }
  }
})
</script>
