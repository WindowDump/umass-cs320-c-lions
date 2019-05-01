<template>
  <div>
    <organization-chart :datasource="ds" pan="true"></organization-chart>
  </div>
</template>

<script>
import Vue from 'vue'
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'

export default {
  components: {
    OrganizationChart
  },
  data() {
    return {
      poslist: null,
      //ds: makeChart()
      ds: {
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
  },
  async mounted() {
    // const { data } = await Axios.get('/positions')
    // this.poslist = data
    this.makeChart()
  },
  methods: {
    makeChart: function() {
      //alert("Make chart called!")
      return 2
    }
  }
}
</script>
