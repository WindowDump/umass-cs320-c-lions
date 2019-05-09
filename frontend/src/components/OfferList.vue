<template>
  <v-container fluid px-0>
    <v-radio-group v-model="posId">
      <v-radio
        v-for="n in positions"
        :key="n._id"
        :label="n.title + ' at ' + n.companyName"
        :value="n._id"
      ></v-radio>
    </v-radio-group>
    <v-btn color="green" :disabled="!posId">Accept</v-btn>
    <v-btn @click="reject" color="red" :disabled="!posId">Reject</v-btn>
    <v-btn @click="back">Back</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
export default Vue.extend({
  data() {
    return {
      user: (window as any).$user,
      positions: [] as any[],
      posId: ''
    }
  },
  async mounted() {
    const avPosIds = this.user.availablePositionIds
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
  methods: {
    async accept() {
      this.user.availablePositionIds = []
      this.positions = []
      let id = this.posId

      this.$router.push({
        name: 'onboarding',
        params: { id }
      })

      await Axios.patch('/positions/' + this.posId, {
        acceptPosition: true
      })
    },
    async reject() {
      this.user.availablePositionIds = this.user.availablePositionIds.filter(
        (x: string) => x != this.posId
      )
      this.positions = this.positions.filter((x: any) => x._id != this.posId)
      await Axios.patch('/positions/' + this.posId, {
        rejectPosition: true
      })
    },
    async back() {
      this.$router.replace({ name: 'home' })
    }
  }
})
</script>

<style></style>
