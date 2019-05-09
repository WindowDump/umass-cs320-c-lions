<template>
  <v-container fluid px-0>
    <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="n in positions"
        :key="n._id"
        :label="n.title + ' at ' + n.companyName"
        :value="n._id"
      ></v-radio>
    </v-radio-group>
    <v-btn color="green">Accept</v-btn>
    <v-btn color="red">Reject</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
export default Vue.extend({
  data() {
    return {
      positions: [] as any[]
    }
  },
  async mounted() {
    const avPosIds = (window as any).$user.availablePositionIds
    this.positions = await Promise.all(
      avPosIds.map(async (id: string) => {
        const { data } = await Axios.get('/positions/' + id)
        const companyData = (await Axios.get('/companies/' + data.companyId))
          .data
        return {
          ...data,
          companyName: companyData.name
        }
      })
    )
    console.log('POSS', this.positions)
  },
  methods: {}
})
</script>

<style></style>
