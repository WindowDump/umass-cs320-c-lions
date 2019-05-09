<template>
  <v-app>
    <v-form ref="employeeForm" @submit.prevent="upload" lazy-validation>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text class="text-xs-right"
              >Upload employee file:</v-card-text
            >
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Select File"
              @click="pickEmployeeFile"
              v-model="employeeFileName"
              :rules="rules"
              readonly
              required
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="employee"
              accept=".json"
              @change="handleEmployeeFileSelect"
            />
          </v-flex>
          <v-flex xs6>
            <v-card-text class="text-xs-right"
              >Upload position file:</v-card-text
            >
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Select File"
              @click="pickPositionFile"
              v-model="positionFileName"
              :rules="rules"
              readonly
              required
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="position"
              accept=".json"
              @change="handlePositionFileSelect"
            />
          </v-flex>
          <v-flex xs12>
            <v-btn class="bt-submit" type="submit" color="success"
              >Upload</v-btn
            >
          </v-flex>
          <v-progress-linear
            v-if="this.progressBarValue > 0"
            v-model="progressBarValue"
          ></v-progress-linear>
        </v-layout>
      </v-container>
    </v-form>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
// import TreeStructure from '@/classes/TreeStructure.ts'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    employeeFileName: '',
    positionFileName: '',
    progressBarValue: 0,
    treeroot: null,
    employeeJsonFile: [
      {
        firstName: '',
        lastName: '',
        employeeId: '',
        email: '',
        companyId: '',
        companyName: '',
        managerId: '',
        positionTitle: '',
        startDate: ''
      }
    ],
    positionJsonFile: [
      {
        title: '',
        description: '',
        companyId: '',
        companyName: '',
        managerId: '',
        startDate: '',
        postedDate: '',
        postingExpirationDate: ''
      }
    ],
    rules: [
      (v: string) => {
        return !!v || 'Must choose a file to upload.'
      }
    ]
  }),

  methods: {
    pickEmployeeFile: function() {
      ;(this.$refs as any).employee.click()
    },

    pickPositionFile: function() {
      ;(this.$refs as any).position.click()
    },

    handleEmployeeFileSelect: function(evt: any) {
      var files = evt.target.files
      var f = files[0]
      if (f !== undefined) {
        this.employeeFileName = f.name
        if (this.employeeFileName.lastIndexOf('.') <= 0) {
          return
        }

        var reader = new FileReader()

        // Closure to capture the file information.
        reader.onload = (e: any) => {
          this.employeeJsonFile = JSON.parse(e.target.result)
        }
        reader.readAsText(f)
      }
    },

    handlePositionFileSelect: function(evt: any) {
      var files = evt.target.files
      var f = files[0]
      if (f !== undefined) {
        this.positionFileName = f.name
        if (this.positionFileName.lastIndexOf('.') <= 0) {
          return
        }

        var reader = new FileReader()

        // Closure to capture the file information.
        reader.onload = (e: any) => {
          this.positionJsonFile = JSON.parse(e.target.result)
        }
        reader.readAsText(f)
      }
    },
    upload: async function() {
      if ((this.$refs.employeeForm as any).validate()) {
        await Axios.post('/io', {
          employees: this.employeeJsonFile,
          positions: this.positionJsonFile
        })
        alert('done')
        //redirect('/orgchart')
      } else {
        // alert('Must choose a file to upload.')
      }
    }
  }
})
</script>
