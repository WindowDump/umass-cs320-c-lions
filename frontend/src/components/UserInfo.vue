<template>
  <div id="app">
    <!-- <v-app id="inspire"> -->
    <v-container>
      <pre>
 
{{ text }}
</pre
      >
    </v-container>
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
  mounted() {
    //this.text = ''
    for (let qa of this.QAs) {
      this.text += qa.question + ' : ' + qa.answer + '\n'
    }
  },
  props: ['QAs']
})
</script>
