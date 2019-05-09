<template>
  <div>
    <h1>OrgChart</h1>
    <OrgChart @onClick="setParent"></OrgChart>

    <Applicants
      :parentId="parentId"
      :parentName="parentName"
      :items="items"
      :userMap="userMap"
    ></Applicants>

    <UserInfo :QAs="QAs"></UserInfo>
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
    QAs: [],
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
      const { data } = await Axios.get('/positions/' + this.parentId)

      this.appliedUsers = data.appliedUserIds
      this.QAs = data.hiredUserAnswers

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
