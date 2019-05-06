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
                <v-flex xs6>
                  <v-card-text class="text-xs-right">Password:</v-card-text>
                </v-flex>
                <v-flex xs6>
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
            @submit.prevent="create"
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
                <v-flex xs6>
                  <v-card-text class="text-xs-right">
                    Company to Manage:
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-model="managedCompanyId"
                    :items="companyNames"
                    label="Company to manage..."
                    box
                    required
                  ></v-select>
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
    managedCompanyId: null,
    valid: false,
    companies: [{ name: 'None', _id: undefined }],
    companyNames: ['None'],
    emailRules: [
      (v: string) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(v) || 'Invalid e-mail.'
      }
    ]
  }),

  async created() {
    console.log('RUNNING CREATE HOOK')
    const { data } = await Axios.get('/companies')
    this.companies.push(...data)
    this.companyNames.push(...data.map((c: any) => c.name))
    console.log('DATA', data)
    console.log('NEW COMPANIES', this.companies)
  },

  methods: {
    async login() {
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
    async create() {
      if (
        (this.$refs.createForm as any).validate() &&
        this.createPwd == this.createPwdConfirm
      ) {
        const company = this.companies.find(
          (c: any) => c.name === this.managedCompanyId
        )
        Axios.post('/users', {
          email: this.createEmail,
          password: this.createPwd,
          firstName: this.firstName,
          lastName: this.lastName,
          managedCompanyId: company && company._id
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
