<template>
  <div>
    <h1>OrgChart</h1>
    <OrgChart @onClick="setParent"></OrgChart>
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
export default Vue.extend({
  components: {
    OrgChart,
    AddPositionForm
  },
  data: () => ({
    user: (window as any).$user,
    parentId: '',
    parentName: ''
  }),
  methods: {
    setParent(node: { name: string; id: string; title: string }) {
      this.parentId = node.id
      this.parentName = `${node.name} (${node.title})`
    }
  }
})
</script>
