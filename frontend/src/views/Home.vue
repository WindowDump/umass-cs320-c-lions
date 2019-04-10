<template>
  <div>
    <v-flex xs12 sm6 md3>
      <v-text-field label="Solo" placeholder="Placeholder" solo></v-text-field>
    </v-flex>
    <Jobs></Jobs>

    <div>
      <h3>Add company</h3>
      <form @submit.prevent="companySubmit" id="companyForm">
        <label>
          Company Name:
          <input type="text" v-model="company" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>

    <Company
      v-for="(company, index) in companyList"
      :key="index"
      :name="company"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Jobs from '@/components/Jobs.vue'
import Company from '@/components/Company.vue' // @ is an alias to /src
import Axios from 'axios'
export default Vue.extend({
  data() {
    return {
      formdata: null,
      company: null,
      companyList: ['FirstCompany']
    }
  },
  components: {
    Jobs,
    Company
  },
  async mounted() {
    const { data } = await Axios.get('/companies')
    // console.log(data)
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        // console.log(key + " -> " + data[key]["name"]);
        let cname = data[key]['name']
        if (cname !== undefined) this.companyList.push(cname)
      }
    }
  },
  methods: {
    companySubmit() {
      var formdata = this.company
      Axios.post('/companies', { name: formdata })
    }
  }
})
</script>
