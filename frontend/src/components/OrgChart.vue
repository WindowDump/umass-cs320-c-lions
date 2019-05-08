<template>
  <div>
    <organization-chart :datasource="ds" pan="true"></organization-chart>
  </div>
</template>

<script>
import Vue from 'vue'
import OrganizationChart from 'vue-organization-chart'
import Axios from 'axios'
import 'vue-organization-chart/dist/orgchart.css'

export default {
  components: {
    OrganizationChart
  },
  data() {
    return {
      poslist: null,
      ds: null
    }
  },
  async mounted() {
    const { data } = await Axios.get('/positions', {
      params: { positionParentId: undefined }
    })
    this.ds = await this.makeNode(data[0]._id)
  },
  methods: {
    makeNode: async function(id) {
      const { data } = await Axios.get('/positions/' + id)
      //const { userdata } = await Axios.get('/users/'+data.hiredUserId)
      // TODO: userdata is always undefined as a hook blocks from getting the user,
      // a workaround will need to be found to fill in the name
      const name = data.hiredUserId ? 'Name here' : 'Open'
      let children = []
      for (const sub of data.subordinatePositionIds) {
        children.push(await this.makeNode(sub))
      }
      return {
        id: '0',
        title: data.title,
        name,
        children
      }
    }
  }
}
</script>
