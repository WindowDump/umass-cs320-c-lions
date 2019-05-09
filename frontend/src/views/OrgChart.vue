<template>
  <div>
    <h1>OrgChart</h1>
    <OrgChart @onClick="setParent"></OrgChart>
    <h2 v-if="items.length !== 0">
      <Applicants
        :parentId="parentId"
        :parentName="parentName"
        :items="items"
        :userMap="userMap"
      ></Applicants>
    </h2>
    <h2 v-else>
      <UserInfo :parentId="parentId" :parentName="parentName"></UserInfo>
    </h2>
    <AddPositionForm
      v-if="user.managedCompanyId"
      :parentId="parentId"
      :parentName="parentName"
    ></AddPositionForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import OrgChart from '@/components/OrgChart.vue'
import AddPositionForm from '@/components/AddPositionForm.vue'
import Applicants from '@/components/Applicants.vue'
import UserInfo from '@/components/UserInfo.vue'
import Axios from 'axios'

export default Vue.extend({
  components: {
    OrgChart,
    AddPositionForm,
    Applicants,
    UserInfo
  },
  data: () => ({
    user: (window as any).$user,
    parentId: '',
    parentName: '',
    appliedUsers: [] as string[],
    items: [] as string[],
    userMap: {} as { [name: string]: string }
  }),
  methods: {
    setParent(node: { name: string; id: string; title: string }) {
      this.parentId = node.id
      this.parentName = `${node.name} (${node.title})`
      this.getApplicants()
    },
    getApplicants: async function() {
      this.appliedUsers = (await Axios.get(
        '/positions/' + this.parentId
      )).data.appliedUserIds
      this.items = []
      for (let userId of this.appliedUsers) {
        const user = (await Axios.get('/users/' + userId)).data
        const name = user.firstName + ' ' + user.lastName
        this.items.push(name)
        this.userMap[name] = userId
      }
    }
  }
})
</script>
