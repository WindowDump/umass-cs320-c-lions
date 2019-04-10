<template>
  <div>
    <v-flex xs12 sm6 md3>
      <v-text-field label="Solo" placeholder="Placeholder" solo></v-text-field>
    </v-flex>
    <Jobs></Jobs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Jobs from '@/components/Jobs.vue'
export default Vue.extend({
  components: {
    Jobs
  }
})
</script>
