<template>
  <div>
    <organization-chart :datasource="ds" :pan="true"></organization-chart>
  </div>
</template>

<script>
import Vue from 'vue'
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'
import { noSubselectionAllowedMessage } from 'graphql/validation/rules/ScalarLeafs'
import Axios from 'axios'

export default {
  components: {
    OrganizationChart
  },
  data() {
    return {
      poslist: null,
      userlist: null,
      ds: {}
    }
  },
  async mounted() {
    const { posdata } = await Axios.get('/positions')
    this.poslist = posdata
    const { userdata } = await Axios.get('/users')
    this.userlist = userdata
    this.ds = this.makeStaticChart()
    //this.ds = this.makeChart()
  },
  methods: {
    makeChart: function() {
      return {}
    },
    //for testing purposes only, will be deleted later
    makeStaticChart: function() {
      return {
        id: '1',
        name: 'Lao Lao',
        title: 'general manager',
        children: [
          { id: '2', name: 'Bo Miao', title: 'department manager' },
          {
            id: '3',
            name: 'Su Miao',
            title: 'department manager',
            children: [
              { id: '4', name: 'Tie Hua', title: 'senior engineer' },
              {
                id: '5',
                name: 'Hei Hei',
                title: 'senior engineer',
                children: [
                  { id: '6', name: 'Pang Pang', title: 'engineer' },
                  { id: '7', name: 'Xiang Xiang', title: 'UE engineer' }
                ]
              }
            ]
          },
          { id: '8', name: 'Hong Miao', title: 'department manager' },
          { id: '9', name: 'Chun Miao', title: 'department manager' }
        ]
      }
    }
  }
}
</script>
