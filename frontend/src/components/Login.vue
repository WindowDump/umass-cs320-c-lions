<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-layout column center>
          <v-flex>
            <v-tabs
              v-model="active"
              color="cyan"
              dark
              slider-color="yellow"
              centered
            >
              <v-tab ripple>Login</v-tab>
              <v-tab-item column centered>
                <v-card flat row>
                  <v-card-text>Email:</v-card-text>
                  <v-text-field
                    v-model="loginEmail"
                    label="Enter email..."
                    box
                    required
                  ></v-text-field>
                  <v-card-text>Password:</v-card-text>
                </v-card>
                <v-text-field
                  v-model="loginPwd"
                  :type="password"
                  label="Enter password..."
                  box
                  required
                ></v-text-field>
                <v-btn class="btn-login" @click="login" color="success"
                  >Login</v-btn
                >
              </v-tab-item>

              <v-tab ripple>Create Account</v-tab>
              <v-tab-item>
                <v-form
                  ref="form"
                  @submit="create"
                  v-model="valid"
                  lazy-validation
                >
                  <v-card flat>
                    <v-card-text>Email:</v-card-text>
                    <v-text-field
                      v-model="createEmail"
                      :rules="emailRules"
                      label="Enter email..."
                      box
                      required
                    ></v-text-field>
                    <v-card-text>Password:</v-card-text>
                    <v-text-field
                      v-model="createPwd"
                      :rules="pwdRules"
                      :type="'password'"
                      label="Password must contain at least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character. It must be at least 8 characters long"
                      box
                      required
                    ></v-text-field>
                    <v-card-text>Confirm Password:</v-card-text>
                    <v-text-field
                      v-model="createPwdConfirm"
                      :rules="pwdRules"
                      :type="'password'"
                      label="Confirm password..."
                      box
                      required
                    ></v-text-field>
                  </v-card>
                  <v-flex>
                    <v-btn class="btn-create" type="submit" color="success"
                      >Create</v-btn
                    >
                  </v-flex>
                </v-form>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    loginEmail: '',
    loginPwd: '',
    createEmail: '',
    createPwd: '',
    createPwdConfirm: '',
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
    login: function() {},
    create: function() {
      alert('Account created!')
    }
  }
})
</script>
