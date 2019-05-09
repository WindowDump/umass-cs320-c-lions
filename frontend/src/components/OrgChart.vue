<template>
  <div>
    <organization-chart
      @node-click="onOrgClick"
      v-if="ds != null && canView"
      :datasource="ds"
      pan="true"
    ></organization-chart>
    <v-progress-circular
      v-if="ds == null && canView"
      indeterminate
      color="green"
    ></v-progress-circular>
    <p v-if="!canView">
      Your account is not associated with any company and cannot view the
      hierarchy
    </p>
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
      user: window.$user,
      ds: null,
      canView: true
    }
  },
  async mounted() {
    let companyId = undefined
    if (this.user.managedCompanyId) {
      companyId = this.user.managedCompanyId
    } else {
      companyId = (await Axios.get('/positions/' + this.user.hiredPositionId))
        .data.companyId
    }
    if (companyId === undefined) {
      this.canView = false
      return
    }
    const root = (await Axios.get('/positions', {
      params: { companyId, positionParentId: undefined }
    })).data
    if (root.length) this.ds = await this.makeNode(root[0]._id)
  },
  methods: {
    onOrgClick(node) {
      this.$emit('onClick', node)
    },
    makeNode: async function(id) {
      const pos = (await Axios.get('/positions/' + id)).data
      let name = ''
      if (pos.hiredUserId) {
        const userdata = (await Axios.get('/users/' + pos.hiredUserId)).data
        name = userdata.firstName + ' ' + userdata.lastName
      } else {
        name = 'Open'
      }
      let children = []
      for (const sub of pos.subordinatePositionIds) {
        children.push(await this.makeNode(sub))
      }
      return {
        id: pos._id,
        title: pos.title,
        name,
        children
      }
    }
  }
}
</script>
