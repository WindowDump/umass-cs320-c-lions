<template>
  <div id="app">
    <!-- <v-app id="inspire"> -->
    <v-container> </v-container>
    <!-- </v-app> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
  data: () => ({
    text: ''
  }),
  async mounted() {
    const { data } = await Axios.get('/positions/' + this.parentId)

    // for(let QA of data.hiredUserAnswers){
    //     text += QA
    // }
  },
  props: ['parentId', 'parentName', 'items']
})
</script>
